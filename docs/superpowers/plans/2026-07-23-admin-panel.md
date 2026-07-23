# Admin Panel Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a mobile-first admin panel at `/admin/` where drivers log in with a shared Supabase Auth account and see upcoming transfers grouped by day, update status, and add notes.

**Architecture:** Single-page vanilla JS app with hash-based routing (`#login`, `#timeline`, `#detail/{booking_ref}`). No framework — consistent with the rest of the codebase. Three Supabase migrations (pickup_time column, new statuses, RLS policies) run before the frontend work. Vite serves `admin/index.html` as a separate entry point.

**Tech Stack:** Vanilla JS (ES modules), Supabase JS v2, Vite, CSS custom properties for dark theme.

---

## File Map

| File | Action | Responsibility |
|------|--------|---------------|
| `supabase/migrations/010_add_pickup_time.sql` | Create | Add pickup_time TIME column |
| `supabase/migrations/011_add_status_values.sql` | Create | Extend status CHECK constraint |
| `supabase/migrations/012_admin_rls.sql` | Create | Admin RLS policies + column-level UPDATE grant |
| `vite.config.js` | Modify | Add admin entry point |
| `admin/index.html` | Create | HTML shell — loads app.js as module |
| `admin/admin.css` | Create | Dark theme, mobile-first layout |
| `admin/app.js` | Create | Session check, onAuthStateChange, hash router |
| `admin/login.js` | Create | Login form + signInWithPassword |
| `admin/timeline.js` | Create | Fetch bookings, expand round-trips, sort, render |
| `admin/booking-detail.js` | Create | Detail view, notes, status update |

---

## Task 1: Database migrations

**Files:**
- Create: `supabase/migrations/010_add_pickup_time.sql`
- Create: `supabase/migrations/011_add_status_values.sql`
- Create: `supabase/migrations/012_admin_rls.sql`

- [ ] **Step 1: Write migration 010 — pickup_time column**

```sql
-- supabase/migrations/010_add_pickup_time.sql
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS pickup_time TIME;
-- No backfill: existing bookings will show "—" for pickup time.
-- New bookings will populate this field once the booking form is updated.
```

- [ ] **Step 2: Write migration 011 — extend status constraint**

```sql
-- supabase/migrations/011_add_status_values.sql
ALTER TABLE bookings DROP CONSTRAINT IF EXISTS bookings_status_check;
ALTER TABLE bookings ADD CONSTRAINT bookings_status_check
  CHECK (status IN ('pending', 'paid', 'confirmed', 'in_transit', 'completed', 'cancelled'));
```

- [ ] **Step 3: Write migration 012 — admin RLS policies**

```sql
-- supabase/migrations/012_admin_rls.sql

-- Restrict UPDATE to status column only at DB level
REVOKE UPDATE ON bookings FROM authenticated;
GRANT UPDATE (status) ON bookings TO authenticated;

-- Allow authenticated users to read all bookings
CREATE POLICY "admin_read_bookings" ON bookings
  FOR SELECT TO authenticated USING (true);

-- Allow authenticated users to update (column-level grant limits to status)
CREATE POLICY "admin_update_bookings" ON bookings
  FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

-- booking_notes: read and append only (table already exists, RLS already enabled)
CREATE POLICY "admin_read_notes" ON booking_notes
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "admin_insert_notes" ON booking_notes
  FOR INSERT TO authenticated
  WITH CHECK (EXISTS (SELECT 1 FROM bookings WHERE id = booking_id));
```

- [ ] **Step 4: Run migrations in Supabase dashboard**

Open Supabase dashboard → SQL Editor. Run each migration file in order: 010, 011, 012.

Verify 010: `SELECT column_name FROM information_schema.columns WHERE table_name='bookings' AND column_name='pickup_time';` → returns 1 row.

Verify 011: `SELECT conname, consrc FROM pg_constraint WHERE conname='bookings_status_check';` → constraint includes `in_transit` and `completed`.

Verify 012: `SELECT policyname FROM pg_policies WHERE tablename IN ('bookings','booking_notes');` → shows all 4 new policies.

- [ ] **Step 5: Create admin Supabase Auth user**

In Supabase dashboard → Authentication → Users → Add User.
Email: `admin@antalyavip.com`, set a strong password.
No email confirmation needed (turn off if required).

