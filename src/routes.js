/**
 * Canonical public and operational transfer route catalogue.
 *
 * Prices, airport distances, duration copy and localized destination names
 * must be changed here first. Compatibility exports in `prices.js` and the
 * admin profit/loss graph are derived from this module.
 */
export const routeCatalog = {
  antalya: {
    names: { en: "Antalya City", de: "Antalya Stadt", tr: "Antalya şehir merkezi", ru: "центр Антальи", cs: "centrum Antalye", uk: "Центр Анталії", ur: "انطالیہ شہر", zh: "安塔利亚市区", da: "Antalya by", es: "Ciudad de Antalya", el: "Πόλη της Αντάλια", he: "מרכז אנטליה", hu: "Antalya belváros", it: "Antalya Città", ja: "アンタルヤ市内", ko: "안탈리아 시내", pt: "Cidade de Antalya", ro: "Orașul Antalya" },
    distanceKm: 15,
    durationMin: 25,
    duration: { en: "20–30 minutes", de: "20–30 Minuten", tr: "20–30 dakika", ru: "20–30 минут", cs: "20–30 minut", uk: "20–30 хвилин", ur: "20–30 منٹ", pl: "20–30 minut", nl: "20–30 minuten", sv: "20–30 minuter", ar: "20–30 دقيقة", zh: "20–30分钟", da: "20-30 minutter", es: "20–30 minutos", el: "20–30 λεπτά", he: "20–30 דקות", hu: "20–30 perc", it: "20–30 minuti", ja: "20〜30分", ko: "20~30분", pt: "20–30 minutos", ro: "20–30 de minute" },
    originalPrices: { vito: 40, sprinter: 65 },
    prices: { vito: 35, sprinter: 60 },
  },
  belek: {
    names: { en: "Belek", de: "Belek", tr: "Belek", ru: "Белек", cs: "Belek", uk: "Белек", ur: "بیلک", zh: "贝莱克", da: "Belek", es: "Belek", el: "Μπέλεκ", he: "בלק", hu: "Belek", it: "Belek", ja: "ベレク", ko: "벨렉", pt: "Belek", ro: "Belek" },
    distanceKm: 45,
    durationMin: 35,
    duration: { en: "35–40 minutes", de: "35–40 Minuten", tr: "35–40 dakika", ru: "35–40 минут", cs: "35–40 minut", uk: "35–40 хвилин", ur: "35–40 منٹ", pl: "35–40 minut", nl: "35–40 minuten", sv: "35–40 minuter", ar: "35–40 دقيقة", zh: "35–40分钟", da: "35-40 minutter", es: "35–40 minutos", el: "35–40 λεπτά", he: "35–40 דקות", hu: "35–40 perc", it: "35–40 minuti", ja: "35〜40分", ko: "35~40분", pt: "35–40 minutos", ro: "35–40 de minute" },
    originalPrices: { vito: 50, sprinter: 85 },
    prices: { vito: 40, sprinter: 70 },
  },
  side: {
    names: { en: "Side", de: "Side", tr: "Side", ru: "Сиде", cs: "Side", uk: "Сіде", ur: "سیدے", zh: "锡代", da: "Side", es: "Side", el: "Σίδη", he: "סידה", hu: "Side", it: "Side", ja: "シデ", ko: "시데", pt: "Side", ro: "Side" },
    distanceKm: 65,
    durationMin: 55,
    duration: { en: "55–65 minutes", de: "55–65 Minuten", tr: "55–65 dakika", ru: "55–65 минут", cs: "55–65 minut", uk: "55–65 хвилин", ur: "55–65 منٹ", pl: "55–65 minut", nl: "55–65 minuten", sv: "55–65 minuter", ar: "55–65 دقيقة", zh: "55–65分钟", da: "55-65 minutter", es: "55–65 minutos", el: "55–65 λεπτά", he: "55–65 דקות", hu: "55–65 perc", it: "55–65 minuti", ja: "55〜65分", ko: "55~65분", pt: "55–65 minutos", ro: "55–65 de minute" },
    originalPrices: { vito: 60, sprinter: 100 },
    prices: { vito: 50, sprinter: 85 },
  },
  kemer: {
    names: { en: "Kemer", de: "Kemer", tr: "Kemer", ru: "Кемер", cs: "Kemer", uk: "Кемер", ur: "کیمر", zh: "凯梅尔", da: "Kemer", es: "Kemer", el: "Κεμέρ", he: "קמר", hu: "Kemer", it: "Kemer", ja: "ケメル", ko: "케메르", pt: "Kemer", ro: "Kemer" },
    distanceKm: 50,
    durationMin: 60,
    duration: { en: "40–50 minutes", de: "40–50 Minuten", tr: "40–50 dakika", ru: "40–50 минут", cs: "40–50 minut", uk: "40–50 хвилин", ur: "40–50 منٹ", pl: "40–50 minut", nl: "40–50 minuten", sv: "40–50 minuter", ar: "40–50 دقيقة", zh: "40–50分钟", da: "40-50 minutter", es: "40–50 minutos", el: "40–50 λεπτά", he: "40–50 דקות", hu: "40–50 perc", it: "40–50 minuti", ja: "40〜50分", ko: "40~50분", pt: "40–50 minutos", ro: "40–50 de minute" },
    originalPrices: { vito: 65, sprinter: 110 },
    prices: { vito: 55, sprinter: 90 },
  },
  alanya: {
    names: { en: "Alanya", de: "Alanya", tr: "Alanya", ru: "Аланью", cs: "Alanya", uk: "Аланья", ur: "الانیا", zh: "阿拉尼亚", da: "Alanya", es: "Alanya", el: "Αλάνια", he: "אלניה", hu: "Alanya", it: "Alanya", ja: "アランヤ", ko: "알라니아", pt: "Alanya", ro: "Alanya" },
    distanceKm: 125,
    durationMin: 120,
    duration: { en: "110–130 minutes", de: "110–130 Minuten", tr: "110–130 dakika", ru: "110–130 минут", cs: "110–130 minut", uk: "110–130 хвилин", ur: "110–130 منٹ", pl: "110–130 minut", nl: "110–130 minuten", sv: "110–130 minuter", ar: "110–130 دقيقة", zh: "110–130分钟", da: "110-130 minutter", es: "110–130 minutos", el: "110–130 λεπτά", he: "110–130 דקות", hu: "110–130 perc", it: "110–130 minuti", ja: "110〜130分", ko: "110~130분", pt: "110–130 minutos", ro: "110–130 de minute" },
    originalPrices: { vito: 110, sprinter: 170 },
    prices: { vito: 95, sprinter: 145 },
  },
  // Alanya sub-regions. The single €95 Alanya tariff covered everything from
  // Okurcalar to Demirtaş — a 65 km spread — so ALANYA_PRICING_PLAN.md splits
  // it by distance. `landingRoute` names the marketed page these belong to and
  // keeps them out of the route pages and the sitemap: they are prices the
  // hotel index resolves to, not destinations anyone searches for. A hotel in
  // one of them is still presented under Alanya, and priced by its own
  // sub-region. `alanya` itself stays listed, keeps its landing page, and
  // remains the fallback for a guest who cannot place their own hotel.
  //
  // Every price here clears the profit model's own cost for the distance —
  // `route-margin.test.js` fails the build if one stops doing so. That is what
  // holds the western strip below the old €95 and puts Alanya centre and
  // everything east of it above it: at 15 TRY/km with an empty return leg, a
  // 125 km round trip costs €80 before a driver is paid, so the plan's
  // €65–€95 ladder was a loss on four of these five regions.
  //
  // The €95 `alanya` fallback therefore no longer tops the ladder. It stays
  // safe out to its own 125 km, which covers the sub-regions a guest is most
  // likely to fail to place; a Kargıcak or Demirtaş guest who cannot name
  // their hotel is still under-quoted, so those two are worth confirming by
  // hand before the transfer is accepted.
  //
  // Distances and durations here are estimates and feed the profit/loss cost
  // model, not the customer's price. Confirm them against real journeys.
  alanya_bati: {
    names: { en: "West Alanya", de: "West-Alanya", tr: "Batı Alanya", ru: "Западную Аланью", cs: "Západní Alanya", uk: "Західна Аланія", ur: "مغربی الانیا" },
    distanceKm: 105,
    durationMin: 100,
    duration: { en: "90–110 minutes", de: "90–110 Minuten", tr: "90–110 dakika", ru: "90–110 минут", cs: "90–110 minut", uk: "90–110 хвилин", ur: "90–110 منٹ" },
    originalPrices: { vito: 90, sprinter: 115 },
    prices: { vito: 80, sprinter: 100 },
    landingRoute: "alanya", // covers Okurcalar, İncekum, Avsallar, Türkler, Payallar, Konaklı
  },
  alanya_merkez: {
    names: { en: "Alanya Centre", de: "Alanya Zentrum", tr: "Alanya merkez", ru: "центр Аланьи", cs: "centrum Alanye", uk: "Центр Аланії", ur: "الانیا شہر" },
    distanceKm: 125,
    durationMin: 120,
    duration: { en: "110–130 minutes", de: "110–130 Minuten", tr: "110–130 dakika", ru: "110–130 минут", cs: "110–130 minut", uk: "110–130 хвилин", ur: "110–130 منٹ" },
    originalPrices: { vito: 105, sprinter: 130 },
    prices: { vito: 95, sprinter: 115 },
    landingRoute: "alanya", // covers Merkez, Kleopatra, Oba, Tosmur
  },
  alanya_dogu: {
    names: { en: "East Alanya", de: "Ost-Alanya", tr: "Doğu Alanya", ru: "Восточную Аланью", cs: "Východní Alanya", uk: "Східна Аланія", ur: "مشرقی الانیا" },
    distanceKm: 138,
    durationMin: 130,
    duration: { en: "120–140 minutes", de: "120–140 Minuten", tr: "120–140 dakika", ru: "120–140 минут", cs: "120–140 minut", uk: "120–140 хвилин", ur: "120–140 منٹ" },
    originalPrices: { vito: 115, sprinter: 145 },
    prices: { vito: 105, sprinter: 130 },
    landingRoute: "alanya", // covers Kestel, Mahmutlar
  },
  kargicak: {
    names: { en: "Kargıcak", de: "Kargıcak", tr: "Kargıcak", ru: "Каргыджак", cs: "Kargıcak", uk: "Каргиджак", ur: "کارگیجاک" },
    distanceKm: 150,
    durationMin: 145,
    duration: { en: "135–155 minutes", de: "135–155 Minuten", tr: "135–155 dakika", ru: "135–155 минут", cs: "135–155 minut", uk: "135–155 хвилин", ur: "135–155 منٹ" },
    originalPrices: { vito: 130, sprinter: 160 },
    prices: { vito: 115, sprinter: 140 },
    landingRoute: "alanya", // covers Kargıcak
  },
  demirtas: {
    names: { en: "Demirtaş", de: "Demirtaş", tr: "Demirtaş", ru: "Демирташ", cs: "Demirtaş", uk: "Демірташ", ur: "دیمرتاش" },
    distanceKm: 170,
    durationMin: 165,
    duration: { en: "155–175 minutes", de: "155–175 Minuten", tr: "155–175 dakika", ru: "155–175 минут", cs: "155–175 minut", uk: "155–175 хвилин", ur: "155–175 منٹ" },
    originalPrices: { vito: 145, sprinter: 180 },
    prices: { vito: 130, sprinter: 160 },
    landingRoute: "alanya", // covers Demirtaş
  },
  bogazkent: {
    names: { en: "Boğazkent", de: "Boğazkent", tr: "Boğazkent", ru: "Богазкент", cs: "Boğazkent", uk: "Богазкент", ur: "بوازکینت", zh: "博阿兹肯特", da: "Boğazkent", es: "Boğazkent", el: "Μπογάζκεντ", he: "בואזקנט", hu: "Boğazkent", it: "Boğazkent", ja: "ボアズケント", ko: "보아즈켄트", pt: "Boğazkent", ro: "Boğazkent" },
    distanceKm: 48,
    durationMin: 45,
    duration: { en: "40–45 minutes", de: "40–45 Minuten", tr: "40–45 dakika", ru: "40–45 минут", cs: "40–45 minut", uk: "40–45 хвилин", ur: "40–45 منٹ", pl: "40–45 minut", nl: "40–45 minuten", sv: "40–45 minuter", ar: "40–45 دقيقة", zh: "40–45分钟", da: "40-45 minutter", es: "40–45 minutos", el: "40–45 λεπτά", he: "40–45 דקות", hu: "40–45 perc", it: "40–45 minuti", ja: "40〜45分", ko: "40~45분", pt: "40–45 minutos", ro: "40–45 de minute" },
    originalPrices: { vito: 55, sprinter: 90 },
    prices: { vito: 45, sprinter: 80 },
  },
  manavgat: {
    names: { en: "Manavgat", de: "Manavgat", tr: "Manavgat", ru: "Манавгат", cs: "Manavgat", uk: "Манавгат", ur: "مانوگات", zh: "马纳夫加特", da: "Manavgat", es: "Manavgat", el: "Μαναβγκάτ", he: "מאנאבגאט", hu: "Manavgat", it: "Manavgat", ja: "マナヴガト", ko: "마나브가트", pt: "Manavgat", ro: "Manavgat" },
    distanceKm: 75,
    durationMin: 65,
    duration: { en: "55–65 minutes", de: "55–65 Minuten", tr: "55–65 dakika", ru: "55–65 минут", cs: "55–65 minut", uk: "55–65 хвилин", ur: "55–65 منٹ", pl: "55–65 minut", nl: "55–65 minuten", sv: "55–65 minuter", ar: "55–65 دقيقة", zh: "55–65分钟", da: "55-65 minutter", es: "55–65 minutos", el: "55–65 λεπτά", he: "55–65 דקות", hu: "55–65 perc", it: "55–65 minuti", ja: "55〜65分", ko: "55~65분", pt: "55–65 minutos", ro: "55–65 de minute" },
    originalPrices: { vito: 60, sprinter: 100 },
    prices: { vito: 50, sprinter: 85 },
  },
  kizilagac: {
    names: { en: "Manavgat/Kızılağaç", de: "Manavgat/Kızılağaç", tr: "Manavgat/Kızılağaç", ru: "Манавгат/Кызылагач", cs: "Manavgat/Kızılağaç", uk: "Манавгат/Кизилагач", ur: "مانوگات/قیزیلاغاچ", zh: "马纳夫加特/克孜勒阿加奇", da: "Manavgat/Kızılağaç", es: "Manavgat/Kızılağaç", el: "Μαναβγκάτ/Κιζιλάγατς", he: "מאנאבגאט/קיזילאגאץ'", hu: "Manavgat/Kızılağaç", it: "Manavgat/Kızılağaç", ja: "マナヴガト/クズラアチ", ko: "마나브가트/크즐라아치", pt: "Manavgat/Kızılağaç", ro: "Manavgat/Kızılağaç" },
    distanceKm: 85,
    durationMin: 75,
    duration: { en: "70–80 minutes", de: "70–80 Minuten", tr: "70–80 dakika", ru: "70–80 минут", cs: "70–80 minut", uk: "70–80 хвилин", ur: "70–80 منٹ", pl: "70–80 minut", nl: "70–80 minuten", sv: "70–80 minuter", ar: "70–80 دقيقة", zh: "70–80分钟", da: "70-80 minutter", es: "70–80 minutos", el: "70–80 λεπτά", he: "70–80 דקות", hu: "70–80 perc", it: "70–80 minuti", ja: "70〜80分", ko: "70~80분", pt: "70–80 minutos", ro: "70–80 de minute" },
    originalPrices: { vito: 75, sprinter: 120 },
    prices: { vito: 65, sprinter: 100 },
  },
  tekirova: {
    names: { en: "Tekirova", de: "Tekirova", tr: "Tekirova", ru: "Текирову", cs: "Tekirova", uk: "Текірова", ur: "ٹیکیروا", zh: "泰基罗瓦", da: "Tekirova", es: "Tekirova", el: "Τεκίροβα", he: "טקירובה", hu: "Tekirova", it: "Tekirova", ja: "テキロヴァ", ko: "테키로바", pt: "Tekirova", ro: "Tekirova" },
    distanceKm: 75,
    durationMin: 75,
    duration: { en: "75–90 minutes", de: "75–90 Minuten", tr: "75–90 dakika", ru: "75–90 минут", cs: "75–90 minut", uk: "75–90 хвилин", ur: "75–90 منٹ", pl: "75–90 minut", nl: "75–90 minuten", sv: "75–90 minuter", ar: "75–90 دقيقة", zh: "75–90分钟", da: "75-90 minutter", es: "75–90 minutos", el: "75–90 λεπτά", he: "75–90 דקות", hu: "75–90 perc", it: "75–90 minuti", ja: "75〜90分", ko: "75~90분", pt: "75–90 minutos", ro: "75–90 de minute" },
    originalPrices: { vito: 90, sprinter: 135 },
    prices: { vito: 75, sprinter: 115 },
  },
  // Kumluca and Kaş sit west of Tekirova on the Antalya–Fethiye coast road,
  // far past the €75 Tekirova tariff. They carry no marketed landing page —
  // the index resolves a handful of Kumluca/Adrasan and Kaş hotels to them and
  // prices those journeys on their own distance. `landingRoute` keeps them out
  // of the route pages and sitemap while still letting a guest name them as a
  // destination and quote the fare. Distances feed the profit model, not the
  // customer price.
  kumluca: {
    names: { en: "Kumluca", de: "Kumluca", tr: "Kumluca", ru: "Кумлуджа", cs: "Kumluca", uk: "Кумлуджа", ur: "قوملوجہ" },
    distanceKm: 90,
    durationMin: 80,
    duration: { en: "75–90 minutes", de: "75–90 Minuten", tr: "75–90 dakika", ru: "75–90 минут", cs: "75–90 minut", uk: "75–90 хвилин", ur: "75–90 منٹ" },
    originalPrices: { vito: 140, sprinter: 200 },
    prices: { vito: 120, sprinter: 170 },
    landingRoute: "tekirova", // covers Kumluca, Adrasan
  },
  kas: {
    names: { en: "Kaş", de: "Kaş", tr: "Kaş", ru: "Каш", cs: "Kaş", uk: "Каш", ur: "کاش" },
    distanceKm: 185,
    durationMin: 165,
    duration: { en: "2.5–3 hours", de: "2,5–3 Stunden", tr: "2,5–3 saat", ru: "2,5–3 часа", cs: "2,5–3 hodiny", uk: "2,5–3 години", ur: "2.5–3 گھنٹے" },
    originalPrices: { vito: 195, sprinter: 290 },
    prices: { vito: 170, sprinter: 250 },
    landingRoute: "fethiye", // covers Kaş, Çukurbağ
  },
  bodrum: {
    names: { en: "Bodrum", de: "Bodrum", tr: "Bodrum", ru: "Бодрум", cs: "Bodrum", uk: "Бодрум", ur: "بودروم", zh: "博德鲁姆", da: "Bodrum", es: "Bodrum", el: "Μπόντρουμ", he: "בודרום", hu: "Bodrum", it: "Bodrum", ja: "ボドルム", ko: "보드룸", pt: "Bodrum", ro: "Bodrum" },
    distanceKm: 380,
    durationMin: 300,
    duration: { en: "5–6 hours", de: "5–6 Stunden", tr: "5–6 saat", ru: "5–6 часов", cs: "5–6 hodin", uk: "5–6 годин", ur: "5–6 گھنٹے", pl: "5–6 godzin", nl: "5–6 uur", sv: "5–6 timmar", ar: "5–6 ساعات", zh: "5–6小时", da: "5-6 timer", es: "5–6 horas", el: "5–6 ώρες", he: "5–6 שעות", hu: "5–6 óra", it: "5–6 ore", ja: "5〜6時間", ko: "5~6시간", pt: "5–6 horas", ro: "5–6 ore" },
    originalPrices: { vito: 325, sprinter: 385 },
    prices: { vito: 280, sprinter: 330 },
  },
  dalaman: {
    names: { en: "Dalaman", de: "Dalaman", tr: "Dalaman", ru: "Даламан", cs: "Dalaman", uk: "Даламан", ur: "دالامان", zh: "达拉曼", da: "Dalaman", es: "Dalaman", el: "Νταλαμάν", he: "דלמאן", hu: "Dalaman", it: "Dalaman", ja: "ダラマン", ko: "달라만", pt: "Dalaman", ro: "Dalaman" },
    distanceKm: 235,
    durationMin: 210,
    duration: { en: "3–3.5 hours", de: "3–3,5 Stunden", tr: "3–3,5 saat", ru: "3–3,5 часа", cs: "3–3,5 hodiny", uk: "3–3,5 години", ur: "3–3.5 گھنٹے", pl: "3–3.5 godzin", nl: "3–3.5 uur", sv: "3–3.5 timmar", ar: "3–3.5 ساعات", zh: "3–3.5小时", da: "3-3,5 timer", es: "3–3,5 horas", el: "3–3,5 ώρες", he: "3–3.5 שעות", hu: "3–3,5 óra", it: "3–3,5 ore", ja: "3〜3.5時間", ko: "3~3.5시간", pt: "3–3,5 horas", ro: "3–3,5 ore" },
    originalPrices: { vito: 210, sprinter: 310 },
    prices: { vito: 180, sprinter: 265 },
  },
  fethiye: {
    names: { en: "Fethiye", de: "Fethiye", tr: "Fethiye", ru: "Фетхие", cs: "Fethiye", uk: "Фетхіє", ur: "فتحیہ", zh: "费特希耶", da: "Fethiye", es: "Fethiye", el: "Φετχιγέ", he: "פתייה", hu: "Fethiye", it: "Fethiye", ja: "フェティエ", ko: "페티예", pt: "Fethiye", ro: "Fethiye" },
    distanceKm: 205,
    durationMin: 180,
    duration: { en: "2.5–3 hours", de: "2,5–3 Stunden", tr: "2,5–3 saat", ru: "2,5–3 часа", cs: "2,5–3 hodiny", uk: "2,5–3 години", ur: "2.5–3 گھنٹے", pl: "2.5–3 godzin", nl: "2.5–3 uur", sv: "2.5–3 timmar", ar: "2.5–3 ساعات", zh: "2.5–3小时", da: "2,5-3 timer", es: "2,5–3 horas", el: "2,5–3 ώρες", he: "2.5–3 שעות", hu: "2,5–3 óra", it: "2,5–3 ore", ja: "2.5〜3時間", ko: "2.5~3시간", pt: "2,5–3 horas", ro: "2,5–3 ore" },
    originalPrices: { vito: 210, sprinter: 310 },
    prices: { vito: 180, sprinter: 265 },
  },
  pamukkale: {
    names: { en: "Pamukkale", de: "Pamukkale", tr: "Pamukkale", ru: "Памуккале", cs: "Pamukkale", uk: "Памуккале", ur: "پاموکالے", zh: "棉花堡", da: "Pamukkale", es: "Pamukkale", el: "Παμούκκαλε", he: "פאמוקקלה", hu: "Pamukkale", it: "Pamukkale", ja: "パムッカレ", ko: "파묵칼레", pt: "Pamukkale", ro: "Pamukkale" },
    distanceKm: 245,
    durationMin: 180,
    duration: { en: "3–3.5 hours", de: "3–3,5 Stunden", tr: "3–3,5 saat", ru: "3–3,5 часа", cs: "3–3,5 hodiny", uk: "3–3,5 години", ur: "3–3.5 گھنٹے", pl: "3–3.5 godzin", nl: "3–3.5 uur", sv: "3–3.5 timmar", ar: "3–3.5 ساعات", zh: "3–3.5小时", da: "3-3,5 timer", es: "3–3,5 horas", el: "3–3,5 ώρες", he: "3–3.5 שעות", hu: "3–3,5 óra", it: "3–3,5 ore", ja: "3〜3.5時間", ko: "3~3.5시간", pt: "3–3,5 horas", ro: "3–3,5 ore" },
    originalPrices: { vito: 290, sprinter: 350 },
    prices: { vito: 250, sprinter: 300 },
  },
  kapadokya: {
    names: { en: "Cappadocia", de: "Kappadokien", tr: "Kapadokya", ru: "Каппадокию", cs: "Kappadokie", uk: "Каппадокія", ur: "کاپاڈوکیا", zh: "卡帕多奇亚", da: "Kappadokien", es: "Capadocia", el: "Καππαδοκία", he: "קפדוקיה", hu: "Kappadókia", it: "Cappadocia", ja: "カッパドキア", ko: "카파도키아", pt: "Capadócia", ro: "Capadocia" },
    distanceKm: 540,
    durationMin: 480,
    duration: { en: "7–8 hours", de: "7–8 Stunden", tr: "7–8 saat", ru: "7–8 часов", cs: "7–8 hodin", uk: "7–8 годин", ur: "7–8 گھنٹے", pl: "7–8 godzin", nl: "7–8 uur", sv: "7–8 timmar", ar: "7–8 ساعات", zh: "7–8小时", da: "7-8 timer", es: "7–8 horas", el: "7–8 ώρες", he: "7–8 שעות", hu: "7–8 óra", it: "7–8 ore", ja: "7〜8時間", ko: "7~8시간", pt: "7–8 horas", ro: "7–8 ore" },
    originalPrices: { vito: 380, sprinter: 440 },
    prices: { vito: 330, sprinter: 380 },
  },
};

