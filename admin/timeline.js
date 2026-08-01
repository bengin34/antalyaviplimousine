import { supabase } from './supabase-client.js'
import {
  isFutureIstanbulLeg,
  locationDisplay,
  navigationURLs,
  whatsappURL,
} from './turkish-formatters.js'

const ISTANBUL_TIME_ZONE = 'Europe/Istanbul'
const AUTO_REFRESH_MS = 60_000
const TODAY_CACHE_KEY = 'vip-admin-today-cache-v2'

let timelineCleanup = null

function todayISO() {
  return new Intl.DateTimeFormat('sv', { timeZone: ISTANBUL_TIME_ZONE }).format(new Date())
}

function offsetISO(days) {
  const d = new Date(Date.now() + days * 86400000)
  return new Intl.DateTimeFormat('sv', { timeZone: ISTANBUL_TIME_ZONE }).format(d)
}

function fmtTime(t) { return t ? t.slice(0, 5) : '—' }

function fmtPrice(value) {
  return new Intl.NumberFormat('tr-TR', { maximumFractionDigits: 2 }).format(Number(value) || 0)
}

function fmtSyncTime(value = new Date()) {
  return new Intl.DateTimeFormat('tr-TR', {
    timeZone: ISTANBUL_TIME_ZONE,
    hour: '2-digit',
    minute: '2-digit',
  }).format(value)
}

function fmtLiveDate(value = new Date()) {
  const label = new Intl.DateTimeFormat('tr-TR', {
    timeZone: ISTANBUL_TIME_ZONE,
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  }).format(value)
  return label.charAt(0).toLocaleUpperCase('tr-TR') + label.slice(1)
}

function transferStartTime(pickupLocation, pickupTime, flightArrivalTime) {
  if (pickupLocation === 'airport') return flightArrivalTime || pickupTime
  return pickupTime
}

function countFutureReservations(bookings) {
  return new Set(bookings
    .filter(booking => {
      if (booking.status !== 'completed') return true
      return booking.trip_type === 'round_trip' && isFutureIstanbulLeg(
        booking.return_date,
        booking.return_pickup_time,
      )
    })
    .map(booking => booking.id ?? booking.booking_ref)).size
}

