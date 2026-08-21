# Profit Distribution Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add an immutable, EUR-first two-partner profit-distribution ledger to the existing Kâr/Zarar page, with a manual inclusive opening date, configurable 50/50 split, TRY reference values, closed-period previews, and auditable history.

**Architecture:** Reuse one shared trip-leg resolver for the existing monthly report and a new inclusive date-range distribution calculator. Persist only confirmed distribution snapshots through authenticated, narrowly granted Supabase RPCs; database locks and constraints enforce contiguous periods and prevent duplicates. Keep the page orchestration in `ProfitLossPage`, while a focused component owns setup, preview, confirmation, and history presentation.

**Tech Stack:** React 19, TypeScript, Vitest + Testing Library, Supabase JS, Supabase Postgres migrations, pgTAP, existing JavaScript profit engine.

**Design spec:** `docs/superpowers/specs/2026-08-21-profit-distribution-design.md`

**Required implementation skills:** `@superpowers:test-driven-development`, `@supabase:supabase`, `@supabase:supabase-postgres-best-practices`, and `@superpowers:verification-before-completion`.

**Verified Supabase guidance:** Follow the current official guidance for [database function security](https://supabase.com/docs/guides/database/functions), [RLS](https://supabase.com/docs/guides/database/postgres/row-level-security), and [Data API grants](https://supabase.com/docs/guides/api/securing-your-api). In particular, revoke default function execution, explicitly grant only required roles, set `search_path = ''` on definer functions, fully qualify relations, enable RLS on exposed tables, and keep table grants separate from RLS policies.

---

## File map

- Modify: `admin/profit-loss-metrics.js` — expose shared leg resolution, range metrics, advertising proration, blockers, share rounding, and immutable snapshot construction.
- Modify: `admin/profit-loss-metrics.test.js` — preserve monthly behavior and cover every range/distribution rule.
- Create via `supabase migration new add_profit_distributions`: `supabase/migrations/<CLI-generated timestamp>_add_profit_distributions.sql` — settings/distribution schema, constraints, RLS, grants, and two narrow RPCs. The CLI-generated timestamp is intentionally not invented in advance.
- Create via `supabase test new profit_distributions`: `supabase/tests/profit_distributions.sql` — pgTAP coverage for privileges, setup immutability, sequencing, validation, and duplicate prevention.
- Modify: `admin/react/types.ts` — typed settings, snapshot, and distribution contracts.
- Create: `admin/react/lib/profit-distributions.ts` — Supabase reads/RPC calls and database-error translation.
- Create: `admin/react/lib/profit-distributions.test.ts` — client payload and error mapping tests with a mocked Supabase chain.
- Create: `admin/react/components/ProfitDistributionSection.tsx` — setup, date-range preview, share inputs, confirmation, blockers, and immutable history.
- Create: `admin/react/components/ProfitDistributionSection.test.tsx` — user interaction and accessibility tests.
- Modify: `admin/react/pages/ProfitLossPage.tsx` — load the ledger data and mount the new section without changing existing report behavior.
- Modify: `admin/react/styles.css` — responsive styles scoped under `profit-distribution-*`.

---

### Task 1: Extract a reusable realized-leg calculation core

**Files:**
- Modify: `admin/profit-loss-metrics.js:63-298`
- Modify: `admin/profit-loss-metrics.test.js:55-end`

- [ ] **Step 1: Add regression tests before refactoring**

Add assertions that capture the current monthly contract, including EUR vehicle/supplier totals and exact leg metadata:

```js
test('keeps monthly totals stable while exposing normalized resolved legs', () => {
  const settings = {
    '2026-08': { km_cost_try: 20, eur_try_rate: 40, advertising_expense_try: 500 },
  }
  const result = calculateProfitLossMetrics([baseBooking], '2026-08', '2026-08-07', settings)

  expect(result.vehicleCostEur).toBe(65)
  expect(result.supplierCostEur).toBe(0)
  expect(result.resolvedLegs[0]).toMatchObject({
    bookingId: 'booking-1',
    leg: 'outbound',
    date: '2026-08-01',
    month: '2026-08',
    revenueEur: 100,
    revenueTry: 4000,
    vehicleCostTry: 2600,
  })
})
```

- [ ] **Step 2: Run the focused test and confirm the new contract fails**

Run: `npm test -- admin/profit-loss-metrics.test.js`

Expected: FAIL because `vehicleCostEur` is currently calculated locally but not returned as a named total.

- [ ] **Step 3: Extract small shared helpers without changing monthly outputs**

In `admin/profit-loss-metrics.js`:

```js
export function resolveRealizedLegs(bookings, today, settingsByMonth = {}) {
  const resolvedLegs = []
  const unresolvedLegs = []
  // Move the existing bookingLegs/isRealizedLeg/distance/cost loop here.
  // Do not apply a month or date-range filter in this function.
  return { resolvedLegs, unresolvedLegs }
}

function totalsForLegs(resolvedLegs, unresolvedLegs, settingsByMonth) {
  // Move the current revenue and direct-cost aggregation here.
  // Return vehicleCostEur and supplierCostEur as named fields.
}
```

Make `calculateProfitLossMetrics` call the shared resolver, then filter resolved and unresolved legs with the current `period` semantics before aggregating. Preserve:

- today-status behavior;
- round-trip splitting;
- sold-transfer behavior;
- daily chauffeur zero/missing distinction;
- unresolved-leg revenue inclusion in the report;
- whole-month advertising for the existing report.

- [ ] **Step 4: Run the monthly regression suite**

Run: `npm test -- admin/profit-loss-metrics.test.js`

Expected: PASS; all existing tests and the new regression pass.

- [ ] **Step 5: Commit the refactor**

```bash
git add admin/profit-loss-metrics.js admin/profit-loss-metrics.test.js
git commit -m "refactor: share realized profit leg calculations"
```

---

### Task 2: Build the closed-date-range distribution calculator

**Files:**
- Modify: `admin/profit-loss-metrics.js`
- Modify: `admin/profit-loss-metrics.test.js`

- [ ] **Step 1: Write failing tests for date boundaries and blockers**

Cover an inclusive opening date, end-before-today validation, cancellations, split round-trip legs, and the three incomplete-cost blockers:

```js
describe('calculateProfitDistribution', () => {
  test('includes both boundaries and excludes earlier, later, cancelled, and future legs', () => {
    const result = calculateProfitDistribution(bookings, {
      startDate: '2026-08-02',
      endDate: '2026-08-05',
      today: '2026-08-07',
      settingsByMonth,
      operationsSharePct: 50,
    })
    expect(result.resolvedLegs.map(leg => `${leg.bookingId}:${leg.leg}`)).toEqual([
      'round-trip:return',
    ])
  })

  test.each([
    ['missing own-vehicle route', unresolvedOwnVehicle],
    ['missing daily chauffeur km', missingDailyKm],
    ['missing sold-transfer supplier cost', missingSupplierCost],
  ])('blocks confirmation for %s', (_label, booking) => {
    const result = calculateProfitDistribution([booking], validOptions)
    expect(result.canDistribute).toBe(false)
    expect(result.blockers).toHaveLength(1)
  })
})
```

- [ ] **Step 2: Run focused tests to verify failure**

Run: `npm test -- admin/profit-loss-metrics.test.js`

Expected: FAIL because `calculateProfitDistribution` does not exist.

- [ ] **Step 3: Implement date utilities and telescoping advertising allocation**

Use ISO date-only arithmetic in UTC to avoid DST shifts:

```js
function dateOnlyUtc(value) {
  const [year, month, day] = value.split('-').map(Number)
  return new Date(Date.UTC(year, month - 1, day))
}

function roundMoney(value) {
  return Math.round((value + Number.EPSILON) * 100) / 100
}

export function allocatedAdvertisingForRange(startDate, endDate, settingsByMonth = {}) {
  // For every intersected month:
  // round(monthTotal * endDay / daysInMonth, 2)
  // - round(monthTotal * (startDay - 1) / daysInMonth, 2)
  // Return per-month entries plus summed TRY/EUR values.
}
```

Tests must include:

- February 2028 leap year;
- a range crossing two months;
- 31 adjacent one-day August ranges summing exactly to the monthly TRY amount;
- an opening date mid-month excluding the prior cumulative portion.

- [ ] **Step 4: Implement share validation and exact reconciliation**

```js
export function splitProfit(netProfitEur, netProfitTry, operationsSharePct) {
  const pct = Number(operationsSharePct)
  const vehicleOwnerSharePct = roundMoney(100 - pct)
  const operationsAmountEur = roundMoney(netProfitEur * pct / 100)
  const operationsAmountTry = roundMoney(netProfitTry * pct / 100)
  return {
    operationsSharePct: pct,
    vehicleOwnerSharePct,
    operationsAmountEur,
    vehicleOwnerAmountEur: roundMoney(netProfitEur - operationsAmountEur),
    operationsAmountTry,
    vehicleOwnerAmountTry: roundMoney(netProfitTry - operationsAmountTry),
  }
}
```

Reject percentages outside 0–100, more than two decimals, non-numeric values, or a derived total other than exactly 100. Test 50/50, 60/40, odd cents, and negative TRY with positive EUR.

- [ ] **Step 5: Implement `calculateProfitDistribution`**

The function returns:

```js
{
  startDate,
  endDate,
  incomeEur, incomeTry,
  vehicleCostEur, vehicleCostTry,
  supplierCostEur, supplierCostTry,
  airportMeetCostEur, airportMeetCostTry,
  advertisingExpenseEur, advertisingExpenseTry,
  totalExpenseEur, totalExpenseTry,
  netProfitEur, netProfitTry,
  realizedLegCount,
  resolvedLegs,
  monthlySettingsSnapshot,
  blockers,
  canDistribute,
  shares,
}
```

Rules:

- filter shared resolved/unresolved legs by `startDate <= leg.date <= endDate`;
- require `endDate < today`;
- treat positive EUR, not TRY, as the profit gate;
- block on unresolved own-vehicle legs;
- block on `daily-missing` legs but accept explicitly saved `0` km;
- block sold transfers with cost `<= 0` or non-numeric;
- do not drop revenue merely because a blocker exists; show the preview and blocker together;
- snapshot only settings months intersected by the range.

- [ ] **Step 6: Add snapshot serialization tests**

Add `buildProfitDistributionSnapshot(metrics)` and assert it returns JSON-safe values with `schema_version: 1`, stable leg keys, monthly settings, and rounded two-decimal totals. Mutating the source booking/settings fixture after snapshot construction must not change the snapshot.

- [ ] **Step 7: Run tests and commit**

Run: `npm test -- admin/profit-loss-metrics.test.js`

Expected: PASS, including existing monthly calculations.

```bash
git add admin/profit-loss-metrics.js admin/profit-loss-metrics.test.js
git commit -m "feat: calculate distributable profit ranges"
```

---

### Task 3: Add the immutable Supabase ledger and atomic RPCs

**Files:**
- Create via CLI: `supabase/migrations/<CLI-generated timestamp>_add_profit_distributions.sql`
- Create via CLI: `supabase/tests/profit_distributions.sql`

- [ ] **Step 1: Generate the migration and pgTAP test files with the installed CLI**

Run:

```bash
supabase migration new add_profit_distributions
supabase test new profit_distributions
```

Expected: the CLI prints the exact timestamped migration path and creates `supabase/tests/profit_distributions.sql`. Use the generated migration path for every remaining step and commit in this task.

- [ ] **Step 2: Write failing pgTAP tests for schema, grants, and RLS**

In `supabase/tests/profit_distributions.sql`, begin with a fixed test plan and assert:

```sql
begin;
select plan(18);

select has_table('public', 'profit_share_settings');
select has_table('public', 'profit_distributions');
select has_function('public', 'set_profit_share_settings', array['date', 'numeric', 'numeric']);
select has_function('public', 'create_profit_distribution', array['date', 'date', 'numeric', 'numeric', 'jsonb']);
select row_security_active('public.profit_share_settings');
select row_security_active('public.profit_distributions');
select table_privs_are('public', 'profit_distributions', 'authenticated', array['SELECT']);
select function_privs_are('public', 'create_profit_distribution', array['date', 'date', 'numeric', 'numeric', 'jsonb'], 'anon', array[]::text[]);

select * from finish();
rollback;
```

Adjust the pgTAP plan count to the final assertion count. Do not leave placeholders.

- [ ] **Step 3: Run the database test and confirm it fails**

Run: `supabase test db supabase/tests/profit_distributions.sql --local`

Expected: FAIL because the tables and functions do not exist. If the local stack is not running, run `supabase start`, then rerun the exact test command.

- [ ] **Step 4: Implement settings and distribution tables**

The generated migration must create:

```sql
create table public.profit_share_settings (
  id smallint primary key default 1 check (id = 1),
  opening_date date not null,
  default_operations_share_pct numeric(5,2) not null default 50,
  default_vehicle_owner_share_pct numeric(5,2) not null default 50,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (default_operations_share_pct between 0 and 100),
  check (default_vehicle_owner_share_pct between 0 and 100),
  check (default_operations_share_pct + default_vehicle_owner_share_pct = 100)
);

create table public.profit_distributions (
  id uuid primary key default gen_random_uuid(),
  period_start date not null,
  period_end date not null,
  operations_share_pct numeric(5,2) not null,
  vehicle_owner_share_pct numeric(5,2) not null,
  operations_amount_eur numeric(14,2) not null,
  vehicle_owner_amount_eur numeric(14,2) not null,
  operations_amount_try numeric(14,2) not null,
  vehicle_owner_amount_try numeric(14,2) not null,
  income_eur numeric(14,2) not null,
  income_try numeric(14,2) not null,
  vehicle_cost_eur numeric(14,2) not null,
  vehicle_cost_try numeric(14,2) not null,
  supplier_cost_eur numeric(14,2) not null,
  supplier_cost_try numeric(14,2) not null,
  airport_cost_eur numeric(14,2) not null,
  airport_cost_try numeric(14,2) not null,
  advertising_cost_eur numeric(14,2) not null,
  advertising_cost_try numeric(14,2) not null,
  total_expense_eur numeric(14,2) not null,
  total_expense_try numeric(14,2) not null,
  net_profit_eur numeric(14,2) not null check (net_profit_eur > 0),
  net_profit_try numeric(14,2) not null,
  realized_leg_count integer not null check (realized_leg_count >= 0),
  calculation_snapshot jsonb not null,
  created_by uuid not null references auth.users(id),
  created_at timestamptz not null default now(),
  check (period_end >= period_start),
  check (operations_share_pct between 0 and 100),
  check (vehicle_owner_share_pct between 0 and 100),
  check (operations_share_pct + vehicle_owner_share_pct = 100),
  check (operations_amount_eur + vehicle_owner_amount_eur = net_profit_eur),
  check (operations_amount_try + vehicle_owner_amount_try = net_profit_try),
  check ((calculation_snapshot->>'schema_version')::integer = 1),
  exclude using gist (daterange(period_start, period_end, '[]') with &&)
);

create index profit_distributions_period_end_idx
  on public.profit_distributions (period_end desc);
```

Do not specify an extension version; current Supabase changelog marks extension version pinning deprecated. Use schema-qualified lowercase identifiers and explicit constraints.

- [ ] **Step 5: Add least-privilege RLS and grants**

```sql
alter table public.profit_share_settings enable row level security;
alter table public.profit_distributions enable row level security;

revoke all on public.profit_share_settings from anon, authenticated;
revoke all on public.profit_distributions from anon, authenticated;
grant select on public.profit_share_settings, public.profit_distributions to authenticated;

create policy profit_share_settings_authenticated_read
  on public.profit_share_settings for select to authenticated using (true);
create policy profit_distributions_authenticated_read
  on public.profit_distributions for select to authenticated using (true);
```

The application's authenticated accounts are its admin boundary. Do not create anon policies. Do not grant direct insert/update/delete on either table.

- [ ] **Step 6: Add the settings RPC**

Implement `public.set_profit_share_settings(date, numeric, numeric)` as `SECURITY DEFINER SET search_path = ''` and fully qualify every relation. It must:

- reject `auth.uid() is null`;
- validate two-decimal shares and an exact 100 total;
- lock the singleton row if it exists;
- reject opening-date changes once any distribution exists;
- insert the singleton on first setup or update it before the first distribution;
- return the saved `public.profit_share_settings` row.

Immediately apply:

```sql
revoke execute on function public.set_profit_share_settings(date, numeric, numeric) from public, anon;
grant execute on function public.set_profit_share_settings(date, numeric, numeric) to authenticated;
```

- [ ] **Step 7: Add the atomic distribution RPC**

Implement `public.create_profit_distribution(date, date, numeric, numeric, jsonb)` as `SECURITY DEFINER SET search_path = ''`. Keep the locked transaction short: perform no external work and no booking queries. In one call it must:

1. reject missing `auth.uid()`;
2. lock settings row `id = 1 FOR UPDATE`;
3. derive expected start from `max(period_end) + 1` or `opening_date`;
4. require the caller's start to equal that expected date;
5. require end `>=` start and `< (now() at time zone 'Europe/Berlin')::date`;
6. validate percentages (two decimals, 0–100, total 100);
7. extract all numeric fields from `p_snapshot`, require `schema_version = 1`, positive EUR profit, nonnegative leg count, and exact EUR/TRY share reconciliation;
8. insert one row with `created_by = auth.uid()` and return it.

Lock order is always settings first, latest distribution second if explicitly locked. Let the exclusion constraint serve as defense in depth for overlap.

Apply:

```sql
revoke execute on function public.create_profit_distribution(date, date, numeric, numeric, jsonb) from public, anon;
grant execute on function public.create_profit_distribution(date, date, numeric, numeric, jsonb) to authenticated;
```

- [ ] **Step 8: Complete pgTAP behavioral tests**

Use `set local role authenticated` plus test JWT claims for a fixture auth user. Verify:

- anon cannot execute either RPC;
- authenticated can read but cannot directly write tables;
- opening date can change before the first distribution;
- opening date cannot change afterward;
- first expected start equals opening date;
- second expected start equals prior end + one day;
- gaps, overlaps, today/future end dates, zero/negative EUR, malformed snapshots, bad percentages, and stale duplicate calls fail;
- positive EUR with negative TRY succeeds;
- returned row contains `auth.uid()` and immutable snapshot values.

- [ ] **Step 9: Reset, test, and run database advisors**

Run:

```bash
supabase db reset --local
supabase test db supabase/tests/profit_distributions.sql --local
supabase db lint --local --level warning
supabase migration list --local
```

Expected: reset applies every migration; pgTAP passes; lint/advisors report no new security or performance warnings; the generated migration appears in local history. CLI `2.72.7` does not expose `db advisors`, so use its available `db lint` command locally and run project advisors through the Supabase dashboard/MCP before production deployment.

- [ ] **Step 10: Commit the database layer**

```bash
git add supabase/migrations/*_add_profit_distributions.sql supabase/tests/profit_distributions.sql
git commit -m "feat: add immutable profit distribution ledger"
```

---

### Task 4: Add typed Supabase ledger access

**Files:**
- Modify: `admin/react/types.ts`
- Create: `admin/react/lib/profit-distributions.ts`
- Create: `admin/react/lib/profit-distributions.test.ts`

- [ ] **Step 1: Add failing client tests**

Mock the existing `supabase` export and cover:

```ts
test('loads singleton settings and newest-first history together', async () => {
  const result = await fetchProfitDistributionLedger()
  expect(result).toEqual({ settings: settingsFixture, distributions: [newest, oldest] })
})

test('sends the expected start and immutable snapshot through the RPC', async () => {
  await createProfitDistribution(input)
  expect(rpc).toHaveBeenCalledWith('create_profit_distribution', {
    p_expected_start: '2026-08-21',
    p_period_end: '2026-08-31',
    p_operations_share_pct: 50,
    p_vehicle_owner_share_pct: 50,
    p_snapshot: snapshot,
  })
})
```

Also test Turkish mappings for stale start, invalid end, immutable opening date, and generic network errors.

- [ ] **Step 2: Run tests to verify failure**

Run: `npm test -- admin/react/lib/profit-distributions.test.ts`

Expected: FAIL because the module does not exist.

- [ ] **Step 3: Add explicit TypeScript contracts**

In `admin/react/types.ts`, add:

```ts
export interface ProfitShareSettings {
  id: 1
  opening_date: string
  default_operations_share_pct: number | string
  default_vehicle_owner_share_pct: number | string
  created_at: string
  updated_at: string
}

export interface ProfitDistributionSnapshot {
  schema_version: 1
  resolved_legs: Array<Record<string, unknown>>
  monthly_settings: Record<string, Record<string, number>>
  [key: string]: unknown
}

export interface ProfitDistribution {
  id: string
  period_start: string
  period_end: string
  operations_share_pct: number | string
  vehicle_owner_share_pct: number | string
  operations_amount_eur: number | string
  vehicle_owner_amount_eur: number | string
  operations_amount_try: number | string
  vehicle_owner_amount_try: number | string
  net_profit_eur: number | string
  net_profit_try: number | string
  realized_leg_count: number
  calculation_snapshot: ProfitDistributionSnapshot
  created_by: string
  created_at: string
  [key: string]: unknown
}
```

Include every persisted financial column explicitly rather than depending only on the index signature.

- [ ] **Step 4: Implement the ledger API wrapper**

Export:

```ts
export async function fetchProfitDistributionLedger(): Promise<{
  settings: ProfitShareSettings | null
  distributions: ProfitDistribution[]
}>

export async function saveProfitShareSettings(input: {
  openingDate: string
  operationsSharePct: number
  vehicleOwnerSharePct: number
}): Promise<ProfitShareSettings>

export async function createProfitDistribution(input: {
  expectedStart: string
  periodEnd: string
  operationsSharePct: number
  vehicleOwnerSharePct: number
  snapshot: ProfitDistributionSnapshot
}): Promise<ProfitDistribution>

export function profitDistributionErrorMessage(error: unknown): string
```

Use `.maybeSingle()` for settings, newest-first `.order('period_end', { ascending: false })` for history, and `.rpc(...).single()` for writes. Never expose or use a service-role key.

- [ ] **Step 5: Run tests and typecheck**

Run:

```bash
npm test -- admin/react/lib/profit-distributions.test.ts
npm run typecheck
```

Expected: PASS.

- [ ] **Step 6: Commit typed data access**

```bash
git add admin/react/types.ts admin/react/lib/profit-distributions.ts admin/react/lib/profit-distributions.test.ts
git commit -m "feat: add profit distribution data access"
```

---

### Task 5: Build the profit-distribution admin component

**Files:**
- Create: `admin/react/components/ProfitDistributionSection.tsx`
- Create: `admin/react/components/ProfitDistributionSection.test.tsx`

- [ ] **Step 1: Write first-time setup tests**

Render with `settings={null}` and assert:

- `Yeni dönem başlangıcı` is required;
- the confirmation states earlier trips are treated as distributed;
- submit calls `onSaveSettings` with 50/50;
- invalid/future dates are blocked;
- a retryable error preserves the entered date.

Use `getByRole`/`getByLabelText`; do not query CSS classes.

- [ ] **Step 2: Write preview and confirmation tests**

With settings and bookings fixtures, assert:

```tsx
expect(screen.getByText('Dağıtılmamış net kâr')).toBeVisible()
expect(screen.getByText('€900,00')).toBeVisible()
expect(screen.getAllByText('€450,00')).toHaveLength(2)
```

Then change the operations percentage to `60`, assert the vehicle-owner field becomes `40`, open confirmation, and verify `onCreateDistribution` is not called until the explicit confirm button is clicked.

Add blocked states for:

- end date today/later;
- negative/zero EUR profit;
- unresolved own-vehicle distance;
- missing daily KM;
- missing supplier cost;
- percentage precision or total errors;
- save in progress.

- [ ] **Step 3: Write history tests**

Assert newest-first rows show service interval, distribution timestamp, trip count, percentages, EUR shares, and TRY equivalents. Expanding a row must render only persisted financial columns from the distribution fixture; mutate the live booking/settings fixtures and confirm history text stays unchanged.

- [ ] **Step 4: Run component tests to verify failure**

Run: `npm test -- admin/react/components/ProfitDistributionSection.test.tsx`

Expected: FAIL because the component does not exist.

- [ ] **Step 5: Implement the component with narrow props**

Use this public boundary:

```tsx
interface ProfitDistributionSectionProps {
  today: string
  bookings: Booking[]
  settingsByMonth: Map<string, unknown>
  shareSettings: ProfitShareSettings | null
  distributions: ProfitDistribution[]
  loading: boolean
  error: string
  onRetry: () => void
  onSaveSettings: (input: SaveProfitShareSettingsInput) => Promise<void>
  onCreateDistribution: (input: CreateProfitDistributionInput) => Promise<void>
  navigate: Navigate
}
```

Derive `openStartDate` from the newest distribution's `period_end + 1 day`, otherwise settings opening date. Default end date to yesterday. Use `calculateProfitDistribution` and `buildProfitDistributionSnapshot` via `useMemo`.

Split internal render-only pieces in the same file unless they become independently reusable:

- `ProfitShareSetupForm`;
- `OpenDistributionPreview`;
- `DistributionConfirmation`;
- `DistributionHistory`.

Use a native `<details>` element for history expansion. Use `role="alert"` for blockers/errors and `role="status"` for save success. Ensure every input has a visible label.

- [ ] **Step 6: Implement exact Turkish UX copy**

Required labels/messages:

- `KÂR PAYLAŞIMI`
- `Dağıtılmamış net kâr`
- `Operasyon ortağı`
- `Araç sahibi`
- `Kârı dağıt`
- `Dağıtımı onayla`
- `Bu tarihten önce gerçekleşen seyahatler daha önce paylaşılmış kabul edilir.`
- `Dağıtım bitiş tarihi bugünden önce olmalıdır.`
- `Payların toplamı %100 olmalıdır.`
- `Net kâr oluşmadığı için bu dönem henüz dağıtılamaz.`

For incomplete bookings, show booking reference, leg/date, reason, and `Seyahate git` action using the existing detail hash convention.

- [ ] **Step 7: Run component tests**

Run: `npm test -- admin/react/components/ProfitDistributionSection.test.tsx`

Expected: PASS.

- [ ] **Step 8: Commit the component**

```bash
git add admin/react/components/ProfitDistributionSection.tsx admin/react/components/ProfitDistributionSection.test.tsx
git commit -m "feat: add profit distribution admin workflow"
```

---

### Task 6: Integrate the ledger into Kâr/Zarar and style it

**Files:**
- Modify: `admin/react/pages/ProfitLossPage.tsx:1-402`
- Modify: `admin/react/styles.css`
- Modify: `admin/react/react-migration.test.ts` if its component inventory requires the new file

- [ ] **Step 1: Add a failing page integration test or contract assertion**

Follow the existing admin React test convention. Assert that `ProfitLossPage` imports/mounts `ProfitDistributionSection` and its refresh path loads bookings, profit settings, share settings, and history together.

Run: `npm test -- admin/react/react-migration.test.ts`

Expected: FAIL on the new contract assertion.

- [ ] **Step 2: Extend page state and refresh**

Add:

```ts
const [shareSettings, setShareSettings] = useState<ProfitShareSettings | null>(null)
const [distributions, setDistributions] = useState<ProfitDistribution[]>([])
const [distributionError, setDistributionError] = useState('')
```

Update refresh to load the ledger in the same `Promise.all` as bookings/month settings, but isolate a ledger fetch failure so the existing Kâr/Zarar report remains usable. A retry in the section reloads only ledger data.

- [ ] **Step 3: Add save handlers and mount the section**

The setup handler calls `saveProfitShareSettings`, updates local settings only after success, and preserves existing report state.

The confirm handler:

1. recalculates the preview immediately before save;
2. rejects if blockers appeared or EUR profit is no longer positive;
3. builds a fresh immutable snapshot;
4. calls the atomic RPC;
5. reloads settings/history/bookings/month settings after success so stale costs cannot remain in the next preview.

Mount `ProfitDistributionSection` near the top of the Kâr/Zarar content, after monthly calculation settings and before the general profit hero.

- [ ] **Step 4: Add responsive, scoped styling**

In `admin/react/styles.css`, add only `profit-distribution-*` selectors. Match existing cards, borders, spacing, buttons, and positive/negative colors. Required layouts:

- desktop: summary and partner shares in a compact grid;
- tablet: two columns;
- mobile: one column with full-width date/percentage controls and confirmation buttons;
- long EUR/TRY values must wrap without horizontal page overflow;
- visible focus states and sufficient contrast for blocker text.

- [ ] **Step 5: Run focused UI tests and typecheck**

Run:

```bash
npm test -- admin/react/components/ProfitDistributionSection.test.tsx admin/react/react-migration.test.ts
npm run typecheck
npm run build:admin
```

Expected: PASS and successful admin production build.

- [ ] **Step 6: Commit integration**

```bash
git add admin/react/pages/ProfitLossPage.tsx admin/react/styles.css admin/react/react-migration.test.ts
git commit -m "feat: integrate profit distributions into admin"
```

---

### Task 7: Verify the complete feature and deployment readiness

**Files:**
- Modify if a discovered expectation is missing: `admin/profit-loss-metrics.test.js`
- Modify if a discovered expectation is missing: `admin/react/components/ProfitDistributionSection.test.tsx`
- Modify if a discovered expectation is missing: `supabase/tests/profit_distributions.sql`

- [ ] **Step 1: Run all automated checks**

```bash
npm test
npm run typecheck
npm run build:admin
supabase db reset --local
supabase test db supabase/tests/profit_distributions.sql --local
supabase db lint --local --level warning
supabase migration list --local
```

Expected: all Vitest and pgTAP tests pass, TypeScript reports no errors, admin build succeeds, migrations apply from zero, no new lint warnings, and local migration history includes the profit-distribution migration.

- [ ] **Step 2: Run the Supabase security checklist**

Confirm from migration SQL and database tests:

- RLS enabled on both new public tables;
- no anon table access or RPC execution;
- authenticated has SELECT only on tables;
- both functions revoke `PUBLIC` and `anon` execution explicitly;
- definer functions use `search_path = ''`, fully qualified relations, and `auth.uid()` rejection;
- no direct insert/update/delete path bypasses RPC sequencing;
- no service-role secret appears in browser code;
- RPC transaction locks only the singleton/latest rows and does no external work.

- [ ] **Step 3: Perform manual admin smoke testing**

Run: `npm run dev:admin`

Verify in the browser:

1. setup with an opening date that excludes yesterday;
2. opening date remains editable before the first distribution;
3. 50/50 preview for a known €900 profit shows €450/€450;
4. changing to 60/40 updates both EUR and TRY shares;
5. missing distance/cost produces a booking-linked blocker;
6. positive EUR with a negative TRY reference remains confirmable with a clear TRY display;
7. confirmation creates exactly one immutable history row;
8. refresh preserves history and advances start by one day;
9. a duplicate/stale confirmation returns a friendly message and no duplicate row;
10. mobile width has no horizontal overflow.

- [ ] **Step 4: Inspect the final diff for scope and secrets**

Run:

```bash
git status --short
git diff --check
git diff --stat HEAD~6..HEAD
rg -n "service_role|SUPABASE_SERVICE|TODO|FIXME" admin supabase docs/superpowers/plans/2026-08-21-profit-distribution.md
```

Expected: only planned files changed, no whitespace errors, no secrets, and no unresolved placeholders in implementation files.

- [ ] **Step 5: Commit any verification-only corrections**

Only if verification required changes:

```bash
git add <exact corrected test or implementation files>
git commit -m "test: verify profit distribution workflow"
```

- [ ] **Step 6: Stop before production migration**

Do not push the migration to the linked production Supabase project without a separate explicit deployment request. Report the generated migration filename and the local verification results for handoff.

