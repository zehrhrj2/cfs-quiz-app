export const QUESTIONS_PER_SESSION = 15;

// TODO: replace with real Play Store URL before launch
export const PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=PLACEHOLDER";

export const QUIZ_URL = "https://test.czechforslavs.com";

// TODO: wire AVERAGE_SCORE to real analytics aggregate (Step 6)
export const AVERAGE_SCORE = 8;

export const TIER_CONFIG = [
  {
    min: 0,
    max: 5,
    text: "Чешский всё ещё держит сюрпризы. Хорошая новость — теперь вы знаете, где мозг ловится.",
    subtext: "CFS объясняет именно такие ловушки — каждый день по чуть-чуть.",
  },
  {
    min: 6,
    max: 10,
    text: "Неплохо, но язык всё ещё ставит ловушки. Самое время закрыть пробелы.",
    subtext: "7 дней бесплатно — посмотрите, что вы пропускаете.",
  },
  {
    min: 11,
    max: 15,
    text: "Вы знаете чешский лучше большинства. Готовы к следующему уровню?",
    subtext: "CFS выведет вас на настоящий разговорный уровень.",
  },
] as const;
