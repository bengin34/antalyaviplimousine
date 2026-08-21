# Per-Trip EUR/TRY Rate Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fetch EUR/TRY exchange rate per pickup_date from a free CDN API and use it in profit calculations instead of one static monthly rate.

**Architecture:** New `exchange-rates.ts` module fetches historical EUR/TRY rates from `fawazahmed0/currency-api` (jsdelivr CDN, no API key, free historical data). `profit-loss-metrics.js` gains an optional `ratesByDate` param — if a date-specific rate exists it overrides the monthly setting, otherwise falls back. `ProfitLossPage.tsx` fetches rates after bookings load and passes them through. Monthly manual rate stays as fallback and for advertising EUR conversion.

**Tech Stack:** fawazahmed0/currency-api (jsdelivr CDN), TypeScript, Vitest, React

---

## File Map

| File | Action | Purpose |
|------|--------|---------|
| `admin/react/lib/exchange-rates.ts` | Create | Fetch + in-memory-cache EUR/TRY rates by date |
| `admin/profit-loss-metrics.js` | Modify | Accept optional `ratesByDate` param; store `eurTryRate` on each resolved leg |
| `admin/profit-loss-metrics.test.js` | Modify | Tests for `ratesByDate` override behavior |
| `admin/react/pages/ProfitLossPage.tsx` | Modify | Fetch rates after bookings load; pass to metrics; show rate per trip; fetch-rate button |

---

## Task 1: Create `exchange-rates.ts` module

**Files:**
- Create: `admin/react/lib/exchange-rates.ts`

### API

```
Primary:  https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@{YYYY-MM-DD}/v1/currencies/eur.json
Fallback: https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/eur.json
Response: { "date": "2026-08-15", "eur": { "try": 38.1234, ... } }
```

- [ ] **Step 1: Write the module**

```ts
// admin/react/lib/exchange-rates.ts

const rateCache = new Map<string, number>() // date (YYYY-MM-DD) → EUR/TRY rate
const inFlight = new Map<string, Promise<number | null>>()
const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/

async function fetchRateForDate(date: string): Promise<number | null> {
  const url = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@${date}/v1/currencies/eur.json`
  try {
    const response = await fetch(url)
    if (!response.ok) throw new Error('HTTP ' + response.status)
    const data = await response.json() as { eur?: { try?: unknown } }
    const rate = data?.eur?.try
    return typeof rate === 'number' && Number.isFinite(rate) && rate > 0 ? rate : null
  } catch {
    return null
  }
}

export async function fetchRatesForDates(dates: string[]): Promise<Map<string, number>> {
  const unique = [...new Set(dates.filter(d => ISO_DATE.test(d)))]
  const missing = unique.filter(d => !rateCache.has(d))

  await Promise.all(
    missing.map(async date => {
      if (inFlight.has(date)) {
        await inFlight.get(date)
        return
      }
      const p = fetchRateForDate(date)
      inFlight.set(date, p)
      const rate = await p
      inFlight.delete(date)
      if (rate !== null) rateCache.set(date, rate)
    }),
  )

  return new Map(
    unique.filter(d => rateCache.has(d)).map(d => [d, rateCache.get(d)!]),
  )
}