/** Routes with their own marketed landing page and sitemap entry. */
export const publicRouteSlugs = Object.freeze(
  /** @type {Array<keyof typeof routeCatalog>} */ (
    Object.keys(routeCatalog).filter((slug) => !routeCatalog[slug].landingRoute)
  ),
);

/** Routes a guest can pick as a destination in the booking form. */
export const bookableRouteSlugs = Object.freeze(
  /** @type {Array<keyof typeof routeCatalog>} */ (Object.keys(routeCatalog)),
);

export const turkishLocationNames = Object.freeze({
  airport: "Antalya Havalimanı",
  hotel: "Otel",
  private_address: "Özel adres",
  ...Object.fromEntries(
    Object.entries(routeCatalog).map(([slug, route]) => [slug, route.names.tr]),
  ),
  antalya: "Antalya",
  kizilagac: "Kızılağaç",
});

/**
 * Price lookup for the marketed routes, used by the legacy static site's
 * price tokens. Unlisted sub-regions are excluded: nothing on those pages
 * quotes them.
 */
export const routeData = Object.freeze(
  Object.fromEntries(
    Object.entries(routeCatalog).filter(([, route]) => !route.landingRoute).map(([slug, route]) => [slug, {
      name: route.names.en,
      originalPrices: route.originalPrices,
      prices: route.prices,
    }]),
  ),
);

