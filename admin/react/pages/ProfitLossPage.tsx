import { useCallback, useEffect, useMemo, useState, type FormEvent, type ReactNode } from 'react'
import { AdminTabs, Topbar } from '../components/AdminChrome'
import { ProfitDistributionSection } from '../components/ProfitDistributionSection'
import {
  COST_MODE_LABELS,
  LegCostControls,
  legCostColumns,
  legCostMode,
  legLabelFor,
  legTargetId,
  toLegKey,
  type CostMode,
  type LegKey,
  type ProfitLegRef,
} from '../components/LegCostEditors'
import { berlinTodayISO, fmtDetailDate, fmtSyncTime, formatEuro, formatNumber, formatTry, monthLabel, monthRange, profitLocationLabel, todayISO } from '../lib/format'
import { fetchRatesForDates, fetchLatestEurTryRate } from '../lib/exchange-rates'
import {
  createProfitDistribution,
  fetchProfitDistributionLedger,
  profitDistributionErrorMessage,
  saveProfitShareSettings,
} from '../lib/profit-distributions'
import { supabase } from '../lib/supabase'
import { saveLegCostMode, saveLegDistance, saveLegSupplierCost } from '../lib/leg-cost-actions'
import type {
  Booking,
  CreateProfitDistributionInput,
  Navigate,
  ProfitDistribution,
  ProfitShareSettings,
  SaveProfitShareSettingsInput,
} from '../types'
import {
  buildProfitDistributionSnapshot,
  calculateProfitDistribution,
  calculateProfitLossMetrics,
  DEFAULT_EUR_TRY_RATE,
  DEFAULT_KM_COST_TRY,
  isProfitRelevantBooking,
} from '../../profit-loss-metrics.js'

const PAGE_SIZE = 1000
const FIRST_PROFIT_MONTH = '2026-07'

type SettingsMap = Map<string, any>

function isStaleDistributionWriteError(error: unknown) {
  const details = error && typeof error === 'object' ? error as { code?: unknown; message?: unknown } : {}
  const code = typeof details.code === 'string' ? details.code.toLowerCase() : ''
  const message = typeof details.message === 'string' ? details.message.toLowerCase() : ''
  return code === '23p01'
    || message.includes('stale or not contiguous')
    || message.includes('overlap')
}

// Supabase satır tiplerini çıkarabilsin diye tek bir düz metin: liste hem
// hesaplama alanlarını hem de listede gösterilen yolcu bilgilerini içerir.
const BOOKING_COLUMNS = 'id, booking_ref, customer_name, customer_phone, hotel_name, guests, luggage_count, child_seat_count, vehicle_type, pickup_location, pickup_address, dropoff_location, dropoff_address, pickup_date, pickup_time, flight_number, return_date, return_pickup_time, return_flight_number, service_end_date, trip_type, price_eur, daily_rate_eur, payment_method, service_cost_mode, sold_transfer_cost_try, return_service_cost_mode, return_sold_transfer_cost_try, airport_meet_fee_applies, status, created_at, manual_outbound_distance_km, manual_return_distance_km, manual_return_of_ref, chauffeur_hire_days(id, service_date, day_number, status, distance_km, fuel_amount_eur, fuel_paid)'

async function fetchAllBookings() {
  const bookings: Booking[] = []
  for (let from = 0; ; from += PAGE_SIZE) {
    const { data, error } = await supabase.from('bookings')
      .select(BOOKING_COLUMNS)
      .order('created_at', { ascending: true }).range(from, from + PAGE_SIZE - 1)
    if (error) throw error
    const rows = (data ?? []) as Booking[]
    // İptal edilen kayıtlar (panelden kalıcı silmeden önceki durum) kâr/zarar
    // ekranının hiçbir bölümüne girmemeli; sayfa listesi ise ham satır sayısıyla
    // ilerlemeli, yoksa sayfalama erken biter.
    bookings.push(...rows.filter(isProfitRelevantBooking))
    if (rows.length < PAGE_SIZE) return bookings
  }
}

async function fetchSettings() {
  const { data, error } = await supabase.from('profit_loss_settings')
    .select('period_month, km_cost_try, advertising_expense_try, eur_try_rate, updated_at').order('period_month')
  if (error) throw error
  return new Map((data ?? []).map((setting: any) => [setting.period_month.slice(0, 7), setting]))
}

function settingValues(setting: any = {}) {
  const kmCost = Number(setting.km_cost_try)
  const advertising = Number(setting.advertising_expense_try)
  const rate = Number(setting.eur_try_rate)
  return {
    kmCostTry: Number.isFinite(kmCost) && kmCost > 0 ? kmCost : DEFAULT_KM_COST_TRY,
    advertisingExpenseTry: Number.isFinite(advertising) && advertising >= 0 ? advertising : 0,
    eurTryRate: Number.isFinite(rate) && rate > 0 ? rate : DEFAULT_EUR_TRY_RATE,
  }
}

