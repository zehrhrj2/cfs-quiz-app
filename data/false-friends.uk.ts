import type { FalseFriend } from "./false-friends";

export const FALSE_FRIENDS: FalseFriend[] = [
  // EN: "girl" (CZ) vs "голка" = needle (UK trap)
  {
    id: "uk-01",
    czechWord: "holka",
    czechMeaning: "дівчина",
    russianTrapMeaning: "голка (голка для шиття)",
    distractors: ["жінка", "сестра"],
    exampleCzech: "Ta holka je moje sestra.",
    exampleRussian: "Ця дівчина — моя сестра.",
    explanation:
      "«Holka» по-чеськи означає «дівчина», розмовний варіант слова «dívka». До голки для шиття це слово стосунку не має — голка по-чеськи «jehla».",
    difficulty: 2,
    category: "other",
  },
  // EN: "life" (CZ) vs "живіт" = belly (UK trap)
  {
    id: "uk-02",
    czechWord: "život",
    czechMeaning: "життя",
    russianTrapMeaning: "живіт (частина тіла)",
    distractors: ["доля", "здоров'я"],
    exampleCzech: "Život je krásný.",
    exampleRussian: "Життя прекрасне.",
    explanation:
      "«Život» по-чеськи означає «життя», а не частину тіла. Живіт по-чеськи — «břicho», зовсім інше слово.",
    difficulty: 1,
    category: "body",
  },
  // EN: "May" (CZ) vs "квітень" = April (UK trap)
  {
    id: "uk-03",
    czechWord: "květen",
    czechMeaning: "травень",
    russianTrapMeaning: "квітень (місяць)",
    distractors: ["березень", "червень"],
    exampleCzech: "Narodil jsem se v květnu.",
    exampleRussian: "Я народився у травні.",
    explanation:
      "«Květen» по-чеськи — це травень, а не квітень. Квітень по-чеськи називається «duben».",
    difficulty: 1,
    category: "time",
  },
  // EN: "library / bookcase" (CZ) vs "книгарня" = bookshop (UK trap)
  {
    id: "uk-04",
    czechWord: "knihovna",
    czechMeaning: "бібліотека / книжкова шафа",
    russianTrapMeaning: "книгарня (магазин)",
    distractors: ["архів", "читальня"],
    exampleCzech: "Jdu do knihovny vrátit knihu.",
    exampleRussian: "Я йду в бібліотеку повернути книгу.",
    explanation:
      "«Knihovna» — це бібліотека (або книжкова шафа вдома), а не книгарня, де книги продають. Книгарня по-чеськи — «knihkupectví».",
    difficulty: 2,
    category: "object",
  },
  // EN: "pharmacy" (CZ) vs "лікарня" = hospital (UK trap)
  {
    id: "uk-05",
    czechWord: "lékárna",
    czechMeaning: "аптека",
    russianTrapMeaning: "лікарня (заклад)",
    distractors: ["поліклініка", "клініка"],
    exampleCzech: "Kde je nejbližší lékárna?",
    exampleRussian: "Де найближча аптека?",
    explanation:
      "«Lékárna» — це аптека, де купують ліки. Лікарня (де лікують) по-чеськи — «nemocnice».",
    difficulty: 1,
    category: "object",
  },
  // EN: "mother" (CZ) vs "матка" = uterus (UK trap)
  {
    id: "uk-06",
    czechWord: "matka",
    czechMeaning: "мати",
    russianTrapMeaning: "матка (орган)",
    distractors: ["бабуся", "тітка"],
    exampleCzech: "Moje matka vaří skvěle.",
    exampleRussian: "Моя мати чудово готує.",
    explanation:
      "«Matka» по-чеськи — просто «мати». Матка як орган по-чеськи називається «děloha».",
    difficulty: 2,
    category: "body",
  },
  // EN: "chair / stool" (CZ) vs "столиця" = capital city (UK trap)
  {
    id: "uk-07",
    czechWord: "stolice",
    czechMeaning: "стілець / табурет",
    russianTrapMeaning: "столиця (головне місто)",
    distractors: ["трон", "лава"],
    exampleCzech: "Posaď se na tu stolici.",
    exampleRussian: "Сідай на той стілець.",
    explanation:
      "«Stolice» по-чеськи — це стілець або табурет, а не столиця. Столиця по-чеськи — «hlavní město».",
    difficulty: 2,
    category: "object",
  },
  // EN: "difference" (CZ) vs "розділ" = chapter / section (UK trap)
  {
    id: "uk-08",
    czechWord: "rozdíl",
    czechMeaning: "різниця",
    russianTrapMeaning: "розділ (частина тексту)",
    distractors: ["підсумок", "порівняння"],
    exampleCzech: "Jaký je rozdíl mezi těmi slovy?",
    exampleRussian: "Яка різниця між цими словами?",
    explanation:
      "«Rozdíl» по-чеськи означає «різниця». Розділ тексту по-чеськи — «kapitola» або «oddíl».",
    difficulty: 3,
    category: "other",
  },
  // EN: "speech" (CZ) vs "річ" = thing / matter (UK trap)
  {
    id: "uk-09",
    czechWord: "řeč",
    czechMeaning: "мова / промова",
    russianTrapMeaning: "річ (предмет)",
    distractors: ["голос", "розмова"],
    exampleCzech: "Měl skvělou řeč.",
    exampleRussian: "Він виголосив чудову промову.",
    explanation:
      "«Řeč» по-чеськи — це мова або промова, а не річ у значенні предмета. Річ по-чеськи — «věc».",
    difficulty: 2,
    category: "other",
  },
  // EN: "preparation" (CZ) vs "приправа" = seasoning / spice (UK trap)
  {
    id: "uk-10",
    czechWord: "příprava",
    czechMeaning: "підготовка",
    russianTrapMeaning: "приправа (спеція)",
    distractors: ["тренування", "репетиція"],
    exampleCzech: "Příprava na zkoušku trvala týden.",
    exampleRussian: "Підготовка до іспиту тривала тиждень.",
    explanation:
      "«Příprava» по-чеськи — це підготовка до чогось. Приправа (спеція) по-чеськи — «koření».",
    difficulty: 2,
    category: "other",
  },
  // EN: "fraudulent" (CZ) vs "підводний" = underwater (UK trap)
  {
    id: "uk-11",
    czechWord: "podvodný",
    czechMeaning: "шахрайський",
    russianTrapMeaning: "підводний (під водою)",
    distractors: ["крадений", "фальшивий"],
    exampleCzech: "To byl podvodný telefonát.",
    exampleRussian: "Це був шахрайський дзвінок.",
    explanation:
      "«Podvodný» по-чеськи означає «шахрайський», пов'язаний з обманом. Підводний (під водою) по-чеськи — «podvodní» — слова відрізняються лише однією літерою, але значення геть різні.",
    difficulty: 2,
    category: "other",
  },
  // EN: "look / appear" (CZ) vs "випадати" = fall out (UK trap)
  {
    id: "uk-12",
    czechWord: "vypadat",
    czechMeaning: "виглядати",
    russianTrapMeaning: "випадати (випадати з рук)",
    distractors: ["здаватися", "нагадувати"],
    exampleCzech: "Vypadáš dnes unaveně.",
    exampleRussian: "Ти сьогодні виглядаєш втомленим.",
    explanation:
      "«Vypadat» по-чеськи означає «виглядати, мати вигляд», а не «випадати». Звучання оманливе — схоже на українське «випадати», але сенс інший.",
    difficulty: 2,
    category: "verb",
  },
  // EN: "reputation / legend" (CZ) vs "повість" = novel / novella (UK trap)
  {
    id: "uk-13",
    czechWord: "pověst",
    czechMeaning: "репутація / легенда",
    russianTrapMeaning: "повість (літературний твір)",
    distractors: ["чутка", "переказ"],
    exampleCzech: "Ten hrad má zajímavou pověst.",
    exampleRussian: "Цей замок має цікаву легенду.",
    explanation:
      "«Pověst» по-чеськи означає «репутація» або «легенда, переказ», а не «повість» як прозовий твір. Повість по-чеськи — «novela» або «povídka».",
    difficulty: 3,
    category: "other",
  },
  // EN: "Slovak" (CZ) vs "словенський" = Slovene (UK trap)
  {
    id: "uk-14",
    czechWord: "slovenský",
    czechMeaning: "словацький",
    russianTrapMeaning: "словенський (зі Словенії)",
    distractors: ["чеський", "польський"],
    exampleCzech: "Mluví slovensky.",
    exampleRussian: "Він розмовляє словацькою.",
    explanation:
      "«Slovenský» по-чеськи стосується Словаччини, а не Словенії. Словенський (зі Словенії) по-чеськи — «slovinský».",
    difficulty: 3,
    category: "other",
  },
  // EN: "priest" (CZ) vs "князь" = prince / duke (UK trap)
  {
    id: "uk-15",
    czechWord: "kněz",
    czechMeaning: "священник",
    russianTrapMeaning: "князь (правитель)",
    distractors: ["монах", "єпископ"],
    exampleCzech: "Kněz sloužil mši v neděli.",
    exampleRussian: "Священник відправляв месу в неділю.",
    explanation:
      "«Kněz» по-чеськи — це священник, служитель церкви, а не князь-правитель. Князь по-чеськи — «kníže».",
    difficulty: 2,
    category: "other",
  },
];
