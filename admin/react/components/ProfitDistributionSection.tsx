import { useEffect, useMemo, useState, type FormEvent, type ReactNode } from 'react'
import { buildProfitDistributionSnapshot, calculateProfitDistribution } from '../../profit-loss-metrics.js'
import { fmtLongDate, formatEuro, formatNumber, formatTry, profitLocationLabel } from '../lib/format'
import {
  LegCostControls,
  legCostColumns,
  legCostMode,
  legDirectionLabel,
  toLegKey,
  type CostMode,
  type LegKey,
  type ProfitLegRef,
  type SaveCostMode,
  type SaveDistance,
  type SaveSupplierCost,
} from './LegCostEditors'
import type {
  Booking,
  CreateProfitDistributionInput,
  Navigate,
  ProfitDistribution,
  ProfitDistributionSnapshot,
  ProfitShareSettings,
  SaveProfitShareSettingsInput,
} from '../types'

export interface ProfitDistributionSectionProps {
  today: string
  bookings: Booking[]
  settingsByMonth: Map<string, unknown>
  /** Tarihe özel EUR/TL kurları; önizleme ile kaydedilen dağıtım aynı kuru kullanmalıdır. */
  ratesByDate?: Map<string, number>
  shareSettings: ProfitShareSettings | null
  distributions: ProfitDistribution[]
  loading: boolean
  error: string
  onRetry: () => void
  onSaveSettings: (input: SaveProfitShareSettingsInput) => Promise<void>
  onCreateDistribution: (input: CreateProfitDistributionInput) => Promise<void>
  onSaveDistance: SaveDistance
  onSaveSupplierCost: SaveSupplierCost
  onSaveCostMode: SaveCostMode
  /** Aşağıdaki seyahat listesinde ilgili satıra kaydırır. */
  onFocusLeg: (leg: ProfitLegRef & { date?: string | null }) => void
  navigate: Navigate
}

type DistributionMetrics = ReturnType<typeof calculateProfitDistribution>
type DistributionBlocker = DistributionMetrics['blockers'][number]

const BLOCKER_MESSAGES: Record<string, string> = {
  'invalid-date-range': 'Dağıtım bitiş tarihi başlangıç tarihinden önce olamaz.',
  'end-date-not-closed': 'Dağıtım bitiş tarihi bugünden önce olmalıdır.',
  'invalid-share': 'Geçerli pay yüzdeleri girin.',
  'non-positive-profit': 'Net kâr oluşmadığı için bu dönem henüz dağıtılamaz.',
  'unresolved-route': 'Rota mesafesi eksik.',
  'daily-distance-missing': 'Günlük hizmet KM bilgisi eksik.',
  'supplier-cost-invalid': 'Tedarikçi maliyeti geçersiz.',
}

function isISODate(value: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false
  const date = new Date(`${value}T00:00:00Z`)
  return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value
}

function shiftUTCDate(value: string, days: number) {
  if (!isISODate(value)) return ''
  const date = new Date(`${value}T00:00:00Z`)
  date.setUTCDate(date.getUTCDate() + days)
  return date.toISOString().slice(0, 10)
}

function percentageIsPrecise(value: string) {
  return /^\d+(?:[.,]\d{1,2})?$/.test(value.trim())
}

function parsePercentage(value: string) {
  return Number(value.replace(',', '.'))
}

function compactPercentage(value: number) {
  return String(Math.round(value * 100) / 100)
}

function percentageLabel(value: unknown) {
  return `%${new Intl.NumberFormat('tr-TR', { maximumFractionDigits: 2 }).format(Number(value) || 0)}`
}

function latestOpenStart(settings: ProfitShareSettings, distributions: ProfitDistribution[]) {
  const latestEnd = distributions.reduce((latest, distribution) => (
    distribution.period_end > latest ? distribution.period_end : latest
  ), '')
  return latestEnd ? shiftUTCDate(latestEnd, 1) : settings.opening_date
}

function callbackErrorMessage(error: unknown, fallback: string) {
  return error instanceof Error && error.message.trim() ? error.message : fallback
}