- [ ] **Step 6: Commit migrations**

```bash
git add supabase/migrations/010_add_pickup_time.sql supabase/migrations/011_add_status_values.sql supabase/migrations/012_admin_rls.sql
git commit -m "feat: add admin panel DB migrations (pickup_time, new statuses, RLS)"
```

---

## Task 2: Vite entry point + HTML shell

**Files:**
- Modify: `vite.config.js`
- Create: `admin/index.html`

- [ ] **Step 1: Add admin entry to vite.config.js**

In `vite.config.js`, inside the `input` object of `rollupOptions`, add:

```js
admin: resolve(__dirname, "admin/index.html"),
```

- [ ] **Step 2: Create admin/index.html**

```html
<!DOCTYPE html>
<html lang="tr">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="robots" content="noindex, nofollow" />
  <title>VIP Admin</title>
  <link rel="stylesheet" href="./admin.css" />
</head>
<body>
  <div id="app"></div>
  <script type="module" src="./app.js"></script>
</body>
</html>
```

- [ ] **Step 3: Verify Vite picks up the new entry**

```bash
npm run dev
```

Open `http://localhost:5173/admin/` — should serve a blank page with no 404.

- [ ] **Step 4: Commit**

```bash
git add vite.config.js admin/index.html
git commit -m "feat: add admin panel Vite entry point"
```

---

## Task 3: CSS — dark theme

**Files:**
- Create: `admin/admin.css`

- [ ] **Step 1: Create admin/admin.css**

