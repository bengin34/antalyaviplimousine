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

export type SaveDistance = (leg: ProfitLegRef, distanceKm: number) => Promise<void>
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

export function DistanceEditor({ leg, onSave, currentKm, triggerLabel, autoOpen = false, onSaved }: {
  leg: ProfitLegRef
  onSave: SaveDistance
  currentKm?: number
  triggerLabel?: string
  /** Uyarı listesindeki "KM gir" düğmesi satırı odaklarken düzenleyici kendiliğinden açılır. */
  autoOpen?: boolean
  onSaved?: () => void
}) {
  const hasKm = typeof currentKm === 'number' && currentKm > 0
  const label = triggerLabel || (hasKm ? 'KM düzenle' : 'KM gir')
  const [editing, setEditing] = useState(false)
  const [value, setValue] = useState(hasKm ? String(currentKm) : '')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const openEditor = () => {
    setValue(hasKm ? String(currentKm) : '')
    setError('')
    setEditing(true)
  }
  useEffect(() => {
    if (autoOpen) setEditing(true)
  }, [autoOpen])
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
      onSaved?.()
    } catch {
      setError('KM kaydedilemedi, tekrar deneyin.')
    } finally {
      setSaving(false)
    }
  }

  return <>
    {!editing && <button className="profit-leg-action is-primary" type="button" onClick={openEditor}>{label}</button>}
    {editing && <form className="profit-leg-form" onSubmit={submit} noValidate>
      <EditorPanel title="Tek yön mesafeyi girin; boş dönüş dahil araç maliyeti otomatik hesaplanır.">
        <label><span>Tek yön KM</span><input type="number" min="0.01" max="5000" step="0.01" inputMode="decimal" value={value} onChange={event => setValue(event.target.value)} autoFocus required /></label>
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
    <span className="profit-field-label" id={labelId}>{leg === 'return' ? 'Dönüş maliyet modeli' : 'Gidiş maliyet modeli'}</span>
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
export function LegCostControls({ booking, legRef, leg, legLabel, currentCostTry, isSoldTransfer, oneWayKm, autoOpenDistanceEditor = false, onSaveDistance, onSaveCostMode, onSaveSupplierCost }: {
  booking: Booking
  legRef: ProfitLegRef
  leg: LegKey
  legLabel: string
  currentCostTry: number
  isSoldTransfer: boolean
  oneWayKm?: number
  autoOpenDistanceEditor?: boolean
  onSaveDistance: SaveDistance
  onSaveCostMode: SaveCostMode
  onSaveSupplierCost: SaveSupplierCost
}) {
  const [editingCost, setEditingCost] = useState(false)
  const isNoCost = legCostMode(booking, leg) === 'no_cost'

  return <>
    {isNoCost && !editingCost
      ? <p className="profit-leg-inline-note">Bu ayak “maliyeti yok” olarak işaretli; KM veya tedarikçi bedeli beklenmiyor.</p>
      : isSoldTransfer || editingCost
        ? <SupplierCostEditor
            booking={booking} leg={leg} legLabel={legLabel} currentCostTry={currentCostTry}
            editing={editingCost} setEditing={setEditingCost} onSave={onSaveSupplierCost}
          />
        : <DistanceEditor leg={legRef} onSave={onSaveDistance} currentKm={oneWayKm} autoOpen={autoOpenDistanceEditor} />}
    <CostModeToggle booking={booking} leg={leg} onSave={onSaveCostMode} onNeedsCost={() => setEditingCost(true)} />
  </>
}
