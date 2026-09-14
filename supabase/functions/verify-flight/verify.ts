export type FlightStatus = "verified" | "not_found" | "wrong_airport" | "unavailable";

export type FlightResult = {
  status: FlightStatus;
  arrivalTime?: string;
  arrivalAirport?: string;
  terminal?: string;
};

/** Onbellek ve kota sayaci. Postgres gerceklemesi store.ts icinde; testlerde sahte. */
export type LookupStore = {
  get(key: string): Promise<FlightResult | null>;
  put(key: string, result: FlightResult): Promise<void>;
  consumeQuota(): Promise<boolean>;
};

const TARGET_IATA = "AYT";
const TIMEOUT_MS = 3000;
const UNAVAILABLE: FlightResult = { status: "unavailable" };

export const normalizeFlightNumber = (value: string) =>
  String(value ?? "").replace(/[\s-]/g, "").toUpperCase();

const isIsoDate = (value: string) => /^\d{4}-\d{2}-\d{2}$/.test(String(value ?? ""));

/** AeroDataBox yerel saati "YYYY-MM-DD HH:MM+03:00" biciminde verir.
 *  Saat dilimi cevirmiyoruz - zaten varis havalimaninin yerel saati. */
const localHourMinute = (value: unknown) => {
  const match = /\d{4}-\d{2}-\d{2}[T ](\d{2}:\d{2})/.exec(String(value ?? ""));
  return match ? match[1] : undefined;
};

const arrivalIata = (leg: any) => {
  const iata = leg?.arrival?.airport?.iata;
  return typeof iata === "string" && /^[A-Za-z]{3}$/.test(iata) ? iata.toUpperCase() : undefined;
};

export function resolveFlightStatus(payload: unknown): FlightResult {
  // Ust duzey govde dizi degilse API'nin bicimi degismistir: bu bir entegrasyon
  // arizasi, bir ucus hakkinda bilgi degil. unavailable kalir ve onbellege
  // girmez - yoksa bicim duzeldiginde bile eski "cevapsizlik" okunur.
  if (!Array.isArray(payload)) return UNAVAILABLE;
  if (payload.length === 0) return { status: "not_found" };

  // Dizi geldiyse API cevap vermis ve kota harcanmistir. Bacaklardan hicbirinde
  // okunabilir bir varis havalimani yoksa elimizde gercek bir cevap var:
  // bu ucusun Antalya'ya indigini dogrulayamadik. Bunu unavailable yapmak iki
  // seyi bozardi - panelde "bulunamadi" rozeti cikmaz, ve onbellege girmedigi
  // icin ayni ucus her soruldugunda kotadan yeni bir hak yerdi. Kucuk ve
  // charter'la beslenen havalimanlarinda en olasi durum tam olarak budur.
  const recognised = payload.filter(leg => arrivalIata(leg));
  if (recognised.length === 0) return { status: "not_found" };

  const target = recognised.find(leg => arrivalIata(leg) === TARGET_IATA);
  if (!target) return { status: "wrong_airport", arrivalAirport: arrivalIata(recognised[0]) };

  const arrivalTime = localHourMinute((target as any)?.arrival?.scheduledTime?.local);
  const terminal = (target as any)?.arrival?.terminal;
  return {
    status: "verified",
    ...(arrivalTime ? { arrivalTime } : {}),
    ...(typeof terminal === "string" && terminal ? { terminal } : {}),
  };
}

export async function verifyFlight({
  flightNumber,
  date,
  apiKey,
  store,
  fetchImpl = fetch,
}: {
  flightNumber: string;
  date: string;
  apiKey: string;
  store: LookupStore;
  fetchImpl?: typeof fetch;
}): Promise<FlightResult> {
  const normalized = normalizeFlightNumber(flightNumber);
  if (!apiKey || !normalized || !isIsoDate(date)) return UNAVAILABLE;

  const key = `${normalized}:${date}`;
  try {
    const cached = await store.get(key);
    if (cached) return cached;

    // Sayac cagridan ONCE artar. Istek sonra basarisiz olursa bir hak bosa gider;
    // tersi (sonra artirmak) es zamanli isteklerin kotayi asmasina izin verirdi.
    // Sayacimiz gercek cagri sayisinin altina DUSMEMELI; ustunde kalmasi zararsizdir.
    if (!(await store.consumeQuota())) return UNAVAILABLE;

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
    let result: FlightResult;
    try {
      const response = await fetchImpl(
        `https://aerodatabox.p.rapidapi.com/flights/number/${encodeURIComponent(normalized)}/${date}`,
        {
          headers: { "X-RapidAPI-Key": apiKey, "X-RapidAPI-Host": "aerodatabox.p.rapidapi.com" },
          signal: controller.signal,
        },
      );
      // Tanimadigi ucus icin API 204 No Content ve BOS govde donuyor (olculdu,
      // bkz. fixtures/README.md) - ne 404 ne de bos dizi. Bos govdede .json()
      // istisna atar; onu yakalamayip disariya birakmak bunu unavailable yapardi
      // ve iki sey bozulurdu: panelde "bulunamadi" rozeti hic cikmaz, ve
      // unavailable onbellege girmedigi icin yanlis yazilmis her ucus numarasi
      // her sorulusunda kotadan yeni bir hak yerdi.
      if (response.status === 204 || response.status === 404) {
        result = { status: "not_found" };
      } else if (!response.ok) {
        result = UNAVAILABLE;
      } else {
        const body = (await response.text()).trim();
        if (!body) result = { status: "not_found" };
        else {
          try {
            result = resolveFlightStatus(JSON.parse(body));
          } catch {
            result = UNAVAILABLE;   // bozuk JSON: bilgi yoklugu, bulunamadi degil
          }
        }
      }
    } finally {
      clearTimeout(timer);
    }

    // Gecici bir aksakligi kalici hale getirmemek icin yalnizca kesin sonuclar saklanir.
    // Onbellege yazma basarisiz olursa bile, kota harcanip elde edilmis bu sonuc
    // musteriye dondurulmeli - onbellege yazamamak cevabi cope atmayi gerektirmez.
    if (result.status !== "unavailable") {
      try {
        await store.put(key, result);
      } catch { /* onbellege yazamamak cevabi cope atmayi gerektirmez */ }
    }
    return result;
  } catch {
    return UNAVAILABLE;
  }
}
