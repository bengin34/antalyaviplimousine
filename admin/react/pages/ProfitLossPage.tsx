import { useCallback, useEffect, useMemo, useState, type FormEvent, type ReactNode } from 'react'
import { AdminTabs, Topbar } from '../components/AdminChrome'
import { ProfitDistributionSection } from '../components/ProfitDistributionSection'
import { berlinTodayISO, fmtDetailDate, fmtSyncTime, formatEuro, formatNumber, formatTry, monthLabel, monthRange, todayISO } from '../lib/format'
import {
  createProfitDistribution,
  fetchProfitDistributionLedger,
  profitDistributionErrorMessage,
  saveProfitShareSettings,
} from '../lib/profit-distributions'
import { supabase } from '../lib/supabase'
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
} from '../../profit-loss-metrics.js'
import { locationLabel } from '../../turkish-formatters.js'

const PAGE_SIZE = 1000
const FIRST_PROFIT_MONTH = '2026-07'

type SettingsMap = Map<string, any>
const profitLocationLabel = (location: string) => location === 'daily_chauffeur' ? 'Günlük araç + şoför' : locationLabel(location)

function isStaleDistributionWriteError(error: unknown) {
  const details = error && typeof error === 'object' ? error as { code?: unknown; message?: unknown } : {}
  const code = typeof details.code === 'string' ? details.code.toLowerCase() : ''
  const message = typeof details.message === 'string' ? details.message.toLowerCase() : ''
  return code === '23p01'
    || message.includes('stale or not contiguous')
    || message.includes('overlap')
}

