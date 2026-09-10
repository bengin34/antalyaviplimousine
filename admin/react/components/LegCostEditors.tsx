import { useEffect, useId, useState, type FormEvent, type ReactNode } from 'react'
import { legCostModel } from '../../profit-loss-metrics.js'
import type { Booking } from '../types'

export type CostMode = 'own_vehicle' | 'sold_transfer' | 'no_cost'
export type LegKey = 'outbound' | 'return'

/** Maliyet modeli seçeneklerinin ekranda kullanılan adları. */
export const COST_MODE_LABELS: Record<CostMode, string> = {
  own_vehicle: 'Kendi aracımız',
  sold_transfer: 'Satılan transfer',
  no_cost: 'Maliyeti yok',
}

/**
 * Kâr/zarar ekranındaki bir seyahat ayağının kimliği. Motorun ürettiği ayak
 * nesnelerinin tamamı bu alanları taşır; düzenleyiciler yalnızca bunlara ihtiyaç duyar.
 */
export interface ProfitLegRef {
  bookingId: string
  bookingRef?: string | null
  leg: string
}

export type SaveOwnVehicleProfit = (leg: ProfitLegRef, profitEur: number) => Promise<void>
export type SaveSupplierCost = (booking: Booking, leg: LegKey, costTry: number) => Promise<void>
export type SaveCostMode = (booking: Booking, leg: LegKey, nextMode: CostMode) => Promise<void>

/** Ayağın kendi maliyet modeli; kâr/zarar motoruyla aynı kuralı kullanır. */
export function legCostMode(booking: Booking | undefined, leg: LegKey): CostMode {
  const mode = booking ? legCostModel(booking, leg).costMode : 'own_vehicle'
  return mode === 'sold_transfer' || mode === 'no_cost' ? mode : 'own_vehicle'
}

/** Ayağın maliyetinin yazıldığı sütunlar. */
export function legCostColumns(leg: LegKey) {
  return leg === 'return'
    ? { mode: 'return_service_cost_mode' as const, cost: 'return_sold_transfer_cost_try' as const }
    : { mode: 'service_cost_mode' as const, cost: 'sold_transfer_cost_try' as const }
}

/** Ayak anahtarını okunur etikete çevirir (`day-3` → `3. gün`). */
export function legLabelFor(leg: unknown) {
  if (leg === 'return') return 'Dönüş'
  if (typeof leg === 'string' && leg.startsWith('day-')) return `${leg.slice(4)}. gün`
  return 'Gidiş'
}

function isAirport(location: unknown) {
  return String(location ?? '').trim().toLocaleLowerCase('tr-TR') === 'airport'
}

/**
 * Yönü konuma göre belirler: varış havalimanı ve kalkış havalimanı değilse bu
 * bir dönüş transferidir (tek yön kayıtlar leg anahtarı hep `outbound` olsa da).
 * Dönüş ayağı ve "dönüş planla" kayıtları da dönüş sayılır; günlük hizmet gün adı.
 */
export function legDirectionLabel(booking: Booking | undefined, leg: unknown) {
  if (typeof leg === 'string' && leg.startsWith('day-')) return `${leg.slice(4)}. gün`
  if (leg === 'return') return 'Dönüş'
  if (booking?.manual_return_of_ref) return 'Dönüş'
  if (booking && isAirport(booking.dropoff_location) && !isAirport(booking.pickup_location)) return 'Dönüş'
  return 'Gidiş'
}

/** Seyahat geçmişi satırının DOM kimliği; uyarı kartlarından buraya kaydırmak için kullanılır. */
export function legTargetId(bookingId: string, leg: string) {
  return `profit-leg-${bookingId}-${leg}`
}

/** Yalnızca gidiş/dönüş ayakları düzenlenebilir; günlük hizmet günleri detaydan yönetilir. */
export function toLegKey(leg: unknown): LegKey {
  return leg === 'return' ? 'return' : 'outbound'
}

function EditorPanel({ title, children }: { title: string; children: ReactNode }) {
  return <div className="profit-leg-form-panel">
    <p className="profit-leg-form-title">{title}</p>
    {children}
  </div>
}

const PROFIT_RANGE = { min: -999999.99, max: 999999.99 }

function parseDecimal(raw: string): number | null {
  if (raw.trim() === '') return null
  const value = Number(raw.replace(',', '.'))
  return Number.isFinite(value) ? value : null
}

function inRange(value: number) {
  return value >= PROFIT_RANGE.min && value <= PROFIT_RANGE.max
}

/**
 * Bir ayağın maliyeti ve reklam öncesi kârı birbirinin türevidir:
 * kâr = gelir - maliyet - (karşılama/otopark). İkisinden hangisi son
 * düzenlenense diğeri canlı olarak ondan hesaplanır; kaydedilen tek
 * değer her zaman kârdır (motor maliyeti bundan geri türetir).
 */
