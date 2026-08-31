import { useEffect, useMemo, useRef, useState, type FormEvent, type ReactNode } from 'react'
import { Topbar } from '../components/AdminChrome'
import { fmtDetailDate, fmtPrice, fmtTime, statusLabel, transferStartTime } from '../lib/format'
import { queueBookingPrefill } from '../lib/prefill'
import { supabase } from '../lib/supabase'
import type { Booking, BookingStatus, ChauffeurHireDay, Navigate } from '../types'
import { isFutureIstanbulLeg, locationDisplay, navigationURLs, whatsappURL } from '../../turkish-formatters.js'
import { buildConfirmMessage, buildReminderMessage, buildReceivedMessage, buildReviewMessage } from '../../whatsapp-templates.js'
import { buildDriverTransferMessage, driverWhatsappURL } from '../../driver-message.js'
import { COST_MODE_LABELS, type CostMode } from '../components/LegCostEditors'
import { legCostModel } from '../../profit-loss-metrics.js'
import { LOCATION_OPTIONS, LANGUAGE_OPTIONS, VEHICLE_CAPACITY, validateBookingForm, type BookingFormState } from './NewBookingPage'
import { ReturnPickupHint, returnPickupAdvice } from '../components/ReturnPickupHint'
import { languageFromPhone } from '../../turkish-formatters.js'

const STATUS_TRANSITIONS: Record<string, BookingStatus[]> = {
  pending: ['confirmed', 'cancelled'], paid: ['in_transit'], confirmed: ['in_transit', 'cancelled'],
  in_transit: ['completed', 'cancelled'], completed: [], cancelled: [],
}
const STATUS_COLORS: Record<string, string> = { pending: 'orange', paid: 'green', confirmed: 'green', in_transit: 'blue', completed: '', cancelled: 'red' }

type TemplateKind = 'confirm' | 'reminder' | 'received' | 'review'

// Flags for the WhatsApp language picker. Names stay in LANGUAGE_OPTIONS so the
// picker and the booking form can never drift apart.
const LANGUAGE_FLAGS: Record<string, string> = { tr: '🇹🇷', en: '🇬🇧', de: '🇩🇪', ru: '🇷🇺', fr: '🇫🇷', ar: '🇸🇦' }
const MESSAGE_LANGUAGES = LANGUAGE_OPTIONS.filter(([value]) => value !== '')

function languageName(code: string) {
  return LANGUAGE_OPTIONS.find(([value]) => value === code)?.[1] ?? 'İngilizce'
}

function languageChip(code: string) {
  return `${LANGUAGE_FLAGS[code] ?? '🌐'} ${languageName(code)}`
}

function transferFor(booking: Booking, isReturn: boolean) {
  if (isReturn && booking.trip_type === 'round_trip' && booking.return_date) {
    return {
      date: booking.return_date, time: booking.return_pickup_time,
      pickupLocation: booking.dropoff_location, dropoffLocation: booking.pickup_location,
      pickupAddress: booking.dropoff_address, dropoffAddress: booking.pickup_address,
      // Dönüşte referans uçağın kalkış saatidir, varış değil.
      flightNumber: booking.return_flight_number, flightArrivalTime: null,
      flightDepartureTime: booking.return_flight_departure_time,
    }
  }
  return {
    date: booking.pickup_date,
    time: transferStartTime(booking.pickup_location, booking.pickup_time, booking.flight_arrival_time),
    flightDepartureTime: null,
    pickupLocation: booking.pickup_location, dropoffLocation: booking.dropoff_location,
    pickupAddress: booking.pickup_address, dropoffAddress: booking.dropoff_address,
    flightNumber: booking.flight_number, flightArrivalTime: booking.flight_arrival_time,
  }
}

function Field({ label, children }: { label?: string; children: ReactNode }) {
  return label
    ? <label className="form-field"><span className="form-label">{label}</span>{children}</label>
    : <div className="form-field">{children}</div>
}

function createEditForm(booking: Booking): BookingFormState {
  const isRoundTrip = booking.trip_type === 'round_trip'
  const isDailyChauffeur = booking.trip_type === 'daily_chauffeur'
  return {
    name: booking.customer_name ?? '', phone: booking.customer_phone ?? '', email: booking.customer_email ?? '',
    hotel: booking.hotel_name ?? '', tripType: booking.trip_type ?? 'one_way', pickup: booking.pickup_location ?? 'airport',
    dropoff: booking.dropoff_location ?? 'belek', pickupAddress: booking.pickup_address ?? '',
    dropoffAddress: booking.dropoff_address ?? '', pickupDate: booking.pickup_date ?? '', pickupTime: fmtTime(booking.pickup_time) === '—' ? '' : fmtTime(booking.pickup_time),
    flightNumber: booking.flight_number ?? '', flightTime: fmtTime(booking.flight_arrival_time) === '—' ? '' : fmtTime(booking.flight_arrival_time),
    returnDate: booking.return_date ?? '', returnTime: fmtTime(booking.return_pickup_time) === '—' ? '' : fmtTime(booking.return_pickup_time),
    returnFlight: booking.return_flight_number ?? '',
    returnFlightTime: fmtTime(booking.return_flight_departure_time) === '—' ? '' : fmtTime(booking.return_flight_departure_time),
    vehicle: booking.vehicle_type ?? 'vito', guests: String(booking.guests ?? 1),
    costMode: booking.service_cost_mode ?? 'own_vehicle', soldTransferCostTry: booking.sold_transfer_cost_try == null ? '' : String(booking.sold_transfer_cost_try),
    returnCostMode: booking.return_service_cost_mode ?? 'own_vehicle',
    returnSoldTransferCostTry: booking.return_sold_transfer_cost_try == null ? '' : String(booking.return_sold_transfer_cost_try),
    airportMeetFeeApplies: booking.airport_meet_fee_applies !== false,
    serviceEndDate: booking.service_end_date ?? booking.pickup_date ?? '', departureFlightDate: booking.departure_flight_date ?? '',
    departureFlightTime: fmtTime(booking.departure_flight_time) === '—' ? '' : fmtTime(booking.departure_flight_time), departureFlight: booking.departure_flight_number ?? '',
    luggage: String(booking.luggage_count ?? 0), childSeats: String(booking.child_seat_count ?? 0),
    price: String(isDailyChauffeur ? Number(booking.daily_rate_eur) || 150 : isRoundTrip ? (Number(booking.price_eur) || 0) / 2 : Number(booking.price_eur) || 0),
    payment: booking.payment_method ?? 'cash', status: booking.status, notes: booking.notes ?? '', fuelAccepted: Boolean(booking.fuel_terms_accepted_at),
    language: booking.language ?? '',
  }
}