```css
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  --bg: #0d1117;
  --surface: #161b22;
  --border: #30363d;
  --text: #e6edf3;
  --text-muted: #8b949e;
  --green: #3fb950;
  --green-bg: #1a4731;
  --blue: #58a6ff;
  --blue-bg: #0d1f3c;
  --grey: #6e7681;
  --grey-bg: #21262d;
  --red: #f85149;
  --red-bg: #3d0f0f;
  --orange: #f0883e;
  --orange-bg: #3d2210;
  --radius: 10px;
  --radius-sm: 6px;
}

body {
  background: var(--bg);
  color: var(--text);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: 15px;
  min-height: 100dvh;
}

#app {
  max-width: 480px;
  margin: 0 auto;
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
}

/* Top bar */
.topbar {
  background: var(--surface);
  border-bottom: 1px solid var(--border);
  padding: 14px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 10;
}
.topbar-title { font-weight: 700; font-size: 16px; }
.topbar-logout { color: var(--text-muted); font-size: 13px; cursor: pointer; background: none; border: none; }

/* Stats strip */
.stats {
  display: flex;
  background: var(--surface);
  border-bottom: 1px solid var(--border);
}
.stat {
  flex: 1;
  padding: 10px 8px;
  text-align: center;
  border-right: 1px solid var(--border);
}
.stat:last-child { border-right: none; }
.stat-number { font-size: 22px; font-weight: 700; }
.stat-label { color: var(--text-muted); font-size: 10px; text-transform: uppercase; letter-spacing: 0.5px; margin-top: 2px; }
.stat-bugün .stat-number { color: var(--green); }
.stat-yarın .stat-number { color: var(--blue); }
.stat-aksiyon .stat-number { color: var(--orange); }

/* Day group */
.day-group { padding: 16px 12px 4px; }
.day-label {
  color: var(--text-muted);
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: 600;
  margin-bottom: 10px;
}

/* Booking card */
.card {
  background: var(--surface);
  border-radius: var(--radius);
  padding: 12px;
  margin-bottom: 8px;
  cursor: pointer;
  border: 1px solid var(--border);
  transition: border-color 0.15s;
}
.card:active { opacity: 0.85; }
.card.status-confirmed { border-color: var(--green); }
.card.status-in_transit { border-color: var(--blue); }
.card.status-completed { border-color: var(--border); opacity: 0.7; }

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 6px;
  gap: 8px;
}
.card-route { font-weight: 700; font-size: 15px; }
.card-badges { display: flex; gap: 4px; flex-shrink: 0; }

/* Badges */
.badge {
  font-size: 10px;
  font-weight: 600;
  padding: 2px 8px;
  border-radius: 12px;
}
.badge-confirmed { background: var(--green-bg); color: var(--green); }
.badge-in_transit { background: var(--blue-bg); color: var(--blue); }
.badge-completed { background: var(--grey-bg); color: var(--grey); }
.badge-cancelled { background: var(--red-bg); color: var(--red); }
.badge-return { background: var(--orange-bg); color: var(--orange); }

.card-row {
  color: var(--text-muted);
  font-size: 12px;
  margin-top: 3px;
  line-height: 1.4;
}
.card-row a { color: var(--blue); text-decoration: none; }

/* Login form */
.login-wrap {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 32px 24px;
}
.login-title { font-size: 22px; font-weight: 700; margin-bottom: 24px; }
.login-form { width: 100%; display: flex; flex-direction: column; gap: 12px; }
.input {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  color: var(--text);
  font-size: 15px;
  padding: 12px 14px;
  width: 100%;
}
.input:focus { outline: none; border-color: var(--blue); }
.btn {
  background: #238636;
  color: #fff;
  border: none;
  border-radius: var(--radius-sm);
  font-size: 15px;
  font-weight: 600;
  padding: 12px;
  cursor: pointer;
  width: 100%;
}
.btn:disabled { opacity: 0.6; cursor: not-allowed; }
.btn-outline {
  background: transparent;
  border: 1px solid var(--border);
  color: var(--text);
  border-radius: var(--radius-sm);
  font-size: 14px;
  padding: 10px;
  cursor: pointer;
  flex: 1;
}
.btn-outline.green { border-color: var(--green); color: var(--green); }
.btn-outline.blue { border-color: var(--blue); color: var(--blue); }
.btn-outline.red { border-color: var(--red); color: var(--red); }
.btn-outline.active-green { background: var(--green-bg); border-color: var(--green); color: var(--green); }
.btn-outline.active-blue { background: var(--blue-bg); border-color: var(--blue); color: var(--blue); }
.error-msg { color: var(--red); font-size: 13px; text-align: center; }

/* Detail screen */
.detail-back {
  background: none;
  border: none;
  color: var(--blue);
  font-size: 15px;
  cursor: pointer;
  padding: 0;
}
.section {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 14px;
  margin: 8px 12px;
}
.section-label {
  color: var(--text-muted);
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-weight: 600;
  margin-bottom: 10px;
}
.detail-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  font-size: 13px;
}
.detail-grid .full { grid-column: 1 / -1; }
.detail-key { color: var(--text-muted); margin-bottom: 2px; font-size: 11px; }
.detail-val { color: var(--text); font-weight: 500; }

/* Notes */
.note-item {
  background: var(--bg);
  border-radius: var(--radius-sm);
  padding: 8px 10px;
  font-size: 13px;
  color: var(--text-muted);
  margin-bottom: 6px;
}
.note-pinned {
  background: var(--bg);
  border-left: 2px solid var(--orange);
  border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
  padding: 8px 10px;
  font-size: 13px;
  color: var(--text-muted);
  margin-bottom: 6px;
}
.note-input-row { display: flex; gap: 8px; margin-top: 8px; }
.note-input-row .input { flex: 1; padding: 8px 10px; font-size: 13px; }
.note-input-row .btn { width: auto; padding: 8px 14px; font-size: 13px; }

/* Status buttons */
.status-buttons { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }

/* Empty state */
.empty {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: var(--text-muted);
  gap: 12px;
  padding: 40px;
}
.empty-icon { font-size: 40px; }

/* Inline error */
.inline-error {
  color: var(--red);
  font-size: 12px;
  text-align: center;
  padding: 6px;
}

/* Scroll area */
.scroll-area { flex: 1; overflow-y: auto; padding-bottom: 24px; }
```

- [ ] **Step 2: Commit**

```bash
git add admin/admin.css
git commit -m "feat: admin panel dark theme CSS"
```

---

## Task 4: Supabase client for admin

**Files:**
- Create: `admin/supabase-client.js`

The existing `src/lib/supabase.js` uses Vite env vars and can be reused, but the admin folder needs its own module-relative import path. Create a thin re-export:

- [ ] **Step 1: Create admin/supabase-client.js**

```js
// admin/supabase-client.js
import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL
const key = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!url || !key) throw new Error('Missing Supabase env vars')

export const supabase = createClient(url, key, {
  auth: { autoRefreshToken: true, persistSession: true },
})
```

- [ ] **Step 2: Commit**

```bash
git add admin/supabase-client.js
git commit -m "feat: admin Supabase client module"
```

