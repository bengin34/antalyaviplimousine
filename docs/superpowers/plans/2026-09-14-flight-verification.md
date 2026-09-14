# Geliş Uçuşu Doğrulama — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rezervasyon formundaki geliş uçuş numarasını AeroDataBox ile doğrulayıp, müşteri dokunmamışsa varış saatini otomatik doldurmak — hiçbir koşulda formu engellemeden ve ayda 400 çağrılık ücretsiz kotayı asla aşmadan.

**Architecture:** API anahtarı tarayıcıya konulamaz, bu yüzden yeni bir Supabase Edge Function (`verify-flight`) proxy görevi görür. İş mantığı Deno'ya bağımlı olmayan saf bir modüle (`verify.ts`) ayrılır; önbellek ve kota sayacı enjekte edilen bir `LookupStore` arkasında durur, böylece mantık mevcut vitest kurulumuyla test edilir ve `index.ts` yalnızca HTTP/env kabuğu olur. İstemcideki ince yardımcı (`flight-verification.ts`) her hatayı `unavailable`'a çevirir, böylece `BookingForm` için tek bir başarısızlık dalı kalır.

**Tech Stack:** Deno (Supabase Edge Functions), TypeScript, React + react-hook-form + Zod, vitest + @testing-library/react, Supabase Postgres.

**Spec:** `docs/superpowers/specs/2026-09-14-flight-verification-design.md`

---

## Kota bütçesi — bu planın şeklini belirleyen kısıt

Ücretsiz plan **ayda 400 çağrı**. Bu, planın her yerinde dört mekanizma olarak görünür:

1. **İstemci tekrar sormaz.** Aynı `uçuş no + tarih` çifti için ikinci bir istek çıkmaz; blur birden çok kez tetiklense de ağa tek çağrı gider.
2. **Önbellek kalıcı.** Bellekteki `Map` Edge Function örneği soğuyunca sıfırlanır ve aynı uçuş yeniden sorulur. Bunun yerine `flight_lookups` tablosu. Aynı uçaktan çıkan ikinci, üçüncü transfer bedavaya gelir.
3. **Sert tavan 380.** Aylık sayaç 380'e ulaştığında fonksiyon yukarı akışa **hiç çıkmaz**, doğrudan `unavailable` döner. Kotayı aşmak teknik olarak imkânsız. Kalan 20, elle test payı.
4. **Panelde görünür.** Admin özet sayfasında "bu ay 137/380" kartı. Kota bittiğinde özellik sessizce kapandığı için, göstergesi olmazsa operatör neden çalışmadığını anlayamaz.

Kota dolduğunda ayrı bir "manuel mod" yoktur ve gerekmez: `unavailable` zaten müşteriye hiçbir şey göstermeyen, saat alanını sıradan elle doldurulan bir input olarak bırakan durumdur. Özellik kapanınca form bugünkü davranışına döner.

---

## Dosya Yapisi

| Dosya | Sorumluluk |
|---|---|
| `supabase/functions/verify-flight/verify.ts` (yeni) | Saf is mantigi: normalize, kota kontrolu, AeroDataBox cagrisi, dizi -> status eslemesi. Deno API kullanmaz; depolama enjekte edilir. |
| `supabase/functions/verify-flight/verify.test.ts` (yeni) | Yukaridakinin testleri; `fetch` ve `LookupStore` sahte. |
| `supabase/functions/verify-flight/store.ts` (yeni) | `LookupStore` icin Postgres gerceklemesi. |
| `supabase/functions/verify-flight/index.ts` (yeni) | HTTP kabugu: CORS, govde ayristirma, `Deno.env`. Mantik icermez. |
| `supabase/migrations/<ts>_add_flight_verification.sql` (yeni) | `bookings` tablosuna iki kolon; `flight_lookups` ve `flight_api_usage` tablolari; `consume_flight_quota()`. |
| `public-app/app/lib/flight-verification.ts` (yeni) | Istemci yardimcisi + saf `shouldApplyFlightArrival` kurali. |
| `public-app/app/lib/flight-verification.test.ts` (yeni) | Yardimci ve kuralin testleri. |
| `public-app/app/lib/booking.ts` (degisir) | Sema + payload'a iki alan. |
| `public-app/app/components/BookingForm.tsx` (degisir) | Blur tetikleyici, tekrar-sorma engeli, ipucu satiri, otomatik doldurma. |
| `public-app/app/components/BookingForm.test.tsx` (degisir) | Form davranis testleri. |
| `public-app/app/react-public.css` (degisir) | `.flight-hint` stilleri. |
| `supabase/functions/create-booking/index.ts` (degisir) | Iki alani insert'e ekler. |
| `admin/react/types.ts`, `admin/react/pages/BookingDetailPage.tsx`, `admin/admin.css` (degisir) | Rozet ve kota karti stilleri. |
| `admin/react/components/FlightQuotaCard.tsx` (yeni) | Aylik kota gostergesi. |

**Neden `verify.ts` ayri:** `index.ts` icinde `Deno.env` ve `Deno.serve` var; bunlar vitest altinda calismaz. Mantik saf modulde durursa testler mevcut `npm test` ile calisir.

**Not:** `tsconfig.json` icindeki `include` yalnizca `admin/react`, `public-app` ve config dosyalarini kapsiyor - `supabase/` disarida. Yani `npm run typecheck` `verify.ts`/`store.ts`/`index.ts` dosyalarini **kontrol etmez**. Temiz bir typecheck bu dosyalarin dogrulandigi anlamina gelmez.

---

### Task 0: Dal ac

- [ ] **Step 1: Calisma dalini olustur**

```bash
git checkout -b feat/flight-verification
git status --short   # bos olmali
```

---

### Task 1: Gercek API cevabini yakala (fixture)

Kod yazmadan once AeroDataBox'in gerceklte ne dondugunu gormek gerekiyor. Alan adlari
tahminle yazilirsa tum esleme yanlis olur.

**Files:**
- Create: `supabase/functions/verify-flight/fixtures/README.md`
- Create: `supabase/functions/verify-flight/fixtures/ayt-arrival.json`
- Create: `supabase/functions/verify-flight/fixtures/not-ayt.json`

- [ ] **Step 1: Antalya'ya inen bir ucusu sorgula**

Anahtari `.env` dosyasindan al, **asla ciktiya veya commit'e yazma**:

```bash
set -a; . ./.env; set +a
[ -n "$RAPIDAPI_API_KEY" ] || { echo "RAPIDAPI_API_KEY yok - DURDUR"; exit 1; }
mkdir -p supabase/functions/verify-flight/fixtures
DATE=$(date -v+2d +%F)
curl -s --max-time 10 \
  -H "X-RapidAPI-Key: $RAPIDAPI_API_KEY" \
  -H "X-RapidAPI-Host: aerodatabox.p.rapidapi.com" \
  "https://aerodatabox.p.rapidapi.com/flights/number/TK2412/$DATE" \
  | python3 -m json.tool > supabase/functions/verify-flight/fixtures/ayt-arrival.json
head -60 supabase/functions/verify-flight/fixtures/ayt-arrival.json
```

