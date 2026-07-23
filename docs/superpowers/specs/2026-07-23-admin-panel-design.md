# Admin Panel — Design Spec
Date: 2026-07-23

## Overview

Mobile-first driver admin panel for Antalya VIP Limousine. Drivers and owner share a single login to view upcoming transfers grouped by day, update status, and add notes.

## Goals

- Drivers see every upcoming transfer, with Turkish weekday and full date headings
- Status updates: confirmed → in_transit → completed (cancel from confirmed/in_transit only)
- Note-taking per booking (append-only)
- Admin price and hotel-name adjustments for agreements or corrections made outside the site
- Customer contact from the detail screen through a direct WhatsApp chat link
- Works well on a phone

## Out of Scope

- Per-driver assignment / separate accounts
- Booking creation or editing beyond price and hotel-name corrections
- Refund processing for already-paid bookings
- Push notifications

---

## Database Changes

### Migration 010 — Add pickup_time column

```sql
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS pickup_time TIME;
-- No backfill: existing bookings have no reliable pickup time to derive.
-- New bookings will populate this field once the booking form is updated (separate task).
-- NULL pickup_time = time unknown; cards show "—" and sort to end of day group.
```

### Migration 011 — Extend status check constraint

Keep all existing values; add `in_transit` and `completed`:

```sql
ALTER TABLE bookings DROP CONSTRAINT IF EXISTS bookings_status_check;
ALTER TABLE bookings ADD CONSTRAINT bookings_status_check
  CHECK (status IN ('pending', 'paid', 'confirmed', 'in_transit', 'completed', 'cancelled'));
```

### Migration 012 — Admin RLS policies

`booking_notes` already exists (migration 001) with RLS enabled but no policies.

```sql
-- Restrict bookings UPDATE to status column only at DB level
REVOKE UPDATE ON bookings FROM authenticated;
GRANT UPDATE (status) ON bookings TO authenticated;

CREATE POLICY "admin_read_bookings" ON bookings
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "admin_update_bookings" ON bookings
  FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "admin_read_notes" ON booking_notes
  FOR SELECT TO authenticated USING (true);

-- Only allow notes for bookings that actually exist
CREATE POLICY "admin_insert_notes" ON booking_notes
  FOR INSERT TO authenticated
  WITH CHECK (EXISTS (SELECT 1 FROM bookings WHERE id = booking_id));
```

### Migration 014 — Allow admin price updates

Authenticated admins retain status updates and also receive column-level permission
to update `price_eur`; all other booking columns stay read-only.

### Migration 015 — Allow admin hotel updates

Authenticated admins also receive column-level permission to correct `hotel_name`.
All unrelated customer and transfer fields remain read-only.

---

## Auth

- Single shared Supabase Auth account (`admin@antalyavip.com` + password)
- `supabase.auth.signInWithPassword()` on login
- `autoRefreshToken: true` (Supabase SDK default — keep it enabled)
- Session expiry handled via `supabase.auth.onAuthStateChange`: on `SIGNED_OUT` event → redirect to `#login`
- Do not rely on HTTP 401 detection alone — refresh token expiry fires `SIGNED_OUT`, not 401
- Logout: `supabase.auth.signOut()` then `#login`
- Password rotation via Supabase dashboard. Existing sessions invalidated automatically.

---

## UI Structure

### Login Screen

Centered form: email + password + "Giriş Yap" button. Inline error on invalid credentials. No registration or in-app reset.

### Main Screen — Timeline

**Top bar:** "🚗 VIP Yönetim" + logout button

**Stats strip (counts visible transfer legs):**
- **Bugün:** operational legs (`pending`, `paid`, `confirmed`, `in_transit`) today
- **Yarın:** operational legs tomorrow
- **Aksiyon:** `pending` + `confirmed` legs today

**Booking list:** Grouped by exact date. Today and tomorrow retain their quick labels,
and every heading includes the Turkish weekday and full date. Cards are then sorted
client-side by display pickup time within each group (see Round-trip note below).