function BookingEditor({ booking, onCancel, onSaved }: { booking: Booking; onCancel: () => void; onSaved: (booking: Booking) => void }) {
  const [form, setForm] = useState(() => createEditForm(booking))
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)
  const errorRef = useRef<HTMLDivElement>(null)
  const set = <K extends keyof BookingFormState>(name: K, value: BookingFormState[K]) => setForm(current => ({ ...current, [name]: value }))
  const options = LOCATION_OPTIONS.map(([value, label]) => <option key={value} value={value}>{label}</option>)
  const roundTrip = form.tripType === 'round_trip'
  const dailyChauffeur = form.tripType === 'daily_chauffeur'

  const submit = async (event: FormEvent) => {
    event.preventDefault()
    const result = validateBookingForm(form)
    if (result.error || !result.payload) {
      setError(result.error); requestAnimationFrame(() => errorRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })); return
    }
    const { status: _status, ...rest } = result.payload
    const payload = { ...rest, language: form.language || languageFromPhone(form.phone) }
    setSaving(true); setError('')
    const { count, error: updateError } = await supabase.from('bookings').update(payload, { count: 'exact' }).eq('id', booking.id)
    setSaving(false)
    if (updateError || count === 0) {
      if (updateError) console.error('Rezervasyon güncelleme hatası:', updateError.message, updateError.details, updateError.hint, updateError.code)
      return setError('Rezervasyon güncellenemedi, tekrar deneyin.')
    }
    onSaved({ ...booking, ...payload } as Booking)
  }

  return <form noValidate onSubmit={submit}>
    <div className="booking-edit-group"><div className="section-label">Müşteri</div>
      <Field label="Ad Soyad *"><input className="input" type="text" maxLength={80} autoComplete="off" value={form.name} onChange={e => set('name', e.target.value)} required /></Field>
      <div className="form-row"><Field label="Telefon *"><input className="input" type="tel" autoComplete="off" value={form.phone} onChange={e => set('phone', e.target.value)} required /></Field><Field label="E-posta"><input className="input" type="email" maxLength={120} autoComplete="off" value={form.email} onChange={e => set('email', e.target.value)} /></Field></div>
      <Field label="Otel / Konaklama"><input className="input" type="text" maxLength={120} autoComplete="off" value={form.hotel} onChange={e => set('hotel', e.target.value)} /></Field>
      <Field label="Mesaj dili"><select className="input" value={form.language} onChange={e => set('language', e.target.value)}>{LANGUAGE_OPTIONS.map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select><span className="form-hint">Müşteriye gidecek WhatsApp mesajlarının dili. Otomatik = telefon ülke kodundan.</span></Field>
    </div>
    <div className="booking-edit-group"><div className="section-label">Transfer</div>
      <Field label="Sefer türü"><select className="input" value={form.tripType} onChange={e => {
        const tripType = e.target.value
        setForm(current => ({
          ...current,
          tripType,
          costMode: tripType === 'daily_chauffeur' ? 'own_vehicle' : current.costMode,
          soldTransferCostTry: tripType === 'daily_chauffeur' ? '' : current.soldTransferCostTry,
          returnCostMode: tripType === 'round_trip' ? current.returnCostMode : 'own_vehicle',
          returnSoldTransferCostTry: tripType === 'round_trip' ? current.returnSoldTransferCostTry : '',
        }))
      }}><option value="one_way">Tek yön</option><option value="round_trip">Gidiş-dönüş</option><option value="daily_chauffeur">Günlük araç + şoför</option></select></Field>
      <div className="form-row"><Field label="Alış *"><select className="input" value={form.pickup} onChange={e => set('pickup', e.target.value)}>{options}</select></Field>{!dailyChauffeur && <Field label="Varış *"><select className="input" value={form.dropoff} onChange={e => set('dropoff', e.target.value)}>{options}</select></Field>}</div>
      {(form.pickup === 'private_address' || (!dailyChauffeur && form.dropoff === 'private_address')) && <div className="form-row">{form.pickup === 'private_address' && <Field label="Alış özel adresi *"><input className="input" maxLength={160} autoComplete="street-address" value={form.pickupAddress} onChange={e => set('pickupAddress', e.target.value)} required /></Field>}{!dailyChauffeur && form.dropoff === 'private_address' && <Field label="Varış özel adresi *"><input className="input" maxLength={160} autoComplete="street-address" value={form.dropoffAddress} onChange={e => set('dropoffAddress', e.target.value)} required /></Field>}</div>}
      <div className="form-row"><Field label={dailyChauffeur ? 'İlk hizmet günü *' : 'Tarih *'}><input className="input" type="date" value={form.pickupDate} onChange={e => set('pickupDate', e.target.value)} required /></Field><Field label={dailyChauffeur ? 'Hizmet başlangıç saati *' : 'Saat'}><input className="input" type="time" value={form.pickupTime} onChange={e => set('pickupTime', e.target.value)} required={dailyChauffeur} /></Field></div>
      <div className="form-row"><Field label="Uçuş no"><input className="input" type="text" maxLength={12} autoComplete="off" value={form.flightNumber} onChange={e => set('flightNumber', e.target.value)} /></Field><Field label="Uçuş varış"><input className="input" type="time" value={form.flightTime} onChange={e => set('flightTime', e.target.value)} /></Field></div>
    </div>
    {roundTrip && <div className="booking-edit-group"><div className="section-label">Dönüş</div><div className="form-row"><Field label="Dönüş uçuş no"><input className="input" type="text" maxLength={12} autoComplete="off" value={form.returnFlight} onChange={e => set('returnFlight', e.target.value)} /></Field><Field label="Dönüş uçuşu kalkış saati"><input className="input" type="time" value={form.returnFlightTime} onChange={e => set('returnFlightTime', e.target.value)} /></Field></div><ReturnPickupHint departureTime={form.returnFlightTime} pickupLocation={form.dropoff} actualTime={form.returnTime} onApply={time => set('returnTime', time)} /><div className="form-row"><Field label="Dönüş tarihi *"><input className="input" type="date" value={form.returnDate} onChange={e => set('returnDate', e.target.value)} required /></Field><Field label="Otelden alınma saati *"><input className="input" type="time" value={form.returnTime} onChange={e => set('returnTime', e.target.value)} required /></Field></div></div>}
    {dailyChauffeur && <div className="booking-edit-group"><div className="section-label">Günlük Kiralama</div><Field label="Son hizmet günü *"><input className="input" type="date" min={form.pickupDate} value={form.serviceEndDate} onChange={e => set('serviceEndDate', e.target.value)} required /></Field><div className="form-row"><Field label="Dönüş uçuş tarihi"><input className="input" type="date" min={form.pickupDate} value={form.departureFlightDate} onChange={e => set('departureFlightDate', e.target.value)} /></Field><Field label="Dönüş uçuş saati"><input className="input" type="time" value={form.departureFlightTime} onChange={e => set('departureFlightTime', e.target.value)} /></Field></div><Field label="Dönüş uçuş no"><input className="input" type="text" maxLength={12} value={form.departureFlight} onChange={e => set('departureFlight', e.target.value)} /></Field><label className="admin-fuel-acceptance"><input type="checkbox" checked={form.fuelAccepted} onChange={e => set('fuelAccepted', e.target.checked)} /><span><strong>Yakıt hariç koşulu kabul edildi</strong><small>Müşteri yakıtı kullanıma göre ayrıca ödeyecek.</small></span></label></div>}
    <div className="booking-edit-group"><div className="section-label">Araç & Detaylar</div><div className="form-row"><Field label="Araç *"><select className="input" value={form.vehicle} onChange={e => set('vehicle', e.target.value)}><option value="vito">Vito</option><option value="vclass">V-Class</option></select></Field><Field label="Yolcu *"><input className="input" type="number" min={1} max={VEHICLE_CAPACITY[form.vehicle] ?? 8} step={1} inputMode="numeric" value={form.guests} onChange={e => set('guests', e.target.value)} required /></Field></div><div className="form-row"><Field label="Bagaj"><input className="input" type="number" min={0} max={12} step={1} inputMode="numeric" value={form.luggage} onChange={e => set('luggage', e.target.value)} /></Field><Field label="Çocuk koltuğu"><input className="input" type="number" min={0} max={4} step={1} inputMode="numeric" value={form.childSeats} onChange={e => set('childSeats', e.target.value)} /></Field></div><Field label={roundTrip ? 'Gidiş maliyet modeli' : 'Maliyet modeli'}><select className="input" value={form.costMode} onChange={e => set('costMode', e.target.value as BookingFormState['costMode'])} disabled={dailyChauffeur}><option value="own_vehicle">Kendi aracımız</option><option value="sold_transfer">Satılan transfer</option><option value="no_cost">Maliyeti yok</option></select></Field><div className="form-hint">{dailyChauffeur ? 'Günlük araç + şoför hizmeti yalnızca kendi aracımız olarak hesaplanır.' : form.costMode === 'no_cost' ? 'Bu ayak için gider hesaplanmaz; kâr/zarar ekranında KM veya tedarikçi bedeli sorulmaz.' : form.costMode === 'sold_transfer' ? (roundTrip ? 'Girilen maliyet yalnızca gidiş ayağının gideri kabul edilir.' : 'Girilen toplam maliyet bu rezervasyonun toplam gideri kabul edilir.') : 'Araç maliyeti kâr/zarar ekranında km ve boş dönüş hesabından çıkarılır.'}</div>{form.pickup === 'airport' && !dailyChauffeur && <label className="admin-fuel-acceptance"><input type="checkbox" checked={!form.airportMeetFeeApplies} onChange={e => set('airportMeetFeeApplies', !e.target.checked)} /><span><strong>Karşılama ücreti uygulanmasın</strong><small>Yolcular havalimanından karşılama hizmeti olmadan alınacak.</small></span></label>}{!dailyChauffeur && form.costMode === 'sold_transfer' && <Field label={roundTrip ? 'Gidiş maliyeti (₺) *' : 'Toplam maliyet (₺) *'}><input className="input" type="number" min={0.01} max={9999999.99} step={0.01} inputMode="decimal" value={form.soldTransferCostTry} onChange={e => set('soldTransferCostTry', e.target.value)} required /></Field>}{roundTrip && !dailyChauffeur && <><Field label="Dönüş maliyet modeli"><select className="input" value={form.returnCostMode} onChange={e => set('returnCostMode', e.target.value as BookingFormState['returnCostMode'])}><option value="own_vehicle">Kendi aracımız</option><option value="sold_transfer">Satılan transfer</option><option value="no_cost">Maliyeti yok</option></select></Field><div className="form-hint">Gidiş ve dönüş ayrı hesaplanır: bir ayağı satabilir, diğerini kendi aracınızla yapabilirsiniz.</div>{form.returnCostMode === 'sold_transfer' && <Field label="Dönüş maliyeti (₺) *"><input className="input" type="number" min={0.01} max={9999999.99} step={0.01} inputMode="decimal" value={form.returnSoldTransferCostTry} onChange={e => set('returnSoldTransferCostTry', e.target.value)} required /></Field>}</>}</div>
    <div className="booking-edit-group"><div className="section-label">Ödeme & Not</div><div className="form-row"><Field label={dailyChauffeur ? 'Günlük fiyat (€) *' : roundTrip ? 'Sefer başına fiyat (€) *' : 'Fiyat (€) *'}><input className="input" type="number" min={0} max={999999.99} step={0.01} inputMode="decimal" value={form.price} onChange={e => set('price', e.target.value)} required /></Field><Field label="Ödeme"><select className="input" value={form.payment} onChange={e => set('payment', e.target.value)}><option value="cash">Nakit</option><option value="card">Kart</option></select></Field></div><Field label="Rezervasyon notu"><textarea className="input" rows={3} maxLength={500} value={form.notes} onChange={e => set('notes', e.target.value)} /></Field></div>
    <div className="booking-edit-actions"><button className="btn" type="submit" disabled={saving}>{saving ? 'Kaydediliyor...' : 'Değişiklikleri Kaydet'}</button><button className="btn-outline" type="button" onClick={onCancel}>İptal</button></div><div className="inline-error" ref={errorRef}>{error}</div>
  </form>
}