Beklenen: `arrival.airport.iata` alaninda `AYT` olan en az bir kayit iceren bir **dizi**.

> Bos dizi veya 404 geldiyse o ucus o tarihte ucmuyor. Baska bir AYT ucusu dene
> (`TK2410`, `PC2148`, `SU6293`). **Her deneme kotadan bir cagri yer** - fixture'lari
> bir kez alip diskte tut.

- [ ] **Step 2: Antalya'ya inmeyen bir ucus icin ikinci fixture al**

```bash
curl -s --max-time 10 \
  -H "X-RapidAPI-Key: $RAPIDAPI_API_KEY" \
  -H "X-RapidAPI-Host: aerodatabox.p.rapidapi.com" \
  "https://aerodatabox.p.rapidapi.com/flights/number/TK1/$DATE" \
  | python3 -m json.tool > supabase/functions/verify-flight/fixtures/not-ayt.json
python3 -c "import json;d=json.load(open('supabase/functions/verify-flight/fixtures/not-ayt.json'));print('BOS - baska ucus dene' if not d else 'tamam')"
```

> Bu dosya da bos dizi olmamali. Bossa Task 3'teki `wrong_airport` testi `not_found`
> alir ve duser. AYT'ye **inmeyen** ama o tarihte ucan bir numara lazim
> (`TK1`, `LH1`, `BA1`).

- [ ] **Step 3: Gercek alan yollarini not et**

`fixtures/README.md` icerigi:

```markdown
# AeroDataBox cevap yapisi

Bu fixture'lar gercek API cevaplaridir. Anahtar icermezler.

Cevap bir **dizi**; her eleman bir bacak. Kullandigimiz alanlar:

- `arrival.airport.iata` - varis havalimani IATA kodu
- `arrival.scheduledTime.local` - planlanan inis, yerel saat ("YYYY-MM-DD HH:MM+03:00")
- `arrival.terminal` - terminal (opsiyonel)

Gercek cevap yukaridakinden farkliysa BURAYI duzelt ve verify.ts dosyasini ona gore yaz.
```

- [ ] **Step 4: Sizinti kontrolu ve commit**

```bash
set -a; . ./.env; set +a
grep -rq -- "$RAPIDAPI_API_KEY" supabase/functions/verify-flight/fixtures/ && { echo "SIZINTI VAR - DURDUR"; exit 1; } || echo "temiz"
git add supabase/functions/verify-flight/fixtures/
git commit -m "Record what AeroDataBox actually returns for an Antalya arrival"
```

---

### Task 2: Migration - kolonlar, onbellek tablosu, kota sayaci

**Files:**
- Create: `supabase/migrations/<YYYYMMDDHHMMSS>_add_flight_verification.sql`

- [ ] **Step 1: Migration'i yaz**

Dosya adini mevcut kaliba uydur (son migration: `20260914120000_add_leg_revenue_and_meet_fee_override.sql`).
Migration su parcalardan olusur:

1. `bookings` tablosuna iki nullable kolon: `flight_verification_status`, `flight_scheduled_arrival`.
   Yorum olarak: ikisi de nullable, cunku eski kayitlar ve anahtarin tanimli olmadigi
   her akis null kalir; null ve `unavailable` bir bulgu degil, bilgi yoklugudur.
2. `flight_verification_status` icin CHECK kisiti: null ya da
   `verified` / `not_found` / `wrong_airport` / `unavailable`.
   Once ayni adli kisiti kaldir (idempotent olsun diye), sonra ekle.
3. `flight_lookups` tablosu: `flight_key text primary key` ("TK2412:2026-09-20"),
   `result jsonb not null`, `created_at timestamptz not null default now()`.
   Yorum: Edge Function ornegi soguyunca bellekteki onbellek kaybolur; ayda 400
   cagrilik kotayla ayni ucusu ikinci kez sormayi goze alamayiz.
4. `flight_api_usage` tablosu: `month text primary key` ("2026-09"),
   `calls integer not null default 0`.
