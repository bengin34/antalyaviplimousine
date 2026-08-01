# Search Extension & WhatsApp Templates Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Extend the admin timeline search to match name/phone/booking_ref/route, and add one-click pre-filled WhatsApp confirmation & reminder messages (localized) from the booking detail screen.

**Architecture:** Pure, testable helper functions (search predicate, `whatsappURL` text param, message builders) live in small modules and are unit-tested with vitest. DOM wiring in `timeline.js` and `booking-detail.js` reuses existing infrastructure (`setupFieldEditor`, existing WhatsApp links). A new nullable-column migration plus a full-column-list RLS grant enables editing driver name / plate.

**Tech Stack:** Vanilla ES modules, Vite, Supabase (Postgres + RLS), vitest (added here), wa.me deep links.

**Spec:** `docs/superpowers/specs/2026-08-01-search-whatsapp-templates-design.md`

---

## File Structure

| File | Responsibility |
|------|----------------|
| `package.json` | Add vitest devDependency + `test` script |
| `admin/whatsapp-templates.js` | **New.** Pure `buildConfirmMessage` / `buildReminderMessage`; localized text dictionary |
| `admin/search-match.js` | **New.** Pure `matchesBookingQuery(booking, query)` predicate (extracted so it is unit-testable without DOM) |
| `admin/turkish-formatters.js` | `whatsappURL(phone, text?)` optional text param |
| `admin/timeline.js` | Use `matchesBookingQuery` in the filter; update placeholder text |
| `admin/booking-detail.js` | Two driver-field editors; two WhatsApp template buttons |
| `supabase/migrations/023_add_driver_fields.sql` | **New.** Add `driver_name`, `vehicle_plate`; re-grant full admin UPDATE column list |
| `admin/*.test.js` | Unit tests colocated with the modules under test |

Ordering: tooling first (Task 1), then pure leaf functions with tests (Tasks 2–4), then DOM wiring that consumes them (Tasks 5–6), then migration (Task 7). Migration is independent of JS and can be applied any time; placed last so code review sees the whole feature.

---

## Task 1: Add vitest tooling

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Add vitest devDependency and test script**

In `package.json`, add to `devDependencies`:

```json
"vitest": "^3.0.0"
```

Add to `scripts`:

```json
"test": "vitest run",
"test:watch": "vitest"
```

- [ ] **Step 2: Install**

Run: `npm install`
Expected: vitest added to `node_modules`, `package-lock.json` updated, exit 0.

- [ ] **Step 3: Sanity test**

Create `admin/smoke.test.js`:

```js
import { test, expect } from 'vitest'

test('vitest runs', () => {
  expect(1 + 1).toBe(2)
})
```

- [ ] **Step 4: Run**

Run: `npm test`
Expected: 1 passed.

- [ ] **Step 5: Remove smoke test and commit**

```bash
rm admin/smoke.test.js
git add package.json package-lock.json
git commit -m "chore: add vitest for admin unit tests"
```

---

## Task 2: `whatsappURL` optional text param

**Files:**
- Modify: `admin/turkish-formatters.js:104-111`
- Test: `admin/turkish-formatters.test.js`

- [ ] **Step 1: Write the failing test**

Create `admin/turkish-formatters.test.js`:

```js
import { test, expect } from 'vitest'
import { whatsappURL } from './turkish-formatters.js'

test('no text arg returns bare wa.me link (unchanged)', () => {
  expect(whatsappURL('+90 555 111 22 33')).toBe('https://wa.me/905551112233')
})

test('text arg appends url-encoded ?text=', () => {
  const url = whatsappURL('05551112233', 'Merhaba & hoş geldiniz')
  expect(url).toBe('https://wa.me/905551112233?text=' + encodeURIComponent('Merhaba & hoş geldiniz'))
})

test('empty/undefined text keeps bare link', () => {
  expect(whatsappURL('05551112233', '')).toBe('https://wa.me/905551112233')
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run admin/turkish-formatters.test.js`
Expected: FAIL — the two-arg cases fail (text ignored).

- [ ] **Step 3: Implement**

In `admin/turkish-formatters.js`, replace the function body:

