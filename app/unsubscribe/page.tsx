import Link from "next/link";
import { unsubscribeByToken } from "../../src/services/subscribers";

export default async function UnsubscribePage({
  searchParams
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const { token } = await searchParams;
  const unsubscribed = token ? await unsubscribeByToken(token) : false;

  return (
    <main className="status-page">
      <section className="status-panel">
        <p className="eyebrow">הסרה מהרשימה</p>
        <h1>{unsubscribed ? "הוסרת מהרשימה" : "לא הצלחנו להסיר את הכתובת"}</h1>
        <p className="lead">
          {unsubscribed
            ? "לא נשלח יותר את המייל היומי לכתובת הזו."
            : "יכול להיות שהקישור לא תקין. אם המייל עדיין מגיע, אפשר להשיב אליו ונבדוק ידנית."}
        </p>
        <Link className="text-link" href="/">
          חזרה לעמוד הראשי
        </Link>
      </section>
    </main>
  );
}
