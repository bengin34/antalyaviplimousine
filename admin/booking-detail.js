import { supabase } from './supabase-client.js'
import { locationDisplay, navigationURLs, whatsappURL } from './turkish-formatters.js'
import { VEHICLE_CAPACITY, locationOptionsHTML } from './booking-new.js'

function fmtTime(t) { return t ? t.slice(0, 5) : '—' }

function transferStartTime(pickupLocation, pickupTime, flightArrivalTime) {
  if (pickupLocation === 'airport') return flightArrivalTime || pickupTime
  return pickupTime
}

function fmtDate(d) {
  if (!d) return '—'
  const date = new Date(`${d}T12:00:00Z`)
  const label = new Intl.DateTimeFormat('tr-TR', {
    timeZone: 'Europe/Istanbul',
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date)
  return label.charAt(0).toLocaleUpperCase('tr-TR') + label.slice(1)
}

function fmtPrice(value) {
  return new Intl.NumberFormat('tr-TR', { maximumFractionDigits: 2 }).format(Number(value) || 0)
}

function escapeHTML(value) {
  return String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;')
}

const STATUS_LABELS = {
  pending: 'Bekliyor',
  paid: 'Ödendi',
  confirmed: 'Onaylı',
  in_transit: 'Yolda',
  completed: 'Tamamlandı',
  cancelled: 'İptal',
}

const STATUS_TRANSITIONS = {
  pending: ['confirmed', 'cancelled'],
  paid: ['in_transit'],
  confirmed: ['in_transit', 'cancelled'],
  in_transit: ['completed', 'cancelled'],
  completed: [],
  cancelled: [],
}

const STATUS_COLORS = {
  pending: 'orange',
  paid: 'green',
  confirmed: 'green',
  in_transit: 'blue',
  completed: '',
  cancelled: 'red',
}

function selected(value, expected) {
  return value === expected ? ' selected' : ''
}

function bookingEditFormHTML(b) {
  const isRoundTrip = b.trip_type === 'round_trip'
  const needsPickupAddress = b.pickup_location === 'private_address'
  const needsDropoffAddress = b.dropoff_location === 'private_address'

  return `
    <form id="booking-edit-form" novalidate>
      <div class="booking-edit-group">
        <div class="section-label">Müşteri</div>
        <div class="form-field">
          <label class="form-label" for="edit-name">Ad Soyad *</label>
          <input class="input" type="text" id="edit-name" maxlength="80" autocomplete="off" value="${escapeHTML(b.customer_name)}" required />
        </div>
        <div class="form-row">
          <div class="form-field">
            <label class="form-label" for="edit-phone">Telefon *</label>
            <input class="input" type="tel" id="edit-phone" autocomplete="off" value="${escapeHTML(b.customer_phone)}" required />
          </div>
          <div class="form-field">
            <label class="form-label" for="edit-email">E-posta</label>
            <input class="input" type="email" id="edit-email" maxlength="120" autocomplete="off" value="${escapeHTML(b.customer_email)}" />
          </div>
        </div>
        <div class="form-field">
          <label class="form-label" for="edit-hotel">Otel / Konaklama</label>
          <input class="input" type="text" id="edit-hotel" maxlength="120" autocomplete="off" value="${escapeHTML(b.hotel_name)}" />
        </div>
      </div>

      <div class="booking-edit-group">
        <div class="section-label">Transfer</div>
        <div class="form-field">
          <label class="form-label" for="edit-trip-type">Sefer türü</label>
          <select class="input" id="edit-trip-type">
            <option value="one_way"${selected(b.trip_type, 'one_way')}>Tek yön</option>
            <option value="round_trip"${selected(b.trip_type, 'round_trip')}>Gidiş-dönüş</option>
          </select>
        </div>
        <div class="form-row">
          <div class="form-field">
            <label class="form-label" for="edit-pickup">Alış *</label>
            <select class="input" id="edit-pickup">${locationOptionsHTML(b.pickup_location)}</select>
          </div>
          <div class="form-field">
            <label class="form-label" for="edit-dropoff">Varış *</label>
            <select class="input" id="edit-dropoff">${locationOptionsHTML(b.dropoff_location)}</select>
          </div>
        </div>
        <div class="form-row" id="edit-private-address-row"${needsPickupAddress || needsDropoffAddress ? '' : ' hidden'}>
          <div class="form-field" id="edit-pickup-address-field"${needsPickupAddress ? '' : ' hidden'}>
            <label class="form-label" for="edit-pickup-address">Alış özel adresi *</label>
            <input class="input" type="text" id="edit-pickup-address" maxlength="160" autocomplete="street-address" value="${escapeHTML(b.pickup_address)}" />
          </div>
          <div class="form-field" id="edit-dropoff-address-field"${needsDropoffAddress ? '' : ' hidden'}>
            <label class="form-label" for="edit-dropoff-address">Varış özel adresi *</label>
            <input class="input" type="text" id="edit-dropoff-address" maxlength="160" autocomplete="street-address" value="${escapeHTML(b.dropoff_address)}" />
          </div>
        </div>
        <div class="form-row">
          <div class="form-field">
            <label class="form-label" for="edit-date">Tarih *</label>
            <input class="input" type="date" id="edit-date" value="${escapeHTML(b.pickup_date)}" required />
          </div>
          <div class="form-field">
            <label class="form-label" for="edit-time">Saat</label>
            <input class="input" type="time" id="edit-time" value="${escapeHTML(fmtTime(b.pickup_time) === '—' ? '' : fmtTime(b.pickup_time))}" />
          </div>
        </div>
        <div class="form-row">
          <div class="form-field">
            <label class="form-label" for="edit-flight">Uçuş no</label>
            <input class="input" type="text" id="edit-flight" maxlength="12" autocomplete="off" value="${escapeHTML(b.flight_number)}" />
          </div>
          <div class="form-field">
            <label class="form-label" for="edit-flight-time">Uçuş varış</label>
            <input class="input" type="time" id="edit-flight-time" value="${escapeHTML(fmtTime(b.flight_arrival_time) === '—' ? '' : fmtTime(b.flight_arrival_time))}" />
          </div>
        </div>
      </div>

      <div class="booking-edit-group" id="edit-return-section"${isRoundTrip ? '' : ' hidden'}>
        <div class="section-label">Dönüş</div>
        <div class="form-row">
          <div class="form-field">
            <label class="form-label" for="edit-return-date">Dönüş tarihi *</label>
            <input class="input" type="date" id="edit-return-date" value="${escapeHTML(b.return_date)}" />
          </div>
          <div class="form-field">
            <label class="form-label" for="edit-return-time">Dönüş saati *</label>
            <input class="input" type="time" id="edit-return-time" value="${escapeHTML(fmtTime(b.return_pickup_time) === '—' ? '' : fmtTime(b.return_pickup_time))}" />
          </div>
        </div>
        <div class="form-field">
          <label class="form-label" for="edit-return-flight">Dönüş uçuş no</label>
          <input class="input" type="text" id="edit-return-flight" maxlength="12" autocomplete="off" value="${escapeHTML(b.return_flight_number)}" />
        </div>
      </div>

      <div class="booking-edit-group">
        <div class="section-label">Araç & Detaylar</div>
        <div class="form-row">
          <div class="form-field">
            <label class="form-label" for="edit-vehicle">Araç *</label>
            <select class="input" id="edit-vehicle">
              <option value="vito"${selected(b.vehicle_type, 'vito')}>Vito</option>
              <option value="vclass"${selected(b.vehicle_type, 'vclass')}>V-Class</option>
            </select>
          </div>
          <div class="form-field">
            <label class="form-label" for="edit-guests">Yolcu *</label>
            <input class="input" type="number" id="edit-guests" min="1" max="${VEHICLE_CAPACITY[b.vehicle_type] ?? 8}" step="1" inputmode="numeric" value="${escapeHTML(b.guests)}" required />
          </div>
        </div>
        <div class="form-row">
          <div class="form-field">
            <label class="form-label" for="edit-luggage">Bagaj</label>
            <input class="input" type="number" id="edit-luggage" min="0" max="12" step="1" inputmode="numeric" value="${escapeHTML(b.luggage_count)}" />
          </div>
          <div class="form-field">
            <label class="form-label" for="edit-child">Çocuk koltuğu</label>
            <input class="input" type="number" id="edit-child" min="0" max="4" step="1" inputmode="numeric" value="${escapeHTML(b.child_seat_count)}" />
          </div>
        </div>
      </div>

      <div class="booking-edit-group">
        <div class="section-label">Ödeme & Not</div>
        <div class="form-row">
          <div class="form-field">
            <label class="form-label" for="edit-price">Fiyat (€) *</label>
            <input class="input" type="number" id="edit-price" min="0" max="999999.99" step="0.01" inputmode="decimal" value="${escapeHTML(b.price_eur)}" required />
          </div>
          <div class="form-field">
            <label class="form-label" for="edit-payment">Ödeme</label>
            <select class="input" id="edit-payment">
              <option value="cash"${selected(b.payment_method, 'cash')}>Nakit</option>
              <option value="card"${selected(b.payment_method, 'card')}>Kart</option>
            </select>
          </div>
        </div>
        <div class="form-field">
          <label class="form-label" for="edit-notes">Rezervasyon notu</label>
          <textarea class="input" id="edit-notes" rows="3" maxlength="500">${escapeHTML(b.notes)}</textarea>
        </div>
      </div>

      <div class="booking-edit-actions">
        <button class="btn" type="submit" id="booking-edit-save-btn">Değişiklikleri Kaydet</button>
        <button class="btn-outline" type="button" id="booking-edit-cancel-btn">İptal</button>
      </div>
      <div class="inline-error" id="booking-edit-error"></div>
    </form>
  `
}

export async function renderDetail(container, bookingRef, navigate, isReturn = false, sourceTab = 'future') {
  container.innerHTML = `
    <div class="topbar">
      <button class="detail-back" id="back-btn">← Geri</button>
      <span class="topbar-title">Transfer Detayı</span>
      <span></span>
    </div>
    <div class="scroll-area" id="detail-body"><div class="empty"><div>Yükleniyor…</div></div></div>
  `
  document.getElementById('back-btn').addEventListener('click', () => {
    navigate(sourceTab === 'past' ? '#timeline?tab=past' : '#timeline')
  })

  const { data: rows, error } = await supabase
    .from('bookings')
    .select('*, booking_notes(id, note, created_at)')
    .eq('booking_ref', bookingRef)
    .limit(1)

  if (error || !rows?.length) {
    document.getElementById('detail-body').innerHTML = `<div class="empty"><div>Rezervasyon bulunamadı</div></div>`
    return
  }

  renderDetailBody(rows[0], navigate, bookingRef, isReturn)
}

function renderDetailBody(b, navigate, bookingRef, isReturn) {
  const body = document.getElementById('detail-body')
  const transfer = isReturn && b.trip_type === 'round_trip' && b.return_date
    ? {
        date: b.return_date,
        time: b.return_pickup_time,
        pickupLocation: b.dropoff_location,
        dropoffLocation: b.pickup_location,
        pickupAddress: b.dropoff_address,
        dropoffAddress: b.pickup_address,
        flightNumber: b.return_flight_number,
        flightArrivalTime: null,
      }
    : {
        date: b.pickup_date,
        time: transferStartTime(b.pickup_location, b.pickup_time, b.flight_arrival_time),
        pickupLocation: b.pickup_location,
        dropoffLocation: b.dropoff_location,
        pickupAddress: b.pickup_address,
        dropoffAddress: b.dropoff_address,
        flightNumber: b.flight_number,
        flightArrivalTime: b.flight_arrival_time,
      }

  const sortedNotes = [...(b.booking_notes ?? [])].sort(
    (a, c) => new Date(c.created_at) - new Date(a.created_at)
  )
  const pickupDisplay = locationDisplay(transfer.pickupLocation, transfer.pickupAddress)
  const dropoffDisplay = locationDisplay(transfer.dropoffLocation, transfer.dropoffAddress)
  const navigation = navigationURLs(transfer.pickupLocation, transfer.pickupAddress, b.hotel_name)
  const showSeparateFlightArrival = transfer.flightArrivalTime && transfer.flightArrivalTime !== transfer.time

  body.innerHTML = `
    <div class="section">
      <div style="display:flex;justify-content:space-between;align-items:center">
        <span style="color:var(--text-muted);font-size:13px">${escapeHTML(b.booking_ref)}</span>
        <div class="card-badges">
          <span class="badge badge-${b.status}" id="status-badge">${STATUS_LABELS[b.status]}</span>
          ${isReturn ? '<span class="badge badge-return">Dönüş</span>' : ''}
        </div>
      </div>
    </div>

    <div class="section">
      <div class="editable-heading" style="margin-bottom:8px">
        <div class="section-label" style="margin-bottom:0">Transfer</div>
        <button class="inline-edit-button" id="booking-edit-btn" type="button">Tümünü düzenle</button>
      </div>
      <div style="font-size:17px;font-weight:700;margin-bottom:4px">${fmtTime(transfer.time)} &nbsp;${escapeHTML(pickupDisplay)} → ${escapeHTML(dropoffDisplay)}</div>
      <div style="color:var(--text-muted);font-size:13px">${fmtDate(transfer.date)}${transfer.flightNumber ? ` · ✈️ ${escapeHTML(transfer.flightNumber)}${showSeparateFlightArrival ? ` varış ${fmtTime(transfer.flightArrivalTime)}` : ''}` : ''}</div>
      ${transfer.pickupAddress ? `<div style="color:var(--text-muted);font-size:13px;margin-top:6px">📍 Alış: ${escapeHTML(transfer.pickupAddress)}</div>` : ''}
      ${transfer.dropoffAddress ? `<div style="color:var(--text-muted);font-size:13px;margin-top:3px">📍 Varış: ${escapeHTML(transfer.dropoffAddress)}</div>` : ''}
      <div class="detail-navigation-label">Alış noktasına yol tarifi</div>
      <div class="detail-navigation" aria-label="Alış noktasına yol tarifi">
        <a href="${escapeHTML(navigation.google)}" target="_blank" rel="noopener noreferrer">Google Maps</a>
        <a href="${escapeHTML(navigation.apple)}" target="_blank" rel="noopener noreferrer">Apple Maps</a>
        <a href="${escapeHTML(navigation.yandex)}" target="_blank" rel="noopener noreferrer">Yandex</a>
      </div>
      <div class="inline-success" id="booking-edit-success" role="status"></div>
    </div>

    <div class="section booking-edit-section" id="booking-edit-section" hidden>
      ${bookingEditFormHTML(b)}
    </div>

    <div class="section">
      <div class="section-label">Müşteri</div>
      <div style="font-weight:600;margin-bottom:4px">${escapeHTML(b.customer_name)}</div>
      <div style="margin-bottom:4px">
        <a class="whatsapp-link" href="${escapeHTML(whatsappURL(b.customer_phone))}" target="_blank" rel="noopener noreferrer" aria-label="Müşterinin WhatsApp sohbetini aç">
          <span aria-hidden="true">💬</span>
          <span>WhatsApp'tan yaz: ${escapeHTML(b.customer_phone)}</span>
        </a>
      </div>
      <div class="editable-heading" style="margin-top:8px">
        <div class="detail-key">✉️ E-posta</div>
        <button class="inline-edit-button" id="email-edit-btn" type="button">Düzenle</button>
      </div>
      <div class="detail-val" id="email-display" style="font-size:13px;color:var(--text-muted)">${b.customer_email ? escapeHTML(b.customer_email) : '—'}</div>
      <div class="inline-editor" id="email-edit-row" hidden>
        <input class="input" type="email" id="email-input" maxlength="120" aria-label="E-posta" />
        <div class="inline-editor-actions">
          <button class="btn inline-editor-button" id="email-save-btn" type="button">Kaydet</button>
          <button class="btn-outline inline-editor-button" id="email-cancel-btn" type="button">İptal</button>
        </div>
        <div class="inline-error" id="email-error"></div>
      </div>
      <div class="inline-success" id="email-success" role="status"></div>
    </div>

    <div class="section">
      <div class="section-label">Detaylar</div>
      <div class="detail-grid">
        <div><div class="detail-key">Araç</div><div class="detail-val">${b.vehicle_type === 'vclass' ? 'V-Class' : 'Vito'}</div></div>
        <div><div class="detail-key">Yolcu</div><div class="detail-val">${b.guests} kişi</div></div>
        <div><div class="detail-key">Bagaj</div><div class="detail-val">${b.luggage_count > 0 ? `🧳 ${b.luggage_count}` : '—'}</div></div>
        <div><div class="detail-key">Çocuk koltuğu</div><div class="detail-val">${b.child_seat_count > 0 ? `👶 ${b.child_seat_count}` : '—'}</div></div>
        <div class="full hotel-detail">
          <div class="editable-heading">
            <div class="detail-key">Otel</div>
            <button class="inline-edit-button" id="hotel-edit-btn" type="button">Düzenle</button>
          </div>
          <div class="detail-val" id="hotel-display">${escapeHTML(b.hotel_name ?? '—')}</div>
          <div class="hotel-editor" id="hotel-edit-row" hidden>
            <input class="input" type="text" id="hotel-input" maxlength="120" aria-label="Otel adı" />
            <div class="inline-editor-actions">
              <button class="btn inline-editor-button" id="hotel-save-btn" type="button">Kaydet</button>
              <button class="btn-outline inline-editor-button" id="hotel-cancel-btn" type="button">İptal</button>
            </div>
            <div class="inline-error" id="hotel-error"></div>
          </div>
          <div class="inline-success hotel-success" id="hotel-success" role="status"></div>
        </div>
        <div class="full">
          <div class="editable-heading">
            <div class="detail-key">Alış adresi</div>
            <button class="inline-edit-button" id="address-edit-btn" type="button">Düzenle</button>
          </div>
          <div class="detail-val" id="address-display">${b.pickup_address ? '📍 ' + escapeHTML(b.pickup_address) : '—'}</div>
          <div class="inline-editor" id="address-edit-row" hidden>
            <input class="input" type="text" id="address-input" maxlength="160" aria-label="Alış adresi" />
            <div class="inline-editor-actions">
              <button class="btn inline-editor-button" id="address-save-btn" type="button">Kaydet</button>
              <button class="btn-outline inline-editor-button" id="address-cancel-btn" type="button">İptal</button>
            </div>
            <div class="inline-error" id="address-error"></div>
          </div>
          <div class="inline-success" id="address-success" role="status"></div>
        </div>
        <div class="full">
          <div class="editable-heading">
            <div class="detail-key">Varış adresi</div>
            <button class="inline-edit-button" id="dropoff-address-edit-btn" type="button">Düzenle</button>
          </div>
          <div class="detail-val" id="dropoff-address-display">${b.dropoff_address ? '📍 ' + escapeHTML(b.dropoff_address) : '—'}</div>
          <div class="inline-editor" id="dropoff-address-edit-row" hidden>
            <input class="input" type="text" id="dropoff-address-input" maxlength="160" aria-label="Varış adresi" />
            <div class="inline-editor-actions">
              <button class="btn inline-editor-button" id="dropoff-address-save-btn" type="button">Kaydet</button>
              <button class="btn-outline inline-editor-button" id="dropoff-address-cancel-btn" type="button">İptal</button>
            </div>
            <div class="inline-error" id="dropoff-address-error"></div>
          </div>
          <div class="inline-success" id="dropoff-address-success" role="status"></div>
        </div>
      </div>
    </div>

    <div class="section">
      <div class="section-label">Ödeme</div>
      <div style="display:flex;justify-content:space-between;align-items:center">
        <span>${b.payment_method === 'cash' ? 'Nakit' : 'Kart'}</span>
        <div style="display:flex;align-items:center;gap:8px">
          <span style="font-weight:700" id="price-display">€${fmtPrice(b.price_eur)}</span>
          <button class="btn-outline price-edit-btn" id="price-edit-btn">Düzenle</button>
        </div>
      </div>
      <div class="price-editor" id="price-edit-row" hidden>
        <div class="price-editor-row">
          <span style="color:var(--text-muted)">€</span>
          <input class="input price-input" type="number" id="price-input" min="0" step="0.01" inputmode="decimal" aria-label="Yeni fiyat" />
          <button class="btn price-action" id="price-save-btn">Kaydet</button>
          <button class="btn-outline price-action" id="price-cancel-btn">İptal</button>
        </div>
        <div class="inline-error" id="price-error"></div>
      </div>
      <div class="inline-success" id="price-success" role="status"></div>
    </div>

    <div class="section" id="notes-section">
      <div class="section-label">Notlar</div>
      ${b.notes ? `<div class="note-pinned">📌 ${escapeHTML(b.notes)}</div>` : ''}
      <div id="notes-list">
        ${sortedNotes.map(n => `<div class="note-item">${escapeHTML(n.note)}</div>`).join('') || '<div class="notes-empty">Henüz not yok</div>'}
      </div>
      <div class="note-input-row">
        <input class="input" type="text" id="note-input" placeholder="Not ekle…" />
        <button class="btn" id="note-btn" style="width:auto;padding:8px 14px;font-size:13px">Ekle</button>
      </div>
      <div class="inline-error" id="note-error"></div>
    </div>

    <div class="section">
      <div class="section-label">Durum Güncelle</div>
      <div class="status-buttons" id="status-buttons"></div>
      <div class="inline-error" id="status-error"></div>
    </div>
  `

  renderStatusButtons(b.status, b.id, bookingRef)
  setupNoteInput(b.id)
  setupPriceEditor(b)
  setupHotelEditor(b)
  setupEmailEditor(b)
  setupAddressEditor(b)
  setupDropoffAddressEditor(b)
  setupBookingEditor(b, navigate, bookingRef, isReturn)
}

function setupFieldEditor(booking, config) {
  const { prefix, column, validate, format, saveError, successMsg } = config
  const editBtn = document.getElementById(`${prefix}-edit-btn`)
  const editor = document.getElementById(`${prefix}-edit-row`)
  const input = document.getElementById(`${prefix}-input`)
  const saveBtn = document.getElementById(`${prefix}-save-btn`)
  const cancelBtn = document.getElementById(`${prefix}-cancel-btn`)
  const errorEl = document.getElementById(`${prefix}-error`)
  const successEl = document.getElementById(`${prefix}-success`)
  const display = document.getElementById(`${prefix}-display`)

  if (!editBtn || !editor || !input || !saveBtn || !cancelBtn || !errorEl || !successEl || !display) return

  const closeEditor = () => {
    editor.hidden = true
    input.value = String(booking[column] ?? '')
    errorEl.textContent = ''
  }

  editBtn.addEventListener('click', () => {
    successEl.textContent = ''
    input.value = String(booking[column] ?? '')
    editor.hidden = false
    input.focus()
    input.select()
  })

  cancelBtn.addEventListener('click', closeEditor)

  saveBtn.addEventListener('click', async () => {
    const result = validate(input.value)
    if (!result.ok) {
      errorEl.textContent = result.error
      return
    }

    saveBtn.disabled = true
    errorEl.textContent = ''
    successEl.textContent = ''

    const { count, error } = await supabase
      .from('bookings')
      .update({ [column]: result.value }, { count: 'exact' })
      .eq('id', booking.id)

    saveBtn.disabled = false

    if (error || count === 0) {
      errorEl.textContent = saveError
      return
    }

    booking[column] = result.value
    display.textContent = format(result.value)
    closeEditor()
    successEl.textContent = successMsg
  })
}

function setupEmailEditor(booking) {
  setupFieldEditor(booking, {
    prefix: 'email',
    column: 'customer_email',
    validate: (raw) => {
      const email = raw.trim().toLowerCase()
      if (email && (email.length > 120 || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email))) {
        return { ok: false, error: 'Geçerli bir e-posta girin.' }
      }
      return { ok: true, value: email }
    },
    format: (value) => (value ? value : '—'),
    saveError: 'E-posta güncellenemedi, tekrar deneyin.',
    successMsg: 'E-posta güncellendi.',
  })
}