// Fetches today's or latest available EUR/TRY rate (for SettingsForm helper).
// Falls back to fetchRateForDate('latest') directly — note: 'latest' is not an
// ISO date so it bypasses the ISO_DATE filter in fetchRatesForDates intentionally.
export async function fetchLatestEurTryRate(): Promise<number | null> {
  const today = new Date().toISOString().slice(0, 10)
  const result = await fetchRatesForDates([today])
  if (result.has(today)) return result.get(today)!
  return fetchRateForDate('latest')
}
```

- [ ] **Step 2: Run TypeScript check**

```bash
cd /Users/engin/Desktop/my/web/vip && npx tsc --noEmit
```

Expected: no errors in new file.

- [ ] **Step 3: Commit**

```bash
git add admin/react/lib/exchange-rates.ts
git commit -m "feat: add exchange-rates module for per-date EUR/TRY fetch"
```

---

## Task 2: Extend `profit-loss-metrics.js` with `ratesByDate`

**Files:**
- Modify: `admin/profit-loss-metrics.js`
- Modify: `admin/profit-loss-metrics.test.js`

### What changes

1. `resolveRealizedLegs(bookings, today, settingsByMonth, ratesByDate)` — 4th optional param (`null` by default)
2. Inside the per-leg loop: pick `eurTryRate` from `ratesByDate?.get(leg.date)` first, else `settings.eurTryRate`. Store as `legDetails.eurTryRate`.
3. Use `legDetails.eurTryRate` for `revenueTry` and `airportMeetCostTry` (already per-leg, no change in structure).
4. `totalsForLegs`: use `leg.eurTryRate` for vehicleCostEur/supplierCostEur conversions instead of re-reading monthly setting.
5. `distributionFinancialLeg`: use `leg.eurTryRate ?? settings.eurTryRate` for EUR conversions.
6. `calculateProfitLossMetrics(bookings, period, today, settingsByMonth, ratesByDate)` — pass through.
7. `calculateProfitDistribution(bookings, options)` — read `options.ratesByDate`, pass to `resolveRealizedLegs`.

- [ ] **Step 1: Write failing tests first**

Add to `admin/profit-loss-metrics.test.js` inside a new `describe` block:

```js
describe('ratesByDate override', () => {
  test('uses per-date rate from ratesByDate instead of monthly setting', () => {
    const settings = {
      '2026-08': { km_cost_try: 15, eur_try_rate: 40, advertising_expense_try: 0 },
    }
    const ratesByDate = new Map([['2026-08-01', 35]])
    const result = calculateProfitLossMetrics(
      [baseBooking],
      '2026-08',
      '2026-08-07',
      settings,
      ratesByDate,
    )
    // income should use 35, not 40
    expect(result.incomeTry).toBe(100 * 35)
    expect(result.airportMeetCostTry).toBe(5 * 35)
    // resolved leg should expose its eurTryRate
    expect(result.resolvedLegs[0].eurTryRate).toBe(35)
  })

  test('falls back to monthly setting when date not in ratesByDate', () => {
    const settings = {
      '2026-08': { km_cost_try: 15, eur_try_rate: 40, advertising_expense_try: 0 },
    }
    const ratesByDate = new Map() // empty — plain JS, no TS generics in .js test file
    const result = calculateProfitLossMetrics(
      [baseBooking],
      '2026-08',
      '2026-08-07',
      settings,
      ratesByDate,
    )
    expect(result.incomeTry).toBe(100 * 40)
    expect(result.resolvedLegs[0].eurTryRate).toBe(40)
  })
})
```

- [ ] **Step 2: Run tests — expect failure**

```bash
cd /Users/engin/Desktop/my/web/vip && npx vitest run admin/profit-loss-metrics.test.js
```

Expected: new tests FAIL (ratesByDate param not yet supported).

- [ ] **Step 3: Modify `resolveRealizedLegs`**

Change signature and the rate resolution inside the loop:

```js
// Before:
export function resolveRealizedLegs(bookings, today, settingsByMonth = {}) {

// After:
export function resolveRealizedLegs(bookings, today, settingsByMonth = {}, ratesByDate = null) {
```

Inside the loop, after `const settings = settingForMonth(settingsByMonth, legDetails.month)`:

```js
// Before:
legDetails.revenueTry = leg.revenueEur * settings.eurTryRate
legDetails.airportMeetCostEur = !leg.isDailyChauffeur && startsFromAirport(leg.from) ? AIRPORT_MEET_COST_EUR : 0
legDetails.airportMeetCostTry = legDetails.airportMeetCostEur * settings.eurTryRate

// After:
const eurTryRate = (ratesByDate instanceof Map ? ratesByDate.get(leg.date) : null) ?? settings.eurTryRate
legDetails.eurTryRate = eurTryRate
legDetails.revenueTry = leg.revenueEur * eurTryRate
legDetails.airportMeetCostEur = !leg.isDailyChauffeur && startsFromAirport(leg.from) ? AIRPORT_MEET_COST_EUR : 0
legDetails.airportMeetCostTry = legDetails.airportMeetCostEur * eurTryRate
```

For unresolved legs (pushed to `unresolvedLegs`), `eurTryRate` is already on `legDetails` at this point, so no change needed:

```js
// Unchanged — eurTryRate is already set on legDetails above:
unresolvedLegs.push(legDetails)
```

- [ ] **Step 4: Modify `totalsForLegs` to use per-leg rate**

```js
// Before:
totals.vehicleCostEur = resolvedLegs.reduce((total, leg) => {
  return total + (leg.vehicleCostTry / settingForMonth(settingsByMonth, leg.month).eurTryRate)
}, 0)
totals.supplierCostEur = resolvedLegs.reduce((total, leg) => {
  return total + ((leg.supplierCostTry ?? 0) / settingForMonth(settingsByMonth, leg.month).eurTryRate)
}, 0)

// After:
totals.vehicleCostEur = resolvedLegs.reduce((total, leg) => {
  const rate = leg.eurTryRate ?? settingForMonth(settingsByMonth, leg.month).eurTryRate
  return total + (leg.vehicleCostTry / rate)
}, 0)
totals.supplierCostEur = resolvedLegs.reduce((total, leg) => {
  const rate = leg.eurTryRate ?? settingForMonth(settingsByMonth, leg.month).eurTryRate
  return total + ((leg.supplierCostTry ?? 0) / rate)
}, 0)
```

- [ ] **Step 5: Modify `distributionFinancialLeg` to use per-leg rate**

```js
// Before (uses settings.eurTryRate throughout):
function distributionFinancialLeg(leg, settingsByMonth, allocations) {
  const settings = settingForMonth(settingsByMonth, leg.month)
  ...
  const revenueTry = centsToNumber(multiplyDivideMoneyToCents(revenueEur, settings.eurTryRate, 1))
  const vehicleCostEur = centsToNumber(multiplyDivideMoneyToCents(vehicleCostTry, 1, settings.eurTryRate))
  const supplierCostEur = centsToNumber(multiplyDivideMoneyToCents(supplierCostTry, 1, settings.eurTryRate))
  const airportMeetCostTry = centsToNumber(multiplyDivideMoneyToCents(airportMeetCostEur, settings.eurTryRate, 1))

// After:
function distributionFinancialLeg(leg, settingsByMonth, allocations) {
  const settings = settingForMonth(settingsByMonth, leg.month)
  const eurTryRate = leg.eurTryRate ?? settings.eurTryRate
  ...
  const revenueTry = centsToNumber(multiplyDivideMoneyToCents(revenueEur, eurTryRate, 1))
  const vehicleCostEur = centsToNumber(multiplyDivideMoneyToCents(vehicleCostTry, 1, eurTryRate))
  const supplierCostEur = centsToNumber(multiplyDivideMoneyToCents(supplierCostTry, 1, eurTryRate))
  const airportMeetCostTry = centsToNumber(multiplyDivideMoneyToCents(airportMeetCostEur, eurTryRate, 1))
```

- [ ] **Step 6: Thread `ratesByDate` through top-level functions**

`calculateProfitLossMetrics`:
```js
// Before:
export function calculateProfitLossMetrics(bookings, period, today, settingsByMonth = {}) {
  const realizedLegs = resolveRealizedLegs(bookings, today, settingsByMonth)

// After:
export function calculateProfitLossMetrics(bookings, period, today, settingsByMonth = {}, ratesByDate = null) {
  const realizedLegs = resolveRealizedLegs(bookings, today, settingsByMonth, ratesByDate)
```

`calculateProfitDistribution`:
```js
// Before:
  const realized = todayDate
    ? resolveRealizedLegs(Array.isArray(bookings) ? bookings : [], today, settingsByMonth)

// After:
  const ratesByDate = options.ratesByDate ?? null
  const realized = todayDate
    ? resolveRealizedLegs(Array.isArray(bookings) ? bookings : [], today, settingsByMonth, ratesByDate)
```

- [ ] **Step 7: Run tests — expect pass**

```bash
cd /Users/engin/Desktop/my/web/vip && npx vitest run admin/profit-loss-metrics.test.js
```

Expected: all tests PASS.

- [ ] **Step 8: Commit**

```bash
git add admin/profit-loss-metrics.js admin/profit-loss-metrics.test.js
git commit -m "feat: support per-date EUR/TRY rate override in profit metrics"
```

---

## Task 3: Wire up rate fetching in `ProfitLossPage.tsx`

**Files:**
- Modify: `admin/react/pages/ProfitLossPage.tsx`

- [ ] **Step 1: Add import and state**

Add import at top:
```ts
import { fetchRatesForDates } from '../lib/exchange-rates'
```

Add state in `ProfitLossPage` component:
```ts
const [ratesByDate, setRatesByDate] = useState<Map<string, number>>(new Map())
const [ratesLoading, setRatesLoading] = useState(false)
```

- [ ] **Step 2: Fetch rates after bookings load**

In the `refresh` callback, after `setBookings(nextBookings)`:

```ts
// After bookings are set, fetch per-date exchange rates in background.
// daily_chauffeur legs use chauffeur_hire_days[*].service_date, not pickup_date,
// so we must collect those separately.
setRatesLoading(true)
const dates = nextBookings.flatMap((b: Booking) => {
  if (b.trip_type === 'daily_chauffeur') {
    return ((b.chauffeur_hire_days ?? []) as Array<{ service_date?: string }>)
      .map(d => d.service_date)
      .filter((d): d is string => Boolean(d))
  }
  return [b.pickup_date, b.return_date].filter((d): d is string => Boolean(d))
})
fetchRatesForDates(dates)
  .then(rates => { setRatesByDate(rates) })
  .catch(() => { /* silent — falls back to monthly rate */ })
  .finally(() => { setRatesLoading(false) })
```

- [ ] **Step 3: Pass `ratesByDate` to metrics**

```ts
// Before:
const metrics = useMemo(() => calculateProfitLossMetrics(bookings, period, today, settings), [bookings, period, settings, today])

// After:
const metrics = useMemo(
  () => calculateProfitLossMetrics(bookings, period, today, settings, ratesByDate),
  [bookings, period, settings, today, ratesByDate],
)
```

Also pass to `confirmDistribution` → `calculateProfitDistribution` options:
```ts
const currentMetrics = calculateProfitDistribution(bookings, {
  startDate: input.expectedStart,
  endDate: input.periodEnd,
  today: distributionToday,
  settingsByMonth: settings,
  operationsSharePct: input.operationsSharePct,
  ratesByDate,  // may be empty Map if API fetch is still in flight — falls back to monthly rate
})
```

- [ ] **Step 4: Show rates loading indicator in toolbar**

In the toolbar div (near the sync button), add a small indicator:
```tsx
{ratesLoading && <span className="rates-loading-hint">Kurlar yükleniyor…</span>}
```

- [ ] **Step 5: Run TypeScript check**

```bash
cd /Users/engin/Desktop/my/web/vip && npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 6: Commit**

```bash
git add admin/react/pages/ProfitLossPage.tsx
git commit -m "feat: fetch and apply per-trip EUR/TRY rates in profit page"
```

---

## Task 4: Show per-trip rate in travel history UI

**Files:**
- Modify: `admin/react/pages/ProfitLossPage.tsx` (TravelHistorySection and TravelHistoryRow)

- [ ] **Step 1: Add rate display to each trip row**

In `TravelHistorySection`, inside the trip row's `profit-trip-history-meta` div, add EUR/TRY rate display:

```tsx
// Inside the map, after the existing meta spans:
{(leg as any).eurTryRate != null && (
  <span>Kur: ₺{((leg as any).eurTryRate as number).toFixed(2)}</span>
)}
```

The `leg` objects from `metrics.resolvedLegs` and `metrics.unresolvedLegs` now carry `eurTryRate` (set in Task 2).

- [ ] **Step 2: Visual check**

Run dev server and open profit page:
```bash
npm run dev:admin
```

Verify each trip row shows its EUR/TRY rate (e.g. `Kur: ₺38.52`). Rows whose date has no API rate should fall back to the monthly setting value.

- [ ] **Step 3: Commit**

```bash
git add admin/react/pages/ProfitLossPage.tsx
git commit -m "feat: display per-trip EUR/TRY rate in travel history"
```

---

## Task 5: Add "Güncel kuru al" button to SettingsForm

**Files:**
- Modify: `admin/react/pages/ProfitLossPage.tsx` (SettingsForm component)

- [ ] **Step 1: Update import at top of file**

Replace the import added in Task 3 to also include `fetchLatestEurTryRate`:

```ts
// Final import line (replaces the Task 3 import):
import { fetchRatesForDates, fetchLatestEurTryRate } from '../lib/exchange-rates'
```

- [ ] **Step 2: Add fetch state and handler in SettingsForm**

```tsx
const [fetchingRate, setFetchingRate] = useState(false)
const [fetchRateError, setFetchRateError] = useState('')

const handleFetchRate = async () => {
  setFetchingRate(true)
  setFetchRateError('')
  try {
    const fetched = await fetchLatestEurTryRate()
    if (fetched === null) {
      setFetchRateError('Kur alınamadı, manuel girin.')
    } else {
      setRate(fetched.toFixed(4))
    }
  } catch {
    setFetchRateError('Kur alınamadı, manuel girin.')
  } finally {
    setFetchingRate(false)
  }
}
```

- [ ] **Step 3: Add button next to the rate input**

In the rate label JSX, add a fetch button inline:

```tsx
// Before:
<label className="profit-input-field">
  <span>EUR/TL kuru</span>
  <div><b>₺</b><input type="number" ... /></div>
  <small>1 € karşılığı</small>
</label>

// After:
<label className="profit-input-field">
  <span>EUR/TL kuru</span>
  <div>
    <b>₺</b>
    <input type="number" min="0.01" max="10000" step="0.0001" inputMode="decimal" value={rate} onChange={e => setRate(e.target.value)} required />
    <button type="button" className="fetch-rate-btn" onClick={() => void handleFetchRate()} disabled={fetchingRate}>
      {fetchingRate ? '…' : 'Kur al'}
    </button>
  </div>
  <small>1 € karşılığı{fetchRateError ? ` · ${fetchRateError}` : ''}</small>
</label>
```

- [ ] **Step 4: Run TypeScript check**

```bash
cd /Users/engin/Desktop/my/web/vip && npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 5: Run full test suite**

```bash
cd /Users/engin/Desktop/my/web/vip && npx vitest run
```

Expected: all tests pass.

- [ ] **Step 6: Commit**

```bash
git add admin/react/pages/ProfitLossPage.tsx
git commit -m "feat: add EUR/TRY rate fetch button to profit settings form"
```

---

## Notes

- **Monthly rate stays authoritative for:** advertising expense EUR conversion, fallback when API rate is unavailable, distribution snapshot's `monthlySettings`.
- **API rate is authoritative for:** per-trip `revenueTry`, `airportMeetCostTry`, `vehicleCostEur`, `supplierCostEur` conversions.
- **Cache is module-level** — persists across period switches in same session but resets on page reload.
- **No API key needed** — fawazahmed0/currency-api is a public CDN package updated daily.
- **Rate source transparency** — trip row shows the actual rate used, so discrepancy with manual monthly rate is visible.
