import { supabase } from './supabase-client.js'
import { locationLabel, whatsappURL } from './turkish-formatters.js'

function fmtTime(t) { return t ? t.slice(0, 5) : '—' }
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

export async function renderDetail(container, bookingRef, navigate, isReturn = false) {
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
        flightNumber: b.return_flight_number,
        flightArrivalTime: null,
      }
    : {
        date: b.pickup_date,
        time: b.pickup_time,
        pickupLocation: b.pickup_location,
        dropoffLocation: b.dropoff_location,
        flightNumber: b.flight_number,
        flightArrivalTime: b.flight_arrival_time,
      }

  const sortedNotes = [...(b.booking_notes ?? [])].sort(
    (a, c) => new Date(c.created_at) - new Date(a.created_at)
  )

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
      <div class="section-label">Transfer</div>
      <div style="font-size:17px;font-weight:700;margin-bottom:4px">${fmtTime(transfer.time)} &nbsp;${escapeHTML(locationLabel(transfer.pickupLocation))} → ${escapeHTML(locationLabel(transfer.dropoffLocation))}</div>
      <div style="color:var(--text-muted);font-size:13px">${fmtDate(transfer.date)}${transfer.flightNumber ? ` · ✈️ ${escapeHTML(transfer.flightNumber)}${transfer.flightArrivalTime ? ` varış ${fmtTime(transfer.flightArrivalTime)}` : ''}` : ''}</div>
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
      <div style="color:var(--text-muted);font-size:13px">✉️ ${escapeHTML(b.customer_email)}</div>
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
        ${b.pickup_address ? `<div class="full"><div class="detail-key">Alış adresi</div><div class="detail-val">📍 ${escapeHTML(b.pickup_address)}</div></div>` : ''}
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
