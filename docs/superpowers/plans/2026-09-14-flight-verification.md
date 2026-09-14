# Geliş Uçuşu Doğrulama — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rezervasyon formundaki geliş uçuş numarasını AeroDataBox ile doğrulayıp, müşteri dokunmamışsa varış saatini otomatik doldurmak — hiçbir koşulda formu engellemeden.

**Architecture:** API anahtarı tarayıcıya konulamaz, bu yüzden yeni bir Supabase Edge Function (`verify-flight`) proxy görevi görür. Fonksiyonun iş mantığı Deno'ya bağımlı olmayan saf bir modüle (`verify.ts`) ayrılır; böylece projenin mevcut vitest kurulumuyla test edilebilir, `index.ts` yalnızca HTTP/env kabuğu olur. İstemci tarafında ince bir yardımcı (`flight-verification.ts`) her hatayı `unavailable`'a çevirir, böylece `BookingForm` için tek bir başarısızlık dalı kalır.

**Tech Stack:** Deno (Supabase Edge Functions), TypeScript, React + react-hook-form + Zod, vitest + @testing-library/react, Supabase Postgres migrations.

**Spec:** `docs/superpowers/specs/2026-09-14-flight-verification-design.md`

---

## Dosya Yapısı

| Dosya | Sorumluluk |
|---|---|
| `supabase/functions/verify-flight/verify.ts` (yeni) | Saf iş mantığı: uçuş no normalize, AeroDataBox çağrısı, dizi→status eşlemesi, önbellek. Deno API'si kullanmaz. |
| `supabase/functions/verify-flight/verify.test.ts` (yeni) | Yukarıdakinin testleri; `fetch` enjekte edilir. |
| `supabase/functions/verify-flight/index.ts` (yeni) | HTTP kabuğu: CORS, gövde ayrıştırma, `Deno.env` okuma. Mantık içermez. |
| `supabase/migrations/<ts>_add_flight_verification.sql` (yeni) | `bookings`'e iki nullable kolon. |
| `public-app/app/lib/flight-verification.ts` (yeni) | İstemci yardımcısı + saf `shouldApplyFlightArrival` kuralı. |
| `public-app/app/lib/flight-verification.test.ts` (yeni) | Yardımcı ve kuralın testleri. |
| `public-app/app/lib/booking.ts` (değişir) | Payload'a iki alan. |
| `public-app/app/components/BookingForm.tsx` (değişir) | Blur tetikleyici, ipucu satırı, otomatik doldurma. |
| `public-app/app/components/BookingForm.test.tsx` (değişir) | Form davranış testleri. |
| `supabase/functions/create-booking/index.ts` (değişir) | İki alanı kabul listesine ve insert'e ekler. |
| `admin/react/pages/BookingDetailPage.tsx` (değişir) | Rozet. |
| `admin/react/types.ts` (değişir) | `Booking` tipine iki alan. |

**Neden `verify.ts` ayrı:** `index.ts` içinde `Deno.env` ve `serve` var; bunlar vitest altında çalışmaz. Mantık saf modülde durursa testler mevcut `npm test` ile çalışır, ayrı bir Deno test koşucusu kurmaya gerek kalmaz.

---

### Task 0: Dal aç

- [ ] **Step 1: Çalışma dalını oluştur**

```bash
git checkout -b feat/flight-verification
git status --short   # boş olmalı
```

---

### Task 1: Gerçek API cevabını yakala (fixture)

Kod yazmadan önce AeroDataBox'ın gerçekte ne döndüğünü görmek gerekiyor. Alan adları
tahminle yazılırsa tüm eşleme yanlış olur.

**Files:**
- Create: `supabase/functions/verify-flight/fixtures/README.md`
- Create: `supabase/functions/verify-flight/fixtures/ayt-arrival.json`
- Create: `supabase/functions/verify-flight/fixtures/not-ayt.json`

- [ ] **Step 1: Yakın tarihli, Antalya'ya inen bir uçuşu sorgula**

`.env` içindeki anahtarı kullan, **anahtarı asla çıktıya veya commit'e yazma**:

```bash
set -a; . ./.env; set +a
DATE=$(date -v+2d +%F)   # iki gün sonrası
curl -s --max-time 10 \
  -H "X-RapidAPI-Key: $RAPIDAPI_API_KEY" \
  -H "X-RapidAPI-Host: aerodatabox.p.rapidapi.com" \
  "https://aerodatabox.p.rapidapi.com/flights/number/TK2412/$DATE" \
  | python3 -m json.tool > supabase/functions/verify-flight/fixtures/ayt-arrival.json
head -60 supabase/functions/verify-flight/fixtures/ayt-arrival.json
```

Beklenen: `arrival.airport.iata` alanında `AYT` olan en az bir kayıt içeren bir dizi.