type ValidateResult = { ok: boolean; value?: string | null; error?: string }

function InlineEditor({ booking, column, label, display, maxLength, inputType = 'text', validate, onSaved }: {
  booking: Booking; column: string; label: string; display: ReactNode; maxLength: number; inputType?: string
  validate: (value: string) => ValidateResult; onSaved: (booking: Booking, message: string) => void
}) {
  const [editing, setEditing] = useState(false)
  const [value, setValue] = useState(String(booking[column] ?? ''))
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const open = () => { setValue(String(booking[column] ?? '')); setError(''); setEditing(true); requestAnimationFrame(() => { inputRef.current?.focus(); inputRef.current?.select() }) }
  const save = async () => {
    const result = validate(value)
    if (!result.ok) return setError(result.error ?? 'Geçersiz değer.')
    setSaving(true); setError('')
    const { count, error: updateError } = await supabase.from('bookings').update({ [column]: result.value }, { count: 'exact' }).eq('id', booking.id)
    setSaving(false)
    if (updateError || count === 0) {
      if (updateError) console.error(`${label} güncelleme hatası:`, updateError.message, updateError.details, updateError.hint, updateError.code)
      return setError(`${label} güncellenemedi, tekrar deneyin.`)
    }
    setEditing(false); onSaved({ ...booking, [column]: result.value } as Booking, `${label} güncellendi.`)
  }
  return <div className="full"><div className="editable-heading"><div className="detail-key">{label}</div><button className="inline-edit-button" type="button" onClick={open}>Düzenle</button></div><div className="detail-val">{display}</div>{editing && <div className="inline-editor"><input ref={inputRef} className="input" type={inputType} maxLength={maxLength} aria-label={label} value={value} onChange={e => setValue(e.target.value)} /><div className="inline-editor-actions"><button className="btn inline-editor-button" type="button" disabled={saving} onClick={() => void save()}>Kaydet</button><button className="btn-outline inline-editor-button" type="button" onClick={() => { setEditing(false); setError('') }}>İptal</button></div><div className="inline-error">{error}</div></div>}</div>
}

