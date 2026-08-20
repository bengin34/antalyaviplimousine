# Sold Transfer Cost Model Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transfer rezervasyonlarında iki ayrı maliyet modeli sunmak: `own_vehicle` için mevcut araç başı km hesabını sürdürmek, `sold_transfer` için manuel girilen toplam tedarikçi maliyetini doğrudan o transferin toplam gideri olarak kullanmak.

**Architecture:** Mevcut `bookings` kaydı transferin gelir kaynağı olarak kalacak; buna ek olarak hizmetin nasıl karşılandığını anlatan bir maliyet modeli alanı eklenecek. Kâr/zarar motoru her rezervasyon ayağını çözerken artık önce maliyet modeline bakacak: `own_vehicle` ise bugünkü km + boş dönüş + havalimanı karşılama kuralları uygulanacak, `sold_transfer` ise rezervasyon düzeyindeki manuel toplam maliyet ilgili gerçekleşen ayaklara dağıtılarak toplam gider hesabına girecek.

**Tech Stack:** Supabase SQL migrations, React + TypeScript admin paneli, mevcut `admin/profit-loss-metrics.js` hesap motoru, Vitest.

---

## Proposed Data Model

- `bookings.service_cost_mode`
  Allowed values: `own_vehicle`, `sold_transfer`
  Default: `own_vehicle`
- `bookings.sold_transfer_cost_try`
  Anlamı: Bu rezervasyon dışarıya satıldıysa toplam tedarikçi maliyeti.
  Neden `TRY`: Kâr/zarar ekranındaki diğer operasyonel giderler zaten TL tutuluyor; geçmiş aylar için kur oynaklığını tekrar çözmek gerekmiyor.
- Günlük `daily_chauffeur` rezervasyonları bu ilk kapsamda zorunlu olarak `own_vehicle` kalmalı.
- Gidiş-dönüş rezervasyonlarında `sold_transfer_cost_try` booking-toplamı olarak saklanmalı; kâr/zarar ekranında gelir gibi iki ayağa eşit bölünmeli.
  Not: İleride ayak bazlı farklı satın alma maliyeti gerekirse ayrı bir `booking_leg_costs` tablosu açılabilir. Bu plan şimdilik onu kapsamıyor.

## File Map

- Create: `supabase/migrations/20260820_add_transfer_cost_model.sql`
- Modify: `admin/react/types.ts`
- Modify: `admin/react/pages/NewBookingPage.tsx`
- Modify: `admin/react/pages/BookingDetailPage.tsx`
- Modify: `admin/react/pages/ProfitLossPage.tsx`
- Modify: `admin/profit-loss-metrics.js`
- Modify: `admin/profit-loss-metrics.test.js`
- Optional copy touch-up if needed: `admin/react/styles.css`

### Task 1: Add database support for transfer cost mode

**Files:**
- Create: `supabase/migrations/20260820_add_transfer_cost_model.sql`
- Modify: `admin/react/types.ts`

- [ ] **Step 1: Write the failing test expectation in the plan review notes**

Expected behavior:

```text
bookings rows can store service_cost_mode and sold_transfer_cost_try
daily_chauffeur cannot be saved as sold_transfer
sold_transfer_cost_try must be null for own_vehicle
sold_transfer_cost_try must be > 0 for sold_transfer
```

- [ ] **Step 2: Add the migration**

Create a migration that:

```sql
ALTER TABLE bookings
  ADD COLUMN IF NOT EXISTS service_cost_mode TEXT NOT NULL DEFAULT 'own_vehicle'
    CHECK (service_cost_mode IN ('own_vehicle', 'sold_transfer')),
  ADD COLUMN IF NOT EXISTS sold_transfer_cost_try NUMERIC(10, 2)
    CHECK (sold_transfer_cost_try > 0 AND sold_transfer_cost_try <= 9999999.99);

ALTER TABLE bookings
  DROP CONSTRAINT IF EXISTS bookings_service_cost_mode_check;

ALTER TABLE bookings
  ADD CONSTRAINT bookings_service_cost_mode_check
  CHECK (
    (service_cost_mode = 'own_vehicle' AND sold_transfer_cost_try IS NULL)
    OR (
      service_cost_mode = 'sold_transfer'
      AND sold_transfer_cost_try IS NOT NULL
      AND trip_type IN ('one_way', 'round_trip')
    )
  );
```

- [ ] **Step 3: Extend TypeScript booking types**

Add to `Booking`:

```ts
service_cost_mode: 'own_vehicle' | 'sold_transfer'
sold_transfer_cost_try: number | string | null
```