> Uçuş numarası o tarihte uçmuyorsa boş dizi/404 döner. O zaman başka bir AYT uçuşu
> dene (ör. `TK2410`, `PC2148`). Antalya'ya inen güncel bir tarife bulana kadar devam et.

- [ ] **Step 2: Antalya'ya inmeyen bir uçuş için ikinci fixture al**

```bash
curl -s --max-time 10 \
  -H "X-RapidAPI-Key: $RAPIDAPI_API_KEY" \
  -H "X-RapidAPI-Host: aerodatabox.p.rapidapi.com" \
  "https://aerodatabox.p.rapidapi.com/flights/number/TK1/$DATE" \
  | python3 -m json.tool > supabase/functions/verify-flight/fixtures/not-ayt.json
```

- [ ] **Step 3: Gerçek alan yollarını not et**

`fixtures/README.md` dosyasına yaz — sonraki adımların tamamı bu yollara dayanacak:

```markdown
# AeroDataBox cevap yapısı

Bu fixture'lar gerçek API cevaplarıdır. Anahtar içermezler.

Cevap bir **dizi**; her eleman bir bacak. Kullandığımız alanlar:

- `arrival.airport.iata` — varış havalimanı IATA kodu
- `arrival.scheduledTime.local` — planlanan iniş, yerel saat ("YYYY-MM-DD HH:MM+03:00")
- `arrival.terminal` — terminal (opsiyonel)
- `number` — uçuş numarası

<!-- Gerçek cevap yukarıdakinden farklıysa BURAYI düzelt ve verify.ts'i ona göre yaz. -->
```

- [ ] **Step 4: Fixture'larda anahtar sızıntısı olmadığını doğrula ve commit et**

```bash
grep -ri "rapidapi-key\|$RAPIDAPI_API_KEY" supabase/functions/verify-flight/fixtures/ && echo "SIZINTI VAR - DURDUR" || echo "temiz"
git add supabase/functions/verify-flight/fixtures/
git commit -m "Record what AeroDataBox actually returns for an Antalya arrival"
```

---

### Task 2: Saf doğrulama mantığı

**Files:**
- Create: `supabase/functions/verify-flight/verify.ts`
- Test: `supabase/functions/verify-flight/verify.test.ts`

- [ ] **Step 1: Başarısız testleri yaz**

`verify.test.ts`:

```ts
import { describe, expect, test, vi } from "vitest";
import { normalizeFlightNumber, resolveFlightStatus, verifyFlight } from "./verify";
import aytArrival from "./fixtures/ayt-arrival.json";
import notAyt from "./fixtures/not-ayt.json";

const ok = (body: unknown) => ({ ok: true, status: 200, json: async () => body });

describe("normalizeFlightNumber", () => {
  test("strips spaces and dashes and upper-cases", () => {
    expect(normalizeFlightNumber(" tk 24-12 ")).toBe("TK2412");
  });
});

describe("resolveFlightStatus", () => {
  test("an AYT leg verifies and reports its local landing time", () => {
    expect(resolveFlightStatus(aytArrival)).toMatchObject({ status: "verified" });
    expect(resolveFlightStatus(aytArrival).arrivalTime).toMatch(/^\d{2}:\d{2}$/);
  });

  test("a flight landing elsewhere names the airport it actually lands at", () => {
    const result = resolveFlightStatus(notAyt);
    expect(result.status).toBe("wrong_airport");
    expect(result.arrivalAirport).toMatch(/^[A-Z]{3}$/);
    expect(result.arrivalAirport).not.toBe("AYT");
  });

  test("any leg landing at AYT verifies the whole query", () => {
    const legs = [...(notAyt as unknown[]), ...(aytArrival as unknown[])];
    expect(resolveFlightStatus(legs).status).toBe("verified");
  });

  test("an empty list is not found", () => {
    expect(resolveFlightStatus([]).status).toBe("not_found");
  });

  test("a shape we do not recognise is unavailable, never a crash", () => {
    expect(resolveFlightStatus([{ nonsense: true }]).status).toBe("unavailable");
  });
});

describe("verifyFlight", () => {
  const base = { flightNumber: "TK2412", date: "2026-09-20", apiKey: "k" };

  test("404 from upstream means not found", async () => {
    const fetchImpl = vi.fn().mockResolvedValue({ ok: false, status: 404, json: async () => ({}) });
    expect((await verifyFlight({ ...base, fetchImpl })).status).toBe("not_found");
  });

  test("a server error is unavailable, not an exception", async () => {
    const fetchImpl = vi.fn().mockResolvedValue({ ok: false, status: 500, json: async () => ({}) });
    expect((await verifyFlight({ ...base, fetchImpl })).status).toBe("unavailable");
  });

  test("a quota rejection is unavailable", async () => {
    const fetchImpl = vi.fn().mockResolvedValue({ ok: false, status: 429, json: async () => ({}) });
    expect((await verifyFlight({ ...base, fetchImpl })).status).toBe("unavailable");
  });

  test("a rejected fetch is unavailable", async () => {
    const fetchImpl = vi.fn().mockRejectedValue(new Error("network down"));
    expect((await verifyFlight({ ...base, fetchImpl })).status).toBe("unavailable");
  });

  test("a missing api key never reaches the network", async () => {
    const fetchImpl = vi.fn();
    expect((await verifyFlight({ ...base, apiKey: "", fetchImpl })).status).toBe("unavailable");
    expect(fetchImpl).not.toHaveBeenCalled();
  });

  test("the same flight and date is fetched once", async () => {
    const fetchImpl = vi.fn().mockResolvedValue(ok(aytArrival));
    const cache = new Map();
    await verifyFlight({ ...base, fetchImpl, cache });
    await verifyFlight({ ...base, fetchImpl, cache });
    expect(fetchImpl).toHaveBeenCalledTimes(1);
  });

  test("a different date is fetched again", async () => {
    const fetchImpl = vi.fn().mockResolvedValue(ok(aytArrival));
    const cache = new Map();
    await verifyFlight({ ...base, fetchImpl, cache });
    await verifyFlight({ ...base, date: "2026-09-21", fetchImpl, cache });
    expect(fetchImpl).toHaveBeenCalledTimes(2);
  });

  test("an unavailable result is not cached", async () => {
    const fetchImpl = vi.fn()
      .mockResolvedValueOnce({ ok: false, status: 500, json: async () => ({}) })
      .mockResolvedValueOnce(ok(aytArrival));
    const cache = new Map();
    expect((await verifyFlight({ ...base, fetchImpl, cache })).status).toBe("unavailable");
    expect((await verifyFlight({ ...base, fetchImpl, cache })).status).toBe("verified");
  });

  test("a malformed date is rejected before the network", async () => {
    const fetchImpl = vi.fn();
    expect((await verifyFlight({ ...base, date: "20/09/2026", fetchImpl })).status).toBe("unavailable");
    expect(fetchImpl).not.toHaveBeenCalled();
  });
});
```

