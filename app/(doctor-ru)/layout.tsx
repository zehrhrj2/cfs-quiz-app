import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Lora } from "next/font/google";
import "../globals.css";
import { doctorStrings } from "@/lib/doctor/strings";

const geist = Geist({
  subsets: ["cyrillic", "latin"],
  variable: "--font-geist",
});

const lora = Lora({
  subsets: ["cyrillic", "cyrillic-ext", "latin"],
  weight: ["700"],
  variable: "--font-lora",
});

const strings = doctorStrings.ru;

export const metadata: Metadata = {
  title: strings.meta.title,
  description: strings.meta.description,
  openGraph: {
    title: strings.meta.title,
    description: strings.meta.description,
    url: "https://test.czechforslavs.com/doctor/ru",
    siteName: "Czech for Slavs",
  },
};

export default function DoctorRuLayout({
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
