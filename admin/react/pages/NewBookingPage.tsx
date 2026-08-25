import { useRef, useState, type FormEvent } from 'react'
import { publicRouteSlugs, turkishLocationNames } from '../../../src/routes.js'
import { Topbar } from '../components/AdminChrome'
import { todayISO } from '../lib/format'
import { consumeBookingPrefill } from '../lib/prefill'
import { supabase } from '../lib/supabase'
import { languageFromPhone } from '../../turkish-formatters.js'
import type { Navigate } from '../types'

export const LOCATION_OPTIONS = [
  ['airport', 'Antalya Havalimanı'], ['hotel', 'Otel'], ['private_address', 'Özel adres'],
  ...publicRouteSlugs.map(slug => [slug, (turkishLocationNames as Record<string, string>)[slug]]),
] as const

export const VEHICLE_CAPACITY: Record<string, number> = { vclass: 13, vito: 7 }

export interface BookingFormState {
  name: string; phone: string; email: string; hotel: string; tripType: string
  pickup: string; dropoff: string; pickupAddress: string; dropoffAddress: string
  pickupDate: string; pickupTime: string; flightNumber: string; flightTime: string
  returnDate: string; returnTime: string; returnFlight: string; vehicle: string
  costMode: 'own_vehicle' | 'sold_transfer'; soldTransferCostTry: string
  airportMeetFeeApplies: boolean
  serviceEndDate: string; departureFlightDate: string; departureFlightTime: string; departureFlight: string
  guests: string; luggage: string; childSeats: string; price: string; payment: string
  status: string; notes: string; fuelAccepted: boolean
}

function createInitialState(): [BookingFormState, ReturnType<typeof consumeBookingPrefill>] {
  const prefill = consumeBookingPrefill()
  return [{
    name: prefill?.customerName ?? '', phone: prefill?.customerPhone ?? '', email: '',
    hotel: prefill?.hotelName ?? '', tripType: 'one_way', pickup: prefill?.pickupLocation ?? 'airport',
    dropoff: prefill?.dropoffLocation ?? 'belek', pickupAddress: prefill?.pickupAddress ?? '',
    dropoffAddress: prefill?.dropoffAddress ?? '', pickupDate: todayISO(), pickupTime: '',
    flightNumber: '', flightTime: '', returnDate: '', returnTime: '', returnFlight: '',
    costMode: 'own_vehicle', soldTransferCostTry: '',
    airportMeetFeeApplies: true,
    serviceEndDate: todayISO(), departureFlightDate: '', departureFlightTime: '', departureFlight: '',
    vehicle: prefill?.vehicleType ?? 'vito', guests: String(prefill?.guests ?? 1),
    luggage: String(prefill?.luggageCount ?? 0), childSeats: String(prefill?.childSeatCount ?? 0),
    price: '', payment: prefill?.paymentMethod ?? 'cash', status: 'confirmed', notes: prefill?.notes ?? '', fuelAccepted: false,
  }, prefill]
}

function generateBookingRef() {
  const year = new Date().getUTCFullYear()
  const random = crypto.randomUUID().replaceAll('-', '').slice(0, 8).toUpperCase()
  return `AVL-${year}-${random}`
}