function SetupForm({ today, onSave }: {
  today: string
  onSave: (input: SaveProfitShareSettingsInput) => Promise<void>
}) {
  const [openingDate, setOpeningDate] = useState('')
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState('')

  const submit = async (event: FormEvent) => {
    event.preventDefault()
    setMessage('')
    setStatus('')
    if (!isISODate(openingDate)) {
      setMessage('Geçerli bir başlangıç tarihi girin.')
      return
    }
    if (openingDate >= today) {
      setMessage('Yeni dönem başlangıcı bugünden önce olmalıdır.')
      return
    }

    setSaving(true)
    try {
      await onSave({
        openingDate,
        operationsSharePct: 50,
        vehicleOwnerSharePct: 50,
      })
      setStatus('Başlangıç ayarları kaydedildi.')
    } catch (error) {
      setMessage(callbackErrorMessage(error, 'Başlangıç ayarları kaydedilemedi, tekrar deneyin.'))
    } finally {
      setSaving(false)
    }
  }

  return <form className="profit-distribution-setup" noValidate onSubmit={submit}>
    <p>İlk dağıtılmamış hizmet gününü seçin. Başlangıç payları iki ortak için %50 / %50 olacaktır.</p>
    <label>
      <span>Yeni dönem başlangıcı</span>
      <input
        type="date"
        max={shiftUTCDate(today, -1)}
        value={openingDate}
        onChange={event => setOpeningDate(event.target.value)}
        required
      />
    </label>
    <p>Bu tarihten önce gerçekleşen seyahatler daha önce paylaşılmış kabul edilir.</p>
    <button type="submit" disabled={saving}>{saving ? 'Kaydediliyor…' : 'Dönemi başlat'}</button>
    {message && <div role="alert">{message}</div>}
    {status && <div role="status">{status}</div>}
  </form>
}

function OpeningDateEditor({ today, settings, onSave }: {
  today: string
  settings: ProfitShareSettings
  onSave: (input: SaveProfitShareSettingsInput) => Promise<void>
}) {
  const [editing, setEditing] = useState(false)
  const [openingDate, setOpeningDate] = useState(settings.opening_date)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState('')

  useEffect(() => {
    setOpeningDate(settings.opening_date)
  }, [settings.opening_date])

  const submit = async (event: FormEvent) => {
    event.preventDefault()
    setMessage('')
    setStatus('')
    if (!isISODate(openingDate)) {
      setMessage('Geçerli bir başlangıç tarihi girin.')
      return
    }
    if (openingDate >= today) {
      setMessage('Yeni dönem başlangıcı bugünden önce olmalıdır.')
      return
    }

    setSaving(true)
    try {
      await onSave({
        openingDate,
        operationsSharePct: Number(settings.default_operations_share_pct),
        vehicleOwnerSharePct: Number(settings.default_vehicle_owner_share_pct),
      })
      setEditing(false)
      setStatus('Başlangıç tarihi güncellendi.')
    } catch (error) {
      setMessage(callbackErrorMessage(error, 'Başlangıç tarihi güncellenemedi, tekrar deneyin.'))
    } finally {
      setSaving(false)
    }
  }

  return <section className="profit-distribution-opening-edit" aria-label="Başlangıç tarihi ayarı">
    <button type="button" onClick={() => { setEditing(true); setMessage(''); setStatus('') }}>Başlangıç tarihini düzenle</button>
    {editing && <form noValidate onSubmit={submit}>
      <label>
        <span>Dağıtılmamış dönem başlangıcı</span>
        <input
          type="date"
          max={shiftUTCDate(today, -1)}
          value={openingDate}
          onChange={event => setOpeningDate(event.target.value)}
          required
        />
      </label>
      <p>Bu tarihten önce gerçekleşen seyahatler daha önce paylaşılmış kabul edilir.</p>
      <button type="submit" disabled={saving}>{saving ? 'Kaydediliyor…' : 'Başlangıç tarihini kaydet'}</button>
      <button type="button" disabled={saving} onClick={() => { setEditing(false); setOpeningDate(settings.opening_date); setMessage('') }}>İptal</button>
    </form>}
    {message && <div role="alert">{message}</div>}
    {status && <div role="status">{status}</div>}
  </section>
}

function MoneyPair({ eur, tryAmount }: { eur: unknown; tryAmount: unknown }) {
  return <span>{formatEuro(eur)} · {formatTry(tryAmount)}</span>
}

function FinancialBucket({ label, eur, tryAmount }: { label: string; eur: unknown; tryAmount: unknown }) {
  return <div className="profit-distribution-bucket">
    <span>{label}</span>
    <MoneyPair eur={eur} tryAmount={tryAmount} />
  </div>
}

