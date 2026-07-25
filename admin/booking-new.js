import { supabase } from './supabase-client.js'

const LOCATION_OPTIONS = [
  { value: 'airport', label: 'Antalya Havalimanı' },
  { value: 'hotel', label: 'Otel' },
  { value: 'private_address', label: 'Özel adres' },
  { value: 'antalya', label: 'Antalya' },
  { value: 'belek', label: 'Belek' },
  { value: 'side', label: 'Side' },
  { value: 'kemer', label: 'Kemer' },
  { value: 'alanya', label: 'Alanya' },
  { value: 'bogazkent', label: 'Boğazkent' },
  { value: 'manavgat', label: 'Manavgat' },
  { value: 'kizilagac', label: 'Kızılağaç' },
  { value: 'tekirova', label: 'Tekirova' },
  { value: 'bodrum', label: 'Bodrum' },
  { value: 'dalaman', label: 'Dalaman' },
  { value: 'fethiye', label: 'Fethiye' },
  { value: 'pamukkale', label: 'Pamukkale' },
  { value: 'kapadokya', label: 'Kapadokya' },
]

const VEHICLE_CAPACITY = { vclass: 13, vito: 8 }

function todayISO() {
  return new Intl.DateTimeFormat('sv', { timeZone: 'Europe/Istanbul' }).format(new Date())
}

function generateBookingRef() {
  const year = new Date().getUTCFullYear()
  const random = crypto.randomUUID().replaceAll('-', '').slice(0, 8).toUpperCase()
  return `AVL-${year}-${random}`
}

function locationOptionsHTML(selected) {
  return LOCATION_OPTIONS.map(
    (o) => `<option value="${o.value}"${o.value === selected ? ' selected' : ''}>${o.label}</option>`
  ).join('')
}

