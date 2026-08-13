import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { AdminTabs, Topbar } from '../components/AdminChrome'
import { MonthCalendar } from '../components/MonthCalendar'
import { fmtLiveDate, fmtPrice, fmtSyncTime, fmtTime, ISTANBUL_TIME_ZONE, offsetISO, statusLabel, todayISO } from '../lib/format'
import { supabase } from '../lib/supabase'
import type { Booking, Navigate, TimelineCard } from '../types'
import { locationDisplay, navigationURLs, whatsappURL } from '../../turkish-formatters.js'
import { matchesBookingQuery } from '../../search-match.js'
import { countFutureReservations, expandRoundTrips, TODAY_CACHE_KEY } from './timeline-logic'

const AUTO_REFRESH_MS = 60_000
const OPERATIONAL_STATUSES = ['pending', 'paid', 'confirmed', 'in_transit']

function istanbulWallClock(value = new Date()) {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: ISTANBUL_TIME_ZONE, year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit', hourCycle: 'h23',
  }).formatToParts(value)
  const part = (type: Intl.DateTimeFormatPartTypes) => Number(parts.find(item => item.type === type)?.value)
  return Date.UTC(part('year'), part('month') - 1, part('day'), part('hour'), part('minute'))
}

function transferWallClock(date?: string | null, time?: string | null) {
  if (!date || !time) return null
  const [year, month, day] = date.split('-').map(Number)
  const [hour, minute] = time.slice(0, 5).split(':').map(Number)
  const timestamp = Date.UTC(year, month - 1, day, hour, minute)
  return Number.isFinite(timestamp) ? timestamp : null
}

function isCardPast(card: TimelineCard, today: string, now = istanbulWallClock()) {
  if (card._displayDate < today) return true
  if (card._displayDate > today || !card._displayTime) return false
  const cardAt = transferWallClock(card._displayDate, card._displayTime)
  return cardAt === null ? false : cardAt < now
}

function liveTiming(card: TimelineCard, now: Date) {
  if (!card._displayDate || !card._displayTime || card.status === 'completed') return { text: '', className: '' }
  if (card.status === 'in_transit') return { text: 'Devam ediyor', className: 'active' }
  const transferAt = transferWallClock(card._displayDate, card._displayTime)
  if (transferAt === null) return { text: '', className: '' }
  const differenceMinutes = Math.round((transferAt - istanbulWallClock(now)) / 60_000)
  if (differenceMinutes < -1) return { text: `${Math.abs(differenceMinutes)} dk geçti`, className: 'late' }
  if (differenceMinutes <= 5) return { text: 'Şimdi', className: 'now' }
  if (differenceMinutes <= 60) return { text: `${differenceMinutes} dk kaldı`, className: 'soon' }
  return { text: '', className: '' }
}

function flightLandingAlert(card: TimelineCard, now: Date) {
  if (card.pickup_location !== 'airport' || !card.flight_arrival_time || !['pending', 'paid', 'confirmed'].includes(card.status)) return null
  const arrivalAt = transferWallClock(card._displayDate, card.flight_arrival_time)
  if (arrivalAt === null) return null
  const elapsedMinutes = Math.floor((istanbulWallClock(now) - arrivalAt) / 60_000)
  if (elapsedMinutes < 0) return null
  const elapsedHours = Math.floor(elapsedMinutes / 60)
  const remainingMinutes = elapsedMinutes % 60
  const elapsedText = elapsedMinutes < 1 ? 'şimdi' : elapsedMinutes < 60 ? `${elapsedMinutes} dk geçti`
    : remainingMinutes ? `${elapsedHours} sa ${remainingMinutes} dk geçti` : `${elapsedHours} sa geçti`
  return `Planlanan varış ${fmtTime(card.flight_arrival_time)} · ${elapsedText}`
}

function hasUsefulHotel(value: unknown) {
  const hotel = String(value ?? '').trim().toLocaleLowerCase('tr-TR')
  return Boolean(hotel && hotel !== 'belirtilmedi')
}

