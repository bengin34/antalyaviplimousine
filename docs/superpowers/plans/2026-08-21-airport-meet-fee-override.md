# Airport Meet-Fee Override Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Allow administrators to remove the airport meet-and-greet cost for an individual airport-origin booking.

**Architecture:** Store a boolean opt-out on the booking, defaulting to `true` to preserve all existing results. Pass that field into the profit-loss query and gate the per-leg €5 calculation on it. Expose the persisted value in the booking-detail editor only where it applies.

**Tech Stack:** Supabase/PostgreSQL migrations, React/TypeScript, JavaScript profit metrics, Vitest.

---

### Task 1: Persist the booking preference

**Files:**
- Create: `supabase/migrations/20260821130000_add_airport_meet_fee_override.sql`
- Modify: `admin/react/types.ts`

- [ ] **Step 1: Write the failing metric test**

Add a booking with `airport_meet_fee_applies: false` to `admin/profit-loss-metrics.test.js`; assert both airport-meet totals are zero.

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- admin/profit-loss-metrics.test.js`

Expected: FAIL because the calculator ignores the new persisted flag.

- [ ] **Step 3: Add persistence surface**

Create a migration that adds `airport_meet_fee_applies BOOLEAN NOT NULL DEFAULT TRUE` and grants authenticated admins permission to update it. Add the nullable optional field to `Booking` so pre-migration reads remain valid.

- [ ] **Step 4: Run the metric test again**

Run: `npm test -- admin/profit-loss-metrics.test.js`

Expected: still FAIL until Task 2 implements the calculation.

### Task 2: Gate profit/loss costs on the preference

**Files:**
- Modify: `admin/profit-loss-metrics.js:460-464`
- Modify: `admin/react/pages/ProfitLossPage.tsx:49`
- Test: `admin/profit-loss-metrics.test.js`

- [ ] **Step 1: Implement the minimal calculation change**

Change the airport meet-cost condition to require `booking.airport_meet_fee_applies !== false`, preserving the €5 default for absent values. Include the field in the profit-loss booking select list.

- [ ] **Step 2: Run the focused test**

Run: `npm test -- admin/profit-loss-metrics.test.js`

Expected: PASS.

- [ ] **Step 3: Commit**

```bash
git add admin/profit-loss-metrics.js admin/profit-loss-metrics.test.js admin/react/pages/ProfitLossPage.tsx admin/react/types.ts supabase/migrations/20260821130000_add_airport_meet_fee_override.sql
git commit -m "feat: allow airport meet fee overrides"
```

### Task 3: Expose the setting in the booking editor

**Files:**
- Modify: `admin/react/types.ts`
- Modify: `admin/react/pages/BookingDetailPage.tsx:45-160`
- Test: new or existing `admin/react/pages/BookingDetailPage.test.tsx`

- [ ] **Step 1: Write a failing editor interaction test**

Render an airport-origin own-vehicle booking, choose the opt-out checkbox, save, and assert the Supabase update receives `airport_meet_fee_applies: false`.

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- admin/react/pages/BookingDetailPage.test.tsx`

Expected: FAIL because the checkbox and payload do not exist.

- [ ] **Step 3: Implement the minimal editor changes**

Add `airportMeetFeeApplies` to the shared `BookingFormState` and `validateBookingForm` payload, initialise it from the stored value with a true default, and render the opt-out checkbox only for airport-origin, non-daily bookings. The checkbox is checked only when the stored value is `false`; the payload persists its inverse.

- [ ] **Step 4: Run the editor test**

Run: `npm test -- admin/react/pages/BookingDetailPage.test.tsx`

Expected: PASS.

- [ ] **Step 5: Run all relevant checks**

Run: `npm test -- admin/profit-loss-metrics.test.js admin/react/pages/BookingDetailPage.test.tsx admin/react/pages/ProfitLossPage.test.tsx`

Expected: PASS.