export function OwnVehicleProfitEditor({ leg, onSave, currentProfitEur, revenueEur, extraCostEur = 0, triggerLabel, autoOpen = false, onSaved }: {
  leg: ProfitLegRef
  onSave: SaveOwnVehicleProfit
  currentProfitEur?: number | null
  /** Ayağın avro geliri; maliyet ↔ kâr dönüşümü için gerekli. */
  revenueEur: number
  /** Karşılama ücreti veya otopark giderinin avro karşılığı (günlük hizmette hep 0). */
  extraCostEur?: number
  triggerLabel?: string
  /** Uyarı listesindeki "Kâr gir" düğmesi satırı odaklarken düzenleyici kendiliğinden açılır. */
  autoOpen?: boolean
  onSaved?: () => void
}) {
  const hasProfit = typeof currentProfitEur === 'number' && Number.isFinite(currentProfitEur)
  const initialCost = hasProfit ? revenueEur - currentProfitEur! - extraCostEur : null
  const label = triggerLabel || (hasProfit ? 'Kâr/maliyet düzenle' : 'Kâr/maliyet gir')
  const [editing, setEditing] = useState(false)
  const [profitValue, setProfitValue] = useState(hasProfit ? String(currentProfitEur) : '')
  const [costValue, setCostValue] = useState(initialCost != null ? String(initialCost) : '')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const resetFields = () => {
    setProfitValue(hasProfit ? String(currentProfitEur) : '')
    setCostValue(initialCost != null ? String(initialCost) : '')
  }
  const openEditor = () => {
    resetFields()
    setError('')
    setEditing(true)
  }
  useEffect(() => {
    if (autoOpen) setEditing(true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoOpen])

  const onProfitChange = (raw: string) => {
    setProfitValue(raw)
    const profit = parseDecimal(raw)
    setCostValue(profit === null ? '' : String(revenueEur - profit - extraCostEur))
  }
  const onCostChange = (raw: string) => {
    setCostValue(raw)
    const cost = parseDecimal(raw)
    setProfitValue(cost === null ? '' : String(revenueEur - cost - extraCostEur))
  }

  const submit = async (event: FormEvent) => {
    event.preventDefault()
    const profitEur = parseDecimal(profitValue)
    setError('')
    if (profitEur === null || !inRange(profitEur)) {
      setError('Geçerli bir kâr veya maliyet tutarı girin (kayıp seferler için negatif olabilir).')
      return
    }
    setSaving(true)
    try {
      await onSave(leg, profitEur)
      setEditing(false)
      onSaved?.()
    } catch {
      setError('Kaydedilemedi, tekrar deneyin.')
    } finally {
      setSaving(false)
    }
  }

  return <>
    {!editing && <button className="profit-leg-action is-primary" type="button" onClick={openEditor}>{label}</button>}
    {editing && <form className="profit-leg-form" onSubmit={submit} noValidate>
      <EditorPanel title="Maliyeti veya reklam öncesi kârı avro olarak girin; diğeri otomatik hesaplanır (gelir - maliyet - karşılama/otopark = kâr). Kayıp seferler için negatif değer girilebilir.">
        <label><span>Maliyet (€)</span><input type="number" min={PROFIT_RANGE.min} max={PROFIT_RANGE.max} step="0.01" inputMode="decimal" value={costValue} onChange={event => onCostChange(event.target.value)} autoFocus /></label>
        <label><span>Reklam öncesi kâr (€)</span><input type="number" min={PROFIT_RANGE.min} max={PROFIT_RANGE.max} step="0.01" inputMode="decimal" value={profitValue} onChange={event => onProfitChange(event.target.value)} required /></label>
        <div className="profit-leg-form-actions">
          <button className="profit-leg-action is-primary" type="submit" disabled={saving}>{saving ? 'Kaydediliyor…' : 'Kaydet ve hesapla'}</button>
          <button className="profit-leg-action is-ghost" type="button" disabled={saving} onClick={() => { setEditing(false); setError('') }}>İptal</button>
        </div>
        {error && <div className="inline-error" role="alert">{error}</div>}
      </EditorPanel>
    </form>}
  </>
}

export function SupplierCostEditor({ booking, leg, legLabel, currentCostTry, editing, setEditing, onSave, onSaved }: {
  booking: Booking
  leg: LegKey
  legLabel: string
  currentCostTry: number
  editing: boolean
  setEditing: (open: boolean) => void
  onSave: SaveSupplierCost
  onSaved?: () => void
}) {
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
      setError('0 ile 9.999.999,99 arasında geçerli bir maliyet girin.')
      return
    }
    setSaving(true)
    try {
      await onSave(booking, leg, totalCostTry)
      setEditing(false)
      onSaved?.()
    } catch {
      setError('Maliyet kaydedilemedi, tekrar deneyin.')
    } finally {
      setSaving(false)
    }
  }

  return <>
    {!editing && <button className="profit-leg-action is-primary" type="button" onClick={openEditor}>Maliyet düzenle</button>}
    {editing && <form className="profit-leg-form" onSubmit={submit} noValidate>
      <EditorPanel title={`${legLabel} ayağı için tedarikçiye ödenen tutarı girin.`}>
        <label><span>{legLabel} tedarikçi maliyeti (₺)</span><input type="number" min="0.01" max="9999999.99" step="0.01" inputMode="decimal" value={value} onChange={event => setValue(event.target.value)} autoFocus required /></label>
        <div className="profit-leg-form-actions">
          <button className="profit-leg-action is-primary" type="submit" disabled={saving}>{saving ? 'Kaydediliyor…' : 'Kaydet'}</button>
          <button className="profit-leg-action is-ghost" type="button" disabled={saving} onClick={() => { setEditing(false); setError('') }}>İptal</button>
        </div>
        {error && <div className="inline-error" role="alert">{error}</div>}
      </EditorPanel>
    </form>}
  </>
}

