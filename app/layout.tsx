import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Lora } from "next/font/google";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
});

// Serif for Czech word display — carries the lexicographic motif
const lora = Lora({
  subsets: ["latin", "latin-ext"],
  weight: ["700"],
  variable: "--font-lora",
});

export const metadata: Metadata = {
  title: "Знаешь ли ты чешский? | Czech for Slavs",
  description:
    "Тест на ложные друзья: 15 слов, которые путают русскоязычных.",
  openGraph: {
    title: "Знаешь ли ты чешский?",
    description: "15 слов. 4 варианта. Посмотрим, поймаешь ли.",
    url: "https://test.czechforslavs.com",
    siteName: "Czech for Slavs",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" className={`${geist.variable} ${lora.variable}`}>
      <body className="min-h-screen bg-bg text-text antialiased">
        {children}
      </body>
    </html>
  );
}
