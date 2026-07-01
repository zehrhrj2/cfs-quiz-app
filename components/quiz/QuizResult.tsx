"use client";

import { useState, useEffect } from "react";
import { PLAY_STORE_URL, QUIZ_URL } from "@/lib/constants";
import { trackEvent } from "@/lib/analytics";
import type { SessionQuestion } from "@/lib/quiz-engine";
import type { Strings } from "@/lib/i18n/types";

type Props = {
  score: number;
  total: number;
  wrongQuestions: { sq: SessionQuestion; answeredIndex: number | null }[];
  onRestart: () => void;
  strings: Strings;
  locale: "ru" | "uk";
};

function getTier(score: number, tiers: Strings["tiers"]) {
  return tiers.find((t) => score >= t.min && score <= t.max) ?? tiers[0];
}

export default function QuizResult({
  score,
  total,
  wrongQuestions,
  onRestart,
  strings,
  locale,
}: Props) {
  const tier = getTier(score, strings.tiers);
  const [averageData, setAverageData] = useState<{
    average: number;
    count: number;
  } | null>(null);

  useEffect(() => {
    fetch(`/api/stats/average?locale=${locale}`)
      .then((r) => r.json())
      .then((data) => setAverageData(data))
      .catch(() => {});
  }, [locale]);

  async function handleShare() {
    const shareText = strings.result.shareTextTemplate
      .replace("{score}", String(score))
      .replace("{total}", String(total));
    if (navigator.share) {
      try {
        await navigator.share({ title: shareText, url: QUIZ_URL });
      } catch {
        // user cancelled — no-op
      }
    } else {
      await navigator.clipboard.writeText(`${shareText} ${QUIZ_URL}`);
      // TODO (Step 7): show toast
    }
  }

  function handleInstall() {
    trackEvent("install_clicked", locale);
    if (!PLAY_STORE_URL || PLAY_STORE_URL.includes("PLACEHOLDER")) {
      console.warn("[CFS] NEXT_PUBLIC_PLAY_STORE_URL is not configured");
      return;
    }
    window.open(PLAY_STORE_URL, "_blank", "noopener");
  }

  return (
    <div className="min-h-screen bg-bg flex flex-col">
      {/* Logo */}
      <header className="px-6 pt-8 pb-2">
        <span className="text-brand font-bold text-2xl leading-none select-none">Č</span>
      </header>

      <main className="flex-1 flex flex-col px-6 pb-12 max-w-sm mx-auto w-full">

        {/* Score block */}
        <div className="mt-6 mb-8">
          <div className="flex items-end gap-2 mb-1">
            <span className="font-serif text-7xl font-bold text-brand leading-none">
              {score}
            </span>
            <span className="text-2xl text-muted font-normal mb-2">/ {total}</span>
          </div>
          {averageData && averageData.count > 0 && (
            <p className="text-xs text-muted">
              {strings.result.averageLabel} {averageData.average} / {total}
            </p>
          )}
          <div className="h-px bg-brand mt-4 w-12" />
        </div>

        {/* Tier text */}
        <p className="text-base font-medium leading-snug mb-8">{tier.text}</p>

        {/* Primary CTA */}
        <button
          onClick={handleInstall}
          className="w-full bg-brand hover:bg-brand-dark active:bg-brand-dark text-white py-4 text-base font-bold rounded-xl transition-colors mb-2 min-h-[56px]"
        >
          {strings.result.installBtn}
        </button>
        <p className="text-xs text-center text-muted mb-8">{tier.subtext}</p>

        {/* Share */}
        <button
          onClick={handleShare}
          className="w-full border border-brand text-brand hover:bg-brand/5 active:bg-brand/10 py-3.5 text-sm font-semibold rounded-xl transition-colors mb-10 min-h-[52px]"
        >
          {strings.result.shareBtn}
        </button>

        {/* Wrong answers — value for non-converters */}
        {wrongQuestions.length > 0 && (
          <section className="mb-10">
            <h2 className="text-xs uppercase tracking-widest text-muted mb-4">
              {strings.result.wrongSectionLabel}
            </h2>
            <ul className="flex flex-col gap-3">
              {wrongQuestions.map(({ sq }) => (
                <li
                  key={sq.question.id}
                  className="bg-surface border border-border rounded-xl px-4 py-3 flex flex-col gap-1"
                >
                  <span className="font-serif font-bold text-lg text-text">
                    {sq.question.czechWord}
                  </span>
                  <div className="h-px bg-brand w-8" />
                  <span className="text-sm text-text">{sq.question.czechMeaning}</span>
                  <span className="text-xs text-muted">
                    {strings.result.wrongNotPrefix}{sq.question.russianTrapMeaning}{strings.result.wrongNotSuffix}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        )}

        <button
          onClick={onRestart}
          className="text-xs text-muted underline underline-offset-2"
        >
          {strings.result.restartBtn}
        </button>
      </main>
    </div>
  );
}