function warningsFor(card: TimelineCard) {
  const warnings: Array<{ kind: string; text: string }> = []
  const missing: string[] = []
  if (!card._displayTime) missing.push('saat')
  const hasHotel = hasUsefulHotel(card.hotel_name)
  const pickupAddress = String(card.pickup_address ?? '').trim()
  const dropoffAddress = String(card.dropoff_address ?? '').trim()
  if (card.pickup_location === 'private_address' && !pickupAddress) missing.push('alış adresi')
  else if (card.pickup_location !== 'airport' && !pickupAddress && !hasHotel) missing.push('alış adresi/otel')
  if (card.dropoff_location === 'private_address' && !dropoffAddress) missing.push('varış adresi')
  else if (card.dropoff_location !== 'airport' && !dropoffAddress && !hasHotel) missing.push('varış adresi/otel')
  if ((card.pickup_location === 'airport' || card.dropoff_location === 'airport') && !card.flight_number && (card.trip_type !== 'daily_chauffeur' || card._hireDayNumber === 1)) missing.push('uçuş no')
  if (missing.length) warnings.push({ kind: 'missing', text: `Eksik bilgi: ${missing.join(', ')}` })
  const childSeats = Number(card.child_seat_count) || 0
  if (childSeats > 0) warnings.push({ kind: 'prep', text: `${childSeats} çocuk koltuğu hazırla` })
  const luggage = Number(card.luggage_count) || 0
  const guests = Number(card.guests) || 0
  if (luggage >= 5 || luggage > guests) warnings.push({ kind: 'prep', text: `Fazla bagaj: ${luggage} adet` })
  const notes: string[] = []
  const bookingNote = String(card.notes ?? '').trim()
  if (bookingNote) notes.push(bookingNote)
  const latest = [...(card.booking_notes ?? [])].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())[0]?.note?.trim()
  if (latest && !notes.includes(latest)) notes.push(latest)
  notes.slice(0, 2).forEach(note => warnings.push({ kind: 'note', text: note }))
  return warnings
}

function turkishDayLabel(isoDate: string) {
  const date = new Date(`${isoDate}T12:00:00Z`)
  const label = new Intl.DateTimeFormat('tr-TR', {
    timeZone: ISTANBUL_TIME_ZONE, weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
  }).format(date)
  return label.charAt(0).toLocaleUpperCase('tr-TR') + label.slice(1)
}

function PaymentInfo({ card }: { card: TimelineCard }) {
  const paymentMethod = card.payment_method === 'cash' ? 'Nakit' : 'Kart'
  const price = Number(card.price_eur) || 0
  if (card.trip_type === 'daily_chauffeur') return <div className="card-info-item full payment-info"><span className="card-info-label">Günlük / toplam</span><div className="card-info-value"><strong>€{fmtPrice(Number(card.daily_rate_eur) || 150)}</strong> / gün · toplam €{fmtPrice(price)}<small>{paymentMethod}</small></div></div>
  if (card.trip_type !== 'round_trip') return <div className="card-info-item full payment-info"><span className="card-info-label">Ödeme</span><div className="card-info-value">{paymentMethod} · <strong>€{fmtPrice(price)}</strong></div></div>
  const half = price / 2
  if (card._isReturn) return <div className="card-info-item full payment-info payment-info-settled"><span className="card-info-label">Dönüş ücreti</span><div className="card-info-value"><strong>€{fmtPrice(half)}</strong></div></div>
  return <div className="card-info-item full payment-info payment-info-collect"><span className="card-info-label">Gidiş ücreti</span><div className="card-info-value"><strong>€{fmtPrice(half)}</strong><small>{paymentMethod}</small></div></div>
}

