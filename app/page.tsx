import Link from "next/link";
import { SiteFooter } from "./footer";
import { SiteNav } from "./nav";
import { SignupForm } from "./signup-form";

const examples = [
  {
    quote: "הדרך היחידה לעשות עבודה נהדרת היא לאהוב את מה שאתם עושים.",
    author: "סטיב ג'ובס",
    body: "ג'ובס אהב לחבר בין טכנולוגיה, עיצוב וסקרנות. הוא הזכיר שגם רעיונות גדולים מתחילים משאלות קטנות.",
    wikipedia: "https://he.wikipedia.org/wiki/%D7%A1%D7%98%D7%99%D7%91_%D7%92%27%D7%95%D7%91%D7%A1"
  },
  {
    quote: "זה תמיד נראה בלתי אפשרי עד שזה נעשה.",
    author: "נלסון מנדלה",
    body: "מנדלה התמודד עם שנים ארוכות בכלא ולא ויתר על התקווה. הסיפור שלו מזכיר לילדים שגם דרך ארוכה מתחילה בצעד אחד.",
    wikipedia: "https://he.wikipedia.org/wiki/%D7%A0%D7%9C%D7%A1%D7%95%D7%9F_%D7%9E%D7%A0%D7%93%D7%9C%D7%94"
  },
  {
    quote: "אלופה לא מוגדרת רק לפי הניצחונות שלה, אלא לפי איך שהיא מתאוששת כשהיא נופלת.",
    author: "סרינה ויליאמס",
    body: "סרינה חזרה שוב ושוב מפציעות, הפסדים ולחץ גדול. הסיפור שלה מזכיר שגם מי שנראית בלתי מנוצחת הייתה צריכה ללמוד לקום מחדש.",
    wikipedia: "https://he.wikipedia.org/wiki/%D7%A1%D7%A8%D7%99%D7%A0%D7%94_%D7%95%D7%99%D7%9C%D7%99%D7%90%D7%9E%D7%A1"
  }
];

export default function HomePage() {
  return (
    <main>
      <SiteNav />
      <section className="hero">
        <div className="hero-copy">
          <h1>רגע יומי של השראה וסקרנות לילדים</h1>
          <p className="lead">
            בכל יום נשלח אליך מייל קצר בעברית עם ציטוט, סיפור קטן על האדם שמאחוריו,
            וקישור לקריאה נוספת. פשוט מעבירים לילדים ופותחים שיחה.
          </p>
          <SignupForm />
        </div>
        <div className="chat-preview" aria-label="דוגמה לשיחה משפחתית סביב הציטוט היומי">
          <div className="chat-header">
            <span className="avatar-stack" aria-hidden="true">
              <span>ד</span>
              <span>א</span>
              <span>א</span>
            </span>
            <div>
              <strong>המשפחה</strong>
              <p>הציטוט היומי הועבר מהאימייל</p>
            </div>
          </div>

          <div className="message-card parent-message">
            <div className="wiki-preview">
              <div className="portrait-card basketball" aria-hidden="true">
                <span className="portrait-sun" />
                <span className="portrait-face" />
                <span className="portrait-ball" />
                <span className="portrait-hoop" />
              </div>
              <div className="wiki-copy">
                <strong>מייקל ג'ורדן - ויקיפדיה</strong>
                <span>he.wikipedia.org</span>
              </div>
            </div>
            <p>
              "החמצתי יותר מ-9,000 זריקות בקריירה שלי. הפסדתי כמעט 300 משחקים.
              נכשלתי שוב ושוב בחיים שלי. ולכן הצלחתי." - מייקל ג'ורדן
            </p>
            <p>
              מייקל ג'ורדן נחשב לאחד משחקני הכדורסל הגדולים בעולם, אבל הסיפור שלו
              לא מתחיל בניצחונות קלים. כשהיה צעיר הוא לא התקבל לנבחרת בית הספר,
              והשתמש באכזבה הזאת כדלק לאימונים, התמדה ורעב להשתפר.
            </p>
            <a href="https://he.wikipedia.org/wiki/%D7%9E%D7%99%D7%99%D7%A7%D7%9C_%D7%92%27%D7%95%D7%A8%D7%93%D7%9F">
              לקרוא עליו עוד בוויקיפדיה
            </a>
            <span className="message-time">18:41</span>
          </div>

          <div className="message-card child-message">
            רגע, הוא נכשל כל כך הרבה ועדיין נהיה הכי טוב?
          </div>
          <div className="message-card child-message second">
            זה גורם לי לחשוב אחרת על החטאות באימון.
          </div>
        </div>
      </section>

      <section className="examples">
        <div className="section-heading">
          <p className="eyebrow">מה מקבלים?</p>
          <h2>ציטוט קצר, סיפור קצר, שיחה טובה</h2>
        </div>
        <div className="example-grid">
          {examples.map((example) => (
            <article className="example-card" key={example.author}>
              <blockquote>"{example.quote}"</blockquote>
              <p className="author">{example.author}</p>
              <p>{example.body}</p>
              <a className="example-link" href={example.wikipedia}>
                לקריאה בוויקיפדיה
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className="why">
        <h2>למה זה עובד?</h2>
        <div className="why-grid">
          <p>זה קצר מספיק כדי לקרוא גם ביום עמוס.</p>
          <p>זה נותן לילדים דמויות אמיתיות להסתקרן מהן.</p>
          <p>זה פותח שיחה על התמדה, כישלון, אומץ ולמידה.</p>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
