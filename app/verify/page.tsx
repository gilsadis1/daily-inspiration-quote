import Link from "next/link";
import { verifySubscriber } from "../../src/services/subscribers";

export default async function VerifyPage({
  searchParams
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const { token } = await searchParams;
  const verified = token ? await verifySubscriber(token) : false;

  return (
    <main className="status-page">
      <section className="status-panel">
        <p className="eyebrow">אימות הרשמה</p>
        <h1>{verified ? "ההרשמה אושרה" : "קישור האימות לא תקין"}</h1>
        <p className="lead">
          {verified
            ? "ממחר נשלח אליך מייל יומי עם ציטוט השראה וסיפור קצר לילדים."
            : "יכול להיות שהקישור כבר נוצל או שפג תוקפו. אפשר להירשם שוב מהעמוד הראשי."}
        </p>
        <Link className="text-link" href="/">
          חזרה לעמוד הראשי
        </Link>
      </section>
    </main>
  );
}