function setupAddressEditor(booking) {
  setupFieldEditor(booking, {
    prefix: 'address',
    column: 'pickup_address',
    validate: (raw) => {
      const address = raw.trim().replace(/\s+/g, ' ')
      if (address && (address.length < 6 || address.length > 160)) {
        return { ok: false, error: 'Adres 6-160 karakter olmalı.' }
      }
      return { ok: true, value: address || null }
    },
    format: (value) => (value ? `📍 ${value}` : '—'),
    saveError: 'Adres güncellenemedi, tekrar deneyin.',
    successMsg: 'Adres güncellendi.',
  })
}

function setupDropoffAddressEditor(booking) {
  setupFieldEditor(booking, {
    prefix: 'dropoff-address',
    column: 'dropoff_address',
    validate: (raw) => {
      const address = raw.trim().replace(/\s+/g, ' ')
      if (address && (address.length < 6 || address.length > 160)) {
        return { ok: false, error: 'Adres 6-160 karakter olmalı.' }
      }
      return { ok: true, value: address || null }
    },
    format: (value) => (value ? `📍 ${value}` : '—'),
    saveError: 'Varış adresi güncellenemedi, tekrar deneyin.',
    successMsg: 'Varış adresi güncellendi.',
  })
}

function setupBookingEditor(booking, navigate, bookingRef, isReturn) {
  const editBtn = document.getElementById('booking-edit-btn')
  const section = document.getElementById('booking-edit-section')
  const form = document.getElementById('booking-edit-form')
  const saveBtn = document.getElementById('booking-edit-save-btn')
  const cancelBtn = document.getElementById('booking-edit-cancel-btn')
  const errorEl = document.getElementById('booking-edit-error')
  if (!editBtn || !section || !form || !saveBtn || !cancelBtn || !errorEl) return

  const pickupEl = document.getElementById('edit-pickup')
  const dropoffEl = document.getElementById('edit-dropoff')
  const pickupAddressEl = document.getElementById('edit-pickup-address')
  const dropoffAddressEl = document.getElementById('edit-dropoff-address')
  const addressRow = document.getElementById('edit-private-address-row')
  const pickupAddressField = document.getElementById('edit-pickup-address-field')
  const dropoffAddressField = document.getElementById('edit-dropoff-address-field')
  const tripTypeEl = document.getElementById('edit-trip-type')
  const returnSection = document.getElementById('edit-return-section')
  const returnDateEl = document.getElementById('edit-return-date')
  const returnTimeEl = document.getElementById('edit-return-time')
  const vehicleEl = document.getElementById('edit-vehicle')
  const guestsEl = document.getElementById('edit-guests')

  const updatePrivateAddressFields = () => {
    const needsPickupAddress = pickupEl.value === 'private_address'
    const needsDropoffAddress = dropoffEl.value === 'private_address'
    addressRow.hidden = !needsPickupAddress && !needsDropoffAddress
    pickupAddressField.hidden = !needsPickupAddress
    dropoffAddressField.hidden = !needsDropoffAddress
    pickupAddressEl.required = needsPickupAddress
    dropoffAddressEl.required = needsDropoffAddress
  }

  const updateReturnFields = () => {
    const isRoundTrip = tripTypeEl.value === 'round_trip'
    returnSection.hidden = !isRoundTrip
    returnDateEl.required = isRoundTrip
    returnTimeEl.required = isRoundTrip
  }

  const updateGuestCapacity = () => {
    guestsEl.max = String(VEHICLE_CAPACITY[vehicleEl.value] ?? 8)
  }

  pickupEl.addEventListener('change', updatePrivateAddressFields)
  dropoffEl.addEventListener('change', updatePrivateAddressFields)
  tripTypeEl.addEventListener('change', updateReturnFields)
  vehicleEl.addEventListener('change', updateGuestCapacity)
  updatePrivateAddressFields()
  updateReturnFields()
  updateGuestCapacity()

  editBtn.addEventListener('click', () => {
    document.getElementById('booking-edit-success').textContent = ''
    section.hidden = false
    editBtn.hidden = true
    section.scrollIntoView({ behavior: 'smooth', block: 'start' })
  })

  cancelBtn.addEventListener('click', () => {
    form.reset()
    errorEl.textContent = ''
    updatePrivateAddressFields()
    updateReturnFields()
    updateGuestCapacity()
    section.hidden = true
    editBtn.hidden = false
  })

  form.addEventListener('submit', async (event) => {
    event.preventDefault()
    errorEl.textContent = ''

    const val = (id) => document.getElementById(id).value
    const normalize = (value) => String(value ?? '').trim().replace(/\s+/g, ' ')
    const name = normalize(val('edit-name'))
    const phone = normalize(val('edit-phone'))
    const email = val('edit-email').trim().toLowerCase()
    let hotel = normalize(val('edit-hotel'))
    const tripType = val('edit-trip-type')
    const pickup = val('edit-pickup')
    const dropoff = val('edit-dropoff')
    const pickupAddress = normalize(val('edit-pickup-address'))
    const dropoffAddress = normalize(val('edit-dropoff-address'))
    const pickupDate = val('edit-date')
    const pickupTime = val('edit-time')
    const flightNumber = normalize(val('edit-flight')).toUpperCase()
    const flightTime = val('edit-flight-time')
    const returnDate = val('edit-return-date')
    const returnTime = val('edit-return-time')
    const returnFlight = normalize(val('edit-return-flight')).toUpperCase()
    const vehicle = val('edit-vehicle')
    const guests = Number(val('edit-guests'))
    const luggage = Number(val('edit-luggage') || 0)
    const childSeats = Number(val('edit-child') || 0)
    const price = Number(String(val('edit-price')).replace(',', '.'))
    const payment = val('edit-payment')
    const notes = val('edit-notes').trim()

    const fail = (message) => {
      errorEl.textContent = message
      errorEl.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }

    const nameLetters = name.match(/\p{L}/gu)?.length ?? 0
    if (name.length < 2 || name.length > 80 || nameLetters < 2) return fail('Geçerli bir ad soyad girin.')
    if (phone.replace(/\D/g, '').length < 7) return fail('Geçerli bir telefon numarası girin.')
    if (email && (email.length > 120 || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email))) {
      return fail('Geçerli bir e-posta girin.')
    }
    if (!hotel) hotel = 'Belirtilmedi'
    if (hotel.length < 2 || hotel.length > 120) return fail('Otel adı 2-120 karakter olmalı.')
    if (pickup === 'private_address' && (pickupAddress.length < 6 || pickupAddress.length > 160)) {
      return fail('Alış adresi 6-160 karakter olmalı.')
    }
    if (dropoff === 'private_address' && (dropoffAddress.length < 6 || dropoffAddress.length > 160)) {
      return fail('Varış adresi 6-160 karakter olmalı.')
    }
    if (pickup === dropoff && pickup !== 'private_address') return fail('Alış ve varış aynı olamaz.')
    if (pickup === 'private_address' && dropoff === 'private_address' && pickupAddress === dropoffAddress) {
      return fail('Alış ve varış adresleri aynı olamaz.')
    }
    if (!/^\d{4}-\d{2}-\d{2}$/.test(pickupDate)) return fail('Geçerli bir tarih seçin.')

    const capacity = VEHICLE_CAPACITY[vehicle] ?? 8
    if (!Number.isInteger(guests) || guests < 1 || guests > capacity) {
      return fail(`Yolcu sayısı 1-${capacity} arasında olmalı.`)
    }
    if (!Number.isInteger(luggage) || luggage < 0 || luggage > 12) return fail('Bagaj sayısı geçersiz.')
    if (!Number.isInteger(childSeats) || childSeats < 0 || childSeats > 4) {
      return fail('Çocuk koltuğu sayısı geçersiz.')
    }
    if (!Number.isFinite(price) || price < 0 || price > 999999.99) return fail('Geçerli bir fiyat girin.')

    const isRoundTrip = tripType === 'round_trip'
    if (isRoundTrip) {
      if (!/^\d{4}-\d{2}-\d{2}$/.test(returnDate) || returnDate < pickupDate) {
        return fail('Dönüş tarihi gidiş tarihinden önce olamaz.')
      }
      if (!/^([01]\d|2[0-3]):[0-5]\d$/.test(returnTime)) {
        return fail('Geçerli bir dönüş saati girin.')
      }
    }

    const payload = {
      customer_name: name,
      customer_email: email,
      customer_phone: phone,
      hotel_name: hotel,
      child_seat_count: childSeats,
      luggage_count: luggage,
      pickup_location: pickup,
      pickup_address: pickup === 'private_address' ? pickupAddress : null,
      dropoff_location: dropoff,
      dropoff_address: dropoff === 'private_address' ? dropoffAddress : null,
      pickup_date: pickupDate,
      pickup_time: pickupTime || null,
      flight_number: flightNumber || null,
      flight_arrival_time: flightTime || null,
      trip_type: tripType,
      return_date: isRoundTrip ? returnDate : null,
      return_pickup_time: isRoundTrip ? returnTime : null,
      return_flight_number: isRoundTrip ? (returnFlight || null) : null,
      guests,
      vehicle_type: vehicle,
      price_eur: price,
      payment_method: payment,
      notes: notes || null,
    }

    saveBtn.disabled = true
    saveBtn.textContent = 'Kaydediliyor...'

    const { count, error } = await supabase
      .from('bookings')
      .update(payload, { count: 'exact' })
      .eq('id', booking.id)

    saveBtn.disabled = false
    saveBtn.textContent = 'Değişiklikleri Kaydet'

    if (error || count === 0) {
      fail('Rezervasyon güncellenemedi, tekrar deneyin.')
      return
    }

    Object.assign(booking, payload)
    renderDetailBody(booking, navigate, bookingRef, isReturn)
    document.getElementById('booking-edit-success').textContent = 'Rezervasyon bilgileri güncellendi.'
  })
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
    return `<button class="btn-outline ${color}" data-next="${next}">${STATUS_LABELS[next]}</button>`
  }).join('')

  container.onclick = async (e) => {
    const btn = e.target.closest('[data-next]')
    if (!btn) return
    const nextStatus = btn.dataset.next

    if (nextStatus === 'cancelled') {
      if (!confirm('Bu transferi iptal etmek istediğinize emin misiniz?')) return
    }

    const badge = document.getElementById('status-badge')
    const prevClass = badge.className
    const prevText = badge.textContent
    badge.className = `badge badge-${nextStatus}`
    badge.textContent = STATUS_LABELS[nextStatus]

    const { count, error } = await supabase
      .from('bookings')
      .update({ status: nextStatus }, { count: 'exact' })
      .eq('booking_ref', bookingRef)

    if (error || count === 0) {
      badge.className = prevClass
      badge.textContent = prevText
      document.getElementById('status-error').textContent = 'Güncelleme başarısız, tekrar deneyin.'
      return
    }

    document.getElementById('status-error').textContent = ''
    renderStatusButtons(nextStatus, bookingId, bookingRef)
  }
}