const BLOCKER_HINTS: Record<string, string> = {
  'unresolved-route': 'Bu rota sabit mesafe tablosunda yok. Tek yön KM girin ya da ayağı satılan transfer olarak işaretleyip tedarikçi bedelini yazın.',
  'daily-distance-missing': 'Günlük hizmette gerçekleşen KM, rezervasyon detayındaki gün kartından girilir.',
  'supplier-cost-invalid': 'Ayak satılan transfer olarak işaretli ama tedarikçi bedeli boş. Bedeli girin ya da ayağı kendi aracımıza çevirin.',
}

/**
 * Dağıtımı durduran bir seyahat ayağı. Eksik bilgi burada, kartın içinde
 * düzeltilir; rezervasyon detayına gitmek yalnızca günlük hizmet KM'si için
 * gerekir. Ayak başka bir aya aitse "Listede aç" seyahat listesini o döneme alır.
 */
function BlockerCard({ blocker, booking, onSaveDistance, onSaveSupplierCost, onSaveCostMode, onFocusLeg, navigate }: {
  blocker: DistributionBlocker
  booking: Booking | undefined
  onSaveDistance: SaveDistance
  onSaveSupplierCost: SaveSupplierCost
  onSaveCostMode: SaveCostMode
  onFocusLeg: (leg: ProfitLegRef & { date?: string | null }) => void
  navigate: Navigate
}) {
  const details = (blocker.legDetails ?? {}) as Record<string, unknown>
  const legKey: LegKey = toLegKey(blocker.leg)
  const legLabel = legDirectionLabel(booking, blocker.leg)
  const isDailyChauffeur = Boolean(details.isDailyChauffeur)
  const bookingRef = String(blocker.bookingRef ?? '')
  const legRef: ProfitLegRef & { date?: string | null } = {
    bookingId: String(blocker.bookingId ?? ''),
    bookingRef,
    leg: String(blocker.leg ?? 'outbound'),
    date: blocker.date ?? null,
  }
  const currentMode: CostMode = legCostMode(booking, legKey)
  const currentCostTry = booking ? Number(booking[legCostColumns(legKey).cost]) || 0 : 0
  const oneWayKm = Number(details.oneWayKm)
  const revenueEur = Number(details.revenueEur) || 0
  const eurTryRate = Number(details.eurTryRate)
  const canEditLeg = Boolean(booking) && !isDailyChauffeur
  const hint = BLOCKER_HINTS[blocker.code]

  return <div className="profit-blocker-card">
    <p className="profit-leg-badge is-warning">{BLOCKER_MESSAGES[blocker.code] ?? 'Dağıtım için eksik bilgi var.'}</p>
    <p className="profit-blocker-ref">
      <strong>{bookingRef}</strong>
      {' · '}{legLabel}
      {blocker.date ? ` · ${fmtLongDate(blocker.date)}` : ''}
    </p>
    {details.from != null && <p className="profit-blocker-route">
      {profitLocationLabel(details.from)} → {profitLocationLabel(details.to)}
    </p>}
    <dl className="profit-blocker-facts">
      <div><dt>Gelir</dt><dd>{formatEuro(revenueEur)}</dd></div>
      {!isDailyChauffeur && <div>
        <dt>Maliyet modeli</dt>
        <dd>{currentMode === 'sold_transfer' ? 'Satılan transfer' : 'Kendi aracımız'}</dd>
      </div>}
      {currentMode === 'sold_transfer' && !isDailyChauffeur && <div>
        <dt>Tedarikçi gideri</dt>
        <dd>{currentCostTry > 0 ? formatTry(currentCostTry) : 'Girilmedi'}</dd>
      </div>}
      {currentMode === 'own_vehicle' && <div>
        <dt>{isDailyChauffeur ? 'Gerçekleşen KM' : 'Tek yön KM'}</dt>
        <dd>{Number.isFinite(oneWayKm) && oneWayKm > 0 ? `${formatNumber(oneWayKm, 1)} km` : 'Girilmedi'}</dd>
      </div>}
      {Number.isFinite(eurTryRate) && eurTryRate > 0 && <div>
        <dt>Kur</dt><dd>₺{eurTryRate.toFixed(2)}</dd>
      </div>}
    </dl>
    {hint && <p className="profit-blocker-hint">{hint}</p>}
    <div className="profit-blocker-actions">
      {canEditLeg && booking && <LegCostControls
        booking={booking}
        legRef={legRef}
        leg={legKey}
        legLabel={legLabel}
        currentCostTry={currentCostTry}
        isSoldTransfer={currentMode === 'sold_transfer'}
        oneWayKm={Number.isFinite(oneWayKm) && oneWayKm > 0 ? oneWayKm : undefined}
        onSaveDistance={onSaveDistance}
        onSaveCostMode={onSaveCostMode}
        onSaveSupplierCost={onSaveSupplierCost}
      />}
      {legRef.bookingId && <button
        className="profit-leg-action is-ghost"
        type="button"
        onClick={() => onFocusLeg(legRef)}
      >Listede aç</button>}
      <button
        className="profit-leg-action is-ghost"
        type="button"
        onClick={() => navigate(`#detail/${encodeURIComponent(bookingRef)}?from=profit-loss`)}
      >Seyahate git</button>
    </div>
  </div>
}