- [ ] **Step 2: Testleri çalıştır, başarısız olduklarını gör**

```bash
npx vitest run supabase/functions/verify-flight/verify.test.ts
```

Beklenen: FAIL — `Failed to resolve import "./verify"`.

- [ ] **Step 3: `verify.ts`'i yaz**

Aşağıdaki alan yolları **Task 1'de kaydettiğin gerçek cevaba göre** düzeltilmeli.

```ts
export type FlightStatus = "verified" | "not_found" | "wrong_airport" | "unavailable";

export type FlightResult = {
  status: FlightStatus;
  arrivalTime?: string;
  arrivalAirport?: string;
  terminal?: string;
};

const TARGET_IATA = "AYT";
const CACHE_TTL_MS = 6 * 60 * 60 * 1000;
const TIMEOUT_MS = 3000;

export const normalizeFlightNumber = (value: string) =>
  String(value ?? "").replace(/[\s-]/g, "").toUpperCase();

const isIsoDate = (value: string) => /^\d{4}-\d{2}-\d{2}$/.test(String(value ?? ""));

/** AeroDataBox yerel saati "YYYY-MM-DD HH:MM+03:00" biçiminde verir.
 *  Saat dilimini çevirmiyoruz — zaten varış havalimanının yerel saati. */
const localHourMinute = (value: unknown) => {
  const match = /\d{4}-\d{2}-\d{2}[T ](\d{2}:\d{2})/.exec(String(value ?? ""));
  return match ? match[1] : undefined;
};

const arrivalIata = (leg: any) => {
  const iata = leg?.arrival?.airport?.iata;
  return typeof iata === "string" && /^[A-Za-z]{3}$/.test(iata) ? iata.toUpperCase() : undefined;
};

export function resolveFlightStatus(payload: unknown): FlightResult {
  if (!Array.isArray(payload)) return { status: "unavailable" };
  if (payload.length === 0) return { status: "not_found" };

  const recognised = payload.filter(leg => arrivalIata(leg));
  if (recognised.length === 0) return { status: "unavailable" };

  const target = recognised.find(leg => arrivalIata(leg) === TARGET_IATA);
  if (!target) {
    return { status: "wrong_airport", arrivalAirport: arrivalIata(recognised[0]) };
  }

  const arrivalTime = localHourMinute((target as any)?.arrival?.scheduledTime?.local);
  const terminal = (target as any)?.arrival?.terminal;
  return {
    status: "verified",
    ...(arrivalTime ? { arrivalTime } : {}),
    ...(typeof terminal === "string" && terminal ? { terminal } : {}),
  };
}

type CacheEntry = { result: FlightResult; expiresAt: number };

export async function verifyFlight({
  flightNumber,
  date,
  apiKey,
  fetchImpl = fetch,
  cache,
  now = () => Date.now(),
}: {
  flightNumber: string;
  date: string;
  apiKey: string;
  fetchImpl?: typeof fetch;
  cache?: Map<string, CacheEntry>;
  now?: () => number;
}): Promise<FlightResult> {
  const normalized = normalizeFlightNumber(flightNumber);
  if (!apiKey || !normalized || !isIsoDate(date)) return { status: "unavailable" };

  const key = `${normalized}:${date}`;
  const cached = cache?.get(key);
  if (cached && cached.expiresAt > now()) return cached.result;

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const response = await fetchImpl(
      `https://aerodatabox.p.rapidapi.com/flights/number/${encodeURIComponent(normalized)}/${date}`,
      {
        headers: {
          "X-RapidAPI-Key": apiKey,
          "X-RapidAPI-Host": "aerodatabox.p.rapidapi.com",
        },
        signal: controller.signal,
      },
    );

    let result: FlightResult;
    if (response.status === 404) result = { status: "not_found" };
    else if (!response.ok) result = { status: "unavailable" };
    else result = resolveFlightStatus(await response.json());

    // Geçici bir aksaklığı altı saat boyunca tekrar etmemek için
    // yalnızca kesin sonuçlar önbelleğe girer.
    if (cache && result.status !== "unavailable") {
      cache.set(key, { result, expiresAt: now() + CACHE_TTL_MS });
    }
    return result;
  } catch {
    return { status: "unavailable" };
  } finally {
    clearTimeout(timer);
  }
}
```

- [ ] **Step 4: Testleri çalıştır, geçtiklerini gör**

```bash
npx vitest run supabase/functions/verify-flight/verify.test.ts
```

Beklenen: PASS (tüm testler).

Bir test fixture yüzünden düşerse önce `fixtures/README.md`'deki alan yollarını
gerçek cevapla karşılaştır — testi değil, `verify.ts`'i düzelt.

- [ ] **Step 5: Commit**

```bash
git add supabase/functions/verify-flight/verify.ts supabase/functions/verify-flight/verify.test.ts
git commit -m "Decide a flight's status from what the schedule API returns"
```

---

### Task 3: Edge Function kabuğu

**Files:**
- Create: `supabase/functions/verify-flight/index.ts`

- [ ] **Step 1: Kabuğu yaz**

`create-booking/index.ts`'deki `corsHeaders` / `jsonResponse` kalıbını birebir izler.
Mantık içermez — mantık `verify.ts`'te ve test edilmiş durumda.

```ts
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

