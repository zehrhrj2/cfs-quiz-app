import type { Phrase } from "@/data/doctor-phrases";

type Props = {
  phrase: Phrase | null;
  closeLabel: string;
  onClose: () => void;
};

export default function ShowToDoctorModal({ phrase, closeLabel, onClose }: Props) {
  if (!phrase) return null;

  return (
    <div className="fixed inset-0 z-50 bg-surface flex flex-col">
      <div className="flex justify-end p-4">
        <button
          type="button"
          onClick={onClose}
          aria-label={closeLabel}
          className="min-w-[56px] min-h-[56px] flex items-center justify-center rounded-full bg-bg border border-border text-2xl font-bold text-text active:bg-border"
        >
          ✕
        </button>
      </div>
      <div className="flex-1 flex items-center justify-center px-6 pb-16">
        <p className="font-serif text-4xl sm:text-5xl font-bold text-center text-text leading-tight break-words">
          {phrase.cs}
        </p>
      </div>
    </div>
  );
}