function SettingsForm({ period, settings, onSaved }: { period: string; settings: SettingsMap; onSaved: (month: string, value: any) => void }) {
  const setting = settings.get(period)
  const values = settingValues(setting)
  const [kmCost, setKmCost] = useState(String(values.kmCostTry))
  const [rate, setRate] = useState(String(values.eurTryRate))
  const [advertising, setAdvertising] = useState(String(values.advertisingExpenseTry))
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [fetchingRate, setFetchingRate] = useState(false)
  const [fetchRateError, setFetchRateError] = useState('')

  const handleFetchRate = async () => {
    setFetchingRate(true)
    setFetchRateError('')
    try {
      const fetched = await fetchLatestEurTryRate()
      if (fetched === null) {
        setFetchRateError('Kur alınamadı, manuel girin.')
      } else {
        setRate(fetched.toFixed(4))
      }
    } catch {
      setFetchRateError('Kur alınamadı, manuel girin.')
    } finally {
      setFetchingRate(false)
    }
  }

  useEffect(() => {
    const next = settingValues(setting)
    setKmCost(String(next.kmCostTry))
    setRate(String(next.eurTryRate))
    setAdvertising(String(next.advertisingExpenseTry))
  }, [setting])

  const submit = async (event: FormEvent) => {
    event.preventDefault()
    const km = Number(kmCost.replace(',', '.'))
    const exchange = Number(rate.replace(',', '.'))
    const ads = Number(advertising.replace(',', '.'))
    setError(''); setSuccess('')
    if (!Number.isFinite(km) || km <= 0 || km > 10000) return setError('Geçerli bir km maliyeti girin.')
    if (!Number.isFinite(exchange) || exchange <= 0 || exchange > 10000) return setError('Geçerli bir EUR/TL kuru girin.')
    if (!Number.isFinite(ads) || ads < 0 || ads > 1_000_000_000) return setError('Geçerli bir reklam gideri girin.')
    setSaving(true)
    const payload = { period_month: `${period}-01`, km_cost_try: km, advertising_expense_try: ads, eur_try_rate: exchange, updated_at: new Date().toISOString() }
    const { data, error: saveError } = await supabase.from('profit_loss_settings').upsert(payload, { onConflict: 'period_month' }).select().single()
    setSaving(false)
    if (saveError) return setError('Ayarlar kaydedilemedi, tekrar deneyin.')
    onSaved(period, data); setSuccess('Ayarlar kaydedildi, hesap güncellendi.')
  }

  return <form className="profit-settings" noValidate onSubmit={submit}>
    <div className="profit-settings-heading"><div><span className="budget-section-kicker">HESAPLAMA AYARLARI</span><h2>{monthLabel(period)}</h2></div><span>Aylık</span></div>
    <div className="profit-input-grid">
      <label className="profit-input-field"><span>KM başı maliyet</span><div><b>₺</b><input type="number" min="0.01" max="10000" step="0.01" inputMode="decimal" value={kmCost} onChange={e => setKmCost(e.target.value)} required /></div><small>Boşsa varsayılan 15 ₺/km</small></label>
      <label className="profit-input-field"><span>EUR/TL kuru</span><div><b>₺</b><input type="number" min="0.01" max="10000" step="0.0001" inputMode="decimal" value={rate} onChange={e => setRate(e.target.value)} required /><button type="button" className="fetch-rate-btn" onClick={() => void handleFetchRate()} disabled={fetchingRate}>{fetchingRate ? '…' : 'Kur al'}</button></div><small>1 € karşılığı{fetchRateError ? ` · ${fetchRateError}` : ''}</small></label>
      <label className="profit-input-field profit-input-wide"><span>Reklam gideri</span><div><b>₺</b><input type="number" min="0" max="1000000000" step="0.01" inputMode="decimal" value={advertising} onChange={e => setAdvertising(e.target.value)} required /></div><small>Bu aya ait toplam reklam harcaması</small></label>
    </div>
    <button className="btn profit-save-button" type="submit" disabled={saving}>{saving ? 'Kaydediliyor…' : 'Ayarları kaydet ve hesapla'}</button>
    <div className="inline-success" role="status">{success}</div><div className="inline-error">{error}</div>
  </form>
}

function ExpandableSection({ title, detail, children }: { title: string; detail?: string; children: ReactNode }) {
  const [open, setOpen] = useState(false)
  return <section className="profit-expandable">
    <button type="button" className="profit-expandable-trigger" aria-expanded={open} onClick={() => setOpen(value => !value)}>
      <span><strong>{title}</strong>{detail && <small>{detail}</small>}</span><b aria-hidden="true">{open ? '−' : '+'}</b>
    </button>
    {open && <div className="profit-expandable-content">{children}</div>}
  </section>
}

type ProfitLeg = {
  bookingId: string
  bookingRef?: string | null
  customerName?: string | null
  leg: string
  dayId?: string | null
  date: string
  from?: unknown
  to?: unknown
  revenueEur?: number
  revenueTry?: number
  vehicleCostTry?: number
  supplierCostTry?: number
  airportMeetCostTry?: number
  oneWayKm?: number | null
  eurTryRate?: number | null
  isDailyChauffeur?: boolean
  distanceSource?: string
}

/**
 * Ayak yönü rozetinin metni ve rengi; listede gidiş/dönüş ilk bakışta ayrılır.
 * "Dönüş yolculuğu planla" ile açılan kayıtlar ayrı bir rezervasyon satırıdır
 * ama seyahat olarak dönüştür; rozet bunu da dönüş gösterir.
 */
function legDirection(leg: ProfitLeg, booking?: Booking) {
  if (leg.isDailyChauffeur) return { className: 'is-daily', icon: '📅', label: legLabelFor(leg.leg) }
  if (leg.leg === 'return' || booking?.manual_return_of_ref) return { className: 'is-return', icon: '↩', label: 'Dönüş' }
  return { className: 'is-outbound', icon: '↗', label: 'Gidiş' }
}

/**
 * Sefer bazlı net kâr = gelir − araç − tedarikçi − karşılama. Reklam aylık toplu
 * gider olduğu için sefere yansıtılmaz (kâr/zarar özetinde ayrı gösterilir).
 */
function legFinancials(leg: ProfitLeg) {
  const revenueEur = leg.revenueEur ?? 0
  const revenueTry = leg.revenueTry ?? 0
  const expenseTry = (leg.vehicleCostTry ?? 0) + (leg.supplierCostTry ?? 0) + (leg.airportMeetCostTry ?? 0)
  const netProfitTry = revenueTry - expenseTry
  const eurTryRate = leg.eurTryRate ?? 0
  return {
    revenueEur,
    revenueTry,
    expenseTry,
    netProfitTry,
    netProfitEur: eurTryRate ? netProfitTry / eurTryRate : revenueEur,
    eurTryRate,
  }
}

