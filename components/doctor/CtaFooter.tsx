import { trackDoctorEvent } from "@/lib/doctor/analytics";
import { PLAY_STORE_URLS } from "@/lib/doctor/strings";
import type { Locale } from "@/data/doctor-phrases";

type Props = {
  visible: boolean;
  locale: Locale;
  text: string;
  buttonLabel: string;
};

export default function CtaFooter({ visible, locale, text, buttonLabel }: Props) {
  if (!visible) return null;

  return (
    <div className="fixed bottom-0 inset-x-0 z-20 bg-surface border-t border-border p-4 shadow-[0_-4px_12px_rgba(0,0,0,0.08)]">
      <div className="max-w-sm mx-auto flex flex-col gap-2">
        <p className="text-sm text-text text-center leading-snug">{text}</p>
        <a
          href={PLAY_STORE_URLS[locale]}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackDoctorEvent("doctor_cfs_cta_click", { locale })}
          className="w-full bg-brand hover:bg-brand-dark active:bg-brand-dark text-white py-3.5 text-sm font-semibold rounded-xl transition-colors min-h-[52px] flex items-center justify-center"
        >
          {buttonLabel}
        </a>
      </div>
    </div>
  );
}
