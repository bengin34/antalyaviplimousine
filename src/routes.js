/**
 * Canonical public and operational transfer route catalogue.
 *
 * Prices, airport distances, duration copy and localized destination names
 * must be changed here first. Compatibility exports in `prices.js` and the
 * admin profit/loss graph are derived from this module.
 */
export const routeCatalog = {
  antalya: {
    names: { en: "Antalya City", de: "Antalya Stadt", tr: "Antalya şehir merkezi", ru: "центр Антальи", cs: "centrum Antalye", uk: "Центр Анталії", ur: "انطالیہ شہر" },
    distanceKm: 15,
    durationMin: 25,
    duration: { en: "20–30 minutes", de: "20–30 Minuten", tr: "20–30 dakika", ru: "20–30 минут", cs: "20–30 minut", uk: "20–30 хвилин", ur: "20–30 منٹ" },
    originalPrices: { vito: 40, sprinter: 65 },
    prices: { vito: 35, sprinter: 55 },
  },
  belek: {
    names: { en: "Belek", de: "Belek", tr: "Belek", ru: "Белек", cs: "Belek", uk: "Белек", ur: "بیلک" },
    distanceKm: 45,
    durationMin: 35,
    duration: { en: "35–40 minutes", de: "35–40 Minuten", tr: "35–40 dakika", ru: "35–40 минут", cs: "35–40 minut", uk: "35–40 хвилин", ur: "35–40 منٹ" },
    originalPrices: { vito: 50, sprinter: 85 },
    prices: { vito: 40, sprinter: 70 },
  },
  side: {
    names: { en: "Side", de: "Side", tr: "Side", ru: "Сиде", cs: "Side", uk: "Сіде", ur: "سیدے" },
    distanceKm: 65,
    durationMin: 55,
    duration: { en: "55–65 minutes", de: "55–65 Minuten", tr: "55–65 dakika", ru: "55–65 минут", cs: "55–65 minut", uk: "55–65 хвилин", ur: "55–65 منٹ" },
    originalPrices: { vito: 60, sprinter: 100 },
    prices: { vito: 50, sprinter: 85 },
  },
  kemer: {
    names: { en: "Kemer", de: "Kemer", tr: "Kemer", ru: "Кемер", cs: "Kemer", uk: "Кемер", ur: "کیمر" },
    distanceKm: 50,
    durationMin: 60,
    duration: { en: "40–50 minutes", de: "40–50 Minuten", tr: "40–50 dakika", ru: "40–50 минут", cs: "40–50 minut", uk: "40–50 хвилин", ur: "40–50 منٹ" },
    originalPrices: { vito: 65, sprinter: 110 },
    prices: { vito: 55, sprinter: 90 },
  },
  alanya: {
    names: { en: "Alanya", de: "Alanya", tr: "Alanya", ru: "Аланью", cs: "Alanya", uk: "Аланья", ur: "الانیا" },
    distanceKm: 125,
    durationMin: 120,
    duration: { en: "110–130 minutes", de: "110–130 Minuten", tr: "110–130 dakika", ru: "110–130 минут", cs: "110–130 minut", uk: "110–130 хвилин", ur: "110–130 منٹ" },
    originalPrices: { vito: 110, sprinter: 170 },
    prices: { vito: 95, sprinter: 145 },
  },
  // Alanya sub-regions. The single €95 Alanya tariff covered everything from
  // Okurcalar to Demirtaş — a 65 km spread — so ALANYA_PRICING_PLAN.md splits
  // it by distance. `landing: false` keeps these out of the marketed route
  // pages and the sitemap: they are prices the hotel index resolves to, not
  // destinations anyone searches for. `alanya` itself stays listed, keeps its
  // landing page, and remains the fallback for a guest who cannot place their
  // own hotel — the dearest of the six, so an unknown hotel is never undersold.
  //
  // Distances and durations here are estimates and feed the profit/loss cost
  // model, not the customer's price. Confirm them against real journeys.
  alanya_bati: {
    names: { en: "West Alanya", de: "West-Alanya", tr: "Batı Alanya", ru: "Западную Аланью", cs: "Západní Alanya", uk: "Західна Аланія", ur: "مغربی الانیا" },
    distanceKm: 105,
    durationMin: 100,
    duration: { en: "90–110 minutes", de: "90–110 Minuten", tr: "90–110 dakika", ru: "90–110 минут", cs: "90–110 minut", uk: "90–110 хвилин", ur: "90–110 منٹ" },
    originalPrices: { vito: 80, sprinter: 105 },
    prices: { vito: 70, sprinter: 90 },
    landing: false, // covers Okurcalar, İncekum, Avsallar, Türkler, Payallar, Konaklı
  },
  alanya_merkez: {
    names: { en: "Alanya Centre", de: "Alanya Zentrum", tr: "Alanya merkez", ru: "центр Аланьи", cs: "centrum Alanye", uk: "Центр Аланії", ur: "الانیا شہر" },
    distanceKm: 125,
    durationMin: 120,
    duration: { en: "110–130 minutes", de: "110–130 Minuten", tr: "110–130 dakika", ru: "110–130 минут", cs: "110–130 minut", uk: "110–130 хвилин", ur: "110–130 منٹ" },
    originalPrices: { vito: 85, sprinter: 110 },
    prices: { vito: 75, sprinter: 95 },
    landing: false, // covers Merkez, Kleopatra, Oba, Tosmur
  },
  alanya_dogu: {
    names: { en: "East Alanya", de: "Ost-Alanya", tr: "Doğu Alanya", ru: "Восточную Аланью", cs: "Východní Alanya", uk: "Східна Аланія", ur: "مشرقی الانیا" },
    distanceKm: 138,
    durationMin: 130,
    duration: { en: "120–140 minutes", de: "120–140 Minuten", tr: "120–140 dakika", ru: "120–140 минут", cs: "120–140 minut", uk: "120–140 хвилин", ur: "120–140 منٹ" },
    originalPrices: { vito: 90, sprinter: 120 },
    prices: { vito: 80, sprinter: 105 },
    landing: false, // covers Kestel, Mahmutlar
  },
  kargicak: {
    names: { en: "Kargıcak", de: "Kargıcak", tr: "Kargıcak", ru: "Каргыджак", cs: "Kargıcak", uk: "Каргиджак", ur: "کارگیجاک" },
    distanceKm: 150,
    durationMin: 145,
    duration: { en: "135–155 minutes", de: "135–155 Minuten", tr: "135–155 dakika", ru: "135–155 минут", cs: "135–155 minut", uk: "135–155 хвилин", ur: "135–155 منٹ" },
    originalPrices: { vito: 105, sprinter: 135 },
    prices: { vito: 90, sprinter: 115 },
    landing: false, // covers Kargıcak
  },
  demirtas: {
    names: { en: "Demirtaş", de: "Demirtaş", tr: "Demirtaş", ru: "Демирташ", cs: "Demirtaş", uk: "Демірташ", ur: "دیمرتاش" },
    distanceKm: 170,
    durationMin: 165,
    duration: { en: "155–175 minutes", de: "155–175 Minuten", tr: "155–175 dakika", ru: "155–175 минут", cs: "155–175 minut", uk: "155–175 хвилин", ur: "155–175 منٹ" },
    originalPrices: { vito: 115, sprinter: 150 },
    prices: { vito: 100, sprinter: 130 },
    landing: false, // covers Demirtaş
  },
  bogazkent: {
    names: { en: "Boğazkent", de: "Boğazkent", tr: "Boğazkent", ru: "Богазкент", cs: "Boğazkent", uk: "Богазкент", ur: "بوازکینت" },
    distanceKm: 48,
    durationMin: 45,
    duration: { en: "40–45 minutes", de: "40–45 Minuten", tr: "40–45 dakika", ru: "40–45 минут", cs: "40–45 minut", uk: "40–45 хвилин", ur: "40–45 منٹ" },
    originalPrices: { vito: 55, sprinter: 90 },
    prices: { vito: 45, sprinter: 80 },
  },
  manavgat: {
    names: { en: "Manavgat", de: "Manavgat", tr: "Manavgat", ru: "Манавгат", cs: "Manavgat", uk: "Манавгат", ur: "مانوگات" },
    distanceKm: 75,
    durationMin: 65,
    duration: { en: "55–65 minutes", de: "55–65 Minuten", tr: "55–65 dakika", ru: "55–65 минут", cs: "55–65 minut", uk: "55–65 хвилин", ur: "55–65 منٹ" },
    originalPrices: { vito: 60, sprinter: 100 },
    prices: { vito: 50, sprinter: 85 },
  },
  kizilagac: {
    names: { en: "Manavgat/Kızılağaç", de: "Manavgat/Kızılağaç", tr: "Manavgat/Kızılağaç", ru: "Манавгат/Кызылагач", cs: "Manavgat/Kızılağaç", uk: "Манавгат/Кизилагач", ur: "مانوگات/قیزیلاغاچ" },
    distanceKm: 85,
    durationMin: 75,
    duration: { en: "70–80 minutes", de: "70–80 Minuten", tr: "70–80 dakika", ru: "70–80 минут", cs: "70–80 minut", uk: "70–80 хвилин", ur: "70–80 منٹ" },
    originalPrices: { vito: 70, sprinter: 115 },
    prices: { vito: 60, sprinter: 95 },
  },
  tekirova: {
    names: { en: "Tekirova", de: "Tekirova", tr: "Tekirova", ru: "Текирову", cs: "Tekirova", uk: "Текірова", ur: "ٹیکیروا" },
    distanceKm: 75,
    durationMin: 75,
    duration: { en: "75–90 minutes", de: "75–90 Minuten", tr: "75–90 dakika", ru: "75–90 минут", cs: "75–90 minut", uk: "75–90 хвилин", ur: "75–90 منٹ" },
    originalPrices: { vito: 90, sprinter: 135 },
    prices: { vito: 75, sprinter: 115 },
  },
  bodrum: {
    names: { en: "Bodrum", de: "Bodrum", tr: "Bodrum", ru: "Бодрум", cs: "Bodrum", uk: "Бодрум", ur: "بودروم" },
    distanceKm: 380,
    durationMin: 300,
    duration: { en: "5–6 hours", de: "5–6 Stunden", tr: "5–6 saat", ru: "5–6 часов", cs: "5–6 hodin", uk: "5–6 годин", ur: "5–6 گھنٹے" },
    originalPrices: { vito: 325, sprinter: 385 },
    prices: { vito: 280, sprinter: 330 },
  },
  dalaman: {
    names: { en: "Dalaman", de: "Dalaman", tr: "Dalaman", ru: "Даламан", cs: "Dalaman", uk: "Даламан", ur: "دالامان" },
    distanceKm: 235,
    durationMin: 210,
    duration: { en: "3–3.5 hours", de: "3–3,5 Stunden", tr: "3–3,5 saat", ru: "3–3,5 часа", cs: "3–3,5 hodiny", uk: "3–3,5 години", ur: "3–3.5 گھنٹے" },
    originalPrices: { vito: 210, sprinter: 310 },
    prices: { vito: 180, sprinter: 265 },
  },
  fethiye: {
    names: { en: "Fethiye", de: "Fethiye", tr: "Fethiye", ru: "Фетхие", cs: "Fethiye", uk: "Фетхіє", ur: "فتحیہ" },
    distanceKm: 205,
    durationMin: 180,
    duration: { en: "2.5–3 hours", de: "2,5–3 Stunden", tr: "2,5–3 saat", ru: "2,5–3 часа", cs: "2,5–3 hodiny", uk: "2,5–3 години", ur: "2.5–3 گھنٹے" },
    originalPrices: { vito: 210, sprinter: 310 },
    prices: { vito: 180, sprinter: 265 },
  },
  pamukkale: {
    names: { en: "Pamukkale", de: "Pamukkale", tr: "Pamukkale", ru: "Памуккале", cs: "Pamukkale", uk: "Памуккале", ur: "پاموکالے" },
    distanceKm: 245,
    durationMin: 180,
    duration: { en: "3–3.5 hours", de: "3–3,5 Stunden", tr: "3–3,5 saat", ru: "3–3,5 часа", cs: "3–3,5 hodiny", uk: "3–3,5 години", ur: "3–3.5 گھنٹے" },
    originalPrices: { vito: 290, sprinter: 350 },
    prices: { vito: 250, sprinter: 300 },
  },
  kapadokya: {
    names: { en: "Cappadocia", de: "Kappadokien", tr: "Kapadokya", ru: "Каппадокию", cs: "Kappadokie", uk: "Каппадокія", ur: "کاپاڈوکیا" },
    distanceKm: 540,
    durationMin: 480,
    duration: { en: "7–8 hours", de: "7–8 Stunden", tr: "7–8 saat", ru: "7–8 часов", cs: "7–8 hodin", uk: "7–8 годин", ur: "7–8 گھنٹے" },
    originalPrices: { vito: 350, sprinter: 410 },
    prices: { vito: 300, sprinter: 350 },
  },
};

/** Routes with their own marketed landing page and sitemap entry. */
export const publicRouteSlugs = Object.freeze(
  /** @type {Array<keyof typeof routeCatalog>} */ (
    Object.keys(routeCatalog).filter((slug) => routeCatalog[slug].landing !== false)
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
    Object.entries(routeCatalog).filter(([, route]) => route.landing !== false).map(([slug, route]) => [slug, {
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
