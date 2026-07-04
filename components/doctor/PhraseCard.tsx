import type { Phrase, Locale } from "@/data/doctor-phrases";
import type { DoctorStrings } from "@/lib/doctor/strings";

type Props = {
  phrase: Phrase;
  locale: Locale;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onShowToDoctor: (phrase: Phrase) => void;
  onPlay: (phrase: Phrase) => void;
  strings: DoctorStrings;
};

export default function PhraseCard({
  phrase,
  locale,
  isFavorite,
  onToggleFavorite,
  onShowToDoctor,
  onPlay,
  strings,
}: Props) {
  const translation = locale === "ua" ? phrase.ua : phrase.ru;

  return (
    <div className="bg-surface border border-border rounded-xl p-4 flex flex-col gap-3 shadow-sm">
      {/* Parent's language on top — what they read first */}
      <div className="flex items-start justify-between gap-3">
        <p className="text-base font-medium text-text leading-snug">{translation}</p>
        <button
          type="button"
          onClick={() => onToggleFavorite(phrase.id)}
          aria-label={isFavorite ? strings.card.favoriteOn : strings.card.favoriteOff}
          aria-pressed={isFavorite}
          className={`shrink-0 text-2xl leading-none min-w-[44px] min-h-[44px] flex items-center justify-center ${
            isFavorite ? "text-brand" : "text-border"
          }`}
        >
          {isFavorite ? "★" : "☆"}
        </button>
      </div>

      <div className="h-px bg-border" />

      {/* Czech below — what the doctor reads */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <p className="font-serif text-xl font-bold text-text leading-snug">{phrase.cs}</p>
          <p className="text-muted text-sm mt-1">{phrase.csCyrillic}</p>
        </div>
        <button
          type="button"
          onClick={() => onPlay(phrase)}
          aria-label={strings.card.play}
          className="shrink-0 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full bg-bg border border-border text-brand text-xl active:bg-border"
        >
          🔊
        </button>
      </div>

      <button
        type="button"
        onClick={() => onShowToDoctor(phrase)}
        className="w-full mt-1 bg-brand hover:bg-brand-dark active:bg-brand-dark text-white py-3 text-sm font-semibold rounded-xl transition-colors min-h-[60px]"
      >
        {strings.card.showToDoctor}
      </button>
    </div>
  );
}
