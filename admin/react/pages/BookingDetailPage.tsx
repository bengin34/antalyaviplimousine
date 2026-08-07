import { useEffect, useMemo, useRef, useState, type FormEvent, type ReactNode } from 'react'
import { Topbar } from '../components/AdminChrome'
import { fmtDetailDate, fmtPrice, fmtTime, statusLabel, transferStartTime } from '../lib/format'
import { queueBookingPrefill } from '../lib/prefill'
import { supabase } from '../lib/supabase'
import type { Booking, BookingStatus, Navigate } from '../types'
import { isFutureIstanbulLeg, locationDisplay, navigationURLs, whatsappURL } from '../../turkish-formatters.js'
import { buildConfirmMessage, buildReminderMessage } from '../../whatsapp-templates.js'
import { LOCATION_OPTIONS, VEHICLE_CAPACITY, validateBookingForm, type BookingFormState } from './NewBookingPage'

const STATUS_TRANSITIONS: Record<string, BookingStatus[]> = {
  pending: ['confirmed', 'cancelled'], paid: ['in_transit'], confirmed: ['in_transit', 'cancelled'],
  in_transit: ['completed', 'cancelled'], completed: [], cancelled: [],
}
const STATUS_COLORS: Record<string, string> = { pending: 'orange', paid: 'green', confirmed: 'green', in_transit: 'blue', completed: '', cancelled: 'red' }

