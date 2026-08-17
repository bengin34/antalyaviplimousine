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

export const publicRouteSlugs = Object.freeze(
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

export const routeData = Object.freeze(
  Object.fromEntries(
    Object.entries(routeCatalog).map(([slug, route]) => [slug, {
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
