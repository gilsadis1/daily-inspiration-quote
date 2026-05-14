import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Daily Inspiration Quote",
  description: "מייל יומי עם ציטוט השראה וסיפור קצר לילדים"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="he" dir="rtl">
      <body>{children}</body>
    </html>
  );
}