const cache = new Map()

Deno.serve(async (request) => {
  if (request.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })

  // Bu fonksiyon asla hata durumu dönmez. Çağıran için tek bir başarısızlık
  // biçimi var: unavailable. Rezervasyon akışı bunun üstüne dal kurmaz.
  try {
    const payload = await request.json()
    const result = await verifyFlight({
      flightNumber: String(payload?.flightNumber ?? ''),
      date: String(payload?.date ?? ''),
      apiKey: Deno.env.get('RAPIDAPI_API_KEY') ?? '',
      cache,
    })
    return jsonResponse(result)
  } catch {
    return jsonResponse({ status: 'unavailable' })
  }
})
```

- [ ] **Step 2: Yerelde çalıştır ve dört durumu elle gör**

```bash
supabase functions serve verify-flight --env-file .env --no-verify-jwt
```

Başka bir terminalde (`<AYT-UCUSU>` ve `<TARIH>` Task 1'de bulduğun değerler):

```bash
curl -s localhost:54321/functions/v1/verify-flight -H 'content-type: application/json' \
  -d '{"flightNumber":"<AYT-UCUSU>","date":"<TARIH>"}'      # {"status":"verified","arrivalTime":"..."}
curl -s localhost:54321/functions/v1/verify-flight -H 'content-type: application/json' \
  -d '{"flightNumber":"TK1","date":"<TARIH>"}'               # {"status":"wrong_airport",...}
curl -s localhost:54321/functions/v1/verify-flight -H 'content-type: application/json' \
  -d '{"flightNumber":"ZZ9999","date":"<TARIH>"}'            # {"status":"not_found"}
curl -s localhost:54321/functions/v1/verify-flight -H 'content-type: application/json' \
  -d 'bozuk-gövde'                                            # {"status":"unavailable"}
