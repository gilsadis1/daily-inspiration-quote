import "dotenv/config";
import { assertWithinDailyRecipientCap, getMaxDailyEmailRecipients } from "./core/recipientCap";
import { sendEmailMessage } from "./services/email";
import { hasSupabaseConfig } from "./services/supabase";
import { listSubscribersByStatuses } from "./services/subscribers";
import {
  hasSubscriberDeliveryForDate,
  recordSubscriberDelivery,
  todayDateString
} from "./services/subscriberDeliveries";

const SUBJECT = "אימייל קצת שונה...";
const DELIVERY_ID = "sparkquest-vision-2026-06-11";
const SENDER_NAME = "Gil Sadis";

const BODY = `היי הורים יקרים,

**האימייל היום קצת שונה. אנסה לעשות את זה קצר.**

המוצר הנוכחי הוא חלק מחזון גדול יותר:
איך אפשר לעזור לילדים לפתח סקרנות ותשוקה בעולם שבו מנת הדופמין הבאה נמצאת תמיד במרחק לחיצה?

כבר שנים שאני מנסה דברים כאלה עם הילדים שלי. מה שגיליתי הוא שזה חייב לבוא מהם.

כהורים, אין לנו באמת סיכוי להתחרות במסכים בכוח. אי אפשר להכריח ילד להתעניין, ללמוד או לחקור משהו לאורך זמן רק כי אמרנו שזה חשוב.

אבל אנחנו כן יכולים לעזור להם.

הסקרנות הזאת, שלפעמים הופכת לתשוקה אמיתית, יכולה להיבנות במנות קטנות וקלות לעיכול. אם האתגר קשה מדי או מרגיש כמו שיעורי בית, ילדים מתייאשים מהר. אבל אם הוא מוגש נכון, מתוך משהו שכבר מסקרן אותם, יכול להיפתח שם עולם שלם.

וזה הרעיון הגדול יותר מאחורי SparkQuest:
הרגל יומי קטן, 5-10 דקות ביום, שבו ילדים מקבלים משימה קצרה ומעניינת סביב נושא שכבר מדבר אליהם.

לדוגמה, אם הדבר שהכי מעניין ילד כרגע הוא Fortnite, במקום להילחם בזה אפשר להשתמש בזה כנקודת פתיחה:

מי בונה משחקים כאלה?
איך יוצרים עולם במשחק?
מה הופך שלב למשחק טוב?
האם אפשר לבנות עולם קטן בעצמך?
האם אפשר ליצור משחק פשוט בעזרת AI ולשתף אותו עם חברים?

כל שאלה כזאת יכולה להפוך לקווסט קטן. לא שיעור. לא הרצאה. משימה קצרה שמתחילה ממשהו שהילד כבר אוהב, ולאט לאט חושפת עוד שכבות: יצירה, תכנון, טכנולוגיה, עיצוב, התמדה, ואולי אפילו פרויקט אישי.

וזה יכול לעבוד בכל נושא שמעניין ילדים:
ספורט, מדע, סרטים וסדרות, מוזיקה, רשתות חברתיות, בעלי חיים, חלל, בישול, יזמות ועוד.

הרעיון הוא לא לבנות עוד אפליקציית לימוד שמרגישה כמו חוג.
אלא לבנות משהו אישי יותר, שמתחיל מתחומי העניין של הילד ועוזר לו להפוך סקרנות רגעית להרגל קטן ובריא.

**אשמח מאוד לשמוע מה אתם חושבים.**

אם תוכלו להשיב למייל הזה **ולענות אפילו על שאלה אחת או שתיים**, (או על כולן 🙂) זה יעזור לי מאוד:

1. האם זה נשמע כמו משהו שהייתם רוצים עבור הילדים שלכם?
2. בני כמה הילדים שלכם?
3. האם 5-10 דקות ביום נשמע לכם ריאלי בבית שלכם?
4. מה לדעתכם יגרום לילדים באמת לשתף פעולה עם דבר כזה?
5. באיזה פורמט זה יהיה הכי נוח לכם: מייל להורה, קישור יומי לילד, וואטסאפ, אפליקציה, או משהו אחר?
6. אם זה היה עובד טוב עבור הילד או הילדה שלכם, האם זה משהו שהייתם שוקלים לשלם עליו?

ילדים לא רק מחפשים גירוי. הם גם רוצים שיתייחסו אליהם ברצינות ובאמון. אם זה מרגיש כמו עוד שיעור או הוראה מלמעלה, הם ייסגרו. אם זה מרגיש כמו משהו שלהם, יש סיכוי אמיתי שסקרנות תתחיל לזוז.

תודה רבה,
גיל סדיס`;

function parseBool(value: string | undefined): boolean {
  if (!value) return false;
  return ["1", "true", "yes", "y"].includes(value.toLowerCase());
}

function withUnsubscribeLink(message: string, token: string): string {
  const baseUrl = (process.env.PUBLIC_BASE_URL || "").replace(/\/$/, "");
  if (!baseUrl) {
    throw new Error("Missing environment variable: PUBLIC_BASE_URL");
  }

  return `${message}\n\nלהסרה מהמייל היומי:\n${baseUrl}/unsubscribe?token=${encodeURIComponent(token)}`;
}

async function run(): Promise<void> {
  process.env.EMAIL_FROM_NAME = SENDER_NAME;

  const testEmail = (process.env.ONE_OFF_TEST_EMAIL || "").trim();
  if (testEmail) {
    console.log(`Sending one-off vision test email to ${testEmail}`);
    await sendEmailMessage(`[TEST] ${SUBJECT}`, BODY, { to: testEmail });
    console.log("Test email sent.");
    return;
  }

  if (!hasSupabaseConfig()) {
    throw new Error("Missing Supabase config. This broadcast requires active subscribers.");
  }

  const dryRun = !parseBool(process.env.SEND_ONE_OFF_EMAIL);
  const subscribers = await listSubscribersByStatuses(["active", "pending"]);
  const today = todayDateString();
  const maxRecipients = getMaxDailyEmailRecipients();
  assertWithinDailyRecipientCap(subscribers.length, maxRecipients);

  console.log(`Subject: ${SUBJECT}`);
  console.log(`Active and pending subscribers: ${subscribers.length}/${maxRecipients}`);
  console.log(`Delivery date: ${today}`);

  if (dryRun) {
    console.log("Dry run enabled. Set SEND_ONE_OFF_EMAIL=1 to send.");
    console.log("--- EMAIL START ---");
    console.log(BODY);
    console.log("--- EMAIL END ---");
    return;
  }

  for (const subscriber of subscribers) {
    const alreadySentToday = await hasSubscriberDeliveryForDate(subscriber.id, today);
    if (alreadySentToday) {
      console.log(`Skipping ${subscriber.email}: already received an email today.`);
      continue;
    }

    await sendEmailMessage(SUBJECT, withUnsubscribeLink(BODY, subscriber.unsubscribeToken), {
      to: subscriber.email
    });
    await recordSubscriberDelivery({
      subscriberId: subscriber.id,
      quoteId: DELIVERY_ID,
      sentDate: today,
      deliveryType: "daily"
    });
    console.log(`Sent one-off vision email to ${subscriber.email}`);
  }

  console.log("Done.");
}

run().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