---

## Task 5: Hash router + auth shell (app.js)

**Files:**
- Create: `admin/app.js`

- [ ] **Step 1: Create admin/app.js**

```js
// admin/app.js
import { supabase } from './supabase-client.js'
import { renderLogin } from './login.js'
import { renderTimeline } from './timeline.js'
import { renderDetail } from './booking-detail.js'

const app = document.getElementById('app')

function navigate(hash) {
  window.location.hash = hash
}

async function route() {
  const hash = window.location.hash || '#timeline'
  const { data: { session } } = await supabase.auth.getSession()

  if (!session) {
    renderLogin(app, navigate)
    return
  }

  if (hash === '#login') {
    navigate('#timeline')
    return
  }

  if (hash.startsWith('#detail/')) {
    const ref = hash.slice('#detail/'.length)
    renderDetail(app, ref, navigate)
    return
  }

  renderTimeline(app, navigate)
}

// Auth state changes (token refresh failure → SIGNED_OUT)
supabase.auth.onAuthStateChange((event) => {
  if (event === 'SIGNED_OUT') {
    navigate('#login')
    renderLogin(app, navigate)
  }
})

window.addEventListener('hashchange', route)
route()
```

- [ ] **Step 2: Verify shell loads**

```bash
npm run dev
```

Open `http://localhost:5173/admin/` — page should be blank (no views implemented yet) with no JS errors in console.

- [ ] **Step 3: Commit**

```bash
git add admin/app.js
git commit -m "feat: admin hash router and auth state listener"
```

---

## Task 6: Login view

**Files:**
- Create: `admin/login.js`

- [ ] **Step 1: Create admin/login.js**

```js
// admin/login.js
import { supabase } from './supabase-client.js'

export function renderLogin(container, navigate) {
  container.innerHTML = `
    <div class="login-wrap">
      <div class="login-title">🚗 VIP Admin</div>
      <form class="login-form" id="login-form">
        <input class="input" type="email" id="login-email" placeholder="E-posta" autocomplete="email" required />
        <input class="input" type="password" id="login-password" placeholder="Şifre" autocomplete="current-password" required />
        <button class="btn" type="submit" id="login-btn">Giriş Yap</button>
        <div class="error-msg" id="login-error"></div>
      </form>
    </div>
  `

  document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault()
    const btn = document.getElementById('login-btn')
    const errEl = document.getElementById('login-error')
    const email = document.getElementById('login-email').value.trim()
    const password = document.getElementById('login-password').value

    btn.disabled = true
    btn.textContent = 'Giriş yapılıyor...'
    errEl.textContent = ''

    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      errEl.textContent = 'E-posta veya şifre hatalı.'
      btn.disabled = false
      btn.textContent = 'Giriş Yap'
      return
    }

    navigate('#timeline')
  })
}
```

- [ ] **Step 2: Manually test login**

Open `http://localhost:5173/admin/`. Should see login form.
Enter wrong credentials → error message shown.
Enter correct credentials (`admin@antalyavip.com` + password) → redirects to `#timeline` (blank for now).

- [ ] **Step 3: Commit**

```bash
git add admin/login.js
git commit -m "feat: admin login form with Supabase auth"
```

---

## Task 7: Timeline view

**Files:**
- Create: `admin/timeline.js`

- [ ] **Step 1: Create admin/timeline.js**