```

Dördü de HTTP 200 dönmeli. Herhangi biri 4xx/5xx dönüyorsa kabuk yanlış.

- [ ] **Step 3: Commit**

```bash
git add supabase/functions/verify-flight/index.ts
git commit -m "Expose the flight check through a proxy that holds the key"
```

---

### Task 4: Migration

**Files:**
- Create: `supabase/migrations/<YYYYMMDDHHMMSS>_add_flight_verification.sql`

- [ ] **Step 1: Migration'ı yaz**

Dosya adını mevcut kalıba uydur (son migration: `20260914120000_add_leg_revenue_and_meet_fee_override.sql`):

```bash
TS=$(date +%Y%m%d%H%M%S)
cat > "supabase/migrations/${TS}_add_flight_verification.sql" <<'SQL'
-- Geliş uçuşunun tarife veritabanında doğrulanıp doğrulanmadığı.
-- İkisi de nullable: eski kayıtlar ve anahtarın tanımlı olmadığı her akış null kalır.
-- null ve 'unavailable' bir bulgu değil, bilgi yokluğudur — panelde rozet göstermez.
alter table public.bookings
  add column if not exists flight_verification_status text,
  add column if not exists flight_scheduled_arrival text;

alter table public.bookings
  drop constraint if exists bookings_flight_verification_status_check;

alter table public.bookings
  add constraint bookings_flight_verification_status_check
  check (flight_verification_status is null
         or flight_verification_status in ('verified', 'not_found', 'wrong_airport', 'unavailable'));
SQL
echo "supabase/migrations/${TS}_add_flight_verification.sql"
```

- [ ] **Step 2: Yerel veritabanına uygula**

```bash
supabase db reset
```

Beklenen: hatasız tamamlanır.

- [ ] **Step 3: Commit**

```bash
git add supabase/migrations/
git commit -m "Give a booking somewhere to record what the schedule said"
```

---

### Task 5: İstemci yardımcısı ve otomatik doldurma kuralı

**Files:**
- Create: `public-app/app/lib/flight-verification.ts`
- Test: `public-app/app/lib/flight-verification.test.ts`

- [ ] **Step 1: Başarısız testleri yaz**

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
    const elsewhere = { status: "wrong_airport", arrivalAirport: "IST" } as const;
    expect(shouldApplyFlightArrival(elsewhere, { current: "", touched: false })).toBeNull();
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

- [ ] **Step 2: Testleri çalıştır, başarısız olduklarını gör**

```bash
npx vitest run public-app/app/lib/flight-verification.test.ts
```

Beklenen: FAIL — modül yok.

- [ ] **Step 3: Yardımcıyı yaz**

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

/** Doğrulamanın başarısızlığı rezervasyonun başarısızlığı değildir: bu fonksiyon
 *  hiçbir koşulda reddetmez, her aksaklık "unavailable" olarak döner. */
export async function verifyFlightNumber(
  flightNumber: string,
  date: string,
  deps?: { invoke?: Invoke },
): Promise<FlightResult> {
  if (!flightNumber?.trim() || !date?.trim()) return UNAVAILABLE;

  try {
    const invoke = deps?.invoke ?? (await import("../../../src/lib/supabase.js")).supabase?.functions?.invoke;
    if (!invoke) return UNAVAILABLE;

    const { data, error } = await invoke("verify-flight", { body: { flightNumber, date } });
    if (error || !data) return UNAVAILABLE;

    const result = data as FlightResult;
    if (!KNOWN.includes(result.status)) return UNAVAILABLE;
    return result;
  } catch {
    return UNAVAILABLE;
  }
}

/** Varış saati yalnızca boşken ve müşteri alana hiç dokunmamışken doldurulur.
 *  Döndürdüğü değer null ise alana dokunulmaz. */
export function shouldApplyFlightArrival(
  result: Pick<FlightResult, "status" | "arrivalTime">,
  field: { current: string; touched: boolean },
): string | null {
  if (result.status !== "verified" || !result.arrivalTime) return null;
  if (field.touched || field.current) return null;
  return result.arrivalTime;
}
```

> `supabase.functions.invoke`'un `this` bağlamına ihtiyacı varsa (Step 4 testi
> gösterir) çağrıyı `(name, options) => supabase.functions.invoke(name, options)`
> sarmalayıcısıyla ver.

- [ ] **Step 4: Testleri çalıştır, geçtiklerini gör**

```bash
npx vitest run public-app/app/lib/flight-verification.test.ts
```

Beklenen: PASS.

- [ ] **Step 5: Commit**

```bash
git add public-app/app/lib/flight-verification.ts public-app/app/lib/flight-verification.test.ts
git commit -m "Turn every way the flight check can fail into one quiet answer"
```

---

### Task 6: Payload iki alanı taşısın

**Files:**
- Modify: `public-app/app/lib/booking.ts` (`buildPublicBookingPayload`, ~satır 196-230)
- Test: `public-app/app/lib/booking.test.ts`

- [ ] **Step 1: Başarısız testi yaz**

`booking.test.ts` sonuna ekle:

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

- [ ] **Step 2: Testi çalıştır, başarısız olduğunu gör**

```bash
npx vitest run public-app/app/lib/booking.test.ts -t "flight verification on the payload"
```