function BlockerList({ messages, blockers, bookingsById, onSaveDistance, onSaveSupplierCost, onSaveCostMode, onFocusLeg, navigate }: {
  messages: string[]
  blockers: DistributionBlocker[]
  bookingsById: Map<string, Booking>
  onSaveDistance: SaveDistance
  onSaveSupplierCost: SaveSupplierCost
  onSaveCostMode: SaveCostMode
  onFocusLeg: (leg: ProfitLegRef & { date?: string | null }) => void
  navigate: Navigate
}) {
  if (!messages.length && !blockers.length) return null
  return <div className="profit-distribution-alert" role="alert">
    {messages.map(message => <p key={message}>{message}</p>)}
    {blockers.length > 0 && <p className="profit-blocker-lead">
      {blockers.length} seyahat ayağı dağıtımı durduruyor. Eksik bilgiyi buradan tamamlayabilirsiniz.
    </p>}
    {blockers.map((blocker, index) => <BlockerCard
      key={`${blocker.code}:${blocker.bookingId ?? index}:${blocker.leg ?? index}`}
      blocker={blocker}
      booking={bookingsById.get(String(blocker.bookingId ?? ''))}
      onSaveDistance={onSaveDistance}
      onSaveSupplierCost={onSaveSupplierCost}
      onSaveCostMode={onSaveCostMode}
      onFocusLeg={onFocusLeg}
      navigate={navigate}
    />)}
  </div>
}

function DistributionConfirmation({ metrics, saving, onCancel, onConfirm }: {
  metrics: DistributionMetrics
  saving: boolean
  onCancel: () => void
  onConfirm: () => void
}) {
  return <section className="profit-distribution-confirmation" role="dialog" aria-labelledby="distribution-summary-title">
    <h3 id="distribution-summary-title">Dağıtım özeti</h3>
    <p>{fmtLongDate(metrics.startDate)} – {fmtLongDate(metrics.endDate)}</p>
    <p>{metrics.realizedLegCount} gerçekleşen seyahat ayağı</p>
    <p>Net kâr: <MoneyPair eur={metrics.netProfitEur} tryAmount={metrics.netProfitTry} /></p>
    <p>Operasyon ortağı {percentageLabel(metrics.shares?.operationsSharePct)}: {formatEuro(metrics.shares?.operationsAmountEur)} · {formatTry(metrics.shares?.operationsAmountTry)}</p>
    <p>Araç sahibi {percentageLabel(metrics.shares?.vehicleOwnerSharePct)}: {formatEuro(metrics.shares?.vehicleOwnerAmountEur)} · {formatTry(metrics.shares?.vehicleOwnerAmountTry)}</p>
    <button type="button" disabled={saving} onClick={onConfirm}>{saving ? 'Kaydediliyor…' : 'Dağıtımı onayla'}</button>
    <button type="button" disabled={saving} onClick={onCancel}>İptal</button>
  </section>
}


