import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Lora } from "next/font/google";
import "../globals.css";
import { strings } from "@/lib/i18n/uk";

const geist = Geist({
  subsets: ["cyrillic"],
  variable: "--font-geist",
});

const lora = Lora({
  subsets: ["cyrillic", "cyrillic-ext"],
  weight: ["700"],
  variable: "--font-lora",
});

export const metadata: Metadata = {
  title: strings.meta.title,
  description: strings.meta.description,
  openGraph: {
    title: strings.meta.og.title,
    description: strings.meta.og.description,
    url: "https://test.czechforslavs.com/ua",
    siteName: "Czech for Slavs",
  },
};

export default function UaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uk" className={`${geist.variable} ${lora.variable}`}>
      <body className="min-h-screen bg-bg text-text antialiased">
        {children}
      </body>
    </html>
  );
}
