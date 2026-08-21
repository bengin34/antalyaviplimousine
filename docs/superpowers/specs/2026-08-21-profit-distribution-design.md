# Profit Distribution Design

## Purpose

Add a profit-sharing ledger to the existing admin Kâr/Zarar page for the two business partners: the online/operations partner and the vehicle-owner partner. The system must show profit earned since the last distribution, split it in EUR using configurable percentages, show the TRY equivalents, and preserve every confirmed distribution as an immutable historical snapshot.

## Confirmed Business Rules

- Only realized, non-cancelled trip legs contribute to distributable profit.
- The ledger uses EUR as its primary distribution currency. TRY totals remain visible and are snapshotted for reference.
- The default ownership split is 50% / 50%.
- The two percentages may be changed for an individual distribution, but they must each be between 0 and 100 and must total exactly 100%.
- On first use, the admin manually chooses the first undistributed service date. Trips before that date are treated as already settled and never enter the new ledger.
- The chosen opening date is inclusive. For example, choosing `2026-08-21` excludes trips on `2026-08-20` and includes trips from `2026-08-21` onward.
- Each distribution covers one contiguous, closed calendar interval. Its start is the configured opening date or the day after the previous distribution's end. The admin chooses the end date.
- A distribution end date must be earlier than the current date in the Europe/Berlin business timezone. This prevents a later trip on the same day from being omitted after the day has already been closed.
- A new distribution interval may not overlap or leave a gap after a prior interval.
- A distribution can be confirmed only when cumulative net profit for its interval is greater than zero.
- If the interval is at a loss or exactly zero, no distribution record is created. The same start date remains open and a later end date automatically carries that result forward.
- Confirmed distributions are read-only in the first version. There is no edit, delete, reversal, or correction workflow.

## Existing System Context

The current `admin/profit-loss-metrics.js` module resolves bookings into realized trip legs and calculates:

- EUR and TRY revenue using the configured monthly EUR/TRY rate;
- own-vehicle cost from distance and monthly TRY/km cost;
- sold-transfer supplier cost;
- airport meet cost;
- monthly advertising expense;
- total expense and net profit in EUR and TRY.

The new ledger must reuse these rules instead of maintaining a second, divergent profit formula. The existing monthly and all-time Kâr/Zarar views remain unchanged.

## User Experience

### First-time setup

The Kâr/Zarar page shows a `Kâr Paylaşımı` section. If no ledger configuration exists, it shows a short explanation and one required `Yeni dönem başlangıcı` date field.

Submitting the date creates the singleton profit-sharing configuration with:

- opening date;
- default online/operations partner percentage: 50;
- default vehicle-owner percentage: 50.

The setup confirmation explicitly states that earlier trip dates are considered already distributed. Once the first distribution exists, the opening date can no longer be changed. Before the first distribution, it may be corrected from the same section.

### Open-period summary

After setup, the section shows:

- open period start date;
- selectable end date, defaulting to yesterday in Europe/Berlin;
- number of realized trip legs in the interval;
- income, vehicle cost, supplier cost, airport meet cost, allocated advertising cost, and net profit;
- each figure in EUR, with its TRY equivalent where available;
- a clear `Dağıtılmamış net kâr` total;
- the two percentage inputs, initially populated from the saved defaults;
- the calculated EUR and TRY share for each partner.

The preview recalculates immediately when the end date or percentages change. Ratio changes apply only to the pending distribution and do not rewrite the saved defaults or previous distributions.

### Confirmation

`Kârı dağıt` opens an inline confirmation summary containing the exact interval, trip count, net profit, percentages, and partner amounts. Confirming creates one immutable distribution snapshot. The UI then refreshes and advances the open-period start to the next calendar day.

The action is disabled when:

- the end date is before the open-period start;
- the end date is today or later;
- either percentage is invalid or their total is not 100%;
- net profit is zero or negative;
- any required distance or cost input prevents the interval from having a complete expense calculation;
- the save is already in progress.

The UI must explain the specific blocking reason rather than failing silently.

### History

Below the open period, newest-first history rows show:

- distribution date and covered service-date interval;
- realized trip-leg count;
- snapshotted net profit in EUR and TRY;
- the two percentages;
- each partner's EUR share and TRY equivalent.

Expanding a row shows the snapshotted income and expense buckets. Historical values never recalculate when bookings, exchange rates, kilometre costs, supplier costs, or advertising settings are later changed.

## Date and Realization Semantics

All period boundaries use trip-leg service dates, not booking creation dates:

- outbound uses `pickup_date`;
- return uses `return_date`;
- daily chauffeur uses each `chauffeur_hire_days.service_date`.

Only dates earlier than today can be closed. For those closed dates, the existing realization rules apply: cancelled bookings are excluded; all other past-dated legs are treated as realized. This matches the current Kâr/Zarar calculation.

Round trips continue to split booking revenue and sold-transfer cost equally between outbound and return legs. A distribution interval includes only the leg whose service date falls inside it.

## Advertising Expense Allocation

Monthly advertising expense must not be charged twice when distributions split a month. For distribution calculations, allocate it by calendar day:

```text
allocated advertising TRY
  = monthly advertising TRY
  × closed days from that month inside the distribution interval
  ÷ total calendar days in that month
```

The EUR value uses that month's saved EUR/TRY rate. Contiguous distributions covering a complete month therefore allocate exactly the configured monthly advertising total. An opening date in the middle of a month intentionally excludes the earlier portion because those dates are declared already settled.

All other revenue and costs remain trip-leg based and use the monthly settings belonging to each leg's service month.

## Calculation Boundaries

