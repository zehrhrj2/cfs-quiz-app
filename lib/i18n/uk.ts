import type { Strings } from "./types";

export const strings: Strings = {
  meta: {
    // RU: "Знаешь ли ты чешский? | Czech for Slavs"
    title: "Чи знаєш ти чеську? | Czech for Slavs",
    // EN: "Do you know Czech? | Czech for Slavs"

    // RU: "Тест на ложные друзья: 15 слов, которые путают русскоязычных."
    description:
      "Тест на хибних друзів перекладача: 15 слів, які плутають україномовних.",
    // EN: "Test on false friends: 15 words that confuse Ukrainian speakers."

    og: {
      // RU: "Знаешь ли ты чешский?"
      title: "Чи знаєш ти чеську?",
      // EN: "Do you know Czech?"

      // RU: "15 слов. 4 варианта. Посмотрим, поймаешь ли."
      description: "15 слів. 4 варіанти. Подивимось, чи впіймаєш.",
      // EN: "15 words. 4 options. Let's see if you'll catch it."
    },
  },
  intro: {
    // RU: "ужасный"
    demoTrapMeaning: "жахливий",
    // EN: "terrible / awful"

    // RU: "то, что думает русский"
    demoTrapLabel: "те, що думає українець",
    // EN: "what a Ukrainian [speaker] thinks"

    // RU: "потрясающий"
    demoCorrectMeaning: "приголомшливий",
    // EN: "amazing"

    // RU: "Чешский — не русский."
    headlineLine1: "Чеська — не українська.",
    // EN: "Czech is not Ukrainian."

    // RU: "Даже когда кажется, что да."
    headlineLine2: "Навіть коли здається, що так.",
    // EN: "Even when it seems like it is."

    // RU: "15 слов, которые звучат знакомо и значат совсем другое. Посмотрим, сколько ловушек ты поймаешь."
    description:
      "15 слів, які звучать знайомо, а означають зовсім інше. Подивимось, скільки пасток ти впіймаєш.",
    // EN: "15 words that sound familiar and mean something completely different. Let's see how many traps you'll catch."

    // RU: "Начать тест →"
    cta: "Почати тест →",
    // EN: "Start the test →"

    // RU: "Без регистрации · 3–4 минуты"
    noReg: "Без реєстрації · 3–4 хвилини",
    // EN: "No registration · 3–4 minutes"
  },
  question: {
    // RU: "Что значит по-чешски?"
    prompt: "Що це означає чеською?",
    // EN: "What does this mean in Czech?"

    // RU: "✓ Правильно!"
    correct: "✓ Правильно!",
    // EN: "✓ Correct!"

    // RU: "✗ Неверно."
    wrong: "✗ Неправильно.",
    // EN: "✗ Incorrect."

    // RU: "по-чешски —"
    meaningOf: "чеською —",
    // EN: "in Czech —"

    // RU: "Дальше →"
    next: "Далі →",
    // EN: "Next →"

    // RU: "Результаты →"
    results: "Результати →",
    // EN: "Results →"
  },
  result: {
    // RU: "Среднее по тесту:"
    averageLabel: "Середній результат:",
    // EN: "Average for the test:"

    // RU: "Установить CFS — 7 дней бесплатно"
    installBtn: "Встановити CFS — 7 днів безкоштовно",
    // EN: "Install CFS — 7 days free"

    // RU: "Поделиться результатом"
    shareBtn: "Поділитися результатом",
    // EN: "Share the result"

    // RU: "Я знаю чешский на {score} / {total}. А ты?"
    shareTextTemplate: "Я знаю чеську на {score} / {total}. А ти?",
    // EN: "I know Czech at {score} / {total}. Do you?"

    // RU: "Слова, которые вас поймали"
    wrongSectionLabel: "Слова, які вас спіймали",
    // EN: "Words that caught you"

    // RU: "не «"
    wrongNotPrefix: "не «",
    // EN: "not \""

    // RU: "»"
    wrongNotSuffix: "»",
    // EN: "\""

    // RU: "Пройти снова"
    restartBtn: "Пройти ще раз",
    // EN: "Take it again"
  },
  tiers: [
    {
      min: 0,
      max: 5,
      // RU: "Чешский всё ещё держит сюрпризы. Хорошая новость — теперь вы знаете, где мозг ловится."
      text: "Чеська ще тримає сюрпризи. Добра новина — тепер ви знаєте, де мозок ловиться.",
      // EN: "Czech still holds surprises. The good news — now you know where your brain gets tripped up."

      // RU: "CFS объясняет именно такие ловушки — каждый день по чуть-чуть."
      subtext: "CFS пояснює саме такі пастки — потроху щодня.",
      // EN: "CFS explains exactly these traps — a little every day."
    },
    {
      min: 6,
      max: 10,
      // RU: "Неплохо, но язык всё ещё ставит ловушки. Самое время закрыть пробелы."
      text: "Непогано, але мова все ще ставить пастки. Саме час закрити прогалини.",
      // EN: "Not bad, but the language still sets traps. Time to close the gaps."

      // RU: "7 дней бесплатно — посмотрите, что вы пропускаете."
      subtext: "7 днів безкоштовно — подивіться, що ви пропускаєте.",
      // EN: "7 days free — see what you're missing."
    },
    {
      min: 11,
      max: 15,
      // RU: "Вы знаете чешский лучше большинства. Готовы к следующему уровню?"
      text: "Ви знаєте чеську краще за більшість. Готові до наступного рівня?",
      // EN: "You know Czech better than most. Ready for the next level?"

      // RU: "CFS выведет вас на настоящий разговорный уровень."
      subtext: "CFS виведе вас на справжній розмовний рівень.",
      // EN: "CFS will bring you to a real conversational level."
    },
  ],
};