function transferFor(booking: Booking, isReturn: boolean) {
  if (isReturn && booking.trip_type === 'round_trip' && booking.return_date) {
    return {
      date: booking.return_date, time: booking.return_pickup_time,
      pickupLocation: booking.dropoff_location, dropoffLocation: booking.pickup_location,
      pickupAddress: booking.dropoff_address, dropoffAddress: booking.pickup_address,
      flightNumber: booking.return_flight_number, flightArrivalTime: null,
    }
  }
  return {
    date: booking.pickup_date,
    time: transferStartTime(booking.pickup_location, booking.pickup_time, booking.flight_arrival_time),
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
  return {
    name: booking.customer_name ?? '', phone: booking.customer_phone ?? '', email: booking.customer_email ?? '',
    hotel: booking.hotel_name ?? '', tripType: booking.trip_type ?? 'one_way', pickup: booking.pickup_location ?? 'airport',
    dropoff: booking.dropoff_location ?? 'belek', pickupAddress: booking.pickup_address ?? '',
    dropoffAddress: booking.dropoff_address ?? '', pickupDate: booking.pickup_date ?? '', pickupTime: fmtTime(booking.pickup_time) === '—' ? '' : fmtTime(booking.pickup_time),
    flightNumber: booking.flight_number ?? '', flightTime: fmtTime(booking.flight_arrival_time) === '—' ? '' : fmtTime(booking.flight_arrival_time),
    returnDate: booking.return_date ?? '', returnTime: fmtTime(booking.return_pickup_time) === '—' ? '' : fmtTime(booking.return_pickup_time),
    returnFlight: booking.return_flight_number ?? '', vehicle: booking.vehicle_type ?? 'vito', guests: String(booking.guests ?? 1),
    luggage: String(booking.luggage_count ?? 0), childSeats: String(booking.child_seat_count ?? 0),
    price: String(isRoundTrip ? (Number(booking.price_eur) || 0) / 2 : Number(booking.price_eur) || 0),
    payment: booking.payment_method ?? 'cash', status: booking.status, notes: booking.notes ?? '',
  }
}

function BookingEditor({ booking, onCancel, onSaved }: { booking: Booking; onCancel: () => void; onSaved: (booking: Booking) => void }) {
  const [form, setForm] = useState(() => createEditForm(booking))
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)
  const errorRef = useRef<HTMLDivElement>(null)
  const set = (name: keyof BookingFormState, value: string) => setForm(current => ({ ...current, [name]: value }))
  const options = LOCATION_OPTIONS.map(([value, label]) => <option key={value} value={value}>{label}</option>)
  const roundTrip = form.tripType === 'round_trip'

  const submit = async (event: FormEvent) => {
    event.preventDefault()
    const result = validateBookingForm(form)
    if (result.error || !result.payload) {
      setError(result.error); requestAnimationFrame(() => errorRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })); return
    }
    const { status: _status, ...payload } = result.payload
    setSaving(true); setError('')
    const { count, error: updateError } = await supabase.from('bookings').update(payload, { count: 'exact' }).eq('id', booking.id)
    setSaving(false)
    if (updateError || count === 0) return setError('Rezervasyon güncellenemedi, tekrar deneyin.')
    onSaved({ ...booking, ...payload } as Booking)
  }

  return <form noValidate onSubmit={submit}>
    <div className="booking-edit-group"><div className="section-label">Müşteri</div>
      <Field label="Ad Soyad *"><input className="input" type="text" maxLength={80} autoComplete="off" value={form.name} onChange={e => set('name', e.target.value)} required /></Field>
      <div className="form-row"><Field label="Telefon *"><input className="input" type="tel" autoComplete="off" value={form.phone} onChange={e => set('phone', e.target.value)} required /></Field><Field label="E-posta"><input className="input" type="email" maxLength={120} autoComplete="off" value={form.email} onChange={e => set('email', e.target.value)} /></Field></div>
      <Field label="Otel / Konaklama"><input className="input" type="text" maxLength={120} autoComplete="off" value={form.hotel} onChange={e => set('hotel', e.target.value)} /></Field>
    </div>
    <div className="booking-edit-group"><div className="section-label">Transfer</div>
      <Field label="Sefer türü"><select className="input" value={form.tripType} onChange={e => set('tripType', e.target.value)}><option value="one_way">Tek yön</option><option value="round_trip">Gidiş-dönüş</option></select></Field>
      <div className="form-row"><Field label="Alış *"><select className="input" value={form.pickup} onChange={e => set('pickup', e.target.value)}>{options}</select></Field><Field label="Varış *"><select className="input" value={form.dropoff} onChange={e => set('dropoff', e.target.value)}>{options}</select></Field></div>
      {(form.pickup === 'private_address' || form.dropoff === 'private_address') && <div className="form-row">{form.pickup === 'private_address' && <Field label="Alış özel adresi *"><input className="input" maxLength={160} autoComplete="street-address" value={form.pickupAddress} onChange={e => set('pickupAddress', e.target.value)} required /></Field>}{form.dropoff === 'private_address' && <Field label="Varış özel adresi *"><input className="input" maxLength={160} autoComplete="street-address" value={form.dropoffAddress} onChange={e => set('dropoffAddress', e.target.value)} required /></Field>}</div>}
      <div className="form-row"><Field label="Tarih *"><input className="input" type="date" value={form.pickupDate} onChange={e => set('pickupDate', e.target.value)} required /></Field><Field label="Saat"><input className="input" type="time" value={form.pickupTime} onChange={e => set('pickupTime', e.target.value)} /></Field></div>
      <div className="form-row"><Field label="Uçuş no"><input className="input" type="text" maxLength={12} autoComplete="off" value={form.flightNumber} onChange={e => set('flightNumber', e.target.value)} /></Field><Field label="Uçuş varış"><input className="input" type="time" value={form.flightTime} onChange={e => set('flightTime', e.target.value)} /></Field></div>
    </div>
    {roundTrip && <div className="booking-edit-group"><div className="section-label">Dönüş</div><div className="form-row"><Field label="Dönüş tarihi *"><input className="input" type="date" value={form.returnDate} onChange={e => set('returnDate', e.target.value)} required /></Field><Field label="Dönüş saati *"><input className="input" type="time" value={form.returnTime} onChange={e => set('returnTime', e.target.value)} required /></Field></div><Field label="Dönüş uçuş no"><input className="input" type="text" maxLength={12} autoComplete="off" value={form.returnFlight} onChange={e => set('returnFlight', e.target.value)} /></Field></div>}
    <div className="booking-edit-group"><div className="section-label">Araç & Detaylar</div><div className="form-row"><Field label="Araç *"><select className="input" value={form.vehicle} onChange={e => set('vehicle', e.target.value)}><option value="vito">Vito</option><option value="vclass">V-Class</option></select></Field><Field label="Yolcu *"><input className="input" type="number" min={1} max={VEHICLE_CAPACITY[form.vehicle] ?? 8} step={1} inputMode="numeric" value={form.guests} onChange={e => set('guests', e.target.value)} required /></Field></div><div className="form-row"><Field label="Bagaj"><input className="input" type="number" min={0} max={12} step={1} inputMode="numeric" value={form.luggage} onChange={e => set('luggage', e.target.value)} /></Field><Field label="Çocuk koltuğu"><input className="input" type="number" min={0} max={4} step={1} inputMode="numeric" value={form.childSeats} onChange={e => set('childSeats', e.target.value)} /></Field></div></div>
    <div className="booking-edit-group"><div className="section-label">Ödeme & Not</div><div className="form-row"><Field label={roundTrip ? 'Sefer başına fiyat (€) *' : 'Fiyat (€) *'}><input className="input" type="number" min={0} max={999999.99} step={0.01} inputMode="decimal" value={form.price} onChange={e => set('price', e.target.value)} required /></Field><Field label="Ödeme"><select className="input" value={form.payment} onChange={e => set('payment', e.target.value)}><option value="cash">Nakit</option><option value="card">Kart</option></select></Field></div><Field label="Rezervasyon notu"><textarea className="input" rows={3} maxLength={500} value={form.notes} onChange={e => set('notes', e.target.value)} /></Field></div>
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
    if (updateError || count === 0) return setError(`${label} güncellenemedi, tekrar deneyin.`)
    setEditing(false); onSaved({ ...booking, [column]: result.value } as Booking, `${label} güncellendi.`)
  }
  return <div className="full"><div className="editable-heading"><div className="detail-key">{label}</div><button className="inline-edit-button" type="button" onClick={open}>Düzenle</button></div><div className="detail-val">{display}</div>{editing && <div className="inline-editor"><input ref={inputRef} className="input" type={inputType} maxLength={maxLength} aria-label={label} value={value} onChange={e => setValue(e.target.value)} /><div className="inline-editor-actions"><button className="btn inline-editor-button" type="button" disabled={saving} onClick={() => void save()}>Kaydet</button><button className="btn-outline inline-editor-button" type="button" onClick={() => { setEditing(false); setError('') }}>İptal</button></div><div className="inline-error">{error}</div></div>}</div>
}