```js
export function whatsappURL(phone, text) {
  let digits = String(phone ?? '').replace(/\D/g, '')
  if (digits.startsWith('00')) digits = digits.slice(2)
  if (digits.startsWith('0')) digits = `90${digits.slice(1)}`
  if (/^5\d{9}$/.test(digits)) digits = `90${digits}`

  const base = `https://wa.me/${digits}`
  return text ? `${base}?text=${encodeURIComponent(text)}` : base
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run admin/turkish-formatters.test.js`
Expected: 3 passed.

- [ ] **Step 5: Commit**

```bash
git add admin/turkish-formatters.js admin/turkish-formatters.test.js
git commit -m "feat: whatsappURL supports optional prefilled text"
```

---

## Task 3: Search-match predicate

**Files:**
- Create: `admin/search-match.js`
- Test: `admin/search-match.test.js`

- [ ] **Step 1: Write the failing test**

Create `admin/search-match.test.js`:

```js
import { test, expect } from 'vitest'
import { matchesBookingQuery } from './search-match.js'

const booking = {
  customer_name: 'Ahmet Yılmaz',
  customer_phone: '+90 555 111 22 33',
  booking_ref: 'VIP-2026-0042',
  pickup_location: 'Antalya Havalimanı',
  dropoff_location: 'Belek',
}

test('empty query matches everything', () => {
  expect(matchesBookingQuery(booking, '')).toBe(true)
  expect(matchesBookingQuery(booking, '   ')).toBe(true)
})

test('matches by name, case-insensitive Turkish', () => {
  expect(matchesBookingQuery(booking, 'ahmet')).toBe(true)
  expect(matchesBookingQuery(booking, 'yılmaz')).toBe(true)
})

test('matches by phone regardless of formatting', () => {
  expect(matchesBookingQuery(booking, '5551112233')).toBe(true)
  expect(matchesBookingQuery(booking, '0555 111')).toBe(true)
  expect(matchesBookingQuery(booking, '90555')).toBe(true)
})

test('matches by booking ref', () => {
  expect(matchesBookingQuery(booking, 'vip-2026-0042')).toBe(true)
  expect(matchesBookingQuery(booking, '0042')).toBe(true)
})

test('matches by pickup or dropoff location', () => {
  expect(matchesBookingQuery(booking, 'havaliman')).toBe(true)
  expect(matchesBookingQuery(booking, 'belek')).toBe(true)
})

test('non-matching query returns false', () => {
  expect(matchesBookingQuery(booking, 'zzz')).toBe(false)
})

