import type { Strings } from "@/lib/i18n/types";

type Props = {
  onStart: () => void;
  strings: Strings;
};

export default function QuizIntro({ onStart, strings }: Props) {
  return (
    <div className="min-h-screen bg-bg flex flex-col">
      {/* Logo mark */}
      <header className="px-6 pt-8 pb-2">
        <span className="text-brand font-bold text-2xl leading-none select-none">Č</span>
      </header>

      <main className="flex-1 flex flex-col justify-center px-6 pb-10 max-w-sm mx-auto w-full gap-8">

        {/* Lexicographic teaser card — the visual motif */}
        <div className="bg-surface border border-border rounded-xl p-5 shadow-sm">
          {/* Dictionary headword */}
          <p className="font-serif text-4xl font-bold tracking-tight text-text mb-1">
            úžasný
          </p>
          {/* Brand-red rule */}
          <div className="h-px bg-brand mb-4" />
          {/* Two rows: wrong vs right */}
          <div className="flex flex-col gap-2.5 text-sm">
            <div className="flex items-center gap-2.5">
              <span className="w-4 text-wrong font-bold shrink-0">✗</span>
              <span className="text-muted line-through">{strings.intro.demoTrapMeaning}</span>
              <span className="text-muted text-xs ml-auto">{strings.intro.demoTrapLabel}</span>
            </div>
            <div className="flex items-center gap-2.5">
              <span className="w-4 text-correct font-bold shrink-0">✓</span>
              <span className="font-medium">{strings.intro.demoCorrectMeaning}</span>
            </div>
          </div>
        </div>

        {/* Headline + description */}
        <div className="flex flex-col gap-3">
          <h1 className="text-2xl font-bold leading-snug">
            {strings.intro.headlineLine1}<br />
            {strings.intro.headlineLine2}
          </h1>
          <p className="text-muted text-sm leading-relaxed">
            {strings.intro.description}
          </p>
        </div>

        {/* CTA */}
        <div className="flex flex-col gap-3">
          <button
            onClick={onStart}
            className="w-full bg-brand hover:bg-brand-dark active:bg-brand-dark text-white py-4 text-base font-semibold rounded-xl transition-colors min-h-[52px]"
          >
            {strings.intro.cta}
          </button>
          <p className="text-xs text-center text-muted">
            {strings.intro.noReg}
          </p>
        </div>
      </main>
    </div>
  );
}