export function CostModeToggle({ booking, leg, onSave, onNeedsCost }: {
  booking: Booking
  leg: LegKey
  onSave: SaveCostMode
  onNeedsCost: () => void
}) {
  const labelId = useId()
  const [savingMode, setSavingMode] = useState<CostMode | ''>('')
  const current = legCostMode(booking, leg)
  const locked = booking.trip_type === 'daily_chauffeur'

  const toggle = async (nextMode: CostMode) => {
    if (locked || current === nextMode) return
    // Satılan transfer için maliyet zorunlu (sütun kısıtı); yoksa önce onu iste.
    if (nextMode === 'sold_transfer' && !(Number(booking[legCostColumns(leg).cost]) > 0)) {
      onNeedsCost()
      return
    }
    setSavingMode(nextMode)
    try {
      await onSave(booking, leg, nextMode)
    } finally {
      setSavingMode('')
    }
  }

  return <div className="profit-cost-toggle-field">
    <span className="profit-field-label" id={labelId}>{legDirectionLabel(booking, leg)} maliyet modeli</span>
    <select
      className="profit-cost-mode-select"
      aria-labelledby={labelId}
      value={current}
      disabled={Boolean(savingMode) || locked}
      onChange={event => void toggle(event.target.value as CostMode)}
    >
      {(Object.keys(COST_MODE_LABELS) as CostMode[]).map(mode => <option key={mode} value={mode}>
        {COST_MODE_LABELS[mode]}
      </option>)}
    </select>
  </div>
}

/**
 * Bir ayağın tüm maliyet girdileri: önce o modeldeki eksik değer (kendi
 * aracımızda tek yön KM, satılan transferde tedarikçi bedeli), sonra modelin
 * kendisi. Model "satılan transfer"e çevrilirken bedel zorunlu olduğu için
 * düzenleyici aynı yerden açılır.
 */
export function LegCostControls({ booking, legRef, leg, legLabel, currentCostTry, isSoldTransfer, ownVehicleProfitEur, revenueEur, extraCostEur, autoOpenProfitEditor = false, onSaveOwnVehicleProfit, onSaveCostMode, onSaveSupplierCost }: {
  booking: Booking
  legRef: ProfitLegRef
  leg: LegKey
  legLabel: string
  currentCostTry: number
  isSoldTransfer: boolean
  ownVehicleProfitEur?: number | null
  /** Kendi aracımız kâr/maliyet düzenleyicisi için: ayağın avro geliri. */
  revenueEur?: number
  /** Kendi aracımız kâr/maliyet düzenleyicisi için: karşılama/otopark avro karşılığı. */
  extraCostEur?: number
  autoOpenProfitEditor?: boolean
  onSaveOwnVehicleProfit: SaveOwnVehicleProfit
  onSaveCostMode: SaveCostMode
  onSaveSupplierCost: SaveSupplierCost
}) {
  const [editingCost, setEditingCost] = useState(false)
  const isNoCost = legCostMode(booking, leg) === 'no_cost'

  return <>
    {isNoCost && !editingCost
      ? <p className="profit-leg-inline-note">Bu ayak “maliyeti yok” olarak işaretli; kâr veya tedarikçi bedeli beklenmiyor.</p>
      : isSoldTransfer || editingCost
        ? <SupplierCostEditor
            booking={booking} leg={leg} legLabel={legLabel} currentCostTry={currentCostTry}
            editing={editingCost} setEditing={setEditingCost} onSave={onSaveSupplierCost}
          />
        : <OwnVehicleProfitEditor
            leg={legRef} onSave={onSaveOwnVehicleProfit} currentProfitEur={ownVehicleProfitEur}
            revenueEur={revenueEur ?? 0} extraCostEur={extraCostEur ?? 0} autoOpen={autoOpenProfitEditor}
          />}
    <CostModeToggle booking={booking} leg={leg} onSave={onSaveCostMode} onNeedsCost={() => setEditingCost(true)} />
  </>
}