function PriceEditor({ booking, onSaved }: { booking: Booking; onSaved: (booking: Booking, message: string) => void }) {
  const roundTrip = booking.trip_type === 'round_trip'
  const legPrice = roundTrip ? (Number(booking.price_eur) || 0) / 2 : Number(booking.price_eur) || 0
  const [editing, setEditing] = useState(false)
  const [value, setValue] = useState(String(legPrice))
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)
  const save = async () => {
    const nextLegPrice = Number(value.replace(',', '.'))
    if (!Number.isFinite(nextLegPrice) || nextLegPrice < 0 || nextLegPrice > 999999.99) return setError('Geçerli bir fiyat girin.')
    const total = roundTrip ? nextLegPrice * 2 : nextLegPrice
    setSaving(true); setError('')
    const { count, error: updateError } = await supabase.from('bookings').update({ price_eur: total }, { count: 'exact' }).eq('id', booking.id)
    setSaving(false)
    if (updateError || count === 0) return setError('Fiyat güncellenemedi, tekrar deneyin.')
    setEditing(false); onSaved({ ...booking, price_eur: total }, 'Fiyat güncellendi.')
  }
  return <><button className="btn-outline price-edit-btn" type="button" onClick={() => { setValue(String(legPrice)); setError(''); setEditing(true) }}>Düzenle</button>{editing && <div className="price-editor" style={{ gridColumn: '1 / -1' }}><div className="price-editor-row"><span style={{ color: 'var(--text-muted)' }}>€</span><input className="input price-input" type="number" min={0} step={0.01} inputMode="decimal" aria-label="Yeni fiyat" value={value} onChange={e => setValue(e.target.value)} autoFocus /><button className="btn price-action" type="button" disabled={saving} onClick={() => void save()}>Kaydet</button><button className="btn-outline price-action" type="button" onClick={() => setEditing(false)}>İptal</button></div><div className="inline-error">{error}</div></div>}</>
}

