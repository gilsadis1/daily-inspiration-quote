import Link from "next/link";
import { buildWelcomeMessage, WELCOME_QUOTE_ID } from "../../src/core/welcomeMessage";
import {
  createUnsubscribeToken,
  verifySubscriber
} from "../../src/services/subscribers";
import {
  hasSubscriberDeliveryForDate,
  recordSubscriberDelivery,
  todayDateString
} from "../../src/services/subscriberDeliveries";
import { sendEmailMessage } from "../../src/services/email";

async function sendWelcomeQuoteIfNeeded(subscriber: { id: string; email: string }): Promise<boolean> {
  const today = todayDateString();
  const alreadySentToday = await hasSubscriberDeliveryForDate(subscriber.id, today);
  if (alreadySentToday) {
    return false;
  }

  const unsubscribeToken = createUnsubscribeToken(subscriber.id);
  await sendEmailMessage("ברוכים הבאים - הציטוט הראשון שלכם", buildWelcomeMessage(unsubscribeToken), {
    to: subscriber.email
  });
  await recordSubscriberDelivery({
    subscriberId: subscriber.id,
    quoteId: WELCOME_QUOTE_ID,
    sentDate: today,
    deliveryType: "welcome"
  });

  return true;
}

export default async function VerifyPage({
  searchParams
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const { token } = await searchParams;
  const result = token ? await verifySubscriber(token) : { verified: false };
  let welcomeSent = false;

  if (result.verified && result.subscriber) {
    try {
      welcomeSent = await sendWelcomeQuoteIfNeeded(result.subscriber);
    } catch (err) {
      console.error("Failed to send welcome quote:", err);
    }
  }

  return (
    <main className="status-page">
      <section className="status-panel">
        <p className="eyebrow">אימות הרשמה</p>
        <h1>{result.verified ? "ההרשמה אושרה" : "קישור האימות לא תקין"}</h1>
        <p className="lead">
          {result.verified && welcomeSent
            ? "שלחנו אליך עכשיו את הציטוט הראשון. החל ממחר נמשיך עם מייל יומי קצר לילדים."
            : result.verified
              ? "ההרשמה אושרה. אם כבר קיבלת היום ציטוט, המייל היומי הבא יישלח מחר."
            : "יכול להיות שהקישור כבר נוצל או שפג תוקפו. אפשר להירשם שוב מהעמוד הראשי."}
        </p>
        <Link className="text-link" href="/">
          חזרה לעמוד הראשי
        </Link>
      </section>
    </main>
  );
}