- [ ] **Step 4: Verify migration syntax**

Run: `npx supabase db lint`
Expected: migration parses without SQL errors

- [ ] **Step 5: Commit**

```bash
git add supabase/migrations/20260820_add_transfer_cost_model.sql admin/react/types.ts
git commit -m "feat: add transfer cost model fields"
```

### Task 2: Capture the cost mode in admin create/edit flows

**Files:**
- Modify: `admin/react/pages/NewBookingPage.tsx`
- Modify: `admin/react/pages/BookingDetailPage.tsx`
- Optional Modify: `admin/react/styles.css`

- [ ] **Step 1: Add failing validation cases to the existing form tests or create new ones if needed**

Target cases:

```ts
expect(validateBookingForm({
  ...baseForm,
  tripType: 'one_way',
  costMode: 'sold_transfer',
  soldTransferCostTry: '',
}).error).toContain('maliyet')
```

```ts
expect(validateBookingForm({
  ...dailyForm,
  costMode: 'sold_transfer',
}).error).toContain('günlük')
```

- [ ] **Step 2: Extend booking form state**

Add fields to `BookingFormState`:

```ts
costMode: 'own_vehicle' | 'sold_transfer'
soldTransferCostTry: string
```

Default behavior:
- normal transfers: `own_vehicle`
- daily chauffeur: hard-lock to `own_vehicle`

- [ ] **Step 3: Update `validateBookingForm`**

Rules:
- `own_vehicle`: `sold_transfer_cost_try = null`
- `sold_transfer`: numeric value required, `> 0`
- `daily_chauffeur`: reject `sold_transfer`

Payload mapping:

```ts
service_cost_mode: isDailyChauffeur ? 'own_vehicle' : form.costMode,
sold_transfer_cost_try: form.costMode === 'sold_transfer'
  ? Number(form.soldTransferCostTry.replace(',', '.'))
  : null,
```

- [ ] **Step 4: Add UI to new booking form**

Insert a new admin section under transfer/payment details:
- radio or select: `Kendi aracımız`
- radio or select: `Satılan transfer`
- if `Satılan transfer`: show `Toplam maliyet (₺)` input
- helper copy:
  - `Kendi aracımız`: araç maliyeti km hesabından çıkar
  - `Satılan transfer`: girilen toplam maliyet doğrudan gider kabul edilir

- [ ] **Step 5: Add the same controls to booking edit flow**

Update both:
- `createEditForm`
- `BookingEditor`

Also update detail summary card to show current mode:
- `Maliyet modeli: Kendi aracımız`
- `Maliyet modeli: Satılan transfer · ₺12.500`

- [ ] **Step 6: Manual UI verification**

Run: `npm test -- admin/profit-loss-metrics.test.js`
Then run the admin app and verify:
- one-way own vehicle saves
- one-way sold transfer requires total cost
- daily chauffeur does not allow sold transfer

- [ ] **Step 7: Commit**

```bash
git add admin/react/pages/NewBookingPage.tsx admin/react/pages/BookingDetailPage.tsx admin/react/styles.css
git commit -m "feat: capture transfer cost mode in admin forms"
```

### Task 3: Teach the profit/loss engine both cost models

**Files:**
- Modify: `admin/profit-loss-metrics.js`
- Modify: `admin/profit-loss-metrics.test.js`

- [ ] **Step 1: Add failing metric tests for sold transfers**

Add tests for:

```ts
test('uses km-based cost for own vehicle transfers', () => {})
test('uses entered total expense for sold transfers', () => {})
test('splits sold transfer total expense across realized round-trip legs', () => {})
test('does not require route distance for sold transfers', () => {})
test('does not add airport meet cost to sold transfers', () => {})
```

- [ ] **Step 2: Extend `bookingLegs` output with cost metadata**

Each leg should carry:

```ts
costMode: booking.service_cost_mode ?? 'own_vehicle'
soldTransferTotalCostTry: Number(booking.sold_transfer_cost_try) || 0
```

- [ ] **Step 3: Resolve expenses by cost mode**

Implementation rule:

```ts
if (leg.costMode === 'sold_transfer') {
  const allocatedCostTry = hasReturn ? totalCostTry / 2 : totalCostTry
  resolvedLegs.push({
    ...legDetails,
    oneWayKm: 0,
    vehicleKm: 0,
    vehicleCostTry: 0,
    supplierCostTry: allocatedCostTry,
    airportMeetCostTry: 0,
    airportMeetCostEur: 0,
    distanceSource: 'sold-transfer',
  })
  continue
}
```

- [ ] **Step 4: Update totals and route breakdown**

