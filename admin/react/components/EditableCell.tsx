import { createContext, useContext, useEffect, useState } from 'react'

/**
 * Aynı hücre masaüstü tabloda ve mobil kartta iki kez render edilir; `autoOpen`
 * yalnız tablo yüzeyinde uygulanır ki iki otomatik odaklanan input birbirini
 * blur'layıp düzenlemeyi kapatmasın.
 */
export const LedgerSurfaceContext = createContext<'table' | 'card'>('table')

export type Currency = 'EUR' | 'TRY'

/** Virgüllü Türkçe girdiyi de kabul eder. */
export function parseAmount(raw: string): number | null {
  if (raw.trim() === '') return null
  const value = Number(raw.replace(',', '.'))
  return Number.isFinite(value) ? value : null
}

function round2(value: number) {
  return Math.round(value * 100) / 100
}

/** Tutarı bir para biriminden diğerine çevirir; kur yoksa değer aynen kalır. */
export function convertAmount(value: number, from: Currency, to: Currency, rate: number): number {
  if (from === to || !(rate > 0)) return value
  return round2(from === 'EUR' ? value * rate : value / rate)
}

export interface EditableCellProps {
  /** Salt okunur halde gösterilen metin. */
  value: string
  /** Düzenleyiciye konacak ham değer (sayı için "12.5", select için option value). */
  rawValue: string
  /** `money`: tutar + € / ₺ seçici; girilen değer kaydedilirken `storedCurrency`'ye çevrilir. */
  kind: 'number' | 'select' | 'money'
  options?: { value: string; label: string }[]
  /** money: veritabanında saklanan para birimi (kaydedilen değer bu birimdedir). */
  storedCurrency?: Currency
  /** money: seferin gününe ait 1 € = ? ₺ kuru. 0/undefined ise para birimi seçici kapalı. */
  rate?: number
  step?: string
  disabled?: boolean
  onSave: (raw: string) => Promise<void>
  /** Hata mesajı döndürürse kaydedilmez. */
  validate?: (raw: string) => string | null
  muted?: boolean
  /** Erişilebilirlik etiketi, örn. "Ali Veli gidiş kâr". */
  label: string
  /** true olduğunda düzenleme modunda açılır (üst bileşen bir hücreyi zorla açmak istediğinde). */
  autoOpen?: boolean
  /** Kaydet veya iptal sonrası; üst bileşen `pendingOpen` durumunu temizler. */
  onEditEnd?: () => void
}

const SAVE_ERROR = 'Kaydedilemedi, tekrar deneyin.'

/**
 * Hücre içi düzenleyici. Kapalıyken erişilebilir bir buton, açıkken input/select.
 * Sayı: Enter kaydet, Escape iptal, blur kaydet (değişmediyse sadece kapat).
 * Select: seçim anında kaydet. Kaydetme sırasında kilitli; hata hücre altında.
 */
export function EditableCell({
  value, rawValue, kind, options = [], storedCurrency = 'EUR', rate = 0, step, disabled, onSave, validate, muted, label, autoOpen, onEditEnd,
}: EditableCellProps) {
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState(rawValue)
  const [currency, setCurrency] = useState<Currency>(storedCurrency)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const surface = useContext(LedgerSurfaceContext)

  const open = () => {
    setDraft(rawValue)
    setCurrency(storedCurrency)
    setError('')
    setEditing(true)
  }

  /** Girilen tutarı, kaydedilecek para birimine çevirir (money dışında değişmez). */
  const toStored = (raw: string) => {
    if (kind !== 'money') return raw
    const amount = parseAmount(raw)
    return amount === null ? raw : String(convertAmount(amount, currency, storedCurrency, rate))
  }

  /** Para birimi değişince görünen tutar da karşılığına çevrilir. */
  const switchCurrency = (next: Currency) => {
    const amount = parseAmount(draft)
    if (amount !== null) setDraft(String(convertAmount(amount, currency, next, rate)))
    setCurrency(next)
  }
  const close = () => {
    setEditing(false)
    setError('')
    onEditEnd?.()
  }

  useEffect(() => {
    if (autoOpen && !disabled && surface === 'table') open()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoOpen, disabled, surface])

  const commit = async (input: string, { fromBlur = false } = {}) => {
    const raw = toStored(input)
    if (raw === rawValue) { close(); return }
    const message = validate?.(raw) ?? null
    if (message) {
      if (fromBlur) { close(); return }
      setError(message)
      return
    }
    setSaving(true)
    setError('')
    try {
      await onSave(raw)
      close()
    } catch {
      setError(SAVE_ERROR)
    } finally {
      setSaving(false)
    }
  }

  const className = `ledger-cell-edit${muted ? ' is-muted' : ''}`
  if (disabled) return <span className={muted ? 'is-muted' : undefined}>{value}</span>
  if (!editing) {
    return <button type="button" className={className} aria-label={label} title="Düzenle" onClick={open}>{value}</button>
  }

  // Para birimi seçicisine geçerken input blur olur; odak düzenleyicinin içindeyse kapatma.
  const leavingEditor = (event: { currentTarget: HTMLElement; relatedTarget: EventTarget | null }) =>
    !(event.relatedTarget instanceof Node && event.currentTarget.parentElement?.contains(event.relatedTarget))

  const amountInput = <input
    className="ledger-cell-input" aria-label={label} type="text" inputMode="decimal"
    step={step} value={draft} disabled={saving} aria-busy={saving} autoFocus
    onChange={event => setDraft(event.target.value)}
    onKeyDown={event => {
      if (event.key === 'Enter') { event.preventDefault(); void commit(draft) }
      if (event.key === 'Escape') close()
    }}
    onBlur={event => { if (!saving && leavingEditor(event)) void commit(draft, { fromBlur: true }) }}
  />

  return <span className="ledger-cell-editor">
    {kind === 'select'
      ? <select
          className="ledger-cell-input" aria-label={label} value={draft} disabled={saving} aria-busy={saving} autoFocus
          onChange={event => { setDraft(event.target.value); void commit(event.target.value) }}
          onBlur={() => { if (!saving) close() }}
          onKeyDown={event => { if (event.key === 'Escape') close() }}
        >
          {options.map(option => <option key={option.value} value={option.value}>{option.label}</option>)}
        </select>
      : kind === 'money' && rate > 0
        ? <span className="ledger-cell-money">
            {amountInput}
            <select
              className="ledger-cell-currency" aria-label={`${label} para birimi`}
              value={currency} disabled={saving}
              onChange={event => switchCurrency(event.target.value as Currency)}
              onKeyDown={event => {
                if (event.key === 'Enter') { event.preventDefault(); void commit(draft) }
                if (event.key === 'Escape') close()
              }}
              onBlur={event => { if (!saving && leavingEditor(event)) void commit(draft, { fromBlur: true }) }}
            >
              <option value="EUR">€</option>
              <option value="TRY">₺</option>
            </select>
          </span>
        : amountInput}
    {error && <span className="inline-error" role="alert">{error}</span>}
  </span>
}
