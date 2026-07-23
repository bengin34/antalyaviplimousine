# Admin Panel — Design Spec
Date: 2026-07-23

## Overview

Mobile-first driver admin panel for Antalya VIP Limousine. Drivers and owner use a shared login to view upcoming transfers grouped by day, update transfer status, and add notes.

## Goals

- Drivers see today's and tomorrow's transfers at a glance
- Status updates: confirmed → in_transit → completed (cancel always available)
- Note-taking per booking (e.g. "customer missed flight")
- Works well on a phone

## Out of Scope

- Per-driver assignment / separate driver accounts
- Booking creation or editing from admin panel
- Payment processing
- Push notifications

## Auth

- Single shared Supabase Auth account (`admin@antalyavip.com` + password)
- `supabase.auth.signInWithPassword()` on login
- Session stored by Supabase SDK (localStorage)
- On load: check session → redirect to login if missing
- Logout button in top bar

## UI Structure

### Login Screen
Simple centered form: email + password + button. No registration, no reset (owner manages credentials directly in Supabase dashboard).

### Main Screen — Timeline
- Top bar: "🚗 VIP Admin" + logout
- Stats strip: today count / tomorrow count / pending-action count
- Bookings grouped by day (Today / Tomorrow / Later)
- Within each day: chronological by pickup time
- Only shows bookings with status `confirmed`, `in_transit`, or `completed` (pending/paid are pre-admin payment states, filtered out)
- Each card shows:
  - Time + route (e.g. "09:30 AYT → Kemer")
  - Status badge (color-coded)
  - Customer name + phone
  - Flight number + arrival time (if present)
  - Hotel name
  - Guests + vehicle type + luggage count + child seat count
  - Payment method + amount + paid/unpaid indicator
  - Pickup address (if present / non-standard)

### Booking Detail Screen
Tapping a card opens the detail view (replaces main view, back arrow to return).

Sections:
1. Booking ref + status badge
2. Route + date + flight info
3. Customer (name, phone, email)
4. Transfer details (vehicle, guests, luggage, child seats, hotel)
5. Payment (method, amount, paid status)
6. Notes (list of existing notes + add-note input)
7. Status buttons: Confirmed / In Transit / Completed / Cancelled

Status button for current status is highlighted; others are outlined.

## Status Flow

```
confirmed → in_transit → completed
     ↘          ↘           ↘
                          cancelled (from any state)
```

`pending` and `paid` are payment-pipeline states — never shown in admin panel.

New statuses `in_transit` and `completed` require a migration to extend the check constraint.

## File Structure

```
admin/
  index.html          ← single HTML shell
  app.js              ← session check, view router
  login.js            ← login form + supabase.auth.signInWithPassword()
  timeline.js         ← query bookings, group by day, render cards
  booking-detail.js   ← detail view, note insert, status update
  admin.css           ← dark theme styles (mobile-first)

supabase/migrations/
  010_admin_rls.sql         ← RLS: authenticated users can SELECT all bookings,
                               UPDATE status, INSERT booking_notes
  011_add_status_values.sql ← extend status check: add 'in_transit', 'completed'
```

## Key Queries

```js
// Load upcoming bookings (confirmed and beyond)
supabase
  .from('bookings')
  .select('*, booking_notes(*)')
  .in('status', ['confirmed', 'in_transit', 'completed'])
  .gte('pickup_date', todayISO)
  .order('pickup_date')
  .order('flight_arrival_time', { nullsFirst: false })

// Update status
supabase.from('bookings').update({ status }).eq('id', bookingId)

// Add note
supabase.from('booking_notes').insert({ booking_id: bookingId, note })
```

## RLS Policies (migration 010)

```sql
-- Authenticated users can read all bookings
CREATE POLICY "admin_read_bookings" ON bookings
  FOR SELECT TO authenticated USING (true);

-- Authenticated users can update status only
CREATE POLICY "admin_update_booking_status" ON bookings
  FOR UPDATE TO authenticated
  USING (true)
  WITH CHECK (true);

-- Authenticated users can insert notes
CREATE POLICY "admin_insert_notes" ON booking_notes
  FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "admin_read_notes" ON booking_notes
  FOR SELECT TO authenticated USING (true);
```

## Visual Design

- Dark theme (#0d1117 background, #161b22 cards)
- Status colors: confirmed=green, in_transit=blue, completed=grey, cancelled=red
- Mobile-first, max-width 480px centered on desktop
- No external CSS framework — plain CSS

## Success Criteria

- Driver opens panel on phone, sees today's transfers in under 2 seconds
- Tapping a card shows all booking details
- Status update persists immediately
- Note saves and appears in list without page reload
