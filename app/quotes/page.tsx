import type { Metadata } from "next";
import { createClient } from "@supabase/supabase-js";
import { SiteFooter } from "../footer";
import { SiteNav } from "../nav";

export const revalidate = 3600;

type PublishedQuote = {
  sentDate: string;
  quoteId: string;
  author: string;
  quoteText: string;
  bioLines: string[];
  wikipediaUrl: string;
  reflectionQuestion?: string;
  tags: string[];
};

type PublishedQuoteRow = {
  sent_date: string;
  quote_id: string;
  author: string;
  quote_text: string;
  bio_lines: string[];
  wikipedia_url: string;
  reflection_question: string | null;
};

const seededQuotes: PublishedQuote[] = [
  {
    sentDate: "2026-05-14",
    quoteId: "althea-gibson-01",
    author: "אלתיאה גיבסון",
    quoteText: "לא משנה אילו הישגים תשיגו, מישהו עזר לכם בדרך.",
    bioLines: [
      "אלתיאה גיבסון פרצה דרך בטניס בתקופה שבה ספורטאים שחורים כמעט לא קיבלו הזדמנויות שוות.",
      "היא המשיכה להתאמן, להתחרות ולהתקדם גם כשדלתות רבות נסגרו בפניה.",
      "הסיפור שלה מזכיר שהצלחה אישית כמעט תמיד נשענת גם על אנשים שעזרו בדרך."
    ],
    wikipediaUrl: "https://he.wikipedia.org/wiki/%D7%90%D7%9C%D7%AA%D7%99%D7%90%D7%94_%D7%92%D7%99%D7%91%D7%A1%D7%95%D7%9F",
    tags: ["ספורט", "הכרת תודה", "פריצת דרך"]
  },
  {
    sentDate: "2026-05-11",
    quoteId: "jackie-robinson-01",
    author: "ג'קי רובינסון",
    quoteText: "חיים אינם חשובים אלא בהשפעה שיש להם על חיים של אחרים.",
    bioLines: [
      "ג'קי רובינסון היה השחקן השחור הראשון בליגת הבייסבול הבכירה בעידן המודרני.",
      "הוא נאלץ להתמודד עם לחץ, עלבונות וגזענות, ובכל זאת המשיך לשחק באומץ.",
      "הסיפור שלו פותח שיחה על אומץ, אחריות והשפעה על אנשים אחרים."
    ],
    wikipediaUrl: "https://he.wikipedia.org/wiki/%D7%92%27%D7%A7%D7%99_%D7%A8%D7%95%D7%91%D7%99%D7%A0%D7%A1%D7%95%D7%9F",
    tags: ["ספורט", "אומץ", "השפעה"]
  },
  {
    sentDate: "2026-04-05",
    quoteId: "abe-lincoln-01",
    author: "אברהם לינקולן",
    quoteText: "אני הולך לאט, אבל אני אף פעם לא הולך לאחור.",
    bioLines: [
      "אברהם לינקולן גדל בתנאים פשוטים ולמד הרבה בכוחות עצמו.",
      "לפני שהפך לנשיא, הוא חווה הפסדים וכישלונות פוליטיים שלא עצרו אותו.",
      "הסיפור שלו מזכיר שלפעמים התקדמות איטית ועקבית חשובה יותר ממהירות."
    ],
    wikipediaUrl: "https://he.wikipedia.org/wiki/%D7%90%D7%91%D7%A8%D7%94%D7%9D_%D7%9C%D7%99%D7%A0%D7%A7%D7%95%D7%9C%D7%9F",
    tags: ["היסטוריה", "התמדה", "מנהיגות"]
  }
];

export const metadata: Metadata = {
  title: "ציטוטים מעוררי השראה לילדים",
  description:
    "אוסף ציטוטים מעוררי השראה לילדים בעברית, עם סיפור קצר על האדם שמאחורי הציטוט וקישור לקריאה נוספת.",
  alternates: {
    canonical: "/quotes"
  },
  openGraph: {
    title: "ציטוטים מעוררי השראה לילדים | SparkQuest",
    description:
      "אוסף ציטוטים מעוררי השראה לילדים בעברית, עם סיפור קצר על האדם שמאחורי הציטוט וקישור לקריאה נוספת.",
    url: "https://www.joinsparkquest.com/quotes"
  }
};