function PriceEditor({ booking, onSaved }: { booking: Booking; onSaved: (booking: Booking, message: string) => void }) {
  const roundTrip = booking.trip_type === 'round_trip'
  const dailyChauffeur = booking.trip_type === 'daily_chauffeur'
  const legPrice = dailyChauffeur ? Number(booking.daily_rate_eur) || 150 : roundTrip ? (Number(booking.price_eur) || 0) / 2 : Number(booking.price_eur) || 0
  const [editing, setEditing] = useState(false)
  const [value, setValue] = useState(String(legPrice))
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)
  const save = async () => {
    const nextLegPrice = Number(value.replace(',', '.'))
    if (!Number.isFinite(nextLegPrice) || nextLegPrice < 0 || nextLegPrice > 999999.99 || (dailyChauffeur && nextLegPrice === 0)) return setError('Geçerli bir fiyat girin.')
    const hireDays = dailyChauffeur && booking.service_end_date
      ? Math.floor((Date.parse(`${booking.service_end_date}T00:00:00Z`) - Date.parse(`${booking.pickup_date}T00:00:00Z`)) / 86_400_000) + 1
      : 1
    const total = dailyChauffeur ? nextLegPrice * hireDays : roundTrip ? nextLegPrice * 2 : nextLegPrice
    setSaving(true); setError('')
    const pricePayload = dailyChauffeur ? { price_eur: total, daily_rate_eur: nextLegPrice } : { price_eur: total }
    const { count, error: updateError } = await supabase.from('bookings').update(pricePayload, { count: 'exact' }).eq('id', booking.id)
    setSaving(false)
    if (updateError || count === 0) {
      if (updateError) console.error('Fiyat güncelleme hatası:', updateError.message, updateError.details, updateError.hint, updateError.code)
      return setError('Fiyat güncellenemedi, tekrar deneyin.')
    }
    setEditing(false); onSaved({ ...booking, ...pricePayload }, 'Fiyat güncellendi.')
  }
  return <><button className="btn-outline price-edit-btn" type="button" onClick={() => { setValue(String(legPrice)); setError(''); setEditing(true) }}>Düzenle</button>{editing && <div className="price-editor" style={{ gridColumn: '1 / -1' }}><div className="price-editor-row"><span style={{ color: 'var(--text-muted)' }}>€</span><input className="input price-input" type="number" min={dailyChauffeur ? 0.01 : 0} step={0.01} inputMode="decimal" aria-label="Yeni fiyat" value={value} onChange={e => setValue(e.target.value)} autoFocus /><button className="btn price-action" type="button" disabled={saving} onClick={() => void save()}>Kaydet</button><button className="btn-outline price-action" type="button" onClick={() => setEditing(false)}>İptal</button></div><div className="inline-error">{error}</div></div>}</>
}

function ChauffeurDayEditor({ day, onSaved }: { day: ChauffeurHireDay; onSaved: (day: ChauffeurHireDay) => void }) {
  const [driver, setDriver] = useState(day.driver_name ?? '')
  const [plate, setPlate] = useState(day.vehicle_plate ?? '')
  const [distance, setDistance] = useState(day.distance_km == null ? '' : String(day.distance_km))
  const [fuel, setFuel] = useState(day.fuel_amount_eur == null ? '' : String(day.fuel_amount_eur))
  const [fuelPaid, setFuelPaid] = useState(day.fuel_paid)
  const [status, setStatus] = useState(day.status)
  const [notes, setNotes] = useState(day.notes ?? '')
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')
  const save = async () => {
    const distanceKm = distance.trim() === '' ? null : Number(distance.replace(',', '.'))
    const fuelAmount = fuel.trim() === '' ? null : Number(fuel.replace(',', '.'))
    if (distanceKm !== null && (!Number.isFinite(distanceKm) || distanceKm < 0 || distanceKm > 10000)) return setMessage('Geçerli bir kilometre girin.')
    if (fuelAmount !== null && (!Number.isFinite(fuelAmount) || fuelAmount < 0 || fuelAmount > 999999.99)) return setMessage('Geçerli bir yakıt tutarı girin.')
    const payload = {
      driver_name: driver.trim() || null, vehicle_plate: plate.trim().toUpperCase() || null,
      distance_km: distanceKm, fuel_amount_eur: fuelAmount, fuel_paid: fuelPaid,
      status, notes: notes.trim() || null, updated_at: new Date().toISOString(),
    }
    setSaving(true); setMessage('')
    const { data, error } = await supabase.from('chauffeur_hire_days').update(payload).eq('id', day.id).select().single()
    setSaving(false)
    if (error || !data) {
      if (error) console.error('Günlük kayıt güncelleme hatası:', error.message, error.details, error.hint, error.code)
      return setMessage('Günlük kayıt güncellenemedi.')
    }
    onSaved(data as ChauffeurHireDay); setMessage('Kaydedildi.')
  }
  return <div className="chauffeur-day-card">
    <div className="chauffeur-day-heading"><div><strong>{day.day_number}. Gün</strong><span>{fmtDetailDate(day.service_date)}</span></div><select className="input" value={status} onChange={e => setStatus(e.target.value as ChauffeurHireDay['status'])}><option value="scheduled">Planlandı</option><option value="in_progress">Devam ediyor</option><option value="completed">Tamamlandı</option></select></div>
    <div className="form-row"><Field label="Şoför"><input className="input" maxLength={60} value={driver} onChange={e => setDriver(e.target.value)} /></Field><Field label="Plaka"><input className="input" maxLength={15} value={plate} onChange={e => setPlate(e.target.value)} /></Field></div>
    <div className="form-row"><Field label="Gerçekleşen kilometre"><input className="input" type="number" min={0} max={10000} step={0.1} value={distance} onChange={e => setDistance(e.target.value)} /></Field><Field label="Yakıt tutarı (€)"><input className="input" type="number" min={0} step={0.01} value={fuel} onChange={e => setFuel(e.target.value)} /></Field></div>
    <label className="admin-fuel-paid"><input type="checkbox" checked={fuelPaid} onChange={e => setFuelPaid(e.target.checked)} /><span>Yakıt ücreti müşteri tarafından ödendi</span></label>
    <Field label="Günlük not"><textarea className="input" rows={2} maxLength={500} value={notes} onChange={e => setNotes(e.target.value)} /></Field>
    <div className="chauffeur-day-actions"><button className="btn" type="button" disabled={saving} onClick={() => void save()}>{saving ? 'Kaydediliyor…' : 'Günü Kaydet'}</button><span className={message === 'Kaydedildi.' ? 'inline-success' : 'inline-error'}>{message}</span></div>
  </div>
}