Add new aggregates:
- `supplierCostTry`
- `supplierCostEur`

Then revise formula:

```ts
totalExpenseTry = vehicleCostTry + supplierCostTry + airportMeetCostTry + advertisingExpenseTry
```

UI contract:
- `vehicleCostTry` only for `own_vehicle`
- `supplierCostTry` only for `sold_transfer`

- [ ] **Step 5: Decide unresolved-leg behavior**

Required outcome:
- `sold_transfer` bookings never fall into unresolved distance warnings
- only `own_vehicle` bookings can require manual KM

- [ ] **Step 6: Run focused tests**

Run: `npm test -- admin/profit-loss-metrics.test.js`
Expected:
- all existing tests still pass after updates
- new sold-transfer cases pass

- [ ] **Step 7: Commit**

```bash
git add admin/profit-loss-metrics.js admin/profit-loss-metrics.test.js
git commit -m "feat: support sold transfer expenses in profit report"
```

### Task 4: Reflect the new expense buckets in the profit/loss UI

**Files:**
- Modify: `admin/react/pages/ProfitLossPage.tsx`
- Optional Modify: `admin/react/styles.css`

- [ ] **Step 1: Update fetch/select payloads**

Include the new fields in `fetchAllBookings()`:

```ts
select('..., trip_type, price_eur, ..., service_cost_mode, sold_transfer_cost_try, ...')
```

- [ ] **Step 2: Show separate KPIs**

Add or rename cards:
- `Araç KM`
- `Kendi araç maliyeti`
- `Satılan transfer maliyeti`
- keep `Karşılama maliyeti`

This prevents the report from implying that sold transfers consumed vehicle km.

- [ ] **Step 3: Update formula row and helper copy**

New formula presentation:

```text
Gelir − Kendi araç maliyeti − Satılan transfer maliyeti − Karşılama − Reklam
```

Footnote should explain:
- `Kendi aracımız` seçilirse km ve boş dönüş hesabı uygulanır
- `Satılan transfer` seçilirse girilen toplam tedarikçi maliyeti doğrudan gider sayılır

- [ ] **Step 4: Adjust unresolved and manual distance sections**

Only show these sections for `own_vehicle` legs.

Optional extra:
- show an informational block listing sold-transfer legs and entered total costs.

- [ ] **Step 5: Run UI smoke verification**

Manual checks:
- sold transfer appears with zero vehicle km
- sold transfer cost contributes to total expense
- route breakdown still makes sense when mixed bookings exist

- [ ] **Step 6: Commit**

```bash
git add admin/react/pages/ProfitLossPage.tsx admin/react/styles.css
git commit -m "feat: expose sold transfer costs in profit loss ui"
```

### Task 5: Regression pass and rollout notes

**Files:**
- Modify if needed: `admin/profit-loss-metrics.test.js`
- Modify if needed: `docs/superpowers/plans/2026-08-20-sold-transfer-cost-model.md`

- [ ] **Step 1: Run the full relevant test set**

Run:

```bash
npm test -- admin/profit-loss-metrics.test.js admin/turkish-formatters.test.js admin/search-match.test.js admin/react/react-migration.test.ts
```

Expected:
- no regression in admin shared utilities

- [ ] **Step 2: Manual end-to-end verification**

Test matrix:
1. one-way `own_vehicle`
2. one-way `sold_transfer`
3. round-trip `sold_transfer`
4. daily chauffeur `own_vehicle`
5. private-address own vehicle with manual km override

- [ ] **Step 3: Data migration/backfill sanity**

Confirm:
- all historical bookings read as `own_vehicle`
- no existing record requires backfill cost input

- [ ] **Step 4: Final commit**

```bash
git add .
git commit -m "test: verify transfer cost model rollout"
```

## Open Questions

- `sold_transfer_cost_try` booking-toplamı olarak yeterli mi, yoksa ileride gidiş/dönüş ayakları için ayrı maliyet girişi gerekecek mi?
- Satılan transferlerde havalimanı karşılama maliyeti gerçekten sıfır mı kabul edilmeli? Bu plan öyle varsayıyor.
- Detay ekranında tedarikçi adı da tutulacak mı? Bu plan yalnızca maliyeti kapsıyor.

## Recommended Default Decisions

- `service_cost_mode` varsayılanı `own_vehicle`
- `sold_transfer_cost_try` yalnızca TL olarak tutulmalı
- `sold_transfer` için araç km, boş dönüş ve havalimanı karşılama maliyeti hesaplanmamalı
- gidiş-dönüş satılan transferlerde toplam maliyet iki ayağa eşit bölünmeli