async function fetchAllBookings() {
  const bookings: Booking[] = []
  for (let from = 0; ; from += PAGE_SIZE) {
    const { data, error } = await supabase.from('bookings')
      .select('id, booking_ref, customer_name, pickup_location, dropoff_location, pickup_date, return_date, service_end_date, trip_type, price_eur, daily_rate_eur, service_cost_mode, sold_transfer_cost_try, status, created_at, manual_outbound_distance_km, manual_return_distance_km, chauffeur_hire_days(id, service_date, day_number, status, distance_km, fuel_amount_eur, fuel_paid)')
      .order('created_at', { ascending: true }).range(from, from + PAGE_SIZE - 1)
    if (error) throw error
    const rows = (data ?? []) as Booking[]
    bookings.push(...rows)
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
      <label className="profit-input-field"><span>EUR/TL kuru</span><div><b>₺</b><input type="number" min="0.01" max="10000" step="0.0001" inputMode="decimal" value={rate} onChange={e => setRate(e.target.value)} required /></div><small>1 € karşılığı</small></label>
      <label className="profit-input-field profit-input-wide"><span>Reklam gideri</span><div><b>₺</b><input type="number" min="0" max="1000000000" step="0.01" inputMode="decimal" value={advertising} onChange={e => setAdvertising(e.target.value)} required /></div><small>Bu aya ait toplam reklam harcaması</small></label>
    </div>
    <button className="btn profit-save-button" type="submit" disabled={saving}>{saving ? 'Kaydediliyor…' : 'Ayarları kaydet ve hesapla'}</button>
    <div className="inline-success" role="status">{success}</div><div className="inline-error">{error}</div>
  </form>
}

function DistanceEditor({ leg, onSave, currentKm, triggerLabel }: {
  leg: any
  onSave: (leg: any, distanceKm: number) => Promise<void>
  currentKm?: number
  triggerLabel?: string
}) {
  const label = triggerLabel || (currentKm ? 'KM düzenle' : 'KM gir')
  const [editing, setEditing] = useState(false)
  const [value, setValue] = useState(currentKm ? String(currentKm) : '')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const openEditor = () => {
    setValue(currentKm ? String(currentKm) : '')
    setError('')
    setEditing(true)
  }
  const submit = async (event: FormEvent) => {
    event.preventDefault()
    const distanceKm = Number(value.replace(',', '.'))
    setError('')
    if (!Number.isFinite(distanceKm) || distanceKm <= 0 || distanceKm > 5000) {
      setError('0 ile 5.000 arasında geçerli bir tek yön KM girin.')
      return
    }
    setSaving(true)
    try {
      await onSave(leg, distanceKm)
      setEditing(false)
    } catch {
      setError('KM kaydedilemedi, tekrar deneyin.')
    } finally {
      setSaving(false)
    }
  }

  return <>
    <button className="profit-warning-action is-primary" type="button" onClick={openEditor}>{label}</button>
    {editing && <form className="profit-km-form" onSubmit={submit} noValidate>
      <label><span>Tek yön KM</span><input type="number" min="0.01" max="5000" step="0.01" inputMode="decimal" value={value} onChange={event => setValue(event.target.value)} autoFocus required /></label>
      <button type="submit" disabled={saving}>{saving ? 'Kaydediliyor…' : 'Kaydet ve hesapla'}</button>
      <button type="button" disabled={saving} onClick={() => { setEditing(false); setError('') }}>İptal</button>
      {error && <div className="inline-error" role="alert">{error}</div>}
    </form>}
  </>
}

function DistanceActionRow({ leg, period, navigate, onSave, currentKm }: {
  leg: any
  period: string
  navigate: Navigate
  onSave: (leg: any, distanceKm: number) => Promise<void>
  currentKm?: number
}) {
  const detailHash = `#detail/${encodeURIComponent(leg.bookingRef)}?from=profit-loss&profitPeriod=${encodeURIComponent(period)}${leg.leg === 'return' ? '&leg=return' : ''}`

  return <li className="profit-warning-row">
    <div className="profit-warning-main">
      <span><strong>{leg.bookingRef || leg.customerName || 'Kayıt'}</strong><em>{leg.leg === 'return' ? 'Dönüş' : 'Gidiş'} · {fmtDetailDate(leg.date)}</em></span>
      <small>{profitLocationLabel(leg.from)} → {profitLocationLabel(leg.to)}</small>
    </div>
    <div className="profit-warning-actions">
      <button className="profit-warning-action" type="button" onClick={() => navigate(detailHash)}>Seyahate git</button>
      <DistanceEditor leg={leg} onSave={onSave} currentKm={currentKm} />
    </div>
  </li>
}

function SupplierCostEditor({ booking, currentCostTry, onSave }: {
  booking: Booking
  currentCostTry: number
  onSave: (booking: Booking, totalCostTry: number) => Promise<void>
}) {
  const [editing, setEditing] = useState(false)
  const [value, setValue] = useState(currentCostTry > 0 ? String(currentCostTry) : '')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const openEditor = () => {
    setValue(currentCostTry > 0 ? String(currentCostTry) : '')
    setError('')
    setEditing(true)
  }
  const submit = async (event: FormEvent) => {
    event.preventDefault()
    const totalCostTry = Number(value.replace(',', '.'))
    setError('')
    if (!Number.isFinite(totalCostTry) || totalCostTry <= 0 || totalCostTry > 9_999_999.99) {
      setError('0 ile 9.999.999,99 arasında geçerli bir toplam maliyet girin.')
      return
    }
    setSaving(true)
    try {
      await onSave(booking, totalCostTry)
      setEditing(false)
    } catch {
      setError('Maliyet kaydedilemedi, tekrar deneyin.')
    } finally {
      setSaving(false)
    }
  }

  return <>
    <button className="profit-warning-action is-primary" type="button" onClick={openEditor}>Maliyet düzenle</button>
    {editing && <form className="profit-km-form" onSubmit={submit} noValidate>
      <label><span>Toplam tedarikçi maliyeti (₺)</span><input type="number" min="0.01" max="9999999.99" step="0.01" inputMode="decimal" value={value} onChange={event => setValue(event.target.value)} autoFocus required /></label>
      <button type="submit" disabled={saving}>{saving ? 'Kaydediliyor…' : 'Kaydet'}</button>
      <button type="button" disabled={saving} onClick={() => { setEditing(false); setError('') }}>İptal</button>
      {error && <div className="inline-error" role="alert">{error}</div>}
    </form>}
  </>
}

function CostModeToggle({ booking, onSave }: {
  booking: Booking
  onSave: (booking: Booking, nextMode: Booking['service_cost_mode']) => Promise<void>
}) {
  const [savingMode, setSavingMode] = useState<Booking['service_cost_mode'] | ''>('')

  const toggle = async (nextMode: Booking['service_cost_mode']) => {
    if (booking.trip_type === 'daily_chauffeur' || booking.service_cost_mode === nextMode) return
    setSavingMode(nextMode)
    try {
      await onSave(booking, nextMode)
    } finally {
      setSavingMode('')
    }
  }

  return <div className="profit-cost-toggle" role="group" aria-label="Maliyet modeli">
    <button
      className={booking.service_cost_mode === 'own_vehicle' ? 'is-active' : ''}
      type="button"
      disabled={Boolean(savingMode) || booking.trip_type === 'daily_chauffeur'}
      onClick={() => void toggle('own_vehicle')}
    >
      {savingMode === 'own_vehicle' ? 'Kaydediliyor…' : 'Kendi aracımız'}
    </button>
    <button
      className={booking.service_cost_mode === 'sold_transfer' ? 'is-active' : ''}
      type="button"
      disabled={Boolean(savingMode) || booking.trip_type === 'daily_chauffeur'}
      onClick={() => void toggle('sold_transfer')}
    >
      {savingMode === 'sold_transfer' ? 'Kaydediliyor…' : 'Satılan transfer'}
    </button>
  </div>
}

function TravelHistorySection({ metrics, period, bookings, navigate, onSaveDistance, onSaveSupplierCost, onSaveCostMode }: {
  metrics: any
  period: string
  bookings: Booking[]
  navigate: Navigate
  onSaveDistance: (leg: any, distanceKm: number) => Promise<void>
  onSaveSupplierCost: (booking: Booking, totalCostTry: number) => Promise<void>
  onSaveCostMode: (booking: Booking, nextMode: Booking['service_cost_mode']) => Promise<void>
}) {
  const bookingMap = useMemo(() => new Map(bookings.map(booking => [booking.id, booking])), [bookings])
  const legs = useMemo(() => {
    return [...metrics.resolvedLegs, ...metrics.unresolvedLegs].sort((left: any, right: any) => {
      const dateCompare = String(right.date ?? '').localeCompare(String(left.date ?? ''))
      if (dateCompare !== 0) return dateCompare
      return String(right.bookingRef ?? '').localeCompare(String(left.bookingRef ?? ''))
    })
  }, [metrics.resolvedLegs, metrics.unresolvedLegs])

  if (!legs.length) {
    return <section className="budget-section profit-routes">
      <div className="budget-section-heading"><div><span className="budget-section-kicker">SEYAHAT GEÇMİŞİ</span><h2>Tüm seyahatler</h2></div><span>0 sefer</span></div>
      <div className="travel-history-empty">Seçilen dönemde listelenecek gerçekleşmiş sefer yok.</div>
    </section>
  }

  return <section className="budget-section profit-trip-history">
    <div className="budget-section-heading"><div><span className="budget-section-kicker">SEYAHAT GEÇMİŞİ</span><h2>Tüm seyahatler</h2></div><span>{legs.length} sefer · en yeni üstte</span></div>
    <p className="profit-trip-history-note">Bu listede kendi araç seferlerinde tek yön KM, satılan transferlerde toplam tedarikçi maliyeti doğrudan güncellenir.</p>
    <ul className="profit-trip-history-list">
      {legs.map((leg: any) => {
        const booking = bookingMap.get(leg.bookingId)
        const isDailyChauffeur = leg.isDailyChauffeur
        const currentMode = booking?.service_cost_mode === 'sold_transfer' ? 'sold_transfer' : 'own_vehicle'
        const isSoldTransfer = currentMode === 'sold_transfer'
        const isUnresolved = leg.oneWayKm == null && !isSoldTransfer && !isDailyChauffeur
        const detailHash = `#detail/${encodeURIComponent(leg.bookingRef)}?from=profit-loss&profitPeriod=${encodeURIComponent(period)}${leg.leg === 'return' ? '&leg=return' : ''}`
        const costSummary = isSoldTransfer
          ? `Tedarikçi gideri: ${formatTry(leg.supplierCostTry ?? 0)}${leg.bookingRef ? ' · rezervasyon toplamı düzenlenir' : ''}`
          : isDailyChauffeur
            ? `Araç maliyeti: ${formatTry(leg.vehicleCostTry ?? 0)} · Gerçek KM: ${formatNumber(leg.oneWayKm ?? 0, 1)} km`
            : isUnresolved
              ? 'Araç maliyeti hesaplanamadı · tek yön KM bekleniyor'
              : `Araç maliyeti: ${formatTry(leg.vehicleCostTry ?? 0)} · Tek yön ${formatNumber(leg.oneWayKm ?? 0, 1)} km`
        return <li className="profit-trip-history-row" key={`${leg.bookingId}:${leg.leg}`}>
          <div className="profit-trip-history-main">
            <div className="profit-trip-history-top">
              <strong>{leg.bookingRef || leg.customerName || 'Kayıt'}</strong>
              <span>{leg.leg === 'return' ? 'Dönüş' : isDailyChauffeur ? 'Günlük hizmet' : 'Gidiş'} · {fmtDetailDate(leg.date)}</span>
            </div>
            <div className="profit-trip-history-route">{profitLocationLabel(leg.from)} → {profitLocationLabel(leg.to)}</div>
            <div className="profit-trip-history-meta">
              <span>Gelir: {formatEuro(leg.revenueEur ?? 0)}</span>
              {booking && !isDailyChauffeur && <span>{currentMode === 'sold_transfer' ? 'Maliyet modeli: Satılan transfer' : 'Maliyet modeli: Kendi aracımız'}</span>}
              <span>{costSummary}</span>
              {!isSoldTransfer && (leg.airportMeetCostTry ?? 0) > 0 && <span>Karşılama: {formatTry(leg.airportMeetCostTry)}</span>}
            </div>
          </div>
          <div className="profit-trip-history-actions">
            <button className="profit-warning-action" type="button" onClick={() => navigate(detailHash)}>Seyahate git</button>
            {booking && !isDailyChauffeur && <CostModeToggle booking={booking} onSave={onSaveCostMode} />}
            {isSoldTransfer && booking && <SupplierCostEditor booking={booking} currentCostTry={Number(booking.sold_transfer_cost_try) || 0} onSave={onSaveSupplierCost} />}
            {!isSoldTransfer && !isDailyChauffeur && <DistanceEditor leg={leg} onSave={onSaveDistance} currentKm={leg.oneWayKm ?? undefined} />}
            {isDailyChauffeur && <span className="profit-trip-history-inline-hint">Günlük KM rezervasyon detayından düzenlenir.</span>}
          </div>
        </li>
      })}
    </ul>
  </section>
}

function ProfitMetrics({ metrics, period, navigate, onSaveDistance, travelHistory }: {
  metrics: any
  period: string
  navigate: Navigate
  onSaveDistance: (leg: any, distanceKm: number) => Promise<void>
  travelHistory?: ReactNode
}) {
  const negative = metrics.netProfitTry < 0
  const formulaOperator = negative ? 'Zarar' : 'Net kâr'
  const manualLegs = metrics.resolvedLegs.filter((leg: any) => leg.distanceSource === 'manual')
  const soldTransferLegs = metrics.resolvedLegs.filter((leg: any) => leg.distanceSource === 'sold-transfer')
  return <>
    <section className={`profit-hero ${negative ? 'is-negative' : 'is-positive'}`} aria-label={formulaOperator}><div className="budget-eyebrow">{period === 'all' ? 'Tüm zamanlar' : monthLabel(period)} · {formulaOperator}</div><div className="profit-total">{formatTry(metrics.netProfitTry)}</div><div className="profit-total-eur">{formatEuro(metrics.netProfitEur)}</div><div className="profit-margin"><span>Kâr marjı</span><strong>%{formatNumber(metrics.profitMargin, 1)}</strong></div></section>
    <section className="profit-formula" aria-label="Kâr hesaplama özeti"><span><small>Gelir</small><strong>{formatTry(metrics.incomeTry)}</strong></span><i>−</i><span><small>Kendi araç</small><strong>{formatTry(metrics.vehicleCostTry)}</strong></span><i>−</i><span><small>Satılan transfer</small><strong>{formatTry(metrics.supplierCostTry)}</strong></span><i>−</i><span><small>Karşılama</small><strong>{formatTry(metrics.airportMeetCostTry)}</strong></span><i>−</i><span><small>Reklam</small><strong>{formatTry(metrics.advertisingExpenseTry)}</strong></span></section>
    <section className="budget-kpi-grid profit-kpi-grid" aria-label="Kâr zarar özeti">
      <article className="budget-kpi profit-income-kpi"><span className="budget-kpi-icon" aria-hidden="true">€</span><span className="budget-kpi-label">Seyahat geliri</span><strong>{formatEuro(metrics.incomeEur)}</strong><small>{formatTry(metrics.incomeTry)} · yalnızca tamamlanan seferler</small></article>
      <article className="budget-kpi profit-distance-kpi"><span className="budget-kpi-icon" aria-hidden="true">KM</span><span className="budget-kpi-label">Toplam araç KM</span><strong>{formatNumber(metrics.vehicleKm)} km</strong><small>Transferlerde boş dönüş; günlük kiralamada gerçek KM</small></article>
      <article className="budget-kpi"><span className="budget-kpi-icon" aria-hidden="true">₺</span><span className="budget-kpi-label">Kendi araç maliyeti</span><strong>{formatTry(metrics.vehicleCostTry)}</strong><small>Toplam araç KM × ayın km maliyeti</small></article>
      <article className="budget-kpi"><span className="budget-kpi-icon" aria-hidden="true">⇄</span><span className="budget-kpi-label">Satılan transfer maliyeti</span><strong>{formatTry(metrics.supplierCostTry)}</strong><small>Manuel girilen toplam tedarikçi gideri</small></article>
      <article className="budget-kpi"><span className="budget-kpi-icon" aria-hidden="true">🛬</span><span className="budget-kpi-label">Karşılama maliyeti</span><strong>{formatEuro(metrics.airportMeetCostEur)}</strong><small>Havalimanından başlayan her seyahat için 5 €</small></article>
      <article className="budget-kpi"><span className="budget-kpi-icon" aria-hidden="true">↗</span><span className="budget-kpi-label">Reklam gideri</span><strong>{formatTry(metrics.advertisingExpenseTry)}</strong><small>Manuel girilen aylık reklam toplamı</small></article>
    </section>
    {metrics.unresolvedLegs.length > 0 && <section className="profit-warning" role="status"><strong>⚠ {metrics.unresolvedLegs.length} seferin sabit mesafesi bulunamadı</strong><p>Seyahat kaydını kontrol edin veya tek yön KM girin. Kaydedilen mesafeye aynı uzunlukta boş dönüş eklenerek araç maliyeti anında yeniden hesaplanır.</p><ul>{metrics.unresolvedLegs.map((leg: any) => <DistanceActionRow key={`${leg.bookingId}:${leg.leg}`} leg={leg} period={period} navigate={navigate} onSave={onSaveDistance} />)}</ul></section>}
    {metrics.missingDailyDistanceCount > 0 && <section className="profit-warning" role="status"><strong>⚠ {metrics.missingDailyDistanceCount} günlük kiralama gününde KM eksik</strong><p>Gelir hesaba katıldı ancak araç maliyeti eksik kalmaması için rezervasyon detayından gerçekleşen günlük kilometreyi girin.</p></section>}
    {soldTransferLegs.length > 0 && <section className="profit-manual-distances"><div className="budget-section-heading"><div><span className="budget-section-kicker">SATILAN TRANSFERLER</span><h2>Manuel gider girilen seferler</h2></div><span>{soldTransferLegs.length} sefer</span></div><p>Bu seferlerde km hesabı yapılmaz; girilen toplam tedarikçi maliyeti doğrudan gider kabul edilir.</p><ul>{soldTransferLegs.map((leg: any) => <li className="profit-warning-row" key={`${leg.bookingId}:${leg.leg}`}><div className="profit-warning-main"><span><strong>{leg.bookingRef || leg.customerName || 'Kayıt'}</strong><em>{leg.leg === 'return' ? 'Dönüş' : 'Gidiş'} · {fmtDetailDate(leg.date)}</em></span><small>{profitLocationLabel(leg.from)} → {profitLocationLabel(leg.to)}</small></div><div className="profit-warning-actions"><strong>{formatTry(leg.supplierCostTry ?? 0)}</strong></div></li>)}</ul></section>}
    {manualLegs.length > 0 && <section className="profit-manual-distances"><div className="budget-section-heading"><div><span className="budget-section-kicker">MANUEL MESAFELER</span><h2>Elle girilen KM kayıtları</h2></div><span>{manualLegs.length} sefer</span></div><p>Bu değerleri gerektiğinde seyahate göre yeniden düzenleyebilirsiniz.</p><ul>{manualLegs.map((leg: any) => <DistanceActionRow key={`${leg.bookingId}:${leg.leg}`} leg={leg} period={period} navigate={navigate} onSave={onSaveDistance} currentKm={leg.oneWayKm} />)}</ul></section>}
    {travelHistory}
    <section className="budget-section profit-routes"><div className="budget-section-heading"><div><span className="budget-section-kicker">ROTA DÖKÜMÜ</span><h2>Seyahatlerden gelen hesap</h2></div><span>{metrics.completedLegs} sefer</span></div>{metrics.routes.length ? metrics.routes.map((route: any) => <div className="profit-route-row" key={route.routeKey}><div className="profit-route-heading"><strong>{profitLocationLabel(route.from)} ↔ {profitLocationLabel(route.to)}</strong><span>{route.legCount} sefer</span></div><div className="profit-route-metrics"><span><small>Araç KM</small><b>{formatNumber(route.vehicleKm)} km</b></span><span><small>Gelir</small><b>{formatEuro(route.incomeEur)}</b></span><span><small>Kendi araç maliyeti</small><b>{formatTry(route.vehicleCostTry)}</b></span><span><small>Satılan transfer maliyeti</small><b>{formatTry(route.supplierCostTry)}</b></span></div></div>) : <div className="travel-history-empty">Seçilen dönemde tamamlanmış ve sabit mesafesi bulunan sefer yok.</div>}</section>
    <p className="budget-footnote profit-footnote">İptal edilen ve henüz gerçekleşmemiş seferler hesaba katılmaz. Gidiş-dönüş fiyatı iki seyahat ayağına eşit bölünür. `Kendi aracımız` seçilirse havalimanından başlayan her seyahat için 5 € karşılama maliyeti eklenir ve transferlerde her yolculu mesafesine aynı uzunlukta boş dönüş eklenir. `Satılan transfer` seçilirse girilen toplam tedarikçi maliyeti doğrudan gider sayılır; km ve karşılama maliyeti uygulanmaz. Günlük kiralamalarda gelir hizmet günlerine dağıtılır ve admin detayına girilen gerçek kilometre kullanılır; müşterinin ayrıca ödediği yakıt tutarı gelire eklenmez.</p>
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

  const refreshDistributionLedger = useCallback(async () => {
    setDistributionLoading(true)
    setDistributionError('')
    try {
      const ledger = await fetchProfitDistributionLedger()
      setShareSettings(ledger.settings)
      setDistributions(ledger.distributions)
    } catch (ledgerError) {
      setDistributionError(profitDistributionErrorMessage(ledgerError))
    } finally {
      setDistributionLoading(false)
    }
  }, [])

  const refresh = useCallback(async () => {
    setLoading(true); setError(false); setStatus('Seyahatler ve ayarlar yenileniyor…')
    const distributionRefresh = refreshDistributionLedger()
    try {
      const [nextBookings, nextSettings] = await Promise.all([fetchAllBookings(), fetchSettings()])
      setBookings(nextBookings); setSettings(nextSettings); setStatus(`Seyahatlerle senkron · Son güncelleme: ${fmtSyncTime()}`)
    } catch { setError(true); setStatus('Bağlantı veya veri tabanı hatası') }
    finally { setLoading(false) }
    await distributionRefresh
  }, [refreshDistributionLedger])
  useEffect(() => { void refresh() }, [refresh])
  const metrics = useMemo(() => calculateProfitLossMetrics(bookings, period, today, settings), [bookings, period, settings, today])
  const saveSetting = (month: string, value: any) => setSettings(current => new Map(current).set(month, value))
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
    })
    if (currentMetrics.blockers.length > 0 || !currentMetrics.canDistribute || currentMetrics.netProfitEur <= 0) {
      throw new Error('Dağıtım bilgileri güncellendi. Lütfen hesaplamayı kontrol edip tekrar deneyin.')
    }
    const snapshot = Object.freeze(buildProfitDistributionSnapshot(currentMetrics))
    try {
      await createProfitDistribution({ ...input, snapshot })
    } catch (writeError) {
      const message = profitDistributionErrorMessage(writeError)
      if (isStaleDistributionWriteError(writeError)) await refreshDistributionLedger()
      throw new Error(message)
    }
    await refresh()
  }
  const saveDistance = async (leg: any, distanceKm: number) => {
    const column = leg.leg === 'return' ? 'manual_return_distance_km' : 'manual_outbound_distance_km'
    const payload = { [column]: distanceKm }
    const { data, error: saveError } = await supabase.from('bookings')
      .update(payload)
      .eq('id', leg.bookingId)
      .select(`id, ${column}`).single()
    if (saveError || !data) throw saveError ?? new Error('KM kaydı dönmedi')
    const savedDistance = Number((data as Record<string, unknown>)[column])
    setBookings(current => current.map(booking => booking.id === leg.bookingId ? { ...booking, [column]: savedDistance } : booking))
    setStatus(`${leg.bookingRef || 'Seyahat'} için tek yön ${formatNumber(savedDistance, 2)} km kaydedildi · Hesap güncellendi`)
  }
  const saveSupplierCost = async (booking: Booking, totalCostTry: number) => {
    const { data, error: saveError } = await supabase.from('bookings')
      .update({ sold_transfer_cost_try: totalCostTry })
      .eq('id', booking.id)
      .select('id, sold_transfer_cost_try').single()
    if (saveError || !data) throw saveError ?? new Error('Maliyet kaydı dönmedi')
    const savedCost = Number((data as Record<string, unknown>).sold_transfer_cost_try)
    setBookings(current => current.map(item => item.id === booking.id ? { ...item, sold_transfer_cost_try: savedCost } : item))
    setStatus(`${booking.booking_ref || 'Seyahat'} için toplam tedarikçi maliyeti ${formatTry(savedCost)} olarak kaydedildi · Hesap güncellendi`)
  }
  const saveCostMode = async (booking: Booking, nextMode: Booking['service_cost_mode']) => {
    const { data, error: saveError } = await supabase.from('bookings')
      .update({ service_cost_mode: nextMode })
      .eq('id', booking.id)
      .select('id, service_cost_mode').single()
    if (saveError || !data) throw saveError ?? new Error('Maliyet modeli kaydı dönmedi')
    const savedMode = (data as Record<string, unknown>).service_cost_mode as Booking['service_cost_mode']
    setBookings(current => current.map(item => item.id === booking.id ? { ...item, service_cost_mode: savedMode } : item))
    setStatus(`${booking.booking_ref || 'Seyahat'} için maliyet modeli ${savedMode === 'sold_transfer' ? 'satılan transfer' : 'kendi aracımız'} olarak kaydedildi · Hesap güncellendi`)
  }
  return <><Topbar navigate={navigate} /><AdminTabs active="profit-loss" navigate={navigate} />
    <div className="budget-toolbar profit-toolbar"><div className="budget-periods" role="group" aria-label="Kâr zarar dönemi">{[...months, 'all'].map(value => <button type="button" key={value} className={period === value ? 'active' : ''} onClick={() => setPeriod(value)}>{value === 'all' ? 'Tümü' : monthLabel(value, { short: true })}</button>)}</div><button className="sync-button" type="button" aria-label="Kâr zarar verilerini yenile" disabled={loading} onClick={() => void refresh()}>↻</button></div>
    <div className="budget-update-status">{status}</div>
    <main className="scroll-area budget-content profit-content">
      {error ? <div className="empty"><div className="empty-icon">₺</div><div>Kâr/zarar verileri yüklenemedi.</div></div> : loading && !bookings.length ? <><div className="empty"><div>Ayarlar yükleniyor…</div></div><div className="empty"><div>Hesaplanıyor…</div></div></> : <>{period === 'all' ? <section className="profit-settings profit-settings-summary"><div><span className="budget-section-kicker">HESAPLAMA AYARLARI</span><h2>Aylık değerler uygulanıyor</h2><p>Tümü görünümünde her aya kaydettiğiniz km maliyeti, reklam gideri ve kur ayrı ayrı kullanılır.</p></div></section> : <SettingsForm key={period} period={period} settings={settings} onSaved={saveSetting} />}<ProfitDistributionSection today={distributionToday} bookings={bookings} settingsByMonth={settings} shareSettings={shareSettings} distributions={distributions} loading={distributionLoading} error={distributionError} onRetry={() => void refreshDistributionLedger()} onSaveSettings={saveShareSettings} onCreateDistribution={confirmDistribution} navigate={navigate} /><ProfitMetrics metrics={metrics} period={period} navigate={navigate} onSaveDistance={saveDistance} travelHistory={<TravelHistorySection metrics={metrics} period={period} bookings={bookings} navigate={navigate} onSaveDistance={saveDistance} onSaveSupplierCost={saveSupplierCost} onSaveCostMode={saveCostMode} />} /></>}
    </main>
  </>
}
