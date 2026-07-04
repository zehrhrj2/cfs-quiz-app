"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { phrases, type Category, type Locale, type Phrase } from "@/data/doctor-phrases";
import type { DoctorStrings } from "@/lib/doctor/strings";
import { trackDoctorEvent } from "@/lib/doctor/analytics";
import { useFavorites } from "@/lib/doctor/useFavorites";
import { useOfflineCache } from "@/lib/doctor/useOfflineCache";
import SearchBar from "./SearchBar";
import CategoryTabs from "./CategoryTabs";
import PhraseCard from "./PhraseCard";
import ShowToDoctorModal from "./ShowToDoctorModal";
import DownloadPdfButton from "./DownloadPdfButton";
import CtaFooter from "./CtaFooter";

type Props = {
  locale: Locale;
  strings: DoctorStrings;
  utm: { source: string | null; medium: string | null; campaign: string | null };
};

export default function DoctorClient({ locale, strings, utm }: Props) {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<Category | null>(null);
  const [modalPhrase, setModalPhrase] = useState<Phrase | null>(null);
  const { favorites, toggleFavorite } = useFavorites();
  const offlineReady = useOfflineCache(locale);

  const ctaSentinelRef = useRef<HTMLDivElement | null>(null);
  const [ctaVisible, setCtaVisible] = useState(false);

  useEffect(() => {
    trackDoctorEvent("doctor_page_view", {
      locale,
      utm_source: utm.source,
      utm_medium: utm.medium,
      utm_campaign: utm.campaign,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Reveal the CTA once the user scrolls past the sentinel placed at the
  // midpoint of the (filtered) list, then stay visible — no flicker if they
  // scroll back up.
  useEffect(() => {
    const el = ctaSentinelRef.current;
    if (!el || ctaVisible) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setCtaVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -20% 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
    // sentinel's DOM position shifts whenever the filtered list changes, so
    // re-observe on those changes; skip once ctaVisible is already true
  }, [query, activeCategory, ctaVisible]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (q.length > 0) {
      return phrases.filter(
        (p) =>
          p.cs.toLowerCase().includes(q) ||
          p.ua.toLowerCase().includes(q) ||
          p.ru.toLowerCase().includes(q) ||
          p.csCyrillic.toLowerCase().includes(q)
      );
    }
    if (activeCategory === null) return phrases;
    return phrases.filter((p) => p.category === activeCategory);
  }, [query, activeCategory]);

  const sentinelIndex = Math.floor(filtered.length / 2);

  function handleSelectCategory(category: Category | null) {
    setActiveCategory(category);
    if (category) {
      trackDoctorEvent("doctor_category_opened", { locale, category });
    }
  }

  function handlePlay(phrase: Phrase) {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(phrase.cs);
      utterance.lang = "cs-CZ";
      window.speechSynthesis.speak(utterance);
    }
    trackDoctorEvent("doctor_phrase_played", { locale, phrase_id: phrase.id });
  }

  function handleToggleFavorite(id: string) {
    const willBeFavorite = !favorites.includes(id);
    toggleFavorite(id);
    if (willBeFavorite) {
      trackDoctorEvent("doctor_phrase_favorited", { locale, phrase_id: id });
    }
  }

  function handleShowToDoctor(phrase: Phrase) {
    setModalPhrase(phrase);
    trackDoctorEvent("doctor_show_to_doctor_opened", { locale, phrase_id: phrase.id });
  }

  return (
    <div className="min-h-screen bg-bg flex flex-col pb-28">
      <header className="px-4 pt-8 pb-2 max-w-sm mx-auto w-full flex flex-col gap-3">
        <span className="text-brand font-bold text-xl leading-none select-none">
          Č · {strings.hero.eyebrow}
        </span>
        <h1 className="text-2xl font-bold leading-snug text-text">{strings.hero.headline}</h1>
        <p className="text-muted text-sm leading-relaxed">{strings.hero.subhead}</p>
        <p className="text-muted text-xs leading-relaxed">{strings.hero.appBlurb}</p>
        {offlineReady && (
          <span className="text-xs text-correct font-medium">{strings.offline.ready}</span>
        )}
        <DownloadPdfButton
          locale={locale}
          label={strings.pdf.button}
          generatingLabel={strings.pdf.generating}
          errorMessage={strings.pdf.error}
        />
      </header>

      <div className="sticky top-0 z-10 bg-bg/95 backdrop-blur border-b border-border">
        <div className="max-w-sm mx-auto w-full">
          <SearchBar value={query} onChange={setQuery} placeholder={strings.search.placeholder} />
          <CategoryTabs
            locale={locale}
            active={activeCategory}
            onSelect={handleSelectCategory}
            allLabel={strings.categories.allLabel}
          />
        </div>
      </div>

      <main className="flex-1 max-w-sm mx-auto w-full px-4 pt-4 flex flex-col gap-3">
        {filtered.length === 0 && (
          <p className="text-muted text-sm text-center py-8">{strings.search.noResults}</p>
        )}
        {filtered.map((phrase, i) => (
          <div key={phrase.id}>
            {i === sentinelIndex && <div ref={ctaSentinelRef} />}
            <PhraseCard
              phrase={phrase}
              locale={locale}
              isFavorite={favorites.includes(phrase.id)}
              onToggleFavorite={handleToggleFavorite}
              onShowToDoctor={handleShowToDoctor}
              onPlay={handlePlay}
              strings={strings}
            />
          </div>
        ))}
      </main>

      <ShowToDoctorModal
        phrase={modalPhrase}
        closeLabel={strings.modal.close}
        onClose={() => setModalPhrase(null)}
      />

      <CtaFooter
        visible={ctaVisible}
        locale={locale}
        text={strings.cta.text}
        buttonLabel={strings.cta.button}
      />
    </div>
  );
}
