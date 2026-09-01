import { useCallback, useEffect, useMemo, useState, type FormEvent, type ReactNode } from 'react'
import { AdminTabs, Topbar } from '../components/AdminChrome'
import { ProfitDistributionSection } from '../components/ProfitDistributionSection'
import { ProfitLedgerGrid, type LedgerLeg } from '../components/ProfitLedgerGrid'
import {
  COST_MODE_LABELS,
  legCostColumns,
  toLegKey,
  type CostMode,
  type LegKey,
  type ProfitLegRef,
} from '../components/LegCostEditors'
import { berlinTodayISO, fmtLongDate, fmtSyncTime, formatEuro, formatNumber, formatTry, monthLabel, monthRange, todayISO } from '../lib/format'
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
  calculateLedgerForRange,
  DEFAULT_EUR_TRY_RATE,
  DEFAULT_KM_COST_TRY,
  isProfitRelevantBooking,
} from '../../profit-loss-metrics.js'

const PAGE_SIZE = 1000
const FIRST_PROFIT_MONTH = '2026-07'

type SettingsMap = Map<string, any>
type LedgerResult = ReturnType<typeof calculateLedgerForRange>

function isStaleDistributionWriteError(error: unknown) {
  const details = error && typeof error === 'object' ? error as { code?: unknown; message?: unknown } : {}
  const code = typeof details.code === 'string' ? details.code.toLowerCase() : ''
  const message = typeof details.message === 'string' ? details.message.toLowerCase() : ''
  return code === '23p01'
    || message.includes('stale or not contiguous')
    || message.includes('overlap')
}

function isISODate(value: string) {
  return /^\d{4}-\d{2}-\d{2}$/.test(value)
}

/** UTC gün kaydırma; tarih aralıkları için kur/DST etkisiz. */
function shiftISODate(value: string, days: number) {
  if (!isISODate(value)) return value
  const date = new Date(`${value}T00:00:00Z`)
  date.setUTCDate(date.getUTCDate() + days)
  return date.toISOString().slice(0, 10)
}

/** Dağıtılmamış dönemin başlangıcı: son dağıtımın bitişinden bir gün sonrası,
 *  yoksa paylaşım başlangıç tarihi, o da yoksa ilk kâr ayının ilk günü. */