function setupPriceEditor(booking) {
  const editBtn = document.getElementById('price-edit-btn')
  const editor = document.getElementById('price-edit-row')
  const input = document.getElementById('price-input')
  const saveBtn = document.getElementById('price-save-btn')
  const cancelBtn = document.getElementById('price-cancel-btn')
  const errorEl = document.getElementById('price-error')
  const successEl = document.getElementById('price-success')
  const display = document.getElementById('price-display')

  if (!editBtn || !editor || !input || !saveBtn || !cancelBtn || !errorEl || !successEl || !display) return

  const closeEditor = () => {
    editor.hidden = true
    input.value = String(booking.price_eur ?? 0)
    errorEl.textContent = ''
  }

  editBtn.addEventListener('click', () => {
    successEl.textContent = ''
    input.value = String(booking.price_eur ?? 0)
    editor.hidden = false
    input.focus()
    input.select()
  })

  cancelBtn.addEventListener('click', closeEditor)

  saveBtn.addEventListener('click', async () => {
    const nextPrice = Number(input.value.replace(',', '.'))
    if (!Number.isFinite(nextPrice) || nextPrice < 0 || nextPrice > 999999.99) {
      errorEl.textContent = 'Geçerli bir fiyat girin.'
      return
    }

    saveBtn.disabled = true
    errorEl.textContent = ''
    successEl.textContent = ''

    const { count, error } = await supabase
      .from('bookings')
      .update({ price_eur: nextPrice }, { count: 'exact' })
      .eq('id', booking.id)

    saveBtn.disabled = false

    if (error || count === 0) {
      errorEl.textContent = 'Fiyat güncellenemedi, tekrar deneyin.'
      return
    }

    booking.price_eur = nextPrice
    display.textContent = `€${fmtPrice(nextPrice)}`
    closeEditor()
    successEl.textContent = 'Fiyat güncellendi.'
  })
}

