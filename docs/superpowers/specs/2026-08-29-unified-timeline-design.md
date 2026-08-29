# Unified Timeline Redesign — Admin

**Date:** 2026-08-29
**Area:** `admin/react` (TimelinePage, AdminChrome, App routing)

## Problem

Admin timeline splits transfers across `Gelecek` / `Geçmiş` / `İptaller` tabs. Problems:

1. Customer search only matches rows loaded for the active tab — searching in `Gelecek` misses past bookings. Operator must guess which tab a customer is in.
2. Past/future tabs are redundant — the month calendar already shows every day. Clicking into a "past" tab is unintuitive.
3. Future day-groups all render **open**, producing a long scroll. Only today matters at a glance.
4. `İptaller` is rarely needed but occupies a top-level tab.

## Goals

- One unified `Transferler` view. Default shows **today** (open) + future (collapsed).
- Search spans **all dates**, active + completed (excludes cancelled).
- Past data reachable on demand via the calendar, not a tab.
- Cancelled bookings demoted to a collapsed, lazy-loaded section at the bottom.
- Completed-today trips stay grouped in the existing "Tamamlananlar" sub-section.

## Non-Goals

- No change to `BookingCard` internals, detail page, or booking data model.
- No change to Bütçe / Kâr/Zarar / Şoför pages.
- Search does not surface cancelled bookings.

## Design

### 1. Tabs (`components/AdminChrome.tsx`)

- Remove `Gelecek`, `Geçmiş`, `İptaller`.
- Add single `Transferler` (route `#timeline`).
- Remaining: `Transferler`, `Bütçe`, `Kâr/Zarar`, `📱 Şoför`.
- `AdminView` type: `'timeline' | 'budget' | 'profit-loss' | 'driver-comms'`.

### 2. Routing (`App.tsx`)

- `selectedTab` collapses to `'timeline'` only for the timeline route (no `past` / `cancelled`).
- Drop `tab=past` and `tab=cancelled` parsing.
- Keep `?date=` deep-link for calendar navigation.
- `TimelinePage` prop simplifies: `selectedTab` removed or fixed to `'timeline'`; `initialDate` retained.

### 3. Data loading (`pages/TimelinePage.tsx`)

**Default `refresh`:** today + future only (drop the `isPast` branch):

```
status in [pending, paid, confirmed, in_transit, completed]
.or(pickup_date.gte.{today}, return_date.gte.{today}, service_end_date.gte.{today})
```

**Past on demand:** clicking a past calendar day fetches that single day's rows
(`pickup_date = date OR return_date = date OR daily-chauffeur span covers date`),
merges into `bookings` state deduped by `id`/`booking_ref`, then auto-expands +
scrolls to that day-group. No route change, no separate tab.

**Cache:** today-cache (`TODAY_CACHE_KEY`) logic unchanged — still caches today's rows for offline.

### 4. Search

- On non-empty `search`, debounce ~300ms then query Supabase across all dates:
  - `status in [pending, paid, confirmed, in_transit, completed]` (cancelled excluded)
  - server filter: `.or(customer_name.ilike, customer_phone.ilike, booking_ref.ilike)`
  - route/other matching stays client-side via `matchesBookingQuery` on the returned set.
- Results render as a **flat, date-sorted list** (nearest date first). Calendar rail,
  day-groups, and cancelled section are hidden while searching.
- Clearing search restores the today+future timeline (and any on-demand past days already merged).

### 5. Collapse behavior

- Day-groups default **collapsed** except today.
- Replace collapsed-set with expanded-set semantics:
  `open={groupDate === today || expandedDays.has(groupDate)}`.
- Seed expansion with `today` and any `initialDate` / calendar-selected day.
- Toggling a group updates `expandedDays`.
- Completed-today: keep existing `completed-group` `<details>` inside the today group
  ("Tamamlananlar (N)") — unchanged.

### 6. Cancelled section

- Collapsed `<details>` rendered at the very bottom, after the last day-group.
- Default **closed**. Label `İptal edilenler (N)`.
- **Lazy load:** fetch `status = 'cancelled'` rows only on first expand; cache in state.
- Render with existing `BookingCard` + `isCancelled` styling.
- Hidden while searching.

## Data Flow

```
mount → refresh() → today+future rows → groups (today open, rest collapsed)
calendar past day click → fetch that day → merge → expand+scroll
search input → debounce → DB query (all dates, non-cancelled) → flat list
cancelled <details> first open → fetch cancelled → render
```

## Edge Cases

- Offline: default today+future still served from cache; on-demand past + search + cancelled
  require network — show existing offline messaging, no crash.
- Round-trip / daily-chauffeur expansion (`expandRoundTrips`) unchanged; sort stays ascending
  for the unified forward timeline.
- On-demand past day already present in `bookings` (overlap with future query near today):
  dedup prevents duplicate cards.
- Search that returns a booking also present in the loaded timeline: flat list is the only
  view shown during search, so no duplication across views.

## Testing

- `timeline-logic` unit tests: expansion + dedup of merged past rows.
- Component/integration: default renders today open + future collapsed; search switches to flat
  list and excludes cancelled; cancelled section lazy-loads on expand; past calendar day merges.
- Existing `MonthCalendar` / `TimelinePage` tests updated for removed tabs.