```js
// admin/timeline.js
import { supabase } from './supabase-client.js'

function todayISO() {
  return new Intl.DateTimeFormat('sv', { timeZone: 'Europe/Istanbul' }).format(new Date())
}

function offsetISO(days) {
  const d = new Date(Date.now() + days * 86400000)
  return new Intl.DateTimeFormat('sv', { timeZone: 'Europe/Istanbul' }).format(d)
}

function fmtTime(t) { return t ? t.slice(0, 5) : '—' }

function statusLabel(s) {
  return { confirmed: 'Onaylı', in_transit: 'Yolda', completed: 'Tamamlandı', cancelled: 'İptal' }[s] ?? s
}

function expandRoundTrips(bookings) {
  const cards = []
  for (const b of bookings) {
    cards.push({ ...b, _displayDate: b.pickup_date, _displayTime: b.pickup_time, _isReturn: false })
    if (b.trip_type === 'round_trip' && b.return_date) {
      cards.push({
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
  }
  return cards.sort((a, b) => {
    if (a._displayDate !== b._displayDate) return a._displayDate.localeCompare(b._displayDate)
    if (!a._displayTime && !b._displayTime) return 0
    if (!a._displayTime) return 1
    if (!b._displayTime) return -1
    return a._displayTime.localeCompare(b._displayTime)
  })
}

function groupByDay(cards, today, tomorrow) {
  const groups = { 'Bugün': [], 'Yarın': [], 'Sonraki': [] }
  for (const c of cards) {
    if (c._displayDate === today) groups['Bugün'].push(c)
    else if (c._displayDate === tomorrow) groups['Yarın'].push(c)
    else groups['Sonraki'].push(c)
  }
  return groups
}

function cardHTML(c) {
  const route = `${fmtTime(c._displayTime)} &nbsp;${c.pickup_location} → ${c.dropoff_location}`
  const badges = `
    <div class="card-badges">
      <span class="badge badge-${c.status}">${statusLabel(c.status)}</span>
      ${c._isReturn ? '<span class="badge badge-return">Dönüş</span>' : ''}
    </div>`
  const extras = [
    c.flight_number ? `✈️ ${c.flight_number}${c.flight_arrival_time ? ' · ' + fmtTime(c.flight_arrival_time) : ''}` : '',
    c.hotel_name ? `🏨 ${c.hotel_name}` : '',
    [
      `👥 ${c.guests} kişi · ${c.vehicle_type === 'vclass' ? 'V-Class' : 'Vito'}`,
      c.luggage_count > 0 ? `🧳 ${c.luggage_count}` : '',
      c.child_seat_count > 0 ? `👶 ${c.child_seat_count}` : '',
    ].filter(Boolean).join(' · '),
    `💳 ${c.payment_method === 'cash' ? 'Nakit' : 'Kart'} · €${c.price_eur}`,
    c.pickup_address ? `📍 ${c.pickup_address}` : '',
  ].filter(Boolean)

  return `
    <div class="card status-${c.status}" data-ref="${c.booking_ref}" data-return="${c._isReturn}">
      <div class="card-header">
        <div class="card-route">${route}</div>
        ${badges}
      </div>
      <div class="card-row">👤 ${c.customer_name} &nbsp;<a href="tel:${c.customer_phone}">${c.customer_phone}</a></div>
      ${extras.map(r => `<div class="card-row">${r}</div>`).join('')}
    </div>`
}

export async function renderTimeline(container, navigate) {
  const today = todayISO()
  const tomorrow = offsetISO(1)
  const maxDate = offsetISO(14)

  container.innerHTML = `
    <div class="topbar">
      <span class="topbar-title">🚗 VIP Admin</span>
      <button class="topbar-logout" id="logout-btn">Çıkış</button>
    </div>
    <div class="stats" id="stats-strip">
      <div class="stat stat-bugün"><div class="stat-number" id="stat-bugun">…</div><div class="stat-label">Bugün</div></div>
      <div class="stat stat-yarın"><div class="stat-number" id="stat-yarin">…</div><div class="stat-label">Yarın</div></div>
      <div class="stat stat-aksiyon"><div class="stat-number" id="stat-aksiyon">…</div><div class="stat-label">Aksiyon</div></div>
    </div>
    <div class="scroll-area" id="booking-list"></div>
  `

  document.getElementById('logout-btn').addEventListener('click', async () => {
    await supabase.auth.signOut()
    navigate('#login')
  })

  // Note: window filters on pickup_date (outbound leg) only.
  // Round-trip return legs use return_date which may fall outside the 14-day window —
  // their parent booking is fetched regardless, so the return card will still render.
  // Bookings with pickup_date > maxDate are excluded entirely even if return_date is within window.
  // This is acceptable: such bookings are too far out to need driver attention now.
  const { data, error } = await supabase
    .from('bookings')
    .select('*, booking_notes(id, note, created_at)')
    .in('status', ['confirmed', 'in_transit', 'completed'])
    .gte('pickup_date', today)
    .lte('pickup_date', maxDate)
    .order('pickup_date')
    .order('pickup_time', { nullsFirst: false })

  if (error) {
    document.getElementById('booking-list').innerHTML = `<div class="empty"><div>Yükleme hatası</div></div>`
    return
  }

  // Stats (DB row counts, not virtual cards)
  const bugun = data.filter(b => b.pickup_date === today && ['confirmed','in_transit'].includes(b.status)).length
  const yarin = data.filter(b => b.pickup_date === tomorrow && b.status === 'confirmed').length
  const aksiyon = data.filter(b => b.pickup_date === today && b.status === 'confirmed').length
  document.getElementById('stat-bugun').textContent = bugun
  document.getElementById('stat-yarin').textContent = yarin
  document.getElementById('stat-aksiyon').textContent = aksiyon

  const cards = expandRoundTrips(data)
  const groups = groupByDay(cards, today, tomorrow)
  const list = document.getElementById('booking-list')

  const hasBookings = Object.values(groups).some(g => g.length > 0)
  if (!hasBookings) {
    list.innerHTML = `<div class="empty"><div class="empty-icon">📅</div><div>Yakın transfer yok</div></div>`
    return
  }

  for (const [label, group] of Object.entries(groups)) {
    if (!group.length) continue
    const dateLabel = label === 'Bugün' ? `Bugün — ${today}` : label === 'Yarın' ? `Yarın — ${tomorrow}` : 'Sonraki'
    list.innerHTML += `<div class="day-group"><div class="day-label">📅 ${dateLabel}</div>${group.map(cardHTML).join('')}</div>`
  }

  list.addEventListener('click', (e) => {
    const card = e.target.closest('.card')
    if (!card) return
    const ref = card.dataset.ref
    navigate(`#detail/${ref}`)
  })
}
```

- [ ] **Step 2: Verify timeline loads**

Log in and go to `#timeline`. Should see bookings (if any confirmed ones exist) grouped by day. Stats strip should show counts.