export function validateBookingForm(form: BookingFormState) {
  const normalize = (value: unknown) => String(value ?? '').trim().replace(/\s+/g, ' ')
  const name = normalize(form.name)
  const phone = normalize(form.phone)
  const email = form.email.trim().toLowerCase()
  const hotel = normalize(form.hotel) || 'Belirtilmedi'
  const pickupAddress = normalize(form.pickupAddress)
  const dropoffAddress = normalize(form.dropoffAddress)
  const flightNumber = normalize(form.flightNumber).toUpperCase()
  const returnFlight = normalize(form.returnFlight).toUpperCase()
  const departureFlight = normalize(form.departureFlight).toUpperCase()
  const guests = Number(form.guests)
  const luggage = Number(form.luggage || 0)
  const childSeats = Number(form.childSeats || 0)
  const price = Number(String(form.price).replace(',', '.'))
  const soldTransferCostTry = Number(String(form.soldTransferCostTry).replace(',', '.'))
  const fail = (error: string) => ({ error, payload: null })
  const isRoundTrip = form.tripType === 'round_trip'
  const isDailyChauffeur = form.tripType === 'daily_chauffeur'
  const isSoldTransfer = form.costMode === 'sold_transfer'

  const nameLetters = name.match(/\p{L}/gu)?.length ?? 0
  if (name.length < 2 || name.length > 80 || nameLetters < 2) return fail('Geçerli bir ad soyad girin.')
  if (phone.replace(/\D/g, '').length < 7) return fail('Geçerli bir telefon numarası girin.')
  if (email && (email.length > 120 || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email))) return fail('Geçerli bir e-posta girin.')
  if (hotel.length < 2 || hotel.length > 120) return fail('Otel adı 2-120 karakter olmalı.')
  if (form.pickup === 'private_address' && (pickupAddress.length < 6 || pickupAddress.length > 160)) return fail('Alış adresi 6-160 karakter olmalı.')
  if (!isDailyChauffeur && form.dropoff === 'private_address' && (dropoffAddress.length < 6 || dropoffAddress.length > 160)) return fail('Varış adresi 6-160 karakter olmalı.')
  if (!isDailyChauffeur && form.pickup === form.dropoff && form.pickup !== 'private_address') return fail('Alış ve varış aynı olamaz.')
  if (!isDailyChauffeur && form.pickup === 'private_address' && form.dropoff === 'private_address' && pickupAddress === dropoffAddress) return fail('Alış ve varış adresleri aynı olamaz.')
  if (!/^\d{4}-\d{2}-\d{2}$/.test(form.pickupDate)) return fail('Geçerli bir tarih seçin.')
  const capacity = VEHICLE_CAPACITY[form.vehicle] ?? 8
  if (!Number.isInteger(guests) || guests < 1 || guests > capacity) return fail(`Yolcu sayısı 1-${capacity} arasında olmalı.`)
  if (!Number.isInteger(luggage) || luggage < 0 || luggage > 12) return fail('Bagaj sayısı geçersiz.')
  if (!Number.isInteger(childSeats) || childSeats < 0 || childSeats > 4) return fail('Çocuk koltuğu sayısı geçersiz.')
  if (!Number.isFinite(price) || price < 0 || price > 999999.99) return fail('Geçerli bir fiyat girin.')
  if (isDailyChauffeur && price <= 0) return fail('Günlük fiyat sıfırdan büyük olmalı.')
  if (isDailyChauffeur && isSoldTransfer) return fail('Günlük araç + şoför hizmeti satılan transfer olarak işaretlenemez.')
  if (isSoldTransfer && (!Number.isFinite(soldTransferCostTry) || soldTransferCostTry <= 0 || soldTransferCostTry > 9999999.99)) {
    return fail('Satılan transfer için geçerli bir toplam maliyet girin.')
  }
  if (isRoundTrip) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(form.returnDate) || form.returnDate < form.pickupDate) return fail('Dönüş tarihi gidiş tarihinden önce olamaz.')
    if (!/^([01]\d|2[0-3]):[0-5]\d$/.test(form.returnTime)) return fail('Geçerli bir dönüş saati girin.')
  }
  let hireDays = 0
  if (isDailyChauffeur) {
    if (!/^([01]\d|2[0-3]):[0-5]\d$/.test(form.pickupTime)) return fail('Günlük hizmet başlangıç saatini girin.')
    if (!/^\d{4}-\d{2}-\d{2}$/.test(form.serviceEndDate) || form.serviceEndDate < form.pickupDate) return fail('Geçerli bir son hizmet günü seçin.')
    const startAt = Date.parse(`${form.pickupDate}T00:00:00Z`)
    const endAt = Date.parse(`${form.serviceEndDate}T00:00:00Z`)
    hireDays = Math.floor((endAt - startAt) / 86_400_000) + 1
    if (!Number.isInteger(hireDays) || hireDays < 1 || hireDays > 30) return fail('Günlük kiralama 1-30 gün arasında olmalı.')
    if (!form.fuelAccepted) return fail('Müşterinin yakıt hariç koşulunu kabul ettiğini onaylayın.')
    if (form.departureFlight && !/^[a-z0-9][a-z0-9 -]{1,11}$/i.test(departureFlight)) return fail('Geçerli bir dönüş uçuş numarası girin.')
    if ((form.departureFlight || form.departureFlightTime) && !/^\d{4}-\d{2}-\d{2}$/.test(form.departureFlightDate)) return fail('Dönüş uçuş tarihini girin.')
  }

  return { error: '', payload: {
    customer_name: name, customer_email: email, customer_phone: phone, hotel_name: hotel,
    child_seat_count: childSeats, luggage_count: luggage, pickup_location: form.pickup,
    pickup_address: form.pickup === 'private_address' ? pickupAddress : null,
    dropoff_location: isDailyChauffeur ? null : form.dropoff, dropoff_address: !isDailyChauffeur && form.dropoff === 'private_address' ? dropoffAddress : null,
    pickup_date: form.pickupDate, pickup_time: form.pickupTime || null,
    flight_number: flightNumber || null, flight_arrival_time: form.flightTime || null,
    trip_type: form.tripType, return_date: isRoundTrip ? form.returnDate : null,
    return_pickup_time: isRoundTrip ? form.returnTime : null,
    return_flight_number: isRoundTrip ? (returnFlight || null) : null,
    service_end_date: isDailyChauffeur ? form.serviceEndDate : null,
    daily_rate_eur: isDailyChauffeur ? price : null,
    departure_flight_date: isDailyChauffeur ? (form.departureFlightDate || null) : null,
    departure_flight_time: isDailyChauffeur ? (form.departureFlightTime || null) : null,
    departure_flight_number: isDailyChauffeur ? (departureFlight || null) : null,
    fuel_terms_accepted_at: isDailyChauffeur ? new Date().toISOString() : null,
    guests, vehicle_type: form.vehicle, price_eur: isDailyChauffeur ? price * hireDays : isRoundTrip ? price * 2 : price,
    service_cost_mode: isDailyChauffeur ? 'own_vehicle' : form.costMode,
    sold_transfer_cost_try: !isDailyChauffeur && isSoldTransfer ? soldTransferCostTry : null,
    airport_meet_fee_applies: form.airportMeetFeeApplies,
    status: form.status, payment_method: form.payment, notes: form.notes.trim() || null,
  } }
}