function hasSupabaseReadConfig(): boolean {
  return Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY);
}

async function readPublishedQuotes(): Promise<PublishedQuote[]> {
  if (!hasSupabaseReadConfig()) {
    return [];
  }

  const supabase = createClient(
    process.env.SUPABASE_URL as string,
    process.env.SUPABASE_SERVICE_ROLE_KEY as string,
    {
      auth: {
        persistSession: false,
        autoRefreshToken: false
      }
    }
  );

  const result = await supabase
    .from("published_quotes")
    .select("sent_date,quote_id,author,quote_text,bio_lines,wikipedia_url,reflection_question")
    .order("sent_date", { ascending: false })
    .limit(30)
    .returns<PublishedQuoteRow[]>();

  if (result.error) {
    if (result.error.code === "PGRST205") {
      return [];
    }

    console.warn("Could not load published quotes.", result.error);
    return [];
  }

  return (result.data || []).map((quote) => ({
    sentDate: quote.sent_date,
    quoteId: quote.quote_id,
    author: quote.author,
    quoteText: quote.quote_text,
    bioLines: quote.bio_lines || [],
    wikipediaUrl: quote.wikipedia_url,
    reflectionQuestion: quote.reflection_question || undefined,
    tags: []
  }));
}

export default async function QuotesPage() {
  const publishedQuotes = await readPublishedQuotes();
  const quotes = publishedQuotes.length > 0 ? publishedQuotes : seededQuotes;

  return (
    <main>
      <SiteNav />
      <section className="quotes-hero">
        <p className="eyebrow">ספריית השראה לילדים</p>
        <h1>ציטוטים מעוררי השראה לילדים</h1>
        <p className="lead">
          אוסף ציטוטים קצרים בעברית לילדים, עם סיפור קטן על האדם שמאחורי
          הציטוט וקישור לקריאה נוספת. מתאים להורים שרוצים לפתוח שיחה קצרה על
          התמדה, סקרנות, אומץ, כישלון ולמידה.
        </p>
      </section>

      <section className="quotes-list" aria-label="ציטוטים קודמים">
        {quotes.map((quote) => (
          <article className="quote-card" key={`${quote.sentDate}-${quote.quoteId}`}>
            {quote.tags.length > 0 ? (
              <div className="quote-card-header">
                <div className="quote-tags" aria-label="תגיות">
                  {quote.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </div>
            ) : null}

            <blockquote>"{quote.quoteText}"</blockquote>
            <p className="author">{quote.author}</p>

            <div className="quote-bio">
              {quote.bioLines.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>

            {quote.reflectionQuestion ? (
              <p className="quote-question">שאלת היום: {quote.reflectionQuestion}</p>
            ) : null}

            <a className="example-link" href={quote.wikipediaUrl} target="_blank" rel="noreferrer">
              לקריאה בוויקיפדיה
            </a>
          </article>
        ))}
      </section>
      <section className="quotes-faq" aria-labelledby="quotes-faq-title">
        <h2 id="quotes-faq-title">איך להשתמש בציטוטים עם ילדים?</h2>
        <div className="quotes-faq-grid">
          <article>
            <h3>למה ציטוטים יכולים לעבוד לילדים?</h3>
            <p>
              ציטוט קצר יכול לפתוח שיחה בלי להפוך לשיעור. כשהוא מגיע עם סיפור
              אמיתי על אדם שהתמודד, נכשל, התאמן או המשיך לנסות, קל יותר לילדים
              להתחבר לרעיון.
            </p>
          </article>
          <article>
            <h3>על אילו נושאים הציטוטים מדברים?</h3>
            <p>
              הציטוטים עוסקים בהתמדה, סקרנות, אומץ, למידה, ספורט, מנהיגות
              והתמודדות עם כישלון. המטרה היא לתת לילדים רעיון קטן שאפשר לחשוב
              עליו או לדבר עליו בבית.
            </p>
          </article>
          <article>
            <h3>מה מקבלים במייל היומי?</h3>
            <p>
              בכל יום נשלח ציטוט מעורר השראה לילדים, כמה שורות על האדם שמאחוריו,
              וקישור לקריאה נוספת. זה קצר מספיק ליום עמוס, אבל מספיק מעניין כדי
              לפתוח שיחה.
            </p>
          </article>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
