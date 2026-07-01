export type FalseFriend = {
  id: string;
  czechWord: string;
  czechMeaning: string;
  russianTrapMeaning: string;
  distractors: [string, string];
  exampleCzech: string;
  exampleRussian: string;
  explanation: string;
  difficulty: 1 | 2 | 3;
  category?: "body" | "food" | "emotion" | "time" | "object" | "verb" | "other";
};

export const FALSE_FRIENDS: FalseFriend[] = [
  // — Seed entries —
  {
    id: "zivot",
    czechWord: "život",
    czechMeaning: "жизнь",
    russianTrapMeaning: "живот (желудок)",
    distractors: ["время", "радость"],
    exampleCzech: "Život je krásný.",
    exampleRussian: "Жизнь прекрасна.",
    explanation:
      "По-чешски «život» — это «жизнь», а не часть тела. Живот по-чешски называется «břicho» — совсем другое слово.",
    difficulty: 1,
    category: "body",
  },
  {
    id: "cerstvy",
    czechWord: "čerstvý",
    czechMeaning: "свежий",
    russianTrapMeaning: "чёрствый (несвежий, зачерствевший)",
    distractors: ["холодный", "мягкий"],
    exampleCzech: "Chci čerstvý chléb.",
    exampleRussian: "Я хочу свежий хлеб.",
    explanation:
      "Чешское «čerstvý» означает ровно противоположное русскому «чёрствый» — это свежий, только что приготовленный. Вывеска «čerstvé pečivo» в пекарне — хороший знак, не плохой.",
    difficulty: 1,
    category: "food",
  },
  {
    id: "uzasny",
    czechWord: "úžasný",
    czechMeaning: "потрясающий, замечательный",
    russianTrapMeaning: "ужасный (страшный, отвратительный)",
    distractors: ["скучный", "грустный"],
    exampleCzech: "To je úžasný film!",
    exampleRussian: "Это потрясающий фильм!",
    explanation:
      "«Úžasný» — комплимент, а не оскорбление. Звучание обманывает: русское «ужасный» и чешское «úžasný» — антонимы.",
    difficulty: 1,
    category: "emotion",
  },
  {
    id: "pozor",
    czechWord: "pozor",
    czechMeaning: "внимание, осторожно",
    russianTrapMeaning: "позор (стыд, бесчестие)",
    distractors: ["поздно", "назад"],
    exampleCzech: "Pozor, schod!",
    exampleRussian: "Осторожно, ступенька!",
    explanation:
      "«Pozor!» — это предупреждение, как «Внимание!» или «Стоп!». На строительных заборах и дорожных знаках это слово означает опасность, а не стыд.",
    difficulty: 1,
    category: "other",
  },
  {
    id: "rodina",
    czechWord: "rodina",
    czechMeaning: "семья",
    russianTrapMeaning: "родина (отечество)",
    distractors: ["родители", "соседи"],
    exampleCzech: "Moje rodina je velká.",
    exampleRussian: "Моя семья большая.",
    explanation:
      "По-чешски «rodina» — это «семья», а «родина» переводится как «vlast» или «domovina». Один звук не меняет слово — меняет всё.",
    difficulty: 1,
    category: "other",
  },

  // — Batch 1 (Tier S) —
  {
    id: "potraviny",
    czechWord: "potraviny",
    czechMeaning: "продукты, продуктовый магазин",
    russianTrapMeaning: "потрава (порча, отравление)",
    distractors: ["яд", "отходы"],
    exampleCzech: "Kde jsou potraviny?",
    exampleRussian: "Где продуктовый магазин?",
    explanation:
      "«Potraviny» — вывеска на каждом втором магазине в Чехии: это просто «продукты». К «потраве» отношения не имеет.",
    difficulty: 1,
    category: "food",
  },
  {
    id: "vonet",
    czechWord: "vonět",
    czechMeaning: "приятно пахнуть, благоухать",
    russianTrapMeaning: "вонять (дурно пахнуть)",
    distractors: ["смердеть", "гнить"],
    exampleCzech: "Tady to hezky voní.",
    exampleRussian: "Здесь приятно пахнет.",
    explanation:
      "Полная инверсия: по-чешски «vonět» — комплимент запаху. «Voní to» в кофейне или пекарне означает, что пахнет хорошо.",
    difficulty: 2,
    category: "verb",
  },
  {
    id: "zapomenout",
    czechWord: "zapomenout",
    czechMeaning: "забыть",
    russianTrapMeaning: "запомнить (сохранить в памяти)",
    distractors: ["узнать", "выучить"],
    exampleCzech: "Zapomněl jsem klíče.",
    exampleRussian: "Я забыл ключи.",
    explanation:
      "Полная инверсия: «zapomenout» означает «забыть», не «запомнить». Чешское «запомнить» — «vzpomenout si» или «pamatovat si».",
    difficulty: 2,
    category: "verb",
  },
  {
    id: "zachod",
    czechWord: "záchod",
    czechMeaning: "туалет",
    russianTrapMeaning: "заход (вход, закат)",
    distractors: ["переход", "выход"],
    exampleCzech: "Kde je záchod?",
    exampleRussian: "Где туалет?",
    explanation:
      "В ресторане «záchod» — туалет, а не вход и не закат. Корень тот же, что в «заходить», но значение уехало в совершенно другую сторону.",
    difficulty: 1,
    category: "other",
  },
  {
    id: "ovoce",
    czechWord: "ovoce",
    czechMeaning: "фрукты",
    russianTrapMeaning: "овощи",
    distractors: ["зелень", "орехи"],
    exampleCzech: "Chci koupit ovoce.",
    exampleRussian: "Я хочу купить фрукты.",
    explanation:
      "«Ovoce» — фрукты, а «zelenina» — овощи. В супермаркете раздел «ovoce a zelenina» читается именно в таком порядке.",
    difficulty: 1,
    category: "food",
  },
  {
    id: "vedro",
    czechWord: "vedro",
    czechMeaning: "жара, зной",
    russianTrapMeaning: "ведро (bucket)",
    distractors: ["ветер", "туман"],
    exampleCzech: "Dnes je velké vedro.",
    exampleRussian: "Сегодня сильная жара.",
    explanation:
      "«Vedro» — это жара, не ёмкость для воды. Ведро по-чешски называется «kýbl».",
    difficulty: 2,
    category: "other",
  },
  {
    id: "sklep",
    czechWord: "sklep",
    czechMeaning: "подвал, погреб",
    russianTrapMeaning: "склеп (гробница)",
    distractors: ["морг", "могила"],
    exampleCzech: "V sklepě je chladno.",
    exampleRussian: "В подвале прохладно.",
    explanation:
      "В объявлениях о сдаче квартиры «sklep» — полезное подвальное хранилище, а не место погребения. Склеп по-чешски — «hrobka».",
    difficulty: 2,
    category: "object",
  },
  {
    id: "krasny",
    czechWord: "krásný",
    czechMeaning: "красивый, прекрасный",
    russianTrapMeaning: "красный (цвет)",
    distractors: ["большой", "громкий"],
    exampleCzech: "Máš krásné oči.",
    exampleRussian: "У тебя красивые глаза.",
    explanation:
      "«Krásný» — комплимент, не цвет. «Красный» по-чешски — «červený».",
    difficulty: 1,
    category: "other",
  },
  {
    id: "mesto",
    czechWord: "město",
    czechMeaning: "город",
    russianTrapMeaning: "место (место, пространство)",
    distractors: ["местность", "участок"],
    exampleCzech: "Bydlím ve velkém městě.",
    exampleRussian: "Я живу в большом городе.",
    explanation:
      "«Město» — город, а «место» по-чешски — «místo». Двойная ловушка: оба слова похожи и одновременно значат разное.",
    difficulty: 1,
    category: "other",
  },
  {
    id: "pokoj",
    czechWord: "pokoj",
    czechMeaning: "комната, гостиничный номер",
    russianTrapMeaning: "покой (мир, спокойствие)",
    distractors: ["тишина", "уют"],
    exampleCzech: "Kolik stojí pokoj?",
    exampleRussian: "Сколько стоит номер?",
    explanation:
      "«Pokoj» — первое слово, которое слышишь на ресепшн чешской гостиницы. По-чешски оно также значит «покой, мир» — но в быту это просто комната.",
    difficulty: 2,
    category: "object",
  },

  // — Batch 2 (Tier A) —
  {
    id: "nevestka",
    czechWord: "nevěstka",
    czechMeaning: "проститутка",
    russianTrapMeaning: "невестка (жена сына, сноха)",
    distractors: ["тёща", "золовка"],
    exampleCzech: "Nevěstka stála před barem.",
    exampleRussian: "Проститутка стояла перед баром.",
    explanation:
      "«Nevěstka» — не родственница. Невестка (жена сына) по-чешски — «snacha». Путаница в семейном разговоре создаёт максимально неловкую ситуацию.",
    difficulty: 3,
    category: "other",
  },
  {
    id: "padlo",
    czechWord: "padlo",
    czechMeaning: "(оно) упало",
    russianTrapMeaning: "падло (грубое оскорбление)",
    distractors: ["подлец", "трус"],
    exampleCzech: "Dítě padlo na zem.",
    exampleRussian: "Ребёнок упал на землю.",
    explanation:
      "«Padlo» — нейтральная форма прошедшего времени глагола «padnout» (упасть). Грубое русское слово к чешской грамматике отношения не имеет.",
    difficulty: 3,
    category: "verb",
  },
  {
    id: "stul",
    czechWord: "stůl",
    czechMeaning: "стол",
    russianTrapMeaning: "стул (сиденье)",
    distractors: ["диван", "шкаф"],
    exampleCzech: "Stůl je v kuchyni.",
    exampleRussian: "Стол стоит на кухне.",
    explanation:
      "«Stůl» — стол, а стул по-чешски — «židle». В ресторане «volný stůl» означает свободный столик, а не свободный стул.",
    difficulty: 2,
    category: "object",
  },
  {
    id: "napad",
    czechWord: "nápad",
    czechMeaning: "идея, мысль",
    russianTrapMeaning: "нападение (атака)",
    distractors: ["угроза", "опасность"],
    exampleCzech: "Mám dobrý nápad.",
    exampleRussian: "У меня есть хорошая идея.",
    explanation:
      "«Nápad» на рабочем совещании — это идея, предложение. Атака по-чешски — «útok».",
    difficulty: 2,
    category: "other",
  },
  {
    id: "chytry",
    czechWord: "chytrý",
    czechMeaning: "умный, сообразительный",
    russianTrapMeaning: "хитрый (лукавый, коварный)",
    distractors: ["лживый", "жадный"],
    exampleCzech: "Je velmi chytrý.",
    exampleRussian: "Он очень умный.",
    explanation:
      "«Chytrý» — чистый комплимент. Назвать кого-то «chytrý» значит похвалить ум, а не намекнуть на хитрость или коварство.",
    difficulty: 3,
    category: "emotion",
  },
  {
    id: "pohoda",
    czechWord: "pohoda",
    czechMeaning: "хорошее самочувствие, спокойствие, всё ок",
    russianTrapMeaning: "погода (weather)",
    distractors: ["климат", "обстановка"],
    exampleCzech: "Jsme v pohodě.",
    exampleRussian: "У нас всё хорошо.",
    explanation:
      "«V pohodě» — стандартный чешский ответ на «как дела?», означает «всё в порядке». «Погода» по-чешски — «počasí».",
    difficulty: 2,
    category: "emotion",
  },
  {
    id: "jahoda",
    czechWord: "jahoda",
    czechMeaning: "клубника",
    russianTrapMeaning: "ягода (любая ягода вообще)",
    distractors: ["малина", "вишня"],
    exampleCzech: "Chci jahodovou zmrzlinu.",
    exampleRussian: "Я хочу клубничное мороженое.",
    explanation:
      "«Jahoda» — конкретно клубника, а не ягода вообще. Общее слово «ягода» по-чешски — «bobule».",
    difficulty: 1,
    category: "food",
  },
  {
    id: "okurka",
    czechWord: "okurka",
    czechMeaning: "огурец",
    russianTrapMeaning: "окурок (табачный)",
    distractors: ["мусор", "пепел"],
    exampleCzech: "Dej mi okurku.",
    exampleRussian: "Дай мне огурец.",
    explanation:
      "В овощном отделе «okurka» лежит рядом с помидорами, а не в пепельнице.",
    difficulty: 2,
    category: "food",
  },
  {
    id: "druh",
    czechWord: "druh",
    czechMeaning: "вид, тип, сорт",
    russianTrapMeaning: "друг (приятель)",
    distractors: ["товарищ", "союзник"],
    exampleCzech: "Jaký druh chleba chceš?",
    exampleRussian: "Какой вид хлеба ты хочешь?",
    explanation:
      "«Druh» в магазине — это «сорт» или «вид», а не приятель. Друг по-чешски — «kamarád» или «přítel».",
    difficulty: 2,
    category: "other",
  },
  {
    id: "vrah",
    czechWord: "vrah",
    czechMeaning: "убийца",
    russianTrapMeaning: "враг (противник)",
    distractors: ["злодей", "преступник"],
    exampleCzech: "Vraha chytila policie.",
    exampleRussian: "Полиция поймала убийцу.",
    explanation:
      "«Vrah» — убийца, не просто враг. «Враг» по-чешски — «nepřítel». Разница критична в новостях и юридических текстах.",
    difficulty: 2,
    category: "other",
  },

  // — Batch 3 (Tier B) —
  {
    id: "smetana",
    czechWord: "smetana",
    czechMeaning: "сливки (свежие)",
    russianTrapMeaning: "сметана (кислые сливки)",
    distractors: ["масло", "молоко"],
    exampleCzech: "Chci kávu se smetanou.",
    exampleRussian: "Я хочу кофе со сливками.",
    explanation:
      "«Smetana» в чешском рецепте или кофейне — это свежие сливки, не кислые. Сметана по-чешски — «kysaná smetana».",
    difficulty: 3,
    category: "food",
  },
  {
    id: "kapusta",
    czechWord: "kapusta",
    czechMeaning: "кале, савойская капуста (конкретный сорт)",
    russianTrapMeaning: "капуста (любая капуста вообще)",
    distractors: ["морковь", "лук"],
    exampleCzech: "Koupila jsem kapustu na trhu.",
    exampleRussian: "Я купила кале на рынке.",
    explanation:
      "«Kapusta» в Чехии — конкретный листовой сорт (кале или савойская капуста). Капуста вообще — «zelí». В рецепте эти слова не взаимозаменяемы.",
    difficulty: 2,
    category: "food",
  },
  {
    id: "mzda",
    czechWord: "mzda",
    czechMeaning: "зарплата, заработная плата",
    russianTrapMeaning: "мзда (взятка — устар./книжн.)",
    distractors: ["штраф", "долг"],
    exampleCzech: "Jaká je vaše mzda?",
    exampleRussian: "Какова ваша зарплата?",
    explanation:
      "«Mzda» в трудовом договоре — это зарплата. Русское «мзда» (взятка) давно устарело и встречается только в литературе или иронически.",
    difficulty: 3,
    category: "other",
  },
  {
    id: "hrad",
    czechWord: "hrad",
    czechMeaning: "замок, крепость",
    russianTrapMeaning: "град (город — устар.; или крупный град)",
    distractors: ["башня", "стена"],
    exampleCzech: "Hrad stojí nad řekou.",
    exampleRussian: "Замок стоит над рекой.",
    explanation:
      "«Hrad» — замок-крепость, а не город и не осадки. «Pražský hrad» на туристической карте — именно замок, а не «Пражский город».",
    difficulty: 2,
    category: "object",
  },
  {
    id: "huba",
    czechWord: "huba",
    czechMeaning: "рот (грубовато-разговорное)",
    russianTrapMeaning: "губа (lip)",
    distractors: ["нос", "зуб"],
    exampleCzech: "Zavři hubu!",
    exampleRussian: "Заткни рот! (разг.)",
    explanation:
      "«Huba» — разговорное слово для рта, ближе к «пасти» или «варежке» по регистру. Губа по-чешски — «ret».",
    difficulty: 2,
    category: "body",
  },
];