Beklenen: FAIL — `undefined`, `null` değil.

- [ ] **Step 3: Şemaya ve payload'a alanları ekle**

`createPublicBookingSchema` içindeki `z.object({...})`'e (`flightNumber` satırının yanına):

```ts
    flightVerificationStatus: z.string().default(""),
    flightScheduledArrival: z.string().default(""),
```

`buildPublicBookingPayload` içinde `flight_arrival_time` satırının hemen altına:

```ts
    flight_verification_status: values.flightVerificationStatus || null,
    flight_scheduled_arrival: values.flightScheduledArrival || null,
```

- [ ] **Step 4: Tüm booking testlerini çalıştır**

```bash
npx vitest run public-app/app/lib/booking.test.ts
```

Beklenen: PASS (yeni ikisi dahil, eskiler bozulmamış).

- [ ] **Step 5: Commit**

```bash
git add public-app/app/lib/booking.ts public-app/app/lib/booking.test.ts
git commit -m "Send the verification along with the booking it describes"
```

---

### Task 7: `create-booking` iki alanı kabul etsin

**Files:**
- Modify: `supabase/functions/create-booking/index.ts` (insert nesnesi, ~satır 307)

- [ ] **Step 1: Insert'e alanları ekle**

`flight_number: normalizeWhitespace(payload.flight_number).toUpperCase() || null,`
satırının altına:

```ts
      // Yalnızca operatöre bilgi. İstemciden geliyor, bu yüzden hiçbir iş kararı
      // buna dayanmaz — beyaz listeden geçen tanınmış bir değer değilse null.
      flight_verification_status: ['verified', 'not_found', 'wrong_airport', 'unavailable']
        .includes(String(payload.flight_verification_status))
        ? String(payload.flight_verification_status)
        : null,
      flight_scheduled_arrival: /^\d{2}:\d{2}$/.test(String(payload.flight_scheduled_arrival ?? ''))
        ? String(payload.flight_scheduled_arrival)
        : null,
```

Bu alanlar `requiredFields` listesine **eklenmez** — yokluğu rezervasyonu reddetmemeli.

- [ ] **Step 2: Uçtan uca dene**

`supabase functions serve create-booking --env-file .env --no-verify-jwt` ile ayağa kaldır,
geçerli bir gövde gönder ve kaydı kontrol et:

```bash
psql "$SUPABASE_DB_URL" -c "select booking_ref, flight_number, flight_verification_status, flight_scheduled_arrival from bookings order by created_at desc limit 1;"
```

Beklenen: gönderdiğin durum kaydedilmiş; uydurma bir durum gönderirsen `null` olmuş.

- [ ] **Step 3: Commit**

```bash
git add supabase/functions/create-booking/index.ts
git commit -m "Store the verification without trusting it for anything"
```

---

### Task 8: Formu bağla

**Files:**
- Modify: `public-app/app/components/BookingForm.tsx`
- Test: `public-app/app/components/BookingForm.test.tsx`

- [ ] **Step 1: Başarısız testleri yaz**

`BookingForm.test.tsx` sonuna:

```ts
vi.mock("../lib/flight-verification", async (importOriginal) => ({
  ...(await importOriginal<typeof import("../lib/flight-verification")>()),
  verifyFlightNumber: vi.fn(),
}));

describe("BookingForm flight verification", () => {
  const { verifyFlightNumber } = await import("../lib/flight-verification");

  const renderForm = () =>
    render(
      <LanguageProvider initialLanguage="tr">
        <BookingForm scrollOnSelect={false} />
      </LanguageProvider>,
    );

  const enterFlight = (container: HTMLElement, value: string) => {
    const date = container.querySelector<HTMLInputElement>("#travel-date, [name='travelDate']")!;
    fireEvent.change(date, { target: { value: futureDate } });
    const field = container.querySelector<HTMLInputElement>("#flight-number")!;
    fireEvent.change(field, { target: { value } });
    fireEvent.blur(field);
    return field;
  };

  test("a confirmed flight fills the arrival time the guest left empty", async () => {
    vi.mocked(verifyFlightNumber).mockResolvedValue({ status: "verified", arrivalTime: "14:35" });
    const { container } = renderForm();
    enterFlight(container, "TK2412");
    await waitFor(() =>
      expect(container.querySelector<HTMLInputElement>("#flight-arrival-time")!.value).toBe("14:35"),
    );
  });

  test("the filled-in time stays editable", async () => {
    vi.mocked(verifyFlightNumber).mockResolvedValue({ status: "verified", arrivalTime: "14:35" });
    const { container } = renderForm();
    enterFlight(container, "TK2412");
    const time = container.querySelector<HTMLInputElement>("#flight-arrival-time")!;
    await waitFor(() => expect(time.value).toBe("14:35"));
    expect(time).not.toBeDisabled();
    expect(time).not.toHaveAttribute("readonly");
    fireEvent.change(time, { target: { value: "16:00" } });
    expect(time.value).toBe("16:00");
  });

  test("a time the guest typed is never overwritten", async () => {
    vi.mocked(verifyFlightNumber).mockResolvedValue({ status: "verified", arrivalTime: "14:35" });
    const { container } = renderForm();
    fireEvent.change(container.querySelector("#flight-arrival-time")!, { target: { value: "09:15" } });
    enterFlight(container, "TK2412");
    await waitFor(() => expect(verifyFlightNumber).toHaveBeenCalled());
    expect(container.querySelector<HTMLInputElement>("#flight-arrival-time")!.value).toBe("09:15");
  });

  test("a flight landing elsewhere says so", async () => {
    vi.mocked(verifyFlightNumber).mockResolvedValue({ status: "wrong_airport", arrivalAirport: "IST" });
    const { container } = renderForm();
    enterFlight(container, "TK1");
    await waitFor(() => expect(container.querySelector(".flight-hint")).toHaveTextContent("IST"));
  });

  test("a flight the schedule does not know stays silent", async () => {
    for (const status of ["not_found", "unavailable"] as const) {
      vi.mocked(verifyFlightNumber).mockResolvedValue({ status });
      const { container } = renderForm();
      enterFlight(container, "ZZ9999");
      await waitFor(() => expect(verifyFlightNumber).toHaveBeenCalled());
      expect(container.querySelector(".flight-hint")).toBeNull();
      expect(container.querySelector<HTMLInputElement>("#flight-arrival-time")!.value).toBe("");
      cleanup();
    }
  });

  test("a late answer for a flight number the guest has moved on from is ignored", async () => {
    let resolveFirst: (value: any) => void = () => {};
    vi.mocked(verifyFlightNumber)
      .mockImplementationOnce(() => new Promise(resolve => { resolveFirst = resolve; }))
      .mockResolvedValueOnce({ status: "not_found" });
    const { container } = renderForm();
    enterFlight(container, "TK2412");
    enterFlight(container, "PC2148");
    resolveFirst({ status: "verified", arrivalTime: "14:35" });
    await waitFor(() => expect(verifyFlightNumber).toHaveBeenCalledTimes(2));
    expect(container.querySelector<HTMLInputElement>("#flight-arrival-time")!.value).toBe("");
  });
});
```

> `waitFor` ve `vi` mevcut import satırında yoksa ekle.
> Tarih alanının gerçek seçicisi farklıysa `BookingForm.tsx`'e bakıp düzelt —
> testi değil seçiciyi düzelt.

- [ ] **Step 2: Testleri çalıştır, başarısız olduklarını gör**

```bash
npx vitest run public-app/app/components/BookingForm.test.tsx -t "flight verification"
```

Beklenen: FAIL.

- [ ] **Step 3: Formu bağla**

`BookingForm.tsx` içine:

```tsx
import { shouldApplyFlightArrival, verifyFlightNumber, type FlightResult } from "../lib/flight-verification";
```

Bileşen gövdesinde:

```tsx
const [flightCheck, setFlightCheck] = useState<FlightResult | null>(null);
const flightRequestRef = useRef(0);

/** Uçuş numarası alanından çıkınca arka planda sorar. Form beklemez,
 *  gönderim engellenmez — cevap gelirse gelir. */
const runFlightCheck = async () => {
  const flightNumber = getValues("flightNumber")?.trim();
  const date = getValues("travelDate");
  setFlightCheck(null);
  if (!flightNumber || !date) return;

  const requestId = ++flightRequestRef.current;
  const result = await verifyFlightNumber(flightNumber, date);
  // Müşteri bu arada uçuş numarasını değiştirdiyse geç gelen cevabı yok say.
  if (requestId !== flightRequestRef.current) return;

  setFlightCheck(result);
  const arrival = shouldApplyFlightArrival(result, {
    current: getValues("arrivalTime") ?? "",
    touched: Boolean(formState.dirtyFields.arrivalTime),
  });
  if (arrival) setValue("arrivalTime", arrival);
  setValue("flightVerificationStatus", result.status);
  setValue("flightScheduledArrival", result.arrivalTime ?? "");
};
```

`useForm` çağrısından `getValues`, `setValue`, `formState`'i aldığından emin ol.

Uçuş numarası input'una (satır ~524 ve ~617'deki iki tanesi) `onBlur` ekle.
`register` kendi `onBlur`'unu döndürdüğü için ikisini birlikte çağır:

```tsx
{...(() => { const f = register("flightNumber"); return { ...f, onBlur: (e) => { f.onBlur(e); void runFlightCheck(); } }; })()}
```

İpucu satırını `FieldErrorMessage` bileşeninin hemen altına koy:

