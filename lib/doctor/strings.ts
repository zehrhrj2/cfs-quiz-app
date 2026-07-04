import type { Locale } from "@/data/doctor-phrases";

// UI copy only. Hero/CTA copy beyond what the spec gave verbatim (headline,
// subhead, meta tags) was translated here, not by a native speaker — same
// "needs review" status as the `verified: false` phrases in doctor-phrases.ts.
export type DoctorStrings = {
  meta: {
    title: string;
    description: string;
  };
  hero: {
    eyebrow: string;
    headline: string;
    subhead: string;
    appBlurb: string;
  };
  search: {
    placeholder: string;
    noResults: string;
  };
  categories: {
    allLabel: string;
  };
  card: {
    showToDoctor: string;
    play: string;
    favoriteOn: string;
    favoriteOff: string;
  };
  modal: {
    close: string;
  };
  offline: {
    ready: string;
  };
  pdf: {
    button: string;
    generating: string;
    error: string;
  };
  pdfDoc: {
    filename: string;
    coverSubtitle: string;
    footer: string;
    ctaPitch: string;
  };
  cta: {
    text: string;
    button: string;
  };
};

export const doctorStrings: Record<Locale, DoctorStrings> = {
  ua: {
    meta: {
      title: "40 фраз для візиту до лікаря — чеська для українців",
      description:
        "Безкоштовний набір з 40 базових чеських фраз для батьків, які йдуть до лікаря з дитиною. Українською, російською, з озвучкою. Працює без інтернету.",
    },
    hero: {
      eyebrow: "Czech for Slavs",
      headline: "40 фраз для візиту до лікаря",
      subhead: "Українською, російською, чеською. Без інтернету. Безкоштовно.",
      appBlurb:
        "Створено командою Czech for Slavs — безкоштовного додатку для вивчення чеської мови.",
    },
    search: {
      placeholder: "Пошук фрази...",
      noResults: "Нічого не знайдено",
    },
    categories: {
      allLabel: "Усі",
    },
    card: {
      showToDoctor: "Показати лікарю",
      play: "Прослухати вимову",
      favoriteOn: "Прибрати з обраного",
      favoriteOff: "Додати в обране",
    },
    modal: {
      close: "Закрити",
    },
    offline: {
      ready: "✓ Доступно офлайн",
    },
    pdf: {
      button: "Завантажити PDF",
      generating: "Готуємо PDF...",
      error: "Не вдалося створити PDF. Спробуйте ще раз.",
    },
    pdfDoc: {
      filename: "zdravi-cesky-40-frazi.pdf",
      coverSubtitle: "Українською • Чеською • З вимовою",
      footer: "Czech for Slavs • test.czechforslavs.com/doctor",
      ctaPitch:
        "Хочете вивчити чеську повністю? Спробуйте безкоштовний додаток Czech for Slavs.",
    },
    cta: {
      text: "Хочете вивчити чеську повністю? Спробуйте безкоштовний додаток Czech for Slavs",
      button: "Спробувати додаток",
    },
  },
  ru: {
    meta: {
      title: "40 фраз для визита к врачу — чешский для русскоязычных",
      description:
        "Бесплатный набор из 40 базовых чешских фраз для родителей, которые идут к врачу с ребёнком. На русском, украинском, с озвучкой. Работает без интернета.",
    },
    hero: {
      eyebrow: "Czech for Slavs",
      headline: "40 фраз для визита к врачу",
      subhead: "На украинском, русском, чешском. Без интернета. Бесплатно.",
      appBlurb:
        "Создано командой Czech for Slavs — бесплатного приложения для изучения чешского языка.",
    },
    search: {
      placeholder: "Поиск фразы...",
      noResults: "Ничего не найдено",
    },
    categories: {
      allLabel: "Все",
    },
    card: {
      showToDoctor: "Показать врачу",
      play: "Прослушать произношение",
      favoriteOn: "Убрать из избранного",
      favoriteOff: "Добавить в избранное",
    },
    modal: {
      close: "Закрыть",
    },
    offline: {
      ready: "✓ Доступно офлайн",
    },
    pdf: {
      button: "Скачать PDF",
      generating: "Готовим PDF...",
      error: "Не удалось создать PDF. Попробуйте ещё раз.",
    },
    pdfDoc: {
      filename: "zdorove-cheshsky-40-fraz.pdf",
      coverSubtitle: "На русском • На чешском • С произношением",
      footer: "Czech for Slavs • test.czechforslavs.com/doctor/ru",
      ctaPitch:
        "Хотите выучить чешский полностью? Попробуйте бесплатное приложение Czech for Slavs.",
    },
    cta: {
      text: "Хотите выучить чешский полностью? Попробуйте бесплатное приложение Czech for Slavs",
      button: "Попробовать приложение",
    },
  },
};

// Play Install Referrer format: referrer=<url-encoded utm_source=...&utm_medium=...&...>
// so Play Console attributes installs back to this lead magnet, split by locale.
export const PLAY_STORE_URLS: Record<Locale, string> = {
  ua: "https://play.google.com/store/apps/details?id=com.cesky.app&referrer=utm_source%3Ddoctor_phrases%26utm_medium%3Dlead_magnet%26utm_campaign%3Ddoctor%26utm_content%3Dua",
  ru: "https://play.google.com/store/apps/details?id=com.cesky.app&referrer=utm_source%3Ddoctor_phrases%26utm_medium%3Dlead_magnet%26utm_campaign%3Ddoctor%26utm_content%3Dru",
};