export default function BookingDetailPage({ bookingRef, isReturn, sourceTab, navigate }: { bookingRef: string; isReturn: boolean; sourceTab: 'future' | 'past'; navigate: Navigate }) {
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

  useEffect(() => {
    let active = true
    setLoading(true)
    supabase.from('bookings').select('*, booking_notes(id, note, created_at)').eq('booking_ref', bookingRef).limit(1).then(({ data, error }: any) => {
      if (!active) return
      setLoading(false)
      if (error || !data?.length) setNotFound(true)
      else setBooking(data[0] as Booking)
    })
    return () => { active = false }
  }, [bookingRef])

  const updateBooking = (next: Booking, message = '') => { setBooking(next); setSuccess(message) }

  if (loading) return <><Topbar navigate={navigate} title="Transfer Detayı" back={sourceTab === 'past' ? '#timeline?tab=past' : '#timeline'} /><div className="scroll-area"><div className="empty"><div>Yükleniyor…</div></div></div></>
  if (notFound || !booking) return <><Topbar navigate={navigate} title="Transfer Detayı" back={sourceTab === 'past' ? '#timeline?tab=past' : '#timeline'} /><div className="scroll-area"><div className="empty"><div>Rezervasyon bulunamadı</div></div></div></>

  const roundTrip = booking.trip_type === 'round_trip'
  const needsReturnContact = Boolean(isReturn && roundTrip && booking.status === 'completed' && isFutureIstanbulLeg(booking.return_date, booking.return_pickup_time))
  const displayStatus = (needsReturnContact ? 'confirmed' : booking.status) as BookingStatus
  const transfer = transferFor(booking, isReturn)
  const pickupDisplay = locationDisplay(transfer.pickupLocation, transfer.pickupAddress)
  const dropoffDisplay = locationDisplay(transfer.dropoffLocation, transfer.dropoffAddress)
  const navigation = navigationURLs({ originValue: transfer.pickupLocation, originAddress: transfer.pickupAddress, destinationValue: transfer.dropoffLocation, destinationAddress: transfer.dropoffAddress, hotelName: booking.hotel_name })
  const legPrice = roundTrip ? (Number(booking.price_eur) || 0) / 2 : Number(booking.price_eur) || 0
  const paymentMethod = booking.payment_method === 'cash' ? 'Nakit' : 'Kart'
  const sortedNotes = [...(booking.booking_notes ?? [])].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
  const showSeparateFlightArrival = transfer.flightArrivalTime && transfer.flightArrivalTime !== transfer.time

  const planTrip = (reverse: boolean) => {
    const hotel = String(booking.hotel_name ?? '').trim()
    const from = reverse ? transfer.dropoffLocation : transfer.pickupLocation
    const to = reverse ? transfer.pickupLocation : transfer.dropoffLocation
    const fromAddress = reverse ? transfer.dropoffAddress : transfer.pickupAddress
    const toAddress = reverse ? transfer.pickupAddress : transfer.dropoffAddress
    queueBookingPrefill({ sourceRef: booking.booking_ref, customerName: booking.customer_name, customerPhone: booking.customer_phone, hotelName: hotel.toLocaleLowerCase('tr-TR') === 'belirtilmedi' ? '' : hotel, vehicleType: booking.vehicle_type, guests: booking.guests, luggageCount: booking.luggage_count, childSeatCount: booking.child_seat_count, paymentMethod: booking.payment_method, pickupLocation: from, pickupAddress: fromAddress, dropoffLocation: to, dropoffAddress: toAddress, notes: reverse ? `Dönüş · Kaynak rezervasyon: ${booking.booking_ref}` : `Kaynak rezervasyon: ${booking.booking_ref}` })
    navigate('#new')
  }

  const openTemplate = async (kind: 'confirm' | 'reminder') => {
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
    const message = kind === 'confirm' ? buildConfirmMessage(latest, { leg: isReturn ? 'return' : 'outbound' }) : buildReminderMessage(latest, { leg: isReturn ? 'return' : 'outbound' })
    if (popup.closed) return setTemplateState({ loading: '', success: '', error: 'WhatsApp sekmesi kapatıldı.' })
    popup.location.replace(whatsappURL(latest.customer_phone, message))
    setTemplateState({ loading: '', success: 'Mesaj, veritabanındaki en güncel transfer ve adres bilgileriyle hazırlandı.', error: '' })
  }

  const updateStatus = async (next: BookingStatus) => {
    if (next === 'cancelled' && !window.confirm('Bu transferi iptal etmek istediğinize emin misiniz?')) return
    const previousStatus = booking.status
    setBooking({ ...booking, status: next })
    setStatusSaving(true); setStatusError('')
    const { count, error } = await supabase.from('bookings').update({ status: next }, { count: 'exact' }).eq('booking_ref', bookingRef)
    setStatusSaving(false)
    if (error || count === 0) {
      setBooking({ ...booking, status: previousStatus })
      setStatusError('Güncelleme başarısız, tekrar deneyin.')
    }
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

  const genericSaved = (next: Booking, message: string) => updateBooking(next, message)
  const normalizeOptional = (raw: string, max: number, name: string): ValidateResult => {
    const value = raw.trim().replace(/\s+/g, ' ')
    if (value && value.length > max) return { ok: false, error: `${name} en fazla ${max} karakter olmalı.` }
    return { ok: true, value: value || null }
  }

  return <><Topbar navigate={navigate} title="Transfer Detayı" back={sourceTab === 'past' ? '#timeline?tab=past' : '#timeline'} />
    <div className="scroll-area">
      <div className="section"><div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}><span style={{ color: 'var(--text-muted)', fontSize: 13 }}>{booking.booking_ref}</span><div className="card-badges"><span className={`badge badge-${displayStatus}`}>{statusLabel(displayStatus, roundTrip)}</span>{roundTrip && <span className={`badge ${isReturn ? 'badge-return' : 'badge-outbound'}`}>{isReturn ? 'DÖNÜŞ' : 'GİDİŞ'}</span>}</div></div></div>
      <div className="section quick-actions-section"><button className="btn-outline blue" type="button" onClick={() => planTrip(false)}>🆕 Bu yolcudan yeni seyahat planla</button><button className="btn-outline blue" type="button" onClick={() => planTrip(true)}>↩ Dönüş yolculuğu planla</button></div>
      {needsReturnContact && <div className="return-contact-alert detail-return-contact" role="status"><span className="return-contact-icon" aria-hidden="true">☎</span><span className="return-contact-copy"><strong>Gidiş seyahati için iletişime geç</strong><small>Geliş transferi tamamlandı.</small></span><a href={whatsappURL(booking.customer_phone)} target="_blank" rel="noopener noreferrer">WhatsApp</a></div>}
      <div className="section"><div className="editable-heading" style={{ marginBottom: 8 }}><div className="section-label" style={{ marginBottom: 0 }}>Transfer</div><button className="inline-edit-button" type="button" hidden={editing} onClick={() => { setSuccess(''); setEditing(true) }}>Tümünü düzenle</button></div><div style={{ fontSize: 17, fontWeight: 700, marginBottom: 4 }}>{fmtTime(transfer.time)} &nbsp;{pickupDisplay} → {dropoffDisplay}</div><div style={{ color: 'var(--text-muted)', fontSize: 13 }}>{fmtDetailDate(transfer.date)}{transfer.flightNumber ? ` · ✈️ ${transfer.flightNumber}${showSeparateFlightArrival ? ` varış ${fmtTime(transfer.flightArrivalTime)}` : ''}` : ''}</div>{transfer.pickupAddress && <div style={{ color: 'var(--text-muted)', fontSize: 13, marginTop: 6 }}>📍 Alış: {transfer.pickupAddress}</div>}{transfer.dropoffAddress && <div style={{ color: 'var(--text-muted)', fontSize: 13, marginTop: 3 }}>📍 Varış: {transfer.dropoffAddress}</div>}<div className="detail-navigation-label">Transfer rotası</div><div className="detail-navigation" aria-label="Google Haritalar ile transfer rotası için yol tarifi"><a href={navigation.google} target="_blank" rel="noopener noreferrer"><span aria-hidden="true">↗</span> Adrese yol tarifi al</a></div><div className="inline-success" role="status">{success}</div></div>
      {editing && <div className="section booking-edit-section"><BookingEditor booking={booking} onCancel={() => setEditing(false)} onSaved={next => { setEditing(false); updateBooking(next, 'Rezervasyon bilgileri güncellendi.') }} /></div>}

      <div className="section"><div className="section-label">Müşteri</div><div style={{ fontWeight: 600, marginBottom: 4 }}>{booking.customer_name}</div><div style={{ marginBottom: 4 }}><a className="whatsapp-link" href={whatsappURL(booking.customer_phone)} target="_blank" rel="noopener noreferrer" aria-label="Müşterinin WhatsApp sohbetini aç"><span aria-hidden="true">💬</span><span>WhatsApp&apos;tan yaz: {booking.customer_phone}</span></a></div><div className="whatsapp-template-actions"><button className="whatsapp-template-btn" type="button" disabled={Boolean(templateState.loading)} onClick={() => void openTemplate('confirm')}>💬 {templateState.loading === 'confirm' ? 'Güncel veriler kontrol ediliyor…' : `WhatsApp: ${roundTrip ? (isReturn ? 'Dönüş onayı' : 'Gidiş onayı') : 'Onay'} gönder`}</button><button className="whatsapp-template-btn" type="button" disabled={Boolean(templateState.loading)} onClick={() => void openTemplate('reminder')}>💬 {templateState.loading === 'reminder' ? 'Güncel veriler kontrol ediliyor…' : `WhatsApp: ${roundTrip ? (isReturn ? 'Dönüş hatırlatması' : 'Gidiş hatırlatması') : 'Hatırlatma'} gönder`}</button></div><div className="inline-success" role="status">{templateState.success}</div><div className="inline-error" role="alert">{templateState.error}</div>
        <div className="detail-grid" style={{ marginTop: 8 }}><InlineEditor booking={booking} column="customer_email" label="✉️ E-posta" display={booking.customer_email || '—'} maxLength={120} inputType="email" validate={raw => { const email = raw.trim().toLowerCase(); return email && (email.length > 120 || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) ? { ok: false, error: 'Geçerli bir e-posta girin.' } : { ok: true, value: email } }} onSaved={genericSaved} /></div>
      </div>

      <div className="section"><div className="section-label">Detaylar</div><div className="detail-grid"><div><div className="detail-key">Araç</div><div className="detail-val">{booking.vehicle_type === 'vclass' ? 'V-Class' : 'Vito'}</div></div><div><div className="detail-key">Yolcu</div><div className="detail-val">{booking.guests} kişi</div></div><div><div className="detail-key">Bagaj</div><div className="detail-val">{booking.luggage_count > 0 ? `🧳 ${booking.luggage_count}` : '—'}</div></div><div><div className="detail-key">Çocuk koltuğu</div><div className="detail-val">{booking.child_seat_count > 0 ? `👶 ${booking.child_seat_count}` : '—'}</div></div>
        <InlineEditor booking={booking} column="hotel_name" label="Otel" display={booking.hotel_name || '—'} maxLength={120} validate={raw => { const value = raw.trim().replace(/\s+/g, ' '); const letters = value.match(/\p{L}/gu)?.length ?? 0; return value.length < 2 || value.length > 120 || letters < 2 ? { ok: false, error: 'Geçerli bir otel adı girin.' } : { ok: true, value } }} onSaved={genericSaved} />
        <InlineEditor booking={booking} column="pickup_address" label="Alış adresi" display={booking.pickup_address ? `📍 ${booking.pickup_address}` : '—'} maxLength={160} validate={raw => { const value = raw.trim().replace(/\s+/g, ' '); return value && (value.length < 6 || value.length > 160) ? { ok: false, error: 'Adres 6-160 karakter olmalı.' } : { ok: true, value: value || null } }} onSaved={genericSaved} />
        <InlineEditor booking={booking} column="dropoff_address" label="Varış adresi" display={booking.dropoff_address ? `📍 ${booking.dropoff_address}` : '—'} maxLength={160} validate={raw => { const value = raw.trim().replace(/\s+/g, ' '); return value && (value.length < 6 || value.length > 160) ? { ok: false, error: 'Adres 6-160 karakter olmalı.' } : { ok: true, value: value || null } }} onSaved={genericSaved} />
        <InlineEditor booking={booking} column="driver_name" label="Şoför" display={booking.driver_name || '—'} maxLength={60} validate={raw => normalizeOptional(raw, 60, 'Şoför adı')} onSaved={genericSaved} />
        <InlineEditor booking={booking} column="vehicle_plate" label="Plaka" display={booking.vehicle_plate || '—'} maxLength={15} validate={raw => normalizeOptional(raw, 15, 'Plaka')} onSaved={genericSaved} />
      </div></div>

      <div className="section"><div className="section-label">Ödeme</div><div className={`detail-payment-row${roundTrip && isReturn ? ' detail-payment-settled' : ''}`}><span className="detail-payment-context"><strong>{paymentMethod}</strong>{roundTrip && <small>{isReturn ? 'Dönüş ücreti' : 'Gidiş ücreti'}</small>}</span><div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}><span className="detail-payment-price">€{fmtPrice(legPrice)}</span>{!(roundTrip && isReturn) && <PriceEditor booking={booking} onSaved={genericSaved} />}</div></div></div>
      <div className="section"><div className="section-label">Notlar</div>{booking.notes && <div className="note-pinned">📌 {booking.notes}</div>}<div>{sortedNotes.length ? sortedNotes.map(item => <div className="note-item" key={item.id}>{item.note}</div>) : <div className="notes-empty">Henüz not yok</div>}</div><div className="note-input-row"><input className="input" type="text" placeholder="Not ekle…" value={note} onChange={e => setNote(e.target.value)} onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); void addNote() } }} /><button className="btn" type="button" disabled={noteSaving} style={{ width: 'auto', padding: '8px 14px', fontSize: 13 }} onClick={() => void addNote()}>Ekle</button></div><div className="inline-error">{noteError}</div></div>
      <div className="section"><div className="section-label">Durum Güncelle</div><div className="status-buttons">{(STATUS_TRANSITIONS[displayStatus] ?? []).length ? STATUS_TRANSITIONS[displayStatus].map(next => <button className={`btn-outline ${STATUS_COLORS[next]}`} type="button" key={next} disabled={statusSaving} onClick={() => void updateStatus(next)}>{statusLabel(next, roundTrip)}</button>) : <div style={{ color: 'var(--text-muted)', fontSize: 13, gridColumn: '1/-1' }}>Bu transfer için başka durum seçeneği yok.</div>}</div><div className="inline-error">{statusError}</div></div>
    </div>
  </>
}
