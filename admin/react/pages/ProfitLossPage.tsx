import { useCallback, useEffect, useMemo, useState, type FormEvent, type ReactNode } from 'react'
import { AdminTabs, Topbar } from '../components/AdminChrome'
import { ProfitDistributionSection } from '../components/ProfitDistributionSection'
import {
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

async function fetchAllBookings() {
  const bookings: Booking[] = []
  for (let from = 0; ; from += PAGE_SIZE) {
    const { data, error } = await supabase.from('bookings')
      .select('id, booking_ref, customer_name, pickup_location, dropoff_location, pickup_date, return_date, service_end_date, trip_type, price_eur, daily_rate_eur, service_cost_mode, sold_transfer_cost_try, return_service_cost_mode, return_sold_transfer_cost_try, airport_meet_fee_applies, status, created_at, manual_outbound_distance_km, manual_return_distance_km, chauffeur_hire_days(id, service_date, day_number, status, distance_km, fuel_amount_eur, fuel_paid)')
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

function TravelHistorySection({ metrics, period, bookings, navigate, focusedLegKey, onSaveDistance, onSaveSupplierCost, onSaveCostMode }: {
  metrics: any
  period: string
  bookings: Booking[]
  navigate: Navigate
  focusedLegKey: string | null
  onSaveDistance: (leg: ProfitLegRef, distanceKm: number) => Promise<void>
  onSaveSupplierCost: (booking: Booking, leg: LegKey, costTry: number) => Promise<void>
  onSaveCostMode: (booking: Booking, leg: LegKey, nextMode: CostMode) => Promise<void>
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
    <p className="profit-trip-history-note">Bu listede kendi araç seferlerinde tek yön KM, satılan transferlerde tedarikçi maliyeti doğrudan güncellenir. Gidiş ve dönüş ayrı ayrı ayarlanır.</p>
    <ul className="profit-trip-history-list">
      {legs.map((leg: any) => {
        const booking = bookingMap.get(leg.bookingId)
        const isDailyChauffeur = leg.isDailyChauffeur
        const legKey: LegKey = toLegKey(leg.leg)
        const legLabel = legKey === 'return' ? 'Dönüş' : 'Gidiş'
        const currentMode = legCostMode(booking, legKey)
        const isSoldTransfer = currentMode === 'sold_transfer'
        const legCostTry = booking
          ? Number(booking[legCostColumns(legKey).cost]) || 0
          : 0
        const isUnresolved = leg.oneWayKm == null && !isSoldTransfer && !isDailyChauffeur
        const detailHash = `#detail/${encodeURIComponent(leg.bookingRef)}?from=profit-loss&profitPeriod=${encodeURIComponent(period)}${leg.leg === 'return' ? '&leg=return' : ''}`
        const costSummary = isSoldTransfer
          ? `Tedarikçi gideri: ${formatTry(leg.supplierCostTry ?? 0)}${leg.bookingRef ? ` · ${legLabel.toLocaleLowerCase('tr-TR')} ayağı düzenlenir` : ''}`
          : isDailyChauffeur
            ? `Araç maliyeti: ${formatTry(leg.vehicleCostTry ?? 0)} · Gerçek KM: ${formatNumber(leg.oneWayKm ?? 0, 1)} km`
            : isUnresolved
              ? 'Araç maliyeti hesaplanamadı · tek yön KM bekleniyor'
              : `Araç maliyeti: ${formatTry(leg.vehicleCostTry ?? 0)} · Tek yön ${formatNumber(leg.oneWayKm ?? 0, 1)} km`
        // Sefer bazlı net kâr = gelir − araç − tedarikçi − karşılama. Reklam
        // aylık toplu gider olduğu için sefere yansıtılmaz (kâr/zarar özetinde ayrı gösterilir).
        const netProfitTry = (leg.revenueTry ?? 0) - (leg.vehicleCostTry ?? 0) - (leg.supplierCostTry ?? 0) - (leg.airportMeetCostTry ?? 0)
        const netProfitEur = leg.eurTryRate ? netProfitTry / leg.eurTryRate : (leg.revenueEur ?? 0)
        const rowKey = `${leg.bookingId}:${leg.leg}`
        const needsAttention = isUnresolved || (isSoldTransfer && legCostTry <= 0) || leg.distanceSource === 'daily-missing'
        return <li
          className={`profit-trip-history-row${needsAttention ? ' is-incomplete' : ''}${focusedLegKey === rowKey ? ' is-focused' : ''}`}
          id={legTargetId(leg.bookingId, leg.leg)}
          key={rowKey}
        >
          <div className="profit-trip-history-main">
            <div className="profit-trip-history-top">
              <strong>{leg.bookingRef || leg.customerName || 'Kayıt'}</strong>
              <span>{leg.leg === 'return' ? 'Dönüş' : isDailyChauffeur ? 'Günlük hizmet' : 'Gidiş'} · {fmtDetailDate(leg.date)}</span>
            </div>
            {needsAttention && <p className="profit-leg-badge is-warning">{leg.distanceSource === 'daily-missing'
              ? 'Günlük hizmet KM bilgisi eksik'
              : isUnresolved ? 'Tek yön KM bilgisi eksik' : 'Tedarikçi maliyeti eksik'}</p>}
            <div className="profit-trip-history-route">{profitLocationLabel(leg.from)} → {profitLocationLabel(leg.to)}</div>
            {!isUnresolved && <div className={`profit-trip-history-net ${netProfitTry < 0 ? 'is-negative' : 'is-positive'}`}>
              <span>Net kâr</span><strong>{formatTry(netProfitTry)}</strong><em>{formatEuro(netProfitEur)}</em>
            </div>}
            <div className="profit-trip-history-meta">
              <span>Gelir: {formatEuro(leg.revenueEur ?? 0)}</span>
              {booking && !isDailyChauffeur && <span>{`${legLabel} maliyet modeli: ${currentMode === 'sold_transfer' ? 'Satılan transfer' : 'Kendi aracımız'}`}</span>}
              <span>{costSummary}</span>
              {!isSoldTransfer && (leg.airportMeetCostTry ?? 0) > 0 && <span>Karşılama: {formatTry(leg.airportMeetCostTry)}</span>}
              {(leg as any).eurTryRate != null && (
                <span>Kur: ₺{((leg as any).eurTryRate as number).toFixed(2)}</span>
              )}
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
              onSaveDistance={onSaveDistance}
              onSaveCostMode={onSaveCostMode}
              onSaveSupplierCost={onSaveSupplierCost}
            />}
            {isDailyChauffeur && <span className="profit-trip-history-inline-hint">Günlük KM rezervasyon detayından düzenlenir.</span>}
            <button className="profit-leg-action is-ghost" type="button" onClick={() => navigate(detailHash)}>Seyahate git</button>
          </div>
        </li>
      })}
    </ul>
  </section>
}

function ProfitHero({ metrics, period }: { metrics: any; period: string }) {
  const negative = metrics.netProfitTry < 0
  const formulaOperator = negative ? 'Zarar' : 'Net kâr'
  return <section className={`profit-hero ${negative ? 'is-negative' : 'is-positive'}`} aria-label={formulaOperator}><div className="budget-eyebrow">{period === 'all' ? 'Tüm zamanlar' : monthLabel(period)} · {formulaOperator}</div><div className="profit-total">{formatTry(metrics.netProfitTry)}</div><div className="profit-total-eur">{formatEuro(metrics.netProfitEur)}</div><div className="profit-margin"><span>Kâr marjı</span><strong>%{formatNumber(metrics.profitMargin, 1)}</strong></div></section>
}

function ProfitMetrics({ metrics, period, navigate, onFocusLeg }: {
  metrics: any
  period: string
  navigate: Navigate
  onFocusLeg: (leg: ProfitLegRef & { date?: string | null }) => void
}) {
  const missingDailyLegs = metrics.resolvedLegs.filter((leg: any) => leg.distanceSource === 'daily-missing')
  const pendingLegs = [...metrics.unresolvedLegs, ...missingDailyLegs]
  return <>
    <section className="budget-kpi-grid profit-kpi-grid" aria-label="Kâr zarar özeti">
      <article className="budget-kpi profit-income-kpi"><span className="budget-kpi-icon" aria-hidden="true">€</span><span className="budget-kpi-label">Seyahat geliri</span><strong>{formatEuro(metrics.incomeEur)}</strong><small>{formatTry(metrics.incomeTry)} · tamamlanan seferler</small></article>
      <article className="budget-kpi"><span className="budget-kpi-icon" aria-hidden="true">₺</span><span className="budget-kpi-label">Toplam gider</span><strong>{formatTry(metrics.totalExpenseTry)}</strong><small>Tüm operasyonel giderler</small></article>
      <article className="budget-kpi"><span className="budget-kpi-icon" aria-hidden="true">↗</span><span className="budget-kpi-label">Gerçekleşen sefer</span><strong>{formatNumber(metrics.completedLegs)}</strong><small>Seçilen dönemdeki hizmet ayakları</small></article>
    </section>
    {pendingLegs.length > 0 && <ExpandableSection title="İşlem bekleyen kayıtlar" detail={`${pendingLegs.length} kayıt`}>
      <p className="profit-panel-note">Tek yön KM eksikse aşağıdaki seyahat listesinden doğrudan girilebilir; günlük hizmet KM bilgisi rezervasyon detayından güncellenir.</p>
      <ul className="profit-action-list">{pendingLegs.map((leg: any) => {
        const dailyMissing = leg.distanceSource === 'daily-missing'
        const detailHash = `#detail/${encodeURIComponent(leg.bookingRef)}?from=profit-loss&profitPeriod=${encodeURIComponent(period)}${leg.leg === 'return' ? '&leg=return' : ''}`
        return <li key={`${leg.bookingId}:${leg.leg}`}>
          <span>
            <strong>{leg.bookingRef || leg.customerName || 'Kayıt'}</strong>
            <small>{legLabelFor(leg.leg)} · {dailyMissing ? 'Günlük hizmet KM bilgisi eksik' : 'Tek yön KM bilgisi eksik'}</small>
          </span>
          {dailyMissing
            ? <button className="profit-leg-action is-primary" type="button" onClick={() => navigate(detailHash)}>Kaydı aç</button>
            : <button className="profit-leg-action is-primary" type="button" onClick={() => onFocusLeg(leg)}>KM gir</button>}
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
  const [focusedLeg, setFocusedLeg] = useState<{ bookingId: string; leg: string } | null>(null)

  /**
   * Uyarı kartlarından seyahat listesindeki satıra götürür. Liste seçili döneme
   * göre filtrelendiği için ayak başka bir aya aitse önce o döneme geçilir;
   * aksi halde satır ekranda hiç bulunmaz ve eksik bilgi düzeltilemez.
   */
  const focusLeg = useCallback((leg: ProfitLegRef & { date?: string | null }) => {
    const legMonth = typeof leg.date === 'string' ? leg.date.slice(0, 7) : ''
    if (legMonth && period !== 'all' && legMonth !== period) {
      setPeriod(months.includes(legMonth) ? legMonth : 'all')
    }
    setFocusedLeg({ bookingId: leg.bookingId, leg: leg.leg })
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
  // Bir ayağa maliyet girmek o ayağı satılan transfer yapar; sütun kısıtı
  // model ile bedelin birlikte tutarlı olmasını şart koştuğu için tek update.
  const saveSupplierCost = async (booking: Booking, leg: LegKey, costTry: number) => {
    const columns = legCostColumns(leg)
    const legLabel = leg === 'return' ? 'dönüş' : 'gidiş'
    const { data, error: saveError } = await supabase.from('bookings')
      .update({ [columns.cost]: costTry, [columns.mode]: 'sold_transfer' })
      .eq('id', booking.id)
      .select(`id, ${columns.mode}, ${columns.cost}`).single()
    if (saveError || !data) throw saveError ?? new Error('Maliyet kaydı dönmedi')
    const saved = data as Record<string, unknown>
    const savedCost = Number(saved[columns.cost])
    setBookings(current => current.map(item => item.id === booking.id
      ? { ...item, [columns.mode]: saved[columns.mode], [columns.cost]: savedCost }
      : item))
    setStatus(`${booking.booking_ref || 'Seyahat'} için ${legLabel} tedarikçi maliyeti ${formatTry(savedCost)} olarak kaydedildi · Hesap güncellendi`)
  }
  const saveCostMode = async (booking: Booking, leg: LegKey, nextMode: CostMode) => {
    const columns = legCostColumns(leg)
    const legLabel = leg === 'return' ? 'dönüş' : 'gidiş'
    // `own_vehicle`e dönerken maliyet sıfırlanmalı; sütun kısıtı ikisinin
    // tutarlı olmasını şart koşuyor. Satılan transfere geçiş yalnızca kayıtlı
    // bir bedel varken gelir (aksi halde önce düzenleyici açılır).
    const update: Record<string, unknown> = nextMode === 'own_vehicle'
      ? { [columns.mode]: nextMode, [columns.cost]: null }
      : { [columns.mode]: nextMode }
    const { data, error: saveError } = await supabase.from('bookings')
      .update(update)
      .eq('id', booking.id)
      .select(`id, ${columns.mode}, ${columns.cost}`).single()
    if (saveError || !data) throw saveError ?? new Error('Maliyet modeli kaydı dönmedi')
    const saved = data as Record<string, unknown>
    setBookings(current => current.map(item => item.id === booking.id
      ? { ...item, [columns.mode]: saved[columns.mode], [columns.cost]: saved[columns.cost] }
      : item))
    setStatus(`${booking.booking_ref || 'Seyahat'} için ${legLabel} maliyet modeli ${saved[columns.mode] === 'sold_transfer' ? 'satılan transfer' : 'kendi aracımız'} olarak kaydedildi · Hesap güncellendi`)
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
      {error ? <div className="empty"><div className="empty-icon">₺</div><div>Kâr/zarar verileri yüklenemedi.</div></div> : loading && !bookings.length ? <><div className="empty"><div>Ayarlar yükleniyor…</div></div><div className="empty"><div>Hesaplanıyor…</div></div></> : <><ProfitHero metrics={metrics} period={period} /><ProfitDistributionSection today={distributionToday} bookings={bookings} settingsByMonth={settings} ratesByDate={ratesByDate} shareSettings={shareSettings} distributions={distributions} loading={distributionLoading} error={distributionError} onRetry={() => void refreshDistributionLedger()} onSaveSettings={saveShareSettings} onCreateDistribution={confirmDistribution} onSaveDistance={saveDistance} onSaveSupplierCost={saveSupplierCost} onSaveCostMode={saveCostMode} onFocusLeg={focusLeg} navigate={navigate} /><ProfitMetrics metrics={metrics} period={period} navigate={navigate} onFocusLeg={focusLeg} /><TravelHistorySection metrics={metrics} period={period} bookings={bookings} navigate={navigate} focusedLegKey={focusedLeg ? `${focusedLeg.bookingId}:${focusedLeg.leg}` : null} onSaveDistance={saveDistance} onSaveSupplierCost={saveSupplierCost} onSaveCostMode={saveCostMode} /><ExpandableSection title="Hesaplama ayarları" detail={period === 'all' ? 'Aylık değerler uygulanıyor' : monthLabel(period)}>{period === 'all' ? <p className="profit-panel-note">Tümü görünümünde her ayın KM maliyeti, reklam gideri ve EUR/TL kuru ayrı ayrı kullanılır.</p> : <SettingsForm key={period} period={period} settings={settings} onSaved={saveSetting} />}</ExpandableSection></>}
    </main>
  </>
}
