/**
 * Otelden alınma (pickup) kuralları.
 *
 * Dönüş transferlerinde referans nokta uçağın **kalkış** saatidir. Yolcunun
 * havalimanında kalkıştan 2,5 saat önce olması gerekir; buna bölgenin yol
 * süresi ve trafik payı eklenerek otelden alınma saati bulunur.
 *
 *   otelden alınma = kalkış − (2,5 saat + yol süresi + bölge trafik payı)
 *
 * Yol süreleri `routes.js` içindeki kanonik `durationMin` değerlerinden gelir;
 * bu modül yalnızca bölgeye özgü trafik/erişim payını ekler.
 */
import { routeCatalog, turkishLocationNames } from "./routes.js";

/** Yolcunun havalimanında kalkıştan kaç dakika önce olması gerektiği. */
export const AIRPORT_CHECKIN_LEAD_MIN = 150;

/**
 * Bölgeye özgü trafik/erişim payı (dakika). Yol süresine eklenir.
 * Sahil yolu, tek şeritli bağlantılar ve şehir içi trafiği burada karşılanır.
 */
const REGION_TRAFFIC_BUFFER_MIN = {
  antalya: 15,      // şehir içi trafik
  belek: 15,        // otel bölgesi içi servis yolları
  bogazkent: 15,
  side: 20,         // Manavgat-Side sahil trafiği
  manavgat: 20,
  kizilagac: 20,
  kemer: 25,        // tek güzergâh sahil yolu + tünel
  tekirova: 25,
  alanya: 30,       // uzun D400 güzergâhı
  fethiye: 45,
  dalaman: 45,
  pamukkale: 45,
  bodrum: 60,
  kapadokya: 60,
};

/** Bölgesi bilinmeyen alışlar (otel / özel adres) için varsayılan kural. */
export const DEFAULT_PICKUP_RULE = Object.freeze({
  slug: null,
  label: "Bölge belirtilmedi",
  driveMin: 60,
  bufferMin: 20,
  isDefault: true,
});

/** slug -> { slug, label, driveMin, bufferMin } */
export const REGION_PICKUP_RULES = Object.freeze(
  Object.fromEntries(
    Object.entries(routeCatalog).map(([slug, route]) => [slug, Object.freeze({
      slug,
      label: turkishLocationNames[slug] ?? route.names.tr ?? slug,
      driveMin: route.durationMin,
      bufferMin: REGION_TRAFFIC_BUFFER_MIN[slug] ?? 20,
      isDefault: false,
    })]),
  ),
);

function normalizeLocation(value) {
  return String(value ?? "").trim().toLocaleLowerCase("tr-TR");
}

/**
 * Verilen alış konumu için bölge kuralını döndürür.
 * `hotel`, `private_address` gibi bölgesi belirsiz konumlarda varsayılan kural
 * uygulanır; havalimanının kendisi için kural yoktur (null).
 */
export function pickupRuleFor(location) {
  const slug = normalizeLocation(location);
  if (!slug || slug === "airport") return null;
  return REGION_PICKUP_RULES[slug] ?? DEFAULT_PICKUP_RULE;
}

/** Kalkıştan geriye sayılacak toplam dakika (check-in + yol + trafik payı). */
export function airportPickupLeadMinutes(location) {
  const rule = pickupRuleFor(location);
  if (!rule) return null;
  return AIRPORT_CHECKIN_LEAD_MIN + rule.driveMin + rule.bufferMin;
}

function parseTimeToMinutes(value) {
  const match = /^([01]\d|2[0-3]):([0-5]\d)/.exec(String(value ?? "").trim());
  if (!match) return null;
  return Number(match[1]) * 60 + Number(match[2]);
}

function formatMinutesAsTime(minutes) {
  const hours = Math.floor(minutes / 60);
  return `${String(hours).padStart(2, "0")}:${String(minutes % 60).padStart(2, "0")}`;
}

/** "2 sa 35 dk" biçiminde okunabilir süre. */
export function formatDurationTr(minutes) {
  const total = Math.max(0, Math.round(Number(minutes) || 0));
  const hours = Math.floor(total / 60);
  const rest = total % 60;
  if (!hours) return `${rest} dk`;
  if (!rest) return `${hours} sa`;
  return `${hours} sa ${rest} dk`;
}

/**
 * Dönüş uçuşu kalkış saatinden tavsiye edilen otelden alınma saatini hesaplar.
 *
 * @param {string|null|undefined} departureTime Kalkış saati (HH:MM veya HH:MM:SS)
 * @param {string|null|undefined} pickupLocation Yolcunun alınacağı bölge slug'ı
 * @returns {null | {
 *   time: string, dayOffset: number, leadMinutes: number,
 *   checkinMin: number, driveMin: number, bufferMin: number,
 *   rule: { slug: string|null, label: string, driveMin: number, bufferMin: number, isDefault: boolean },
 * }}
 */
export function recommendedAirportPickup(departureTime, pickupLocation) {
  const departureMinutes = parseTimeToMinutes(departureTime);
  const rule = pickupRuleFor(pickupLocation);
  if (departureMinutes === null || !rule) return null;

  const leadMinutes = AIRPORT_CHECKIN_LEAD_MIN + rule.driveMin + rule.bufferMin;
  // 5 dakikalık dilime yuvarla: erken tarafa, yani her zaman güvenli yöne.
  const raw = departureMinutes - leadMinutes;
  const rounded = Math.floor(raw / 5) * 5;
  const dayOffset = Math.floor(rounded / 1440);
  const time = formatMinutesAsTime(((rounded % 1440) + 1440) % 1440);

  return {
    time,
    dayOffset,
    leadMinutes,
    checkinMin: AIRPORT_CHECKIN_LEAD_MIN,
    driveMin: rule.driveMin,
    bufferMin: rule.bufferMin,
    rule,
  };
}

/** Tavsiye kuralının tek satırlık açıklaması. */
export function pickupRuleSummary(pickup) {
  if (!pickup) return "";
  const region = pickup.rule.isDefault ? "Bölge belirtilmedi" : pickup.rule.label;
  return `${region} · ${formatDurationTr(pickup.checkinMin)} havalimanı payı + ${formatDurationTr(pickup.driveMin)} yol + ${formatDurationTr(pickup.bufferMin)} trafik payı = ${formatDurationTr(pickup.leadMinutes)} önce`;
}

/**
 * Girilen dönüş alış saatinin tavsiyeye göre durumunu döndürür.
 * `diffMinutes` pozitifse alış saati tavsiyeden geç (riskli) demektir.
 */
export function comparePickupTime(actualTime, pickup) {
  if (!pickup) return null;
  const actual = parseTimeToMinutes(actualTime);
  if (actual === null) return null;
  const recommended = parseTimeToMinutes(pickup.time) + pickup.dayOffset * 1440;
  const diffMinutes = actual - recommended;
  return {
    diffMinutes,
    isLate: diffMinutes > 15,
    isEarly: diffMinutes < -60,
    onTime: diffMinutes <= 15 && diffMinutes >= -60,
  };
}
