# Admin Panel — Search Extension & WhatsApp Templates

**Date:** 2026-08-01
**Status:** Approved design, pending implementation plan

## Overview

Two independent admin-panel improvements for the Antalya VIP transfer booking system:

1. **Search extension** — extend the existing timeline search so a booking can be found by customer name, phone, booking reference, or route (not just name).
2. **WhatsApp template messages** — one-click, pre-filled `wa.me` links from the booking detail screen that open WhatsApp with a ready-to-send localized message (confirmation and day-before reminder). Optional free-text driver name / vehicle plate fields feed the reminder.

Both features are manual-trigger and require no backend, no WhatsApp Business API, and no message-sending cost. The admin clicks a link; WhatsApp opens with the message drafted; the admin presses send.

## Feature A — Search Extension

### Current state

`admin/timeline.js` already renders a search input (`#customer-search`, timeline.js:539-541) and wires it (`searchInput` listener, timeline.js:758-759). The filter (timeline.js:625-628) currently matches only `customer_name`:

```js
const q = searchQuery.trim().toLocaleLowerCase('tr-TR')
const sourceBookings = q
  ? (bookings ?? []).filter(b => String(b.customer_name ?? '').toLocaleLowerCase('tr-TR').includes(q))
  : bookings ?? []
```

### Change

Extend the filter predicate to match, case-insensitively, any of:

- `customer_name`
- `customer_phone` — normalized by stripping non-digits from both the query and the stored value, so `+90 5xx`, `0 5xx`, and `905xx` all match. A query with no digits skips the phone comparison.
- `booking_ref`
- route — `pickup_location` and `dropoff_location` (match if the query appears in either).

Filtering stays on the raw `bookings` array before `expandRoundTrips`, so `booking_ref` matching works for both legs of a round trip (existing behavior preserved).

Update the placeholder text (timeline.js:540) to: `"İsim, telefon, kod veya güzergah ara…"`.

### Scope / non-goals

- Search remains scoped to the currently selected tab (Gelecek / Geçmiş). No cross-tab search. This matches current behavior; a customer calling about an upcoming transfer is found on the default Gelecek tab.
- No new UI, no new route, no schema change.

## Feature B — WhatsApp Template Messages

### B1. Driver fields (optional, nullable)

New migration adds two nullable columns to `bookings`:

- `driver_name TEXT`
- `vehicle_plate TEXT`

RLS: the admin `UPDATE` grant is column-level and cumulative-by-full-replacement. The current state is `supabase/migrations/018_add_dropoff_address.sql`, which does `REVOKE UPDATE ON bookings FROM authenticated;` then a single `GRANT UPDATE (...)` re-listing every grantable column. The new migration must copy **018's entire column list verbatim** and append `driver_name`, `vehicle_plate`. Granting only the two new columns would silently revoke update access to all columns 018 added — do **not** mirror 017 (its shorter list is superseded).

In `admin/booking-detail.js`, add two field editors using the existing `setupFieldEditor` infrastructure (the same mechanism already used for email/address editing). Empty values display as `—`. There is a single vehicle/driver for now, so these fields may routinely stay blank.

### B2. `whatsappURL` extension (backward compatible)

`admin/turkish-formatters.js` currently exports:

```js
export function whatsappURL(phone) { … return `https://wa.me/${digits}` }
```

Add an optional second parameter `text`:

- `whatsappURL(phone)` → `https://wa.me/<digits>` (unchanged)
- `whatsappURL(phone, text)` → `https://wa.me/<digits>?text=<encodeURIComponent(text)>`

The three existing single-argument call sites (booking-detail.js:333, booking-detail.js:360, timeline.js:255) are unaffected.

### B3. New module `admin/whatsapp-templates.js`

Exports two pure functions that take a booking object and return a string:

- `buildConfirmMessage(booking)`
- `buildReminderMessage(booking)`

Language is chosen from `booking.language` (`en` / `de` / `ru` / `tr`), falling back to `en` for any unknown/missing value. Each language has its own text block held in a simple dictionary object keyed by language code.

**Localization boundary:** only sentence text and field labels are translated. Location/place names (e.g. "Antalya Havalimanı"), the route arrow, dates, times, prices, guest count, driver name, and plate are inserted verbatim — they are universal and not translated.

**Confirmation message contents:**
- Greeting + booking reference (`booking_ref`)
- Date (`pickup_date`)
- Pickup time (`pickup_time` / flight-derived start). Reuse the timeline's existing `transferStartTime` helper (timeline.js:48) rather than reimplementing the flight-arrival derivation.
- Route: `pickup_location → dropoff_location`
- Vehicle (`vehicle_type`)
- Guest count (`guests`)
- Price (`price_eur`)
- Meeting note

**Reminder message contents:** (for a round-trip booking, the reminder targets the **outbound leg** — `pickup_date` / pickup time / `pickup_location`; the return leg is not covered by this template)
- Date and time of the outbound transfer
- Meeting point (hotel / pickup location)
- Driver name + vehicle plate — only if both/either present; the line is omitted entirely when empty
- Contact line

### B4. Booking-detail buttons

Add two buttons in `admin/booking-detail.js`, placed alongside the existing WhatsApp link (booking-detail.js:360):

- "WhatsApp: Onay gönder" → opens `whatsappURL(booking.customer_phone, buildConfirmMessage(booking))` in a new tab
- "WhatsApp: Hatırlatma gönder" → opens `whatsappURL(booking.customer_phone, buildReminderMessage(booking))` in a new tab

Both open in a new tab (`target="_blank" rel="noopener noreferrer"`), matching existing WhatsApp links. WhatsApp opens with the message drafted; the admin presses send manually.

## Files touched

| File | Change |
|------|--------|
| `admin/timeline.js` | Extend search filter predicate; update placeholder text |
| `supabase/migrations/0XX_add_driver_fields.sql` | New: add `driver_name`, `vehicle_plate` + admin update RLS |
| `admin/turkish-formatters.js` | `whatsappURL` optional `text` param |
| `admin/whatsapp-templates.js` | New module: `buildConfirmMessage`, `buildReminderMessage` |
| `admin/booking-detail.js` | Two driver field editors; two WhatsApp template buttons |

## Testing considerations

- Search: matching by each of name / phone (across `+90`, `0`, bare formats) / booking_ref / route; empty query returns all; tab scoping preserved; round-trip legs both match on ref.
- `whatsappURL`: single-arg unchanged; two-arg produces correctly `encodeURIComponent`-encoded `?text=`.
- Templates: each of en/de/ru/tr produces expected labels; unknown language falls back to en; driver line present only when data present; location names / prices inserted verbatim.

## Non-goals

- No automated / scheduled sending, no WhatsApp Business API, no Twilio.
- No separate driver-info message template (folded into reminder).
- No full driver management / assignment system (single vehicle for now).
- No cross-tab search.