- [ ] **Step 3: Commit**

```bash
git add admin/timeline.js
git commit -m "feat: admin timeline view with round-trip expansion and day groups"
```

---

## Task 8: Booking detail view

**Files:**
- Create: `admin/booking-detail.js`

- [ ] **Step 1: Create admin/booking-detail.js**

```js
// admin/booking-detail.js
import { supabase } from './supabase-client.js'

function fmtTime(t) { return t ? t.slice(0, 5) : '—' }
function fmtDate(d) { return d ?? '—' }

const STATUS_LABELS = {
  confirmed: 'Onaylı',
  in_transit: 'Yolda',
  completed: 'Tamamlandı',
  cancelled: 'İptal',
}

const STATUS_TRANSITIONS = {
  confirmed: ['in_transit', 'cancelled'],
  in_transit: ['completed', 'cancelled'],
  completed: [],
  cancelled: [],
}

const STATUS_COLORS = {
  confirmed: 'green',
  in_transit: 'blue',
  completed: '',
  cancelled: 'red',
}

export async function renderDetail(container, bookingRef, navigate) {
  container.innerHTML = `
    <div class="topbar">
      <button class="detail-back" id="back-btn">← Geri</button>
      <span class="topbar-title">Transfer Detayı</span>
      <span></span>
    </div>
    <div class="scroll-area" id="detail-body"><div class="empty"><div>Yükleniyor…</div></div></div>
  `
  document.getElementById('back-btn').addEventListener('click', () => navigate('#timeline'))

  const { data: rows, error } = await supabase
    .from('bookings')
    .select('*, booking_notes(id, note, created_at)')
    .eq('booking_ref', bookingRef)
    .limit(1)

  if (error || !rows?.length) {
    document.getElementById('detail-body').innerHTML = `<div class="empty"><div>Rezervasyon bulunamadı</div></div>`
    return
  }

  const b = rows[0]
  renderDetailBody(b, navigate, bookingRef)
}

function renderDetailBody(b, navigate, bookingRef) {
  const body = document.getElementById('detail-body')

  const sortedNotes = [...(b.booking_notes ?? [])].sort(
    (a, c) => new Date(c.created_at) - new Date(a.created_at)
  )

  body.innerHTML = `
    <!-- Ref + status -->
    <div class="section">
      <div style="display:flex;justify-content:space-between;align-items:center">
        <span style="color:var(--text-muted);font-size:13px">${b.booking_ref}</span>
        <span class="badge badge-${b.status}" id="status-badge">${STATUS_LABELS[b.status]}</span>
      </div>
    </div>

    <!-- Route + time -->
    <div class="section">
      <div class="section-label">Transfer</div>
      <div style="font-size:17px;font-weight:700;margin-bottom:4px">${fmtTime(b.pickup_time)} &nbsp;${b.pickup_location} → ${b.dropoff_location}</div>
      <div style="color:var(--text-muted);font-size:13px">${fmtDate(b.pickup_date)}${b.flight_number ? ` · ✈️ ${b.flight_number} varış ${fmtTime(b.flight_arrival_time)}` : ''}</div>
    </div>

    <!-- Customer -->
    <div class="section">
      <div class="section-label">Müşteri</div>
      <div style="font-weight:600;margin-bottom:4px">${b.customer_name}</div>
      <div style="margin-bottom:2px"><a href="tel:${b.customer_phone}" style="color:var(--blue)">📞 ${b.customer_phone}</a></div>
      <div style="color:var(--text-muted);font-size:13px">✉️ ${b.customer_email}</div>
    </div>

    <!-- Transfer details -->
    <div class="section">
      <div class="section-label">Detaylar</div>
      <div class="detail-grid">
        <div><div class="detail-key">Araç</div><div class="detail-val">${b.vehicle_type === 'vclass' ? 'V-Class' : 'Vito'}</div></div>
        <div><div class="detail-key">Yolcu</div><div class="detail-val">${b.guests} kişi</div></div>
        <div><div class="detail-key">Bagaj</div><div class="detail-val">${b.luggage_count > 0 ? `🧳 ${b.luggage_count}` : '—'}</div></div>
        <div><div class="detail-key">Çocuk koltuğu</div><div class="detail-val">${b.child_seat_count > 0 ? `👶 ${b.child_seat_count}` : '—'}</div></div>
        <div class="full"><div class="detail-key">Otel</div><div class="detail-val">${b.hotel_name ?? '—'}</div></div>
        ${b.pickup_address ? `<div class="full"><div class="detail-key">Alış adresi</div><div class="detail-val">📍 ${b.pickup_address}</div></div>` : ''}
      </div>
    </div>

    <!-- Payment -->
    <div class="section">
      <div class="section-label">Ödeme</div>
      <div style="display:flex;justify-content:space-between">
        <span>${b.payment_method === 'cash' ? 'Nakit' : 'Kart'}</span>
        <span style="font-weight:700">€${b.price_eur}</span>
      </div>
    </div>

    <!-- Notes -->
    <div class="section" id="notes-section">
      <div class="section-label">Notlar</div>
      ${b.notes ? `<div class="note-pinned">📌 ${b.notes}</div>` : ''}
      <div id="notes-list">
        ${sortedNotes.map(n => `<div class="note-item">${n.note}</div>`).join('') || '<div style="color:var(--text-muted);font-size:13px">Henüz not yok</div>'}
      </div>
      <div class="note-input-row">
        <input class="input" type="text" id="note-input" placeholder="Not ekle…" />
        <button class="btn" id="note-btn" style="width:auto;padding:8px 14px;font-size:13px">Ekle</button>
      </div>
      <div class="inline-error" id="note-error"></div>
    </div>

    <!-- Status buttons -->
    <div class="section">
      <div class="section-label">Durum Güncelle</div>
      <div class="status-buttons" id="status-buttons"></div>
      <div class="inline-error" id="status-error"></div>
    </div>
  `

  renderStatusButtons(b.status, b.id, b.booking_ref)
  setupNoteInput(b.id)
}

function renderStatusButtons(currentStatus, bookingId, bookingRef) {
  const container = document.getElementById('status-buttons')
  if (!container) return

  const transitions = STATUS_TRANSITIONS[currentStatus] ?? []

  if (!transitions.length) {
    container.innerHTML = `<div style="color:var(--text-muted);font-size:13px;grid-column:1/-1">Bu transfer için başka durum seçeneği yok.</div>`
    return
  }

  container.innerHTML = transitions.map(next => {
    const color = STATUS_COLORS[next]
    const isActive = next === currentStatus
    return `<button class="btn-outline ${color}${isActive ? ` active-${color}` : ''}" data-next="${next}">${STATUS_LABELS[next]}</button>`
  }).join('')

  container.addEventListener('click', async (e) => {
    const btn = e.target.closest('[data-next]')
    if (!btn) return
    const nextStatus = btn.dataset.next

    if (nextStatus === 'cancelled') {
      if (!confirm('Bu transferi iptal etmek istediğinize emin misiniz?')) return
    }

    // Optimistic update
    const badge = document.getElementById('status-badge')
    const prevStatus = badge.className.match(/badge-(\w+)/)?.[1]
    badge.className = `badge badge-${nextStatus}`
    badge.textContent = STATUS_LABELS[nextStatus]

    const { count, error } = await supabase
      .from('bookings')
      .update({ status: nextStatus }, { count: 'exact' })
      .eq('booking_ref', bookingRef)

    if (error || count === 0) {
      // Revert
      badge.className = `badge badge-${prevStatus}`
      badge.textContent = STATUS_LABELS[prevStatus]
      document.getElementById('status-error').textContent = 'Güncelleme başarısız, tekrar deneyin.'
      return
    }

    document.getElementById('status-error').textContent = ''
    // Re-render status buttons for new state
    renderStatusButtons(nextStatus, bookingId, bookingRef)
  })
}

function setupNoteInput(bookingId) {
  const noteBtn = document.getElementById('note-btn')
  const noteInput = document.getElementById('note-input')
  const noteError = document.getElementById('note-error')

  noteBtn?.addEventListener('click', async () => {
    const note = noteInput.value.trim()
    if (!note) return

    noteBtn.disabled = true
    noteError.textContent = ''

    const { data, error } = await supabase
      .from('booking_notes')
      .insert({ booking_id: bookingId, note })
      .select()
      .single()

    if (error) {
      noteError.textContent = 'Not eklenemedi, tekrar deneyin.'
      noteBtn.disabled = false
      return
    }

    // Prepend new note to list
    const list = document.getElementById('notes-list')
    const placeholder = list.querySelector('[style*="Henüz"]')
    if (placeholder) placeholder.remove()
    const el = document.createElement('div')
    el.className = 'note-item'
    el.textContent = data.note
    list.prepend(el)
    noteInput.value = ''
    noteBtn.disabled = false
  })
}
```

