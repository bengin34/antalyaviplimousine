import { supabase } from './supabase-client.js'
import { locationLabel } from './turkish-formatters.js'

function todayISO() {
  return new Intl.DateTimeFormat('sv', { timeZone: 'Europe/Istanbul' }).format(new Date())
}

function offsetISO(days) {
  const d = new Date(Date.now() + days * 86400000)
  return new Intl.DateTimeFormat('sv', { timeZone: 'Europe/Istanbul' }).format(d)
}

function fmtTime(t) { return t ? t.slice(0, 5) : '—' }

function statusLabel(s) {
  return {
    pending: 'Bekliyor',
    paid: 'Ödendi',
    confirmed: 'Onaylı',
    in_transit: 'Yolda',
    completed: 'Tamamlandı',
    cancelled: 'İptal',
  }[s] ?? s
}

function escapeHTML(value) {
  return String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;')
}

function expandRoundTrips(bookings, selectedTab) {
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
    if (a._displayDate !== b._displayDate) {
      return selectedTab === 'past'
        ? b._displayDate.localeCompare(a._displayDate)
        : a._displayDate.localeCompare(b._displayDate)
    }
    if (!a._displayTime && !b._displayTime) return 0
    if (!a._displayTime) return 1
    if (!b._displayTime) return -1
    return selectedTab === 'past'
      ? b._displayTime.localeCompare(a._displayTime)
      : a._displayTime.localeCompare(b._displayTime)
  })
}

