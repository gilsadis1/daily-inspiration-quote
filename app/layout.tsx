import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.joinsparkquest.com"),
  title: {
    default: "SparkQuest - ציטוט יומי לילדים סקרנים",
    template: "%s | SparkQuest"
  },
  description: "מייל יומי בעברית עם ציטוט השראה, סיפור קצר לילדים וקישור לקריאה נוספת.",
  openGraph: {
    title: "SparkQuest - ציטוט יומי לילדים סקרנים",
    description: "מייל יומי בעברית עם ציטוט השראה, סיפור קצר לילדים וקישור לקריאה נוספת.",
    url: "https://www.joinsparkquest.com",
    siteName: "SparkQuest",
    locale: "he_IL",
    type: "website"
  },
  alternates: {
    canonical: "/"
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="he" dir="rtl">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
