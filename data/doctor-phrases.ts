export type Locale = 'ua' | 'ru';

export type Category =
  | 'booking'
  | 'arrival'
  | 'symptoms'
  | 'body'
  | 'communication'
  | 'medication'
  | 'followup'
  | 'emergency';

export type Phrase = {
  id: string;
  category: Category;
  cs: string;              // Czech (canonical, verified)
  ua: string;              // Ukrainian translation (DRAFT — needs native review)
  ru: string;              // Russian translation (DRAFT — needs native review)
  csCyrillic: string;      // Czech in Cyrillic transliteration (pronunciation guide)
  verified: boolean;       // flip to true once native speaker reviews UA/RU
};

export const categories: Record<Category, { ua: string; ru: string; icon: string }> = {
  booking:       { ua: 'Запис до лікаря',     ru: 'Запись к врачу',       icon: '📞' },
  arrival:       { ua: 'На місці',             ru: 'На месте',             icon: '🏥' },
  symptoms:      { ua: 'Симптоми',             ru: 'Симптомы',             icon: '🤒' },
  body:          { ua: 'Де болить',           ru: 'Где болит',            icon: '👶' },
  communication: { ua: 'Не розумію',          ru: 'Не понимаю',           icon: '💬' },
  medication:    { ua: 'Ліки',                 ru: 'Лекарства',            icon: '💊' },
  followup:      { ua: 'Що далі?',            ru: 'Что дальше?',          icon: '📅' },
  emergency:     { ua: 'Терміново!',          ru: 'Срочно!',              icon: '🚨' },
};