function statusLabel(s, isRoundTrip = false) {
  if (s === 'confirmed' && isRoundTrip) return 'Gidiş-Dönüş Rezerve'
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
    cards.push({
      ...b,
      _displayDate: b.pickup_date,
      _displayTime: transferStartTime(b.pickup_location, b.pickup_time, b.flight_arrival_time),
      _isReturn: false,
    })
    if (b.trip_type === 'round_trip' && b.return_date) {
      const needsReturnContact = b.status === 'completed' && isFutureIstanbulLeg(
        b.return_date,
        b.return_pickup_time,
      )
      cards.push({
        ...b,
        status: needsReturnContact ? 'confirmed' : b.status,
        _isReturn: true,
        _needsReturnContact: needsReturnContact,
        _displayDate: b.return_date,
        _displayTime: b.return_pickup_time,
        pickup_location: b.dropoff_location,
        dropoff_location: b.pickup_location,
        pickup_address: b.dropoff_address,
        dropoff_address: b.pickup_address,
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
    timeZone: ISTANBUL_TIME_ZONE,
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

function hasUsefulHotel(value) {
  const hotel = String(value ?? '').trim().toLocaleLowerCase('tr-TR')
  return Boolean(hotel && hotel !== 'belirtilmedi')
}

function missingInformation(card) {
  const missing = []
  if (!card._displayTime) missing.push('saat')

  const hasHotel = hasUsefulHotel(card.hotel_name)
  const pickupAddress = String(card.pickup_address ?? '').trim()
  const dropoffAddress = String(card.dropoff_address ?? '').trim()

  if (card.pickup_location === 'private_address' && !pickupAddress) {
    missing.push('alış adresi')
  } else if (card.pickup_location !== 'airport' && !pickupAddress && !hasHotel) {
    missing.push('alış adresi/otel')
  }

  if (card.dropoff_location === 'private_address' && !dropoffAddress) {
    missing.push('varış adresi')
  } else if (card.dropoff_location !== 'airport' && !dropoffAddress && !hasHotel) {
    missing.push('varış adresi/otel')
  }

  if ((card.pickup_location === 'airport' || card.dropoff_location === 'airport') && !card.flight_number) {
    missing.push('uçuş no')
  }

  return missing
}

function operationalWarnings(card) {
  const warnings = []
  const missing = missingInformation(card)
  if (missing.length) {
    warnings.push({ kind: 'missing', text: `Eksik bilgi: ${missing.join(', ')}` })
  }

  const childSeats = Number(card.child_seat_count) || 0
  if (childSeats > 0) {
    warnings.push({ kind: 'prep', text: `${childSeats} çocuk koltuğu hazırla` })
  }

  const luggage = Number(card.luggage_count) || 0
  const guests = Number(card.guests) || 0
  if (luggage >= 5 || luggage > guests) {
    warnings.push({ kind: 'prep', text: `Fazla bagaj: ${luggage} adet` })
  }

  const notes = []
  const bookingNote = String(card.notes ?? '').trim()
  if (bookingNote) notes.push(bookingNote)

  const latestAdminNote = [...(card.booking_notes ?? [])]
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))[0]?.note?.trim()
  if (latestAdminNote && !notes.includes(latestAdminNote)) notes.push(latestAdminNote)

  for (const note of notes.slice(0, 2)) {
    warnings.push({ kind: 'note', text: note })
  }

  return warnings
}

function warningHTML(warning) {
  const icon = warning.kind === 'missing' ? '⚠️' : warning.kind === 'note' ? '📌' : '❗'
  return `<div class="card-warning card-warning-${warning.kind}"><span aria-hidden="true">${icon}</span><span>${escapeHTML(warning.text)}</span></div>`
}

function navigationHTML(card) {
  const urls = navigationURLs({
    originValue: card.pickup_location,
    originAddress: card.pickup_address,
    destinationValue: card.dropoff_location,
    destinationAddress: card.dropoff_address,
    hotelName: card.hotel_name,
  })
  return `
    <div class="card-navigation" aria-label="Google Haritalar ile transfer rotası için yol tarifi">
      <a href="${escapeHTML(urls.google)}" target="_blank" rel="noopener noreferrer"><span aria-hidden="true">↗</span> Adrese yol tarifi al</a>
    </div>`
}

function returnContactAlertHTML(card) {
  if (!card._needsReturnContact) return ''

  return `
    <div class="return-contact-alert" role="status">
      <span class="return-contact-icon" aria-hidden="true">☎</span>
      <span class="return-contact-copy">
        <strong>Gidiş seyahati için iletişime geç</strong>
        <small>Geliş tamamlandı · Planlanan dönüş ${escapeHTML(card._displayDate)} ${fmtTime(card._displayTime)}</small>
      </span>
      <a href="${escapeHTML(whatsappURL(card.customer_phone))}" target="_blank" rel="noopener noreferrer">WhatsApp</a>
    </div>`
}

function paymentInfoHTML(card) {
  const paymentMethod = card.payment_method === 'cash' ? 'Nakit' : 'Kart'
  const totalPrice = Number(card.price_eur) || 0

  if (card.trip_type !== 'round_trip') {
    return `<div class="card-info-item full payment-info">
      <span class="card-info-label">Ödeme</span>
      <div class="card-info-value">${paymentMethod} · <strong>€${fmtPrice(totalPrice)}</strong></div>
    </div>`
  }

  const halfPrice = totalPrice / 2

  if (card._isReturn) {
    return `<div class="card-info-item full payment-info payment-info-settled">
      <span class="card-info-label">Dönüş ücreti</span>
      <div class="card-info-value"><strong>€${fmtPrice(halfPrice)}</strong><small>Gidişte tahsil edildi</small></div>
    </div>`
  }

  return `<div class="card-info-item full payment-info payment-info-collect">
    <span class="card-info-label">Gidiş ücreti</span>
    <div class="card-info-value"><strong>€${fmtPrice(halfPrice)}</strong><small>${paymentMethod} · Gidişte tahsil edilecek · Toplam €${fmtPrice(totalPrice)}</small></div>
  </div>`
}

function cardHTML(c, { showPastConfirm = false, showFlightAlert = true } = {}) {
  const pickupDisplay = locationDisplay(c.pickup_location, c.pickup_address)
  const dropoffDisplay = locationDisplay(c.dropoff_location, c.dropoff_address)
  const showSeparateFlightArrival = c.flight_arrival_time && c.flight_arrival_time !== c._displayTime
  const badges = `
    <div class="card-badges">
      <span class="badge badge-${c.status}">${statusLabel(c.status, c.trip_type === 'round_trip')}</span>
      ${c.trip_type === 'round_trip'
        ? `<span class="badge ${c._isReturn ? 'badge-return' : 'badge-outbound'}">${c._isReturn ? 'DÖNÜŞ' : 'GİDİŞ'}</span>`
        : ''}
    </div>`
  const warnings = operationalWarnings(c)
  const vehicle = c.vehicle_type === 'vclass' ? 'V-Class' : 'Vito'
  const childSeats = Number(c.child_seat_count) || 0
  const luggage = Number(c.luggage_count) || 0
  const confirmButton = showPastConfirm && c.status === 'pending'
    ? `<button class="card-confirm-button" type="button" data-confirm-past="${escapeHTML(c.booking_ref)}"><span aria-hidden="true">✓</span> Onayla</button>`
    : ''
  const infoItems = [
    `<div class="card-info-item full">
      <span class="card-info-label">Müşteri</span>
      <div class="card-info-value customer-value"><strong>${escapeHTML(c.customer_name)}</strong><a href="tel:${escapeHTML(c.customer_phone)}">${escapeHTML(c.customer_phone)}</a></div>
    </div>`,
    c.flight_number ? `<div class="card-info-item">
      <span class="card-info-label">Uçuş</span>
      <div class="card-info-value">✈ ${escapeHTML(c.flight_number)}${showSeparateFlightArrival ? ` · ${fmtTime(c.flight_arrival_time)}` : ''}</div>
    </div>` : '',
    c.hotel_name && hasUsefulHotel(c.hotel_name) ? `<div class="card-info-item${c.flight_number ? '' : ' full'}">
      <span class="card-info-label">Otel / Konaklama</span>
      <div class="card-info-value">${escapeHTML(c.hotel_name)}</div>
    </div>` : '',
    `<div class="card-info-item">
      <span class="card-info-label">Yolcu & Araç</span>
      <div class="card-info-value">${escapeHTML(c.guests)} kişi · ${vehicle}</div>
    </div>`,
    `<div class="card-info-item">
      <span class="card-info-label">Bagaj & Koltuk</span>
      <div class="card-info-value">${luggage} bagaj · ${childSeats ? `${childSeats} koltuk` : 'Koltuk yok'}</div>
    </div>`,
    paymentInfoHTML(c),
    c.pickup_address ? `<div class="card-info-item full address-info">
      <span class="card-info-label">Alış adresi</span>
      <div class="card-info-value">${escapeHTML(c.pickup_address)}</div>
    </div>` : '',
    c.dropoff_address ? `<div class="card-info-item full address-info">
      <span class="card-info-label">Varış adresi</span>
      <div class="card-info-value">${escapeHTML(c.dropoff_address)}</div>
    </div>` : '',
  ].filter(Boolean)

  return `
    <div class="card status-${c.status}" data-ref="${escapeHTML(c.booking_ref)}" data-return="${c._isReturn}" data-date="${escapeHTML(c._displayDate)}" data-time="${escapeHTML(c._displayTime ?? '')}" data-status="${escapeHTML(c.status)}" data-flight-date="${c.pickup_location === 'airport' && c.flight_arrival_time ? escapeHTML(c._displayDate) : ''}" data-flight-arrival="${c.pickup_location === 'airport' ? escapeHTML(c.flight_arrival_time ?? '') : ''}">
      ${returnContactAlertHTML(c)}
      ${showFlightAlert ? `<div class="flight-landed-alert" data-flight-landed-alert role="status" hidden>
        <span class="flight-landed-icon" aria-hidden="true">✈</span>
        <span><strong>Uçak iniş saati geldi</strong><small data-flight-landed-copy></small></span>
      </div>` : ''}
      <div class="card-header">
        <div class="card-time-block">
          <span class="card-time-label">Transfer saati</span>
          <div class="card-time">${fmtTime(c._displayTime)}</div>
          <div class="card-live-time" data-live-time></div>
        </div>
        ${badges}
      </div>
      <div class="card-route" aria-label="${escapeHTML(pickupDisplay)} konumundan ${escapeHTML(dropoffDisplay)} konumuna">
        <div class="route-point route-pickup">
          <span class="route-marker" aria-hidden="true"></span>
          <div><span class="route-label">Alış</span><strong>${escapeHTML(pickupDisplay)}</strong></div>
        </div>
        <div class="route-point route-dropoff">
          <span class="route-marker" aria-hidden="true"></span>
          <div><span class="route-label">Varış</span><strong>${escapeHTML(dropoffDisplay)}</strong></div>
        </div>
      </div>
      ${warnings.length ? `<div class="card-warnings">${warnings.map(warningHTML).join('')}</div>` : ''}
      <div class="card-info-grid">${infoItems.join('')}</div>
      ${navigationHTML(c)}
      <div class="card-footer">
        <span class="card-reference">${escapeHTML(c.booking_ref)}</span>
        ${!c._isReturn && c.trip_type === 'round_trip' && c.return_date
          ? `<button class="card-goto-return-button" type="button" data-goto-return="${escapeHTML(c.booking_ref)}">Dönüşü Gör ↓</button>`
          : ''}
        <div class="card-footer-actions${confirmButton ? ' has-confirm' : ''}">
          ${confirmButton}
          <button class="card-detail-button" type="button" data-open-detail>Detayları aç <span aria-hidden="true">›</span></button>
        </div>
      </div>
    </div>`
}

function istanbulWallClock(value = new Date()) {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: ISTANBUL_TIME_ZONE,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(value)
  const part = (type) => Number(parts.find(item => item.type === type)?.value)
  return Date.UTC(part('year'), part('month') - 1, part('day'), part('hour'), part('minute'))
}

function transferWallClock(date, time) {
  if (!date || !time) return null
  const [year, month, day] = date.split('-').map(Number)
  const [hour, minute] = time.slice(0, 5).split(':').map(Number)
  const timestamp = Date.UTC(year, month - 1, day, hour, minute)
  return Number.isFinite(timestamp) ? timestamp : null
}

function isCardPast(card, today, nowWallClock) {
  if (card._displayDate < today) return true
  if (card._displayDate > today) return false
  if (!card._displayTime) return false
  const cardAt = transferWallClock(card._displayDate, card._displayTime)
  if (cardAt === null) return false
  return cardAt < nowWallClock
}

function liveTiming(date, time, status) {
  if (!date || !time || status === 'completed') return { text: '', className: '' }
  if (status === 'in_transit') return { text: 'Devam ediyor', className: 'active' }

  const transferAt = transferWallClock(date, time)
  if (transferAt === null) return { text: '', className: '' }
  const differenceMinutes = Math.round((transferAt - istanbulWallClock()) / 60000)

  if (differenceMinutes < -1) return { text: `${Math.abs(differenceMinutes)} dk geçti`, className: 'late' }
  if (differenceMinutes <= 5) return { text: 'Şimdi', className: 'now' }
  if (differenceMinutes <= 60) return { text: `${differenceMinutes} dk kaldı`, className: 'soon' }
  return { text: '', className: '' }
}

function flightLandingAlert(date, time, status) {
  if (!date || !time || !['pending', 'paid', 'confirmed'].includes(status)) return null

  const arrivalAt = transferWallClock(date, time)
  if (arrivalAt === null) return null
  const elapsedMinutes = Math.floor((istanbulWallClock() - arrivalAt) / 60000)
  if (elapsedMinutes < 0) return null

  const elapsedHours = Math.floor(elapsedMinutes / 60)
  const remainingMinutes = elapsedMinutes % 60
  const elapsedText = elapsedMinutes < 1
    ? 'şimdi'
    : elapsedMinutes < 60
      ? `${elapsedMinutes} dk geçti`
      : remainingMinutes
        ? `${elapsedHours} sa ${remainingMinutes} dk geçti`
        : `${elapsedHours} sa geçti`

  return `Planlanan varış ${fmtTime(time)} · ${elapsedText}`
}

function updateLiveIndicators() {
  const clock = document.getElementById('live-clock')
  const date = document.getElementById('live-date')
  if (clock) clock.textContent = fmtSyncTime()
  if (date) date.textContent = fmtLiveDate()

  document.querySelectorAll('[data-live-time]').forEach(element => {
    const card = element.closest('.card')
    if (!card) return
    const timing = liveTiming(card.dataset.date, card.dataset.time, card.dataset.status)
    element.textContent = timing.text
    element.className = `card-live-time${timing.className ? ` ${timing.className}` : ''}`
  })

  document.querySelectorAll('[data-flight-landed-alert]').forEach(element => {
    const card = element.closest('.card')
    if (!card) return
    const alertCopy = flightLandingAlert(
      card.dataset.flightDate,
      card.dataset.flightArrival,
      card.dataset.status,
    )
    element.hidden = !alertCopy
    const copy = element.querySelector('[data-flight-landed-copy]')
    if (copy) copy.textContent = alertCopy ?? ''
    card.classList.toggle('flight-arrived', Boolean(alertCopy))
  })
}

function cacheTodayBookings(bookings, today, futureReservationCount) {
  try {
    const todayBookings = bookings.filter(booking => booking.pickup_date === today || booking.return_date === today)
    localStorage.setItem(TODAY_CACHE_KEY, JSON.stringify({
      date: today,
      savedAt: new Date().toISOString(),
      futureReservationCount,
      bookings: todayBookings,
    }))
  } catch {
    // Private browsing and storage limits should not block the online timeline.
  }
}

function readTodayCache(today) {
  try {
    const cached = JSON.parse(localStorage.getItem(TODAY_CACHE_KEY) || 'null')
    if (!cached || cached.date !== today || !Array.isArray(cached.bookings)) return null
    return cached
  } catch {
    return null
  }
}

export function clearTimelineCache() {
  try {
    localStorage.removeItem(TODAY_CACHE_KEY)
  } catch {
    // Nothing else is required when storage is unavailable.
  }
}

export function stopTimeline() {
  timelineCleanup?.()
  timelineCleanup = null
}

export async function renderTimeline(container, navigate, selectedTab = 'future') {
  stopTimeline()

  const today = todayISO()
  const tomorrow = offsetISO(1)
  const isPast = selectedTab === 'past'

  container.innerHTML = `
    <div class="topbar">
      <span class="topbar-title">🚗 VIP Yönetim</span>
      <div class="topbar-actions">
        <button class="topbar-new" id="new-btn">+ Yeni Kayıt</button>
        <button class="topbar-icon" id="admin-btn" aria-label="Yönetici paneli" title="Yönetici paneli">⚙️</button>
        <button class="topbar-logout" id="logout-btn">Çıkış</button>
      </div>
    </div>
    <div class="timeline-tabs timeline-tabs-with-budget" role="tablist" aria-label="Yönetim sayfaları">
      <button class="timeline-tab ${isPast ? '' : 'active'}" type="button" role="tab" aria-selected="${!isPast}" data-admin-view="future">Gelecek</button>
      <button class="timeline-tab ${isPast ? 'active' : ''}" type="button" role="tab" aria-selected="${isPast}" data-admin-view="past">Geçmiş</button>
      <button class="timeline-tab" type="button" role="tab" aria-selected="false" data-admin-view="budget">Bütçe</button>
    </div>
    ${isPast ? '' : `
      <div class="stats" id="stats-strip">
        <div class="stat stat-bugün"><div class="stat-number" id="stat-bugun">…</div><div class="stat-label">Bugün</div></div>
        <div class="stat stat-yarın"><div class="stat-number" id="stat-yarin">…</div><div class="stat-label">Yarın</div></div>
        <div class="stat stat-gelecek-rez"><div class="stat-number" id="stat-gelecek-rez">…</div><div class="stat-label">Gelecek Rez.</div></div>
      </div>`}
    <div class="timeline-statusbar">
      <div class="live-clock-wrap"><span id="live-date"></span><strong id="live-clock"></strong></div>
      <div class="sync-wrap"><span id="sync-status">Yükleniyor…</span><button class="sync-button" id="refresh-btn" type="button" aria-label="Transferleri yenile">↻</button></div>
    </div>
    <div class="search-bar">
      <input class="search-input" type="search" id="customer-search" placeholder="Müşteri adıyla ara…" autocomplete="off" />
    </div>
    <div class="offline-banner" id="offline-banner" hidden></div>
    <div class="scroll-area" id="booking-list"><div class="empty"><div>Yükleniyor…</div></div></div>
  `

  const list = document.getElementById('booking-list')
  const syncStatus = document.getElementById('sync-status')
  const offlineBanner = document.getElementById('offline-banner')
  const refreshBtn = document.getElementById('refresh-btn')
  const searchInput = document.getElementById('customer-search')
  let refreshInFlight = false
  let hasRenderedData = false
  let lastBookings = null
  let searchQuery = ''

  document.getElementById('new-btn').addEventListener('click', () => navigate('#new'))
  document.getElementById('admin-btn').addEventListener('click', () => navigate('#admin'))

  document.getElementById('logout-btn').addEventListener('click', async () => {
    clearTimelineCache()
    await supabase.auth.signOut()
    navigate('#login')
  })

  document.querySelector('.timeline-tabs').addEventListener('click', (event) => {
    const tab = event.target.closest('[data-admin-view]')
    if (!tab || tab.dataset.adminView === selectedTab) return
    if (tab.dataset.adminView === 'budget') {
      navigate('#budget')
      return
    }
    navigate(tab.dataset.adminView === 'past' ? '#timeline?tab=past' : '#timeline')
  })

  list.addEventListener('click', async (event) => {
    const gotoReturnBtn = event.target.closest('[data-goto-return]')
    if (gotoReturnBtn) {
      const ref = gotoReturnBtn.dataset.gotoReturn
      const returnCard = list.querySelector(`.card[data-ref="${CSS.escape(ref)}"][data-return="true"]`)
      if (returnCard) {
        const details = returnCard.closest('details')
        if (details) details.open = true
        returnCard.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }
      return
    }

    const confirmButton = event.target.closest('[data-confirm-past]')
    if (confirmButton) {
      const bookingRef = confirmButton.dataset.confirmPast
      confirmButton.disabled = true
      confirmButton.innerHTML = '<span aria-hidden="true">…</span> Onaylanıyor'

      const { count, error } = await supabase
        .from('bookings')
        .update({ status: 'confirmed' }, { count: 'exact' })
        .eq('booking_ref', bookingRef)
        .eq('status', 'pending')

      if (error || count === 0) {
        confirmButton.disabled = false
        confirmButton.classList.add('has-error')
        confirmButton.textContent = 'Tekrar dene'
        return
      }

      await refreshBookings()
      return
    }

    const detailButton = event.target.closest('[data-open-detail]')
    if (event.target.closest('a, summary') || (event.target.closest('button') && !detailButton)) return
    const card = event.target.closest('.card')
    if (!card) return
    const params = new URLSearchParams()
    if (card.dataset.return === 'true') params.set('leg', 'return')
    if (isPast) params.set('from', 'past')
    const queryString = params.toString()
    navigate(`#detail/${encodeURIComponent(card.dataset.ref)}${queryString ? `?${queryString}` : ''}`)
  })

  function renderCards(bookings, { cachedOnly = false, futureReservationCount = null } = {}) {
    lastBookings = bookings
    const now = istanbulWallClock()
    const q = searchQuery.trim().toLocaleLowerCase('tr-TR')
    const sourceBookings = q
      ? (bookings ?? []).filter(b => String(b.customer_name ?? '').toLocaleLowerCase('tr-TR').includes(q))
      : bookings ?? []
    const cards = expandRoundTrips(sourceBookings, selectedTab).filter(card => {
      if (cachedOnly) return card._displayDate === today
      return isPast ? isCardPast(card, today, now) : !isCardPast(card, today, now)
    })

    if (!isPast) {
      const operationalStatuses = ['pending', 'paid', 'confirmed', 'in_transit']
      const allCards = expandRoundTrips(bookings ?? [], selectedTab).filter(card => !isCardPast(card, today, now))
      const bugun = allCards.filter(c => c._displayDate === today && operationalStatuses.includes(c.status)).length
      const yarin = allCards.filter(c => c._displayDate === tomorrow && operationalStatuses.includes(c.status)).length
      const gelecekRezervasyon = Number.isInteger(futureReservationCount)
        ? futureReservationCount
        : countFutureReservations(bookings)
      document.getElementById('stat-bugun').textContent = bugun
      document.getElementById('stat-yarin').textContent = yarin
      document.getElementById('stat-gelecek-rez').textContent = gelecekRezervasyon
    }

    const groups = groupByDay(cards, today, tomorrow, selectedTab)
    const hasBookings = [...groups.values()].some(group => group.length > 0)
    if (!hasBookings) {
      const emptyMsg = q
        ? `"${q}" için sonuç bulunamadı`
        : cachedOnly ? 'Önbellekte bugünkü transfer yok' : isPast ? 'Geçmiş transfer yok' : 'Gelecek transfer yok'
      list.innerHTML = `<div class="empty"><div class="empty-icon">📅</div><div>${emptyMsg}</div></div>`
      hasRenderedData = true
      return
    }

    list.innerHTML = ''
    for (const [key, group] of groups) {
      if (!group.length) continue
      let dateLabel
      if (key === 'Bugün') dateLabel = `Bugün · ${turkishDayLabel(today)}`
      else if (key === 'Yarın') dateLabel = `Yarın · ${turkishDayLabel(tomorrow)}`
      else dateLabel = turkishDayLabel(key)

      const collapseCompleted = !isPast && (key === 'Bugün' || key === today)
      const completed = collapseCompleted ? group.filter(card => card.status === 'completed') : []
      const active = collapseCompleted ? group.filter(card => card.status !== 'completed') : group
      const renderCard = card => cardHTML(card, { showPastConfirm: isPast, showFlightAlert: !isPast })
      const completedHTML = completed.length
        ? `<details class="completed-group"><summary>Tamamlananlar (${completed.length})</summary><div class="completed-list">${completed.map(renderCard).join('')}</div></details>`
        : ''

      list.innerHTML += `<div class="day-group"><div class="day-label">📅 ${dateLabel}</div>${active.map(renderCard).join('')}${completedHTML}</div>`
    }
    hasRenderedData = true
    updateLiveIndicators()
  }

  function showCachedTimeline() {
    const cached = readTodayCache(today)
    if (!cached || isPast) return false
    renderCards(cached.bookings, {
      cachedOnly: true,
      futureReservationCount: Number.isInteger(cached.futureReservationCount)
        ? cached.futureReservationCount
        : null,
    })
    const cachedTime = fmtSyncTime(new Date(cached.savedAt))
    syncStatus.textContent = `Kayıt: ${cachedTime}`
    offlineBanner.hidden = false
    offlineBanner.textContent = `Çevrimdışı · Bugünkü kayıtlar gösteriliyor · Son senkronizasyon ${cachedTime}`
    return true
  }

  async function refreshBookings() {
    if (refreshInFlight || document.getElementById('booking-list') !== list) return

    if (!navigator.onLine) {
      if (!hasRenderedData && !showCachedTimeline()) {
        list.innerHTML = '<div class="empty"><div>İnternet bağlantısı yok ve bugüne ait kayıt bulunamadı.</div></div>'
      } else {
        offlineBanner.hidden = false
        offlineBanner.textContent = 'Çevrimdışı · Son görüntülenen kayıtlar gösteriliyor'
      }
      syncStatus.textContent = 'Çevrimdışı'
      return
    }

    refreshInFlight = true
    refreshBtn.disabled = true
    syncStatus.textContent = 'Yenileniyor…'

    let query = supabase
      .from('bookings')
      .select('*, booking_notes(id, note, created_at)')
      .in('status', ['pending', 'paid', 'confirmed', 'in_transit', 'completed'])

    query = isPast
      ? query.lte('pickup_date', today)
      : query.or(`pickup_date.gte.${today},return_date.gte.${today}`)

    const { data, error } = await query
      .order('pickup_date')
      .order('pickup_time', { nullsFirst: false })

    refreshInFlight = false
    refreshBtn.disabled = false
    if (document.getElementById('booking-list') !== list) return

    if (error) {
      if (!hasRenderedData && !showCachedTimeline()) {
        list.innerHTML = '<div class="empty"><div>Yükleme hatası</div></div>'
      }
      syncStatus.textContent = 'Bağlantı hatası'
      offlineBanner.hidden = false
      offlineBanner.textContent = 'Bağlantı kurulamadı · Son görüntülenen kayıtlar korunuyor'
      return
    }

    const futureReservationCount = isPast ? null : countFutureReservations(data ?? [])
    renderCards(data ?? [], { futureReservationCount })
    if (!isPast) cacheTodayBookings(data ?? [], today, futureReservationCount)
    const updatedAt = fmtSyncTime()
    syncStatus.textContent = `Son güncelleme: ${updatedAt}`
    offlineBanner.hidden = true
  }

  const handleOffline = () => {
    syncStatus.textContent = 'Çevrimdışı'
    offlineBanner.hidden = false
    offlineBanner.textContent = 'Çevrimdışı · Son görüntülenen kayıtlar korunuyor'
  }
  const handleOnline = () => refreshBookings()

  refreshBtn.addEventListener('click', refreshBookings)

  searchInput.addEventListener('input', () => {
    searchQuery = searchInput.value
    if (lastBookings !== null) renderCards(lastBookings)
  })

  window.addEventListener('offline', handleOffline)
  window.addEventListener('online', handleOnline)

  updateLiveIndicators()
  const clockTimer = window.setInterval(updateLiveIndicators, 30_000)
  const refreshTimer = window.setInterval(refreshBookings, AUTO_REFRESH_MS)
  timelineCleanup = () => {
    window.clearInterval(clockTimer)
    window.clearInterval(refreshTimer)
    window.removeEventListener('offline', handleOffline)
    window.removeEventListener('online', handleOnline)
  }

  await refreshBookings()
}