function BookingCard({ card, now, isPast, navigate, confirmPast, confirming, confirmFailed }: {
  card: TimelineCard; now: Date; isPast: boolean; navigate: Navigate
  confirmPast: (ref: string) => Promise<void>; confirming: string | null; confirmFailed: string | null
}) {
  const isDailyChauffeur = card.trip_type === 'daily_chauffeur'
  const pickup = locationDisplay(card.pickup_location, card.pickup_address)
  const dropoff = isDailyChauffeur ? 'Esnek güzergâh' : locationDisplay(card.dropoff_location, card.dropoff_address)
  const navigation = !isDailyChauffeur ? navigationURLs({
    originValue: card.pickup_location, originAddress: card.pickup_address,
    destinationValue: card.dropoff_location, destinationAddress: card.dropoff_address,
    hotelName: card.hotel_name,
  }) : null
  const warnings = warningsFor(card)
  const timing = liveTiming(card, now)
  const flightAlert = isPast ? null : flightLandingAlert(card, now)
  const showSeparateFlightArrival = card.flight_arrival_time && card.flight_arrival_time !== card._displayTime
  const open = () => {
    const params = new URLSearchParams()
    if (card._isReturn) params.set('leg', 'return')
    if (isPast) params.set('from', 'past')
    const query = params.toString()
    navigate(`#detail/${encodeURIComponent(card.booking_ref)}${query ? `?${query}` : ''}`)
  }
  const gotoReturn = () => {
    const element = document.querySelector<HTMLElement>(`.card[data-ref="${CSS.escape(card.booking_ref)}"][data-return="true"]`)
    let details = element?.closest('details')
    while (details) {
      details.open = true
      details = details.parentElement?.closest('details') ?? null
    }
    element?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }

  return <div className={`card status-${card.status}${flightAlert ? ' flight-arrived' : ''}`} data-ref={card.booking_ref} data-return={String(card._isReturn)} onClick={open}>
    {card._needsReturnContact && <div className="return-contact-alert" role="status" onClick={event => event.stopPropagation()}>
      <span className="return-contact-icon" aria-hidden="true">☎</span>
      <span className="return-contact-copy"><strong>Gidiş seyahati için iletişime geç</strong><small>Geliş tamamlandı · Planlanan dönüş {card._displayDate} {fmtTime(card._displayTime)}</small></span>
      <a href={whatsappURL(card.customer_phone)} target="_blank" rel="noopener noreferrer">WhatsApp</a>
    </div>}
    {flightAlert && <div className="flight-landed-alert" role="status"><span className="flight-landed-icon" aria-hidden="true">✈</span><span><strong>Uçak iniş saati geldi</strong><small>{flightAlert}</small></span></div>}
    <div className="card-header">
      <div className="card-time-block"><span className="card-time-label">{isDailyChauffeur ? 'Hizmet başlangıcı' : 'Transfer saati'}</span><div className="card-time">{fmtTime(card._displayTime)}</div><div className={`card-live-time${timing.className ? ` ${timing.className}` : ''}`}>{timing.text}</div></div>
      <div className="card-badges"><span className={`badge badge-${card.status}`}>{statusLabel(card.status, card.trip_type === 'round_trip')}</span>{isDailyChauffeur && <span className="badge badge-daily">GÜNLÜK KİRALAMA · {card._hireDayNumber}/{card._hireDayCount}</span>}{(card.trip_type === 'round_trip' || card.manual_return_of_ref) && <span className={`badge ${(card._isReturn || card.manual_return_of_ref) ? 'badge-return' : 'badge-outbound'}`}>{(card._isReturn || card.manual_return_of_ref) ? 'DÖNÜŞ' : 'GİDİŞ'}</span>}</div>
    </div>
    <div className="card-route" aria-label={`${pickup} konumundan ${dropoff} konumuna`}>
      <div className="route-point route-pickup"><span className="route-marker" aria-hidden="true" /><div><span className="route-label">Alış</span><strong>{pickup}</strong></div></div>
      <div className="route-point route-dropoff"><span className="route-marker" aria-hidden="true" /><div><span className="route-label">{isDailyChauffeur ? 'Hizmet' : 'Varış'}</span><strong>{dropoff}</strong></div></div>
    </div>
    {warnings.length > 0 && <div className="card-warnings">{warnings.map((warning, index) => <div className={`card-warning card-warning-${warning.kind}`} key={`${warning.kind}-${index}`}><span aria-hidden="true">{warning.kind === 'missing' ? '⚠️' : warning.kind === 'note' ? '📌' : '❗'}</span><span>{warning.text}</span></div>)}</div>}
    <div className="card-info-grid">
      <div className="card-info-item full"><span className="card-info-label">Müşteri</span><div className="card-info-value customer-value"><strong>{card.customer_name}</strong><a href={`tel:${card.customer_phone}`} onClick={event => event.stopPropagation()}>{card.customer_phone}</a></div></div>
      {card.flight_number && <div className="card-info-item"><span className="card-info-label">Uçuş</span><div className="card-info-value">✈ {card.flight_number}{showSeparateFlightArrival ? ` · ${fmtTime(card.flight_arrival_time)}` : ''}</div></div>}
      {hasUsefulHotel(card.hotel_name) && <div className={`card-info-item${card.flight_number ? '' : ' full'}`}><span className="card-info-label">Otel / Konaklama</span><div className="card-info-value">{card.hotel_name}</div></div>}
      <div className="card-info-item"><span className="card-info-label">Yolcu & Araç</span><div className="card-info-value">{card.guests} kişi · {card.vehicle_type === 'vclass' ? 'V-Class' : 'Vito'}</div></div>
      <div className="card-info-item"><span className="card-info-label">Bagaj & Koltuk</span><div className="card-info-value">{Number(card.luggage_count) || 0} bagaj · {Number(card.child_seat_count) ? `${card.child_seat_count} koltuk` : 'Koltuk yok'}</div></div>
      {isDailyChauffeur && <div className="card-info-item full"><span className="card-info-label">Şoför & Plaka</span><div className="card-info-value">{card.driver_name || 'Şoför atanmadı'} · {card.vehicle_plate || 'Plaka yok'}</div></div>}
      <PaymentInfo card={card} />
      {isDailyChauffeur && <div className="card-info-item full daily-fuel-info"><span className="card-info-label">Yakıt koşulu</span><div className="card-info-value">⛽ Yakıt hariç · müşteri kullanıma göre ayrıca öder</div></div>}
      {card.pickup_address && <div className="card-info-item full address-info"><span className="card-info-label">Alış adresi</span><div className="card-info-value">{card.pickup_address}</div></div>}
      {card.dropoff_address && <div className="card-info-item full address-info"><span className="card-info-label">Varış adresi</span><div className="card-info-value">{card.dropoff_address}</div></div>}
    </div>
    {navigation && <div className="card-navigation" aria-label="Google Haritalar ile transfer rotası için yol tarifi" onClick={event => event.stopPropagation()}><a href={navigation.google} target="_blank" rel="noopener noreferrer"><span aria-hidden="true">↗</span> Adrese yol tarifi al</a></div>}
    <div className="card-footer">
      <span className="card-reference">{card.booking_ref}</span>
      {!card._isReturn && card.trip_type === 'round_trip' && card.return_date && <button className="card-goto-return-button" type="button" onClick={event => { event.stopPropagation(); gotoReturn() }}>Dönüşü Gör ↓</button>}
      <div className={`card-footer-actions${isPast && card.status === 'pending' ? ' has-confirm' : ''}`}>
        {isPast && card.status === 'pending' && <button className={`card-confirm-button${confirmFailed === card.booking_ref ? ' has-error' : ''}`} type="button" disabled={confirming === card.booking_ref} onClick={event => { event.stopPropagation(); void confirmPast(card.booking_ref) }}><span aria-hidden="true">{confirming === card.booking_ref ? '…' : confirmFailed === card.booking_ref ? '↻' : '✓'}</span> {confirming === card.booking_ref ? 'Onaylanıyor' : confirmFailed === card.booking_ref ? 'Tekrar dene' : 'Onayla'}</button>}
        <button className="card-detail-button" type="button" onClick={event => { event.stopPropagation(); open() }}>Detayları aç <span aria-hidden="true">›</span></button>
      </div>
    </div>
  </div>
}