/** Gelir satırı: tutar € ve TL karşılığı birlikte, kullanılan kurla birlikte. */
function RevenueLine({ eur, tryAmount, eurTryRate }: { eur: number; tryAmount: number; eurTryRate: number }) {
  return <p className="profit-revenue-line">
    <span>Gelir</span>
    <strong>{formatEuro(eur)}</strong>
    <em>TL karşılığı {formatTry(tryAmount)}</em>
    {eurTryRate > 0 && <small>1 € = {formatTry(eurTryRate)}</small>}
  </p>
}

/**
 * Yolcu bilgileri seyahat kartının içinde durur; maliyet girmek için transfer
 * detay sayfasına gitmek gerekmez.
 */
function PassengerFacts({ booking, leg }: { booking: Booking; leg: ProfitLeg }) {
  const isReturnLeg = leg.leg === 'return'
  const time = isReturnLeg ? booking.return_pickup_time : booking.pickup_time
  const flight = isReturnLeg ? booking.return_flight_number : booking.flight_number
  const address = isReturnLeg ? booking.dropoff_address : booking.pickup_address
  const passengerCount = Number(booking.guests) || 0
  const luggage = Number(booking.luggage_count) || 0
  const childSeats = Number(booking.child_seat_count) || 0
  // `wide` alanlar dar ekranda da tam satır kaplar; kısa değerler iki sütunda kalır.
  const facts: Array<{ key: string; label: string; value: ReactNode; wide?: boolean }> = [
    { key: 'name', label: 'Yolcu', value: booking.customer_name || '—', wide: true },
  ]
  if (booking.customer_phone) {
    facts.push({
      key: 'phone',
      label: 'Telefon',
      value: <a href={`tel:${booking.customer_phone}`}>{booking.customer_phone}</a>,
      wide: true,
    })
  }
  facts.push({
    key: 'guests',
    label: 'Kişi / bagaj',
    value: `${passengerCount || '—'} kişi${luggage > 0 ? ` · ${luggage} bagaj` : ''}${childSeats > 0 ? ` · ${childSeats} çocuk koltuğu` : ''}`,
  })
  facts.push({ key: 'vehicle', label: 'Araç', value: booking.vehicle_type === 'vclass' ? 'V-Class' : 'Vito' })
  if (time) facts.push({ key: 'time', label: 'Saat', value: time.slice(0, 5) })
  if (flight) facts.push({ key: 'flight', label: 'Uçuş', value: flight })
  if (booking.hotel_name) facts.push({ key: 'hotel', label: 'Otel', value: booking.hotel_name, wide: true })
  if (address) facts.push({ key: 'address', label: 'Adres', value: address, wide: true })

  return <dl className="profit-passenger-facts">
    {facts.map(fact => <div key={fact.key} className={fact.wide ? 'is-wide' : undefined}>
      <dt>{fact.label}</dt>
      <dd>{fact.value}</dd>
    </div>)}
  </dl>
}