test('handles missing fields without throwing', () => {
  expect(matchesBookingQuery({}, 'anything')).toBe(false)
  expect(matchesBookingQuery({}, '')).toBe(true)
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run admin/search-match.test.js`
Expected: FAIL — module not found.

- [ ] **Step 3: Implement**

Create `admin/search-match.js`:

```js
// Pure predicate for the admin timeline search box. Matches a booking against a
// free-text query by name, phone, booking reference, or route. Extracted from
// timeline.js so it can be unit-tested without a DOM.
export function matchesBookingQuery(booking, query) {
  const q = String(query ?? '').trim().toLocaleLowerCase('tr-TR')
  if (!q) return true

  const lower = (v) => String(v ?? '').toLocaleLowerCase('tr-TR')
  if (lower(booking.customer_name).includes(q)) return true
  if (lower(booking.booking_ref).includes(q)) return true
  if (lower(booking.pickup_location).includes(q)) return true
  if (lower(booking.dropoff_location).includes(q)) return true

  // Phone: compare digits only, so +90 / 0 / bare formats all match.
  const qDigits = q.replace(/\D/g, '')
  if (qDigits) {
    const phoneDigits = String(booking.customer_phone ?? '').replace(/\D/g, '')
    if (phoneDigits.includes(qDigits)) return true
  }

  return false
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run admin/search-match.test.js`
Expected: 7 passed.

- [ ] **Step 5: Commit**

```bash
git add admin/search-match.js admin/search-match.test.js
git commit -m "feat: add booking search-match predicate (name/phone/ref/route)"
```

---

## Task 4: WhatsApp message templates

**Files:**
- Create: `admin/whatsapp-templates.js`
- Test: `admin/whatsapp-templates.test.js`

**Notes for implementer:**
- Language comes from `booking.language` (`en`/`de`/`ru`/`tr`); unknown/missing → `en`.
- Only labels/sentences are translated. Dates, times, prices, guest count, driver name, plate are inserted verbatim.
- **Locations are stored as slugs**, not display names: `booking.pickup_location` is e.g. `'airport'`, `'belek'`, `'private_address'` (see `LOCATION_OPTIONS` in `booking-new.js:3`). The route MUST be rendered through `locationDisplay(value, address)` (`turkish-formatters.js:34`) — which maps `'airport'`→`'Antalya Havalimanı'`, and for `'private_address'` returns the address string. Pass `pickup_address`/`dropoff_address` as the second arg. Do NOT print raw slugs.
- Reminder uses the **outbound leg** (`pickup_date`, pickup time, `pickup_location`) even for round trips.
- Pickup time: reuse `transferStartTime(pickup_location, pickup_time, flight_arrival_time)` from `timeline.js:48`. Export it from `timeline.js` if not already exported, OR duplicate the tiny helper into a shared spot — prefer exporting to stay DRY. Check its current signature before wiring.
- Driver line appears only when `driver_name` or `vehicle_plate` is non-empty; otherwise omit the whole line.

- [ ] **Step 1: Write the failing test**

Create `admin/whatsapp-templates.test.js`:

```js
import { test, expect } from 'vitest'
import { buildConfirmMessage, buildReminderMessage } from './whatsapp-templates.js'

// Locations are SLUGS (as stored in the DB), not display names.
const base = {
  booking_ref: 'VIP-2026-0042',
  customer_name: 'Ahmet Yılmaz',
  pickup_date: '2026-08-15',
  pickup_time: '10:30',
  pickup_location: 'airport',
  dropoff_location: 'belek',
  vehicle_type: 'vclass',
  guests: 3,
  price_eur: 55,
  language: 'en',
}

test('confirm message maps location slugs to display names in the route', () => {
  const msg = buildConfirmMessage(base)
  expect(msg).toContain('VIP-2026-0042')
  expect(msg).toContain('Antalya Havalimanı')   // 'airport' → display name
  expect(msg).toContain('Belek')                // 'belek' → display name
  expect(msg).not.toContain('airport')          // no raw slug leaks
  expect(msg).toContain('2026-08-15')
  expect(msg).toContain('55')
})

test('private_address route uses the address string', () => {
  const msg = buildConfirmMessage({
    ...base,
    pickup_location: 'private_address',
    pickup_address: 'Lara Cd. No:5',
  })
  expect(msg).toContain('Lara Cd. No:5')
})

test('confirm message localizes labels by language', () => {
  const en = buildConfirmMessage({ ...base, language: 'en' })
  const de = buildConfirmMessage({ ...base, language: 'de' })
  const ru = buildConfirmMessage({ ...base, language: 'ru' })
  const tr = buildConfirmMessage({ ...base, language: 'tr' })
  // Each language differs from the others (labels translated).
  expect(new Set([en, de, ru, tr]).size).toBe(4)
})

test('unknown language falls back to english', () => {
  const unknown = buildConfirmMessage({ ...base, language: 'zz' })
  const missing = buildConfirmMessage({ ...base, language: undefined })
  const en = buildConfirmMessage({ ...base, language: 'en' })
  expect(unknown).toBe(en)
  expect(missing).toBe(en)
})

test('reminder omits driver line when driver fields empty', () => {
  const msg = buildReminderMessage(base)
  expect(msg).not.toMatch(/Mercedes|34ABC|—/)
})

test('reminder includes driver name and plate when present', () => {
  const msg = buildReminderMessage({ ...base, driver_name: 'Mehmet', vehicle_plate: '07 ABC 123' })
  expect(msg).toContain('Mehmet')
  expect(msg).toContain('07 ABC 123')
})

test('reminder uses outbound pickup for round trips', () => {
  const roundTrip = {
    ...base,
    trip_type: 'round_trip',
    return_date: '2026-08-22',
    return_pickup_time: '14:00',
  }
  const msg = buildReminderMessage(roundTrip)
  expect(msg).toContain('2026-08-15')      // outbound date
  expect(msg).not.toContain('2026-08-22')  // not the return date
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run admin/whatsapp-templates.test.js`
Expected: FAIL — module not found.

- [ ] **Step 3: Implement**

Create `admin/whatsapp-templates.js`. Skeleton (implementer fills the four language blocks with natural translations; keep labels short and friendly):

```js
// Builds localized, ready-to-send WhatsApp message text for the admin panel.
// Only labels/sentences are translated; dates, times, prices, guest count and
// driver details are inserted verbatim. Location SLUGS are mapped to display
// names via locationDisplay.
import { locationDisplay } from './turkish-formatters.js'

const VEHICLE_LABEL = { vclass: 'Mercedes V-Class', vito: 'Mercedes Vito' }

// One dictionary per language. `en` is the fallback.
const T = {
  en: {
    confirmIntro: (name) => `Hello ${name}, your VIP transfer is confirmed.`,
    ref: 'Reference', date: 'Date', time: 'Pickup time', route: 'Route',
    vehicle: 'Vehicle', guests: 'Guests', price: 'Price',
    confirmOutro: 'We look forward to welcoming you. Please keep this message.',
    reminderIntro: (name) => `Hello ${name}, a reminder about your transfer tomorrow.`,
    meetPoint: 'Meeting point', driver: 'Driver', plate: 'Plate',
    reminderOutro: 'Please be ready at the pickup time. Contact us anytime on WhatsApp.',
  },
  de: { /* German translations of the same keys */ },
  ru: { /* Russian translations of the same keys */ },
  tr: { /* Turkish translations of the same keys */ },
}

function dict(language) {
  return T[language] ?? T.en
}

function vehicleLabel(type) {
  return VEHICLE_LABEL[type] ?? type
}

// Outbound pickup time. Reuse timeline's derivation to stay consistent.
// NOTE: verify transferStartTime's exact signature/behaviour before finalizing.
function pickupTime(b) {
  return b.pickup_time || b.flight_arrival_time || ''
}

export function buildConfirmMessage(b) {
  const t = dict(b.language)
  const lines = [
    t.confirmIntro(b.customer_name ?? ''),
    '',
    `${t.ref}: ${b.booking_ref}`,
    `${t.date}: ${b.pickup_date}`,
    `${t.time}: ${pickupTime(b)}`,
    `${t.route}: ${locationDisplay(b.pickup_location, b.pickup_address)} → ${locationDisplay(b.dropoff_location, b.dropoff_address)}`,
    `${t.vehicle}: ${vehicleLabel(b.vehicle_type)}`,
    `${t.guests}: ${b.guests}`,
    `${t.price}: €${b.price_eur}`,
    '',
    t.confirmOutro,
  ]
  return lines.join('\n')
}

export function buildReminderMessage(b) {
  const t = dict(b.language)
  const lines = [
    t.reminderIntro(b.customer_name ?? ''),
    '',
    `${t.date}: ${b.pickup_date}`,
    `${t.time}: ${pickupTime(b)}`,
    `${t.meetPoint}: ${locationDisplay(b.pickup_location, b.pickup_address)}`,
  ]
  const driver = [b.driver_name, b.vehicle_plate].filter(Boolean)
  if (driver.length) {
    if (b.driver_name) lines.push(`${t.driver}: ${b.driver_name}`)
    if (b.vehicle_plate) lines.push(`${t.plate}: ${b.vehicle_plate}`)
  }
  lines.push('', t.reminderOutro)
  return lines.join('\n')
}
```

> The `de`/`ru`/`tr` blocks MUST be filled with real translations of every key present in `en` before Step 4 (the "4 distinct languages" test enforces this). Keep location names, `→`, dates, prices untranslated.

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run admin/whatsapp-templates.test.js`
Expected: 6 passed.

- [ ] **Step 5: Reconcile pickup time with the timeline helper**

Check `transferStartTime` in `admin/timeline.js:48`. If its output differs from the naive `pickupTime` above (e.g. it adjusts flight arrival by a buffer), export it from `timeline.js` and use it in `whatsapp-templates.js`, then re-run tests. Keep DRY — do not fork the logic.

- [ ] **Step 6: Commit**

```bash
git add admin/whatsapp-templates.js admin/whatsapp-templates.test.js admin/timeline.js
git commit -m "feat: add localized WhatsApp confirm/reminder message builders"
```

---

## Task 5: Wire extended search into the timeline

**Files:**
- Modify: `admin/timeline.js:540` (placeholder), `admin/timeline.js:625-628` (filter)

No unit test (DOM wiring); the predicate is already tested in Task 3. Verify manually.

- [ ] **Step 1: Import the predicate**

At the top of `admin/timeline.js`, add:

```js
import { matchesBookingQuery } from './search-match.js'
```

- [ ] **Step 2: Replace the filter**

Replace timeline.js:625-628:

```js
const q = searchQuery.trim().toLocaleLowerCase('tr-TR')
const sourceBookings = q
  ? (bookings ?? []).filter(b => String(b.customer_name ?? '').toLocaleLowerCase('tr-TR').includes(q))
  : bookings ?? []
```

with:

```js
const sourceBookings = (bookings ?? []).filter(b => matchesBookingQuery(b, searchQuery))
```

- [ ] **Step 3: Update placeholder**

At timeline.js:540, change the placeholder attribute to:

```
placeholder="İsim, telefon, kod veya güzergah ara…"
```

- [ ] **Step 4: Manual verification**

Run: `npm run dev`, open the admin panel, log in, load the timeline. Type in the search box:
- a customer name → matching cards only
- part of a phone number (with and without spaces) → matches
- a booking ref → matches (verify a round-trip booking matches on both legs)
- a route word (e.g. "Belek") → matches
- clearing the box → all cards return

Expected: all above behave; stats strip still counts the full unfiltered set.

- [ ] **Step 5: Commit**

```bash
git add admin/timeline.js
git commit -m "feat: search timeline by name, phone, ref, or route"
```

---

## Task 6: Driver field editors + WhatsApp template buttons

**Files:**
- Modify: `admin/booking-detail.js` (import builders + `whatsappURL`; add field editors near existing editors; add buttons near booking-detail.js:360)

No unit test (DOM wiring + template builders already tested). Verify manually.

- [ ] **Step 1: Read the surrounding code**

Read `admin/booking-detail.js` around: the import block (top), `bookingEditFormHTML` (line 79), the WhatsApp link block (line 360), `setupFieldEditor` (line 533) and how `setupEmailEditor`/`setupAddressEditor` (lines 592, 609) call it. Match those patterns exactly.

- [ ] **Step 2: Add imports**

Add to the existing import from `./whatsapp-templates.js` (new) and confirm `whatsappURL` is imported from `./turkish-formatters.js`:

```js
import { buildConfirmMessage, buildReminderMessage } from './whatsapp-templates.js'
```

- [ ] **Step 3: Add driver name + plate field editors**

Following the `setupAddressEditor` pattern, add editable fields for `driver_name` and `vehicle_plate` to the detail body markup (near the other editable fields) and a `setupDriverEditor(booking)` (or two `setupFieldEditor` calls) wired in `renderDetailBody`. Empty values render as `—` (reuse existing convention, booking-detail.js:603/620). These write back via the same Supabase update path the other field editors use.

- [ ] **Step 4: Add the two WhatsApp template buttons**

**Important:** `setupFieldEditor` updates the displayed value in place (booking-detail.js:~586) and mutates the in-memory `booking` object; it does NOT re-render the detail body. A static href baked into the template string would therefore go stale after a driver-field edit. So build the href **at click time** from the current `booking` object.

Add the buttons as elements (no href, or `href="#"`), near the existing WhatsApp link (booking-detail.js:360):

```js
<button class="whatsapp-template-btn" type="button" id="wa-confirm-btn">WhatsApp: Onay gönder</button>
<button class="whatsapp-template-btn" type="button" id="wa-reminder-btn">WhatsApp: Hatırlatma gönder</button>
```

Then wire them (in the same setup path where `setupFieldEditor`/quick actions are wired, so `booking` is in scope), opening a new tab at click time so the reminder picks up freshly-edited driver fields:

```js
document.getElementById('wa-confirm-btn')?.addEventListener('click', () => {
  window.open(whatsappURL(booking.customer_phone, buildConfirmMessage(booking)), '_blank', 'noopener')
})
document.getElementById('wa-reminder-btn')?.addEventListener('click', () => {
  window.open(whatsappURL(booking.customer_phone, buildReminderMessage(booking)), '_blank', 'noopener')
})
```

Confirm the `booking` object passed to the builders is the same reference that `setupFieldEditor` mutates on save (so `driver_name`/`vehicle_plate` edits are reflected). If the editor writes to a different object, read the current DOM/field values at click time instead.

- [ ] **Step 5: Add minimal styling**

Add a `.whatsapp-template-btn` rule to `admin/admin.css` consistent with existing WhatsApp link styling (green, tappable, mobile-first). Match the existing `.whatsapp-link` look.

- [ ] **Step 6: Manual verification**

Run: `npm run dev`, open a booking detail.
- Confirm button → WhatsApp opens with the confirmation drafted; ref/route/date/price present; message in the booking's language.
- Fill driver name + plate, save, reopen → reminder button now includes them.
- Leave driver fields empty → reminder has no driver line.
- Verify a booking with `language: 'de'`/`'ru'`/`'tr'` produces translated labels.

- [ ] **Step 7: Commit**

```bash
git add admin/booking-detail.js admin/admin.css
git commit -m "feat: add driver fields and WhatsApp template buttons to booking detail"
```

---

## Task 7: Driver-field migration + RLS

**Files:**
- Create: `supabase/migrations/023_add_driver_fields.sql`

**CRITICAL:** The admin UPDATE grant is column-level and replaced wholesale. Migration `018_add_dropoff_address.sql` holds the current full column list. This migration MUST copy that entire list verbatim and append the two new columns. Granting only the new columns would silently revoke UPDATE on every column 018 granted.

- [ ] **Step 1: Confirm the current grant**

Run: `git show HEAD:supabase/migrations/018_add_dropoff_address.sql`
Copy the exact column list from its `GRANT UPDATE (...)`.

- [ ] **Step 2: Write the migration**

Create `supabase/migrations/023_add_driver_fields.sql`:

```sql
-- Optional driver name and vehicle plate for a booking, editable from the admin
-- booking detail screen and used to fill the WhatsApp reminder template. A
-- single vehicle/driver is used for now, so these may routinely stay empty.
ALTER TABLE bookings
ADD COLUMN IF NOT EXISTS driver_name TEXT,
ADD COLUMN IF NOT EXISTS vehicle_plate TEXT;

-- Re-grant the admin (authenticated) column-level UPDATE. This REVOKE+GRANT
-- replaces the previous grant wholesale, so every column from migration 018 is
-- re-listed here, plus the two new driver columns.
REVOKE UPDATE ON bookings FROM authenticated;
GRANT UPDATE (
  status,
  price_eur,
  payment_method,
  customer_name,
  customer_phone,
  hotel_name,
  customer_email,
  child_seat_count,
  luggage_count,
  pickup_location,
  pickup_address,
  dropoff_location,
  dropoff_address,
  pickup_date,
  pickup_time,
  flight_number,
  flight_arrival_time,
  trip_type,
  return_date,
  return_pickup_time,
  return_flight_number,
  guests,
  vehicle_type,
  notes,
  driver_name,
  vehicle_plate
) ON bookings TO authenticated;
```

> Before committing, diff the column list against Step 1's output — every column present in 018 must appear here.

- [ ] **Step 3: Apply the migration**

Apply via the project's usual path (Supabase SQL editor / CLI — check how earlier migrations were applied; there is no migration runner in `package.json`). Confirm the two columns exist and an authenticated admin can update them from the booking detail screen (tested in Task 6 Step 6).

- [ ] **Step 4: Commit**

```bash
git add supabase/migrations/023_add_driver_fields.sql
git commit -m "feat: add driver_name/vehicle_plate columns with admin update grant"
```

---

## Final verification

- [ ] `npm test` → all unit tests pass (turkish-formatters, search-match, whatsapp-templates).
- [ ] `npm run build` → succeeds (no import/syntax regressions).
- [ ] Manual admin walkthrough: search by each field type; send confirm + reminder for an EN booking and a non-EN booking; driver fields round-trip through edit and appear in the reminder.
- [ ] Migration applied; admin edits persist.

## Notes / skills

- Use @superpowers:test-driven-development for the pure-function tasks (2–4).
- Use @superpowers:verification-before-completion before claiming done.
- DRY: reuse `transferStartTime`, `setupFieldEditor`, existing WhatsApp link styling. YAGNI: no scheduling, no Business API, no driver assignment system.