export function renderBookingNew(container, navigate) {
  const today = todayISO()

  container.innerHTML = `
    <div class="topbar">
      <button class="detail-back" id="back-btn">← Geri</button>
      <span class="topbar-title">Yeni Kayıt</span>
      <span></span>
    </div>
    <div class="scroll-area">
      <form id="new-booking-form" novalidate>
        <div class="section">
          <div class="section-label">Müşteri</div>
          <div class="form-field">
            <label class="form-label" for="f-name">Ad Soyad *</label>
            <input class="input" type="text" id="f-name" maxlength="80" autocomplete="off" required />
          </div>
          <div class="form-field">
            <label class="form-label" for="f-phone">Telefon *</label>
            <input class="input" type="tel" id="f-phone" placeholder="+90 5xx xxx xx xx" autocomplete="off" required />
          </div>
          <div class="form-field">
            <label class="form-label" for="f-hotel">Otel / Konaklama</label>
            <input class="input" type="text" id="f-hotel" maxlength="120" autocomplete="off" />
          </div>
        </div>

        <div class="section">
          <div class="section-label">Transfer</div>
          <div class="form-field">
            <label class="form-label" for="f-trip-type">Sefer türü</label>
            <select class="input" id="f-trip-type">
              <option value="one_way">Tek yön</option>
              <option value="round_trip">Gidiş-dönüş</option>
            </select>
          </div>
          <div class="form-row">
            <div class="form-field">
              <label class="form-label" for="f-pickup">Alış *</label>
              <select class="input" id="f-pickup">${locationOptionsHTML('airport')}</select>
            </div>
            <div class="form-field">
              <label class="form-label" for="f-dropoff">Varış *</label>
              <select class="input" id="f-dropoff">${locationOptionsHTML('belek')}</select>
            </div>
          </div>
          <div class="form-row">
            <div class="form-field">
              <label class="form-label" for="f-date">Tarih *</label>
              <input class="input" type="date" id="f-date" value="${today}" required />
            </div>
            <div class="form-field">
              <label class="form-label" for="f-time">Saat</label>
              <input class="input" type="time" id="f-time" />
            </div>
          </div>
          <div class="form-row">
            <div class="form-field">
              <label class="form-label" for="f-flight">Uçuş no</label>
              <input class="input" type="text" id="f-flight" maxlength="12" autocomplete="off" />
            </div>
            <div class="form-field">
              <label class="form-label" for="f-flight-time">Uçuş varış</label>
              <input class="input" type="time" id="f-flight-time" />
            </div>
          </div>
        </div>

        <div class="section" id="return-section" hidden>
          <div class="section-label">Dönüş</div>
          <div class="form-row">
            <div class="form-field">
              <label class="form-label" for="f-return-date">Dönüş tarihi</label>
              <input class="input" type="date" id="f-return-date" />
            </div>
            <div class="form-field">
              <label class="form-label" for="f-return-time">Dönüş saati</label>
              <input class="input" type="time" id="f-return-time" />
            </div>
          </div>
          <div class="form-field">
            <label class="form-label" for="f-return-flight">Dönüş uçuş no</label>
            <input class="input" type="text" id="f-return-flight" maxlength="12" autocomplete="off" />
          </div>
        </div>

        <div class="section">
          <div class="section-label">Araç & Detaylar</div>
          <div class="form-row">
            <div class="form-field">
              <label class="form-label" for="f-vehicle">Araç *</label>
              <select class="input" id="f-vehicle">
                <option value="vito">Vito</option>
                <option value="vclass">V-Class</option>
              </select>
            </div>
            <div class="form-field">
              <label class="form-label" for="f-guests">Yolcu *</label>
              <input class="input" type="number" id="f-guests" min="1" max="13" step="1" value="1" inputmode="numeric" required />
            </div>
          </div>
          <div class="form-row">
            <div class="form-field">
              <label class="form-label" for="f-luggage">Bagaj</label>
              <input class="input" type="number" id="f-luggage" min="0" max="12" step="1" value="0" inputmode="numeric" />
            </div>
            <div class="form-field">
              <label class="form-label" for="f-child">Çocuk koltuğu</label>
              <input class="input" type="number" id="f-child" min="0" max="4" step="1" value="0" inputmode="numeric" />
            </div>
          </div>
        </div>

        <div class="section">
          <div class="section-label">Ödeme & Durum</div>
          <div class="form-row">
            <div class="form-field">
              <label class="form-label" for="f-price">Fiyat (€) *</label>
              <input class="input" type="number" id="f-price" min="0" max="999999.99" step="0.01" inputmode="decimal" required />
            </div>
            <div class="form-field">
              <label class="form-label" for="f-payment">Ödeme</label>
              <select class="input" id="f-payment">
                <option value="cash">Nakit</option>
                <option value="card">Kart</option>
              </select>
            </div>
          </div>
          <div class="form-field">
            <label class="form-label" for="f-status">Durum</label>
            <select class="input" id="f-status">
              <option value="confirmed">Onaylı</option>
              <option value="pending">Bekliyor</option>
              <option value="paid">Ödendi</option>
              <option value="in_transit">Yolda</option>
              <option value="completed">Tamamlandı</option>
              <option value="cancelled">İptal</option>
            </select>
          </div>
        </div>

        <div class="section">
          <div class="section-label">Notlar</div>
          <div class="form-field">
            <textarea class="input" id="f-notes" rows="3" maxlength="500"></textarea>
          </div>
        </div>

        <div class="section">
          <button class="btn" type="submit" id="save-btn">Kaydet</button>
          <div class="inline-error" id="form-error"></div>
        </div>
      </form>
    </div>
  `

  document.getElementById('back-btn').addEventListener('click', () => navigate('#timeline'))

  const tripTypeEl = document.getElementById('f-trip-type')
  const returnSection = document.getElementById('return-section')
  tripTypeEl.addEventListener('change', () => {
    returnSection.hidden = tripTypeEl.value !== 'round_trip'
  })

  const vehicleEl = document.getElementById('f-vehicle')
  const guestsEl = document.getElementById('f-guests')
  vehicleEl.addEventListener('change', () => {
    guestsEl.max = String(VEHICLE_CAPACITY[vehicleEl.value] ?? 8)
  })

  document.getElementById('new-booking-form').addEventListener('submit', (e) => {
    e.preventDefault()
    submitBooking(navigate)
  })
}

