import type { Metadata } from "next";
import { createClient } from "@supabase/supabase-js";
import { SiteFooter } from "../footer";
import { SiteNav } from "../nav";

export const dynamic = "force-dynamic";

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
  title: "ציטוטים קודמים",
  description: "ספריית השראה לילדים עם ציטוטים קודמים שנשלחו ב-SparkQuest.",
  alternates: {
    canonical: "/quotes"
  },
  openGraph: {
    title: "ציטוטים קודמים | SparkQuest",
    description: "ספריית השראה לילדים עם ציטוטים קודמים שנשלחו ב-SparkQuest.",
    url: "https://joinsparkquest.com/quotes"
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
        <h1>ציטוטים קודמים</h1>
        <p className="lead">
          כאן נאספים הציטוטים שנשלחו במייל היומי: משפט קצר, סיפור קטן על האדם
          שמאחוריו, וקישור להמשך קריאה.
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
      <SiteFooter />
    </main>
  );
}
