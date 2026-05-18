import Link from "next/link";
import type { Metadata } from "next";
import { SiteFooter } from "../footer";
import { SiteNav } from "../nav";

export const metadata: Metadata = {
  title: "מי אנחנו",
  description: "המשימה של SparkQuest: לתת לילדים תוכן משמעותי יותר ורגעים קצרים מחוץ למסך.",
  alternates: {
    canonical: "/mission"
  },
  openGraph: {
    title: "מי אנחנו | SparkQuest",
    description: "המשימה של SparkQuest: לתת לילדים תוכן משמעותי יותר ורגעים קצרים מחוץ למסך.",
    url: "https://joinsparkquest.com/mission"
  }
};

export default function MissionPage() {
  return (
    <main>
      <SiteNav />
      <section className="mission-hero">
        <p className="eyebrow">המשימה של SparkQuest</p>
        <h1>יותר סקרנות. פחות ברירת מחדל של מסך.</h1>
        <p className="lead">
          SparkQuest נולד מתוך שאלה שמעסיקה אותי כהורה: איך עוזרים לילדים להישאר
          סקרנים, רעבים ללמוד ולהתאמץ, בעולם שבו בידור מהיר נמצא תמיד במרחק לחיצה?
        </p>
      </section>

      <section className="mission-content">
        <article className="mission-card">
          <h2>איך זה התחיל</h2>
          <p>
            אני{" "}
            <a href="https://www.linkedin.com/in/gilsadis/" target="_blank" rel="noreferrer">
              גיל סדיס
            </a>, וזה התחיל
            כפרויקט קטן עם הבנים שלי ובשבילם. בבית אנחנו מדברים הרבה על ספורט,
            התמדה, כישלונות והדרך הארוכה להשתפר.
          </p>
          <p>
            במקביל, אני מתעד באינסטגרם את הדרך שלהם להפוך לשחקני כדורסל מקצוענים:
            אימונים, משחקים, פספוסים, רגעים טובים והרבה עבודה יומיומית.
          </p>
          <p>
            מתוך זה נולד הרעיון לשלוח להם בכל יום ציטוט קצר המעורר השראה, סיפור קטן על האדם
            שמאחוריו, וקישור לקריאה נוספת. משהו קצר מספיק כדי לקרוא, אבל מספיק
            מעניין כדי לפתוח שיחה.
          </p>
        </article>

        <article className="mission-card highlight">
          <h2>למה זה חשוב</h2>
          <p>
            ילדים גדלים היום בתוך סביבה שבה קל מאוד לבחור בגירוי המיידי. זה לא אומר
            שמסכים הם האויב, אבל זה כן אומר שאנחנו צריכים לייצר בכוונה רגעים אחרים:
            רגעים של סקרנות, עומק, השראה ושיחה.
          </p>
          <p>
            כמעט בכל סיפור של דמות מצליחה חוזר אותו דפוס: לא הכול הצליח מהר. היו
            דחיות, פציעות, כישלונות, טעויות והתחלות מחדש. המסר הזה חשוב לילדים,
            במיוחד כשהם פוגשים קושי משלהם.
          </p>
        </article>

        <article className="mission-card">
          <h2>מה SparkQuest מנסה לבנות</h2>
          <p>
            זה הפרויקט הראשון של SparkQuest: ניסוי קטן וחינמי שמנסה לתת לילדים תוכן
            משמעותי יותר ורגעים קצרים מחוץ למסך.
          </p>
          <p>
            החזון הרחב יותר הוא לבנות בית לרעיונות, אתגרים ותכנים לילדים סקרנים:
            כאלה שרוצים לגלות איך דברים עובדים, להכיר סיפורים של אנשים אמיתיים,
            ולפתח התמדה דרך עשייה.
          </p>
          <p>
            לא עוד מוצר שמנסה לגנוב עוד תשומת לב. להפך: SparkQuest רוצה לעזור
            להחזיר לילדים רגעים של בחירה, סקרנות ושיחה.
          </p>
        </article>

        <div className="mission-actions">
          <Link className="button-link" href="/">
            להצטרפות לציטוט היומי
          </Link>
          <a
            className="text-link"
            href="https://www.instagram.com/gilsadis1/"
            target="_blank"
            rel="noreferrer"
          >
            הדרך שלנו בכדורסל באינסטגרם
          </a>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
