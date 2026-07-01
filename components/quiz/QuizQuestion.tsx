import type { SessionQuestion } from "@/lib/quiz-engine";
import type { Strings } from "@/lib/i18n/types";

type Phase = "question" | "feedback";

type Props = {
  sessionQuestion: SessionQuestion;
  questionNumber: number;
  total: number;
  phase: Phase;
  selectedIndex: number | null;
  onAnswer: (optionIndex: number) => void;
  onNext: () => void;
  strings: Strings;
};

export default function QuizQuestion({
  sessionQuestion,
  questionNumber,
  total,
  phase,
  selectedIndex,
  onAnswer,
  onNext,
  strings,
}: Props) {
  const { question, options, correctIndex } = sessionQuestion;
  const isCorrect = selectedIndex === correctIndex;

  function optionStyle(i: number): string {
    const base =
      "flex items-center gap-3 w-full text-left px-4 py-3.5 rounded-xl border text-sm font-medium min-h-[52px] transition-colors";
    if (phase === "feedback") {
      if (i === correctIndex)
        return `${base} border-correct bg-correct-bg text-correct`;
      if (i === selectedIndex)
        return `${base} border-wrong bg-wrong-bg text-wrong`;
      return `${base} border-border text-muted opacity-40`;
    }
    return `${base} border-border bg-surface active:bg-border`;
  }

  function optionIcon(i: number): string {
    if (phase !== "feedback") return "";
    if (i === correctIndex) return "✓";
    if (i === selectedIndex) return "✗";
    return "";
  }

  return (
    <div className="min-h-screen bg-bg flex flex-col">
      {/* Top bar: logo + progress */}
      <header className="px-6 pt-8 pb-4 flex items-center gap-4">
        <span className="text-brand font-bold text-xl leading-none shrink-0 select-none">Č</span>
        <div className="flex-1 h-1 bg-border rounded-full overflow-hidden">
          <div
            className="h-full bg-brand rounded-full transition-all duration-300"
            style={{ width: `${(questionNumber / total) * 100}%` }}
          />
        </div>
        <span className="text-xs text-muted shrink-0">{questionNumber}/{total}</span>
      </header>

      <main className="flex-1 flex flex-col px-6 pb-10 max-w-sm mx-auto w-full">
        {/* Czech word — the lexicographic headword */}
        <div className="mb-8 mt-4">
          <p className="font-serif text-5xl font-bold tracking-tight text-text leading-tight">
            {question.czechWord}
          </p>
          <div className="h-px bg-brand mt-3 mb-2 w-16" />
          <p className="text-muted text-sm italic">{question.exampleCzech}</p>
        </div>

        {/* Prompt */}
        <p className="text-xs text-muted uppercase tracking-widest mb-4">
          {strings.question.prompt}
        </p>

        {/* Answer options */}
        <ul className="flex flex-col gap-3 mb-6">
          {options.map((opt, i) => (
            <li key={i}>
              <button
                onClick={() => phase === "question" && onAnswer(i)}
                disabled={phase === "feedback"}
                className={optionStyle(i)}
              >
                <span className="w-4 shrink-0 text-center font-bold text-base leading-none">
                  {optionIcon(i)}
                </span>
                <span>{opt}</span>
              </button>
            </li>
          ))}
        </ul>

        {/* Feedback panel */}
        {phase === "feedback" && (
          <div className="bg-surface border border-border rounded-xl p-5 flex flex-col gap-3">
            <p className={`font-semibold text-sm ${isCorrect ? "text-correct" : "text-wrong"}`}>
              {isCorrect ? strings.question.correct : strings.question.wrong}
            </p>
            <div className="h-px bg-border" />
            <p className="text-sm">
              <span className="font-bold font-serif">{question.czechWord}</span>{" "}
              {strings.question.meaningOf} {question.czechMeaning}.
            </p>
            <p className="text-sm text-muted leading-relaxed">{question.explanation}</p>
            <blockquote className="border-l-2 border-brand pl-3 flex flex-col gap-1 text-xs text-muted italic">
              <span>{question.exampleCzech}</span>
              <span>{question.exampleRussian}</span>
            </blockquote>
            <button
              onClick={onNext}
              className="w-full mt-1 bg-brand hover:bg-brand-dark active:bg-brand-dark text-white py-3.5 text-sm font-semibold rounded-xl transition-colors min-h-[52px]"
            >
              {questionNumber === total ? strings.question.results : strings.question.next}
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