function TripRow({ leg, booking, period, navigate, isFocused, focusOpensEditor, onSaveDistance, onSaveSupplierCost, onSaveCostMode, onSaveNoCost }: {
  leg: ProfitLeg
  booking: Booking | undefined
  period: string
  navigate: Navigate
  isFocused: boolean
  focusOpensEditor: boolean
  onSaveDistance: (leg: ProfitLegRef, distanceKm: number) => Promise<void>
  onSaveSupplierCost: (booking: Booking, leg: LegKey, costTry: number) => Promise<void>
  onSaveCostMode: (booking: Booking, leg: LegKey, nextMode: CostMode) => Promise<void>
  onSaveNoCost: (leg: ProfitLeg) => Promise<void>
}) {
  const isDailyChauffeur = Boolean(leg.isDailyChauffeur)
  const legKey: LegKey = toLegKey(leg.leg)
  const legLabel = legLabelFor(leg.leg)
  const direction = legDirection(leg, booking)
  const currentMode = legCostMode(booking, legKey)
  const isSoldTransfer = !isDailyChauffeur && currentMode === 'sold_transfer'
  const isNoCost = !isDailyChauffeur && currentMode === 'no_cost'
  const legCostTry = booking ? Number(booking[legCostColumns(legKey).cost]) || 0 : 0
  const isUnresolved = leg.oneWayKm == null && !isSoldTransfer && !isNoCost && !isDailyChauffeur
  const dailyMissing = leg.distanceSource === 'daily-missing'
  const needsAttention = isUnresolved || (isSoldTransfer && legCostTry <= 0) || dailyMissing
  const money = legFinancials(leg)
  const detailHash = `#detail/${encodeURIComponent(String(leg.bookingRef ?? ''))}?from=profit-loss&profitPeriod=${encodeURIComponent(period)}${leg.leg === 'return' ? '&leg=return' : ''}`
  const costSummary = isNoCost
    ? 'Maliyeti yok olarak işaretli · gider hesaplanmaz'
    : isSoldTransfer
      ? `Tedarikçi gideri: ${formatTry(leg.supplierCostTry ?? 0)}`
      : isDailyChauffeur
        ? `Araç maliyeti: ${formatTry(leg.vehicleCostTry ?? 0)} · Gerçek KM: ${formatNumber(leg.oneWayKm ?? 0, 1)} km`
        : isUnresolved
          ? 'Araç maliyeti hesaplanamadı · tek yön KM bekleniyor'
          : `Araç maliyeti: ${formatTry(leg.vehicleCostTry ?? 0)} · Tek yön ${formatNumber(leg.oneWayKm ?? 0, 1)} km`

  return <li
    className={`profit-trip-history-row${needsAttention ? ' is-incomplete' : ''}${isFocused ? ' is-focused' : ''}`}
    id={legTargetId(leg.bookingId, leg.leg)}
  >
    <div className="profit-trip-history-main">
      <div className="profit-trip-history-top">
        <span className={`profit-direction-badge ${direction.className}`}>
          <span aria-hidden="true">{direction.icon}</span>{direction.label}
        </span>
        <strong>{leg.bookingRef || leg.customerName || 'Kayıt'}</strong>
        {booking?.manual_return_of_ref && <small className="profit-linked-ref">{String(booking.manual_return_of_ref)} kaydından planlandı</small>}
      </div>
      {needsAttention && <p className="profit-leg-badge is-warning">{dailyMissing
        ? 'Günlük hizmet KM bilgisi eksik'
        : isUnresolved ? 'Tek yön KM bilgisi eksik' : 'Tedarikçi maliyeti eksik'}</p>}
      <div className="profit-trip-history-route">{profitLocationLabel(leg.from)} → {profitLocationLabel(leg.to)}</div>
      {booking && <PassengerFacts booking={booking} leg={leg} />}
      <RevenueLine eur={money.revenueEur} tryAmount={money.revenueTry} eurTryRate={money.eurTryRate} />
      {!isUnresolved && <div className={`profit-trip-history-net ${money.netProfitTry < 0 ? 'is-negative' : 'is-positive'}`}>
        <span>Net kâr</span><strong>{formatTry(money.netProfitTry)}</strong><em>{formatEuro(money.netProfitEur)}</em>
      </div>}
      <div className="profit-trip-history-meta">
        {booking && !isDailyChauffeur && <span>{`${legLabel} maliyet modeli: ${COST_MODE_LABELS[currentMode]}`}</span>}
        <span>{costSummary}</span>
        {!isSoldTransfer && !isNoCost && (leg.airportMeetCostTry ?? 0) > 0 && <span>Karşılama: {formatTry(leg.airportMeetCostTry)}</span>}
      </div>
    </div>
    <div className="profit-trip-history-actions">
      {booking && !isDailyChauffeur && <LegCostControls
        booking={booking}
        legRef={leg}
        leg={legKey}
        legLabel={legLabel}
        currentCostTry={legCostTry}
        isSoldTransfer={isSoldTransfer}
        oneWayKm={leg.oneWayKm ?? undefined}
        autoOpenDistanceEditor={isFocused && focusOpensEditor}
        onSaveDistance={onSaveDistance}
        onSaveCostMode={onSaveCostMode}
        onSaveSupplierCost={onSaveSupplierCost}
      />}
      {isDailyChauffeur && <>
        <span className="profit-trip-history-inline-hint">Günlük KM rezervasyon detayından düzenlenir.</span>
        {dailyMissing && <NoCostButton leg={leg} onSaveNoCost={onSaveNoCost} />}
      </>}
      <button className="profit-leg-action is-ghost" type="button" onClick={() => navigate(detailHash)}>Seyahate git</button>
    </div>
  </li>
}

/** "Maliyeti yok" kısayolu: ayağı gidersiz işaretler, eksik bilgi uyarısını kapatır. */
function NoCostButton({ leg, onSaveNoCost, label = 'Maliyeti yok' }: {
  leg: ProfitLeg
  onSaveNoCost: (leg: ProfitLeg) => Promise<void>
  label?: string
}) {
  const [saving, setSaving] = useState(false)
  const [failed, setFailed] = useState(false)
  const save = async () => {
    setSaving(true); setFailed(false)
    try {
      await onSaveNoCost(leg)
    } catch {
      setFailed(true)
    } finally {
      setSaving(false)
    }
  }
  return <>
    <button className="profit-leg-action is-ghost" type="button" disabled={saving} onClick={() => void save()}>
      {saving ? 'Kaydediliyor…' : label}
    </button>
    {failed && <span className="inline-error" role="alert">Kaydedilemedi, tekrar deneyin.</span>}
  </>
}

/** Aynı güne düşen ayakları tek başlık altında toplar; liste tarihe göre açılır. */
function groupLegsByDate(legs: ProfitLeg[]) {
  const groups = new Map<string, ProfitLeg[]>()
  for (const leg of legs) {
    const date = String(leg.date ?? '')
    const group = groups.get(date)
    if (group) group.push(leg)
    else groups.set(date, [leg])
  }
  return [...groups.entries()]
    .sort((left, right) => right[0].localeCompare(left[0]))
    .map(([date, dateLegs]) => {
      const netProfitTry = dateLegs.reduce((total, leg) => total + legFinancials(leg).netProfitTry, 0)
      const revenueEur = dateLegs.reduce((total, leg) => total + (leg.revenueEur ?? 0), 0)
      const revenueTry = dateLegs.reduce((total, leg) => total + (leg.revenueTry ?? 0), 0)
      return { date, legs: dateLegs, netProfitTry, revenueEur, revenueTry }
    })
}

