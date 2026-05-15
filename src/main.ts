import "dotenv/config";
import { QUOTES } from "./quotes/quotes";
import { readSentLog, appendSentLog } from "./core/storage";
import { selectQuote } from "./core/selector";
import { buildMessage } from "./core/messageBuilder";
import { fetchWikipediaSummary, resolveWikipediaUrl } from "./services/wikipedia";
import { generateLocalizedContent } from "./services/openai";
import { sendEmailMessage } from "./services/email";
import { listActiveSubscribers } from "./services/subscribers";
import { hasSupabaseConfig } from "./services/supabase";
import { appendSentQuote, readSentQuotes } from "./services/sentQuotes";
import {
  hasSubscriberDeliveryForDate,
  recordSubscriberDelivery,
  todayDateString
} from "./services/subscriberDeliveries";
import {
  assertWithinDailyRecipientCap,
  getMaxDailyEmailRecipients
} from "./core/recipientCap";

function parseBool(value: string | undefined): boolean {
  if (!value) return false;
  return ["1", "true", "yes", "y"].includes(value.toLowerCase());
}

function getContentLanguage(): string {
  return (process.env.CONTENT_LANGUAGE || "he").trim().toLowerCase();
}

function getWikipediaLanguage(): string {
  return (process.env.WIKIPEDIA_LANG || getContentLanguage()).trim().toLowerCase();
}

function findForcedQuote() {
  const forcedId = (process.env.FORCE_QUOTE_ID || "").trim();
  const forcedAuthor = (process.env.FORCE_AUTHOR || "").trim().toLowerCase();

  if (forcedId) {
    return QUOTES.find((q) => q.id === forcedId);
  }
  if (forcedAuthor) {
    return QUOTES.find((q) => q.author.toLowerCase() === forcedAuthor);
  }
  return undefined;
}

function defaultReadMoreText(language: string, gender?: "female" | "male" | "other"): string {
  if (language === "he") {
    if (gender === "female") return "רוצים לקרוא עליה עוד?";
    if (gender === "male") return "רוצים לקרוא עליו עוד?";
    return "רוצים לקרוא עליו עוד?";
  }

  return "Want to read more?";
}

function defaultQuestionPrefix(language: string): string {
  if (language === "he") return "שאלת היום:";
  return "Question of the day:";
}

function defaultSubject(language: string): string {
  if (language === "he") return "השראה יומית";
  return "Daily Inspiration";
}

function hasSubscriberDatabase(): boolean {
  return Boolean(hasSupabaseConfig() && process.env.PUBLIC_BASE_URL);
}

function withUnsubscribeLink(message: string, token: string): string {
  const baseUrl = (process.env.PUBLIC_BASE_URL || "").replace(/\/$/, "");
  return `${message}\n\nלהסרה מהמייל היומי:\n${baseUrl}/unsubscribe?token=${encodeURIComponent(token)}`;
}

async function run(): Promise<void> {
  const minDays = Number(process.env.MIN_DAYS_BETWEEN_REPEATS || "90");
  const includeReflection = parseBool(process.env.INCLUDE_REFLECTION_QUESTION);
  const dryRun = parseBool(process.env.DRY_RUN);
  const contentLanguage = getContentLanguage();
  const wikipediaLang = getWikipediaLanguage();
  const readMoreOverride = (process.env.READ_MORE_TEXT || "").trim();
  const questionPrefix = (process.env.QUESTION_PREFIX || "").trim();
  const subject = (process.env.EMAIL_SUBJECT || "").trim() || defaultSubject(contentLanguage);

  console.log("Loading sent log...");
  let sentLog = await readSentLog();
  if (hasSupabaseConfig()) {
    try {
      sentLog = await readSentQuotes();
      console.log(`Loaded ${sentLog.length} sent entries from Supabase.`);
    } catch (err) {
      console.warn("Could not load sent entries from Supabase. Falling back to data/sent.json.", err);
    }
  }

  const forced = findForcedQuote();
  console.log("Selecting quote...");
  const selection = forced
    ? { quote: forced, reused: false }
    : selectQuote(QUOTES, sentLog, minDays);
  console.log(`Selected: ${selection.quote.author} (${selection.quote.id})`);

  console.log("Fetching Wikipedia summary...");
  const wikiSummary = await fetchWikipediaSummary(selection.quote.author);

  console.log("Resolving Wikipedia URL...");
  const wikiUrl = await resolveWikipediaUrl(
    selection.quote.wikipedia,
    selection.quote.author,
    wikipediaLang
  );

  console.log("Generating content via OpenAI...");
  const generated = await generateLocalizedContent(
    selection.quote,
    wikiSummary,
    includeReflection,
    contentLanguage
  );

  const readMoreText =
    readMoreOverride || defaultReadMoreText(contentLanguage, selection.quote.gender);
  const questionPrefixText = questionPrefix || defaultQuestionPrefix(contentLanguage);

  const message = buildMessage({
    quoteHe: generated.quoteHe,
    authorHe: generated.authorHe,
    bioLines: generated.bioLines,
    wikipediaUrl: wikiUrl,
    reflectionQuestion: generated.reflectionQuestion,
    gender: selection.quote.gender,
    readMoreText,
    questionPrefix: questionPrefixText
  });

  if (dryRun) {
    console.log("Dry run enabled. Message not sent.");
    console.log("--- MESSAGE START ---");
    console.log(message);
    console.log("--- MESSAGE END ---");
    return;
  }

  console.log("Sending email...");
  const today = todayDateString();
  let sentCount = 0;

  if (hasSubscriberDatabase()) {
    const subscribers = await listActiveSubscribers();
    console.log(`Active subscribers: ${subscribers.length}`);
    const pendingSubscribers = [];

    for (const subscriber of subscribers) {
      const alreadySentToday = await hasSubscriberDeliveryForDate(subscriber.id, today);
      if (alreadySentToday) {
        console.log(`Skipping ${subscriber.email}: already received a quote today.`);
        continue;
      }

      pendingSubscribers.push(subscriber);
    }

    const maxRecipients = getMaxDailyEmailRecipients();
    assertWithinDailyRecipientCap(pendingSubscribers.length, maxRecipients);
    console.log(`Recipients pending today: ${pendingSubscribers.length}/${maxRecipients}`);

    for (const subscriber of pendingSubscribers) {
      await sendEmailMessage(subject, withUnsubscribeLink(message, subscriber.unsubscribeToken), {
        to: subscriber.email
      });
      await recordSubscriberDelivery({
        subscriberId: subscriber.id,
        quoteId: selection.quote.id,
        sentDate: today,
        deliveryType: "daily"
      });
      sentCount += 1;
    }
  } else {
    await sendEmailMessage(subject, message);
    sentCount = 1;
  }

  if (sentCount === 0) {
    console.log("No emails sent. Sent quote history was not updated.");
    return;
  }

  const sentEntry = { date: today, quoteId: selection.quote.id };
  await appendSentLog(sentEntry);
  if (hasSupabaseConfig()) {
    try {
      await appendSentQuote(sentEntry);
    } catch (err) {
      console.warn("Could not write sent entry to Supabase. Local data/sent.json was still updated.", err);
    }
  }

  console.log("Done.");
}

run().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
