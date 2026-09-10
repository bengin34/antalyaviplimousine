import { createContext, useContext, useEffect, useState } from 'react'

/**
 * Aynı hücre masaüstü tabloda ve mobil kartta iki kez render edilir; `autoOpen`
 * yalnız tablo yüzeyinde uygulanır ki iki otomatik odaklanan input birbirini
 * blur'layıp düzenlemeyi kapatmasın.
 */
export const LedgerSurfaceContext = createContext<'table' | 'card'>('table')

export interface EditableCellProps {
  /** Salt okunur halde gösterilen metin. */
  value: string
  /** Düzenleyiciye konacak ham değer (sayı için "12.5", select için option value). */
  rawValue: string
  kind: 'number' | 'select'
  options?: { value: string; label: string }[]
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
  value, rawValue, kind, options = [], step, disabled, onSave, validate, muted, label, autoOpen, onEditEnd,
}: EditableCellProps) {
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState(rawValue)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const surface = useContext(LedgerSurfaceContext)

  const open = () => {
    setDraft(rawValue)
    setError('')
    setEditing(true)
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

  const commit = async (raw: string, { fromBlur = false } = {}) => {
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
      : <input
          className="ledger-cell-input" aria-label={label} type="text" inputMode="decimal"
          step={step} value={draft} disabled={saving} aria-busy={saving} autoFocus
          onChange={event => setDraft(event.target.value)}
          onKeyDown={event => {
            if (event.key === 'Enter') { event.preventDefault(); void commit(draft) }
            if (event.key === 'Escape') close()
          }}
          onBlur={() => { if (!saving) void commit(draft, { fromBlur: true }) }}
        />}
    {error && <span className="inline-error" role="alert">{error}</span>}
  </span>
}