function TravelHistorySection({ metrics, period, bookings, navigate, focusedLegKey, focusOpensEditor, onSaveDistance, onSaveSupplierCost, onSaveCostMode, onSaveNoCost }: {
  metrics: any
  period: string
  bookings: Booking[]
  navigate: Navigate
  focusedLegKey: string | null
  focusOpensEditor: boolean
  onSaveDistance: (leg: ProfitLegRef, distanceKm: number) => Promise<void>
  onSaveSupplierCost: (booking: Booking, leg: LegKey, costTry: number) => Promise<void>
  onSaveCostMode: (booking: Booking, leg: LegKey, nextMode: CostMode) => Promise<void>
  onSaveNoCost: (leg: ProfitLeg) => Promise<void>
}) {
  const bookingMap = useMemo(() => new Map(bookings.map(booking => [booking.id, booking])), [bookings])
  const groups = useMemo(() => {
    const legs = [...metrics.resolvedLegs, ...metrics.unresolvedLegs].sort((left: ProfitLeg, right: ProfitLeg) => {
      const dateCompare = String(right.date ?? '').localeCompare(String(left.date ?? ''))
      if (dateCompare !== 0) return dateCompare
      return String(left.bookingRef ?? '').localeCompare(String(right.bookingRef ?? ''))
    }) as ProfitLeg[]
    return groupLegsByDate(legs)
  }, [metrics.resolvedLegs, metrics.unresolvedLegs])

  // Varsayılan açık gruplar: en yeni gün ve eksik bilgi içeren günler. Kullanıcı
  // başlığa dokunduğunda seçimi bu varsayılanı ezer.
  const [toggledDates, setToggledDates] = useState<Map<string, boolean>>(new Map())
  const focusedDate = useMemo(() => {
    if (!focusedLegKey) return ''
    const match = groups.flatMap(group => group.legs).find(leg => `${leg.bookingId}:${leg.leg}` === focusedLegKey)
    return match ? String(match.date ?? '') : ''
  }, [focusedLegKey, groups])

  const legCount = groups.reduce((total, group) => total + group.legs.length, 0)
  if (!legCount) {
    return <section className="budget-section profit-routes">
      <div className="budget-section-heading"><div><span className="budget-section-kicker">SEYAHAT GEÇMİŞİ</span><h2>Tüm seyahatler</h2></div><span>0 sefer</span></div>
      <div className="travel-history-empty">Seçilen dönemde listelenecek gerçekleşmiş sefer yok.</div>
    </section>
  }

  return <section className="budget-section profit-trip-history">
    <div className="budget-section-heading"><div><span className="budget-section-kicker">SEYAHAT GEÇMİŞİ</span><h2>Tüm seyahatler</h2></div><span>{legCount} sefer · {groups.length} gün</span></div>
    <p className="profit-trip-history-note">Günler en yeniden eskiye sıralanır; başlığa dokunarak o günün seferlerini açıp kapatabilirsiniz. Kendi araç seferlerinde tek yön KM, satılan transferlerde tedarikçi maliyeti doğrudan bu listeden güncellenir.</p>
    <div className="profit-day-groups">
      {groups.map((group, index) => {
        const hasAttention = group.legs.some(leg => {
          const booking = bookingMap.get(leg.bookingId)
          const mode = legCostMode(booking, toLegKey(leg.leg))
          if (leg.distanceSource === 'daily-missing') return true
          if (mode === 'sold_transfer') return !(Number(booking?.[legCostColumns(toLegKey(leg.leg)).cost]) > 0)
          if (mode === 'no_cost' || leg.isDailyChauffeur) return false
          return leg.oneWayKm == null
        })
        const defaultOpen = index === 0 || hasAttention
        const open = (toggledDates.get(group.date) ?? defaultOpen) || focusedDate === group.date
        return <section className={`profit-day-group${open ? ' is-open' : ''}`} key={group.date}>
          <button
            type="button"
            className="profit-day-summary"
            aria-expanded={open}
            onClick={() => setToggledDates(current => new Map(current).set(group.date, !open))}
          >
            <span className="profit-day-summary-main">
              <strong>{fmtDetailDate(group.date)}</strong>
              <small>{group.legs.length} sefer · Gelir {formatEuro(group.revenueEur)} · {formatTry(group.revenueTry)}</small>
            </span>
            <span className="profit-day-summary-side">
              <b className={group.netProfitTry < 0 ? 'is-negative' : 'is-positive'}>{formatTry(group.netProfitTry)}</b>
              {hasAttention && <em className="profit-day-attention">Eksik bilgi</em>}
              <i aria-hidden="true">{open ? '−' : '+'}</i>
            </span>
          </button>
          {open && <ul className="profit-trip-history-list">
            {group.legs.map(leg => <TripRow
              key={`${leg.bookingId}:${leg.leg}`}
              leg={leg}
              booking={bookingMap.get(leg.bookingId)}
              period={period}
              navigate={navigate}
              isFocused={focusedLegKey === `${leg.bookingId}:${leg.leg}`}
              focusOpensEditor={focusOpensEditor}
              onSaveDistance={onSaveDistance}
              onSaveSupplierCost={onSaveSupplierCost}
              onSaveCostMode={onSaveCostMode}
              onSaveNoCost={onSaveNoCost}
            />)}
          </ul>}
        </section>
      })}
    </div>
  </section>
}

function ProfitHero({ metrics, period }: { metrics: any; period: string }) {
  const negative = metrics.netProfitTry < 0
  const formulaOperator = negative ? 'Zarar' : 'Net kâr'
  return <section className={`profit-hero ${negative ? 'is-negative' : 'is-positive'}`} aria-label={formulaOperator}><div className="budget-eyebrow">{period === 'all' ? 'Tüm zamanlar' : monthLabel(period)} · {formulaOperator}</div><div className="profit-total">{formatTry(metrics.netProfitTry)}</div><div className="profit-total-eur">{formatEuro(metrics.netProfitEur)}</div><div className="profit-margin"><span>Kâr marjı</span><strong>%{formatNumber(metrics.profitMargin, 1)}</strong></div></section>
}