export const phrases: Phrase[] = [
  // === BOOKING (7) ===
  { id: 'b1', category: 'booking', cs: 'Dobrý den, chtěla bych objednat dítě k lékaři.',
    ua: 'Доброго дня, я б хотіла записати дитину до лікаря.',
    ru: 'Добрый день, я бы хотела записать ребёнка к врачу.',
    csCyrillic: 'Добри ден, хтела бих обєднат дьітє к лєкаржи.', verified: false },
  { id: 'b2', category: 'booking', cs: 'Moje dítě je nemocné.',
    ua: 'Моя дитина хвора.',
    ru: 'Мой ребёнок болен.',
    csCyrillic: 'Мойе дьітє йе немоцне.', verified: false },
  { id: 'b3', category: 'booking', cs: 'Je to naléhavé, prosím.',
    ua: 'Це терміново, будь ласка.',
    ru: 'Это срочно, пожалуйста.',
    csCyrillic: 'Йе то налєгаве, просім.', verified: false },
  { id: 'b4', category: 'booking', cs: 'Máte dnes volný termín?',
    ua: 'Чи є у вас сьогодні вільний час?',
    ru: 'У вас есть сегодня свободное время?',
    csCyrillic: 'Мате днес волни термі́н?', verified: false },
  { id: 'b5', category: 'booking', cs: 'Mluvíte anglicky, rusky nebo ukrajinsky?',
    ua: 'Ви говорите англійською, російською або українською?',
    ru: 'Вы говорите по-английски, по-русски или по-украински?',
    csCyrillic: 'Млувіте англіцки, руски небо украйінски?', verified: false },
  { id: 'b6', category: 'booking', cs: 'Jaké dokumenty mám přinést?',
    ua: 'Які документи мені принести?',
    ru: 'Какие документы мне принести?',
    csCyrillic: 'Яке документи мам пршінест?', verified: false },
  { id: 'b7', category: 'booking', cs: 'Jaká je vaše adresa?',
    ua: 'Яка ваша адреса?',
    ru: 'Какой ваш адрес?',
    csCyrillic: 'Яка йе ваше адреса?', verified: false },

  // === ARRIVAL (5) ===
  { id: 'a1', category: 'arrival', cs: 'Máme objednání na tento čas.',
    ua: 'У нас запис на цей час.',
    ru: 'У нас запись на это время.',
    csCyrillic: 'Маме обйеднаньі на тенто час.', verified: false },
  { id: 'a2', category: 'arrival', cs: 'Moje dítě se narodilo v tomto roce.',
    ua: 'Моя дитина народилася в цьому році.',
    ru: 'Мой ребёнок родился в этом году.',
    csCyrillic: 'Мойе дьітє се народіло в томто роце.', verified: false },
  { id: 'a3', category: 'arrival', cs: 'Jsme tady poprvé.',
    ua: 'Ми тут вперше.',
    ru: 'Мы здесь впервые.',
    csCyrillic: 'Йсме тади попрве.', verified: false },
  { id: 'a4', category: 'arrival', cs: 'Máme dočasnou ochranu a pojištění VZP.',
    ua: 'У нас тимчасовий захист і страхування VZP.',
    ru: 'У нас временная защита и страховка VZP.',
    csCyrillic: 'Маме дочасноу охрану а пойіштєньі́ VZP.', verified: false },
  { id: 'a5', category: 'arrival', cs: 'Musím vyplnit nějaký formulář?',
    ua: 'Мені потрібно заповнити якийсь бланк?',
    ru: 'Мне нужно заполнить какой-то бланк?',
    csCyrillic: 'Мусі́м виплнит нєйяки́ формулярж?', verified: false },

  // === SYMPTOMS (10) ===
  { id: 's1', category: 'symptoms', cs: 'Moje dítě má horečku.',
    ua: 'У моєї дитини температура.',
    ru: 'У моего ребёнка температура.',
    csCyrillic: 'Мойе дьітє ма горжечку.', verified: false },
  { id: 's2', category: 'symptoms', cs: 'Teplota je 38,5 stupňů.',
    ua: 'Температура 38,5 градусів.',
    ru: 'Температура 38,5 градусов.',
    csCyrillic: 'Теплота йе тршіцет осм цьела пєт ступньу.', verified: false },
  { id: 's3', category: 'symptoms', cs: 'Začalo to včera.',
    ua: 'Це почалося вчора.',
    ru: 'Это началось вчера.',
    csCyrillic: 'Зачало то вчера.', verified: false },
  { id: 's4', category: 'symptoms', cs: 'Začalo to před třemi dny.',
    ua: 'Це почалося три дні тому.',
    ru: 'Это началось три дня назад.',
    csCyrillic: 'Зачало то пршед тршемі дни.', verified: false },
  { id: 's5', category: 'symptoms', cs: 'Moje dítě kašle.',
    ua: 'Моя дитина кашляє.',
    ru: 'Мой ребёнок кашляет.',
    csCyrillic: 'Мойе дьітє кашле.', verified: false },
  { id: 's6', category: 'symptoms', cs: 'Moje dítě má rýmu.',
    ua: 'У моєї дитини нежить.',
    ru: 'У моего ребёнка насморк.',
    csCyrillic: 'Мойе дьітє ма ри́му.', verified: false },
  { id: 's7', category: 'symptoms', cs: 'Moje dítě zvrací.',
    ua: 'Мою дитину нудить.',
    ru: 'Моего ребёнка тошнит.',
    csCyrillic: 'Мойе дьітє зврацьі.', verified: false },
  { id: 's8', category: 'symptoms', cs: 'Moje dítě má průjem.',
    ua: 'У моєї дитини пронос.',
    ru: 'У моего ребёнка понос.',
    csCyrillic: 'Мойе дьітє ма пру́йем.', verified: false },
  { id: 's9', category: 'symptoms', cs: 'Moje dítě má vyrážku.',
    ua: 'У моєї дитини висип.',
    ru: 'У моего ребёнка сыпь.',
    csCyrillic: 'Мойе дьітє ма виражку.', verified: false },
  { id: 's10', category: 'symptoms', cs: 'Moje dítě je alergické na penicilin.',
    ua: 'У моєї дитини алергія на пеніцилін.',
    ru: 'У моего ребёнка аллергия на пенициллин.',
    csCyrillic: 'Мойе дьітє йе алергіцке на пеніціли́н.', verified: false },

  // === BODY (5) ===
  { id: 'p1', category: 'body', cs: 'Bolí ho hlava.',
    ua: 'У нього болить голова.',
    ru: 'У него болит голова.',
    csCyrillic: 'Болі́ го глава.', verified: false },
  { id: 'p2', category: 'body', cs: 'Bolí ho v krku.',
    ua: 'У нього болить горло.',
    ru: 'У него болит горло.',
    csCyrillic: 'Болі́ го в крку.', verified: false },
  { id: 'p3', category: 'body', cs: 'Bolí ho ucho.',
    ua: 'У нього болить вухо.',
    ru: 'У него болит ухо.',
    csCyrillic: 'Болі́ го ухо.', verified: false },
  { id: 'p4', category: 'body', cs: 'Bolí ho bříško.',
    ua: 'У нього болить животик.',
    ru: 'У него болит животик.',
    csCyrillic: 'Болі́ го бржі́шко.', verified: false },
  { id: 'p5', category: 'body', cs: 'Bolí ho tady.',
    ua: 'У нього болить тут.',
    ru: 'У него болит здесь.',
    csCyrillic: 'Болі́ го тади.', verified: false },

  // === COMMUNICATION (4) ===
  { id: 'c1', category: 'communication', cs: 'Prosím, mluvte pomaleji.',
    ua: 'Будь ласка, говоріть повільніше.',
    ru: 'Пожалуйста, говорите медленнее.',
    csCyrillic: 'Просі́м, млувте помалейі.', verified: false },
  { id: 'c2', category: 'communication', cs: 'Nerozumím, můžete to napsat?',
    ua: 'Я не розумію, можете написати?',
    ru: 'Я не понимаю, можете написать?',
    csCyrillic: 'Нерозумі́м, мужете то напсат?', verified: false },
  { id: 'c3', category: 'communication', cs: 'Můžeme použít překladač?',
    ua: 'Можемо скористатися перекладачем?',
    ru: 'Можем воспользоваться переводчиком?',
    csCyrillic: 'Мужеме поужі́т пршекладач?', verified: false },
  { id: 'c4', category: 'communication', cs: 'Můžete to nakreslit?',
    ua: 'Можете намалювати?',
    ru: 'Можете нарисовать?',
    csCyrillic: 'Мужете то накрёслит?', verified: false },

  // === MEDICATION (5) ===
  { id: 'm1', category: 'medication', cs: 'Jak často mám podávat tento lék?',
    ua: 'Як часто давати ці ліки?',
    ru: 'Как часто давать это лекарство?',
    csCyrillic: 'Як часто мам подават тенто лєк?', verified: false },
  { id: 'm2', category: 'medication', cs: 'Kolik dní?',
    ua: 'Скільки днів?',
    ru: 'Сколько дней?',
    csCyrillic: 'Колік дні?', verified: false },
  { id: 'm3', category: 'medication', cs: 'Před jídlem, nebo po jídle?',
    ua: 'До їжі чи після?',
    ru: 'До еды или после?',
    csCyrillic: 'Пршед йі́длем, небо по йі́дле?', verified: false },
  { id: 'm4', category: 'medication', cs: 'Kde vyzvednu léky?',
    ua: 'Де забрати ліки?',
    ru: 'Где забрать лекарства?',
    csCyrillic: 'Кде визведну лєки?', verified: false },
  { id: 'm5', category: 'medication', cs: 'Můžu dát dítěti paracetamol nebo ibuprofen?',
    ua: 'Можу дати дитині парацетамол або ібупрофен?',
    ru: 'Можно дать ребёнку парацетамол или ибупрофен?',
    csCyrillic: 'Мужу дат дьітьеті парацетамол небо ібупрофен?', verified: false },

  // === FOLLOWUP (2) ===
  { id: 'f1', category: 'followup', cs: 'Kdy máme přijít znovu?',
    ua: 'Коли нам прийти знову?',
    ru: 'Когда нам прийти снова?',
    csCyrillic: 'Кди маме пршийі́т зновy?', verified: false },
  { id: 'f2', category: 'followup', cs: 'Může dítě jít do školy nebo školky?',
    ua: 'Дитина може йти до школи або садочка?',
    ru: 'Ребёнок может идти в школу или в садик?',
    csCyrillic: 'Може дьітє йіт до школи небо школки?', verified: false },

  // === EMERGENCY (2) ===
  { id: 'e1', category: 'emergency', cs: 'Prosím, zavolejte sanitku!',
    ua: 'Будь ласка, викличте швидку!',
    ru: 'Пожалуйста, вызовите скорую!',
    csCyrillic: 'Просі́м, заволейте санітку!', verified: false },
  { id: 'e2', category: 'emergency', cs: 'Moje dítě nemůže dýchat!',
    ua: 'Моя дитина не може дихати!',
    ru: 'Мой ребёнок не может дышать!',
    csCyrillic: 'Мойе дьітє нему́же ди́хат!', verified: false },
];
