import { useEffect, useMemo, useState, type FormEvent } from 'react'
import { buildProfitDistributionSnapshot, calculateProfitDistribution } from '../../profit-loss-metrics.js'
import { fmtLongDate, formatEuro, formatTry } from '../lib/format'
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
  shareSettings: ProfitShareSettings | null
  distributions: ProfitDistribution[]
  loading: boolean
  error: string
  onRetry: () => void
  onSaveSettings: (input: SaveProfitShareSettingsInput) => Promise<void>
  onCreateDistribution: (input: CreateProfitDistributionInput) => Promise<void>
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
    } catch {
      setMessage('Başlangıç ayarları kaydedilemedi, tekrar deneyin.')
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

function MoneyPair({ eur, tryAmount }: { eur: unknown; tryAmount: unknown }) {
  return <span>{formatEuro(eur)} · {formatTry(tryAmount)}</span>
}

function FinancialBucket({ label, eur, tryAmount }: { label: string; eur: unknown; tryAmount: unknown }) {
  return <div className="profit-distribution-bucket">
    <span>{label}</span>
    <MoneyPair eur={eur} tryAmount={tryAmount} />
  </div>
}

function bookingLegLabel(leg: unknown) {
  if (leg === 'return') return 'Dönüş'
  if (typeof leg === 'string' && leg.startsWith('day-')) return `Gün ${leg.slice(4)}`
  return 'Gidiş'
}

function BlockerList({ messages, blockers, navigate }: {
  messages: string[]
  blockers: DistributionBlocker[]
  navigate: Navigate
}) {
  if (!messages.length && !blockers.length) return null
  return <div className="profit-distribution-alert" role="alert">
    {messages.map(message => <p key={message}>{message}</p>)}
    {blockers.map((blocker, index) => <div key={`${blocker.code}:${blocker.bookingId ?? index}`}>
      <p>{BLOCKER_MESSAGES[blocker.code] ?? 'Dağıtım için eksik bilgi var.'}</p>
      {blocker.bookingRef && <>
        <p>
          <strong>{blocker.bookingRef}</strong>
          {' · '}{bookingLegLabel(blocker.leg)}
          {blocker.date ? ` · ${fmtLongDate(blocker.date)}` : ''}
        </p>
        <button
          type="button"
          onClick={() => navigate(`#detail/${encodeURIComponent(blocker.bookingRef)}?from=profit-loss`)}
        >Seyahate git</button>
      </>}
    </div>)}
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

function HistoryFinancials({ distribution }: { distribution: ProfitDistribution }) {
  return <div className="profit-distribution-history-financials">
    <FinancialBucket label="Gelir" eur={distribution.income_eur} tryAmount={distribution.income_try} />
    <FinancialBucket label="Araç maliyeti" eur={distribution.vehicle_cost_eur} tryAmount={distribution.vehicle_cost_try} />
    <FinancialBucket label="Tedarikçi maliyeti" eur={distribution.supplier_cost_eur} tryAmount={distribution.supplier_cost_try} />
    <FinancialBucket label="Havalimanı karşılama" eur={distribution.airport_cost_eur} tryAmount={distribution.airport_cost_try} />
    <FinancialBucket label="Reklam" eur={distribution.advertising_cost_eur} tryAmount={distribution.advertising_cost_try} />
    <FinancialBucket label="Toplam gider" eur={distribution.total_expense_eur} tryAmount={distribution.total_expense_try} />
    <FinancialBucket label="Net kâr" eur={distribution.net_profit_eur} tryAmount={distribution.net_profit_try} />
  </div>
}

function DistributionHistory({ distributions }: { distributions: ProfitDistribution[] }) {
  const newestFirst = useMemo(() => [...distributions].sort((left, right) => (
    right.created_at.localeCompare(left.created_at) || right.period_end.localeCompare(left.period_end)
  )), [distributions])

  if (!newestFirst.length) return null
  return <section className="profit-distribution-history" aria-labelledby="distribution-history-title">
    <h3 id="distribution-history-title">Dağıtım geçmişi</h3>
    {newestFirst.map(distribution => <article key={distribution.id} data-testid="distribution-history-row">
      <h4>{fmtLongDate(distribution.period_start)} – {fmtLongDate(distribution.period_end)}</h4>
      <p>Dağıtım tarihi: {fmtLongDate(distribution.created_at.slice(0, 10))}</p>
      <p>{distribution.realized_leg_count} seyahat ayağı</p>
      <p>Net kâr: <MoneyPair eur={distribution.net_profit_eur} tryAmount={distribution.net_profit_try} /></p>
      <div>
        <p>Operasyon ortağı {percentageLabel(distribution.operations_share_pct)}</p>
        <MoneyPair eur={distribution.operations_amount_eur} tryAmount={distribution.operations_amount_try} />
      </div>
      <div>
        <p>Araç sahibi {percentageLabel(distribution.vehicle_owner_share_pct)}</p>
        <MoneyPair eur={distribution.vehicle_owner_amount_eur} tryAmount={distribution.vehicle_owner_amount_try} />
      </div>
      <details>
        <summary>Finansal dökümü göster</summary>
        <HistoryFinancials distribution={distribution} />
      </details>
    </article>)}
  </section>
}

function OpenDistributionPreview({
  today,
  bookings,
  settingsByMonth,
  shareSettings,
  distributions,
  onCreateDistribution,
  navigate,
}: Pick<ProfitDistributionSectionProps,
  'today' | 'bookings' | 'settingsByMonth' | 'shareSettings' | 'distributions' | 'onCreateDistribution' | 'navigate'
> & { shareSettings: ProfitShareSettings }) {
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

  const metrics = useMemo(() => calculateProfitDistribution(bookings, {
    startDate: openStart,
    endDate,
    today,
    settingsByMonth,
    operationsSharePct,
  }), [bookings, openStart, endDate, today, settingsByMonth, operationsSharePct])

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
    } catch {
      setSaveError('Dağıtım kaydedilemedi, tekrar deneyin.')
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
      <BlockerList messages={allMessages} blockers={detailBlockers} navigate={navigate} />
      {status && <div role="status">{status}</div>}
      <button type="button" disabled={!canDistribute} onClick={() => { setConfirming(true); setSaveError('') }}>Kârı dağıt</button>
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
      <OpenDistributionPreview {...props} shareSettings={shareSettings} />
      <DistributionHistory distributions={distributions} />
    </>}
  </section>
}
