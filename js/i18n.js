/* ============================================
   FENIX MULTIGLOBAL — i18n.js
   Three languages: UZ (default) / RU / EN
   Auto-detection from navigator.language
   ============================================ */

(function () {
  'use strict';

  const SUPPORTED = ['uz', 'ru', 'en'];
  const DEFAULT_LANG = 'uz';
  const STORAGE_KEY = 'mavr_lang';

  // ──────────────────────────────────────────
  // TRANSLATIONS
  // ──────────────────────────────────────────
  // NOTE: UZ-тексты — качественный перевод с RU.
  // TODO: nativespeaker review перед публикацией.
  // ──────────────────────────────────────────

  const t = {

    // ═══════ NAVIGATION ═══════
    'nav.home':      { uz: "Bosh sahifa",    ru: "Главная",   en: "Home" },
    'nav.about':     { uz: "Biz haqimizda",  ru: "О нас",     en: "About" },
    'nav.services':  { uz: "Xizmatlar",      ru: "Услуги",    en: "Services" },
    'nav.tours':     { uz: "Sayohatlar",     ru: "Туры",      en: "Tours" },
    'nav.contact':   { uz: "Bog'lanish",     ru: "Контакты",  en: "Contact" },
    'nav.cta':       { uz: "Bog'lanish",     ru: "Связаться", en: "Get in touch" },
    'nav.skip':      { uz: "Asosiy mazmunga o'tish", ru: "Перейти к содержанию", en: "Skip to content" },
    'nav.menu.open': { uz: "Menyuni ochish", ru: "Открыть меню", en: "Open menu" },
    'nav.lang.aria': { uz: "Tilni tanlash",  ru: "Выбор языка",  en: "Language selection" },

    // ═══════ COMMON ═══════
    'common.more':       { uz: "Batafsil",       ru: "Подробнее",     en: "Learn more" },
    'common.all_tours':  { uz: "Barcha sayohatlar", ru: "Все туры",   en: "All tours" },
    'common.contact':    { uz: "Bog'lanish",     ru: "Связаться",     en: "Contact us" },
    'common.send':       { uz: "Yuborish",       ru: "Отправить",     en: "Send" },
    'common.discuss':    { uz: "Sayohatni muhokama qilish", ru: "Обсудить тур", en: "Discuss your trip" },
    'common.back_top':   { uz: "Yuqoriga",       ru: "Наверх",        en: "Back to top" },
    'common.from':       { uz: "dan",            ru: "от",            en: "from" },
    'common.days':       { uz: "kun",            ru: "дней",          en: "days" },
    'common.by_request': { uz: "Talab bo'yicha", ru: "По запросу",    en: "On request" },

    // ═══════ HERO (index.html) ═══════
    'hero.eyebrow':  { uz: "Litsenziyalangan tour operator · 2012 yildan", ru: "Лицензированный туроператор · с 2012 года", en: "Licensed tour operator · since 2012" },
    'hero.title':    { uz: "O'zbekistonni <em>kashf eting</em><br>biz bilan birga",
                       ru: "Откройте Узбекистан <em>заново</em><br>вместе с нами",
                       en: "Discover Uzbekistan <em>anew</em><br>with us" },
    'hero.desc':     { uz: "Samarqand, Buxoro, Xiva — bu shaharlarda har bir tosh ming yillik tarixni saqlaydi. Biz 12 yildan beri mehmonlarni mamlakatimiz bilan tanishtiramiz va o'zbekistonliklar uchun jahon bo'ylab sayohatlarni tashkil qilamiz.",
                       ru: "Самарканд, Бухара, Хива — города, где каждый камень хранит тысячелетнюю историю. 12 лет помогаем гостям открыть нашу страну и организуем поездки за рубеж для жителей Узбекистана.",
                       en: "Samarkand, Bukhara, Khiva — cities where every stone holds a thousand years of history. For 12 years we've been helping guests discover our country and organising trips abroad for residents of Uzbekistan." },
    'hero.cta.main': { uz: "Sayohatni rejalashtirish", ru: "Спланировать поездку", en: "Plan a trip" },
    'hero.cta.sec':  { uz: "Biz haqimizda",       ru: "О компании",     en: "About the company" },
    'hero.badge.num':{ uz: "12+",                 ru: "12+",            en: "12+" },
    'hero.badge.lbl':{ uz: "yillik tajriba",      ru: "лет на рынке",   en: "years on the market" },
    'hero.image.alt':{ uz: "Shohi Zinda majmuasi, Samarqand",
                       ru: "Ансамбль Шахи-Зинда, Самарканд",
                       en: "Shah-i-Zinda complex, Samarkand" },

    // ═══════ SERVICES (index, services) ═══════
    'services.label':    { uz: "Bizning xizmatlarimiz", ru: "Наши услуги",    en: "What we offer" },
    'services.title':    { uz: "Sayohatning to'rt yo'nalishi", ru: "Четыре направления туризма", en: "Four directions of travel" },
    'services.intro':    { uz: "Mehmonlarni qabul qilishdan tortib korporativ tadbirlarga qadar — siz uchun har bir bosqichni tashkil qilamiz.",
                           ru: "От приёма иностранных гостей до корпоративных программ — берём на себя каждый этап.",
                           en: "From welcoming foreign guests to corporate events — we handle every stage for you." },

    'service.1.num':   { uz: "01", ru: "01", en: "01" },
    'service.1.title': { uz: "Kiruvchi turizm",   ru: "Въездной туризм",  en: "Inbound tourism" },
    'service.1.desc':  { uz: "Chet ellik mehmonlar uchun O'zbekiston bo'ylab sayohatlar: kutib olish, mehmonxonalar, gidlar va madaniy dasturlar.",
                         ru: "Туры по Узбекистану для иностранных гостей: встреча, размещение, гиды и культурная программа.",
                         en: "Tours across Uzbekistan for international guests: pick-up, hotels, guides and cultural programmes." },

    'service.2.num':   { uz: "02", ru: "02", en: "02" },
    'service.2.title': { uz: "Chiquvchi turizm",  ru: "Выездной туризм",  en: "Outbound tourism" },
    'service.2.desc':  { uz: "O'zbekistonliklar uchun xorijiy sayohatlar: Turkiya, BAA, Yevropa, Janubi-Sharqiy Osiyo. Vizalar, chiptalar, sug'urta.",
                         ru: "Зарубежные туры для граждан Узбекистана: Турция, ОАЭ, Европа, Юго-Восточная Азия. Визы, билеты, страховка.",
                         en: "Trips abroad for Uzbekistan residents: Turkey, UAE, Europe, Southeast Asia. Visas, flights, insurance." },

    'service.3.num':   { uz: "03", ru: "03", en: "03" },
    'service.3.title': { uz: "Ichki turizm",      ru: "Внутренний туризм", en: "Domestic tourism" },
    'service.3.desc':  { uz: "Mahalliylar uchun O'zbekiston bo'ylab marshrutlar: Chimg'on, Oydarko'l, Nurota tog'lari va gastronomik dam olish kunlari.",
                         ru: "Маршруты по Узбекистану для местных: Чимган, Айдаркуль, Нуратинские горы и гастро-уикенды.",
                         en: "Routes around Uzbekistan for locals: Chimgan, Aydarkul, the Nuratau mountains and gastronomic weekends." },

    'service.4.num':   { uz: "04", ru: "04", en: "04" },
    'service.4.title': { uz: "MICE va tadbirlar", ru: "MICE и события",   en: "MICE & events" },
    'service.4.desc':  { uz: "Konferensiyalar, korporativ sayohatlar, rag'batlantirish dasturlari va biznes tadbirlar — kalit topshirish bilan.",
                         ru: "Конференции, корпоративные выезды, инсентив-программы и деловые мероприятия — под ключ.",
                         en: "Conferences, corporate retreats, incentive programmes and business events — turnkey." },

    // service detail page — long descriptions
    'service.1.long':  { uz: "Biz chet ellik mehmonlarni butun yo'lda kuzatib boramiz. Sakkiz tilda gapiruvchi litsenziyalangan gidlar, ishonchli mehmonxonalar bilan kelishuvlar, yopiq xususiy ekskursiyalar va mamlakat tarixini sezdiruvchi marshrutlar.",
                         ru: "Мы сопровождаем иностранных гостей на всём пути. Лицензированные гиды на восьми языках, проверенные отели, индивидуальные экскурсии и маршруты, в которых чувствуется характер страны.",
                         en: "We accompany international guests every step of the way. Licensed guides in eight languages, vetted hotels, bespoke private tours and routes that reveal the character of the country." },
    'service.2.long':  { uz: "Vizadan tortib qaytishgacha — barchasi qo'limizda. Aviachiptalar va sug'urta, mehmonxonalarni tanlash, xizmat ko'rsatish darajasi va byudjetga moslashish, har qanday murakkablikdagi yo'nalishlar.",
                         ru: "От визы до возвращения — всё в одних руках. Авиабилеты и страховка, подбор отелей по уровню сервиса и бюджету, маршруты любой сложности.",
                         en: "From visa to return — everything in one place. Flights and insurance, hotels matched to your service level and budget, routes of any complexity." },
    'service.3.long':  { uz: "Tog'lar, dasht, gastronomiya, hunarmandchilik qishloqlari — sayohatchilar haqiqiy O'zbekistonni shu yerda kashf etadilar. Hafta oxiri sayohatlar va to'liq haftalik turlar.",
                         ru: "Горы, степи, гастрономия, ремесленные кишлаки — здесь путешественники открывают настоящий Узбекистан. Уикенды и недельные туры.",
                         en: "Mountains, steppes, gastronomy, artisan villages — here travellers discover the real Uzbekistan. Weekend and week-long tours." },
    'service.4.long':  { uz: "Konferensiya, simpozium, kompaniya yubileyi yoki tashkil etilgan ta'tilmi — barchasini joylar, transport, tarjimonlar, madaniy dasturlar va hisobotlar bilan birga tashkil qilamiz.",
                         ru: "Конференция, симпозиум, юбилей компании или организованный отпуск — берём на себя площадки, транспорт, переводчиков, культурную программу и отчётность.",
                         en: "Conference, symposium, company anniversary or organised retreat — we handle venues, transport, interpreters, cultural programme and reporting." },

    'service.1.li.1': { uz: "Aeroportda kutib olish va xizmatda mashina", ru: "Встреча в аэропорту и трансфер", en: "Airport pickup and transfer" },
    'service.1.li.2': { uz: "8 tilda gapiruvchi gidlar",                  ru: "Гиды на 8 языках", en: "Guides in 8 languages" },
    'service.1.li.3': { uz: "3–5 yulduzli mehmonxonalar",                 ru: "Отели 3–5 звёзд", en: "3–5 star hotels" },
    'service.1.li.4': { uz: "Tarixiy shaharlar bo'ylab marshrutlar",      ru: "Маршруты по историческим городам", en: "Routes through historic cities" },
    'service.1.li.5': { uz: "Vizalar uchun yordam",                       ru: "Сопровождение по визам", en: "Visa support" },

    'service.2.li.1': { uz: "Vizalarni rasmiylashtirish",                 ru: "Оформление виз", en: "Visa processing" },
    'service.2.li.2': { uz: "Aviachiptalar va transferlar",               ru: "Авиабилеты и трансферы", en: "Flights and transfers" },
    'service.2.li.3': { uz: "Mehmonxonalarni tanlash",                    ru: "Подбор отелей", en: "Hotel selection" },
    'service.2.li.4': { uz: "Tibbiy sug'urta",                            ru: "Медицинская страховка", en: "Medical insurance" },
    'service.2.li.5': { uz: "Individual marshrutlar",                     ru: "Индивидуальные маршруты", en: "Individual itineraries" },

    'service.3.li.1': { uz: "Tog' yo'nalishlari",                         ru: "Горные направления", en: "Mountain destinations" },
    'service.3.li.2': { uz: "Gastronomik turlar",                         ru: "Гастрономические туры", en: "Gastronomy tours" },
    'service.3.li.3': { uz: "Madaniy-tarixiy dasturlar",                  ru: "Культурно-исторические программы", en: "Cultural-historical programmes" },
    'service.3.li.4': { uz: "Tabiatda hafta oxiri sayohatlari",           ru: "Уикенды на природе", en: "Nature weekends" },
    'service.3.li.5': { uz: "Oilaviy va to'da turlari",                   ru: "Семейные и групповые туры", en: "Family and group tours" },

    'service.4.li.1': { uz: "Joylar va texnik jihozlash",                 ru: "Площадки и техническое оснащение", en: "Venues and technical setup" },
    'service.4.li.2': { uz: "Sinxron tarjima",                            ru: "Синхронный перевод", en: "Simultaneous interpretation" },
    'service.4.li.3': { uz: "Madaniy dastur va dam olish",                ru: "Культурная программа и досуг", en: "Cultural programme and leisure" },
    'service.4.li.4': { uz: "Logistika va transport",                     ru: "Логистика и транспорт", en: "Logistics and transport" },
    'service.4.li.5': { uz: "To'liq hisobotlar",                          ru: "Полная отчётность", en: "Full reporting" },

    // ═══════ ABOUT (short on index) ═══════
    'about.label':   { uz: "Biz haqimizda",        ru: "О компании",       en: "About us" },
    'about.title':   { uz: "Mamlakatni <em>ichidan</em> bilamiz", ru: "Знаем эту страну <em>изнутри</em>", en: "We know this country <em>from within</em>" },
    'about.body':    { uz: "FENIX MULTIGLOBAL — Toshkentdan boshqaruv qiluvchi kichik tour operator. Mamlakatni hurmat bilan ko'rsatamiz, har bir mehmonni shaxsan bilamiz va o'z gidlarimiz va transportimiz bilan ishlaymiz.",
                       ru: "FENIX MULTIGLOBAL — небольшая туристическая компания с офисом в Ташкенте. Показываем страну с уважением, знаем каждого гостя лично и работаем со своими гидами и транспортом.",
                       en: "FENIX MULTIGLOBAL is a small tour operator based in Tashkent. We show the country with respect, know every guest personally and work with our own guides and transport." },
    'about.li.1':    { uz: "12 yildan beri Vazirlik tomonidan litsenziyalangan",
                       ru: "12 лет с лицензией Министерства туризма",
                       en: "12 years with Ministry of Tourism licence" },
    'about.li.2':    { uz: "O'z gidlarimiz va transportimiz",
                       ru: "Собственные гиды и транспорт",
                       en: "Our own guides and transport" },
    'about.li.3':    { uz: "38 ta mamlakatdan mehmonlar",
                       ru: "Гости из 38 стран мира",
                       en: "Guests from 38 countries worldwide" },
    'about.li.4':    { uz: "Dunyo bo'ylab 120+ ta hamkor",
                       ru: "120+ партнёров по всему миру",
                       en: "120+ partners worldwide" },

    'about.stat.1.num': { uz: "12+", ru: "12+", en: "12+" },
    'about.stat.1.lbl': { uz: "yillik tajriba", ru: "лет на рынке", en: "years operating" },
    'about.stat.2.num': { uz: "5 280", ru: "5 280", en: "5,280" },
    'about.stat.2.lbl': { uz: "sayohatchilar", ru: "путешественников", en: "travellers" },
    'about.stat.3.num': { uz: "120+", ru: "120+", en: "120+" },
    'about.stat.3.lbl': { uz: "hamkorlar", ru: "партнёров", en: "partners" },

    'about.image.alt': { uz: "Buxorodagi Po'i-Kalon ansambli",
                         ru: "Ансамбль Пои-Калян в Бухаре",
                         en: "Po-i-Kalyan ensemble in Bukhara" },

    // about.html — full page
    'about.page.eyebrow': { uz: "Biz haqimizda", ru: "О компании", en: "About us" },
    'about.page.title':   { uz: "FENIX MULTIGLOBAL — Toshkentdagi <em>kichik komandа</em>",
                            ru: "FENIX MULTIGLOBAL — небольшая <em>команда из Ташкента</em>",
                            en: "FENIX MULTIGLOBAL — a small <em>team from Tashkent</em>" },
    'about.page.desc':    { uz: "2012 yildan beri biz bir narsani qilamiz — odamlarga O'zbekistonni ko'rsatamiz va o'zbekistonliklarni dunyoga olib chiqamiz. Biz uchun bu konveyer emas, balki kasb.",
                            ru: "С 2012 года мы делаем одно — показываем Узбекистан людям и отправляем узбекистанцев в мир. Для нас это не конвейер, а ремесло.",
                            en: "Since 2012 we've done one thing — show Uzbekistan to people and send Uzbekistan residents into the world. For us it's a craft, not a conveyor belt." },

    'about.who.label': { uz: "Kim biz", ru: "Кто мы", en: "Who we are" },
    'about.who.title': { uz: "Falsafa va <em>missiya</em>",
                         ru: "Философия и <em>миссия</em>",
                         en: "Philosophy and <em>mission</em>" },
    'about.who.p1':    { uz: "Biz O'zbekiston bo'ylab maxsus sayohatchilik kompaniyamiz. 18 kishi: gidlar, koordinatorlar, haydovchilar, tarjimonlar. Yarmidan ko'pi kompaniya bilan birinchi yildan beri ishlaydi.",
                         ru: "Мы — небольшая туристическая компания. 18 человек в команде: гиды, координаторы, водители, переводчики. Больше половины работает с первого года.",
                         en: "We're a small travel company. Eighteen people on the team: guides, coordinators, drivers, interpreters. More than half have been with us since year one." },
    'about.who.p2':    { uz: "Biz qasddan kichik qolamiz. Biz bilan yozsangiz — javob beradigan tirik odam, ko'pincha direktor yoki koordinatorlardan biri. Hech qanday bot va call-markazlar yo'q.",
                         ru: "Мы намеренно остаёмся маленькими. Когда вы пишете нам — отвечает живой человек, чаще всего директор или один из координаторов. Никаких ботов и call-центров.",
                         en: "We deliberately stay small. When you write to us, a real person answers — usually the director or one of the coordinators. No bots, no call centres." },
    'about.who.image.alt': { uz: "FENIX MULTIGLOBAL ofisi",
                             ru: "Офис FENIX MULTIGLOBAL",
                             en: "FENIX MULTIGLOBAL office" },

    // history / timeline
    // ═══════ PRINCIPLES (about page — replaces removed team section) ═══════
    'principles.label':  { uz: "Bizning prinsiplarimiz", ru: "Наши принципы",         en: "Our principles" },
    'principles.title':  { uz: "Qanday <em>ishlaymiz</em>",
                           ru: "Как мы <em>работаем</em>",
                           en: "How we <em>work</em>" },
    'principles.intro':  { uz: "Biz sayohatga jiddiy yondashamiz. Mana bizni ajratib turadigan to'rtta tamoyil.",
                           ru: "Мы относимся к путешествиям серьёзно. Вот четыре принципа, которые нас отличают.",
                           en: "We take travel seriously. Here are four principles that set us apart." },

    'principles.1.title': { uz: "Shaffof narxlar",     ru: "Прозрачные цены",          en: "Transparent pricing" },
    'principles.1.desc':  { uz: "Barcha shartlar va narxlar oldindan ko'rsatiladi — yashirin to'lovlar va komissiyalarsiz.",
                            ru: "Все условия и цены — заранее, без скрытых платежей и комиссий.",
                            en: "All terms and prices are given upfront — no hidden fees or commissions." },

    'principles.2.title': { uz: "Shaxsiy koordinator", ru: "Личный координатор",       en: "Personal coordinator" },
    'principles.2.desc':  { uz: "Har bir mijozga sayohat boshlanishidan tugashigacha hamroh bo'ladigan menejer biriktiriladi.",
                            ru: "Каждый клиент получает координатора, который ведёт поездку от начала до конца.",
                            en: "Every client gets a coordinator who guides them through the entire trip." },

    'principles.3.title': { uz: "Ishonchli hamkorlar", ru: "Проверенные партнёры",     en: "Verified partners" },
    'principles.3.desc':  { uz: "Faqat tekshirilgan mehmonxonalar, tashuvchilar va gidlar bilan ishlaymiz. Tasodifiy odamlar yo'q.",
                            ru: "Работаем только с проверенными отелями, перевозчиками и гидами. Случайных людей нет.",
                            en: "We work only with vetted hotels, carriers, and guides. No random subcontractors." },

    'principles.4.title': { uz: "Yo'lda doimo aloqada", ru: "На связи в пути",         en: "Always in touch" },
    'principles.4.desc':  { uz: "Sayohat davomida har qanday vaqt — qo'ng'iroq, chat, messenjer orqali siz bilan birgamiz.",
                            ru: "В любое время поездки — звонок, чат, мессенджер — мы рядом.",
                            en: "Any time during the trip — call, chat, messenger — we're with you." },

    // ═══════ GEOGRAPHY (about page — replaces removed certificates section) ═══════
    'geo.label':         { uz: "Faoliyat geografiyasi", ru: "География работы",        en: "Where we operate" },
    'geo.title':         { uz: "Qayerga <em>boramiz</em>",
                           ru: "Куда мы <em>возим</em>",
                           en: "Where we <em>take you</em>" },
    'geo.intro':         { uz: "Mintaqaviy ekspertiza — O'zbekistondan dunyoning ko'plab burchaklarigacha.",
                           ru: "Региональная экспертиза — от Узбекистана до многих уголков мира.",
                           en: "Regional expertise — from Uzbekistan to many corners of the world." },

    'geo.uz.title':      { uz: "O'zbekiston bo'ylab",      ru: "По Узбекистану",          en: "Across Uzbekistan" },
    'geo.beach.title':   { uz: "Yaqin Sharq va plyaj",     ru: "Ближний Восток и пляж",   en: "Middle East & beach" },
    'geo.cauc.title':    { uz: "Kavkaz va MDH",            ru: "Кавказ и СНГ",            en: "Caucasus & CIS" },
    'geo.asia.title':    { uz: "Janubi-Sharqiy Osiyo",     ru: "Юго-Восточная Азия",      en: "Southeast Asia" },
    'geo.eu.title':      { uz: "Yevropa",                  ru: "Европа",                  en: "Europe" },
    'geo.mice.title':    { uz: "MICE va biznes",           ru: "MICE и бизнес",           en: "MICE & business" },

    'geo.mice.t1':       { uz: "Konferensiyalar",          ru: "Конференции",             en: "Conferences" },
    'geo.mice.t2':       { uz: "Korporativ chiqishlar",    ru: "Корпоративные выезды",    en: "Corporate retreats" },
    'geo.mice.t3':       { uz: "Rag'batlantirish",         ru: "Инсентив-программы",      en: "Incentives" },
    'geo.mice.t4':       { uz: "Ko'rgazmalar",             ru: "Выставки",                en: "Exhibitions" },
    'geo.mice.t5':       { uz: "Team building",            ru: "Тимбилдинг",              en: "Team building" },

    'about.history.label': { uz: "Bizning tariximiz", ru: "Наша история", en: "Our history" },
    'about.history.title': { uz: "14 yil <em>O'zbekistonda</em>",
                             ru: "14 лет <em>в Узбекистане</em>",
                             en: "14 years <em>in Uzbekistan</em>" },

    'timeline.1.year':  { uz: "2012", ru: "2012", en: "2012" },
    'timeline.1.event': { uz: "Toshkentda kompaniya tashkil etildi. Birinchi sayohat — Samarqand bo'ylab uch kun ichida.",
                          ru: "Основание компании в Ташкенте. Первый тур — три дня по Самарканду.",
                          en: "Company founded in Tashkent. The first tour: three days through Samarkand." },
    'timeline.2.year':  { uz: "2015", ru: "2015", en: "2015" },
    'timeline.2.event': { uz: "Madaniy meros vazirligining litsenziyasini oldik (309775904).",
                          ru: "Получили лицензию Министерства туризма и культурного наследия (309775904).",
                          en: "Received the Ministry of Tourism and Cultural Heritage licence (309775904)." },
    'timeline.3.year':  { uz: "2018", ru: "2018", en: "2018" },
    'timeline.3.event': { uz: "Chiquvchi yo'nalish ochildi: birinchi Turkiya va BAAga turlar.",
                          ru: "Открыли выездное направление: первые туры в Турцию и ОАЭ.",
                          en: "Launched our outbound division: first tours to Turkey and the UAE." },
    'timeline.4.year':  { uz: "2021", ru: "2021", en: "2021" },
    'timeline.4.event': { uz: "MICE-yo'nalishi: korporativ konferensiyalar va rag'batlantirish dasturlari.",
                          ru: "Запустили MICE-направление: корпоративные конференции и инсентив-программы.",
                          en: "Started the MICE division: corporate conferences and incentive programmes." },
    'timeline.5.year':  { uz: "2024", ru: "2024", en: "2024" },
    'timeline.5.event': { uz: "5 000-inchi sayohatchi. 38 ta mamlakatdan mehmonlar.",
                          ru: "5000-й путешественник. Гости из 38 стран.",
                          en: "5,000th traveller. Guests from 38 countries." },
    'timeline.6.year':  { uz: "2026", ru: "2026", en: "2026" },
    'timeline.6.event': { uz: "Biz hozir shu yerdamiz. Hali ham kichik, hali ham mustaqil, hali ham xuddi shu jamoamiz.",
                          ru: "Сегодня. Всё ещё маленькие, всё ещё независимые, всё ещё та же команда.",
                          en: "Today. Still small, still independent, still the same team." },

    // team
    'team.label':   { uz: "Bizning jamoamiz", ru: "Наша команда", en: "Our team" },
    'team.title':   { uz: "18 kishi <em>siz uchun</em>",
                      ru: "18 человек <em>для вас</em>",
                      en: "Eighteen people <em>working for you</em>" },
    'team.desc':    { uz: "Biz kichikmiz, lekin har birimiz o'z ishimizda mutaxassismiz. Direktordan transferdagi haydovchigacha — barchamiz mamlakatni yaxshi ko'ramiz va buni ko'rsatishni bilamiz.",
                      ru: "Нас немного, но каждый — мастер своего дела. От директора до водителя на трансфере — мы все любим страну и умеем её показывать.",
                      en: "We're few, but each of us masters our craft. From the director to the transfer driver — we all love this country and know how to share it." },

    'team.1.name':  { uz: "Israilov Uktamjon Sultanqulovich", ru: "Исраилов Уктамжон Султанкулович", en: "Uktamjon Israilov" },
    'team.1.role':  { uz: "Direktor, asoschi",            ru: "Директор, основатель",       en: "Director, founder" },
    'team.1.lang':  { uz: "O'zbekcha · Ruscha · English", ru: "Узбекский · Русский · English", en: "Uzbek · Russian · English" },

    'team.2.name':  { uz: "Axmedova Dilfuza",             ru: "Ахмедова Дилфуза",           en: "Dilfuza Akhmedova" },
    'team.2.role':  { uz: "Yetakchi koordinator",         ru: "Главный координатор",        en: "Head coordinator" },
    'team.2.lang':  { uz: "O'zbekcha · Ruscha · English · Deutsch", ru: "Узбекский · Русский · English · Deutsch", en: "Uzbek · Russian · English · German" },

    'team.3.name':  { uz: "Yusupov Alisher",              ru: "Юсупов Алишер",              en: "Alisher Yusupov" },
    'team.3.role':  { uz: "Bosh gid-tarixchi",            ru: "Старший гид-историк",        en: "Senior guide-historian" },
    'team.3.lang':  { uz: "O'zbekcha · Ruscha · English · Français", ru: "Узбекский · Русский · English · Français", en: "Uzbek · Russian · English · French" },

    'team.4.name':  { uz: "Mahmudova Nodira",             ru: "Махмудова Нодира",           en: "Nodira Makhmudova" },
    'team.4.role':  { uz: "Chiquvchi turizm bo'limi",     ru: "Отдел выездного туризма",    en: "Outbound department" },
    'team.4.lang':  { uz: "O'zbekcha · Ruscha · English · Türkçe", ru: "Узбекский · Русский · English · Türkçe", en: "Uzbek · Russian · English · Turkish" },

    'team.5.name':  { uz: "Rashidov Bobur",               ru: "Рашидов Бобур",              en: "Bobur Rashidov" },
    'team.5.role':  { uz: "MICE va tadbirlar",            ru: "MICE и мероприятия",         en: "MICE & events" },
    'team.5.lang':  { uz: "O'zbekcha · Ruscha · English", ru: "Узбекский · Русский · English", en: "Uzbek · Russian · English" },

    'team.6.name':  { uz: "Tursunova Madina",             ru: "Турсунова Мадина",           en: "Madina Tursunova" },
    'team.6.role':  { uz: "Mijozlar bilan ishlash",       ru: "Работа с клиентами",         en: "Client relations" },
    'team.6.lang':  { uz: "O'zbekcha · Ruscha · English · 中文", ru: "Узбекский · Русский · English · 中文", en: "Uzbek · Russian · English · Chinese" },

    // certificates
    'certs.label':  { uz: "Litsenziyalar va sertifikatlar", ru: "Лицензии и сертификаты",     en: "Licences & certifications" },
    'certs.title':  { uz: "Rasmiy <em>tasdiqlar</em>",       ru: "Официальные <em>подтверждения</em>", en: "Official <em>credentials</em>" },

    'cert.1.title': { uz: "Tour operator litsenziyasi",     ru: "Лицензия туроператора",      en: "Tour operator licence" },
    'cert.1.meta':  { uz: "RUz turizm vazirligi · 14.03.2012", ru: "Минтуризма РУз · 14.03.2012", en: "Ministry of Tourism · 14.03.2012" },
    'cert.2.title': { uz: "Davlat registratsiyasi",         ru: "Свидетельство о регистрации", en: "State registration certificate" },
    'cert.2.meta':  { uz: "Adliya vazirligi · 2012",        ru: "Министерство юстиции · 2012", en: "Ministry of Justice · 2012" },
    'cert.3.title': { uz: "IATA agentligi",                 ru: "Аккредитация IATA",          en: "IATA accreditation" },
    'cert.3.meta':  { uz: "Xalqaro aviatransport · 2014",   ru: "Международный авиатранспорт · 2014", en: "International Air Transport · 2014" },
    'cert.4.title': { uz: "TripAdvisor mukofoti",           ru: "Награда TripAdvisor",        en: "TripAdvisor award" },
    'cert.4.meta':  { uz: "Travellers' Choice · 2023, 2024", ru: "Travellers' Choice · 2023, 2024", en: "Travellers' Choice · 2023, 2024" },

    // partners
    'partners.label': { uz: "Hamkorlar",   ru: "Партнёры",    en: "Partners" },
    'partners.title': { uz: "Biz bilan <em>ishlaydiganlar</em>",
                        ru: "С кем мы <em>работаем</em>",
                        en: "Who <em>works with us</em>" },

    // ═══════ DESTINATIONS (index) ═══════
    'dest.label':   { uz: "O'zbekiston yo'nalishlari", ru: "Направления Узбекистана",   en: "Destinations in Uzbekistan" },
    'dest.title':   { uz: "Mamlakat <em>shaharlar</em> orqali",
                      ru: "Страна через её <em>города</em>",
                      en: "The country through <em>its cities</em>" },
    'dest.samarkand.name':   { uz: "Samarqand",  ru: "Самарканд", en: "Samarkand" },
    'dest.samarkand.meta':   { uz: "Registon, Shohi Zinda, Bibi-Xonim",
                               ru: "Регистан, Шахи Зинда, Биби-Ханым",
                               en: "Registan, Shah-i-Zinda, Bibi-Khanym" },
    'dest.bukhara.name':     { uz: "Buxoro",     ru: "Бухара",    en: "Bukhara" },
    'dest.bukhara.meta':     { uz: "Po'i-Kalon, Ark, Lyabi-Hovuz",
                               ru: "Пои-Калян, Арк, Ляби-Хауз",
                               en: "Po-i-Kalyan, the Ark, Lyab-i-Hauz" },
    'dest.khiva.name':       { uz: "Xiva",       ru: "Хива",      en: "Khiva" },
    'dest.khiva.meta':       { uz: "Ichan-Qala, Kalta-Minor",
                               ru: "Ичан-Кала, Калта-Минор",
                               en: "Itchan Kala, Kalta Minor" },
    'dest.tashkent.name':    { uz: "Toshkent",   ru: "Ташкент",   en: "Tashkent" },
    'dest.tashkent.meta':    { uz: "Eski shahar, Chorsu, Mustaqillik maydoni",
                               ru: "Старый город, Чорсу, площадь Независимости",
                               en: "Old town, Chorsu, Independence Square" },
    'dest.fergana.name':     { uz: "Farg'ona vodiysi", ru: "Ферганская долина", en: "Fergana Valley" },
    'dest.fergana.meta':     { uz: "Marg'ilon, Rishton, Qo'qon", ru: "Маргилан, Риштан, Коканд", en: "Margilan, Rishton, Kokand" },

    // ═══════ TOURS ═══════
    'tours.label':  { uz: "Bizning sayohatlarimiz", ru: "Наши туры",       en: "Our tours" },
    'tours.title':  { uz: "Mashhur <em>marshrutlar</em>",
                      ru: "Популярные <em>маршруты</em>",
                      en: "Popular <em>routes</em>" },
    'tours.intro':  { uz: "Eng ko'p so'raladigan sayohatlar. Sayohatchilar va xohishlarga moslab tuzatish mumkin.",
                      ru: "Самые востребованные туры. Все маршруты адаптируются под путешественников и пожелания.",
                      en: "Our most requested tours. Every itinerary can be tailored to the traveller's wishes." },

    // tours page filters
    'tours.filter.all':      { uz: "Barchasi",      ru: "Все",          en: "All" },
    'tours.filter.inbound':  { uz: "Kiruvchi",      ru: "Въездные",     en: "Inbound" },
    'tours.filter.outbound': { uz: "Chiquvchi",     ru: "Выездные",     en: "Outbound" },
    'tours.filter.domestic': { uz: "Ichki",         ru: "Внутренние",   en: "Domestic" },
    'tours.filter.mice':     { uz: "MICE",          ru: "MICE",         en: "MICE" },

    // categories shown on cards
    'cat.inbound':  { uz: "Kiruvchi",  ru: "Въездной",    en: "Inbound" },
    'cat.outbound': { uz: "Chiquvchi", ru: "Выездной",    en: "Outbound" },
    'cat.domestic': { uz: "Ichki",     ru: "Внутренний",  en: "Domestic" },
    'cat.mice':     { uz: "MICE",      ru: "MICE",        en: "MICE" },

    // 12 tours
    'tour.1.name':  { uz: "Buyuk Ipak yo'lining marvaridlari", ru: "Жемчужины Великого Шёлкового пути", en: "Pearls of the Great Silk Road" },
    'tour.1.dur':   { uz: "7 kun", ru: "7 дней", en: "7 days" },
    'tour.2.name':  { uz: "Samarqand — Buxoro — Xiva",  ru: "Самарканд — Бухара — Хива",  en: "Samarkand — Bukhara — Khiva" },
    'tour.2.dur':   { uz: "5 kun", ru: "5 дней", en: "5 days" },
    'tour.3.name':  { uz: "Gastronomik O'zbekiston",    ru: "Гастрономический Узбекистан", en: "Culinary Uzbekistan" },
    'tour.3.dur':   { uz: "6 kun", ru: "6 дней", en: "6 days" },
    'tour.4.name':  { uz: "Turkiya: hammasi kiritilgan Antalyaada", ru: "Турция: всё включено в Анталии", en: "Turkey: all-inclusive in Antalya" },
    'tour.4.dur':   { uz: "8 kun", ru: "8 дней", en: "8 days" },
    'tour.5.name':  { uz: "Dubay — zamonaviy ertak",    ru: "Дубай — современная сказка",  en: "Dubai — a modern fairytale" },
    'tour.5.dur':   { uz: "7 kun", ru: "7 дней", en: "7 days" },
    'tour.6.name':  { uz: "Gruziya: sharob va tog'lar", ru: "Грузия: вино и горы",         en: "Georgia: wine and mountains" },
    'tour.6.dur':   { uz: "6 kun", ru: "6 дней", en: "6 days" },
    'tour.7.name':  { uz: "Chimg'on va Beldersoy",      ru: "Чимган и Бельдерсай",        en: "Chimgan and Beldersay" },
    'tour.7.dur':   { uz: "2 kun", ru: "2 дня", en: "2 days" },
    'tour.8.name':  { uz: "Oydarko'l — yurtalar va cho'l", ru: "Айдаркуль — юрты и пустыня", en: "Aydarkul — yurts and desert" },
    'tour.8.dur':   { uz: "3 kun", ru: "3 дня", en: "3 days" },
    'tour.9.name':  { uz: "Nurota tog'lari va petrogliflar", ru: "Нуратинские горы и петроглифы", en: "Nuratau mountains and petroglyphs" },
    'tour.9.dur':   { uz: "4 kun", ru: "4 дня", en: "4 days" },
    'tour.10.name': { uz: "Korporativ chiqish — Samarqand", ru: "Корпоративный выезд в Самарканд", en: "Corporate retreat — Samarkand" },
    'tour.10.dur':  { uz: "3 kun", ru: "3 дня", en: "3 days" },
    'tour.11.name': { uz: "Konferensiya — Tashkent City", ru: "Конференция в Tashkent City", en: "Conference at Tashkent City" },
    'tour.11.dur':  { uz: "1–5 kun", ru: "1–5 дней", en: "1–5 days" },
    'tour.12.name': { uz: "Chimg'onda team-building",    ru: "Тимбилдинг в Чимгане",        en: "Team-building in Chimgan" },
    'tour.12.dur':  { uz: "2 kun", ru: "2 дня", en: "2 days" },

    'tours.cta.title': { uz: "Mos sayohatni topa olmadingizmi?",
                         ru: "Не нашли подходящий тур?",
                         en: "Can't find the right tour?" },
    'tours.cta.desc':  { uz: "Sizning xohishlaringizga ko'ra individual marshrut tuzamiz — shaharlar, sanalar va byudjet bo'yicha.",
                         ru: "Составим индивидуальный маршрут под ваши пожелания — города, даты, бюджет.",
                         en: "We'll craft an individual itinerary to your wishes — cities, dates, budget." },
    'tours.cta.btn':   { uz: "Individual sayohatni so'rang", ru: "Заказать индивидуальный тур", en: "Request a custom tour" },

    // ═══════ WHY US (index) ═══════
    'why.label':  { uz: "Nima uchun biz", ru: "Почему мы",      en: "Why us" },
    'why.title':  { uz: "Bizni <em>tanlashning</em> to'rt sababi",
                    ru: "Четыре причины <em>выбрать нас</em>",
                    en: "Four reasons <em>to choose us</em>" },

    'why.1.title': { uz: "Litsenziya 2012-yildan",  ru: "Лицензия с 2012 года",     en: "Licensed since 2012" },
    'why.1.desc':  { uz: "O'zbekiston Madaniy meros vazirligi tomonidan rasmiy litsenziya. Hujjatlarimiz tartibga solingan.",
                     ru: "Официальная лицензия Министерства туризма и культурного наследия. У нас всё в порядке с документами.",
                     en: "Official licence from the Ministry of Tourism. Our paperwork is impeccable." },

    'why.2.title': { uz: "Mahalliy gidlar",         ru: "Местные гиды",             en: "Local guides" },
    'why.2.desc':  { uz: "Faqat bu yerdan bo'lgan gidlar. Ular qaynonalarining oshxonalari haqida tarixchidan ko'ra ko'proq bilishadi.",
                     ru: "Только гиды отсюда. Они знают о своих городах больше, чем учебники по истории.",
                     en: "Only guides from here. They know their cities better than any history textbook." },

    'why.3.title': { uz: "Kalit topshirish",        ru: "Под ключ",                 en: "Turnkey service" },
    'why.3.desc':  { uz: "Bron qilishdan to qaytishgacha — barchasini qilamiz. Sizga faqat sayohat qilish qoladi.",
                     ru: "От бронирования до возвращения — берём всё на себя. Вам остаётся только путешествовать.",
                     en: "From booking to return — we handle everything. You just travel." },

    'why.4.title': { uz: "Vositachisiz",            ru: "Без посредников",          en: "No middlemen" },
    'why.4.desc':  { uz: "Mehmonxonalar va gidlar bilan to'g'ridan-to'g'ri ishlaymiz. Hech qanday ortiqcha narx, hech qanday tushunmovchilik.",
                     ru: "Работаем напрямую с отелями и гидами. Никаких наценок, никаких испорченных телефонов.",
                     en: "We work directly with hotels and guides. No markups, no broken telephone." },

    // ═══════ TESTIMONIALS (index) ═══════
    'testi.label':  { uz: "Mijozlarning fikrlari", ru: "Отзывы клиентов",     en: "Testimonials" },
    'testi.title':  { uz: "Mehmonlarimiz <em>nima deyishadi</em>",
                      ru: "Что говорят <em>наши гости</em>",
                      en: "What <em>our guests say</em>" },

    'testi.1.text': { uz: "Yangi yilni Buxoroda nishonladik — bu mening hayotimdagi eng yaxshi sayohatlardan biri edi. Dilfuza har kuni biz bilan aloqada bo'ldi. Rahmat!",
                      ru: "Встретили Новый год в Бухаре — это одно из лучших путешествий в моей жизни. Дилфуза была на связи каждый день. Спасибо!",
                      en: "We celebrated New Year in Bukhara — one of the best trips of my life. Dilfuza was in touch every single day. Thank you!" },
    'testi.1.name': { uz: "Anna Petrova", ru: "Анна Петрова", en: "Anna Petrova" },
    'testi.1.meta': { uz: "Rossiya · 2024-yil dekabri", ru: "Россия · декабрь 2024", en: "Russia · December 2024" },

    'testi.2.text': { uz: "I came for the Silk Road and got an entire culture, perfectly translated. Alisher's tours are the gold standard. Already planning to return with friends.",
                      ru: "Приехал ради Шёлкового пути, а получил целую культуру, прекрасно поданную. Туры Алишера — золотой стандарт. Уже планирую вернуться с друзьями.",
                      en: "I came for the Silk Road and got an entire culture, perfectly translated. Alisher's tours are the gold standard. Already planning to return with friends." },
    'testi.2.name': { uz: "Marcus Schmidt", ru: "Маркус Шмидт", en: "Marcus Schmidt" },
    'testi.2.meta': { uz: "Germaniya · 2024-yil oktyabr", ru: "Германия · октябрь 2024", en: "Germany · October 2024" },

    'testi.3.text': { uz: "Toshkentda korporativ tadbirni o'tkazdik. Bobur va jamoasi har bir detalni o'ylab chiqishgan: tarjima, transferlar, kechki ovqatlar. Hammasi bir kunda.",
                      ru: "Провели в Ташкенте корпоратив. Бобур и команда продумали всё до мелочей: перевод, трансферы, ужины. Всё за один день.",
                      en: "We held a corporate event in Tashkent. Bobur and his team thought through every detail: translation, transfers, dinners. All in a single day." },
    'testi.3.name': { uz: "Yuki Tanaka", ru: "Юки Танака", en: "Yuki Tanaka" },
    'testi.3.meta': { uz: "Yaponiya · 2024-yil sentyabr", ru: "Япония · сентябрь 2024", en: "Japan · September 2024" },

    // ═══════ REQUISITES / INFO BLOCK ═══════
    'req.label': { uz: "Kontakt ma'lumotlari",   ru: "Контактная информация",   en: "Contact information" },
    'req.title': { uz: "Kompaniya <em>rekvizitlari</em>",
                   ru: "Реквизиты <em>компании</em>",
                   en: "Company <em>details</em>" },
    'req.intro': { uz: "Rasmiy kompaniya rekvizitlari.",
                   ru: "Официальные реквизиты компании.",
                   en: "Official company details." },

    'req.location.lbl':  { uz: "Joylashuv",        ru: "Местонахождение",  en: "Location" },
    'req.location.head': { uz: "Bosh ofis",        ru: "Главный офис",      en: "Main office" },
    'req.location.val':  { uz: "Toshkent sh., Mirobod tumani<br>Yakka-Chinor ko'chasi, 2/1<br><em>Central Palace mehmonxonasi, 6-qavat</em>",
                           ru: "г. Ташкент, Мирабадский район<br>ул. Якка-Чинор, 2/1<br><em>Central Palace, 6 этаж</em>",
                           en: "Tashkent, Mirabad district<br>2/1 Yakka-Chinor St.<br><em>Central Palace Hotel, 6th floor</em>" },

    'req.hours.lbl':   { uz: "Ish vaqti",         ru: "Время работы",     en: "Working hours" },
    'req.hours.head':  { uz: "Qabul jadvali",     ru: "График приёма",    en: "Reception schedule" },
    'req.hours.val':   { uz: "Dushanba — Juma:<br>09:00 — 19:00<br><em>Shanba, Yakshanba — dam olish kunlari</em>",
                         ru: "Понедельник — Пятница:<br>09:00 — 19:00<br><em>Сб, Вс — выходные</em>",
                         en: "Monday — Friday:<br>09:00 — 19:00<br><em>Sat, Sun — closed</em>" },

    'req.director.lbl':  { uz: "Rahbar",         ru: "Руководитель",      en: "Director" },
    'req.director.head': { uz: "Israilov Uktamjon<br>Sultanqulovich",
                           ru: "Исраилов Уктамжон<br>Султанкулович",
                           en: "Uktamjon S. Israilov" },
    'req.director.val':  { uz: "OOO «FENIX MULTIGLOBAL» direktori<br><em>STIR (INN): 309775904</em>",
                           ru: "Директор ООО «FENIX MULTIGLOBAL»<br><em>ИНН: 309775904</em>",
                           en: "Director of FENIX MULTIGLOBAL LLC<br><em>Tax ID (INN): 309775904</em>" },

    'req.contact.lbl':  { uz: "Bog'lanish",      ru: "Связаться",         en: "Get in touch" },
    'req.contact.head': { uz: "Telefon va elektron pochta",
                          ru: "Телефон и email",
                          en: "Phone and email" },
    'req.contact.val':  { uz: "+998 77 358 53 77<br>info@agentaero.uz<br><em>Korporativ raqam</em>",
                          ru: "+998 77 358 53 77<br>info@agentaero.uz<br><em>Корпоративный номер</em>",
                          en: "+998 77 358 53 77<br>info@agentaero.uz<br><em>Corporate number</em>" },

    // ═══════ CTA SECTION ═══════
    'cta.title': { uz: "Sayohatni <em>rejalashtirishga</em> tayyormisiz?",
                   ru: "Готовы <em>спланировать</em> поездку?",
                   en: "Ready to <em>plan</em> your trip?" },
    'cta.desc':  { uz: "Bizga yozing — bir kun ichida javob beramiz. Telefon yoki Telegram orqali tezroq.",
                   ru: "Напишите нам — отвечаем в течение рабочего дня. Через телефон или Telegram быстрее.",
                   en: "Drop us a line — we reply within one working day. Phone or Telegram is faster." },
    'cta.btn.tel':{ uz: "Telefon qilish",        ru: "Позвонить",          en: "Call us" },
    'cta.btn.tg': { uz: "Telegramda yozish",     ru: "Написать в Telegram", en: "Message on Telegram" },

    // ═══════ CONTACT page ═══════
    'contact.eyebrow': { uz: "Bog'lanish",         ru: "Контакты",         en: "Contact" },
    'contact.title':   { uz: "Biz bilan <em>bog'laning</em>",
                         ru: "Свяжитесь <em>с нами</em>",
                         en: "Get in <em>touch</em>" },
    'contact.desc':    { uz: "Yozing yoki qo'ng'iroq qiling — bir kun ichida javob beramiz va sayohatni rejalashtirishga yordam beramiz.",
                         ru: "Напишите или позвоните — ответим в течение рабочего дня и поможем спланировать поездку.",
                         en: "Write or call — we'll reply within one working day and help you plan your trip." },

    'contact.form.title': { uz: "Anketani to'ldiring",  ru: "Заполните форму", en: "Fill out the form" },
    'contact.form.desc':  { uz: "Sayohat haqida qisqacha hikoya qiling — ko'p ma'lumot bo'lsa, javob aniqroq bo'ladi.",
                            ru: "Расскажите кратко о поездке — чем больше деталей, тем точнее ответ.",
                            en: "Tell us briefly about your trip — more detail means a better answer." },

    'form.name':         { uz: "Ismingiz",           ru: "Ваше имя",          en: "Your name" },
    'form.name.ph':      { uz: "Ali Valiyev",        ru: "Иван Петров",       en: "John Smith" },
    'form.email':        { uz: "Elektron pochta",    ru: "Email",             en: "Email" },
    'form.email.ph':     { uz: "siz@misol.uz",       ru: "вы@пример.ру",      en: "you@example.com" },
    'form.phone':        { uz: "Telefon raqami",     ru: "Телефон",           en: "Phone" },
    'form.phone.ph':     { uz: "+998 90 000-00-00",  ru: "+998 90 000-00-00", en: "+998 90 000-00-00" },
    'form.service':      { uz: "Xizmat turi",        ru: "Тип услуги",        en: "Service type" },
    'form.service.placeholder': { uz: "Tanlang…",   ru: "Выберите…",         en: "Choose…" },
    'form.service.opt1': { uz: "Kiruvchi turizm",    ru: "Въездной туризм",   en: "Inbound tourism" },
    'form.service.opt2': { uz: "Chiquvchi turizm",   ru: "Выездной туризм",   en: "Outbound tourism" },
    'form.service.opt3': { uz: "Ichki turizm",       ru: "Внутренний туризм", en: "Domestic tourism" },
    'form.service.opt4': { uz: "MICE / tadbirlar",   ru: "MICE / события",    en: "MICE / events" },
    'form.service.opt5': { uz: "Boshqa",             ru: "Другое",            en: "Other" },
    'form.message':      { uz: "Xabar",              ru: "Сообщение",         en: "Message" },
    'form.message.ph':   { uz: "Sayohat haqida hikoya qiling: shaharlar, sanalar, sayohatchilar soni.",
                           ru: "Расскажите о поездке: города, даты, количество путешественников.",
                           en: "Tell us about your trip: cities, dates, number of travellers." },
    'form.submit':       { uz: "Yuborish",           ru: "Отправить",         en: "Submit" },
    'form.hint':         { uz: "Ma'lumotlaringizni Maxfiylik siyosatiga muvofiq saqlaymiz.",
                           ru: "Мы храним ваши данные в соответствии с Политикой конфиденциальности.",
                           en: "We store your data per our Privacy Policy." },
    'form.success.h':    { uz: "Rahmat!",            ru: "Спасибо!",          en: "Thank you!" },
    'form.success.b':    { uz: "Xabaringiz qabul qilindi. Ish kuni davomida javob beramiz.",
                           ru: "Ваше сообщение получено. Мы ответим в течение рабочего дня.",
                           en: "Your message has been received. We'll respond within one working day." },

    'contact.methods.title': { uz: "Boshqa bog'lanish usullari", ru: "Другие способы связи", en: "Other ways to reach us" },
    'contact.m.tel.lbl':     { uz: "Telefon",         ru: "Телефон",          en: "Phone" },
    'contact.m.email.lbl':   { uz: "Elektron pochta", ru: "Email",            en: "Email" },
    'contact.m.tg.lbl':      { uz: "Telegram",        ru: "Telegram",         en: "Telegram" },
    'contact.m.wa.lbl':      { uz: "WhatsApp",        ru: "WhatsApp",         en: "WhatsApp" },

    'contact.map.title': { uz: "Bizni xaritada toping", ru: "Найдите нас на карте", en: "Find us on the map" },

    // ═══════ PROCESS (services) ═══════
    'process.label': { uz: "Qanday ishlaymiz",  ru: "Как мы работаем",   en: "How we work" },
    'process.title': { uz: "<em>To'rt qadam</em> sayohatga",
                       ru: "<em>Четыре шага</em> до поездки",
                       en: "<em>Four steps</em> to your trip" },

    'process.1.h':   { uz: "Murojaat",        ru: "Заявка",            en: "Enquiry" },
    'process.1.p':   { uz: "Bizga yozing — telefon, Telegram yoki shu yerdagi shakl orqali. Bir kun ichida javob beramiz.",
                       ru: "Напишите нам — телефон, Telegram или форма здесь. Ответим в течение рабочего дня.",
                       en: "Write to us — phone, Telegram or the form here. We respond within one working day." },
    'process.2.h':   { uz: "Rejalashtirish",  ru: "Планирование",      en: "Planning" },
    'process.2.p':   { uz: "Sizning xohishlaringiz va byudjetingizga ko'ra dasturni tuzamiz. Bir nechta variantni ko'rib chiqamiz.",
                       ru: "Составляем программу под ваши пожелания и бюджет. Обсуждаем варианты.",
                       en: "We craft a programme around your wishes and budget. We discuss options." },
    'process.3.h':   { uz: "Shartnoma",       ru: "Договор",           en: "Agreement" },
    'process.3.p':   { uz: "Rasmiy shartnoma, oldindan to'lov va barcha hujjatlar. Hammasi qonuniy va shaffof.",
                       ru: "Официальный договор, предоплата и все документы. Всё легально и прозрачно.",
                       en: "Official contract, deposit and all documents. Legal and transparent." },
    'process.4.h':   { uz: "Sayohat",         ru: "Поездка",           en: "The trip" },
    'process.4.p':   { uz: "Siz uchun barcha narsa tashkil etilgan. Bizning koordinator butun yo'l davomida bog'lanishda.",
                       ru: "Всё организовано. Наш координатор на связи в течение всей поездки.",
                       en: "Everything is arranged. Our coordinator stays in touch throughout the trip." },

    // ═══════ FAQ (services) ═══════
    'faq.label': { uz: "Tez-tez beriladigan savollar", ru: "Частые вопросы", en: "Frequently asked questions" },
    'faq.title': { uz: "Sayohatlar haqida <em>savollar</em>",
                   ru: "Вопросы <em>о наших турах</em>",
                   en: "Questions <em>about our tours</em>" },

    'faq.1.q': { uz: "Sayohatni rasmiylashtirish uchun qanday hujjatlar kerak?",
                 ru: "Какие документы нужны для оформления тура?",
                 en: "What documents do I need to book a tour?" },
    'faq.1.a': { uz: "Eng kamida — pasport va to'ldirilgan ariza. Chet ellik mehmonlar uchun — viza (kerak bo'lsa). Chiquvchi sayohat uchun — chiquvchi mamlakatga viza. Biz har bir holatda hujjatlar to'plamida yordam beramiz.",
                 ru: "Минимум — паспорт и заполненная анкета. Для иностранных гостей — виза (если требуется). Для выездных туров — виза в страну выезда. Поможем с подготовкой полного пакета документов.",
                 en: "At minimum — passport and a completed enquiry form. International guests may need a visa for Uzbekistan. For outbound trips — a visa to your destination. We help prepare the full document set." },

    'faq.2.q': { uz: "Viza olishda yordam berasizmi?",
                 ru: "Помогаете ли вы с получением визы?",
                 en: "Do you help with visas?" },
    'faq.2.a': { uz: "Ha. Biz vizaning rasmiylashtirilishida tajribaga egamiz: Shengen, AQSh, Turkiya, BAA, Janubi-Sharqiy Osiyo. Hujjatlarni tayyorlash, ariza, suhbatga tayyorgarlik.",
                 ru: "Да. У нас опыт оформления виз: Шенген, США, Турция, ОАЭ, Юго-Восточная Азия. Подготовка документов, подача, помощь с записью на интервью.",
                 en: "Yes. We have experience with visas to the Schengen area, USA, Turkey, UAE, Southeast Asia. Document preparation, submission, interview support." },

    'faq.3.q': { uz: "Sayohatni bo'lib to'lash mumkinmi?",
                 ru: "Можно ли оплатить тур в рассрочку?",
                 en: "Can I pay for the tour in instalments?" },
    'faq.3.a': { uz: "Ha — 50% oldindan to'lov, qolgani sayohatdan oldin. Yirik korporativ buyurtmalar uchun shaxsiy shartlar.",
                 ru: "Да — 50% предоплата, остаток до начала поездки. Для крупных корпоративных заказов — индивидуальные условия.",
                 en: "Yes — 50% deposit, the remainder before departure. For large corporate orders — individual terms." },

    'faq.4.q': { uz: "Kompaniya rasmiy ro'yxatdan o'tganmi?",
                 ru: "Зарегистрирована ли компания официально?",
                 en: "Is the company officially registered?" },
    'faq.4.a': { uz: "Ha. OOO «FENIX MULTIGLOBAL», O'zbekiston Respublikasida ro'yxatdan o'tgan. STIR (INN): 309775904. Tour operator litsenziyasini rasmiylashtirish jarayonida.",
                 ru: "Да. ООО «FENIX MULTIGLOBAL», зарегистрировано в Республике Узбекистан. ИНН: 309775904. Лицензия туроператора в процессе оформления.",
                 en: "Yes. FENIX MULTIGLOBAL LLC, registered in the Republic of Uzbekistan. Tax ID (INN): 309775904. Tour operator licence pending." },

    'faq.5.q': { uz: "Agar sayohatni bekor qilish kerak bo'lsa-chi?",
                 ru: "Что делать, если придётся отменить поездку?",
                 en: "What if I have to cancel my trip?" },
    'faq.5.a': { uz: "Bekor qilish shartlari shartnomada belgilangan. Sayohatdan 30 kun oldin bekor qilish — to'liq qaytarish (texnik xarajatlar bundan mustasno). 30 kundan kam — qisman qaytarish. Sug'urta tavsiya etiladi.",
                 ru: "Условия отмены — в договоре. Отмена за 30+ дней — полный возврат за вычетом технических расходов. Менее 30 дней — частичный возврат. Рекомендуем страховку от невыезда.",
                 en: "Cancellation terms are in the contract. 30+ days before — full refund less administrative fees. Less than 30 days — partial refund. We recommend cancellation insurance." },

    'faq.6.q': { uz: "Sayohat narxiga sug'urta kiritilganmi?",
                 ru: "Включена ли страховка в стоимость тура?",
                 en: "Is insurance included in the tour price?" },
    'faq.6.a': { uz: "Tibbiy sug'urta chiquvchi turlarga kiritilgan. Kiruvchi turlar uchun — talab bo'yicha. Bekor qilish va bagaj sug'urtasi — alohida tariflarga muvofiq.",
                 ru: "Медицинская страховка включена в выездные туры. Для въездных — по запросу. Страховка от невыезда и багажа — отдельно по тарифам.",
                 en: "Medical insurance is included in outbound tours. For inbound — on request. Cancellation and baggage insurance — separately, per tariff." },

    'faq.7.q': { uz: "Gidlaringiz qanday tillarda gapirishadi?",
                 ru: "На каких языках говорят ваши гиды?",
                 en: "What languages do your guides speak?" },
    'faq.7.a': { uz: "O'zbekcha, ruscha, ingliz tili — har doim. Shuningdek nemis, fransuz, italyan, ispan, turk va xitoy tillarida gidlar bor. Boshqa tillarda — oldindan kelishuv asosida.",
                 ru: "Узбекский, русский, английский — всегда. Также есть гиды с немецким, французским, итальянским, испанским, турецким и китайским. Другие языки — по согласованию заранее.",
                 en: "Uzbek, Russian, English — always. We also have guides in German, French, Italian, Spanish, Turkish and Chinese. Other languages by prior arrangement." },

    'faq.8.q': { uz: "Individual sayohatni tashkil qila olasizmi?",
                 ru: "Можете ли вы организовать индивидуальный тур?",
                 en: "Can you organise a custom tour?" },
    'faq.8.a': { uz: "Aynan shuni qilamiz. Bizning sayohatlarimizning aksariyati individual: shaharlar, sanalar, sur'at, mehmonxonalar darajasi — barchasi sizga moslashtiriladi.",
                 ru: "Это наша основная работа. Большинство наших туров — индивидуальные: города, даты, темп, уровень отелей подбираются под вас.",
                 en: "That's our main work. Most of our tours are bespoke: cities, dates, pace, hotel level — all tailored to you." },

    // ═══════ FOOTER ═══════
    'footer.desc':     { uz: "Litsenziyalangan tour operator Toshkentda. O'zbekiston bo'ylab va dunyo bo'ylab sayohatlar.",
                         ru: "Лицензированный туроператор в Ташкенте. Туры по Узбекистану и за рубеж.",
                         en: "Licensed tour operator in Tashkent. Tours within Uzbekistan and abroad." },
    'footer.h.company':  { uz: "Kompaniya",   ru: "Компания",  en: "Company" },
    'footer.h.services': { uz: "Xizmatlar",   ru: "Услуги",    en: "Services" },
    'footer.h.contact':  { uz: "Bog'lanish",  ru: "Контакты",  en: "Contact" },
    'footer.legal':      { uz: "Maxfiylik siyosati", ru: "Политика конфиденциальности", en: "Privacy policy" },
    'footer.offer':      { uz: "Ommaviy oferta",    ru: "Публичная оферта",            en: "Public offer" },
    'footer.terms':      { uz: "Foydalanish shartlari", ru: "Условия использования",   en: "Terms of use" },
    'footer.h.legal':    { uz: "Huquqiy hujjatlar", ru: "Правовая информация",        en: "Legal" },

    'form.consent':      { uz: "Men shaxsiy ma'lumotlarimni qayta ishlashga roziman", ru: "Я согласен на обработку персональных данных", en: "I consent to the processing of my personal data" },
    'form.consent.link': { uz: "Maxfiylik siyosati", ru: "Политики конфиденциальности", en: "Privacy Policy" },
    'footer.copy':       { uz: "© 2012—2026 FENIX MULTIGLOBAL · barcha huquqlar himoyalangan",
                           ru: "© 2012—2026 FENIX MULTIGLOBAL · все права защищены",
                           en: "© 2012—2026 FENIX MULTIGLOBAL · all rights reserved" },
    'footer.license':    { uz: "STIR (INN): 309775904",
                           ru: "ИНН: 309775904",
                           en: "Tax ID (INN): 309775904" },

    // ═══════ COOKIE BANNER ═══════
    'cookie.text':     { uz: "Saytimiz sizning qulayligingiz uchun cookie-fayllardan foydalanadi.",
                         ru: "Мы используем cookies, чтобы сайт работал лучше.",
                         en: "We use cookies to make this site work better." },
    'cookie.link':     { uz: "Batafsil",       ru: "Подробнее",   en: "Learn more" },
    'cookie.accept':   { uz: "Roziman",        ru: "Принять",     en: "Accept" },
    'cookie.aria':     { uz: "Cookie-fayllardan foydalanish", ru: "Использование cookies", en: "Cookie usage" },

    // ═══════ BREADCRUMBS ═══════
    'crumbs.home':    { uz: "Bosh sahifa",       ru: "Главная",   en: "Home" },

    // ═══════ 404 ═══════
    '404.title':   { uz: "Sahifa <em>topilmadi</em>",
                     ru: "Страница <em>не найдена</em>",
                     en: "Page <em>not found</em>" },
    '404.desc':    { uz: "Bunday sahifa mavjud emas yoki ko'chirilgan. Bosh sahifaga qaytib, davom etishingiz mumkin.",
                     ru: "Такой страницы не существует или она была перемещена. Вернитесь на главную и продолжайте оттуда.",
                     en: "This page doesn't exist or has been moved. Return to the home page and carry on from there." },
    '404.btn':     { uz: "Bosh sahifaga qaytish",  ru: "Вернуться на главную", en: "Back to home" },

    // ═══════ PRIVACY PAGE ═══════
    'privacy.title':   { uz: "Maxfiylik <em>siyosati</em>",
                         ru: "Политика <em>конфиденциальности</em>",
                         en: "Privacy <em>policy</em>" },
    'privacy.desc':    { uz: "Saytdan foydalanishda shaxsiy ma'lumotlarni qayta ishlash qoidalari.",
                         ru: "Правила обработки персональных данных при использовании сайта.",
                         en: "Rules for processing personal data when using this site." },

    'privacy.h1':   { uz: "1. Umumiy qoidalar",  ru: "1. Общие положения", en: "1. General provisions" },
    'privacy.p1':   { uz: "Ushbu Maxfiylik siyosati FENIX MULTIGLOBAL MChJ saytida shaxsiy ma'lumotlarni qayta ishlash tartibini belgilaydi. Sayt O'zbekiston Respublikasining 2019-yil 2-iyuldagi № O'RQ-547 \"Shaxsiy ma'lumotlar to'g'risida\" qonuni asosida ishlaydi.",
                     ru: "Настоящая Политика конфиденциальности определяет порядок обработки персональных данных на сайте FENIX MULTIGLOBAL ООО. Сайт работает в соответствии с Законом Республики Узбекистан от 02.07.2019 № ЗРУ-547 «О персональных данных».",
                     en: "This Privacy Policy defines how personal data is processed on the FENIX MULTIGLOBAL LLC website. The site operates under the Law of the Republic of Uzbekistan dated 02.07.2019 No. ZRU-547 'On Personal Data'." },

    'privacy.h2':   { uz: "2. Qanday ma'lumotlar to'planadi",
                      ru: "2. Какие данные мы собираем",
                      en: "2. What data we collect" },
    'privacy.p2':   { uz: "Aloqa shaklini to'ldirganda biz quyidagilarni so'raymiz: ism, elektron pochta, telefon, sayohat haqida xabar. Bundan tashqari, saytga tashrif buyurganingizda texnik ma'lumotlar avtomatik ravishda yig'iladi: IP-manzil, brauzer turi, tashrif sanasi.",
                      ru: "При заполнении формы обратной связи мы запрашиваем: имя, email, телефон, сообщение о поездке. Также при посещении сайта автоматически собираются технические данные: IP-адрес, тип браузера, дата визита.",
                      en: "When you submit the contact form we ask for: your name, email, phone and trip enquiry message. We also automatically collect technical data when you visit the site: IP address, browser type, visit date." },

    'privacy.h3':   { uz: "3. Ma'lumotlardan qanday foydalanamiz",
                      ru: "3. Как мы используем данные",
                      en: "3. How we use the data" },
    'privacy.p3':   { uz: "Sizning ma'lumotlaringiz quyidagilar uchun ishlatiladi: arizangizga javob berish, sayohatni tashkil qilish, hujjatlarni rasmiylashtirish, sayt va xizmatlarning sifatini yaxshilash. Biz spam yubormaymiz va ma'lumotlaringizni reklama tarmoqlariga uzatmaymiz.",
                      ru: "Ваши данные используются для: ответа на вашу заявку, организации поездки, оформления документов, улучшения качества сайта и услуг. Мы не рассылаем спам и не передаём данные в рекламные сети.",
                      en: "Your data is used to: respond to your enquiry, arrange your trip, prepare documents, and improve the quality of our site and services. We do not send spam and do not pass data to advertising networks." },

    'privacy.h4':   { uz: "4. Cookies",  ru: "4. Cookie-файлы",  en: "4. Cookies" },
    'privacy.p4':   { uz: "Sayt cookie-fayllardan foydalanadi — bu kichik fayllar bo'lib, brauzeringizda saqlanadi va saytni qulayroq qiladi: tanlangan tilni eslab qoladi, statistikani yig'adi. Brauzer sozlamalarida cookie-fayllarni o'chirib qo'yishingiz mumkin.",
                      ru: "Сайт использует cookies — небольшие файлы, которые хранятся в вашем браузере и делают сайт удобнее: запоминают выбранный язык, собирают статистику. Вы можете отключить cookies в настройках браузера.",
                      en: "The site uses cookies — small files stored in your browser that improve the experience: remembering language choice, collecting statistics. You can disable cookies in your browser settings." },

    'privacy.h5':   { uz: "5. Uchinchi shaxslarga uzatish",
                      ru: "5. Передача третьим лицам",
                      en: "5. Disclosure to third parties" },
    'privacy.p5':   { uz: "Sizning ma'lumotlaringiz uchinchi shaxslarga uzatilmaydi, bundan mustasno: sizning sayohatingizni tashkil qilish bilan bog'liq hollarda (mehmonxonalar, aviakompaniyalar, vizalar). Bunday hollarda — faqat kerakli minimum.",
                      ru: "Ваши данные не передаются третьим лицам, за исключением случаев, связанных с организацией вашей поездки (отели, авиакомпании, визовые центры). В таких случаях — только необходимый минимум.",
                      en: "Your data is not disclosed to third parties except where required for organising your trip (hotels, airlines, visa centres). In such cases — only the minimum necessary." },

    'privacy.h6':   { uz: "6. Sizning huquqlaringiz",
                      ru: "6. Ваши права",
                      en: "6. Your rights" },
    'privacy.p6':   { uz: "Siz quyidagi huquqlarga egasiz: o'zingiz haqingizda saqlanayotgan ma'lumotlarni so'rash, ularga tuzatishlar kiritish, o'chirilishini talab qilish, qayta ishlashga roziligingizni qaytarib olish. Bu uchun bizga yozing: info@agentaero.uz",
                      ru: "Вы имеете право: запросить хранящиеся о вас данные, потребовать их исправления, удаления, отозвать согласие на обработку. Для этого напишите нам: info@agentaero.uz",
                      en: "You have the right to: request data we hold about you, ask for corrections, ask for deletion, withdraw your consent to processing. To do so write to: info@agentaero.uz" },

    'privacy.h7':   { uz: "7. Bog'lanish",  ru: "7. Контакты",  en: "7. Contact" },
    'privacy.p7':   { uz: "Operator: FENIX MULTIGLOBAL MChJ, Toshkent, Yakka-Chinor ko'chasi, 2/1. info@agentaero.uz · +998 77 358 53 77",
                      ru: "Оператор: ООО «FENIX MULTIGLOBAL», г. Ташкент, ул. Якка-Чинор, 2/1. info@agentaero.uz · +998 77 358 53 77",
                      en: "Operator: FENIX MULTIGLOBAL LLC, Tashkent, 2/1 Yakka-Chinor St. info@agentaero.uz · +998 77 358 53 77" },

    'privacy.updated': { uz: "Oxirgi yangilanish: 14-may, 2026-yil",
                         ru: "Последнее обновление: 14 мая 2026 года",
                         en: "Last updated: 14 May 2026" },

    // ═══════ CALLBACK MODAL ═══════
    'callback.title':    { uz: "Sizga qo'ng'iroq qilamiz", ru: "Закажите обратный звонок", en: "Request a callback" },
    'callback.desc':     { uz: "Ish kunlari davomida 15 daqiqa ichida bog'lanamiz.", ru: "Перезвоним в течение 15 минут в рабочее время.", en: "We'll call you back within 15 minutes during business hours." },
    'callback.submit':   { uz: "Qo'ng'iroq buyurtma berish", ru: "Заказать звонок", en: "Request call" },
    'callback.hint':     { uz: "Ish vaqti: Du—Ju, 09:00—18:00 (Toshkent)", ru: "Рабочее время: Пн—Пт, 09:00—18:00 (Ташкент)", en: "Office hours: Mon—Fri, 09:00—18:00 (Tashkent)" },
    'callback.success.h':{ uz: "Rahmat!",  ru: "Спасибо!",    en: "Thank you!" },
    'callback.success.b':{ uz: "Tez orada sizga qo'ng'iroq qilamiz.", ru: "Мы перезвоним вам в ближайшее время.", en: "We'll call you back shortly." },

    // ═══════ NAVBAR: phone + callback + online status ═══════
    'nav.phone':         { uz: "+998 77 358 53 77", ru: "+998 77 358 53 77", en: "+998 77 358 53 77" },
    'nav.callback':      { uz: "Qo'ng'iroq buyurtma berish", ru: "Заказать звонок", en: "Request a callback" },
    'nav.online':        { uz: "Hozir onlayn", ru: "Сейчас онлайн", en: "Online now" },

    // ═══════ HOT TOURS section ═══════
    'hot.label':         { uz: "Yong'in narxlar", ru: "Горящие туры",      en: "Hot deals" },
    'hot.title':         { uz: "Cheklangan <em>takliflar</em>",
                           ru: "Ограниченные <em>предложения</em>",
                           en: "Limited <em>offers</em>" },
    'hot.intro':         { uz: "Eng yaxshi narxlar yaqin oylar uchun. Joylar tezda sotilib ketadi.",
                           ru: "Лучшие цены на ближайшие месяцы. Места уходят быстро.",
                           en: "Best prices for the coming months. Places sell out fast." },
    'hot.until':         { uz: "31-mayga qadar",  ru: "До 31 мая",   en: "Until May 31" },
    'hot.until2':        { uz: "15-iyunga qadar", ru: "До 15 июня",  en: "Until June 15" },
    'hot.until3':        { uz: "Cheklangan o'rinlar", ru: "Ограничено мест", en: "Limited seats" },
    'hot.until4':        { uz: "Faqat 4 o'rin",   ru: "Только 4 места", en: "Only 4 spots" },

    'hot.1.name':        { uz: "Antalya: bahor yulduzlari", ru: "Анталия: весенние звёзды", en: "Antalya: spring stars" },
    'hot.1.dur':         { uz: "8 kun", ru: "8 дней", en: "8 days" },
    'hot.2.name':        { uz: "Buyuk Ipak yo'li (lyuks)",  ru: "Великий Шёлковый путь (люкс)", en: "Great Silk Road (luxury)" },
    'hot.2.dur':         { uz: "7 kun", ru: "7 дней", en: "7 days" },
    'hot.3.name':        { uz: "Dubay — uch yulduzli safar", ru: "Дубай — трёхзвёздное путешествие", en: "Dubai — three-star getaway" },
    'hot.3.dur':         { uz: "6 kun", ru: "6 дней", en: "6 days" },
    'hot.4.name':        { uz: "Gruziya: tog' va sharob",   ru: "Грузия: горы и вино", en: "Georgia: mountains and wine" },
    'hot.4.dur':         { uz: "6 kun", ru: "6 дней", en: "6 days" },

    // ═══════ SEARCH WIDGET ═══════
    'search.dest.lbl':    { uz: "Yo'nalish",     ru: "Направление",   en: "Destination" },
    'search.dest.any':    { uz: "Istalgan",      ru: "Любое",         en: "Anywhere" },
    'search.date.lbl':    { uz: "Sayohat sanasi", ru: "Дата поездки", en: "Travel date" },
    'search.guests.lbl':  { uz: "Sayohatchilar", ru: "Путешественники", en: "Travellers" },
    'search.guests.1':    { uz: "1 odam",        ru: "1 человек",     en: "1 person" },
    'search.guests.2':    { uz: "2 odam",        ru: "2 человека",    en: "2 people" },
    'search.guests.3':    { uz: "3 odam",        ru: "3 человека",    en: "3 people" },
    'search.guests.4':    { uz: "4+ odam",       ru: "4+ человек",    en: "4+ people" },
    'search.submit':      { uz: "Sayohat tanlash", ru: "Подобрать тур", en: "Find a tour" },

    // ═══════ FOOTER payment methods ═══════
    'footer.pay.lbl':     { uz: "To'lov usullari", ru: "Способы оплаты", en: "Payment methods" },

    // ═══════ TOURS page: theme filters ═══════
    'theme.label':        { uz: "Mavzu bo'yicha", ru: "По теме",         en: "By theme" },
    'theme.all':          { uz: "Hammasi",        ru: "Все",             en: "All themes" },
    'theme.culture':      { uz: "Madaniyat",      ru: "Культура",        en: "Culture" },
    'theme.beach':        { uz: "Plyaj",          ru: "Пляжный",         en: "Beach" },
    'theme.mountain':     { uz: "Tog'lar",        ru: "Горы",            en: "Mountains" },
    'theme.food':         { uz: "Gastronomik",    ru: "Гастро",          en: "Gastronomy" },
    'theme.business':     { uz: "Biznes",         ru: "Бизнес",          en: "Business" },

    // ═══════ PAGE META (titles + descriptions) ═══════
    'page.home.title':       { uz: "FENIX MULTIGLOBAL — Toshkentdagi sayohatchilik kompaniyasi",
                               ru: "FENIX MULTIGLOBAL — туристическая компания в Ташкенте",
                               en: "FENIX MULTIGLOBAL — travel company in Tashkent" },
    'page.home.desc':        { uz: "O'zbekiston bo'ylab va dunyo bo'ylab sayohatlar. Litsenziyalangan tour operator 2012-yildan.",
                               ru: "Туры по Узбекистану и за рубеж. Лицензированный туроператор с 2012 года.",
                               en: "Tours of Uzbekistan and abroad. Licensed tour operator since 2012." },
    'page.about.title':      { uz: "Biz haqimizda — FENIX MULTIGLOBAL",
                               ru: "О компании — FENIX MULTIGLOBAL",
                               en: "About us — FENIX MULTIGLOBAL" },
    'page.about.desc':       { uz: "12 yildan beri Toshkentda. 18 kishi jamoada. 38 ta mamlakatdan mehmonlar.",
                               ru: "12 лет в Ташкенте. Команда из 18 человек. Гости из 38 стран.",
                               en: "12 years in Tashkent. Team of 18. Guests from 38 countries." },
    'page.services.title':   { uz: "Xizmatlar — FENIX MULTIGLOBAL",
                               ru: "Услуги — FENIX MULTIGLOBAL",
                               en: "Services — FENIX MULTIGLOBAL" },
    'page.services.desc':    { uz: "Kiruvchi, chiquvchi, ichki turizm va MICE-tadbirlar. To'liq xizmatlar paketi.",
                               ru: "Въездной, выездной, внутренний туризм и MICE. Полный пакет услуг.",
                               en: "Inbound, outbound, domestic tourism and MICE. Full service package." },
    'page.tours.title':      { uz: "Sayohatlar — FENIX MULTIGLOBAL",
                               ru: "Туры — FENIX MULTIGLOBAL",
                               en: "Tours — FENIX MULTIGLOBAL" },
    'page.tours.desc':       { uz: "O'zbekiston bo'ylab va dunyo bo'ylab mashhur marshrutlar. Individual va guruhli turlar.",
                               ru: "Популярные маршруты по Узбекистану и за рубеж. Индивидуальные и групповые туры.",
                               en: "Popular routes within Uzbekistan and abroad. Individual and group tours." },
    'page.contact.title':    { uz: "Bog'lanish — FENIX MULTIGLOBAL",
                               ru: "Контакты — FENIX MULTIGLOBAL",
                               en: "Contact — FENIX MULTIGLOBAL" },
    'page.contact.desc':     { uz: "Ofisimiz Toshkentda. Ish vaqti, manzil, telefon, e-mail va xarita.",
                               ru: "Офис в Ташкенте. Часы работы, адрес, телефон, e-mail и карта.",
                               en: "Office in Tashkent. Working hours, address, phone, e-mail and map." },
    'page.privacy.title':    { uz: "Maxfiylik siyosati — FENIX MULTIGLOBAL",
                               ru: "Политика конфиденциальности — FENIX MULTIGLOBAL",
                               en: "Privacy policy — FENIX MULTIGLOBAL" },
    'page.privacy.desc':     { uz: "Saytdagi shaxsiy ma'lumotlarni qayta ishlash qoidalari.",
                               ru: "Правила обработки персональных данных на сайте.",
                               en: "Rules for processing personal data on this site." },
    'page.offer.title':      { uz: "Ommaviy oferta — FENIX MULTIGLOBAL",
                               ru: "Публичная оферта — FENIX MULTIGLOBAL",
                               en: "Public offer — FENIX MULTIGLOBAL" },
    'page.offer.desc':       { uz: "Sayohat xizmatlarini ko'rsatish shartlari va bron qilish tartibi.",
                               ru: "Условия оказания туристических услуг и порядок бронирования.",
                               en: "Terms for provision of tourism services and booking procedure." },
    'page.terms.title':      { uz: "Foydalanish shartlari — FENIX MULTIGLOBAL",
                               ru: "Условия использования сайта — FENIX MULTIGLOBAL",
                               en: "Website terms of use — FENIX MULTIGLOBAL" },
    'page.terms.desc':       { uz: "Saytdan foydalanish va cookie-fayllar siyosati.",
                               ru: "Правила использования сайта и политика cookies.",
                               en: "Website usage rules and cookie policy." },
    'page.404.title':        { uz: "404 — Sahifa topilmadi",
                               ru: "404 — Страница не найдена",
                               en: "404 — Page not found" },
    'page.404.desc':         { uz: "Bu manzilda sahifa yo'q.",
                               ru: "Страницы по этому адресу не существует.",
                               en: "No page exists at this address." },
  };

  // ──────────────────────────────────────────
  // PUBLIC API
  // ──────────────────────────────────────────

  function detectLang() {
    // 1. ?lang= URL param has highest priority — for shareable hreflang links
    try {
      const params = new URLSearchParams(window.location.search);
      const fromUrl = params.get('lang');
      if (SUPPORTED.includes(fromUrl)) return fromUrl;
    } catch (e) { /* old browser */ }

    // 2. Already chosen by user (returning visitor)
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (SUPPORTED.includes(saved)) return saved;
    } catch (e) { /* localStorage unavailable */ }

    // 3. Browser language
    const langs = navigator.languages || [navigator.language || navigator.userLanguage || ''];
    for (const raw of langs) {
      const code = String(raw).toLowerCase().split('-')[0];
      if (SUPPORTED.includes(code)) return code;
    }

    // 4. Fallback — Uzbek
    return DEFAULT_LANG;
  }

  function applyLang(lang) {
    if (!SUPPORTED.includes(lang)) lang = DEFAULT_LANG;

    // Text content [data-i18n="key"]
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      const key = el.getAttribute('data-i18n');
      if (t[key] && t[key][lang] !== undefined) {
        el.innerHTML = t[key][lang];
      }
    });

    // Attributes [data-i18n-attr="placeholder:form.name,aria-label:form.name.aria"]
    document.querySelectorAll('[data-i18n-attr]').forEach(function (el) {
      el.getAttribute('data-i18n-attr').split(',').forEach(function (pair) {
        const parts = pair.trim().split(':');
        const attr = parts[0];
        const key = parts[1];
        if (attr && key && t[key] && t[key][lang] !== undefined) {
          el.setAttribute(attr, t[key][lang].replace(/<[^>]*>/g, ''));
        }
      });
    });

    // [data-lang="ru|uz|en"] blocks — show only matching language (for long legal content)
    // IMPORTANT: skip lang switcher buttons — they use data-lang as identifier, not content language
    document.querySelectorAll('[data-lang]').forEach(function (el) {
      // Skip anything inside the language switcher (buttons that pick a language)
      if (el.closest && el.closest('.nav-lang')) return;
      const want = el.getAttribute('data-lang');
      if (want === 'uz' || want === 'ru' || want === 'en') {
        el.style.display = (want === lang) ? '' : 'none';
      }
    });

    // System: html lang, title, meta description
    document.documentElement.lang = lang;

    // <title> from data-i18n on <title> (set in head)
    const titleEl = document.querySelector('title[data-i18n]');
    if (titleEl) {
      const key = titleEl.getAttribute('data-i18n');
      if (t[key] && t[key][lang]) document.title = t[key][lang].replace(/<[^>]*>/g, '');
    }

    // meta description
    const descEl = document.querySelector('meta[name="description"][data-i18n]');
    if (descEl) {
      const key = descEl.getAttribute('data-i18n');
      if (t[key] && t[key][lang]) descEl.setAttribute('content', t[key][lang].replace(/<[^>]*>/g, ''));
    }

    // Open Graph locale
    const ogLocale = { uz: 'uz_UZ', ru: 'ru_RU', en: 'en_US' }[lang];
    const ogLocaleEl = document.querySelector('meta[property="og:locale"]');
    if (ogLocaleEl) ogLocaleEl.setAttribute('content', ogLocale);

    // Active lang button
    document.querySelectorAll('.nav-lang button').forEach(function (btn) {
      const isActive = btn.getAttribute('data-lang') === lang;
      btn.classList.toggle('active', isActive);
      btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
    });

    // Save
    try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) { /* */ }

    // Notify
    document.dispatchEvent(new CustomEvent('mavr:lang', { detail: { lang: lang } }));
  }

  function currentLang() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (SUPPORTED.includes(saved)) return saved;
    } catch (e) { /* */ }
    return document.documentElement.lang || DEFAULT_LANG;
  }

  // Expose globally
  window.MavrI18n = {
    SUPPORTED: SUPPORTED,
    DEFAULT: DEFAULT_LANG,
    detect: detectLang,
    apply: applyLang,
    current: currentLang,
    t: t
  };
})();