function Field({ label, children, className = '' }: { label?: string; children: React.ReactNode; className?: string }) {
  const classes = `form-field${className ? ` ${className}` : ''}`
  return label
    ? <label className={classes}><span className="form-label">{label}</span>{children}</label>
    : <div className={classes}>{children}</div>
}

export default function NewBookingPage({ navigate }: { navigate: Navigate }) {
  const initial = useRef(createInitialState())
  const [form, setForm] = useState(initial.current[0])
  const prefill = initial.current[1]
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)
  const set = <K extends keyof BookingFormState>(name: K, value: BookingFormState[K]) => setForm(current => ({ ...current, [name]: value }))
  const optionList = LOCATION_OPTIONS.map(([value, label]) => <option key={value} value={value}>{label}</option>)
  const isRoundTrip = form.tripType === 'round_trip'
  const isDailyChauffeur = form.tripType === 'daily_chauffeur'
  const onTripTypeChange = (tripType: string) => setForm(current => ({
    ...current,
    tripType,
    costMode: tripType === 'daily_chauffeur' ? 'own_vehicle' : current.costMode,
    soldTransferCostTry: tripType === 'daily_chauffeur' ? '' : current.soldTransferCostTry,
    price: tripType === 'daily_chauffeur' && !current.price ? '150' : current.price,
    serviceEndDate: tripType === 'daily_chauffeur' && current.serviceEndDate < current.pickupDate ? current.pickupDate : current.serviceEndDate,
  }))

  const submit = async (event: FormEvent) => {
    event.preventDefault()
    const result = validateBookingForm(form)
    if (result.error || !result.payload) return setError(result.error)
    setSaving(true); setError('')
    const manualReturnOf = prefill?.isManualReturn ? prefill.sourceRef ?? null : null
    const { data, error: insertError } = await supabase.from('bookings')
      .insert([{ ...result.payload, booking_ref: generateBookingRef(), language: languageFromPhone(result.payload.customer_phone), manual_return_of_ref: manualReturnOf }])
      .select('booking_ref').single()
    setSaving(false)
    if (insertError) return setError('Kayıt oluşturulamadı, tekrar deneyin.')
    navigate(`#detail/${encodeURIComponent(data.booking_ref)}`)
  }

  return <>
    <Topbar navigate={navigate} title="Yeni Kayıt" back="#timeline" />
    <div className="scroll-area">
      {prefill && <div className="prefill-banner">{prefill.isManualReturn ? `↩ ${prefill.sourceRef ?? ''} rezervasyonunun dönüş seyahati olarak oluşturuluyor` : `📋 ${prefill.sourceRef ?? ''} rezervasyonundan bilgiler kopyalandı`}</div>}
      <form noValidate onSubmit={submit}>
        <div className="section">
          <div className="section-label">Müşteri</div>
          <Field label="Ad Soyad *"><input className="input" type="text" maxLength={80} autoComplete="off" value={form.name} onChange={e => set('name', e.target.value)} required autoFocus={Boolean(prefill)} /></Field>
          <Field label="Telefon *"><input className="input" type="tel" placeholder="+90 5xx xxx xx xx" autoComplete="off" value={form.phone} onChange={e => set('phone', e.target.value)} required /></Field>
          <Field label="Otel / Konaklama"><input className="input" type="text" maxLength={120} autoComplete="off" value={form.hotel} onChange={e => set('hotel', e.target.value)} /></Field>
        </div>

        <div className="section">
          <div className="section-label">Transfer</div>
          <Field label="Sefer türü"><select className="input" value={form.tripType} onChange={e => onTripTypeChange(e.target.value)}><option value="one_way">Tek yön</option><option value="round_trip">Gidiş-dönüş</option><option value="daily_chauffeur">Günlük araç + şoför</option></select></Field>
          <div className="form-row">
            <Field label="Alış *"><select className="input" value={form.pickup} onChange={e => set('pickup', e.target.value)}>{optionList}</select></Field>
            {!isDailyChauffeur && <Field label="Varış *"><select className="input" value={form.dropoff} onChange={e => set('dropoff', e.target.value)}>{optionList}</select></Field>}
          </div>
          {(form.pickup === 'private_address' || (!isDailyChauffeur && form.dropoff === 'private_address')) && <div className="form-row">
            {form.pickup === 'private_address' && <Field label="Alış özel adresi *"><input className="input" maxLength={160} autoComplete="street-address" placeholder="Açık adresi girin" value={form.pickupAddress} onChange={e => set('pickupAddress', e.target.value)} required /></Field>}
            {!isDailyChauffeur && form.dropoff === 'private_address' && <Field label="Varış özel adresi *"><input className="input" maxLength={160} autoComplete="street-address" placeholder="Açık adresi girin" value={form.dropoffAddress} onChange={e => set('dropoffAddress', e.target.value)} required /></Field>}
          </div>}
          <div className="form-row">
            <Field label={isDailyChauffeur ? 'İlk hizmet günü *' : 'Tarih *'}><input className="input" type="date" value={form.pickupDate} onChange={e => { set('pickupDate', e.target.value); if (isDailyChauffeur && form.serviceEndDate < e.target.value) set('serviceEndDate', e.target.value) }} required /></Field>
            <Field label={isDailyChauffeur ? 'Hizmet başlangıç saati *' : 'Saat'}><input className="input" type="time" value={form.pickupTime} onChange={e => set('pickupTime', e.target.value)} required={isDailyChauffeur} /></Field>
          </div>
          <div className="form-row">
            <Field label="Uçuş no"><input className="input" type="text" maxLength={12} autoComplete="off" value={form.flightNumber} onChange={e => set('flightNumber', e.target.value)} /></Field>
            <Field label="Uçuş varış"><input className="input" type="time" value={form.flightTime} onChange={e => set('flightTime', e.target.value)} /></Field>
          </div>
        </div>

        {isDailyChauffeur && <div className="section">
          <div className="section-label">Günlük Kiralama</div>
          <Field label="Son hizmet günü *"><input className="input" type="date" min={form.pickupDate} value={form.serviceEndDate} onChange={e => set('serviceEndDate', e.target.value)} required /></Field>
          <div className="form-row"><Field label="Dönüş uçuş tarihi"><input className="input" type="date" min={form.pickupDate} value={form.departureFlightDate} onChange={e => set('departureFlightDate', e.target.value)} /></Field><Field label="Dönüş uçuş saati"><input className="input" type="time" value={form.departureFlightTime} onChange={e => set('departureFlightTime', e.target.value)} /></Field></div>
          <Field label="Dönüş uçuş numarası"><input className="input" type="text" maxLength={12} autoComplete="off" value={form.departureFlight} onChange={e => set('departureFlight', e.target.value)} /></Field>
          <label className="admin-fuel-acceptance"><input type="checkbox" checked={form.fuelAccepted} onChange={e => set('fuelAccepted', e.target.checked)} /><span><strong>Yakıt hariç koşulu kabul edildi</strong><small>Müşteri, yakıt masrafını kullanıma göre ayrıca ödeyeceğini kabul etti.</small></span></label>
        </div>}

        {isRoundTrip && <div className="section">
          <div className="section-label">Dönüş</div>
          <div className="form-row">
            <Field label="Dönüş tarihi"><input className="input" type="date" value={form.returnDate} onChange={e => set('returnDate', e.target.value)} /></Field>
            <Field label="Dönüş saati"><input className="input" type="time" value={form.returnTime} onChange={e => set('returnTime', e.target.value)} /></Field>
          </div>
          <Field label="Dönüş uçuş no"><input className="input" type="text" maxLength={12} autoComplete="off" value={form.returnFlight} onChange={e => set('returnFlight', e.target.value)} /></Field>
        </div>}

        <div className="section">
          <div className="section-label">Araç & Detaylar</div>
          <div className="form-row">
            <Field label="Araç *"><select className="input" value={form.vehicle} onChange={e => set('vehicle', e.target.value)}><option value="vito">Vito</option><option value="vclass">V-Class</option></select></Field>
            <Field label="Yolcu *"><input className="input" type="number" min={1} max={VEHICLE_CAPACITY[form.vehicle] ?? 8} step={1} inputMode="numeric" value={form.guests} onChange={e => set('guests', e.target.value)} required /></Field>
          </div>
          <div className="form-row">
            <Field label="Bagaj"><input className="input" type="number" min={0} max={12} step={1} inputMode="numeric" value={form.luggage} onChange={e => set('luggage', e.target.value)} /></Field>
            <Field label="Çocuk koltuğu"><input className="input" type="number" min={0} max={4} step={1} inputMode="numeric" value={form.childSeats} onChange={e => set('childSeats', e.target.value)} /></Field>
          </div>
          <Field label="Maliyet modeli">
            <select className="input" value={form.costMode} onChange={e => set('costMode', e.target.value as BookingFormState['costMode'])} disabled={isDailyChauffeur}>
              <option value="own_vehicle">Kendi aracımız</option>
              <option value="sold_transfer">Satılan transfer</option>
            </select>
          </Field>
          <div className="form-hint">{isDailyChauffeur ? 'Günlük araç + şoför hizmeti yalnızca kendi aracımız olarak hesaplanır.' : form.costMode === 'sold_transfer' ? 'Girilen toplam maliyet bu rezervasyonun toplam gideri kabul edilir.' : 'Araç maliyeti kâr/zarar ekranında km ve boş dönüş hesabından çıkarılır.'}</div>
          {!isDailyChauffeur && form.costMode === 'sold_transfer' && <Field label="Toplam maliyet (₺) *"><input className="input" type="number" min={0.01} max={9999999.99} step={0.01} inputMode="decimal" value={form.soldTransferCostTry} onChange={e => set('soldTransferCostTry', e.target.value)} required /></Field>}
        </div>

        <div className="section">
          <div className="section-label">Ödeme & Durum</div>
          <div className="form-row">
            <Field label={isDailyChauffeur ? 'Günlük fiyat (€) *' : 'Fiyat (€) *'}>{isRoundTrip && <span className="form-hint">Sefer başına fiyat girin</span>}{isDailyChauffeur && <span className="form-hint">Toplam, gün sayısıyla otomatik çarpılır · yakıt hariç</span>}<input className="input" type="number" min={isDailyChauffeur ? 0.01 : 0} max={999999.99} step={0.01} inputMode="decimal" value={form.price} onChange={e => set('price', e.target.value)} required /></Field>
            <Field label="Ödeme"><select className="input" value={form.payment} onChange={e => set('payment', e.target.value)}><option value="cash">Nakit</option><option value="card">Kart</option></select></Field>
          </div>
          <Field label="Durum"><select className="input" value={form.status} onChange={e => set('status', e.target.value)}>
            <option value="confirmed">Onaylı</option><option value="pending">Bekliyor</option><option value="paid">Ödendi</option><option value="in_transit">Yolda</option><option value="completed">Tamamlandı</option><option value="cancelled">İptal</option>
          </select></Field>
        </div>
        <div className="section"><div className="section-label">Notlar</div><Field><textarea className="input" rows={3} maxLength={500} value={form.notes} onChange={e => set('notes', e.target.value)} /></Field></div>
        <div className="section"><button className="btn" type="submit" disabled={saving}>{saving ? 'Kaydediliyor...' : 'Kaydet'}</button><div className="inline-error">{error}</div></div>
      </form>
    </div>
  </>
}