**Visible statuses:** `pending`, `paid`, `confirmed`, `in_transit`, `completed`.

**Query window:** All bookings with an outbound or return date today or later. After
round-trip expansion, past legs are removed so a future return remains visible even
when its outbound transfer has already happened.

**Empty state:** If no upcoming legs exist: "Gelecek transfer yok" + calendar icon.

**Each card shows:**
- `pickup_time` (or "—" if null) + route (pickup_location → dropoff_location)
- Status badge (color-coded)
- **"Dönüş"** tag if return leg of a round_trip
- Customer name + phone (tap-to-call `tel:` link)
- Flight number + arrival time (if present; return leg uses `return_flight_number`)
- Hotel name
- Guests + vehicle type + luggage count + child seat count (only if > 0)
- Payment method + price_eur
- Pickup address (only if present and non-empty)

**Round-trip display:** One DB row with `trip_type = 'round_trip'` produces **two virtual cards** in JS after fetch:
- Card 1: outbound (pickup_date, pickup_time, pickup_location→dropoff_location, flight_number, flight_arrival_time)
- Card 2: return leg (return_date, return_pickup_time, dropoff_location→pickup_location, return_flight_number, "Dönüş" badge)

After expanding round-trips, re-sort the full list client-side by `(pickup_date, display_pickup_time NULLS LAST)` so return-leg cards appear in correct time order within their day group. DB-level sort on `pickup_time` is insufficient because Card 2 uses `return_pickup_time`.

### Booking Detail Screen

Opened by tapping a card. Replaces timeline. Back arrow → `#timeline` + re-fetch bookings.

**URL:** `#detail/{booking_ref}` with optional `?leg=return` (booking_ref is
driver-readable; UUID is not exposed in the URL)

**booking_id (UUID) for note insertion:** Retrieved from JS state (the booking object fetched on timeline load). Never use `booking_ref` as the FK — `booking_notes.booking_id` expects the UUID `bookings.id`.

**Sections:**
1. Booking ref + status badge + "Dönüş" badge if return leg
2. Route + pickup date + `pickup_time` (or "—") + flight info
3. Customer: name, phone (WhatsApp link), email
   - phone opens the customer's WhatsApp chat without a pre-filled message
4. Transfer: vehicle type, guests, luggage count, child seat count, hotel name, pickup address
   - hotel name can be corrected inline
5. Payment: method, price_eur
   - `price_eur` can be edited inline and is persisted only after validation
6. Notes:
   - `bookings.notes` (if not empty): shown pinned at top as "Rezervasyon Notu" with a distinct visual treatment
   - `booking_notes` rows: ordered `created_at DESC` (newest first)
   - Add-note input + "Ekle" button
7. Status action buttons

---

## Status Flow

```
pending ──→ confirmed ──→ in_transit ──→ completed
   ↓             ↓               ↓
cancelled       cancelled       cancelled

paid ──→ in_transit ──→ completed
```

- **Cancel** available from `confirmed` and `in_transit` only. Button hidden when status is `completed`.
- Transitions to `cancelled`: show confirmation dialog — *"Bu transferi iptal etmek istediğinize emin misiniz?"*
- Other transitions: no confirmation required.
- **Optimistic UI:** update status badge immediately on tap.
- **On Supabase error** (JS error or `count === 0` from update): revert badge to previous status + show inline error — *"Güncelleme başarısız, tekrar deneyin."*
- Update query must use `{ count: 'exact' }` to detect 0-row-matched responses (e.g. booking deleted by another session between fetch and tap).

**Round-trip cancellation:** Both cards share one DB row. Cancelling from either card sets `status = 'cancelled'` — both cards disappear from the active timeline.

**Status colors:**
- `confirmed`: green border + green badge
- `in_transit`: blue border + blue badge
- `completed`: grey border + grey badge
- `cancelled`: red badge (not shown in active timeline)

---

## Timezone

All date boundary calculations use `Europe/Istanbul` (UTC+3). Never use `Date.toISOString()` for date math — it returns UTC and will produce wrong dates for drivers late evening.

