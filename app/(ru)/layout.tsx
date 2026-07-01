import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Lora } from "next/font/google";
import "../globals.css";
import { strings } from "@/lib/i18n/ru";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
});

const lora = Lora({
  subsets: ["latin", "latin-ext"],
  weight: ["700"],
  variable: "--font-lora",
});

export const metadata: Metadata = {
  title: strings.meta.title,
  description: strings.meta.description,
  openGraph: {
    title: strings.meta.og.title,
    description: strings.meta.og.description,
    url: "https://test.czechforslavs.com",
    siteName: "Czech for Slavs",
  },
};

export default function RuLayout({
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