5. Her iki tabloda RLS acik. `flight_lookups` icin politika **yok** (yalnizca
   service_role erisir, o da RLS'i atlar). `flight_api_usage` icin tek politika:
   `for select to authenticated using (true)` - admin paneli okur, yazamaz.
   Sayaci yalnizca asagidaki fonksiyon artirir.
6. `consume_flight_quota(p_month text, p_cap integer) returns boolean`,
   `language plpgsql`, `security definer`, `set search_path = public`.
   Govde: `flight_api_usage` tablosuna `(p_month, 1)` ekle; `on conflict (month)`
   durumunda `calls = flight_api_usage.calls + 1` yap **ama yalnizca**
   `where flight_api_usage.calls < p_cap` kosuluyla; `returning calls into v_calls`.
   Sonra `return v_calls is not null`.
   Bu sayede tavana ulasilmissa false doner ve sayac hic artmaz - es zamanli
   istekler kotayi birlikte asamaz.

- [ ] **Step 2: Uygula**

```bash
supabase db reset
```

Beklenen: hatasiz.

- [ ] **Step 3: Tavanin gercekten tuttugunu dogrula**

`psql "$SUPABASE_DB_URL"` icinde sirayla:

```
select public.consume_flight_quota('test-month', 2);   -- t
select public.consume_flight_quota('test-month', 2);   -- t
select public.consume_flight_quota('test-month', 2);   -- f  <-- tavan
select calls from flight_api_usage where month = 'test-month';   -- 2 olmali, 3 degil
```

Ucuncu cagri `f` donmeli ve sayac 2'de kalmali. `3` gorursen `where` kosulu yanlis.
Sonra test satirini temizle.

- [ ] **Step 4: Commit**

```bash
git add supabase/migrations/
git commit -m "Give the flight check a cache and a ceiling it cannot cross"
```

---

### Task 3: Saf dogrulama mantigi

**Files:**
- Create: `supabase/functions/verify-flight/verify.ts`
- Test: `supabase/functions/verify-flight/verify.test.ts`

- [ ] **Step 1: Basarisiz testleri yaz**

```ts
import { beforeEach, describe, expect, test, vi } from "vitest";
import { normalizeFlightNumber, resolveFlightStatus, verifyFlight, type FlightResult } from "./verify";
import aytArrival from "./fixtures/ayt-arrival.json";
import notAyt from "./fixtures/not-ayt.json";

const ok = (body: unknown) => ({ ok: true, status: 200, text: async () => JSON.stringify(body) });

/** Bellekte duran sahte depo; cagri sayilari testlerde dogrudan okunur. */
const fakeStore = (cap = 380) => {
  const cache = new Map<string, FlightResult>();
  let calls = 0;
  return {
    get: vi.fn(async (key: string) => cache.get(key) ?? null),
    put: vi.fn(async (key: string, result: FlightResult) => { cache.set(key, result); }),
    consumeQuota: vi.fn(async () => (calls < cap ? (calls++, true) : false)),
    get used() { return calls; },
  };
};

describe("normalizeFlightNumber", () => {
  test("strips spaces and dashes and upper-cases", () => {
    expect(normalizeFlightNumber(" tk 24-12 ")).toBe("TK2412");
  });
});

describe("resolveFlightStatus", () => {
  test("an AYT leg verifies and reports its local landing time", () => {
    const result = resolveFlightStatus(aytArrival);
    expect(result.status).toBe("verified");
    expect(result.arrivalTime).toMatch(/^\d{2}:\d{2}$/);
  });

  test("a flight landing elsewhere names the airport it actually lands at", () => {
    const result = resolveFlightStatus(notAyt);
    expect(result.status).toBe("wrong_airport");
    expect(result.arrivalAirport).toMatch(/^[A-Z]{3}$/);
    expect(result.arrivalAirport).not.toBe("AYT");
  });

  test("any leg landing at AYT verifies the whole query", () => {
    expect(resolveFlightStatus([...(notAyt as unknown[]), ...(aytArrival as unknown[])]).status).toBe("verified");
  });

  test("an empty list is not found", () => {
    expect(resolveFlightStatus([]).status).toBe("not_found");
  });

  test("a shape we do not recognise is unavailable, never a crash", () => {
    expect(resolveFlightStatus([{ nonsense: true }]).status).toBe("unavailable");
    expect(resolveFlightStatus({ not: "an array" }).status).toBe("unavailable");
  });
});

describe("verifyFlight", () => {
  let store: ReturnType<typeof fakeStore>;
  const base = () => ({ flightNumber: "TK2412", date: "2026-09-20", apiKey: "k", store });

  beforeEach(() => { store = fakeStore(); });

  // Gercek API tanimadigi ucus icin 204 + bos govde donuyor - olculdu, uydurma degil.
  // Bu yol yanlislikla unavailable olursa panelde "bulunamadi" rozeti hic cikmaz
  // ve yanlis yazilmis her ucus numarasi kotadan tekrar tekrar hak yer.
  test("the real not-found shape, 204 with an empty body, is not found", async () => {
    const fetchImpl = vi.fn().mockResolvedValue({
      ok: true, status: 204,
      text: async () => "",
      json: async () => { throw new SyntaxError("Unexpected end of JSON input"); },
    });
    expect((await verifyFlight({ ...base(), fetchImpl })).status).toBe("not_found");
  });

  test("a 200 with an empty body is also not found", async () => {
    const fetchImpl = vi.fn().mockResolvedValue({ ok: true, status: 200, text: async () => "  " });
    expect((await verifyFlight({ ...base(), fetchImpl })).status).toBe("not_found");
  });

  test("a not-found answer is cached so a typo cannot drain the quota", async () => {
    const fetchImpl = vi.fn().mockResolvedValue({ ok: true, status: 204, text: async () => "" });
    await verifyFlight({ ...base(), fetchImpl });
    await verifyFlight({ ...base(), fetchImpl });
    expect(fetchImpl).toHaveBeenCalledTimes(1);
    expect(store.used).toBe(1);
  });

  // 404 olculmedi ama savunma amacli tutuluyor: RapidAPI ag gecidi, yukari akistan
  // bagimsiz olarak bozuk bir yol icin 404 donebilir.
  test("404 from upstream means not found", async () => {
    const fetchImpl = vi.fn().mockResolvedValue({ ok: false, status: 404, text: async () => "" });
    expect((await verifyFlight({ ...base(), fetchImpl })).status).toBe("not_found");
  });

  test("a body that is not JSON at all is unavailable, not not_found", async () => {
    const fetchImpl = vi.fn().mockResolvedValue({ ok: true, status: 200, text: async () => "<html>502</html>" });
    expect((await verifyFlight({ ...base(), fetchImpl })).status).toBe("unavailable");
  });

  test("a server error is unavailable, not an exception", async () => {
    const fetchImpl = vi.fn().mockResolvedValue({ ok: false, status: 500, text: async () => "" });
    expect((await verifyFlight({ ...base(), fetchImpl })).status).toBe("unavailable");
  });

  test("a rejected fetch is unavailable", async () => {
    const fetchImpl = vi.fn().mockRejectedValue(new Error("network down"));
    expect((await verifyFlight({ ...base(), fetchImpl })).status).toBe("unavailable");
  });

  test("a missing api key never reaches the network or the quota", async () => {
    const fetchImpl = vi.fn();
    expect((await verifyFlight({ ...base(), apiKey: "", fetchImpl })).status).toBe("unavailable");
    expect(fetchImpl).not.toHaveBeenCalled();
    expect(store.consumeQuota).not.toHaveBeenCalled();
  });

  test("a malformed date is rejected before the network", async () => {
    const fetchImpl = vi.fn();
    expect((await verifyFlight({ ...base(), date: "20/09/2026", fetchImpl })).status).toBe("unavailable");
    expect(fetchImpl).not.toHaveBeenCalled();
  });

  test("a cached answer costs no quota and no request", async () => {
    const fetchImpl = vi.fn().mockResolvedValue(ok(aytArrival));
    await verifyFlight({ ...base(), fetchImpl });
    await verifyFlight({ ...base(), fetchImpl });
    expect(fetchImpl).toHaveBeenCalledTimes(1);
    expect(store.used).toBe(1);
  });

  test("a different date is fetched again", async () => {
    const fetchImpl = vi.fn().mockResolvedValue(ok(aytArrival));
    await verifyFlight({ ...base(), fetchImpl });
    await verifyFlight({ ...base(), date: "2026-09-21", fetchImpl });
    expect(fetchImpl).toHaveBeenCalledTimes(2);
  });

  test("an unavailable result is not cached", async () => {
    const fetchImpl = vi.fn()
      .mockResolvedValueOnce({ ok: false, status: 500, text: async () => "" })
      .mockResolvedValueOnce(ok(aytArrival));
    expect((await verifyFlight({ ...base(), fetchImpl })).status).toBe("unavailable");
    expect((await verifyFlight({ ...base(), fetchImpl })).status).toBe("verified");
  });

  test("an exhausted quota never reaches the network", async () => {
    store = fakeStore(0);
    const fetchImpl = vi.fn();
    expect((await verifyFlight({ ...base(), fetchImpl })).status).toBe("unavailable");
    expect(fetchImpl).not.toHaveBeenCalled();
  });

  test("the cache still answers after the quota is gone", async () => {
    store = fakeStore(1);
    const fetchImpl = vi.fn().mockResolvedValue(ok(aytArrival));
    expect((await verifyFlight({ ...base(), fetchImpl })).status).toBe("verified");
    expect((await verifyFlight({ ...base(), fetchImpl })).status).toBe("verified");
    expect(fetchImpl).toHaveBeenCalledTimes(1);
  });

  test("a broken store degrades to unavailable instead of throwing", async () => {
    const broken = {
      get: vi.fn().mockRejectedValue(new Error("db down")),
      put: vi.fn(),
      consumeQuota: vi.fn(),
    };
    const fetchImpl = vi.fn();
    await expect(verifyFlight({ ...base(), store: broken, fetchImpl })).resolves.toEqual({ status: "unavailable" });
  });
});
```

- [ ] **Step 2: Testleri calistir, basarisiz olduklarini gor**

```bash
npx vitest run supabase/functions/verify-flight/verify.test.ts
```

Beklenen: FAIL - `Failed to resolve import "./verify"`.

> JSON import cozumlenmezse fixture'lari `fs.readFileSync` + `JSON.parse` ile oku.

- [ ] **Step 3: `verify.ts` dosyasini yaz**

Alan yollari **Task 1'de kaydettigin gercek cevaba gore** duzeltilmeli.

```ts
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
  if (!Array.isArray(payload)) return UNAVAILABLE;
  if (payload.length === 0) return { status: "not_found" };

  const recognised = payload.filter(leg => arrivalIata(leg));
  if (recognised.length === 0) return UNAVAILABLE;

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
    // Eksik saymak guvenli, fazla saymak degil.
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
    if (result.status !== "unavailable") await store.put(key, result);
    return result;
  } catch {
    return UNAVAILABLE;
  }
}
```

- [ ] **Step 4: Testleri calistir, gectiklerini gor**

```bash
npx vitest run supabase/functions/verify-flight/verify.test.ts
```

Beklenen: PASS. Bir test fixture yuzunden duserse `fixtures/README.md` icindeki alan
yollarini gercek cevapla karsilastir - testi degil, `verify.ts` dosyasini duzelt.

- [ ] **Step 5: Commit**

```bash
git add supabase/functions/verify-flight/verify.ts supabase/functions/verify-flight/verify.test.ts
git commit -m "Decide a flight's status without ever outspending the quota"
```

---

### Task 4: Depo gerceklemesi ve Edge Function kabugu

**Files:**
- Create: `supabase/functions/verify-flight/store.ts`
- Create: `supabase/functions/verify-flight/index.ts`

- [ ] **Step 1: Postgres deposunu yaz**

```ts
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import type { FlightResult, LookupStore } from './verify.ts'

const MONTHLY_CAP = 380   // ucretsiz plan 400; 20'lik pay elle test icin

export function createLookupStore(): LookupStore {
  const client = createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
  )

  return {
    async get(key) {
      const { data } = await client
        .from('flight_lookups')
        .select('result')
        .eq('flight_key', key)
        .maybeSingle()
      return (data?.result as FlightResult) ?? null
    },

    async put(key, result) {
      await client.from('flight_lookups').upsert({ flight_key: key, result })
    },

    async consumeQuota() {
      const month = new Date().toISOString().slice(0, 7)   // 'YYYY-MM'
      const { data, error } = await client.rpc('consume_flight_quota', {
        p_month: month,
        p_cap: MONTHLY_CAP,
      })
      // Sayaci okuyamiyorsak harcamayiz. Kotayi korumak, ozelligi calistirmaktan onceliklidir.
      if (error) return false
      return data === true
    },
  }
}
```

- [ ] **Step 2: Kabugu yaz**

`create-booking/index.ts` icindeki `corsHeaders` / `jsonResponse` kalibini birebir izler.

```ts
import { createLookupStore } from './store.ts'
import { verifyFlight } from './verify.ts'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const jsonResponse = (body: Record<string, unknown>, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  })

const store = createLookupStore()

Deno.serve(async (request) => {
  if (request.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })

  // Bu fonksiyon asla hata durumu donmez. Cagiran icin tek bir basarisizlik
  // bicimi var: unavailable. Rezervasyon akisi bunun ustune dal kurmaz.
  try {
    const payload = await request.json()
    return jsonResponse(await verifyFlight({
      flightNumber: String(payload?.flightNumber ?? ''),
      date: String(payload?.date ?? ''),
      apiKey: Deno.env.get('RAPIDAPI_API_KEY') ?? '',
      store,
    }))
  } catch {
    return jsonResponse({ status: 'unavailable' })
  }
})
```

- [ ] **Step 3: Yerelde dort durumu elle gor**

```bash
supabase functions serve verify-flight --env-file .env --no-verify-jwt
```

Baska bir terminalde, `<AYT-UCUSU>` ve `<TARIH>` Task 1'deki degerler olmak uzere
dort istek gonder: AYT ucusu, `TK1`, `ZZ9999`, ve bozuk bir govde.
Sirasiyla `verified` / `wrong_airport` / `not_found` / `unavailable` donmeli,
**dordu de HTTP 200**. Herhangi biri 4xx/5xx donuyorsa kabuk yanlis.

- [ ] **Step 4: Onbellegin kotayi gercekten korudugunu dogrula**

`flight_api_usage` tablosundaki `calls` degerini oku, ayni AYT ucusunu tekrar sorgula,
sonra tekrar oku. **Deger degismemeli.** Sayac ikinci cagrida artiyorsa onbellek
okunmuyor demektir - kota bir ayda biter. `flight_lookups` tablosunda da kaydi gor.

- [ ] **Step 5: Commit**

```bash
git add supabase/functions/verify-flight/store.ts supabase/functions/verify-flight/index.ts
git commit -m "Expose the flight check through a proxy that holds the key"
```

---

### Task 5: Istemci yardimcisi ve otomatik doldurma kurali

**Files:**
- Create: `public-app/app/lib/flight-verification.ts`
- Test: `public-app/app/lib/flight-verification.test.ts`

- [ ] **Step 1: Basarisiz testleri yaz**

```ts
import { describe, expect, test, vi } from "vitest";
import { shouldApplyFlightArrival, verifyFlightNumber } from "./flight-verification";

describe("shouldApplyFlightArrival", () => {
  const verified = { status: "verified", arrivalTime: "14:35" } as const;

  test("fills an empty untouched field", () => {
    expect(shouldApplyFlightArrival(verified, { current: "", touched: false })).toBe("14:35");
  });

  test("never overwrites what the guest typed", () => {
    expect(shouldApplyFlightArrival(verified, { current: "12:00", touched: true })).toBeNull();
  });

  test("leaves a field the guest cleared alone", () => {
    expect(shouldApplyFlightArrival(verified, { current: "", touched: true })).toBeNull();
  });

  test("does not fill from a flight landing somewhere else", () => {
    expect(shouldApplyFlightArrival({ status: "wrong_airport" }, { current: "", touched: false })).toBeNull();
  });

  test("does not fill when the check told us nothing", () => {
    for (const status of ["not_found", "unavailable"] as const) {
      expect(shouldApplyFlightArrival({ status }, { current: "", touched: false })).toBeNull();
    }
  });

  test("does not fill when the API gave no time", () => {
    expect(shouldApplyFlightArrival({ status: "verified" }, { current: "", touched: false })).toBeNull();
  });
});

describe("verifyFlightNumber", () => {
  test("passes the flight and date through and returns the result", async () => {
    const invoke = vi.fn().mockResolvedValue({ data: { status: "verified", arrivalTime: "14:35" }, error: null });
    const result = await verifyFlightNumber("tk 2412", "2026-09-20", { invoke });
    expect(invoke).toHaveBeenCalledWith("verify-flight", { body: { flightNumber: "tk 2412", date: "2026-09-20" } });
    expect(result).toEqual({ status: "verified", arrivalTime: "14:35" });
  });

  test("a transport error is unavailable, never a rejection", async () => {
    const invoke = vi.fn().mockResolvedValue({ data: null, error: new Error("boom") });
    await expect(verifyFlightNumber("TK2412", "2026-09-20", { invoke })).resolves.toEqual({ status: "unavailable" });
  });

  test("a thrown invoke is unavailable", async () => {
    const invoke = vi.fn().mockRejectedValue(new Error("offline"));
    await expect(verifyFlightNumber("TK2412", "2026-09-20", { invoke })).resolves.toEqual({ status: "unavailable" });
  });

  test("an unrecognised status is unavailable", async () => {
    const invoke = vi.fn().mockResolvedValue({ data: { status: "weird" }, error: null });
    await expect(verifyFlightNumber("TK2412", "2026-09-20", { invoke })).resolves.toEqual({ status: "unavailable" });
  });

  test("a missing flight number or date never calls out", async () => {
    const invoke = vi.fn();
    await expect(verifyFlightNumber("", "2026-09-20", { invoke })).resolves.toEqual({ status: "unavailable" });
    await expect(verifyFlightNumber("TK2412", "", { invoke })).resolves.toEqual({ status: "unavailable" });
    expect(invoke).not.toHaveBeenCalled();
  });
});
```

- [ ] **Step 2: Testleri calistir, basarisiz olduklarini gor**

```bash
npx vitest run public-app/app/lib/flight-verification.test.ts
```

Beklenen: FAIL - modul yok.

- [ ] **Step 3: Yardimciyi yaz**

```ts
export type FlightStatus = "verified" | "not_found" | "wrong_airport" | "unavailable";

export type FlightResult = {
  status: FlightStatus;
  arrivalTime?: string;
  arrivalAirport?: string;
  terminal?: string;
};

const UNAVAILABLE: FlightResult = { status: "unavailable" };
const KNOWN: FlightStatus[] = ["verified", "not_found", "wrong_airport", "unavailable"];

type Invoke = (name: string, options: { body: unknown }) => Promise<{ data: unknown; error: unknown }>;

/** Dogrulamanin basarisizligi rezervasyonun basarisizligi degildir: bu fonksiyon
 *  hicbir kosulda reddetmez, her aksaklik "unavailable" olarak doner. */
export async function verifyFlightNumber(
  flightNumber: string,
  date: string,
  deps?: { invoke?: Invoke },
): Promise<FlightResult> {
  if (!flightNumber?.trim() || !date?.trim()) return UNAVAILABLE;

  try {
    // invoke, this baglamina ihtiyac duyar (client.url / client.headers okur);
    // metodu nesnesinden koparip gecmek onu sessizce bozar. Bu yuzden sarmalayici.
    const invoke = deps?.invoke ?? await (async () => {
      const { supabase } = await import("../../../src/lib/supabase.js");
      if (!supabase) return null;
      return ((name, options) => supabase.functions.invoke(name, options)) as Invoke;
    })();
    if (!invoke) return UNAVAILABLE;

    const { data, error } = await invoke("verify-flight", { body: { flightNumber, date } });
    if (error || !data) return UNAVAILABLE;

    const result = data as FlightResult;
    return KNOWN.includes(result.status) ? result : UNAVAILABLE;
  } catch {
    return UNAVAILABLE;
  }
}

/** Varis saati yalnizca boşken ve musteri alana hic dokunmamisken doldurulur.
 *  null donerse alana dokunulmaz. */
export function shouldApplyFlightArrival(
  result: Pick<FlightResult, "status" | "arrivalTime">,
  field: { current: string; touched: boolean },
): string | null {
  if (result.status !== "verified" || !result.arrivalTime) return null;
  if (field.touched || field.current) return null;
  return result.arrivalTime;
}
```

- [ ] **Step 4: Testleri calistir, gectiklerini gor**

```bash
npx vitest run public-app/app/lib/flight-verification.test.ts
```

Beklenen: PASS.

> Bu testler sahte `invoke` enjekte eder, yani gercek Supabase istemcisine hic
> dokunmazlar. Sarmalayicinin dogru oldugunun tek kaniti Task 11'deki canli denemedir.

- [ ] **Step 5: Commit**

```bash
git add public-app/app/lib/flight-verification.ts public-app/app/lib/flight-verification.test.ts
git commit -m "Turn every way the flight check can fail into one quiet answer"
```

---

### Task 6: Payload iki alani tasisin

**Files:**
- Modify: `public-app/app/lib/booking.ts` (sema ~satir 32, `buildPublicBookingPayload` ~satir 208)
- Test: `public-app/app/lib/booking.test.ts`

- [ ] **Step 1: Basarisiz testi yaz**

```ts
describe("flight verification on the payload", () => {
  test("carries the verification through under the column names", () => {
    const payload = buildPublicBookingPayload(
      { ...base, flightVerificationStatus: "verified", flightScheduledArrival: "14:35" } as PublicBookingValues,
      "tr",
    );
    expect(payload.flight_verification_status).toBe("verified");
    expect(payload.flight_scheduled_arrival).toBe("14:35");
  });

  test("an unchecked flight sends null rather than a made-up status", () => {
    const payload = buildPublicBookingPayload(base, "tr");
    expect(payload.flight_verification_status).toBeNull();
    expect(payload.flight_scheduled_arrival).toBeNull();
  });
});
```

- [ ] **Step 2: Testi calistir, basarisiz oldugunu gor**

```bash
npx vitest run public-app/app/lib/booking.test.ts -t "flight verification on the payload"
```

Beklenen: FAIL - `undefined`, `null` degil.

- [ ] **Step 3: Semaya ve payload'a ekle**

`z.object({...})` icine, `flightNumber` satirinin yanina:

```ts
    flightVerificationStatus: z.string().default(""),
    flightScheduledArrival: z.string().default(""),
```

`buildPublicBookingPayload` icinde `flight_arrival_time` satirinin altina:

```ts
    flight_verification_status: values.flightVerificationStatus || null,
    flight_scheduled_arrival: values.flightScheduledArrival || null,
```

- [ ] **Step 4: Tum booking testlerini calistir**

```bash
npx vitest run public-app/app/lib/booking.test.ts
```

Beklenen: PASS, eskiler bozulmamis.

- [ ] **Step 5: Commit**

```bash
git add public-app/app/lib/booking.ts public-app/app/lib/booking.test.ts
git commit -m "Send the verification along with the booking it describes"
```

---

### Task 7: `create-booking` iki alani kabul etsin

**Files:**
- Modify: `supabase/functions/create-booking/index.ts` (`bookingPayload`, ~satir 307)

- [ ] **Step 1: Insert'e ekle**

`flight_number: normalizeWhitespace(payload.flight_number).toUpperCase() || null,` altina:

```ts
      // Yalnizca operatore bilgi. Istemciden geliyor, bu yuzden hicbir is karari
      // buna dayanmaz - taninmis bir deger degilse null.
      flight_verification_status: ['verified', 'not_found', 'wrong_airport', 'unavailable']
        .includes(String(payload.flight_verification_status))
        ? String(payload.flight_verification_status)
        : null,
      flight_scheduled_arrival: /^\d{2}:\d{2}$/.test(String(payload.flight_scheduled_arrival ?? ''))
        ? String(payload.flight_scheduled_arrival)
        : null,
```

`requiredFields` listesine **eklenmez** - yoklugu rezervasyonu reddetmemeli.

- [ ] **Step 2: Uctan uca dene**

```bash
supabase functions serve create-booking --env-file .env --no-verify-jwt
```

Gecerli bir govde gonder, sonra `bookings` tablosundaki son kaydin
`flight_verification_status` ve `flight_scheduled_arrival` degerlerini oku.
Uydurma bir durum (`"hacked"`) gonderdiginde `null` kaydedilmeli.

- [ ] **Step 3: Commit**

```bash
git add supabase/functions/create-booking/index.ts
git commit -m "Store the verification without trusting it for anything"
```

---

### Task 8: Formu bagla

**Files:**
- Modify: `public-app/app/components/BookingForm.tsx`
- Modify: `public-app/app/components/BookingForm.test.tsx`
- Modify: `public-app/app/react-public.css`

> **Dikkat - formun gercek yapisi.** Ucus alanlari `!isDailyChauffeur && step === 2`
> blogunda (satir 509); `step` varsayilani `1`. Testler once adim 2'ye gecmeli:
> `#destination` alanina bir deger ver, sonra `#main-book-step1` dugmesine tikla.
> `advanceToStep2` fonksiyonu `values.destination` bossa `setError` atip geri doner
> (satir 331-333). Dogrudan `#flight-number` sorgulamak `null` dondurur ve
> `fireEvent` coker.

- [ ] **Step 1: Basarisiz testleri yaz**

`BookingForm.test.tsx` dosyasinin **modul kapsamina** (describe icine degil):

```ts
import { verifyFlightNumber } from "../lib/flight-verification";

vi.mock("../lib/flight-verification", async (importOriginal) => ({
  ...(await importOriginal<typeof import("../lib/flight-verification")>()),
  verifyFlightNumber: vi.fn(),
}));
```

Mevcut import satirina `beforeEach`, `vi`, `waitFor` ekle. Sonra dosya sonuna:

```tsx
describe("BookingForm flight verification", () => {
  const flightFuture = `${new Date().getFullYear() + 1}-08-10`;

  // verifyFlightNumber modul duzeyinde paylasilan bir vi.fn(); dosyanin
  // afterEach(cleanup) cagrisi onu sifirlamaz. Sifirlanmazsa cagri sayilari ve
  // mockResolvedValueOnce kuyrugu testler arasinda tasar.
  beforeEach(() => { vi.mocked(verifyFlightNumber).mockReset(); });

  const goToStep2 = () => {
    const { container } = render(
      <LanguageProvider initialLanguage="tr">
        <BookingForm scrollOnSelect={false} />
      </LanguageProvider>,
    );
    fireEvent.change(container.querySelector("#destination")!, { target: { value: "side" } });
    fireEvent.click(container.querySelector("#main-book-step1")!);
    return container;
  };

  const enterFlight = async (container: HTMLElement, value: string) => {
    await waitFor(() => expect(container.querySelector("#flight-number")).not.toBeNull());
    fireEvent.change(container.querySelector("#travel-date")!, { target: { value: flightFuture } });
    const field = container.querySelector<HTMLInputElement>("#flight-number")!;
    fireEvent.change(field, { target: { value } });
    fireEvent.blur(field);
  };

  const arrivalField = (container: HTMLElement) =>
    container.querySelector<HTMLInputElement>("#flight-arrival-time")!;

  test("a confirmed flight fills the arrival time the guest left empty", async () => {
    vi.mocked(verifyFlightNumber).mockResolvedValue({ status: "verified", arrivalTime: "14:35" });
    const container = goToStep2();
    await enterFlight(container, "TK2412");
    await waitFor(() => expect(arrivalField(container).value).toBe("14:35"));
  });

  test("the filled-in time stays editable", async () => {
    vi.mocked(verifyFlightNumber).mockResolvedValue({ status: "verified", arrivalTime: "14:35" });
    const container = goToStep2();
    await enterFlight(container, "TK2412");
    await waitFor(() => expect(arrivalField(container).value).toBe("14:35"));
    expect(arrivalField(container)).not.toBeDisabled();
    expect(arrivalField(container)).not.toHaveAttribute("readonly");
    fireEvent.change(arrivalField(container), { target: { value: "16:00" } });
    expect(arrivalField(container).value).toBe("16:00");
  });

  test("a time the guest typed is never overwritten", async () => {
    vi.mocked(verifyFlightNumber).mockResolvedValue({ status: "verified", arrivalTime: "14:35" });
    const container = goToStep2();
    await waitFor(() => expect(container.querySelector("#flight-arrival-time")).not.toBeNull());
    fireEvent.change(arrivalField(container), { target: { value: "09:15" } });
    await enterFlight(container, "TK2412");
    await waitFor(() => expect(verifyFlightNumber).toHaveBeenCalled());
    expect(arrivalField(container).value).toBe("09:15");
  });

  test("a flight landing elsewhere says so", async () => {
    vi.mocked(verifyFlightNumber).mockResolvedValue({ status: "wrong_airport", arrivalAirport: "IST" });
    const container = goToStep2();
    await enterFlight(container, "TK1");
    await waitFor(() => expect(container.querySelector(".flight-hint")).toHaveTextContent("IST"));
  });

  test("a flight the schedule does not know stays silent", async () => {
    for (const status of ["not_found", "unavailable"] as const) {
      vi.mocked(verifyFlightNumber).mockReset().mockResolvedValue({ status });
      const container = goToStep2();
      await enterFlight(container, "ZZ9999");
      await waitFor(() => expect(verifyFlightNumber).toHaveBeenCalled());
      expect(container.querySelector(".flight-hint")).toBeNull();
      expect(arrivalField(container).value).toBe("");
      cleanup();
    }
  });

  test("the same flight and date is never asked about twice", async () => {
    vi.mocked(verifyFlightNumber).mockResolvedValue({ status: "verified", arrivalTime: "14:35" });
    const container = goToStep2();
    await enterFlight(container, "TK2412");
    await waitFor(() => expect(verifyFlightNumber).toHaveBeenCalledTimes(1));
    fireEvent.blur(container.querySelector("#flight-number")!);
    fireEvent.blur(container.querySelector("#flight-number")!);
    await waitFor(() => expect(verifyFlightNumber).toHaveBeenCalledTimes(1));
  });

  test("a late answer for a flight number the guest has moved on from is ignored", async () => {
    let resolveFirst: (value: any) => void = () => {};
    vi.mocked(verifyFlightNumber)
      .mockImplementationOnce(() => new Promise(resolve => { resolveFirst = resolve; }))
      .mockResolvedValueOnce({ status: "not_found" });
    const container = goToStep2();
    await enterFlight(container, "TK2412");
    await enterFlight(container, "PC2148");
    resolveFirst({ status: "verified", arrivalTime: "14:35" });
    await waitFor(() => expect(verifyFlightNumber).toHaveBeenCalledTimes(2));
    expect(arrivalField(container).value).toBe("");
  });
});
```

- [ ] **Step 2: Testleri calistir, basarisiz olduklarini gor**

```bash
npx vitest run public-app/app/components/BookingForm.test.tsx -t "flight verification"
```

Beklenen: FAIL.

- [ ] **Step 3: `useForm` destructure'ini genislet**

Satir 125-134'teki mevcut hali `formState: { errors }` - `getValues` yok,
`dirtyFields` yok. Iki ekleme yap: `getValues` alanini listeye ekle ve
`formState: { errors }` yerine `formState: { errors, dirtyFields }` yaz.

`formState` alanini butun olarak alma - JSX icinde ~40 yerde ciplak `errors.x`
kullanimi var, hepsi bozulur.

> **RHF tuzagi:** `formState` bir Proxy; abonelik **render sirasindaki okumayla**
> kurulur. `dirtyFields` alanini yalnizca async callback icinde okursan abonelik hic
> kurulmaz ve nesne kalici olarak bos kalir - "musterinin yazdiginin uzerine yazma"
> kurali sessizce calismaz. Yukaridaki gibi bilesenin tepesinde destructure etmek
> render sirasinda okuma sayilir ve bunu cozer.

- [ ] **Step 4: `defaultValues` ve `reset` cagrisina iki alani ekle**

`defaultValues` (satir ~138-144) ve gonderim sonrasi `reset({...})` (satir ~304)
cagrisina ekle; yoksa bir dogrulama durumu ayni oturumdaki sonraki rezervasyona tasinir:

```ts
flightVerificationStatus: "", flightScheduledArrival: "",
```

- [ ] **Step 5: Kontrolu bagla**

```tsx
const [flightCheck, setFlightCheck] = useState<FlightResult | null>(null);
const flightRequestRef = useRef(0);
const lastFlightQueryRef = useRef("");

/** Ucus numarasi alanindan cikinca arka planda sorar. Form beklemez,
 *  gonderim engellenmez. Ayni ucus+tarih icin ikinci kez aga cikmaz -
 *  ucretsiz kota ayda 400 cagri. */
const runFlightCheck = async () => {
  const flightNumber = getValues("flightNumber")?.trim() ?? "";
  const date = getValues("travelDate") ?? "";
  if (!flightNumber || !date) return;

  const query = `${flightNumber.toUpperCase()}:${date}`;
  if (query === lastFlightQueryRef.current) return;
  lastFlightQueryRef.current = query;

  const requestId = ++flightRequestRef.current;
  setFlightCheck(null);
  const result = await verifyFlightNumber(flightNumber, date);
  // Musteri bu arada ucus numarasini degistirdiyse gec gelen cevabi yok say.
  if (requestId !== flightRequestRef.current) return;

  setFlightCheck(result);
  const arrival = shouldApplyFlightArrival(result, {
    current: getValues("arrivalTime") ?? "",
    touched: Boolean(dirtyFields.arrivalTime),
  });
  if (arrival) setValue("arrivalTime", arrival);
  setValue("flightVerificationStatus", result.status);
  setValue("flightScheduledArrival", result.arrivalTime ?? "");
};
```

Import satirina:

```tsx
import { shouldApplyFlightArrival, verifyFlightNumber, type FlightResult } from "../lib/flight-verification";
```

`useRef` fonksiyonunu React import satirina ekle.

Ucus numarasi input'larina (satir ~524 ve ~617) `onBlur` bagla - `register` kendi
`onBlur` fonksiyonunu dondurdugu icin ikisi birlikte cagrilmali:

```tsx
{...(() => { const f = register("flightNumber"); return { ...f, onBlur: (e) => { f.onBlur(e); void runFlightCheck(); } }; })()}
```

- [ ] **Step 6: Ipucu satirini ekle**

`<FieldErrorMessage name="flightNumber" ... />` altina:

```tsx
{flightCheck?.status === "verified" && flightCheck.arrivalTime && (
  <span className="flight-hint flight-hint-ok" role="status">
    {t("flightConfirmed", "Antalya'ya {time} variyor").replace("{time}", flightCheck.arrivalTime)}
  </span>
)}
{flightCheck?.status === "wrong_airport" && (
  <span className="flight-hint flight-hint-warn" role="status">
    {t("flightWrongAirport", "Bu ucus {airport} havalimanina iniyor").replace("{airport}", flightCheck.arrivalAirport ?? "")}
  </span>
)}
```

`not_found` ve `unavailable` icin **hicbir dal yok** - sessizlik kasitli.

`public-app/app/react-public.css` dosyasina (`.field-error-message`, satir ~112, yanina):

```css
.flight-hint { display: block; margin-top: 4px; font-size: 13px; }
.flight-hint-ok { color: #157347; }
.flight-hint-warn { color: #a06000; }
```

> `src/styles.css` icinde de bir `.field-error-message` var - o eski legacy site.
> React formunun stili `react-public.css` dosyasinda.

- [ ] **Step 7: Testleri calistir, gectiklerini gor**

```bash
npx vitest run public-app/app/components/BookingForm.test.tsx
```

Beklenen: PASS - yeni testler **ve** mevcut 6 test.

- [ ] **Step 8: Commit**

```bash
git add public-app/app/components/BookingForm.tsx public-app/app/components/BookingForm.test.tsx public-app/app/react-public.css
git commit -m "Let a confirmed flight fill in the arrival time nobody typed"
```

---

### Task 9: Admin rozeti

**Files:**
- Modify: `admin/react/types.ts`
- Modify: `admin/react/pages/BookingDetailPage.tsx` (transfer bolumu, ~satir 524)
- Modify: `admin/admin.css`

- [ ] **Step 1: Tipe ekle**

`Booking` tipine:

```ts
  flight_verification_status?: 'verified' | 'not_found' | 'wrong_airport' | 'unavailable' | null
  flight_scheduled_arrival?: string | null
```

- [ ] **Step 2: Rozeti ekle**

Ucus numarasinin gosterildigi yere (`transfer.flightNumber` satiri):

```tsx
{booking.flight_verification_status === 'verified' && <span className="flight-badge ok">dogrulandi</span>}
{booking.flight_verification_status === 'not_found' && <span className="flight-badge warn">bulunamadi</span>}
{booking.flight_verification_status === 'wrong_airport' && <span className="flight-badge warn">farkli havalimani</span>}
```

`unavailable` ve `null` icin dal yok: anahtar tanimlanmadan onceki butun kayitlar bu
durumda olacagi icin rozet gostermek paneli sahte uyariyla doldururdu.

- [ ] **Step 3: Stil ve gozle dogrulama**

`admin/admin.css` dosyasina `.flight-badge` kurali (kucuk etiket; `.ok` yesil, `.warn` amber).

```bash
npm run dev:admin
```

Dogrulanmis bir rezervasyonda rozeti gor; **eski bir rezervasyonda rozet olmadigini** gor.

- [ ] **Step 4: Commit**

```bash
git add admin/react/types.ts admin/react/pages/BookingDetailPage.tsx admin/admin.css
git commit -m "Show the operator which flights the schedule actually confirmed"
```

---

### Task 10: Panelde kota gostergesi

Kota bittiginde ozellik **sessizce** kapanir - tasarim geregi musteriye hicbir sey
gosterilmez. Bu, operatorun neden artik saatlerin dolmadigini anlayamamasi demektir.
Gosterge bunun icin var.

**Files:**
- Create: `admin/react/components/FlightQuotaCard.tsx`
- Modify: panelin ozet/ana sayfasi (kartin yerlestirilecegi yer)
- Modify: `admin/admin.css`

- [ ] **Step 1: Karti yaz**

```tsx
import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

const MONTHLY_CAP = 380   // store.ts icindeki degerle ayni olmali

export function FlightQuotaCard() {
  const [calls, setCalls] = useState<number | null>(null)

  useEffect(() => {
    const month = new Date().toISOString().slice(0, 7)
    supabase
      .from('flight_api_usage')
      .select('calls')
      .eq('month', month)
      .maybeSingle()
      .then(({ data }) => setCalls(data?.calls ?? 0))
  }, [])

  if (calls === null) return null

  const ratio = calls / MONTHLY_CAP
  const tone = ratio >= 1 ? 'spent' : ratio >= 0.8 ? 'low' : 'ok'

  return (
    <div className={`flight-quota ${tone}`}>
      <div className="section-label">Ucus dogrulama kotasi</div>
      <strong>{calls} / {MONTHLY_CAP}</strong>
      <small>
        {tone === 'spent'
          ? 'Bu ayki hak doldu. Ucus saatleri ay sonuna kadar elle girilecek.'
          : tone === 'low'
            ? 'Hak azaldi. Doldugunda ucus saatleri elle girilecek.'
            : 'Bu ay kalan hak yeterli.'}
      </small>
    </div>
  )
}
```

> `MONTHLY_CAP` iki yerde duruyor (`store.ts` ve burada). Birini degistirirken
> digerini de degistir - panel yanlis bir tavana gore "doldu" derse operator
> bos yere elle girise gecer.

- [ ] **Step 2: Panele yerlestir ve stil ver**

Karti ozet sayfasina ekle. `admin/admin.css` dosyasina `.flight-quota` kurali;
`.low` amber, `.spent` kirmizi kenarlik.

- [ ] **Step 3: Uc durumu da gozle dogrula**

```bash
npm run dev:admin
```

`flight_api_usage` tablosundaki bu ayin `calls` degerini sirayla 50, 350 ve 380
yaparak uc tonu da gor (normal / amber / kirmizi), sonra test satirini temizle.

Kart hic cikmiyorsa Task 2'deki `flight_api_usage_read` RLS politikasi eksik demektir.

- [ ] **Step 4: Commit**

```bash
git add admin/react/components/FlightQuotaCard.tsx admin/admin.css admin/react
git commit -m "Tell the operator when the flight checks have run out for the month"
```

---

### Task 11: Tam dogrulama ve dagitim

- [ ] **Step 1: Tum testler ve tip kontrolu**

```bash
npm run typecheck && npm test
```

Beklenen: ikisi de temiz.

> Hatirlatma: `tsconfig.json` `supabase/` dizinini kapsamaz, yani `verify.ts`,
> `store.ts` ve `index.ts` typecheck'ten gecmez. Onlarin guvencesi `verify.test.ts`
> ve Task 4'teki elle denemedir.

- [ ] **Step 2: Anahtarin istemci paketine sizmadigini dogrula**

```bash
set -a; . ./.env; set +a
[ -n "$RAPIDAPI_API_KEY" ] || { echo "degisken bos - grep her seyi eslesir, DURDUR"; exit 1; }
npm run build:public
grep -rq -- "$RAPIDAPI_API_KEY" build dist 2>/dev/null && { echo "SIZINTI VAR - DURDUR"; exit 1; } || echo "temiz"
```

Beklenen: `temiz`. Degiskenin `VITE_` oneki yok, sizmamasi gerekir.

- [ ] **Step 3: Anahtar tanimsizken mevcut davranisin bozulmadigini dogrula**

```bash
supabase functions serve verify-flight --no-verify-jwt   # --env-file YOK
curl -s localhost:54321/functions/v1/verify-flight -H 'content-type: application/json' \
  -d '{"flightNumber":"TK2412","date":"2026-09-20"}'
```

Beklenen: `{"status":"unavailable"}`, HTTP 200. Formda hicbir degisiklik olmamali.

- [ ] **Step 4: Dagit**

> **SIRA ONEMLI - bu satirlarin sirasi yer degistirirse rezervasyon alimi tamamen durur.**
> Task 7'nin `create-booking` surumu, yalnizca migration uygulandiktan sonra var olan
> iki kolona yaziyor. Fonksiyon migration'dan once dagitilirsa **her** insert
> `column "flight_verification_status" does not exist` ile duser - sessiz bir kayip
> degil, tam kesinti. Ters sira zararsizdir: eski fonksiyon fazladan payload
> anahtarlarini isimle okudugu icin (spread degil) sessizce yok sayar.
> Yani her zaman once `db push`, sonra `functions deploy`.

```bash
set -a; . ./.env; set +a
supabase secrets set RAPIDAPI_API_KEY="$RAPIDAPI_API_KEY"

supabase db push                        # ONCE: kolonlar olusmali
supabase functions deploy verify-flight
supabase functions deploy create-booking # SONRA: kolonlara yazan surum
```

`db push` basarisiz olursa **dur** - `create-booking`'i dagitma.

- [ ] **Step 5: Canlida tek bir gercek rezervasyonla dene**

Bu, `supabase.functions.invoke` sarmalayicisinin gercekten calistiginin **tek**
kaniti - testler sahte `invoke` kullaniyor, bozuk bir sarmalayici `unavailable`
olarak sessizce yutulur.

1. Formdan gercek bir AYT ucus numarasi gir -> onay satiri cikmali, saat dolmali
2. Saatin uzerine yaz -> yazabilmeli
3. Panelde kota kartinin 1 arttigini gor

Onay satiri hic cikmiyorsa sarmalayici bozuk demektir - kota sayaci da artmamistir.

- [ ] **Step 6: Dali birlestir**

@superpowers:finishing-a-development-branch
