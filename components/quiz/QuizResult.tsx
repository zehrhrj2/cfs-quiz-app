"use client";

import {
  PLAY_STORE_URL,
  QUIZ_URL,
  TIER_CONFIG,
  AVERAGE_SCORE,
} from "@/lib/constants";
import { analytics } from "@/lib/analytics";
import type { SessionQuestion } from "@/lib/quiz-engine";

type Props = {
  score: number;
  total: number;
  wrongQuestions: { sq: SessionQuestion; answeredIndex: number | null }[];
  onRestart: () => void;
};

function getTier(score: number) {
  return (
    TIER_CONFIG.find((t) => score >= t.min && score <= t.max) ?? TIER_CONFIG[0]
  );
}

export default function QuizResult({
  score,
  total,
  wrongQuestions,
  onRestart,
}: Props) {
  const tier = getTier(score);

  async function handleShare() {
    const shareText = `Я знаю чешский на ${score} / ${total}. А ты?`;
    if (navigator.share) {
      try {
        await navigator.share({ title: shareText, url: QUIZ_URL });
        analytics.resultShared("native");
      } catch {
        // user cancelled — no-op
      }
    } else {
      await navigator.clipboard.writeText(`${shareText} ${QUIZ_URL}`);
      analytics.resultShared("copy");
      // TODO (Step 7): show "Скопировано!" toast
    }
  }

  function handleInstall() {
    analytics.installClicked(score);
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
          {/* TODO (Step 6): replace AVERAGE_SCORE with real aggregate */}
          <p className="text-xs text-muted">
            Среднее по тесту: {AVERAGE_SCORE} / {total}
          </p>
          <div className="h-px bg-brand mt-4 w-12" />
        </div>

        {/* Tier text */}
        <p className="text-base font-medium leading-snug mb-8">{tier.text}</p>

        {/* Primary CTA */}
        <button
          onClick={handleInstall}
          className="w-full bg-brand hover:bg-brand-dark active:bg-brand-dark text-white py-4 text-base font-bold rounded-xl transition-colors mb-2 min-h-[56px]"
        >
          Установить CFS — 7 дней бесплатно
        </button>
        <p className="text-xs text-center text-muted mb-8">{tier.subtext}</p>

        {/* Share */}
        <button
          onClick={handleShare}
          className="w-full border border-brand text-brand hover:bg-brand/5 active:bg-brand/10 py-3.5 text-sm font-semibold rounded-xl transition-colors mb-10 min-h-[52px]"
        >
          Поделиться результатом
        </button>

        {/* Wrong answers — value for non-converters */}
        {wrongQuestions.length > 0 && (
          <section className="mb-10">
            <h2 className="text-xs uppercase tracking-widest text-muted mb-4">
              Слова, которые вас поймали
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
                    не «{sq.question.russianTrapMeaning}»
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
          Пройти снова
        </button>
      </main>
    </div>
  );
}