Extract shared leg resolution from `calculateProfitLossMetrics` so monthly reports and distribution previews call the same core logic. Add a date-range calculation entry point that:

1. accepts bookings, inclusive start/end dates, today, and monthly settings;
2. resolves only eligible realized legs in the interval;
3. reports unresolved own-vehicle legs instead of treating their expense as zero;
4. prorates advertising by closed calendar days;
5. returns the same income and expense buckets plus the exact resolved-leg snapshot;
6. calculates partner shares from net EUR and net TRY independently using the chosen percentages;
7. rounds persisted money values to two decimal places, assigning any one-cent EUR rounding remainder to the second partner so the two shares exactly equal the snapshotted net profit.

The existing monthly calculation keeps its current whole-month advertising behavior and output contract.

## Data Model

### `profit_share_settings`

A singleton authenticated-admin table:

- `id SMALLINT PRIMARY KEY CHECK (id = 1)`
- `opening_date DATE NOT NULL`
- `default_operations_share_pct NUMERIC(5,2) NOT NULL DEFAULT 50`
- `default_vehicle_owner_share_pct NUMERIC(5,2) NOT NULL DEFAULT 50`
- `created_at TIMESTAMPTZ NOT NULL DEFAULT now()`
- `updated_at TIMESTAMPTZ NOT NULL DEFAULT now()`
- constraints enforcing each percentage from 0 through 100 and an exact total of 100.

The first version uses fixed UI labels `Operasyon ortağı` and `Araç sahibi`; editable partner profiles are out of scope.

### `profit_distributions`

One row per confirmed distribution:

- identity and audit fields: `id UUID`, `created_at`, `created_by UUID` when available from `auth.uid()`;
- period fields: `period_start DATE`, `period_end DATE`;
- applied shares: operations and vehicle-owner percentages;
- partner results: both partners' EUR and TRY amounts;
- financial snapshot: income EUR/TRY, vehicle cost TRY, supplier cost TRY, airport cost EUR/TRY, advertising cost EUR/TRY, total expense EUR/TRY, net profit EUR/TRY, realized leg count;
- `calculation_snapshot JSONB` containing resolved leg identifiers and per-leg snapshot values plus monthly settings used by the calculation.

Database constraints enforce:

- `period_end >= period_start`;
- positive EUR and TRY net profit;
- percentages total exactly 100;
- both partner shares total the corresponding net profit;
- no overlapping date ranges.

Authenticated admins may select and insert. Update and delete are not granted in the first version.

### Atomic creation

An authenticated database function creates a distribution inside one transaction. It locks the singleton settings row and most recent distribution, verifies the expected next start date and absence of overlap, then inserts the supplied validated snapshot. The client must pass its expected start date; stale concurrent submissions fail cleanly and trigger a refresh.

The database function protects interval sequencing and double submission. The current application remains the source of the detailed calculation because route-distance resolution already lives in the tested JavaScript calculation module.

## Components and File Responsibilities

- `admin/profit-loss-metrics.js`: shared leg resolution, range calculation, advertising proration, and share rounding.
- `admin/profit-loss-metrics.test.js`: unit coverage for date boundaries, carry-forward loss, proration, split legs, unresolved expenses, ratios, and rounding.
- `admin/react/pages/ProfitLossPage.tsx`: data loading and integration with the existing page.
- `admin/react/components/ProfitDistributionSection.tsx`: setup form, open-period preview, confirmation, errors, and history.
- `admin/react/components/ProfitDistributionSection.test.tsx`: focused interaction and rendering tests.
- `admin/react/types.ts`: settings and distribution TypeScript types.
- `admin/react/styles.css`: responsive styles following the existing Kâr/Zarar visual language.
- a new timestamped Supabase migration: tables, constraints, RLS grants/policies, and atomic creation function.

## Error Handling and Concurrency

- Loading failures preserve the rest of the Kâr/Zarar page and show a retryable error inside the distribution section.
- Database validation messages are mapped to concise Turkish user messages.
- A stale or duplicate confirmation does not create a second row. The section refreshes and reports that another distribution already closed the interval.
- Failed saves leave the preview intact so the admin can retry.
- Invalid or missing calculation inputs identify the affected trip and link to its existing booking detail/edit flow.
- No optimistic success state is shown until the database function returns the inserted distribution.

## Testing and Acceptance Criteria

Automated tests must prove:

- opening date is inclusive and excludes all earlier legs;
- distribution end must be before today;
- one-way, round-trip, and daily-chauffeur legs use their service dates correctly;
- cancelled and future legs are excluded;
- sold-transfer and own-vehicle costs match the existing report rules;
- unresolved distance prevents distribution;
- advertising is prorated correctly across partial months, leap years, and intervals crossing months;
- adjacent distribution periods cannot overlap or leave gaps;
- a negative open interval stays open and becomes distributable after later profitable trips;
- 50/50 is the default and custom valid ratios calculate correctly;
- invalid ratios are blocked;
- rounded partner amounts exactly reconcile to net EUR and TRY;
- confirmed history displays snapshot values even if source bookings/settings change in a test fixture;
- duplicate/stale submissions return an error and insert only one record;
- existing Kâr/Zarar tests continue to pass unchanged.

Manual verification must cover initial setup, a positive preview, a blocked negative preview, confirmation, automatic next-period advancement, history expansion, mobile layout, and a refresh proving persisted data is stable.

## Out of Scope

- bank transfers or payment-provider integration;
- marking each partner's payment as separately paid;
- editing, deleting, or reversing a confirmed distribution;
- custom partner names or more than two partners;
- attachments, receipts, PDF exports, or accounting-system export;
- changing the existing booking income/cost model.