function setupHotelEditor(booking) {
  const editBtn = document.getElementById('hotel-edit-btn')
  const editor = document.getElementById('hotel-edit-row')
  const input = document.getElementById('hotel-input')
  const saveBtn = document.getElementById('hotel-save-btn')
  const cancelBtn = document.getElementById('hotel-cancel-btn')
  const errorEl = document.getElementById('hotel-error')
  const successEl = document.getElementById('hotel-success')
  const display = document.getElementById('hotel-display')

  if (!editBtn || !editor || !input || !saveBtn || !cancelBtn || !errorEl || !successEl || !display) return

  const closeEditor = () => {
    editor.hidden = true
    input.value = String(booking.hotel_name ?? '')
    errorEl.textContent = ''
  }

  editBtn.addEventListener('click', () => {
    successEl.textContent = ''
    input.value = String(booking.hotel_name ?? '')
    editor.hidden = false
    input.focus()
    input.select()
  })

  cancelBtn.addEventListener('click', closeEditor)

  saveBtn.addEventListener('click', async () => {
    const hotelName = input.value.trim().replace(/\s+/g, ' ')
    const letterCount = hotelName.match(/\p{L}/gu)?.length ?? 0

    if (hotelName.length < 2 || hotelName.length > 120 || letterCount < 2) {
      errorEl.textContent = 'Geçerli bir otel adı girin.'
      return
    }

    saveBtn.disabled = true
    errorEl.textContent = ''
    successEl.textContent = ''

    const { count, error } = await supabase
      .from('bookings')
      .update({ hotel_name: hotelName }, { count: 'exact' })
      .eq('id', booking.id)

    saveBtn.disabled = false

    if (error || count === 0) {
      errorEl.textContent = 'Otel bilgisi güncellenemedi, tekrar deneyin.'
      return
    }

    booking.hotel_name = hotelName
    display.textContent = hotelName
    closeEditor()
    successEl.textContent = 'Otel bilgisi güncellendi.'
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

    const list = document.getElementById('notes-list')
    const placeholder = list.querySelector('.notes-empty')
    if (placeholder) placeholder.remove()
    const el = document.createElement('div')
    el.className = 'note-item'
    el.textContent = data.note
    list.prepend(el)
    noteInput.value = ''
    noteBtn.disabled = false
  })
}