export default function BookingDetailPage({ bookingRef, isReturn, sourceTab, profitPeriod, navigate }: { bookingRef: string; isReturn: boolean; sourceTab: 'future' | 'past' | 'cancelled' | 'profit-loss'; profitPeriod?: string | null; navigate: Navigate }) {
  const [booking, setBooking] = useState<Booking | null>(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)
  const [editing, setEditing] = useState(false)
  const [success, setSuccess] = useState('')
  const [statusError, setStatusError] = useState('')
  const [statusSaving, setStatusSaving] = useState(false)
  const [note, setNote] = useState('')
  const [noteError, setNoteError] = useState('')
  const [noteSaving, setNoteSaving] = useState(false)
  const [templateState, setTemplateState] = useState({ loading: '', success: '', error: '' })
  const [messageLang, setMessageLang] = useState('')
  const [preview, setPreview] = useState<{ kind: TemplateKind; text: string } | null>(null)
  const [deleting, setDeleting] = useState(false)
  const [deleteError, setDeleteError] = useState('')

  useEffect(() => {
    let active = true
    setLoading(true)
    supabase.from('bookings').select('*, booking_notes(id, note, created_at), chauffeur_hire_days(*)').eq('booking_ref', bookingRef).limit(1).then(({ data, error }: any) => {
      if (!active) return
      setLoading(false)
      if (error || !data?.length) setNotFound(true)
      else setBooking(data[0] as Booking)
    })
    return () => { active = false }
  }, [bookingRef])

  const updateBooking = (next: Booking, message = '') => { setBooking(next); setSuccess(message) }

  const backHash = sourceTab === 'profit-loss'
    ? `#profit-loss${profitPeriod ? `?period=${encodeURIComponent(profitPeriod)}` : ''}`
    : '#timeline'
  if (loading) return <><Topbar navigate={navigate} title="Transfer Detayı" back={backHash} /><div className="scroll-area"><div className="empty"><div>Yükleniyor…</div></div></div></>
  if (notFound || !booking) return <><Topbar navigate={navigate} title="Transfer Detayı" back={backHash} /><div className="scroll-area"><div className="empty"><div>Rezervasyon bulunamadı</div></div></div></>

  const roundTrip = booking.trip_type === 'round_trip'
  const dailyChauffeur = booking.trip_type === 'daily_chauffeur'
  const needsReturnContact = Boolean(isReturn && roundTrip && booking.status === 'completed' && isFutureIstanbulLeg(booking.return_date, booking.return_pickup_time))
  const displayStatus = (needsReturnContact ? 'confirmed' : booking.status) as BookingStatus
  const transfer = transferFor(booking, isReturn)
  const pickupDisplay = locationDisplay(transfer.pickupLocation, transfer.pickupAddress)
  const dropoffDisplay = dailyChauffeur ? 'Esnek güzergâh' : locationDisplay(transfer.dropoffLocation, transfer.dropoffAddress)
  const navigation = !dailyChauffeur ? navigationURLs({ originValue: transfer.pickupLocation, originAddress: transfer.pickupAddress, destinationValue: transfer.dropoffLocation, destinationAddress: transfer.dropoffAddress, hotelName: booking.hotel_name }) : null
  const legPrice = dailyChauffeur ? Number(booking.daily_rate_eur) || 150 : roundTrip ? (Number(booking.price_eur) || 0) / 2 : Number(booking.price_eur) || 0
  const paymentMethod = booking.payment_method === 'cash' ? 'Nakit' : 'Kart'
  // Kâr/zarar motoruyla aynı kural: ayrıştırılmamış eski kayıtlarda toplam
  // maliyet iki ayağa bölünür, ayrıştırılmışlarda her ayak kendi bedelini taşır.
  const legCost = legCostModel(booking, isReturn && roundTrip ? 'return' : 'outbound')
  const costModeLabel = COST_MODE_LABELS[legCost.costMode as CostMode] ?? 'Kendi aracımız'
  // Dönüş ayağında yolcu, gidişin varış bölgesinden alınır.
  const returnPickup = returnPickupAdvice(booking.return_flight_departure_time, booking.dropoff_location)
  const sortedNotes = [...(booking.booking_notes ?? [])].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
  const showSeparateFlightArrival = transfer.flightArrivalTime && transfer.flightArrivalTime !== transfer.time
  const flightTimeSuffix = transfer.flightDepartureTime
    ? ` kalkış ${fmtTime(transfer.flightDepartureTime)}`
    : showSeparateFlightArrival ? ` varış ${fmtTime(transfer.flightArrivalTime)}` : ''
  const hireDays = dailyChauffeur && booking.service_end_date
    ? Math.floor((Date.parse(`${booking.service_end_date}T00:00:00Z`) - Date.parse(`${booking.pickup_date}T00:00:00Z`)) / 86_400_000) + 1
    : 0
  const sortedHireDays = [...(booking.chauffeur_hire_days ?? [])].sort((left, right) => left.day_number - right.day_number)

  const planTrip = (reverse: boolean) => {
    const hotel = String(booking.hotel_name ?? '').trim()
    const from = reverse ? transfer.dropoffLocation : transfer.pickupLocation
    const to = reverse ? transfer.pickupLocation : transfer.dropoffLocation
    const fromAddress = reverse ? transfer.dropoffAddress : transfer.pickupAddress
    const toAddress = reverse ? transfer.pickupAddress : transfer.dropoffAddress
    queueBookingPrefill({ sourceRef: booking.booking_ref, customerName: booking.customer_name, customerPhone: booking.customer_phone, hotelName: hotel.toLocaleLowerCase('tr-TR') === 'belirtilmedi' ? '' : hotel, vehicleType: booking.vehicle_type, guests: booking.guests, luggageCount: booking.luggage_count, childSeatCount: booking.child_seat_count, paymentMethod: booking.payment_method, pickupLocation: from ?? 'airport', pickupAddress: fromAddress, dropoffLocation: to ?? 'belek', dropoffAddress: toAddress, notes: reverse ? `Dönüş · Kaynak rezervasyon: ${booking.booking_ref}` : `Kaynak rezervasyon: ${booking.booking_ref}` })
    navigate('#new')
  }

  // Each button says what it sends and when it is the right one to send, so the
  // operator never has to open a message to remember which is which.
  const templateCards: { kind: TemplateKind; icon: string; title: string; hint: string }[] = [
    { kind: 'received', icon: '📥', title: 'Talebinizi aldık', hint: 'Yeni talep geldiğinde ilk cevap' },
    { kind: 'confirm', icon: '✅', title: roundTrip ? (isReturn ? 'Dönüş onayı' : 'Gidiş onayı') : 'Rezervasyon onayı', hint: 'Fiyat ve transfer detaylarıyla onay' },
    { kind: 'reminder', icon: '⏰', title: roundTrip ? (isReturn ? 'Dönüş hatırlatması' : 'Gidiş hatırlatması') : 'Transfer hatırlatması', hint: 'Transferden önce sürücü, plaka ve harita' },
    { kind: 'review', icon: '⭐', title: 'Yorum iste', hint: 'Transfer tamamlandıktan sonra' },
  ]

  // The dropdown wins; 'auto' keeps the booking's own language and, when that
  // was never stored, falls back to the phone's country code — never silently
  // to English, which is what used to reach customers.
  const resolveLanguage = (source: Booking = booking) =>
    messageLang || source.language || languageFromPhone(source.customer_phone)

  const buildMessage = (source: Booking, kind: TemplateKind, language: string) => {
    const leg = isReturn ? 'return' : 'outbound'
    if (kind === 'confirm') return buildConfirmMessage(source, { leg, language })
    if (kind === 'reminder') return buildReminderMessage(source, { leg, language })
    if (kind === 'received') return buildReceivedMessage(source, { language })
    return buildReviewMessage(source, { language })
  }

  const showPreview = (kind: TemplateKind) => {
    setTemplateState({ loading: '', success: '', error: '' })
    setPreview(current => current?.kind === kind
      ? null
      : { kind, text: buildMessage(booking, kind, resolveLanguage()) })
  }

  const copyPreview = async () => {
    if (!preview) return
    try {
      await navigator.clipboard.writeText(preview.text)
      setTemplateState({ loading: '', success: 'Mesaj panoya kopyalandı.', error: '' })
    } catch {
      setTemplateState({ loading: '', success: '', error: 'Panoya kopyalanamadı; metni elle seçip kopyalayın.' })
    }
  }

  const openTemplate = async (kind: TemplateKind) => {
    setPreview(null)
    const popup = window.open('about:blank', '_blank')
    if (!popup) return setTemplateState({ loading: '', success: '', error: 'WhatsApp sekmesi açılamadı. Tarayıcıdaki açılır pencere iznini kontrol edin.' })
    try { popup.opener = null; popup.document.title = 'WhatsApp mesajı hazırlanıyor'; popup.document.body.textContent = 'Güncel rezervasyon bilgileri kontrol ediliyor…' } catch { /* redirect can still work */ }
    setTemplateState({ loading: kind, success: '', error: '' })
    const { data, error } = await supabase.from('bookings').select('*').eq('id', booking.id).single()
    if (error || !data) {
      if (!popup.closed) popup.close()
      return setTemplateState({ loading: '', success: '', error: 'Güncel rezervasyon bilgileri alınamadı; eski veriyle mesaj açılmadı.' })
    }
    const latest = data as Booking
    setBooking(current => ({ ...current!, ...latest }))
    const message = buildMessage(latest, kind, resolveLanguage(latest))
    if (popup.closed) return setTemplateState({ loading: '', success: '', error: 'WhatsApp sekmesi kapatıldı.' })
    popup.location.replace(whatsappURL(latest.customer_phone, message))
    setTemplateState({ loading: '', success: `Mesaj ${languageName(resolveLanguage(latest))} dilinde, en güncel transfer ve adres bilgileriyle hazırlandı.`, error: '' })
  }

  const updateStatus = async (next: BookingStatus) => {
    if (next === 'cancelled' && !window.confirm('Bu transferi iptal etmek istediğinize emin misiniz?')) return
    const previousStatus = booking.status
    setBooking({ ...booking, status: next })
    setStatusSaving(true); setStatusError('')
    const { count, error } = await supabase.from('bookings').update({ status: next }, { count: 'exact' }).eq('booking_ref', bookingRef)
    setStatusSaving(false)
    if (error || count === 0) {
      if (error) console.error('Durum güncelleme hatası:', error.message, error.details, error.hint, error.code)
      setBooking({ ...booking, status: previousStatus })
      setStatusError('Güncelleme başarısız, tekrar deneyin.')
    }
  }

  const deleteBooking = async () => {
    if (!window.confirm('Bu rezervasyonu kalıcı olarak silmek istediğinize emin misiniz? Bu işlem geri alınamaz.')) return
    setDeleting(true); setDeleteError('')
    const { count, error } = await supabase.from('bookings').delete({ count: 'exact' }).eq('id', booking.id)
    setDeleting(false)
    // Yetki kuralları bir satırı gizlerse Supabase hata döndürmez, yalnızca 0
    // satır siler; bu durumda kayıt hâlâ duruyor demektir.
    if (error || count === 0) {
      if (error) console.error('Rezervasyon silme hatası:', error.message, error.details, error.hint, error.code)
      setDeleteError('Silme başarısız, kayıt hâlâ duruyor. Tekrar deneyin.')
      return
    }
    navigate(backHash)
  }

  const addNote = async () => {
    const nextNote = note.trim()
    if (!nextNote) return
    setNoteSaving(true); setNoteError('')
    const { data, error } = await supabase.from('booking_notes').insert({ booking_id: booking.id, note: nextNote }).select().single()
    setNoteSaving(false)
    if (error) return setNoteError('Not eklenemedi, tekrar deneyin.')
    setBooking({ ...booking, booking_notes: [data, ...(booking.booking_notes ?? [])] }); setNote('')
  }

  const updateHireDay = (saved: ChauffeurHireDay) => {
    setBooking(current => current ? {
      ...current,
      chauffeur_hire_days: (current.chauffeur_hire_days ?? []).map(day => day.id === saved.id ? saved : day),
    } : current)
  }

  const genericSaved = (next: Booking, message: string) => updateBooking(next, message)
  const normalizeOptional = (raw: string, max: number, name: string): ValidateResult => {
    const value = raw.trim().replace(/\s+/g, ' ')
    if (value && value.length > max) return { ok: false, error: `${name} en fazla ${max} karakter olmalı.` }
    return { ok: true, value: value || null }
  }

  return <><Topbar navigate={navigate} title={dailyChauffeur ? 'Günlük Kiralama Detayı' : 'Transfer Detayı'} back={backHash} />
    <div className="scroll-area">
      <div className="section"><div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}><span style={{ color: 'var(--text-muted)', fontSize: 13 }}>{booking.booking_ref}</span><div className="card-badges"><span className={`badge badge-${displayStatus}`}>{statusLabel(displayStatus, roundTrip)}</span>{dailyChauffeur && <span className="badge badge-daily">GÜNLÜK KİRALAMA</span>}{roundTrip && <span className={`badge ${isReturn ? 'badge-return' : 'badge-outbound'}`}>{isReturn ? 'DÖNÜŞ' : 'GİDİŞ'}</span>}</div></div></div>
      <div className="section quick-actions-section"><button className="btn-outline blue" type="button" onClick={() => planTrip(false)}>🆕 Bu yolcudan yeni seyahat planla</button>{!dailyChauffeur && <button className="btn-outline blue" type="button" onClick={() => planTrip(true)}>↩ Dönüş yolculuğu planla</button>}</div>
      {needsReturnContact && <div className="return-contact-alert detail-return-contact" role="status"><span className="return-contact-icon" aria-hidden="true">☎</span><span className="return-contact-copy"><strong>Gidiş seyahati için iletişime geç</strong><small>Geliş transferi tamamlandı.</small></span><a href={whatsappURL(booking.customer_phone)} target="_blank" rel="noopener noreferrer">WhatsApp</a></div>}
      <div className="section"><div className="editable-heading" style={{ marginBottom: 8 }}><div className="section-label" style={{ marginBottom: 0 }}>{dailyChauffeur ? 'Günlük Araç + Şoför' : 'Transfer'}</div><button className="inline-edit-button" type="button" hidden={editing} onClick={() => { setSuccess(''); setEditing(true) }}>Tümünü düzenle</button></div>{dailyChauffeur ? <><div className="daily-detail-title">{fmtDetailDate(booking.pickup_date)} – {fmtDetailDate(booking.service_end_date)} · {hireDays} gün</div><div className="daily-detail-summary"><span><small>Başlangıç</small><strong>{fmtTime(booking.pickup_time)} · {pickupDisplay}</strong></span><span><small>Hizmet</small><strong>Kilometre ve saat sınırı yok</strong></span><span><small>Ücret</small><strong>€{fmtPrice(Number(booking.daily_rate_eur) || 150)} × {hireDays} = €{fmtPrice(booking.price_eur)}</strong></span></div><div className={`fuel-acceptance-status${booking.fuel_terms_accepted_at ? ' accepted' : ' missing'}`}>{booking.fuel_terms_accepted_at ? `✓ Yakıt hariç koşulu müşteri tarafından onaylandı · ${new Date(booking.fuel_terms_accepted_at).toLocaleString('tr-TR')}` : '⚠ Yakıt hariç koşulu onaylanmamış'}</div>{booking.flight_number && <div className="daily-flight-line">✈ Geliş: {booking.pickup_date} · {booking.flight_number} · varış {fmtTime(booking.flight_arrival_time)}</div>}{booking.departure_flight_date && <div className="daily-flight-line">✈ Dönüş: {booking.departure_flight_date} · {booking.departure_flight_number || 'Uçuş no yok'} · kalkış {fmtTime(booking.departure_flight_time)}</div>}</> : <><div style={{ fontSize: 17, fontWeight: 700, marginBottom: 4 }}>{fmtTime(transfer.time)} &nbsp;{pickupDisplay} → {dropoffDisplay}</div><div style={{ color: 'var(--text-muted)', fontSize: 13 }}>{fmtDetailDate(transfer.date)}{transfer.flightNumber ? ` · ✈️ ${transfer.flightNumber}${flightTimeSuffix}` : ''}</div>{transfer.pickupAddress && <div style={{ color: 'var(--text-muted)', fontSize: 13, marginTop: 6 }}>📍 Alış: {transfer.pickupAddress}</div>}{transfer.dropoffAddress && <div style={{ color: 'var(--text-muted)', fontSize: 13, marginTop: 3 }}>📍 Varış: {transfer.dropoffAddress}</div>}{navigation && <><div className="detail-navigation-label">Transfer rotası</div><div className="detail-navigation" aria-label="Google Haritalar ile transfer rotası için yol tarifi"><a href={navigation.google} target="_blank" rel="noopener noreferrer"><span aria-hidden="true">↗</span> Adrese yol tarifi al</a></div></>}</>}<div className="inline-success" role="status">{success}</div></div>
      {roundTrip && isReturn && !editing && <div className="section return-pickup-section"><div className="section-label">Dönüş Uçuşu & Otelden Alınma</div>
        <div className="detail-grid">
          <div><div className="detail-key">Dönüş uçuşu</div><div className="detail-val">{booking.return_flight_number ? `✈️ ${booking.return_flight_number}` : '—'}</div></div>
          <div><div className="detail-key">Uçuş kalkış saati</div><div className="detail-val">{fmtTime(booking.return_flight_departure_time)}</div></div>
          <div><div className="detail-key">Planlanan alış</div><div className="detail-val">{fmtTime(booking.return_pickup_time)}</div></div>
          <div><div className="detail-key">Tavsiye edilen alış</div><div className="detail-val">{returnPickup ? returnPickup.time : '—'}</div></div>
        </div>
        {returnPickup
          ? <ReturnPickupHint departureTime={booking.return_flight_departure_time} pickupLocation={booking.dropoff_location} actualTime={booking.return_pickup_time} />
          : <div className="form-hint">Tavsiye edilen alış saatini hesaplamak için dönüş uçuşunun kalkış saatini girin.</div>}
      </div>}
      {editing && <div className="section booking-edit-section"><BookingEditor booking={booking} onCancel={() => setEditing(false)} onSaved={next => { setEditing(false); updateBooking(next, 'Rezervasyon bilgileri güncellendi.') }} /></div>}

      {dailyChauffeur && <div className="section chauffeur-days-section"><div className="section-label">Günlük Operasyon</div>{sortedHireDays.length ? sortedHireDays.map(day => <ChauffeurDayEditor key={day.id} day={day} onSaved={updateHireDay} />) : <div className="inline-error">Günlük operasyon kayıtları bulunamadı. Migration ve tetikleyici durumunu kontrol edin.</div>}</div>}

      <div className="section"><div className="section-label">Müşteri</div><div style={{ fontWeight: 600, marginBottom: 4 }}>{booking.customer_name}</div><div style={{ marginBottom: 4 }}><a className="whatsapp-link" href={whatsappURL(booking.customer_phone)} target="_blank" rel="noopener noreferrer" aria-label="Müşterinin WhatsApp sohbetini aç"><span aria-hidden="true">💬</span><span>WhatsApp&apos;tan yaz: {booking.customer_phone}</span></a></div><div className="whatsapp-panel">
        <div className="whatsapp-panel-head"><span className="whatsapp-panel-title"><span aria-hidden="true">💬</span> WhatsApp mesajları</span><span className="whatsapp-panel-lang-chip">{languageChip(resolveLanguage())}</span></div>
        <label className="whatsapp-lang-field"><span className="whatsapp-lang-label">Mesaj dili</span><select className="input whatsapp-lang-select" value={messageLang} onChange={e => { setMessageLang(e.target.value); setPreview(null) }}><option value="">Otomatik · {languageChip(booking.language || languageFromPhone(booking.customer_phone))}</option>{MESSAGE_LANGUAGES.map(([value, label]) => <option key={value} value={value}>{LANGUAGE_FLAGS[value] ?? '🌐'} {label}</option>)}</select></label>
        <p className="whatsapp-lang-hint">{messageLang ? `Bu ekranda gönderilecek mesajlar ${languageName(messageLang)} dilinde hazırlanır.` : `Rezervasyonun kayıtlı dili kullanılır; kayıt yoksa telefon ülke kodundan bulunur (şu an ${languageName(resolveLanguage())}).`}</p>
        <div className="whatsapp-template-actions">{templateCards.map(card => <div className={`whatsapp-template-card${preview?.kind === card.kind ? ' previewing' : ''}`} key={card.kind}>
          <button className="whatsapp-template-btn" type="button" disabled={Boolean(templateState.loading)} onClick={() => void openTemplate(card.kind)}><span className="whatsapp-template-icon" aria-hidden="true">{card.icon}</span><span className="whatsapp-template-copy"><strong>{card.title}</strong><small>{templateState.loading === card.kind ? 'Güncel veriler kontrol ediliyor…' : card.hint}</small></span><span className="whatsapp-template-go" aria-hidden="true">{templateState.loading === card.kind ? '…' : '↗'}</span></button>
          <button className="whatsapp-preview-btn" type="button" aria-pressed={preview?.kind === card.kind} aria-label={`${card.title} mesajını önizle`} title="Önizle" onClick={() => showPreview(card.kind)}>👁</button>
        </div>)}</div>
        {preview && <div className="whatsapp-preview"><div className="whatsapp-preview-head"><span>Önizleme · {languageChip(resolveLanguage())}</span><button type="button" className="whatsapp-preview-close" aria-label="Önizlemeyi kapat" onClick={() => setPreview(null)}>✕</button></div><pre className="whatsapp-preview-body">{preview.text}</pre><div className="whatsapp-preview-actions"><button type="button" className="whatsapp-preview-action" onClick={() => void copyPreview()}>📋 Kopyala</button><button type="button" className="whatsapp-preview-action primary" disabled={Boolean(templateState.loading)} onClick={() => void openTemplate(preview.kind)}>💬 WhatsApp&apos;ta aç</button></div><p className="whatsapp-preview-note">Gönderirken transfer ve adres bilgileri veritabanından yeniden okunur.</p></div>}
        <div className="inline-success" role="status">{templateState.success}</div><div className="inline-error" role="alert">{templateState.error}</div>
      </div>
        <div className="driver-notify-section"><div className="section-label" style={{ marginTop: 12 }}>Şoför Bildirimi</div><a className="whatsapp-template-btn driver-notify-btn" href={driverWhatsappURL(buildDriverTransferMessage(booking))} target="_blank" rel="noopener noreferrer">🚗 Şoföre Bildir (WhatsApp)</a></div>
        <div className="detail-grid" style={{ marginTop: 8 }}><InlineEditor booking={booking} column="customer_email" label="✉️ E-posta" display={booking.customer_email || '—'} maxLength={120} inputType="email" validate={raw => { const email = raw.trim().toLowerCase(); return email && (email.length > 120 || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) ? { ok: false, error: 'Geçerli bir e-posta girin.' } : { ok: true, value: email } }} onSaved={genericSaved} /></div>
      </div>

      <div className="section"><div className="section-label">Detaylar</div><div className="detail-grid"><div><div className="detail-key">Araç</div><div className="detail-val">{booking.vehicle_type === 'vclass' ? 'V-Class' : 'Vito'}</div></div><div><div className="detail-key">Yolcu</div><div className="detail-val">{booking.guests} kişi</div></div><div><div className="detail-key">Bagaj</div><div className="detail-val">{booking.luggage_count > 0 ? `🧳 ${booking.luggage_count}` : '—'}</div></div><div><div className="detail-key">Çocuk koltuğu</div><div className="detail-val">{booking.child_seat_count > 0 ? `👶 ${booking.child_seat_count}${booking.child_ages?.length > 0 ? ` (${booking.child_ages.map((a, i) => `${i + 1}: ${a === 0 ? '<1' : a + 'y'}`).join(', ')})` : ''}` : '—'}</div></div><div><div className="detail-key">{roundTrip ? `Maliyet modeli · ${isReturn ? 'dönüş' : 'gidiş'}` : 'Maliyet modeli'}</div><div className="detail-val">{legCost.costMode === 'sold_transfer' && legCost.costIsValid ? `${costModeLabel} · ₺${fmtPrice(legCost.legSupplierCostTry)}` : costModeLabel}</div></div>
        <InlineEditor booking={booking} column="hotel_name" label="Otel" display={booking.hotel_name || '—'} maxLength={120} validate={raw => { const value = raw.trim().replace(/\s+/g, ' '); const letters = value.match(/\p{L}/gu)?.length ?? 0; return value.length < 2 || value.length > 120 || letters < 2 ? { ok: false, error: 'Geçerli bir otel adı girin.' } : { ok: true, value } }} onSaved={genericSaved} />
        <InlineEditor booking={booking} column="pickup_address" label="Alış adresi" display={booking.pickup_address ? `📍 ${booking.pickup_address}` : '—'} maxLength={160} validate={raw => { const value = raw.trim().replace(/\s+/g, ' '); return value && (value.length < 6 || value.length > 160) ? { ok: false, error: 'Adres 6-160 karakter olmalı.' } : { ok: true, value: value || null } }} onSaved={genericSaved} />
        {!dailyChauffeur && <InlineEditor booking={booking} column="dropoff_address" label="Varış adresi" display={booking.dropoff_address ? `📍 ${booking.dropoff_address}` : '—'} maxLength={160} validate={raw => { const value = raw.trim().replace(/\s+/g, ' '); return value && (value.length < 6 || value.length > 160) ? { ok: false, error: 'Adres 6-160 karakter olmalı.' } : { ok: true, value: value || null } }} onSaved={genericSaved} />}
        <InlineEditor booking={booking} column="driver_name" label="Şoför" display={booking.driver_name || '—'} maxLength={60} validate={raw => normalizeOptional(raw, 60, 'Şoför adı')} onSaved={genericSaved} />
        <InlineEditor booking={booking} column="vehicle_plate" label="Plaka" display={booking.vehicle_plate || '—'} maxLength={15} validate={raw => normalizeOptional(raw, 15, 'Plaka')} onSaved={genericSaved} />
      </div></div>

      <div className="section"><div className="section-label">Ödeme</div><div className={`detail-payment-row${roundTrip && isReturn ? ' detail-payment-settled' : ''}`}><span className="detail-payment-context"><strong>{paymentMethod}</strong>{dailyChauffeur ? <small>Günlük €{fmtPrice(Number(booking.daily_rate_eur) || 150)} · yakıt hariç</small> : roundTrip && <small>{isReturn ? 'Dönüş ücreti' : 'Gidiş ücreti'}</small>}</span><div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}><span className="detail-payment-price">€{fmtPrice(legPrice)}</span>{dailyChauffeur && <small className="daily-total-label">Toplam €{fmtPrice(booking.price_eur)}</small>}{!(roundTrip && isReturn) && <PriceEditor booking={booking} onSaved={genericSaved} />}</div></div></div>
      <div className="section"><div className="section-label">Notlar</div>{booking.notes && <div className="note-pinned">📌 {booking.notes}</div>}<div>{sortedNotes.length ? sortedNotes.map(item => <div className="note-item" key={item.id}>{item.note}</div>) : <div className="notes-empty">Henüz not yok</div>}</div><div className="note-input-row"><input className="input" type="text" placeholder="Not ekle…" value={note} onChange={e => setNote(e.target.value)} onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); void addNote() } }} /><button className="btn" type="button" disabled={noteSaving} style={{ width: 'auto', padding: '8px 14px', fontSize: 13 }} onClick={() => void addNote()}>Ekle</button></div><div className="inline-error">{noteError}</div></div>
      <div className="section"><div className="section-label">Durum Güncelle</div><div className="status-buttons">{(STATUS_TRANSITIONS[displayStatus] ?? []).length ? STATUS_TRANSITIONS[displayStatus].map(next => <button className={`btn-outline ${STATUS_COLORS[next]}`} type="button" key={next} disabled={statusSaving} onClick={() => void updateStatus(next)}>{statusLabel(next, roundTrip)}</button>) : <div style={{ color: 'var(--text-muted)', fontSize: 13, gridColumn: '1/-1' }}>Bu transfer için başka durum seçeneği yok.</div>}</div><div className="inline-error">{statusError}</div></div>
      {booking.status === 'cancelled' && <div className="section"><div className="section-label">Kalıcı Silme</div><div style={{ color: 'var(--text-muted)', fontSize: 13, marginBottom: 8 }}>İptal edilen bu rezervasyonu kalıcı olarak silebilirsiniz. Bu işlem geri alınamaz; test rezervasyonlarını temizlemek için kullanabilirsiniz.</div><button className="btn-outline red" type="button" disabled={deleting} onClick={() => void deleteBooking()}>🗑 {deleting ? 'Siliniyor…' : 'Kalıcı olarak sil'}</button><div className="inline-error">{deleteError}</div></div>}
    </div>
  </>
}
