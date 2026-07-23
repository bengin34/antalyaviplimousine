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

  renderDetailBody(rows[0], navigate, bookingRef)
}

function renderDetailBody(b, navigate, bookingRef) {
  const body = document.getElementById('detail-body')

  const sortedNotes = [...(b.booking_notes ?? [])].sort(
    (a, c) => new Date(c.created_at) - new Date(a.created_at)
  )

  body.innerHTML = `
    <div class="section">
      <div style="display:flex;justify-content:space-between;align-items:center">
        <span style="color:var(--text-muted);font-size:13px">${b.booking_ref}</span>
        <span class="badge badge-${b.status}" id="status-badge">${STATUS_LABELS[b.status]}</span>
      </div>
    </div>

    <div class="section">
      <div class="section-label">Transfer</div>
      <div style="font-size:17px;font-weight:700;margin-bottom:4px">${fmtTime(b.pickup_time)} &nbsp;${b.pickup_location} → ${b.dropoff_location}</div>
      <div style="color:var(--text-muted);font-size:13px">${fmtDate(b.pickup_date)}${b.flight_number ? ` · ✈️ ${b.flight_number} varış ${fmtTime(b.flight_arrival_time)}` : ''}</div>
    </div>

    <div class="section">
      <div class="section-label">Müşteri</div>
      <div style="font-weight:600;margin-bottom:4px">${b.customer_name}</div>
      <div style="margin-bottom:2px"><a href="tel:${b.customer_phone}" style="color:var(--blue)">📞 ${b.customer_phone}</a></div>
      <div style="color:var(--text-muted);font-size:13px">✉️ ${b.customer_email}</div>
    </div>

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

    <div class="section">
      <div class="section-label">Ödeme</div>
      <div style="display:flex;justify-content:space-between">
        <span>${b.payment_method === 'cash' ? 'Nakit' : 'Kart'}</span>
        <span style="font-weight:700">€${b.price_eur}</span>
      </div>
    </div>

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

    <div class="section">
      <div class="section-label">Durum Güncelle</div>
      <div class="status-buttons" id="status-buttons"></div>
      <div class="inline-error" id="status-error"></div>
    </div>
  `

  renderStatusButtons(b.status, b.id, bookingRef)
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
    return `<button class="btn-outline ${color}" data-next="${next}">${STATUS_LABELS[next]}</button>`
  }).join('')

  container.addEventListener('click', async (e) => {
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