function OpenDistributionPreview({
  today,
  bookings,
  settingsByMonth,
  ratesByDate,
  shareSettings,
  distributions,
  onCreateDistribution,
  onSaveDistance,
  onSaveSupplierCost,
  onSaveCostMode,
  onFocusLeg,
  navigate,
  openingEditor,
}: Pick<ProfitDistributionSectionProps,
  'today' | 'bookings' | 'settingsByMonth' | 'ratesByDate' | 'shareSettings' | 'distributions'
  | 'onCreateDistribution' | 'onSaveDistance' | 'onSaveSupplierCost' | 'onSaveCostMode' | 'onFocusLeg' | 'navigate'
> & { shareSettings: ProfitShareSettings; openingEditor?: ReactNode }) {
  const openStart = useMemo(
    () => latestOpenStart(shareSettings, distributions),
    [shareSettings, distributions],
  )
  const defaultEnd = shiftUTCDate(today, -1)
  const [endDate, setEndDate] = useState(defaultEnd)
  const [operationsShare, setOperationsShare] = useState(compactPercentage(Number(shareSettings.default_operations_share_pct)))
  const [vehicleShare, setVehicleShare] = useState(compactPercentage(Number(shareSettings.default_vehicle_owner_share_pct)))
  const [confirming, setConfirming] = useState(false)
  const [saving, setSaving] = useState(false)
  const [saveError, setSaveError] = useState('')
  const [status, setStatus] = useState('')

  useEffect(() => {
    setEndDate(defaultEnd)
    setConfirming(false)
  }, [defaultEnd, openStart])

  useEffect(() => {
    setOperationsShare(compactPercentage(Number(shareSettings.default_operations_share_pct)))
    setVehicleShare(compactPercentage(Number(shareSettings.default_vehicle_owner_share_pct)))
  }, [shareSettings.default_operations_share_pct, shareSettings.default_vehicle_owner_share_pct])

  const operationsSharePct = parsePercentage(operationsShare)
  const vehicleOwnerSharePct = parsePercentage(vehicleShare)
  const operationsPrecise = percentageIsPrecise(operationsShare)
  const vehiclePrecise = percentageIsPrecise(vehicleShare)
  const percentagesInRange = operationsPrecise
    && vehiclePrecise
    && operationsSharePct >= 0
    && operationsSharePct <= 100
    && vehicleOwnerSharePct >= 0
    && vehicleOwnerSharePct <= 100
  const percentagesTotal = percentagesInRange
    && Math.round((operationsSharePct + vehicleOwnerSharePct) * 100) === 10000

  // Önizleme, onay adımındaki yeniden hesapla birebir aynı girdileri kullanmalı;
  // aksi halde tarihe özel kurlar geldiğinde onay "veriler değişti" diye reddedilir.
  const metrics = useMemo(() => calculateProfitDistribution(bookings, {
    startDate: openStart,
    endDate,
    today,
    settingsByMonth,
    operationsSharePct,
    ratesByDate,
  }), [bookings, openStart, endDate, today, settingsByMonth, operationsSharePct, ratesByDate])

  const bookingsById = useMemo(() => new Map(bookings.map(booking => [booking.id, booking])), [bookings])

  const localMessages: string[] = []
  if (!operationsPrecise || !vehiclePrecise) {
    localMessages.push('Pay yüzdeleri en fazla iki ondalık basamak içermelidir.')
  } else if (!percentagesInRange) {
    localMessages.push('Pay yüzdeleri %0 ile %100 arasında olmalıdır.')
  } else if (!percentagesTotal) {
    localMessages.push('Payların toplamı %100 olmalıdır.')
  }

  const detailBlockers = metrics.blockers.filter((blocker: DistributionBlocker) => (
    blocker.bookingRef && ['unresolved-route', 'daily-distance-missing', 'supplier-cost-invalid'].includes(blocker.code)
  ))
  const globalMetricMessages = metrics.blockers
    .filter((blocker: DistributionBlocker) => !blocker.bookingRef && blocker.code !== 'invalid-share')
    .map((blocker: DistributionBlocker) => BLOCKER_MESSAGES[blocker.code] ?? 'Dağıtım bu bilgilerle tamamlanamaz.')
  const allMessages = [...new Set([...localMessages, ...globalMetricMessages, ...(saveError ? [saveError] : [])])]
  const canDistribute = percentagesTotal && metrics.canDistribute && !saving

  const changeOperationsShare = (value: string) => {
    setOperationsShare(value)
    setConfirming(false)
    setSaveError('')
    if (percentageIsPrecise(value)) {
      const next = parsePercentage(value)
      if (Number.isFinite(next) && next >= 0 && next <= 100) setVehicleShare(compactPercentage(100 - next))
    }
  }

  const confirm = async () => {
    if (!canDistribute || saving) return
    setSaving(true)
    setSaveError('')
    setStatus('')
    const snapshot = Object.freeze(buildProfitDistributionSnapshot(metrics)) as ProfitDistributionSnapshot
    try {
      await onCreateDistribution({
        expectedStart: openStart,
        periodEnd: endDate,
        operationsSharePct,
        vehicleOwnerSharePct,
        snapshot,
      })
      setConfirming(false)
      setStatus('Dağıtım kaydedildi.')
    } catch (error) {
      setSaveError(callbackErrorMessage(error, 'Dağıtım kaydedilemedi, tekrar deneyin.'))
    } finally {
      setSaving(false)
    }
  }

  return <>
    <section className="profit-distribution-preview" aria-labelledby="open-distribution-title">
      <h2 id="open-distribution-title">Dağıtılmamış net kâr</h2>
      <label>
        <span>Dağıtım başlangıç tarihi</span>
        <input type="date" value={openStart} readOnly />
      </label>
      <label>
        <span>Dağıtım bitiş tarihi</span>
        <input
          type="date"
          min={openStart}
          max={defaultEnd}
          value={endDate}
          onChange={event => { setEndDate(event.target.value); setConfirming(false); setSaveError('') }}
        />
      </label>
      <p>{metrics.realizedLegCount} gerçekleşen seyahat ayağı</p>
      <strong>{formatEuro(metrics.netProfitEur)}</strong>
      <span>{formatTry(metrics.netProfitTry)}</span>
      <div className="profit-distribution-financials">
        <FinancialBucket label="Gelir" eur={metrics.incomeEur} tryAmount={metrics.incomeTry} />
        <FinancialBucket label="Araç maliyeti" eur={metrics.vehicleCostEur} tryAmount={metrics.vehicleCostTry} />
        <FinancialBucket label="Tedarikçi maliyeti" eur={metrics.supplierCostEur} tryAmount={metrics.supplierCostTry} />
        <FinancialBucket label="Havalimanı karşılama" eur={metrics.airportMeetCostEur} tryAmount={metrics.airportMeetCostTry} />
        <FinancialBucket label="Reklam" eur={metrics.advertisingExpenseEur} tryAmount={metrics.advertisingExpenseTry} />
        <FinancialBucket label="Toplam gider" eur={metrics.totalExpenseEur} tryAmount={metrics.totalExpenseTry} />
      </div>
      <div className="profit-distribution-partners">
        <article>
          <h3>Operasyon ortağı</h3>
          <label>
            <span>Operasyon ortağı yüzdesi</span>
            <input type="number" min="0" max="100" step="0.01" value={operationsShare} onChange={event => changeOperationsShare(event.target.value)} />
          </label>
          <strong>{formatEuro(metrics.shares?.operationsAmountEur)}</strong>
          <span>{formatTry(metrics.shares?.operationsAmountTry)}</span>
        </article>
        <article>
          <h3>Araç sahibi</h3>
          <label>
            <span>Araç sahibi yüzdesi</span>
            <input type="number" min="0" max="100" step="0.01" value={vehicleShare} onChange={event => { setVehicleShare(event.target.value); setConfirming(false); setSaveError('') }} />
          </label>
          <strong>{formatEuro(metrics.shares?.vehicleOwnerAmountEur)}</strong>
          <span>{formatTry(metrics.shares?.vehicleOwnerAmountTry)}</span>
        </article>
      </div>
      <BlockerList
        messages={allMessages}
        blockers={detailBlockers}
        bookingsById={bookingsById}
        onSaveDistance={onSaveDistance}
        onSaveSupplierCost={onSaveSupplierCost}
        onSaveCostMode={onSaveCostMode}
        onFocusLeg={onFocusLeg}
        navigate={navigate}
      />
      {status && <div role="status">{status}</div>}
      <div className="profit-distribution-actions">
        {openingEditor}
        <button type="button" disabled={!canDistribute} onClick={() => { setConfirming(true); setSaveError('') }}>Kârı dağıt</button>
      </div>
    </section>
    {confirming && <DistributionConfirmation metrics={metrics} saving={saving} onCancel={() => setConfirming(false)} onConfirm={confirm} />}
  </>
}

export function ProfitDistributionSection(props: ProfitDistributionSectionProps) {
  const { loading, error, onRetry, shareSettings, distributions } = props

  return <section className="profit-distribution-section" aria-labelledby="profit-distribution-title">
    <header>
      <p id="profit-distribution-title">KÂR PAYLAŞIMI</p>
    </header>
    {loading ? <div role="status">Kâr paylaşımı yükleniyor…</div> : error ? <div role="alert">
      <p>{error}</p>
      <button type="button" onClick={onRetry}>Tekrar dene</button>
    </div> : !shareSettings ? <SetupForm today={props.today} onSave={props.onSaveSettings} /> : <>
      <OpenDistributionPreview
        {...props}
        shareSettings={shareSettings}
        openingEditor={distributions.length === 0
          ? <OpeningDateEditor today={props.today} settings={shareSettings} onSave={props.onSaveSettings} />
          : null}
      />
    </>}
  </section>
}