function ProfitMetrics({ metrics, period, navigate, onFocusLeg, onSaveNoCost }: {
  metrics: any
  period: string
  navigate: Navigate
  onFocusLeg: (leg: ProfitLegRef & { date?: string | null }, options?: { openEditor?: boolean }) => void
  onSaveNoCost: (leg: ProfitLeg) => Promise<void>
}) {
  const missingDailyLegs = metrics.resolvedLegs.filter((leg: ProfitLeg) => leg.distanceSource === 'daily-missing')
  const pendingLegs: ProfitLeg[] = [...metrics.unresolvedLegs, ...missingDailyLegs]
  return <>
    <section className="budget-kpi-grid profit-kpi-grid" aria-label="Kâr zarar özeti">
      <article className="budget-kpi profit-income-kpi"><span className="budget-kpi-icon" aria-hidden="true">€</span><span className="budget-kpi-label">Seyahat geliri</span><strong>{formatEuro(metrics.incomeEur)}</strong><small>TL karşılığı {formatTry(metrics.incomeTry)} · tamamlanan seferler</small></article>
      <article className="budget-kpi"><span className="budget-kpi-icon" aria-hidden="true">₺</span><span className="budget-kpi-label">Toplam gider</span><strong>{formatTry(metrics.totalExpenseTry)}</strong><small>{formatEuro(metrics.totalExpenseEur)} · tüm operasyonel giderler</small></article>
      <article className="budget-kpi"><span className="budget-kpi-icon" aria-hidden="true">↗</span><span className="budget-kpi-label">Gerçekleşen sefer</span><strong>{formatNumber(metrics.completedLegs)}</strong><small>Seçilen dönemdeki hizmet ayakları</small></article>
    </section>
    {pendingLegs.length > 0 && <ExpandableSection title="İşlem bekleyen kayıtlar" detail={`${pendingLegs.length} kayıt`}>
      <p className="profit-panel-note">Tek yön KM eksikse “KM gir” ile aşağıdaki seyahat listesindeki satır açılır. Gideri olmayan ayakları “Maliyeti yok” ile kapatabilir, kaydın tamamını görmek için “Kaydı aç” diyebilirsiniz.</p>
      <ul className="profit-action-list">{pendingLegs.map((leg: ProfitLeg) => {
        const dailyMissing = leg.distanceSource === 'daily-missing'
        const detailHash = `#detail/${encodeURIComponent(String(leg.bookingRef ?? ''))}?from=profit-loss&profitPeriod=${encodeURIComponent(period)}${leg.leg === 'return' ? '&leg=return' : ''}`
        return <li key={`${leg.bookingId}:${leg.leg}`}>
          <span>
            <strong>{leg.bookingRef || leg.customerName || 'Kayıt'}</strong>
            <small>{legLabelFor(leg.leg)} · {fmtDetailDate(leg.date)} · {dailyMissing ? 'Günlük hizmet KM bilgisi eksik' : 'Tek yön KM bilgisi eksik'}</small>
          </span>
          <span className="profit-action-buttons">
            {!dailyMissing && <button className="profit-leg-action is-primary" type="button" onClick={() => onFocusLeg(leg, { openEditor: true })}>KM gir</button>}
            <NoCostButton leg={leg} onSaveNoCost={onSaveNoCost} />
            <button className="profit-leg-action is-ghost" type="button" onClick={() => onFocusLeg(leg)}>Listede gör</button>
            <button className="profit-leg-action is-ghost" type="button" onClick={() => navigate(detailHash)}>Kaydı aç</button>
          </span>
        </li>
      })}</ul>
    </ExpandableSection>}
    <ExpandableSection title="Gider dağılımı" detail={formatTry(metrics.totalExpenseTry)}><dl className="profit-breakdown"><div><dt>Kendi araç</dt><dd>{formatTry(metrics.vehicleCostTry)}</dd></div><div><dt>Satılan transfer</dt><dd>{formatTry(metrics.supplierCostTry)}</dd></div><div><dt>Karşılama</dt><dd>{formatTry(metrics.airportMeetCostTry)}</dd></div><div><dt>Reklam</dt><dd>{formatTry(metrics.advertisingExpenseTry)}</dd></div></dl></ExpandableSection>
  </>
}