```tsx
{flightCheck?.status === "verified" && flightCheck.arrivalTime && (
  <span className="flight-hint flight-hint-ok" role="status">
    ✓ {t("flightConfirmed", "Antalya'ya {time} varıyor").replace("{time}", flightCheck.arrivalTime)}
  </span>
)}
{flightCheck?.status === "wrong_airport" && (
  <span className="flight-hint flight-hint-warn" role="status">
    ⚠ {t("flightWrongAirport", "Bu uçuş {airport} havalimanına iniyor").replace("{airport}", flightCheck.arrivalAirport ?? "")}
  </span>
)}
```

`not_found` ve `unavailable` için **hiçbir dal yok** — sessizlik kasıtlı.

`.flight-hint` için stil ekle (mevcut `.field-error-message` kuralının yanına;
uyarı için amber, onay için yeşil).

- [ ] **Step 4: Testleri çalıştır, geçtiklerini gör**

```bash
npx vitest run public-app/app/components/BookingForm.test.tsx
```

Beklenen: PASS (yeni testler + eski 6 test bozulmamış).

- [ ] **Step 5: Commit**

```bash
git add public-app/app/components/BookingForm.tsx public-app/app/components/BookingForm.test.tsx public-app/app
git commit -m "Let a confirmed flight fill in the arrival time nobody typed"
```

---

### Task 9: Admin rozeti

**Files:**
- Modify: `admin/react/types.ts` (`Booking`)
- Modify: `admin/react/pages/BookingDetailPage.tsx` (transfer bölümü, ~satır 524)

- [ ] **Step 1: Tipe alanları ekle**

`types.ts` içindeki `Booking` tipine:

```ts
  flight_verification_status?: 'verified' | 'not_found' | 'wrong_airport' | 'unavailable' | null
  flight_scheduled_arrival?: string | null
```

- [ ] **Step 2: Rozeti ekle**

`BookingDetailPage.tsx` içinde, uçuş numarasının gösterildiği satırın yanına:

```tsx
{booking.flight_verification_status === 'verified' && <span className="flight-badge ok">✓ doğrulandı</span>}
{booking.flight_verification_status === 'not_found' && <span className="flight-badge warn">bulunamadı</span>}
{booking.flight_verification_status === 'wrong_airport' && <span className="flight-badge warn">farklı havalimanı</span>}
```

`unavailable` ve `null` için dal yok: anahtar tanımlanmadan önceki bütün kayıtlar bu
durumda olacağı için rozet göstermek paneli sahte uyarıyla doldururdu.

- [ ] **Step 3: Stil ekle ve gözle doğrula**

`admin/admin.css` içine `.flight-badge` kuralı (küçük, yuvarlak köşeli etiket).

```bash
npm run dev:admin
```

Doğrulanmış bir rezervasyonu aç, rozeti gör; eski bir rezervasyonda rozet **olmadığını** gör.

- [ ] **Step 4: Commit**

```bash
git add admin/react/types.ts admin/react/pages/BookingDetailPage.tsx admin/admin.css
git commit -m "Show the operator which flights the schedule actually confirmed"
```

---

### Task 10: Tam doğrulama ve dağıtım

- [ ] **Step 1: Tüm testler ve tip kontrolü**

```bash
npm run typecheck && npm test
```

Beklenen: ikisi de temiz.

- [ ] **Step 2: Anahtarın istemci paketine sızmadığını doğrula**

```bash
npm run build:public && grep -rl "$RAPIDAPI_API_KEY" build dist 2>/dev/null && echo "SIZINTI VAR - DURDUR" || echo "temiz"
```

Beklenen: `temiz`. (Değişkenin `VITE_` öneki yok, sızmaması gerekir.)

- [ ] **Step 3: Anahtar tanımsızken mevcut davranışın bozulmadığını doğrula**

Üretimde secret tanımlanmadan önce özellik sessizce devre dışı kalmalı.

```bash
supabase functions serve verify-flight --no-verify-jwt   # --env-file YOK
curl -s localhost:54321/functions/v1/verify-flight -H 'content-type: application/json' \
  -d '{"flightNumber":"TK2412","date":"2026-09-20"}'
```

Beklenen: `{"status":"unavailable"}`, HTTP 200. Formda hiçbir değişiklik olmamalı.

- [ ] **Step 4: Dağıt**

```bash
supabase secrets set RAPIDAPI_API_KEY="$RAPIDAPI_API_KEY"
supabase functions deploy verify-flight
supabase functions deploy create-booking
supabase db push
```

- [ ] **Step 5: Canlıda tek bir gerçek rezervasyonla dene**

Formdan gerçek bir AYT uçuş numarası gir, onay satırının çıktığını ve saatin
dolduğunu gör; sonra saat alanının üzerine yazılabildiğini doğrula.

- [ ] **Step 6: Dalı birleştir**

@superpowers:finishing-a-development-branch