```js
const todayISO = new Intl.DateTimeFormat('sv', { timeZone: 'Europe/Istanbul' }).format(new Date())
// 'sv' locale produces YYYY-MM-DD format
```

---

## Navigation / Routing

Hash-based routing (works on static hosting):
- `#login` → login screen
- `#timeline` → main timeline (default after auth)
- `#detail/{booking_ref}` → booking detail

On load: check Supabase session. No session → `#login`. Session exists → `#timeline`.
`supabase.auth.onAuthStateChange` listener running throughout session: `SIGNED_OUT` → `#login`.
Back from detail → `#timeline` + re-fetch bookings.

---

## File Structure

```
admin/
  index.html          ← single HTML shell, loads app.js as module
  app.js              ← session check, onAuthStateChange, hash router, view mount/unmount
  login.js            ← login form + supabase.auth.signInWithPassword()
  timeline.js         ← fetch (14-day window), expand round-trips, client-sort, group by day, render
  booking-detail.js   ← detail view, notes (bookings.notes + booking_notes), note insert, status update
  admin.css           ← dark theme, mobile-first (max-width 480px, centered on desktop)

supabase/migrations/
  010_add_pickup_time.sql
  011_add_status_values.sql
  012_admin_rls.sql
```

---

## Key Queries

```js
// Date window (Istanbul timezone)
const todayISO = new Intl.DateTimeFormat('sv', { timeZone: 'Europe/Istanbul' }).format(new Date())
const in14Days = new Date()
in14Days.setDate(in14Days.getDate() + 14)
const maxISO = new Intl.DateTimeFormat('sv', { timeZone: 'Europe/Istanbul' }).format(in14Days)

// Load bookings with notes
const { data } = await supabase
  .from('bookings')
  .select('*, booking_notes(id, note, created_at)')
  .in('status', ['confirmed', 'in_transit', 'completed'])
  .gte('pickup_date', todayISO)
  .lte('pickup_date', maxISO)
  .order('pickup_date')
  .order('pickup_time', { nullsFirst: false })

// Expand round-trips, then client-sort by (pickup_date, display_pickup_time nulls last)
const cards = data.flatMap(b => {
  const out = [{ ...b, _displayDate: b.pickup_date, _displayTime: b.pickup_time }]
  if (b.trip_type === 'round_trip' && b.return_date) {
    out.push({
      ...b,
      _isReturn: true,
      _displayDate: b.return_date,
      _displayTime: b.return_pickup_time,
      pickup_location: b.dropoff_location,
      dropoff_location: b.pickup_location,
      flight_number: b.return_flight_number,
      flight_arrival_time: null,
    })
  }
  return out
}).sort((a, b) => {
  if (a._displayDate !== b._displayDate) return a._displayDate.localeCompare(b._displayDate)
  if (!a._displayTime && !b._displayTime) return 0
  if (!a._displayTime) return 1
  if (!b._displayTime) return -1
  return a._displayTime.localeCompare(b._displayTime)
})

// Update status — check count to detect 0-row matches
const { count, error } = await supabase
  .from('bookings')
  .update({ status }, { count: 'exact' })
  .eq('booking_ref', bookingRef)
// if (error || count === 0) → revert optimistic update + show error

// Add note (booking_id is the UUID from JS state, not booking_ref)
await supabase.from('booking_notes').insert({ booking_id: booking.id, note })
```

---

## Success Criteria

- Today's transfers visible, sorted by pickup_time (nulls last)
- Round-trip return leg appears as separate card with "Dönüş" tag, sorted in correct time order
- Cards with null pickup_time show "—" and sort to end of day group
- Both note sources shown: bookings.notes pinned + booking_notes DESC
- Status update reflects immediately; 0-row or error reverts badge and shows message
- Cancel requires confirmation; button hidden from completed state
- Note saves and appears at top without page reload
- Back from detail re-fetches timeline
- All date math uses Europe/Istanbul timezone
- SIGNED_OUT auth event → redirect to #login