const regionalConnections = [
  ["belek", "bogazkent", 10],
  ["bogazkent", "side", 25],
  ["side", "manavgat", 10],
  ["manavgat", "kizilagac", 15],
  ["kizilagac", "alanya", 45],
  ["kizilagac", "alanya_bati", 20],
  ["alanya_bati", "alanya_merkez", 20],
  ["alanya_merkez", "alanya_dogu", 13],
  ["alanya_dogu", "kargicak", 12],
  ["kargicak", "demirtas", 20],
  ["antalya", "kemer", 45],
  ["kemer", "tekirova", 20],
  ["tekirova", "kumluca", 30],
  ["kumluca", "kas", 95],
  ["kas", "fethiye", 110],
  ["tekirova", "fethiye", 155],
  ["fethiye", "dalaman", 50],
  ["dalaman", "bodrum", 200],
  ["antalya", "pamukkale", 235],
  ["pamukkale", "bodrum", 250],
  ["manavgat", "kapadokya", 500],
];

export const routeEdges = Object.freeze([
  ...Object.entries(routeCatalog).map(([slug, route]) => ["airport", slug, route.distanceKm]),
  ...regionalConnections,
]);

export const localizedRoute = (slug, language = "en") => {
  const route = routeCatalog[slug];
  if (!route) return null;
  return {
    ...route,
    slug,
    name: route.names[language] ?? route.names.en,
    distance: `${route.distanceKm} km`,
    durationLabel: route.duration[language] ?? route.duration.en,
  };
};