- [ ] **Step 2: Verify detail view**

Click any booking card from the timeline. Should show full detail with all sections.
Test: tap phone number → opens dialer.
Test: add a note → appears at top immediately.
Test: update status confirmed→in_transit → badge changes. Check Supabase dashboard to confirm DB updated.
Test: try to cancel a completed booking → cancel button should not appear.

- [ ] **Step 3: Commit**

```bash
git add admin/booking-detail.js
git commit -m "feat: admin booking detail view with status update and notes"
```

---

## Task 9: End-to-end smoke test + build verification

- [ ] **Step 1: Full flow test**

1. Open `http://localhost:5173/admin/` — shows login
2. Enter wrong password → error message
3. Enter correct credentials → redirects to timeline
4. Timeline shows today's confirmed/in_transit bookings
5. Stats strip shows correct counts
6. Click a card → detail view opens
7. Tap phone → dialer opens (mobile) / tel: link activates
8. Update status → badge updates immediately, DB confirms
9. Add note → appears at top of notes list
10. Tap back → timeline re-fetches (check it reflects status change)
11. Tap logout → back to login, session cleared

- [ ] **Step 2: Verify production build**

```bash
npm run build
```

Expected: build completes without errors. Check `dist/` for `admin/` directory with compiled files.

- [ ] **Step 3: Add admin to .gitignore exclusions (if needed)**

Check that `.superpowers/` is in `.gitignore`:

```bash
grep superpowers .gitignore || echo "superpowers" >> .gitignore
```

- [ ] **Step 4: Final commit**

```bash
git add .gitignore
git commit -m "chore: ensure .superpowers/ in .gitignore"
```

---

## Task 10: Deploy

- [ ] **Step 1: Deploy to production**

```bash
npm run build
```

Deploy `dist/` to hosting provider (same as existing site).

- [ ] **Step 2: Verify production**

Open `https://your-domain.com/admin/` — login should work with Supabase production credentials.

> **Note:** If Supabase project is separate for dev/prod, remember to run migrations 010–012 on the production Supabase project and create the admin Auth user there too.

---

## Dependency: Booking form pickup_time field

After this admin panel ships, the booking form needs a new `pickup_time` field for hotel→airport transfers. Until then, those cards show "—" in the time slot and sort to end of their day group. Track this as a follow-up task.
