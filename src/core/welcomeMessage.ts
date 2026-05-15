export const WELCOME_QUOTE_ID = "katherine-johnson-welcome";

const WIKIPEDIA_URL =
  "https://he.wikipedia.org/wiki/%D7%A7%D7%AA%D7%A8%D7%99%D7%9F_%D7%92%27%D7%95%D7%A0%D7%A1%D7%95%D7%9F";

export function buildWelcomeMessage(unsubscribeToken: string): string {
  const baseUrl = (process.env.PUBLIC_BASE_URL || "").replace(/\/$/, "");

  return [
    '"אנחנו תמיד נזדקק למדע, להנדסה ולטכנולוגיה." - קתרין ג׳ונסון',
    "קתרין אהבה מספרים כל כך, שכילדה היא ספרה צעדים, כלים וכמעט כל דבר סביבה.",
    "בהמשך, החישובים שלה עזרו לנאס״א לשלוח אסטרונאוטים לחלל בבטחה.",
    "מה מעניין? במשך שנים לא הרבה אנשים הכירו את השם שלה, עד שהסיפור שלה נחשף לעולם.",
    "רוצים לקרוא עליה עוד?",
    WIKIPEDIA_URL,
    "שאלת היום: איזה דבר קטן אתם אוהבים לספור, לבדוק או להבין עד הסוף?",
    "",
    "להסרה מהמייל היומי:",
    `${baseUrl}/unsubscribe?token=${encodeURIComponent(unsubscribeToken)}`
  ].join("\n");
}