function openRangeStart(shareSettings: ProfitShareSettings | null, distributions: ProfitDistribution[]) {
  const latestEnd = distributions.reduce((latest, d) => (d.period_end > latest ? d.period_end : latest), '')
  if (latestEnd) return shiftISODate(latestEnd, 1)
  return shareSettings?.opening_date || `${FIRST_PROFIT_MONTH}-01`
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
    // İptal edilen kayıtlar kâr/zarar ekranının hiçbir bölümüne girmemeli.
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
      <label className="profit-input-field profit-input-wide"><span>Reklam gideri</span><div><b>₺</b><input type="number" min="0" max="1000000000" step="0.01" inputMode="decimal" value={advertising} onChange={e => setAdvertising(e.target.value)} required /></div><small>Bu aya ait toplam reklam harcaması · seferlere dağıtılır</small></label>
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

/** Sabit üst KPI şeridi: net kâr, gelir, toplam gider, marj. */
function KpiStrip({ label, netProfitEur, netProfitTry, incomeTry, totalExpenseTry, profitMargin }: {
  label: string
  netProfitEur: number
  netProfitTry: number
  incomeTry: number
  totalExpenseTry: number
  profitMargin: number
}) {
  const negative = netProfitTry < 0
  return <section className={`profit-kpi-strip ${negative ? 'is-negative' : 'is-positive'}`} aria-label="Kâr zarar özeti">
    <article className="profit-kpi-cell profit-kpi-primary" aria-label={negative ? 'Zarar' : 'Net kâr'}>
      <span className="profit-kpi-label">{label} · {negative ? 'Zarar' : 'Net kâr'}</span>
      <strong>{formatTry(netProfitTry)}</strong>
      <small>{formatEuro(netProfitEur)}</small>
    </article>
    <article className="profit-kpi-cell"><span className="profit-kpi-label">Gelir</span><strong>{formatTry(incomeTry)}</strong></article>
    <article className="profit-kpi-cell"><span className="profit-kpi-label">Toplam gider</span><strong>{formatTry(totalExpenseTry)}</strong></article>
    <article className="profit-kpi-cell"><span className="profit-kpi-label">Kâr marjı</span><strong>%{formatNumber(profitMargin, 1)}</strong></article>
  </section>
}

function ledgerLegs(ledger: LedgerResult): LedgerLeg[] {
  return [...(ledger.resolvedLegs ?? []), ...(ledger.unresolvedLegs ?? [])] as LedgerLeg[]
}

export default function ProfitLossPage({ navigate, initialPeriod }: { navigate: Navigate; initialPeriod?: string | null }) {
  const today = useMemo(todayISO, [])
  const distributionToday = useMemo(berlinTodayISO, [])
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
  // Aktif sekme: 'open' (dağıtılmamış), bir dağıtım id'si, ya da 'all'.
  const [activeTab, setActiveTab] = useState<string>(initialPeriod === 'all' ? 'all' : 'open')

  const focusLeg = useCallback((_leg: ProfitLegRef & { date?: string | null }) => {
    // Eksik bilgi düzeltmesi dağıtılmamış dönemde yapılır; ilgili sekmeye getir.
    setActiveTab('open')
  }, [])

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

  // Sekmeler: en yeni dağıtım en üstte.
  const sortedDistributions = useMemo(() => [...distributions].sort((a, b) => (
    b.period_end.localeCompare(a.period_end) || b.created_at.localeCompare(a.created_at)
  )), [distributions])

  const openStart = useMemo(() => openRangeStart(shareSettings, distributions), [shareSettings, distributions])
  const allStart = shareSettings?.opening_date || `${FIRST_PROFIT_MONTH}-01`

  // Aktif sekmenin veri kaynağı: hepsi tek aralık-hesabından (calculateLedgerForRange).
  const activeDistribution = useMemo(
    () => sortedDistributions.find(d => d.id === activeTab) ?? null,
    [sortedDistributions, activeTab],
  )
  const activeRange = activeTab === 'all'
    ? { startDate: allStart, endDate: today }
    : activeDistribution
      ? { startDate: activeDistribution.period_start, endDate: activeDistribution.period_end }
      : { startDate: openStart, endDate: today }
  const editable = activeTab === 'open' || activeTab === 'all'

  const ledger = useMemo(
    () => calculateLedgerForRange(bookings, {
      startDate: activeRange.startDate,
      endDate: activeRange.endDate,
      today,
      settingsByMonth: settings,
      ratesByDate,
    }),
    [bookings, activeRange.startDate, activeRange.endDate, today, settings, ratesByDate],
  )

  // KPI: dağıtılmış dönemde otoriter snapshot, diğerlerinde canlı hesap.
  const kpi = activeDistribution
    ? {
        netProfitEur: Number(activeDistribution.net_profit_eur) || 0,
        netProfitTry: Number(activeDistribution.net_profit_try) || 0,
        incomeTry: Number(activeDistribution.income_try) || 0,
        totalExpenseTry: Number(activeDistribution.total_expense_try) || 0,
        profitMargin: Number(activeDistribution.income_try) > 0
          ? (Number(activeDistribution.net_profit_try) / Number(activeDistribution.income_try)) * 100
          : 0,
      }
    : {
        netProfitEur: ledger.netProfitEur,
        netProfitTry: ledger.netProfitTry,
        incomeTry: ledger.incomeTry,
        totalExpenseTry: ledger.totalExpenseTry,
        profitMargin: ledger.profitMargin,
      }

  const tabLabel = activeTab === 'all'
    ? 'Tüm zamanlar'
    : activeDistribution
      ? `${fmtLongDate(activeDistribution.period_start)} – ${fmtLongDate(activeDistribution.period_end)}`
      : 'Dağıtılmamış'

  // Dağıtılmamış / Tümü dönemindeki ayları hesaplama ayarları için listele.
  const settingsMonths = useMemo(() => {
    const start = (editable ? activeRange.startDate : openStart).slice(0, 7)
    return monthRange(start, today.slice(0, 7))
  }, [editable, activeRange.startDate, openStart, today])

  const saveSetting = (month: string, value: any) => setSettings(current => new Map(current).set(month, value))
  const saveDistance = async (leg: ProfitLegRef, distanceKm: number) => {
    const legKey: LegKey = leg.leg === 'return' ? 'return' : 'outbound'
    const patch = await saveLegDistance(leg.bookingId, legKey, distanceKm)
    const savedDistance = Number(patch.manual_return_distance_km ?? patch.manual_outbound_distance_km)
    setBookings(current => current.map(booking => booking.id === leg.bookingId ? { ...booking, ...patch } : booking))
    setStatus(`${leg.bookingRef || 'Seyahat'} için tek yön ${formatNumber(savedDistance, 2)} km kaydedildi · Hesap güncellendi`)
  }
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
    const patch = await saveLegCostMode(booking.id, leg, nextMode)
    setBookings(current => current.map(item => item.id === booking.id ? { ...item, ...patch } : item))
    const savedModeValue = String(patch[columns.mode])
    const savedMode: CostMode = savedModeValue === 'sold_transfer' || savedModeValue === 'no_cost'
      ? savedModeValue as CostMode
      : 'own_vehicle'
    setStatus(`${booking.booking_ref || 'Seyahat'} için ${legLabel} maliyet modeli “${COST_MODE_LABELS[savedMode]}” olarak kaydedildi · Hesap güncellendi`)
  }
  const saveNoCost = async (leg: LedgerLeg) => {
    if (leg.isDailyChauffeur) {
      const dayId = (leg as { dayId?: string | null }).dayId
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
      setStatus(`${leg.bookingRef || 'Seyahat'} maliyetsiz olarak işaretlendi · Hesap güncellendi`)
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
      ratesByDate,
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

  const bookingsById = useMemo(() => new Map(bookings.map(b => [b.id, b])), [bookings])
  const legs = ledgerLegs(ledger)

  return <><Topbar navigate={navigate} /><AdminTabs active="profit-loss" navigate={navigate} />
    <div className="budget-toolbar profit-toolbar">
      <div className="budget-periods profit-tabs" role="group" aria-label="Kâr zarar dönemi">
        <button type="button" className={activeTab === 'open' ? 'active' : ''} onClick={() => setActiveTab('open')}>Dağıtılmamış</button>
        {sortedDistributions.map(d => <button
          key={d.id}
          type="button"
          className={activeTab === d.id ? 'active' : ''}
          onClick={() => setActiveTab(d.id)}
        >{fmtLongDate(d.period_start)} – {fmtLongDate(d.period_end)}</button>)}
        <button type="button" className={activeTab === 'all' ? 'active' : ''} onClick={() => setActiveTab('all')}>Tümü</button>
      </div>
      {ratesLoading && <span className="rates-loading-hint">Kurlar yükleniyor…</span>}
      <button className="sync-button" type="button" aria-label="Kâr zarar verilerini yenile" disabled={loading} onClick={() => void refresh()}>↻</button>
    </div>
    <div className="budget-update-status">{status}</div>
    <main className="scroll-area budget-content profit-content">
      {error ? <div className="empty"><div className="empty-icon">₺</div><div>Kâr/zarar verileri yüklenemedi.</div></div>
        : loading && !bookings.length ? <><div className="empty"><div>Ayarlar yükleniyor…</div></div><div className="empty"><div>Hesaplanıyor…</div></div></>
        : <>
          <KpiStrip label={tabLabel} {...kpi} />
          {activeTab === 'open' && <ProfitDistributionSection
            today={distributionToday}
            bookings={bookings}
            settingsByMonth={settings}
            ratesByDate={ratesByDate}
            shareSettings={shareSettings}
            distributions={distributions}
            loading={distributionLoading}
            error={distributionError}
            onRetry={() => void refreshDistributionLedger()}
            onSaveSettings={saveShareSettings}
            onCreateDistribution={confirmDistribution}
            onSaveDistance={saveDistance}
            onSaveSupplierCost={saveSupplierCost}
            onSaveCostMode={saveCostMode}
            onFocusLeg={focusLeg}
            navigate={navigate}
          />}
          {activeDistribution && <p className="profit-snapshot-note">Üstteki özet dağıtım anındaki kayıtlı değerlerdir. Aşağıdaki liste güncel veriye göre hesaplanır ve salt okunurdur.</p>}
          <ProfitLedgerGrid
            legs={legs}
            bookingsById={bookingsById}
            editable={editable}
            onSaveDistance={saveDistance}
            onSaveSupplierCost={saveSupplierCost}
            onSaveCostMode={saveCostMode}
            onSaveNoCost={saveNoCost}
          />
          {editable && <ExpandableSection title="Hesaplama ayarları" detail={settingsMonths.length > 1 ? `${settingsMonths.length} ay` : monthLabel(settingsMonths[0] ?? today.slice(0, 7))}>
            {settingsMonths.map(month => <SettingsForm key={month} period={month} settings={settings} onSaved={saveSetting} />)}
          </ExpandableSection>}
        </>}
    </main>
  </>
}