async function submitBooking(navigate) {
  const errEl = document.getElementById('form-error')
  const saveBtn = document.getElementById('save-btn')
  errEl.textContent = ''

  const val = (id) => document.getElementById(id).value
  const normalize = (v) => String(v ?? '').trim().replace(/\s+/g, ' ')

  const name = normalize(val('f-name'))
  const phone = normalize(val('f-phone'))
  let hotel = normalize(val('f-hotel'))
  const tripType = val('f-trip-type')
  const pickup = val('f-pickup')
  const dropoff = val('f-dropoff')
  const pickupDate = val('f-date')
  const pickupTime = val('f-time')
  const flightNumber = normalize(val('f-flight')).toUpperCase()
  const flightTime = val('f-flight-time')
  const returnDate = val('f-return-date')
  const returnTime = val('f-return-time')
  const returnFlight = normalize(val('f-return-flight')).toUpperCase()
  const vehicle = val('f-vehicle')
  const guests = Number(val('f-guests'))
  const luggage = Number(val('f-luggage') || 0)
  const childSeats = Number(val('f-child') || 0)
  const price = Number(String(val('f-price')).replace(',', '.'))
  const payment = val('f-payment')
  const status = val('f-status')
  const notes = val('f-notes').trim()

  const nameLetters = name.match(/\p{L}/gu)?.length ?? 0
  if (name.length < 2 || nameLetters < 2) return fail('Geçerli bir ad soyad girin.')
  if (phone.replace(/\D/g, '').length < 7) return fail('Geçerli bir telefon numarası girin.')
  if (!hotel) hotel = 'Belirtilmedi'
  if (hotel.length < 2 || hotel.length > 120) return fail('Otel adı 2-120 karakter olmalı.')
  if (pickup === dropoff) return fail('Alış ve varış aynı olamaz.')
  if (!/^\d{4}-\d{2}-\d{2}$/.test(pickupDate)) return fail('Geçerli bir tarih seçin.')
  const capacity = VEHICLE_CAPACITY[vehicle] ?? 8
  if (!Number.isInteger(guests) || guests < 1 || guests > capacity) {
    return fail(`Yolcu sayısı 1-${capacity} arasında olmalı.`)
  }
  if (!Number.isInteger(luggage) || luggage < 0 || luggage > 12) return fail('Bagaj sayısı geçersiz.')
  if (!Number.isInteger(childSeats) || childSeats < 0 || childSeats > 4) return fail('Çocuk koltuğu sayısı geçersiz.')
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
    booking_ref: generateBookingRef(),
    customer_name: name,
    customer_email: '',
    customer_phone: phone,
    hotel_name: hotel,
    child_seat_count: childSeats,
    luggage_count: luggage,
    pickup_location: pickup,
    pickup_address: null,
    dropoff_location: dropoff,
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
    status,
    payment_method: payment,
    notes: notes || null,
    language: 'tr',
  }

  saveBtn.disabled = true
  saveBtn.textContent = 'Kaydediliyor...'

  const { data, error } = await supabase
    .from('bookings')
    .insert([payload])
    .select('booking_ref')
    .single()

  if (error) {
    saveBtn.disabled = false
    saveBtn.textContent = 'Kaydet'
    errEl.textContent = 'Kayıt oluşturulamadı, tekrar deneyin.'
    return
  }

  navigate(`#detail/${encodeURIComponent(data.booking_ref)}`)

  function fail(message) {
    errEl.textContent = message
  }
}