function turkishDayLabel(isoDate) {
  const date = new Date(`${isoDate}T12:00:00Z`)
  const label = new Intl.DateTimeFormat('tr-TR', {
    timeZone: 'Europe/Istanbul',
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date)

  return label.charAt(0).toLocaleUpperCase('tr-TR') + label.slice(1)
}

function groupByDay(cards, today, tomorrow, selectedTab) {
  const groups = selectedTab === 'future'
    ? new Map([['Bugün', []], ['Yarın', []]])
    : new Map()
  for (const c of cards) {
    if (selectedTab === 'future' && c._displayDate === today) {
      groups.get('Bugün').push(c)
    } else if (selectedTab === 'future' && c._displayDate === tomorrow) {
      groups.get('Yarın').push(c)
    } else {
      if (!groups.has(c._displayDate)) groups.set(c._displayDate, [])
      groups.get(c._displayDate).push(c)
    }
  }
  return groups
}

function cardHTML(c) {
  const route = `${fmtTime(c._displayTime)} &nbsp;${escapeHTML(locationLabel(c.pickup_location))} → ${escapeHTML(locationLabel(c.dropoff_location))}`
  const badges = `
    <div class="card-badges">
      <span class="badge badge-${c.status}">${statusLabel(c.status)}</span>
      ${c._isReturn ? '<span class="badge badge-return">Dönüş</span>' : ''}
    </div>`
  const extras = [
    c.flight_number ? `✈️ ${escapeHTML(c.flight_number)}${c.flight_arrival_time ? ' · ' + fmtTime(c.flight_arrival_time) : ''}` : '',
    c.hotel_name ? `🏨 ${escapeHTML(c.hotel_name)}` : '',
    [
      `👥 ${c.guests} kişi · ${c.vehicle_type === 'vclass' ? 'V-Class' : 'Vito'}`,
      c.luggage_count > 0 ? `🧳 ${c.luggage_count}` : '',
      c.child_seat_count > 0 ? `👶 ${c.child_seat_count}` : '',
    ].filter(Boolean).join(' · '),
    `💳 ${c.payment_method === 'cash' ? 'Nakit' : 'Kart'} · €${escapeHTML(c.price_eur)}`,
    c.pickup_address ? `📍 ${escapeHTML(c.pickup_address)}` : '',
  ].filter(Boolean)

  return `
    <div class="card status-${c.status}" data-ref="${escapeHTML(c.booking_ref)}" data-return="${c._isReturn}">
      <div class="card-header">
        <div class="card-route">${route}</div>
        ${badges}
      </div>
      <div class="card-row">👤 ${escapeHTML(c.customer_name)} &nbsp;<a href="tel:${escapeHTML(c.customer_phone)}">${escapeHTML(c.customer_phone)}</a></div>
      ${extras.map(r => `<div class="card-row">${r}</div>`).join('')}
    </div>`
}

export async function renderTimeline(container, navigate, selectedTab = 'future') {
  const today = todayISO()
  const tomorrow = offsetISO(1)
  const isPast = selectedTab === 'past'

  container.innerHTML = `
    <div class="topbar">
      <span class="topbar-title">🚗 VIP Yönetim</span>
      <div class="topbar-actions">
        <button class="topbar-new" id="new-btn">+ Yeni Kayıt</button>
        <button class="topbar-logout" id="logout-btn">Çıkış</button>
      </div>
    </div>
    <div class="timeline-tabs" role="tablist" aria-label="Transfer dönemi">
      <button class="timeline-tab ${isPast ? '' : 'active'}" type="button" role="tab" aria-selected="${!isPast}" data-tab="future">Gelecek</button>
      <button class="timeline-tab ${isPast ? 'active' : ''}" type="button" role="tab" aria-selected="${isPast}" data-tab="past">Geçmiş</button>
    </div>
    ${isPast ? '' : `
      <div class="stats" id="stats-strip">
        <div class="stat stat-bugün"><div class="stat-number" id="stat-bugun">…</div><div class="stat-label">Bugün</div></div>
        <div class="stat stat-yarın"><div class="stat-number" id="stat-yarin">…</div><div class="stat-label">Yarın</div></div>
        <div class="stat stat-aksiyon"><div class="stat-number" id="stat-aksiyon">…</div><div class="stat-label">İşlem</div></div>
      </div>`}
    <div class="scroll-area" id="booking-list"></div>
  `

  document.getElementById('new-btn').addEventListener('click', () => navigate('#new'))

  document.getElementById('logout-btn').addEventListener('click', async () => {
    await supabase.auth.signOut()
    navigate('#login')
  })

  document.querySelector('.timeline-tabs').addEventListener('click', (event) => {
    const tab = event.target.closest('[data-tab]')
    if (!tab || tab.dataset.tab === selectedTab) return
    navigate(tab.dataset.tab === 'past' ? '#timeline?tab=past' : '#timeline')
  })

  let query = supabase
    .from('bookings')
    .select('*, booking_notes(id, note, created_at)')
    .in('status', ['pending', 'paid', 'confirmed', 'in_transit', 'completed'])

  query = isPast
    ? query.lt('pickup_date', today)
    : query.or(`pickup_date.gte.${today},return_date.gte.${today}`)

  const { data, error } = await query
    .order('pickup_date')
    .order('pickup_time', { nullsFirst: false })

  if (error) {
    document.getElementById('booking-list').innerHTML = `<div class="empty"><div>Yükleme hatası</div></div>`
    return
  }

  const cards = expandRoundTrips(data ?? [], selectedTab).filter(card => (
    isPast ? card._displayDate < today : card._displayDate >= today
  ))

  if (!isPast) {
    const operationalStatuses = ['pending', 'paid', 'confirmed', 'in_transit']
    const bugun = cards.filter(c => c._displayDate === today && operationalStatuses.includes(c.status)).length
    const yarin = cards.filter(c => c._displayDate === tomorrow && operationalStatuses.includes(c.status)).length
    const aksiyon = cards.filter(c => c._displayDate === today && ['pending', 'confirmed'].includes(c.status)).length
    document.getElementById('stat-bugun').textContent = bugun
    document.getElementById('stat-yarin').textContent = yarin
    document.getElementById('stat-aksiyon').textContent = aksiyon
  }

  const groups = groupByDay(cards, today, tomorrow, selectedTab)
  const list = document.getElementById('booking-list')

  const hasBookings = [...groups.values()].some(group => group.length > 0)
  if (!hasBookings) {
    list.innerHTML = `<div class="empty"><div class="empty-icon">📅</div><div>${isPast ? 'Geçmiş transfer yok' : 'Gelecek transfer yok'}</div></div>`
    return
  }

  for (const [key, group] of groups) {
    if (!group.length) continue
    let dateLabel
    if (key === 'Bugün') dateLabel = `Bugün · ${turkishDayLabel(today)}`
    else if (key === 'Yarın') dateLabel = `Yarın · ${turkishDayLabel(tomorrow)}`
    else dateLabel = turkishDayLabel(key)
    list.innerHTML += `<div class="day-group"><div class="day-label">📅 ${dateLabel}</div>${group.map(cardHTML).join('')}</div>`
  }

  list.addEventListener('click', (e) => {
    if (e.target.closest('a')) return
    const card = e.target.closest('.card')
    if (!card) return
    const params = new URLSearchParams()
    if (card.dataset.return === 'true') params.set('leg', 'return')
    if (isPast) params.set('from', 'past')
    const queryString = params.toString()
    navigate(`#detail/${encodeURIComponent(card.dataset.ref)}${queryString ? `?${queryString}` : ''}`)
  })
}