interface CachedTimeline { date: string; savedAt: string; futureReservationCount: number | null; bookings: Booking[] }

function readCache(today: string): CachedTimeline | null {
  try {
    const cached = JSON.parse(localStorage.getItem(TODAY_CACHE_KEY) || 'null') as CachedTimeline | null
    return cached?.date === today && Array.isArray(cached.bookings) ? cached : null
  } catch { return null }
}

function cacheToday(bookings: Booking[], today: string, futureReservationCount: number) {
  try {
    localStorage.setItem(TODAY_CACHE_KEY, JSON.stringify({
      date: today, savedAt: new Date().toISOString(), futureReservationCount,
      bookings: bookings.filter(booking => booking.pickup_date === today || booking.return_date === today || (booking.trip_type === 'daily_chauffeur' && booking.pickup_date <= today && Boolean(booking.service_end_date && booking.service_end_date >= today))),
    }))
  } catch { /* storage is optional */ }
}

export default function TimelinePage({ selectedTab, navigate }: { selectedTab: 'future' | 'past'; navigate: Navigate }) {
  const today = useMemo(todayISO, [])
  const tomorrow = useMemo(() => offsetISO(1), [])
  const isPast = selectedTab === 'past'
  const [bookings, setBookings] = useState<Booking[] | null>(null)
  const [search, setSearch] = useState('')
  const [now, setNow] = useState(new Date())
  const [syncStatus, setSyncStatus] = useState('Yükleniyor…')
  const [offlineMessage, setOfflineMessage] = useState('')
  const [refreshing, setRefreshing] = useState(false)
  const [cachedOnly, setCachedOnly] = useState(false)
  const [futureCount, setFutureCount] = useState<number | null>(null)
  const [confirming, setConfirming] = useState<string | null>(null)
  const [confirmFailed, setConfirmFailed] = useState<string | null>(null)
  const [calendarMonth, setCalendarMonth] = useState(today.slice(0, 7))
  const [selectedCalendarDate, setSelectedCalendarDate] = useState<string | null>(null)
  const [collapsedDays, setCollapsedDays] = useState<Set<string>>(() => new Set())
  const refreshingRef = useRef(false)
  const bookingsRef = useRef<Booking[] | null>(null)
  const mounted = useRef(true)

  const showCache = useCallback(() => {
    if (isPast) return false
    const cached = readCache(today)
    if (!cached) return false
    bookingsRef.current = cached.bookings
    setBookings(cached.bookings); setCachedOnly(true); setFutureCount(cached.futureReservationCount)
    const cachedTime = fmtSyncTime(new Date(cached.savedAt))
    setSyncStatus(`Kayıt: ${cachedTime}`)
    setOfflineMessage(`Çevrimdışı · Bugünkü kayıtlar gösteriliyor · Son senkronizasyon ${cachedTime}`)
    return true
  }, [isPast, today])

  const refresh = useCallback(async () => {
    if (refreshingRef.current) return
    if (!navigator.onLine) {
      if (!bookingsRef.current && !showCache()) setOfflineMessage('İnternet bağlantısı yok ve bugüne ait kayıt bulunamadı.')
      else if (bookingsRef.current) setOfflineMessage('Çevrimdışı · Son görüntülenen kayıtlar gösteriliyor')
      setSyncStatus('Çevrimdışı')
      return
    }
    refreshingRef.current = true; setRefreshing(true); setSyncStatus('Yenileniyor…')
    let query = supabase.from('bookings').select('*, booking_notes(id, note, created_at), chauffeur_hire_days(*)').in('status', ['pending', 'paid', 'confirmed', 'in_transit', 'completed'])
    query = isPast ? query.lte('pickup_date', today) : query.or(`pickup_date.gte.${today},return_date.gte.${today},service_end_date.gte.${today}`)
    const { data, error } = await query.order('pickup_date').order('pickup_time', { nullsFirst: false })
    refreshingRef.current = false
    if (!mounted.current) return
    setRefreshing(false)
    if (error) {
      if (!bookingsRef.current) showCache()
      setSyncStatus('Bağlantı hatası'); setOfflineMessage('Bağlantı kurulamadı · Son görüntülenen kayıtlar korunuyor')
      return
    }
    const rows = (data ?? []) as Booking[]
    const nextFutureCount = isPast ? null : countFutureReservations(rows)
    bookingsRef.current = rows
    setBookings(rows); setCachedOnly(false); setFutureCount(nextFutureCount); setSyncStatus(`Son güncelleme: ${fmtSyncTime()}`); setOfflineMessage('')
    if (!isPast && nextFutureCount !== null) cacheToday(rows, today, nextFutureCount)
  }, [isPast, showCache, today])

  useEffect(() => {
    mounted.current = true
    void refresh()
    const clock = window.setInterval(() => setNow(new Date()), 30_000)
    const autoRefresh = window.setInterval(() => void refresh(), AUTO_REFRESH_MS)
    const offline = () => { setSyncStatus('Çevrimdışı'); setOfflineMessage('Çevrimdışı · Son görüntülenen kayıtlar korunuyor') }
    const online = () => void refresh()
    window.addEventListener('offline', offline); window.addEventListener('online', online)
    return () => {
      mounted.current = false
      window.clearInterval(clock); window.clearInterval(autoRefresh)
      window.removeEventListener('offline', offline); window.removeEventListener('online', online)
    }
  }, []) // route remounts when the selected tab changes

  const confirmPast = async (bookingRef: string) => {
    setConfirming(bookingRef); setConfirmFailed(null)
    const { count, error } = await supabase.from('bookings').update({ status: 'confirmed' }, { count: 'exact' }).eq('booking_ref', bookingRef).eq('status', 'pending')
    setConfirming(null)
    if (error || count === 0) { setConfirmFailed(bookingRef); return }
    await refresh()
  }

  const visibleCards = useMemo(() => {
    if (!bookings) return []
    const source = bookings.filter(booking => matchesBookingQuery(booking, search))
    return expandRoundTrips(source, selectedTab).filter(card => {
      if (cachedOnly) return card._displayDate === today
      return isPast ? isCardPast(card, today) : !isCardPast(card, today)
    })
  }, [bookings, cachedOnly, isPast, search, selectedTab, today])

  const allFutureCards = useMemo(() => bookings ? expandRoundTrips(bookings, selectedTab).filter(card => !isCardPast(card, today)) : [], [bookings, selectedTab, today])
  const groups = useMemo(() => {
    const map = isPast ? new Map<string, TimelineCard[]>() : new Map<string, TimelineCard[]>([['Bugün', []], ['Yarın', []]])
    for (const card of visibleCards) {
      const key = !isPast && card._displayDate === today ? 'Bugün' : !isPast && card._displayDate === tomorrow ? 'Yarın' : card._displayDate
      if (!map.has(key)) map.set(key, [])
      map.get(key)!.push(card)
    }
    return map
  }, [isPast, today, tomorrow, visibleCards])
  const hasBookings = [...groups.values()].some(group => group.length)
  const calendarCounts = useMemo(() => {
    const counts = new Map<string, number>()
    for (const card of visibleCards) counts.set(card._displayDate, (counts.get(card._displayDate) ?? 0) + 1)
    return counts
  }, [visibleCards])

  const selectCalendarDate = (date: string) => {
    setSelectedCalendarDate(date)
    setCollapsedDays(previous => {
      if (!previous.has(date)) return previous
      const next = new Set(previous)
      next.delete(date)
      return next
    })
    requestAnimationFrame(() => {
      const day = document.getElementById(`timeline-day-${date}`)
      if (day instanceof HTMLDetailsElement) day.open = true
      day?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
  }

  return <>
    <Topbar navigate={navigate} showAdmin />
    <AdminTabs active={selectedTab} navigate={navigate} />
    {!isPast && <div className="stats">
      <div className="stat stat-bugün"><div className="stat-number">{bookings ? allFutureCards.filter(card => card._displayDate === today && OPERATIONAL_STATUSES.includes(card.status)).length : '…'}</div><div className="stat-label">Bugün</div></div>
      <div className="stat stat-yarın"><div className="stat-number">{bookings ? allFutureCards.filter(card => card._displayDate === tomorrow && OPERATIONAL_STATUSES.includes(card.status)).length : '…'}</div><div className="stat-label">Yarın</div></div>
      <div className="stat stat-gelecek-rez"><div className="stat-number">{futureCount ?? '…'}</div><div className="stat-label">Gelecek Rez.</div></div>
    </div>}
    <div className="timeline-statusbar"><div className="live-clock-wrap"><span>{fmtLiveDate(now)}</span><strong>{fmtSyncTime(now)}</strong></div><div className="sync-wrap"><span>{syncStatus}</span><button className="sync-button" type="button" aria-label="Transferleri yenile" disabled={refreshing} onClick={() => void refresh()}>↻</button></div></div>
    <div className="search-bar"><input className="search-input" type="search" placeholder="İsim, telefon, kod veya güzergah ara…" autoComplete="off" value={search} onChange={event => setSearch(event.target.value)} /></div>
    {offlineMessage && <div className="offline-banner">{offlineMessage}</div>}
    <div className="scroll-area timeline-scroll-area">
      <div className={`timeline-layout${bookings ? '' : ' is-loading'}`}>
        {bookings && <aside className="timeline-calendar-rail"><MonthCalendar month={calendarMonth} today={today} counts={calendarCounts} selectedDate={selectedCalendarDate} onMonthChange={month => { setCalendarMonth(month); setSelectedCalendarDate(null) }} onSelectDate={selectCalendarDate} /></aside>}
        <div className="timeline-groups">
          {!bookings ? <div className="empty"><div>Yükleniyor…</div></div> : !hasBookings ? <div className="empty"><div className="empty-icon">📅</div><div>{search.trim() ? `"${search.trim()}" için sonuç bulunamadı` : cachedOnly ? 'Önbellekte bugünkü transfer yok' : isPast ? 'Geçmiş transfer yok' : 'Gelecek transfer yok'}</div></div> :
            [...groups.entries()].map(([key, group]) => {
              if (!group.length) return null
              const label = key === 'Bugün' ? `Bugün · ${turkishDayLabel(today)}` : key === 'Yarın' ? `Yarın · ${turkishDayLabel(tomorrow)}` : turkishDayLabel(key)
              const groupDate = key === 'Bugün' ? today : key === 'Yarın' ? tomorrow : key
              const collapseCompleted = !isPast && (key === 'Bugün' || key === today)
              const completed = collapseCompleted ? group.filter(card => card.status === 'completed') : []
              const active = collapseCompleted ? group.filter(card => card.status !== 'completed') : group
              const renderCard = (card: TimelineCard) => <BookingCard key={`${card.booking_ref}-${card._isReturn ? 'return' : 'outbound'}`} card={card} now={now} isPast={isPast} navigate={navigate} confirmPast={confirmPast} confirming={confirming} confirmFailed={confirmFailed} />
              return <details className="day-group" id={`timeline-day-${groupDate}`} key={key} open={!collapsedDays.has(groupDate)} onToggle={event => {
                const isOpen = event.currentTarget.open
                setCollapsedDays(previous => {
                  const isCollapsed = previous.has(groupDate)
                  if (isOpen === !isCollapsed) return previous
                  const next = new Set(previous)
                  if (isOpen) next.delete(groupDate)
                  else next.add(groupDate)
                  return next
                })
              }}>
                <summary className="day-summary"><span className="day-label"><span aria-hidden="true">📅</span> {label}</span><span className="day-count">{group.length} seyahat</span><span className="day-chevron" aria-hidden="true">›</span></summary>
                <div className="day-content">{active.map(renderCard)}{completed.length > 0 && <details className="completed-group"><summary>Tamamlananlar ({completed.length})</summary><div className="completed-list">{completed.map(renderCard)}</div></details>}</div>
              </details>
            })}
        </div>
      </div>
    </div>
  </>
}
