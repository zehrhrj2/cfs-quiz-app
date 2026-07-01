import { Geist } from "next/font/google";
import "../globals.css";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
});

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={geist.variable}>
      <body className="min-h-screen bg-bg text-text antialiased">
        {children}
      </body>
    </html>
  );
}