export default function ProfitLossPage({ navigate, initialPeriod }: { navigate: Navigate; initialPeriod?: string | null }) {
  const today = useMemo(todayISO, [])
  const distributionToday = useMemo(berlinTodayISO, [])
  const months = useMemo(() => monthRange(FIRST_PROFIT_MONTH, today.slice(0, 7)), [today])
  const [period, setPeriod] = useState(() => initialPeriod && [...months, 'all'].includes(initialPeriod) ? initialPeriod : today.slice(0, 7))
  const [bookings, setBookings] = useState<Booking[]>([])
  const [settings, setSettings] = useState<SettingsMap>(new Map())
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [status, setStatus] = useState('Yükleniyor…')
  const [shareSettings, setShareSettings] = useState<ProfitShareSettings | null>(null)
  const [distributions, setDistributions] = useState<ProfitDistribution[]>([])
  const [distributionLoading, setDistributionLoading] = useState(true)
  const [distributionError, setDistributionError] = useState('')
  const [ratesByDate, setRatesByDate] = useState<Map<string, number>>(new Map())
  const [ratesLoading, setRatesLoading] = useState(false)
  const [focusedLeg, setFocusedLeg] = useState<{ bookingId: string; leg: string; openEditor: boolean } | null>(null)

  /**
   * Uyarı kartlarından seyahat listesindeki satıra götürür. Liste seçili döneme
   * göre filtrelendiği için ayak başka bir aya aitse önce o döneme geçilir;
   * aksi halde satır ekranda hiç bulunmaz ve eksik bilgi düzeltilemez.
   * `openEditor` ile satırdaki KM düzenleyicisi doğrudan açılır.
   */
  const focusLeg = useCallback((leg: ProfitLegRef & { date?: string | null }, options: { openEditor?: boolean } = {}) => {
    const legMonth = typeof leg.date === 'string' ? leg.date.slice(0, 7) : ''
    if (legMonth && period !== 'all' && legMonth !== period) {
      setPeriod(months.includes(legMonth) ? legMonth : 'all')
    }
    setFocusedLeg({ bookingId: leg.bookingId, leg: leg.leg, openEditor: Boolean(options.openEditor) })
  }, [months, period])

  useEffect(() => {
    if (!focusedLeg) return
    const target = document.getElementById(legTargetId(focusedLeg.bookingId, focusedLeg.leg))
    if (typeof target?.scrollIntoView === 'function') target.scrollIntoView({ behavior: 'smooth', block: 'center' })
    const timer = window.setTimeout(() => setFocusedLeg(null), 4000)
    return () => window.clearTimeout(timer)
  }, [focusedLeg])

  const refreshDistributionLedger = useCallback(async ({ silent = false }: { silent?: boolean } = {}) => {
    if (!silent) setDistributionLoading(true)
    setDistributionError('')
    try {
      const ledger = await fetchProfitDistributionLedger()
      setShareSettings(ledger.settings)
      setDistributions(ledger.distributions)
    } catch (ledgerError) {
      setDistributionError(profitDistributionErrorMessage(ledgerError))
    } finally {
      if (!silent) setDistributionLoading(false)
    }
  }, [])

  const refresh = useCallback(async () => {
    setLoading(true); setError(false); setStatus('Seyahatler ve ayarlar yenileniyor…')
    const distributionRefresh = refreshDistributionLedger()
    try {
      const [nextBookings, nextSettings] = await Promise.all([fetchAllBookings(), fetchSettings()])
      setBookings(nextBookings); setSettings(nextSettings); setStatus(`Seyahatlerle senkron · Son güncelleme: ${fmtSyncTime()}`)
      // Fetch per-date EUR/TRY rates in background.
      // daily_chauffeur legs use chauffeur_hire_days[*].service_date, not pickup_date.
      setRatesLoading(true)
      const dates = nextBookings.flatMap((b: Booking) => {
        if (b.trip_type === 'daily_chauffeur') {
          return ((b.chauffeur_hire_days ?? []) as Array<{ service_date?: string }>)
            .map(d => d.service_date)
            .filter((d): d is string => Boolean(d))
        }
        return [b.pickup_date, b.return_date].filter((d): d is string => Boolean(d))
      })
      fetchRatesForDates(dates)
        .then(rates => { setRatesByDate(rates) })
        .catch(() => { /* silent — falls back to monthly rate */ })
        .finally(() => { setRatesLoading(false) })
    } catch { setError(true); setStatus('Bağlantı veya veri tabanı hatası') }
    finally { setLoading(false) }
    await distributionRefresh
  }, [refreshDistributionLedger])
  useEffect(() => { void refresh() }, [refresh])
  const metrics = useMemo(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    () => calculateProfitLossMetrics(bookings, period, today, settings, ratesByDate as any),
    [bookings, period, settings, today, ratesByDate],
  )
  const saveSetting = (month: string, value: any) => setSettings(current => new Map(current).set(month, value))
  const saveDistance = async (leg: ProfitLegRef, distanceKm: number) => {
    const legKey: LegKey = leg.leg === 'return' ? 'return' : 'outbound'
    const patch = await saveLegDistance(leg.bookingId, legKey, distanceKm)
    const savedDistance = Number(patch.manual_return_distance_km ?? patch.manual_outbound_distance_km)
    setBookings(current => current.map(booking => booking.id === leg.bookingId ? { ...booking, ...patch } : booking))
    setStatus(`${leg.bookingRef || 'Seyahat'} için tek yön ${formatNumber(savedDistance, 2)} km kaydedildi · Hesap güncellendi`)
  }
  // Bir ayağa maliyet girmek o ayağı satılan transfer yapar; sütun kısıtı
  // model ile bedelin birlikte tutarlı olmasını şart koştuğu için tek update.
  const saveSupplierCost = async (booking: Booking, leg: LegKey, costTry: number) => {
    const columns = legCostColumns(leg)
    const legLabel = leg === 'return' ? 'dönüş' : 'gidiş'
    const patch = await saveLegSupplierCost(booking.id, leg, costTry)
    const savedCost = Number(patch[columns.cost])
    setBookings(current => current.map(item => item.id === booking.id ? { ...item, ...patch } : item))
    setStatus(`${booking.booking_ref || 'Seyahat'} için ${legLabel} tedarikçi maliyeti ${formatTry(savedCost)} olarak kaydedildi · Hesap güncellendi`)
  }
  const saveCostMode = async (booking: Booking, leg: LegKey, nextMode: CostMode) => {
    const columns = legCostColumns(leg)
    const legLabel = leg === 'return' ? 'dönüş' : 'gidiş'
    // `own_vehicle`e dönerken maliyet sıfırlanmalı; sütun kısıtı ikisinin
    // tutarlı olmasını şart koşuyor. Satılan transfere geçiş yalnızca kayıtlı
    // bir bedel varken gelir (aksi halde önce düzenleyici açılır).
    const patch = await saveLegCostMode(booking.id, leg, nextMode)
    setBookings(current => current.map(item => item.id === booking.id ? { ...item, ...patch } : item))
    const savedModeValue = String(patch[columns.mode])
    const savedMode: CostMode = savedModeValue === 'sold_transfer' || savedModeValue === 'no_cost'
      ? savedModeValue as CostMode
      : 'own_vehicle'
    setStatus(`${booking.booking_ref || 'Seyahat'} için ${legLabel} maliyet modeli “${COST_MODE_LABELS[savedMode]}” olarak kaydedildi · Hesap güncellendi`)
  }
  /**
   * "Maliyeti yok": transfer ayaklarında maliyet modeli, günlük hizmet
   * günlerinde 0 km olarak yazılır. İkisinde de ayak gidersiz sayılır ve eksik
   * bilgi uyarısı kapanır.
   */
  const saveNoCost = async (leg: ProfitLeg) => {
    if (leg.isDailyChauffeur) {
      const dayId = leg.dayId
      if (!dayId) throw new Error('Günlük hizmet kaydı bulunamadı')
      const { data, error: saveError } = await supabase.from('chauffeur_hire_days')
        .update({ distance_km: 0 })
        .eq('id', dayId)
        .select('id, distance_km').single()
      if (saveError || !data) throw saveError ?? new Error('Günlük hizmet kaydı dönmedi')
      setBookings(current => current.map(booking => booking.id === leg.bookingId
        ? {
            ...booking,
            chauffeur_hire_days: (booking.chauffeur_hire_days ?? []).map(day => day.id === dayId
              ? { ...day, distance_km: 0 }
              : day),
          }
        : booking))
      setStatus(`${leg.bookingRef || 'Seyahat'} · ${legLabelFor(leg.leg)} maliyetsiz olarak işaretlendi · Hesap güncellendi`)
      return
    }
    const booking = bookings.find(item => item.id === leg.bookingId)
    if (!booking) throw new Error('Rezervasyon bulunamadı')
    await saveCostMode(booking, toLegKey(leg.leg), 'no_cost')
  }
  const saveShareSettings = async (input: SaveProfitShareSettingsInput) => {
    try {
      const saved = await saveProfitShareSettings(input)
      setShareSettings(saved)
    } catch (writeError) {
      throw new Error(profitDistributionErrorMessage(writeError))
    }
  }
  const confirmDistribution = async (input: CreateProfitDistributionInput) => {
    const currentMetrics = calculateProfitDistribution(bookings, {
      startDate: input.expectedStart,
      endDate: input.periodEnd,
      today: distributionToday,
      settingsByMonth: settings,
      operationsSharePct: input.operationsSharePct,
      ratesByDate,  // may be empty Map if API fetch is still in flight — falls back to monthly rate
    })
    if (currentMetrics.blockers.length > 0 || !currentMetrics.canDistribute || currentMetrics.netProfitEur <= 0) {
      throw new Error('Dağıtım bilgileri güncellendi. Lütfen hesaplamayı kontrol edip tekrar deneyin.')
    }
    const snapshot = Object.freeze(buildProfitDistributionSnapshot(currentMetrics))
    try {
      await createProfitDistribution({ ...input, snapshot })
    } catch (writeError) {
      const message = profitDistributionErrorMessage(writeError)
      if (isStaleDistributionWriteError(writeError)) await refreshDistributionLedger({ silent: true })
      throw new Error(message)
    }
    await refresh()
  }
  return <><Topbar navigate={navigate} /><AdminTabs active="profit-loss" navigate={navigate} />
    <div className="budget-toolbar profit-toolbar"><div className="budget-periods" role="group" aria-label="Kâr zarar dönemi">{[...months, 'all'].map(value => <button type="button" key={value} className={period === value ? 'active' : ''} onClick={() => setPeriod(value)}>{value === 'all' ? 'Tümü' : monthLabel(value, { short: true })}</button>)}</div>{ratesLoading && <span className="rates-loading-hint">Kurlar yükleniyor…</span>}<button className="sync-button" type="button" aria-label="Kâr zarar verilerini yenile" disabled={loading} onClick={() => void refresh()}>↻</button></div>
    <div className="budget-update-status">{status}</div>
    <main className="scroll-area budget-content profit-content">
      {error ? <div className="empty"><div className="empty-icon">₺</div><div>Kâr/zarar verileri yüklenemedi.</div></div> : loading && !bookings.length ? <><div className="empty"><div>Ayarlar yükleniyor…</div></div><div className="empty"><div>Hesaplanıyor…</div></div></> : <><ProfitHero metrics={metrics} period={period} /><ProfitDistributionSection today={distributionToday} bookings={bookings} settingsByMonth={settings} ratesByDate={ratesByDate} shareSettings={shareSettings} distributions={distributions} loading={distributionLoading} error={distributionError} onRetry={() => void refreshDistributionLedger()} onSaveSettings={saveShareSettings} onCreateDistribution={confirmDistribution} onSaveDistance={saveDistance} onSaveSupplierCost={saveSupplierCost} onSaveCostMode={saveCostMode} onFocusLeg={focusLeg} navigate={navigate} /><ProfitMetrics metrics={metrics} period={period} navigate={navigate} onFocusLeg={focusLeg} onSaveNoCost={saveNoCost} /><TravelHistorySection metrics={metrics} period={period} bookings={bookings} navigate={navigate} focusedLegKey={focusedLeg ? `${focusedLeg.bookingId}:${focusedLeg.leg}` : null} focusOpensEditor={Boolean(focusedLeg?.openEditor)} onSaveDistance={saveDistance} onSaveSupplierCost={saveSupplierCost} onSaveCostMode={saveCostMode} onSaveNoCost={saveNoCost} /><ExpandableSection title="Hesaplama ayarları" detail={period === 'all' ? 'Aylık değerler uygulanıyor' : monthLabel(period)}>{period === 'all' ? <p className="profit-panel-note">Tümü görünümünde her ayın KM maliyeti, reklam gideri ve EUR/TL kuru ayrı ayrı kullanılır.</p> : <SettingsForm key={period} period={period} settings={settings} onSaved={saveSetting} />}</ExpandableSection></>}
    </main>
  </>
}
