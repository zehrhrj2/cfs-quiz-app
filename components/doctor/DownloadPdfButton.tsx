"use client";

import { useState } from "react";
import type { Locale } from "@/data/doctor-phrases";
import { trackDoctorEvent } from "@/lib/doctor/analytics";

type Props = {
  locale: Locale;
  label: string;
  generatingLabel: string;
  errorMessage: string;
};

export default function DownloadPdfButton({ locale, label, generatingLabel, errorMessage }: Props) {
  const [status, setStatus] = useState<"idle" | "generating" | "error">("idle");

  async function handleClick() {
    setStatus("generating");
    try {
      // Dynamically imported so the font (~130KB base64) and jsPDF only
      // load when someone actually wants a PDF, not on every page visit.
      const { generatePdf } = await import("@/lib/doctor/generatePdf");
      await generatePdf(locale);
      trackDoctorEvent("doctor_pdf_downloaded", { locale });
      setStatus("idle");
    } catch (err) {
      console.error("[doctor-pdf]", err);
      setStatus("error");
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <button
        type="button"
        onClick={handleClick}
        disabled={status === "generating"}
        className="w-full bg-surface border border-border text-text py-3 text-sm font-semibold rounded-xl transition-colors active:bg-border min-h-[52px] disabled:opacity-60"
      >
        {status === "generating" ? generatingLabel : label}
      </button>
      {status === "error" && (
        <p className="text-xs text-wrong text-center leading-relaxed">{errorMessage}</p>
      )}
    </div>
  );
}
