# Profit Ledger Grid Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the day-grouped profit/loss ledger in the admin app with a flat, per-leg, sortable/filterable TanStack Table grid whose financial cells are edited in place, with passenger name (not booking ref) as the row identity and a CSV export.

**Architecture:** `ProfitLedgerGrid` keeps its public props (plus `periodLabel`) so `ProfitLossPage` barely changes. Rows are pre-enriched (`LedgerRow = { leg, booking, passenger, direction, route, needsAttention }`) and fed to `useReactTable`; column definitions live in `ledger-columns.tsx` and get per-row context (booking, edit permissions, save actions, pending-open cell) through `table.options.meta.ledger`. A generic `EditableCell` handles click-to-edit / Enter / Esc / blur / select-on-change. All writes go through the existing `lib/leg-cost-actions.ts` functions; the returned `Partial<Booking>` is merged and handed up via `onBookingSaved`. CSV building is a pure function in `lib/ledger-csv.ts`.

**Tech Stack:** React 19, TypeScript, `@tanstack/react-table` v8 (headless), Vitest + Testing Library (jsdom via per-file `// @vitest-environment jsdom`), Supabase JS. Spec: `docs/superpowers/specs/2026-09-10-profit-ledger-grid-design.md`.

**Conventions to follow:**
- Test files sit next to the source (`Foo.tsx` / `Foo.test.tsx`) and start with `// @vitest-environment jsdom` + `import '@testing-library/jest-dom/vitest'`.
- Run a single test file with `npx vitest run <path>`; the whole suite with `npm test`; types with `npm run typecheck`.
- UI strings are Turkish. Commit messages are short imperative English (see `git log`), each ending with the session trailer:
  ```
  Claude-Session: https://claude.ai/code/session_01AH57d8QVYwokEYTG1dnnEd
  ```
- Do not touch `CostDialog.tsx` (still used by `BookingDetailPage.tsx`).

---

## File map

| File | Action | Responsibility |
|---|---|---|
| `package.json` | modify | add `@tanstack/react-table` |
| `admin/react/lib/ledger-csv.ts` | create | `CsvColumn<T>`, `ledgerToCsv`, `downloadCsv` (pure + tiny DOM helper) |
| `admin/react/lib/ledger-csv.test.ts` | create | CSV unit tests |
| `admin/react/components/EditableCell.tsx` | create | click-to-edit cell (number / select) |
| `admin/react/components/EditableCell.test.tsx` | create | cell behaviour tests |
| `admin/react/components/LegCostEditors.tsx` | modify | export `parseDecimal` |
| `admin/react/components/ledger-columns.tsx` | create | `LedgerRow`, `LedgerTableMeta`, column defs, `toLedgerRow`, `computeNeedsAttention` |
| `admin/react/components/ProfitLedgerGrid.tsx` | rewrite | table state, toolbar, `<table>`, mobile cards, save actions |
| `admin/react/components/ProfitLedgerGrid.test.tsx` | rewrite | grid behaviour tests |
| `admin/react/pages/ProfitLossPage.tsx` | modify | pass `periodLabel` |
| `admin/react/pages/ProfitLossPage.triplist.test.tsx`, `.legfix.test.tsx` | modify | ref-text → passenger-name assertions; dialog test → inline select |
| `admin/react/styles.css` | modify | new `ledger-*` classes, remove `.ledger-day*` |

---

### Task 1: Dependency + type groundwork

**Files:**
- Modify: `package.json`
- Modify: `admin/react/components/LegCostEditors.tsx:85`
- Modify: `admin/react/components/ProfitLedgerGrid.tsx:7-16` (interface only for now)

- [ ] **Step 1: Install TanStack Table**

Run: `npm install @tanstack/react-table@^8`
Expected: `package.json` `dependencies` gains `"@tanstack/react-table": "^8.x"`; `package-lock.json` updated.

- [ ] **Step 2: Export `parseDecimal`**

In `admin/react/components/LegCostEditors.tsx` change line 85 from `function parseDecimal(raw: string): number | null {` to:

```ts
export function parseDecimal(raw: string): number | null {
```

- [ ] **Step 3: Extend `LedgerLeg`**

In `admin/react/components/ProfitLedgerGrid.tsx` replace the `LedgerLeg` interface (lines 7-16) with:

```ts
export interface LedgerLeg {
  bookingId: string; bookingRef?: string | null; customerName?: string | null
  leg: string; date: string; from?: unknown; to?: unknown
  revenueEur?: number; revenueTry?: number; oneWayKm?: number | null
  ownVehicleProfitEur?: number | null; ownVehicleProfitTry?: number | null
  vehicleCostTry?: number; supplierCostTry?: number
  airportMeetCostTry?: number; airportMeetCostEur?: number
  parkingCostTry?: number; parkingCostEur?: number
  advertisingPerLegEur?: number; advertisingPerLegTry?: number
  netProfitTry?: number; netProfitEur?: number; eurTryRate?: number | null
  isDailyChauffeur?: boolean; distanceSource?: string; dayId?: string | null
}
```

- [ ] **Step 4: Verify types and tests still pass**

Run: `npm run typecheck && npx vitest run admin/react/components`
Expected: both succeed (no behaviour changed yet).

- [ ] **Step 5: Commit**

```bash
git add package.json package-lock.json admin/react/components/LegCostEditors.tsx admin/react/components/ProfitLedgerGrid.tsx
git commit -m "Add TanStack Table and ledger leg EUR cost fields

Claude-Session: https://claude.ai/code/session_01AH57d8QVYwokEYTG1dnnEd"
```

---

### Task 2: CSV builder (`lib/ledger-csv.ts`)

**Files:**
- Create: `admin/react/lib/ledger-csv.ts`
- Test: `admin/react/lib/ledger-csv.test.ts`

- [ ] **Step 1: Write the failing tests**

`admin/react/lib/ledger-csv.test.ts`:

```ts
// @vitest-environment jsdom
import { describe, expect, test, vi } from 'vitest'
import { downloadCsv, ledgerToCsv, type CsvColumn } from './ledger-csv'

type Row = { name: string; eur: number | null; hours: number }
const rows: Row[] = [
  { name: 'Ayşe "Ay" Yılmaz', eur: 12.5, hours: 2 },
  { name: 'Veli', eur: null, hours: 1 },
]
const columns: CsvColumn<Row>[] = [
  { header: 'Yolcu', value: r => r.name },
  { header: 'Kâr €', value: r => r.eur, sum: true },
  { header: 'Otopark saat', value: r => r.hours },
]

describe('ledgerToCsv', () => {
  const csv = ledgerToCsv(rows, columns)
  const lines = csv.split('\r\n')

  test('starts with UTF-8 BOM and a quoted header row using ; separator', () => {
    expect(csv.charCodeAt(0)).toBe(0xfeff)
    expect(lines[0]).toBe('﻿"Yolcu";"Kâr €";"Otopark saat"')
  })

  test('quotes text (escaping inner quotes), writes numbers raw and null as empty', () => {
    expect(lines[1]).toBe('"Ayşe ""Ay"" Yılmaz";12.5;2')
    expect(lines[2]).toBe('"Veli";;1')
  })

  test('appends a Toplam row summing only sum:true columns', () => {
    expect(lines[3]).toBe('"Toplam";12.5;')
  })

  test('ends with CRLF', () => {
    expect(csv.endsWith('\r\n')).toBe(true)
  })

  test('preserves column order', () => {
    const reordered = ledgerToCsv(rows, [columns[2], columns[0]])
    expect(reordered.split('\r\n')[0]).toBe('﻿"Otopark saat";"Yolcu"')
  })
})

describe('downloadCsv', () => {
  test('creates a blob link with the given filename and clicks it', () => {
    const createObjectURL = vi.fn(() => 'blob:x')
    const revokeObjectURL = vi.fn()
    Object.assign(URL, { createObjectURL, revokeObjectURL })
    const click = vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(() => {})

    downloadCsv('kar-zarar-tumu.csv', 'a;b')

    expect(createObjectURL).toHaveBeenCalledTimes(1)
    const anchor = click.mock.instances[0] as HTMLAnchorElement
    expect(anchor.download).toBe('kar-zarar-tumu.csv')
    expect(revokeObjectURL).toHaveBeenCalledWith('blob:x')
    click.mockRestore()
  })
})
```

- [ ] **Step 2: Run to verify failure**

Run: `npx vitest run admin/react/lib/ledger-csv.test.ts`
Expected: FAIL — `Cannot find module './ledger-csv'`.

- [ ] **Step 3: Implement**

`admin/react/lib/ledger-csv.ts`:

```ts
/**
 * Muhasebe grid'i için CSV üretimi. Türkçe Excel'in dosyayı çift tıklayınca
 * doğru açması için UTF-8 BOM + `;` ayırıcı + CRLF kullanılır.
 */
export interface CsvColumn<T> {
  header: string
  value: (row: T) => string | number | null | undefined
  /** true ise "Toplam" satırında bu kolonun sayısal değerleri toplanır. */
  sum?: boolean
}

const BOM = '﻿'
const SEP = ';'
const EOL = '\r\n'

function cell(value: string | number | null | undefined): string {
  if (value == null || value === '') return ''
  if (typeof value === 'number') return String(value)
  return `"${String(value).replace(/"/g, '""')}"`
}

function round2(value: number) {
  return Math.round(value * 100) / 100
}

export function ledgerToCsv<T>(rows: T[], columns: CsvColumn<T>[]): string {
  const header = columns.map(column => cell(column.header)).join(SEP)
  const body = rows.map(row => columns.map(column => cell(column.value(row))).join(SEP))
  const totals = columns.map((column, index) => {
    if (column.sum) {
      const total = rows.reduce((sum, row) => {
        const value = column.value(row)
        return sum + (typeof value === 'number' ? value : 0)
      }, 0)
      return String(round2(total))
    }
    return index === 0 ? cell('Toplam') : ''
  }).join(SEP)
  return BOM + [header, ...body, totals].join(EOL) + EOL
}

/** Tarayıcıda dosya indirme; test ortamında `URL.createObjectURL` mock'lanır. */
export function downloadCsv(filename: string, csv: string) {
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = filename
  anchor.click()
  URL.revokeObjectURL(url)
}
```

- [ ] **Step 4: Run tests**

Run: `npx vitest run admin/react/lib/ledger-csv.test.ts`
Expected: 6 passed.

- [ ] **Step 5: Commit**

```bash
git add admin/react/lib/ledger-csv.ts admin/react/lib/ledger-csv.test.ts
git commit -m "Add CSV builder for profit ledger export

Claude-Session: https://claude.ai/code/session_01AH57d8QVYwokEYTG1dnnEd"
```

---

### Task 3: `EditableCell`

**Files:**
- Create: `admin/react/components/EditableCell.tsx`
- Test: `admin/react/components/EditableCell.test.tsx`

- [ ] **Step 1: Write the failing tests**

`admin/react/components/EditableCell.test.tsx`:

```tsx
// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest'
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react'
import { afterEach, describe, expect, test, vi } from 'vitest'
import { EditableCell } from './EditableCell'

afterEach(cleanup)

function renderNumber(overrides: Partial<Parameters<typeof EditableCell>[0]> = {}) {
  const onSave = vi.fn().mockResolvedValue(undefined)
  const utils = render(<EditableCell
    kind="number" value="€10,00" rawValue="10" label="Ali gidiş kâr" onSave={onSave} {...overrides}
  />)
  return { ...utils, onSave }
}

describe('EditableCell', () => {
  test('disabled → düz metin, buton yok', () => {
    render(<EditableCell kind="number" value="€10,00" rawValue="10" label="x" disabled onSave={vi.fn()} />)
    expect(screen.getByText('€10,00')).toBeInTheDocument()
    expect(screen.queryByRole('button')).toBeNull()
  })

  test('tıklayınca input açılır, Enter kaydeder ve kapanır', async () => {
    const { onSave } = renderNumber()
    fireEvent.click(screen.getByRole('button', { name: 'Ali gidiş kâr' }))
    const input = screen.getByRole('textbox', { name: 'Ali gidiş kâr' })
    fireEvent.change(input, { target: { value: '12,5' } })
    fireEvent.keyDown(input, { key: 'Enter' })
    await waitFor(() => expect(onSave).toHaveBeenCalledWith('12,5'))
    await waitFor(() => expect(screen.queryByRole('textbox')).toBeNull())
  })

  test('Escape iptal eder, kaydetmez', () => {
    const { onSave } = renderNumber()
    fireEvent.click(screen.getByRole('button'))
    const input = screen.getByRole('textbox')
    fireEvent.change(input, { target: { value: '99' } })
    fireEvent.keyDown(input, { key: 'Escape' })
    expect(onSave).not.toHaveBeenCalled()
    expect(screen.queryByRole('textbox')).toBeNull()
  })

  test('blur değişmiş değeri kaydeder, değişmemişse sadece kapatır', async () => {
    const { onSave } = renderNumber()
    fireEvent.click(screen.getByRole('button'))
    fireEvent.blur(screen.getByRole('textbox'))
    expect(onSave).not.toHaveBeenCalled()
    fireEvent.click(screen.getByRole('button'))
    fireEvent.change(screen.getByRole('textbox'), { target: { value: '11' } })
    fireEvent.blur(screen.getByRole('textbox'))
    await waitFor(() => expect(onSave).toHaveBeenCalledWith('11'))
  })

  test('validate hata dönerse kaydetmez ve hatayı gösterir', () => {
    const { onSave } = renderNumber({ validate: raw => raw === 'bad' ? 'Geçersiz' : null })
    fireEvent.click(screen.getByRole('button'))
    const input = screen.getByRole('textbox')
    fireEvent.change(input, { target: { value: 'bad' } })
    fireEvent.keyDown(input, { key: 'Enter' })
    expect(onSave).not.toHaveBeenCalled()
    expect(screen.getByRole('alert')).toHaveTextContent('Geçersiz')
    expect(screen.getByRole('textbox')).toBeInTheDocument()
  })

  test('onSave reddederse hata gösterir ve düzenlemede kalır', async () => {
    const { onSave } = renderNumber({ onSave: vi.fn().mockRejectedValue(new Error('x')) })
    fireEvent.click(screen.getByRole('button'))
    const input = screen.getByRole('textbox')
    fireEvent.change(input, { target: { value: '5' } })
    fireEvent.keyDown(input, { key: 'Enter' })
    await waitFor(() => expect(screen.getByRole('alert')).toHaveTextContent('Kaydedilemedi'))
    expect(onSave).toHaveBeenCalled()
    expect(screen.getByRole('textbox')).toBeInTheDocument()
  })

  test('select seçilince hemen kaydeder', async () => {
    const onSave = vi.fn().mockResolvedValue(undefined)
    render(<EditableCell
      kind="select" value="Kendi aracımız" rawValue="own_vehicle" label="Ali gidiş model" onSave={onSave}
      options={[{ value: 'own_vehicle', label: 'Kendi aracımız' }, { value: 'no_cost', label: 'Maliyeti yok' }]}
    />)
    fireEvent.click(screen.getByRole('button', { name: 'Ali gidiş model' }))
    fireEvent.change(screen.getByRole('combobox', { name: 'Ali gidiş model' }), { target: { value: 'no_cost' } })
    await waitFor(() => expect(onSave).toHaveBeenCalledWith('no_cost'))
    await waitFor(() => expect(screen.queryByRole('combobox')).toBeNull())
  })

  test('autoOpen düzenleme modunda başlar, kapanınca onEditEnd çağrılır', () => {
    const onEditEnd = vi.fn()
    renderNumber({ autoOpen: true, onEditEnd })
    const input = screen.getByRole('textbox')
    fireEvent.keyDown(input, { key: 'Escape' })
    expect(onEditEnd).toHaveBeenCalledTimes(1)
  })
})
```

- [ ] **Step 2: Run to verify failure**

Run: `npx vitest run admin/react/components/EditableCell.test.tsx`
Expected: FAIL — cannot find module `./EditableCell`.

- [ ] **Step 3: Implement**

`admin/react/components/EditableCell.tsx`:

```tsx
import { useEffect, useState } from 'react'

export interface EditableCellProps {
  /** Salt okunur halde gösterilen metin. */
  value: string
  /** Düzenleyiciye konacak ham değer (sayı için "12.5", select için option value). */
  rawValue: string
  kind: 'number' | 'select'
  options?: { value: string; label: string }[]
  min?: number
  max?: number
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
  value, rawValue, kind, options = [], min, max, step, disabled, onSave, validate, muted, label, autoOpen, onEditEnd,
}: EditableCellProps) {
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState(rawValue)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

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
    if (autoOpen && !disabled) open()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoOpen, disabled])

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
          min={min} max={max} step={step} value={draft} disabled={saving} aria-busy={saving} autoFocus
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
```

Note: `type="text"` (not `number`) so a Turkish comma can be typed; parsing happens in the caller via `parseDecimal`.

- [ ] **Step 4: Run tests**

Run: `npx vitest run admin/react/components/EditableCell.test.tsx`
Expected: 8 passed.

- [ ] **Step 5: Commit**

```bash
git add admin/react/components/EditableCell.tsx admin/react/components/EditableCell.test.tsx
git commit -m "Add EditableCell for inline ledger editing

Claude-Session: https://claude.ai/code/session_01AH57d8QVYwokEYTG1dnnEd"
```

---

### Task 4: Column definitions (`ledger-columns.tsx`)

**Files:**
- Create: `admin/react/components/ledger-columns.tsx`

This file has no dedicated test; it is exercised by Task 5's grid tests. It must type-check.

- [ ] **Step 1: Create the file**

`admin/react/components/ledger-columns.tsx`:

```tsx
import { createColumnHelper, type FilterFn, type Row } from '@tanstack/react-table'
import { startsFromAirport } from '../../profit-loss-metrics.js'
import { fmtDetailDate, formatEuro, formatTry, profitLocationLabel } from '../lib/format'
import type { CsvColumn } from '../lib/ledger-csv'
import type { Booking, Navigate } from '../types'
import { EditableCell } from './EditableCell'
import {
  COST_MODE_LABELS, legCostColumns, legCostMode, legDirectionLabel, parseDecimal, toLegKey,
  type CostMode, type LegKey,
} from './LegCostEditors'
import type { LedgerLeg } from './ProfitLedgerGrid'

/** Grid satırı: ayak + önceden çözülmüş görüntü alanları. */
export interface LedgerRow {
  id: string
  leg: LedgerLeg
  booking?: Booking
  legKey: LegKey
  passenger: string
  direction: string
  route: string
  needsAttention: boolean
}

export interface PendingOpen { rowId: string; columnId: string }

export interface LedgerActions {
  saveProfit: (leg: LedgerLeg, profitEur: number) => Promise<void>
  saveSupplier: (leg: LedgerLeg, costTry: number) => Promise<void>
  saveMode: (leg: LedgerLeg, mode: CostMode) => Promise<void>
  saveMeetFee: (leg: LedgerLeg, applies: boolean) => Promise<void>
  saveParking: (leg: LedgerLeg, hours: number) => Promise<void>
}

export interface LedgerTableMeta {
  editable: boolean
  today?: string
  navigate?: Navigate
  actions: LedgerActions
  pendingOpen: PendingOpen | null
  clearPendingOpen: () => void
  onSaveNoCost?: (leg: LedgerLeg) => Promise<void>
}

declare module '@tanstack/react-table' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface TableMeta<TData> { ledger: LedgerTableMeta }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ColumnMeta<TData, TValue> { align?: 'left' | 'right'; csv: CsvColumn<LedgerRow>[] }
}

export function rowIdFor(leg: LedgerLeg) {
  return `${leg.bookingId}:${leg.leg}`
}

/** Mirrors TripRow needsAttention logic from ProfitLossPage.tsx */
export function computeNeedsAttention(leg: LedgerLeg, booking: Booking | undefined): boolean {
  const isDailyChauffeur = Boolean(leg.isDailyChauffeur)
  if (isDailyChauffeur && leg.distanceSource !== 'daily-missing') return false
  if (leg.distanceSource === 'daily-missing') return true
  if (isDailyChauffeur) return false
  const legKey = toLegKey(leg.leg)
  const currentMode = legCostMode(booking, legKey)
  if (currentMode === 'no_cost') return false
  if (currentMode === 'sold_transfer') {
    const costTry = booking ? Number(booking[legCostColumns(legKey).cost]) || 0 : 0
    return costTry <= 0
  }
  return leg.ownVehicleProfitTry == null
}

export function toLedgerRow(leg: LedgerLeg, booking: Booking | undefined, attentionSince?: string): LedgerRow {
  return {
    id: rowIdFor(leg),
    leg, booking,
    legKey: toLegKey(leg.leg),
    passenger: leg.customerName || 'Kayıt',
    direction: legDirectionLabel(booking, leg.leg),
    route: `${profitLocationLabel(leg.from)} → ${profitLocationLabel(leg.to)}`,
    needsAttention: computeNeedsAttention(leg, booking) && (!attentionSince || String(leg.date ?? '') >= attentionSince),
  }
}

/** Yolcu + rota üzerinde tek metin filtresi (tr-TR küçük harf). */
export const ledgerGlobalFilter: FilterFn<LedgerRow> = (row, _columnId, filterValue) => {
  const query = String(filterValue ?? '').trim().toLocaleLowerCase('tr-TR')
  if (!query) return true
  const { passenger, route } = row.original
  return passenger.toLocaleLowerCase('tr-TR').includes(query) || route.toLocaleLowerCase('tr-TR').includes(query)
}

// ---- helpers ---------------------------------------------------------------

function extraCostEur(leg: LedgerLeg) {
  return (leg.airportMeetCostEur ?? 0) + (leg.parkingCostEur ?? 0)
}

function hasProfit(leg: LedgerLeg): leg is LedgerLeg & { ownVehicleProfitEur: number } {
  return typeof leg.ownVehicleProfitEur === 'number' && Number.isFinite(leg.ownVehicleProfitEur)
}

function costEurOf(leg: LedgerLeg): number | null {
  if (!hasProfit(leg) || typeof leg.revenueEur !== 'number') return null
  return leg.revenueEur - leg.ownVehicleProfitEur - extraCostEur(leg)
}

function profitDual(leg: LedgerLeg) {
  if (leg.ownVehicleProfitEur == null || leg.ownVehicleProfitTry == null) return '—'
  return `${formatEuro(leg.ownVehicleProfitEur)} · ${formatTry(leg.ownVehicleProfitTry)}`
}

function meetFeeApplies(booking: Booking | undefined) {
  return booking?.airport_meet_fee_applies !== false
}

function parkingHoursOf(booking: Booking | undefined) {
  const hours = Number(booking?.airport_meet_fee_parking_hours)
  return Number.isFinite(hours) && hours > 0 ? hours : 1
}

function num(value: unknown) {
  const n = Number(value)
  return Number.isFinite(n) ? n : 0
}

interface CellCtx {
  row: LedgerRow
  leg: LedgerLeg
  booking?: Booking
  mode: CostMode
  meta: LedgerTableMeta
  /** Ayak gidiş/dönüş, dönem açık, booking ve bugün mevcut. */
  canEdit: boolean
  airportLeg: boolean
  label: (field: string) => string
  isPending: (columnId: string) => boolean
}

function cellCtx(row: Row<LedgerRow>, meta: LedgerTableMeta): CellCtx {
  const { leg, booking } = row.original
  const mode = legCostMode(booking, row.original.legKey)
  const canEdit = Boolean(meta.editable && booking && meta.today && !leg.isDailyChauffeur)
  const airportLeg = !leg.isDailyChauffeur && startsFromAirport(leg.from)
  return {
    row: row.original, leg, booking, mode, meta, canEdit, airportLeg,
    label: field => `${row.original.passenger} ${row.original.direction.toLocaleLowerCase('tr-TR')} ${field}`,
    isPending: columnId => meta.pendingOpen?.rowId === row.id && meta.pendingOpen.columnId === columnId,
  }
}

const PROFIT_RANGE = { min: -999999.99, max: 999999.99 }

function validateProfitLike(raw: string) {
  const value = parseDecimal(raw)
  if (value === null || value < PROFIT_RANGE.min || value > PROFIT_RANGE.max) {
    return 'Geçerli bir tutar girin (kayıp seferler için negatif olabilir).'
  }
  return null
}

function validateSupplier(raw: string) {
  const value = parseDecimal(raw)
  if (value === null || value <= 0 || value > 9_999_999.99) return '0 ile 9.999.999,99 arasında geçerli bir maliyet girin.'
  return null
}

function validateParking(raw: string) {
  const value = parseDecimal(raw)
  if (value === null || value <= 0 || value > 24) return '0 ile 24 saat arasında bir değer girin.'
  return null
}

const MODE_OPTIONS = (Object.keys(COST_MODE_LABELS) as CostMode[]).map(value => ({ value, label: COST_MODE_LABELS[value] }))
const YES_NO_OPTIONS = [{ value: 'yes', label: 'Evet' }, { value: 'no', label: 'Hayır' }]

/** Günlük hizmet ayaklarında eksik kâr için "Maliyeti yok" seçeneği (modal yok). */
function NoCostButton({ leg, onSaveNoCost }: { leg: LedgerLeg; onSaveNoCost: (leg: LedgerLeg) => Promise<void> }) {
  return <EditableCell
    kind="select" value="Maliyeti yok" rawValue="" label={`${leg.customerName || 'Kayıt'} maliyeti yok`}
    options={[{ value: '', label: 'Seçin' }, { value: 'no_cost', label: 'Maliyeti yok' }]}
    onSave={async raw => { if (raw === 'no_cost') await onSaveNoCost(leg) }}
  />
}

// ---- columns ---------------------------------------------------------------

const column = createColumnHelper<LedgerRow>()

export const ledgerColumns = [
  column.accessor(row => row.leg.date, {
    id: 'date',
    header: 'Tarih',
    cell: info => fmtDetailDate(info.getValue()),
    sortingFn: (a, b) => String(a.original.leg.date).localeCompare(String(b.original.leg.date))
      || a.original.passenger.localeCompare(b.original.passenger, 'tr'),
    enableGlobalFilter: false,
    meta: { align: 'left', csv: [{ header: 'Tarih', value: row => row.leg.date }] },
  }),
  column.accessor(row => row.passenger, {
    id: 'passenger',
    header: 'Yolcu',
    cell: info => {
      const { leg, meta } = cellCtx(info.row, info.table.options.meta!.ledger)
      if (!meta.navigate || !leg.bookingRef) return info.getValue()
      const hash = `#detail/${encodeURIComponent(String(leg.bookingRef))}?from=profit-loss${leg.leg === 'return' ? '&leg=return' : ''}`
      return <button type="button" className="ledger-ref-link" onClick={() => meta.navigate?.(hash)}>{info.getValue()}</button>
    },
    sortingFn: (a, b) => a.original.passenger.localeCompare(b.original.passenger, 'tr'),
    enableGlobalFilter: true,
    meta: { align: 'left', csv: [{ header: 'Yolcu', value: row => row.passenger }] },
  }),
  column.accessor(row => row.direction, {
    id: 'direction', header: 'Yön', enableGlobalFilter: false,
    meta: { align: 'left', csv: [{ header: 'Yön', value: row => row.direction }] },
  }),
  column.accessor(row => row.route, {
    id: 'route', header: 'Rota', enableGlobalFilter: false,
    meta: { align: 'left', csv: [{ header: 'Rota', value: row => row.route }] },
  }),
  column.accessor(row => row.leg.revenueEur ?? 0, {
    id: 'revenueEur', header: 'Gelir €', enableGlobalFilter: false,
    cell: info => formatEuro(info.getValue()),
    meta: { align: 'right', csv: [{ header: 'Gelir €', value: row => row.leg.revenueEur ?? 0, sum: true }] },
  }),
  column.accessor(row => costEurOf(row.leg), {
    id: 'costEur', header: 'Maliyet €', enableGlobalFilter: false,
    cell: info => {
      const ctx = cellCtx(info.row, info.table.options.meta!.ledger)
      const { leg, mode, canEdit, meta } = ctx
      if (mode !== 'own_vehicle' || typeof leg.revenueEur !== 'number') return '—'
      const cost = info.getValue()
      return <EditableCell
        kind="number" label={ctx.label('maliyet')} step="0.01"
        value={cost == null ? '—' : formatEuro(cost)} rawValue={cost == null ? '' : String(cost)}
        disabled={!canEdit} validate={validateProfitLike}
        onSave={async raw => {
          const costEur = parseDecimal(raw)!
          await meta.actions.saveProfit(leg, leg.revenueEur! - costEur - extraCostEur(leg))
        }}
      />
    },
    meta: { align: 'right', csv: [{ header: 'Maliyet €', value: row => costEurOf(row.leg), sum: true }] },
  }),
  column.accessor(row => row.leg.ownVehicleProfitEur ?? null, {
    id: 'profitEur', header: 'Reklam öncesi kâr', enableGlobalFilter: false,
    cell: info => {
      const ctx = cellCtx(info.row, info.table.options.meta!.ledger)
      const { leg, mode, canEdit, meta } = ctx
      if (leg.isDailyChauffeur) {
        const dailyMissing = leg.distanceSource === 'daily-missing'
        return <>
          {profitDual(leg)}
          {meta.editable && dailyMissing && meta.onSaveNoCost && <NoCostButton leg={leg} onSaveNoCost={meta.onSaveNoCost} />}
        </>
      }
      if (mode !== 'own_vehicle') return '—'
      return <EditableCell
        kind="number" label={ctx.label('kâr')} step="0.01"
        value={profitDual(leg)} rawValue={hasProfit(leg) ? String(leg.ownVehicleProfitEur) : ''}
        disabled={!canEdit} validate={validateProfitLike}
        onSave={raw => meta.actions.saveProfit(leg, parseDecimal(raw)!)}
      />
    },
    meta: {
      align: 'right',
      csv: [
        { header: 'Kâr €', value: row => row.leg.ownVehicleProfitEur ?? null, sum: true },
        { header: 'Kâr ₺', value: row => row.leg.ownVehicleProfitTry ?? null, sum: true },
      ],
    },
  }),
  column.accessor(row => row.leg.supplierCostTry ?? 0, {
    id: 'supplierTry', header: 'Tedarikçi ₺', enableGlobalFilter: false,
    cell: info => {
      const ctx = cellCtx(info.row, info.table.options.meta!.ledger)
      const { leg, mode, canEdit, meta } = ctx
      if (leg.isDailyChauffeur) return '—'
      const forced = ctx.isPending('supplierTry')
      const enabled = canEdit && (mode === 'sold_transfer' || forced)
      const cost = info.getValue()
      if (!enabled && mode !== 'sold_transfer') return '—'
      return <EditableCell
        kind="number" label={ctx.label('tedarikçi maliyeti')} step="0.01" min={0.01} max={9999999.99}
        value={cost > 0 ? formatTry(cost) : '—'} rawValue={cost > 0 ? String(cost) : ''}
        disabled={!enabled} validate={validateSupplier}
        autoOpen={forced} onEditEnd={forced ? meta.clearPendingOpen : undefined}
        onSave={raw => meta.actions.saveSupplier(leg, parseDecimal(raw)!)}
      />
    },
    meta: { align: 'right', csv: [{ header: 'Tedarikçi ₺', value: row => row.leg.supplierCostTry ?? 0, sum: true }] },
  }),
  column.accessor(row => meetFeeApplies(row.booking), {
    id: 'meetFee', header: 'Karşılama', enableGlobalFilter: false,
    cell: info => {
      const ctx = cellCtx(info.row, info.table.options.meta!.ledger)
      const { leg, canEdit, airportLeg, meta } = ctx
      if (!airportLeg) return '—'
      const applies = info.getValue()
      return <EditableCell
        kind="select" label={ctx.label('karşılama')} options={YES_NO_OPTIONS}
        value={applies ? 'Evet' : 'Hayır'} rawValue={applies ? 'yes' : 'no'}
        disabled={!canEdit}
        onSave={raw => meta.actions.saveMeetFee(leg, raw === 'yes')}
      />
    },
    meta: { align: 'right', csv: [{ header: 'Karşılama ₺', value: row => row.leg.airportMeetCostTry ?? 0, sum: true }] },
  }),
  column.accessor(row => parkingHoursOf(row.booking), {
    id: 'parkingHours', header: 'Otopark saat', enableGlobalFilter: false,
    cell: info => {
      const ctx = cellCtx(info.row, info.table.options.meta!.ledger)
      const { leg, booking, canEdit, airportLeg, meta } = ctx
      if (!airportLeg) return '—'
      const hours = info.getValue()
      return <EditableCell
        kind="number" label={ctx.label('otopark saati')} step="0.25" min={0.25} max={24}
        value={String(hours)} rawValue={String(hours)}
        disabled={!canEdit} muted={meetFeeApplies(booking)} validate={validateParking}
        onSave={raw => meta.actions.saveParking(leg, parseDecimal(raw)!)}
      />
    },
    meta: {
      align: 'right',
      csv: [
        { header: 'Otopark saat', value: row => startsFromAirport(row.leg.from) ? parkingHoursOf(row.booking) : null },
        { header: 'Otopark ₺', value: row => row.leg.parkingCostTry ?? 0, sum: true },
      ],
    },
  }),
  column.accessor(row => row.leg.advertisingPerLegTry ?? 0, {
    id: 'advertisingTry', header: 'Reklam ₺', enableGlobalFilter: false,
    cell: info => formatTry(info.getValue()),
    meta: { align: 'right', csv: [{ header: 'Reklam ₺', value: row => row.leg.advertisingPerLegTry ?? 0, sum: true }] },
  }),
  column.accessor(row => row.leg.netProfitTry ?? 0, {
    id: 'netProfitTry', header: 'Net kâr ₺', enableGlobalFilter: false,
    cell: info => <span className={info.getValue() < 0 ? 'is-neg' : 'is-pos'}>{formatTry(info.getValue())}</span>,
    meta: { align: 'right', csv: [{ header: 'Net kâr ₺', value: row => row.leg.netProfitTry ?? 0, sum: true }] },
  }),
  column.accessor(row => legCostMode(row.booking, row.legKey), {
    id: 'costMode', header: 'Model', enableGlobalFilter: false,
    cell: info => {
      const ctx = cellCtx(info.row, info.table.options.meta!.ledger)
      const { leg, mode, canEdit, meta } = ctx
      if (leg.isDailyChauffeur) return '—'
      return <EditableCell
        kind="select" label={ctx.label('maliyet modeli')} options={MODE_OPTIONS}
        value={COST_MODE_LABELS[mode]} rawValue={mode}
        disabled={!canEdit}
        onSave={raw => meta.actions.saveMode(leg, raw as CostMode)}
      />
    },
    meta: { align: 'left', csv: [{ header: 'Model', value: row => COST_MODE_LABELS[legCostMode(row.booking, row.legKey)] }] },
  }),
]

/** Görünür satırların dip toplamları (tfoot ve toolbar için). */
export function ledgerSums(rows: LedgerRow[]) {
  const sum = (pick: (leg: LedgerLeg) => number | null | undefined) =>
    rows.reduce((total, row) => total + num(pick(row.leg)), 0)
  return {
    revenueEur: sum(leg => leg.revenueEur),
    costEur: sum(leg => costEurOf(leg)),
    profitEur: sum(leg => leg.ownVehicleProfitEur),
    profitTry: sum(leg => leg.ownVehicleProfitTry),
    supplierTry: sum(leg => leg.supplierCostTry),
    meetAndParkingTry: sum(leg => (leg.airportMeetCostTry ?? 0) + (leg.parkingCostTry ?? 0)),
    advertisingTry: sum(leg => leg.advertisingPerLegTry),
    netProfitTry: sum(leg => leg.netProfitTry),
  }
}

export type LedgerSums = ReturnType<typeof ledgerSums>

/** Bir kolonun dip toplam hücresi; toplanmayan kolonlarda boş. */
export function footerFor(columnId: string, sums: LedgerSums): string {
  switch (columnId) {
    case 'revenueEur': return formatEuro(sums.revenueEur)
    case 'costEur': return formatEuro(sums.costEur)
    case 'profitEur': return `${formatEuro(sums.profitEur)} · ${formatTry(sums.profitTry)}`
    case 'supplierTry': return formatTry(sums.supplierTry)
    case 'meetFee': return formatTry(sums.meetAndParkingTry)
    case 'advertisingTry': return formatTry(sums.advertisingTry)
    case 'netProfitTry': return formatTry(sums.netProfitTry)
    default: return ''
  }
}
```

Note on `startsFromAirport`: it is exported from `admin/profit-loss-metrics.js` (line 12). The module is plain JS already imported from TSX elsewhere (`LegCostEditors.tsx:2`), so no typing work is needed.

- [ ] **Step 2: Type-check**

Run: `npm run typecheck`
Expected: succeeds. If `info.table.options.meta!.ledger` complains, confirm the `declare module '@tanstack/react-table'` augmentation is in the same file and that `tsconfig` includes `admin/react`.

- [ ] **Step 3: Commit**

```bash
git add admin/react/components/ledger-columns.tsx
git commit -m "Add TanStack column definitions for profit ledger

Claude-Session: https://claude.ai/code/session_01AH57d8QVYwokEYTG1dnnEd"
```

---

### Task 5: Rewrite `ProfitLedgerGrid`

**Files:**
- Rewrite: `admin/react/components/ProfitLedgerGrid.tsx`
- Rewrite: `admin/react/components/ProfitLedgerGrid.test.tsx`

- [ ] **Step 1: Write the failing tests**

Replace `admin/react/components/ProfitLedgerGrid.test.tsx` entirely:

```tsx
// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest'
import { cleanup, fireEvent, render, screen, waitFor, within } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'

const actions = vi.hoisted(() => ({
  saveLegOwnVehicleProfit: vi.fn(),
  saveLegSupplierCost: vi.fn(),
  saveLegCostMode: vi.fn(),
  saveLegMeetFee: vi.fn(),
  saveParkingHours: vi.fn(),
}))
vi.mock('../lib/leg-cost-actions', () => actions)
const csv = vi.hoisted(() => ({ downloadCsv: vi.fn() }))
vi.mock('../lib/ledger-csv', async importOriginal => ({ ...(await importOriginal<object>()), downloadCsv: csv.downloadCsv }))

import { ProfitLedgerGrid, type LedgerLeg } from './ProfitLedgerGrid'

afterEach(cleanup)
beforeEach(() => { vi.clearAllMocks(); localStorage.clear() })

const base = {
  revenueEur: 85, revenueTry: 4250, oneWayKm: 40, vehicleCostTry: 600, supplierCostTry: 0,
  airportMeetCostTry: 250, airportMeetCostEur: 5, parkingCostTry: 0, parkingCostEur: 0,
  advertisingPerLegTry: 155, advertisingPerLegEur: 3.1, netProfitTry: 3245, netProfitEur: 64.9, eurTryRate: 50,
}
const ali: LedgerLeg = { ...base, bookingId: '1', bookingRef: 'A102', customerName: 'Ali Veli', leg: 'outbound', date: '2026-08-18', from: 'airport', to: 'Belek', ownVehicleProfitEur: 60, ownVehicleProfitTry: 3000 }
const veli: LedgerLeg = { ...base, bookingId: '2', bookingRef: 'A103', customerName: 'Zeynep Kaya', leg: 'outbound', date: '2026-08-20', from: 'Belek', to: 'airport', revenueEur: 80, revenueTry: 4000, airportMeetCostTry: 0, airportMeetCostEur: 0, supplierCostTry: 2750, netProfitTry: 1095, netProfitEur: 21.9 }
const aliBooking = { id: '1', booking_ref: 'A102', customer_name: 'Ali Veli', trip_type: 'one_way', pickup_location: 'airport', dropoff_location: 'belek', pickup_date: '2026-08-18', price_eur: 85, status: 'completed', service_cost_mode: 'own_vehicle', airport_meet_fee_applies: true, airport_meet_fee_parking_hours: 1 } as any
const veliBooking = { id: '2', booking_ref: 'A103', customer_name: 'Zeynep Kaya', trip_type: 'one_way', pickup_location: 'belek', dropoff_location: 'airport', pickup_date: '2026-08-20', price_eur: 80, status: 'completed', service_cost_mode: 'sold_transfer', sold_transfer_cost_try: 2750 } as any
const bookings = new Map([['1', aliBooking], ['2', veliBooking]])

function renderGrid(props: Partial<Parameters<typeof ProfitLedgerGrid>[0]> = {}) {
  const onBookingSaved = vi.fn()
  const utils = render(<ProfitLedgerGrid
    legs={[ali, veli]} bookingsById={bookings} editable today="2026-09-01" periodLabel="acik"
    onBookingSaved={onBookingSaved} {...props}
  />)
  return { ...utils, onBookingSaved }
}

describe('ProfitLedgerGrid — görünüm', () => {
  test('kolon başlıklarını düz tabloda gösterir', () => {
    renderGrid()
    for (const header of ['Tarih', 'Yolcu', 'Yön', 'Rota', 'Gelir €', 'Maliyet €', 'Reklam öncesi kâr', 'Tedarikçi ₺', 'Karşılama', 'Otopark saat', 'Reklam ₺', 'Net kâr ₺', 'Model']) {
      expect(screen.getByRole('columnheader', { name: new RegExp(header) })).toBeInTheDocument()
    }
    expect(screen.queryByText(/18 Ağustos.*sefer/)).toBeNull()
  })

  test('yolcu adını gösterir, rezervasyon numarasını göstermez', () => {
    renderGrid()
    expect(screen.getAllByText('Ali Veli').length).toBeGreaterThan(0)
    expect(screen.queryByText('A102')).toBeNull()
  })

  test('yolcu adı tıklanınca detaya gider', () => {
    const navigate = vi.fn()
    renderGrid({ navigate })
    fireEvent.click(screen.getAllByRole('button', { name: 'Ali Veli' })[0])
    expect(navigate).toHaveBeenCalledWith('#detail/A102?from=profit-loss')
  })

  test('varsayılan sıralama tarih azalan; başlığa tıklayınca artan', () => {
    renderGrid()
    const table = screen.getByRole('table')
    const firstRow = () => within(table).getAllByRole('row')[1]
    expect(firstRow()).toHaveTextContent('Zeynep Kaya')
    fireEvent.click(screen.getByRole('columnheader', { name: /Tarih/ }).querySelector('button')!)
    expect(firstRow()).toHaveTextContent('Ali Veli')
  })

  test('metin filtresi yolcu ve rota üzerinde çalışır', () => {
    renderGrid()
    fireEvent.change(screen.getByRole('searchbox', { name: /Ara/ }), { target: { value: 'zeynep' } })
    const table = screen.getByRole('table')
    expect(within(table).queryByText('Ali Veli')).toBeNull()
    expect(within(table).getByText('Zeynep Kaya')).toBeInTheDocument()
  })

  test('boş listede uyarı gösterir', () => {
    renderGrid({ legs: [] })
    expect(screen.getByText('Bu dönemde gerçekleşmiş sefer yok.')).toBeInTheDocument()
  })

  test('dip toplam satırı görünür satırları toplar', () => {
    renderGrid()
    const footer = screen.getByRole('table').querySelector('tfoot')!
    expect(footer).toHaveTextContent('Toplam')
    expect(footer).toHaveTextContent('€165,00')     // 85 + 80
    expect(footer).toHaveTextContent('₺4.340,00')   // 3245 + 1095
  })

  test('mobil kartlar yolcu adıyla render eder', () => {
    const { container } = renderGrid()
    const cards = container.querySelectorAll('.ledger-card')
    expect(cards).toHaveLength(2)
    expect(cards[0]).toHaveTextContent('Zeynep Kaya')
  })
})

describe('ProfitLedgerGrid — düzenleme', () => {
  test('editable=false iken hiçbir düzenleme butonu yok', () => {
    renderGrid({ editable: false })
    expect(screen.queryByRole('button', { name: /kâr|maliyet|karşılama|otopark|model/i })).toBeNull()
  })

  test('kâr hücresinden kaydedince saveLegOwnVehicleProfit çağrılır ve booking yamalanır', async () => {
    actions.saveLegOwnVehicleProfit.mockResolvedValue({ own_vehicle_profit_eur: 55 })
    const { onBookingSaved } = renderGrid()
    fireEvent.click(screen.getAllByRole('button', { name: 'Ali Veli gidiş kâr' })[0])
    const input = screen.getAllByRole('textbox', { name: 'Ali Veli gidiş kâr' })[0]
    fireEvent.change(input, { target: { value: '55' } })
    fireEvent.keyDown(input, { key: 'Enter' })
    await waitFor(() => expect(actions.saveLegOwnVehicleProfit).toHaveBeenCalledWith('1', 'outbound', 55))
    expect(onBookingSaved).toHaveBeenCalledWith(expect.objectContaining({ id: '1', own_vehicle_profit_eur: 55 }))
  })

  test('maliyet hücresine girilen değer kâra çevrilir (gelir − maliyet − karşılama/otopark)', async () => {
    actions.saveLegOwnVehicleProfit.mockResolvedValue({ own_vehicle_profit_eur: 50 })
    renderGrid()
    fireEvent.click(screen.getAllByRole('button', { name: 'Ali Veli gidiş maliyet' })[0])
    const input = screen.getAllByRole('textbox', { name: 'Ali Veli gidiş maliyet' })[0]
    fireEvent.change(input, { target: { value: '30' } })
    fireEvent.keyDown(input, { key: 'Enter' })
    // 85 − 30 − 5 = 50
    await waitFor(() => expect(actions.saveLegOwnVehicleProfit).toHaveBeenCalledWith('1', 'outbound', 50))
  })

  test('satılan transfer ayağında tedarikçi hücresi düzenlenir, kâr hücresi —', async () => {
    actions.saveLegSupplierCost.mockResolvedValue({ service_cost_mode: 'sold_transfer', sold_transfer_cost_try: 3000 })
    renderGrid()
    expect(screen.queryByRole('button', { name: 'Zeynep Kaya gidiş kâr' })).toBeNull()
    fireEvent.click(screen.getAllByRole('button', { name: 'Zeynep Kaya gidiş tedarikçi maliyeti' })[0])
    const input = screen.getAllByRole('textbox', { name: 'Zeynep Kaya gidiş tedarikçi maliyeti' })[0]
    fireEvent.change(input, { target: { value: '3000' } })
    fireEvent.keyDown(input, { key: 'Enter' })
    await waitFor(() => expect(actions.saveLegSupplierCost).toHaveBeenCalledWith('2', 'outbound', 3000))
  })

  test('model → satılan transfer, bedel yoksa mod kaydedilmez ve tedarikçi hücresi açılır', async () => {
    renderGrid()
    fireEvent.click(screen.getAllByRole('button', { name: 'Ali Veli gidiş maliyet modeli' })[0])
    fireEvent.change(screen.getAllByRole('combobox', { name: 'Ali Veli gidiş maliyet modeli' })[0], { target: { value: 'sold_transfer' } })
    await waitFor(() => expect(screen.getAllByRole('textbox', { name: 'Ali Veli gidiş tedarikçi maliyeti' }).length).toBeGreaterThan(0))
    expect(actions.saveLegCostMode).not.toHaveBeenCalled()
  })

  test('model → maliyeti yok doğrudan kaydedilir', async () => {
    actions.saveLegCostMode.mockResolvedValue({ service_cost_mode: 'no_cost', sold_transfer_cost_try: null })
    renderGrid()
    fireEvent.click(screen.getAllByRole('button', { name: 'Ali Veli gidiş maliyet modeli' })[0])
    fireEvent.change(screen.getAllByRole('combobox', { name: 'Ali Veli gidiş maliyet modeli' })[0], { target: { value: 'no_cost' } })
    await waitFor(() => expect(actions.saveLegCostMode).toHaveBeenCalledWith('1', 'outbound', 'no_cost'))
  })

  test('karşılama select ve otopark saati kaydeder', async () => {
    actions.saveLegMeetFee.mockResolvedValue({ airport_meet_fee_applies: false })
    actions.saveParkingHours.mockResolvedValue({ airport_meet_fee_parking_hours: 2 })
    renderGrid()
    fireEvent.click(screen.getAllByRole('button', { name: 'Ali Veli gidiş karşılama' })[0])
    fireEvent.change(screen.getAllByRole('combobox', { name: 'Ali Veli gidiş karşılama' })[0], { target: { value: 'no' } })
    await waitFor(() => expect(actions.saveLegMeetFee).toHaveBeenCalledWith('1', false))
    fireEvent.click(screen.getAllByRole('button', { name: 'Ali Veli gidiş otopark saati' })[0])
    const input = screen.getAllByRole('textbox', { name: 'Ali Veli gidiş otopark saati' })[0]
    fireEvent.change(input, { target: { value: '2' } })
    fireEvent.keyDown(input, { key: 'Enter' })
    await waitFor(() => expect(actions.saveParkingHours).toHaveBeenCalledWith('1', 2))
  })

  test('havalimanından başlamayan ayakta karşılama/otopark hücreleri —', () => {
    renderGrid()
    expect(screen.queryByRole('button', { name: 'Zeynep Kaya gidiş karşılama' })).toBeNull()
    expect(screen.queryByRole('button', { name: 'Zeynep Kaya gidiş otopark saati' })).toBeNull()
  })

  test('kayıt hatası hücrede gösterilir', async () => {
    actions.saveLegOwnVehicleProfit.mockRejectedValue(new Error('boom'))
    renderGrid()
    fireEvent.click(screen.getAllByRole('button', { name: 'Ali Veli gidiş kâr' })[0])
    const input = screen.getAllByRole('textbox', { name: 'Ali Veli gidiş kâr' })[0]
    fireEvent.change(input, { target: { value: '1' } })
    fireEvent.keyDown(input, { key: 'Enter' })
    await waitFor(() => expect(screen.getAllByRole('alert')[0]).toHaveTextContent('Kaydedilemedi'))
  })
})

describe('ProfitLedgerGrid — eksik bilgi', () => {
  const missing: LedgerLeg = { ...ali, bookingId: '9', bookingRef: 'A9', customerName: 'Zoe', date: '2026-08-20', ownVehicleProfitEur: null, ownVehicleProfitTry: null }
  const missingBooking = { id: '9', booking_ref: 'A9', customer_name: 'Zoe', pickup_location: 'airport', service_cost_mode: 'own_vehicle' } as any

  test('eksik kârlı kendi-araç ayağı is-attention alır', () => {
    const { container } = renderGrid({ legs: [missing], bookingsById: new Map([['9', missingBooking]]) })
    expect(container.querySelector('tr.is-attention')).toBeTruthy()
  })

  test('attentionSince öncesi eksik ayak uyarı almaz', () => {
    const { container } = renderGrid({ legs: [missing], bookingsById: new Map([['9', missingBooking]]), attentionSince: '2026-08-25' })
    expect(container.querySelector('.is-attention')).toBeNull()
  })

  test('"Sadece eksik bilgi" kutusu diğer satırları gizler', () => {
    renderGrid({ legs: [ali, missing], bookingsById: new Map([['1', aliBooking], ['9', missingBooking]]) })
    fireEvent.click(screen.getByRole('checkbox', { name: /Sadece eksik bilgi/ }))
    const table = screen.getByRole('table')
    expect(within(table).queryByText('Ali Veli')).toBeNull()
    expect(within(table).getByText('Zoe')).toBeInTheDocument()
  })

  test('günlük hizmet eksik ayağı Maliyeti yok seçeneği sunar ve onSaveNoCost çağırır', async () => {
    const daily: LedgerLeg = { ...base, bookingId: 'd', bookingRef: 'D1', customerName: 'Deniz', leg: 'day-1', date: '2026-08-20', from: 'Günlük', to: 'Günlük', isDailyChauffeur: true, distanceSource: 'daily-missing', dayId: 'day-1' }
    const onSaveNoCost = vi.fn().mockResolvedValue(undefined)
    renderGrid({ legs: [daily], bookingsById: new Map([['d', { id: 'd', trip_type: 'daily_chauffeur' } as any]]), onSaveNoCost })
    fireEvent.click(screen.getAllByRole('button', { name: 'Deniz maliyeti yok' })[0])
    fireEvent.change(screen.getAllByRole('combobox', { name: 'Deniz maliyeti yok' })[0], { target: { value: 'no_cost' } })
    await waitFor(() => expect(onSaveNoCost).toHaveBeenCalledWith(daily))
  })
})

describe('ProfitLedgerGrid — toolbar', () => {
  test('kolon gizleme localStorage a yazılır ve başlığı kaldırır', () => {
    renderGrid()
    fireEvent.click(screen.getByRole('button', { name: 'Kolonlar' }))
    fireEvent.click(screen.getByRole('checkbox', { name: 'Reklam ₺' }))
    expect(screen.queryByRole('columnheader', { name: 'Reklam ₺' })).toBeNull()
    expect(JSON.parse(localStorage.getItem('profit-ledger-columns')!)).toEqual({ advertisingTry: false })
  })

  test('CSV indir filtrelenmiş satırları ve dosya adını kullanır', () => {
    renderGrid()
    fireEvent.change(screen.getByRole('searchbox', { name: /Ara/ }), { target: { value: 'ali' } })
    fireEvent.click(screen.getByRole('button', { name: 'CSV indir' }))
    expect(csv.downloadCsv).toHaveBeenCalledTimes(1)
    const [filename, content] = csv.downloadCsv.mock.calls[0]
    expect(filename).toBe('kar-zarar-acik.csv')
    expect(content).toContain('"Ali Veli"')
    expect(content).not.toContain('"Zeynep Kaya"')
    expect(content.split('\r\n')[0]).toContain('"Kâr €";"Kâr ₺"')
  })
})
```

- [ ] **Step 2: Run to verify failure**

Run: `npx vitest run admin/react/components/ProfitLedgerGrid.test.tsx`
Expected: FAIL (old grid: no `columnheader` "Yolcu", `periodLabel` unknown, etc.).

- [ ] **Step 3: Rewrite the component**

Replace `admin/react/components/ProfitLedgerGrid.tsx` entirely (keep the `LedgerLeg` interface from Task 1):

```tsx
import { useMemo, useState } from 'react'
import {
  flexRender, getCoreRowModel, getFilteredRowModel, getSortedRowModel, useReactTable,
  type SortingState, type VisibilityState,
} from '@tanstack/react-table'
import { formatTry } from '../lib/format'
import { downloadCsv, ledgerToCsv } from '../lib/ledger-csv'
import {
  saveLegCostMode, saveLegMeetFee, saveLegOwnVehicleProfit, saveLegSupplierCost, saveParkingHours,
} from '../lib/leg-cost-actions'
import type { Booking, Navigate } from '../types'
import { legCostColumns, toLegKey, type CostMode } from './LegCostEditors'
import {
  footerFor, ledgerColumns, ledgerGlobalFilter, ledgerSums, rowIdFor, toLedgerRow,
  type LedgerActions, type LedgerRow, type PendingOpen,
} from './ledger-columns'

export interface LedgerLeg {
  bookingId: string; bookingRef?: string | null; customerName?: string | null
  leg: string; date: string; from?: unknown; to?: unknown
  revenueEur?: number; revenueTry?: number; oneWayKm?: number | null
  ownVehicleProfitEur?: number | null; ownVehicleProfitTry?: number | null
  vehicleCostTry?: number; supplierCostTry?: number
  airportMeetCostTry?: number; airportMeetCostEur?: number
  parkingCostTry?: number; parkingCostEur?: number
  advertisingPerLegEur?: number; advertisingPerLegTry?: number
  netProfitTry?: number; netProfitEur?: number; eurTryRate?: number | null
  isDailyChauffeur?: boolean; distanceSource?: string; dayId?: string | null
}

const COLUMNS_STORAGE_KEY = 'profit-ledger-columns'
/** Mobil kartta başlık/rota olarak ayrıca gösterildiği için dl'den dışlanan kolonlar. */
const CARD_HEAD_COLUMNS = new Set(['date', 'passenger', 'direction', 'route', 'netProfitTry'])

function loadColumnVisibility(): VisibilityState {
  try {
    const raw = localStorage.getItem(COLUMNS_STORAGE_KEY)
    return raw ? (JSON.parse(raw) as VisibilityState) : {}
  } catch { return {} }
}
function storeColumnVisibility(state: VisibilityState) {
  try { localStorage.setItem(COLUMNS_STORAGE_KEY, JSON.stringify(state)) } catch { /* yoksay */ }
}

export function ProfitLedgerGrid({
  legs, bookingsById, editable, attentionSince, navigate, today, onBookingSaved, onSaveNoCost, periodLabel,
}: {
  legs: LedgerLeg[]
  bookingsById: Map<string, Booking>
  editable: boolean
  /** Bu ISO tarihten önceki ayaklar eksik-bilgi uyarısı almaz (dağıtılmış dönem kapanmış sayılır). */
  attentionSince?: string
  /** Verilirse yolcu adı tıklanabilir olur ve seyahat detayına gider. */
  navigate?: Navigate
  /** Hücre düzenlemesinin açılması için bugünün ISO tarihi. */
  today?: string
  /** Bir hücre kaydettiğinde yamalı booking'i yukarı taşır. */
  onBookingSaved?: (booking: Booking) => void
  /** Günlük hizmet ayağını maliyetsiz işaretler. */
  onSaveNoCost?: (leg: LedgerLeg) => Promise<void>
  /** CSV dosya adı için dönem etiketi (`acik`, `tumu` veya `başlangıç_bitiş`). */
  periodLabel: string
}) {
  const [sorting, setSorting] = useState<SortingState>([{ id: 'date', desc: true }])
  const [globalFilter, setGlobalFilter] = useState('')
  const [onlyAttention, setOnlyAttention] = useState(false)
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(loadColumnVisibility)
  const [columnsOpen, setColumnsOpen] = useState(false)
  const [pendingOpen, setPendingOpen] = useState<PendingOpen | null>(null)

  const rows = useMemo(() => legs
    .map(leg => toLedgerRow(leg, bookingsById.get(leg.bookingId), attentionSince))
    .filter(row => !onlyAttention || row.needsAttention),
  [legs, bookingsById, attentionSince, onlyAttention])

  const actions = useMemo<LedgerActions>(() => {
    const apply = (leg: LedgerLeg, patch: Partial<Booking>) => {
      const booking = bookingsById.get(leg.bookingId)
      if (booking) onBookingSaved?.({ ...booking, ...patch })
    }
    return {
      saveProfit: async (leg, profitEur) => apply(leg, await saveLegOwnVehicleProfit(leg.bookingId, toLegKey(leg.leg), profitEur)),
      saveSupplier: async (leg, costTry) => apply(leg, await saveLegSupplierCost(leg.bookingId, toLegKey(leg.leg), costTry)),
      saveMode: async (leg, mode: CostMode) => {
        const legKey = toLegKey(leg.leg)
        const booking = bookingsById.get(leg.bookingId)
        const hasSupplierCost = Boolean(booking && Number(booking[legCostColumns(legKey).cost]) > 0)
        // Satılan transfer için bedel zorunlu (sütun kısıtı): önce tedarikçi hücresini aç, modu kaydetme.
        if (mode === 'sold_transfer' && !hasSupplierCost) {
          setPendingOpen({ rowId: rowIdFor(leg), columnId: 'supplierTry' })
          return
        }
        apply(leg, await saveLegCostMode(leg.bookingId, legKey, mode))
      },
      saveMeetFee: async (leg, applies) => apply(leg, await saveLegMeetFee(leg.bookingId, applies)),
      saveParking: async (leg, hours) => apply(leg, await saveParkingHours(leg.bookingId, hours)),
    }
  }, [bookingsById, onBookingSaved])

  const table = useReactTable<LedgerRow>({
    data: rows,
    columns: ledgerColumns,
    state: { sorting, globalFilter, columnVisibility },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    onColumnVisibilityChange: updater => setColumnVisibility(previous => {
      const next = typeof updater === 'function' ? updater(previous) : updater
      storeColumnVisibility(next)
      return next
    }),
    getRowId: row => row.id,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    globalFilterFn: ledgerGlobalFilter,
    meta: {
      ledger: {
        editable, today, navigate, actions, onSaveNoCost,
        pendingOpen, clearPendingOpen: () => setPendingOpen(null),
      },
    },
  })

  const visibleRows = table.getRowModel().rows
  const sums = useMemo(() => ledgerSums(visibleRows.map(row => row.original)), [visibleRows])

  const exportCsv = () => {
    const columns = table.getVisibleLeafColumns().flatMap(column => column.columnDef.meta?.csv ?? [])
    downloadCsv(`kar-zarar-${periodLabel}.csv`, ledgerToCsv(visibleRows.map(row => row.original), columns))
  }

  if (!legs.length) return <div className="ledger-empty">Bu dönemde gerçekleşmiş sefer yok.</div>

  return <div className="ledger">
    <div className="ledger-toolbar">
      <input
        type="search" className="ledger-search" aria-label="Ara (yolcu veya rota)" placeholder="Yolcu veya rota ara…"
        value={globalFilter} onChange={event => setGlobalFilter(event.target.value)}
      />
      <label className="ledger-toolbar-check">
        <input type="checkbox" checked={onlyAttention} onChange={event => setOnlyAttention(event.target.checked)} />
        Sadece eksik bilgi
      </label>
      <div className="ledger-columns-menu">
        <button type="button" className="profit-leg-action is-ghost" aria-expanded={columnsOpen} onClick={() => setColumnsOpen(open => !open)}>Kolonlar</button>
        {columnsOpen && <ul className="ledger-columns-list">
          {table.getAllLeafColumns().map(column => <li key={column.id}>
            <label>
              <input type="checkbox" checked={column.getIsVisible()} onChange={column.getToggleVisibilityHandler()} />
              {String(column.columnDef.header)}
            </label>
          </li>)}
        </ul>}
      </div>
      <button type="button" className="profit-leg-action is-primary" onClick={exportCsv}>CSV indir</button>
      <span className="ledger-toolbar-summary">
        {visibleRows.length} sefer · <b className={sums.netProfitTry < 0 ? 'is-neg' : 'is-pos'}>{formatTry(sums.netProfitTry)}</b>
      </span>
    </div>

    <div className="ledger-scroll">
      <table className="ledger-table">
        <thead>
          {table.getHeaderGroups().map(group => <tr key={group.id}>
            {group.headers.map(header => {
              const sorted = header.column.getIsSorted()
              const align = header.column.columnDef.meta?.align ?? 'right'
              return <th
                key={header.id}
                className={`is-${align}${header.column.id === 'passenger' ? ' ledger-col-sticky' : ''}`}
                aria-sort={sorted === 'asc' ? 'ascending' : sorted === 'desc' ? 'descending' : 'none'}
              >
                <button type="button" className="ledger-sort" onClick={header.column.getToggleSortingHandler()}>
                  {flexRender(header.column.columnDef.header, header.getContext())}
                  {sorted === 'asc' ? ' ▲' : sorted === 'desc' ? ' ▼' : ''}
                </button>
              </th>
            })}
          </tr>)}
        </thead>
        <tbody>
          {visibleRows.map(row => <tr key={row.id} className={row.original.needsAttention ? 'is-attention' : undefined}>
            {row.getVisibleCells().map(cell => <td
              key={cell.id}
              className={`is-${cell.column.columnDef.meta?.align ?? 'right'}${cell.column.id === 'passenger' ? ' ledger-col-sticky' : ''}`}
            >
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </td>)}
          </tr>)}
        </tbody>
        <tfoot><tr className="ledger-subtotal">
          {table.getVisibleLeafColumns().map((column, index) => {
            const text = footerFor(column.id, sums)
            return <td key={column.id} className={`is-${column.columnDef.meta?.align ?? 'right'}${column.id === 'netProfitTry' ? (sums.netProfitTry < 0 ? ' is-neg' : ' is-pos') : ''}`}>
              {text || (index === 0 ? 'Toplam' : '')}
            </td>
          })}
        </tr></tfoot>
      </table>
    </div>

    <ul className="ledger-cards">
      {visibleRows.map(row => {
        const { leg, passenger, direction, route, needsAttention } = row.original
        const cells = row.getVisibleCells().filter(cell => !CARD_HEAD_COLUMNS.has(cell.column.id))
        const passengerCell = row.getVisibleCells().find(cell => cell.column.id === 'passenger')
        return <li className={`ledger-card${needsAttention ? ' is-attention' : ''}`} key={row.id}>
          <div className="ledger-card-head">
            <strong>{passengerCell ? flexRender(passengerCell.column.columnDef.cell, passengerCell.getContext()) : passenger}</strong>
            <b className={(leg.netProfitTry ?? 0) < 0 ? 'is-neg' : 'is-pos'}>{formatTry(leg.netProfitTry ?? 0)}</b>
          </div>
          {needsAttention && <span className="ledger-attention">Eksik bilgi</span>}
          <div className="ledger-card-route">{direction} · {route}</div>
          <dl className="ledger-card-facts">
            {cells.map(cell => <div key={cell.id}>
              <dt>{String(cell.column.columnDef.header)}</dt>
              <dd>{flexRender(cell.column.columnDef.cell, cell.getContext())}</dd>
            </div>)}
          </dl>
        </li>
      })}
    </ul>
  </div>
}
```

- [ ] **Step 4: Run the grid tests**

Run: `npx vitest run admin/react/components/ProfitLedgerGrid.test.tsx`
Expected: all pass. Likely snags and fixes:
- If `getByRole('columnheader', { name })` fails because the sort button text includes the arrow, the regex matchers already tolerate that; for the exact `'Reklam ₺'` visibility-checkbox query use the checkbox inside the Kolonlar menu (it has no arrow).
- If `sold_transfer` rows still render an `—` instead of the cell, check the `enabled`/`mode` guard order in `supplierTry`.
- The daily-chauffeur `NoCostButton` re-uses `EditableCell` with `kind="select"`; the test drives it through button → combobox.

- [ ] **Step 5: Type-check**

Run: `npm run typecheck`
Expected: succeeds. `ProfitLossPage.tsx` will now error on missing `periodLabel` — that's fixed in Task 6; if you want a green typecheck at this commit, do Task 6 Step 1 first, then commit both together.

- [ ] **Step 6: Commit**

```bash
git add admin/react/components/ProfitLedgerGrid.tsx admin/react/components/ProfitLedgerGrid.test.tsx
git commit -m "Rewrite profit ledger as inline-editable TanStack grid

Claude-Session: https://claude.ai/code/session_01AH57d8QVYwokEYTG1dnnEd"
```

---

### Task 6: Wire `ProfitLossPage` and update page tests

**Files:**
- Modify: `admin/react/pages/ProfitLossPage.tsx:464-473`
- Modify: `admin/react/pages/ProfitLossPage.triplist.test.tsx`
- Modify: `admin/react/pages/ProfitLossPage.legfix.test.tsx:161`

- [ ] **Step 1: Pass `periodLabel`**

In `ProfitLossPage.tsx`, just above the `<ProfitLedgerGrid` JSX (inside the component body, after `const legs = ledgerLegs(ledger)` at line 422), add:

```ts
  const periodLabel = activeTab === 'all'
    ? 'tumu'
    : activeDistribution
      ? `${activeDistribution.period_start}_${activeDistribution.period_end}`
      : 'acik'
```

and add the prop to the grid element:

```tsx
          <ProfitLedgerGrid
            legs={legs}
            bookingsById={bookingsById}
            editable={editable}
            attentionSince={openStart}
            navigate={navigate}
            today={today}
            onBookingSaved={applyBookingPatch}
            onSaveNoCost={saveNoCost}
            periodLabel={periodLabel}
          />
```

- [ ] **Step 2: Run the page tests to see what breaks**

Run: `npx vitest run admin/react/pages`
Expected: failures in `ProfitLossPage.triplist.test.tsx` (assertions on `'AVL-101'`, `'AVL-102'`, `'AVL-109'`, `'AVL-IPTAL'` text and the `Maliyet düzenle` / dialog flow) and `ProfitLossPage.legfix.test.tsx:161`. `ProfitLossPage.test.tsx` and `.stale.test.tsx` should still pass (they don't assert on grid text) — if they fail, apply the same substitutions.

- [ ] **Step 3: Update `triplist` assertions**

The grid no longer prints booking refs; it prints `customer_name` (`'Ayşe Yılmaz'` from `makeBooking`). Edit `admin/react/pages/ProfitLossPage.triplist.test.tsx`:

- `leaves cancelled bookings out…`: give the cancelled booking a distinct name and assert on names:
  ```ts
  makeBooking({ id: 'booking-2', booking_ref: 'AVL-IPTAL', customer_name: 'İptal Yolcu', status: 'cancelled' }),
  …
  await waitFor(() => expect(screen.getAllByText('Ayşe Yılmaz').length).toBeGreaterThan(0))
  expect(screen.queryByText('İptal Yolcu')).toBeNull()
  ```
- `lists legs from every day…`: `makeBooking({ id: 'booking-2', booking_ref: 'AVL-102', customer_name: 'İkinci Yolcu', pickup_date: '2026-08-01' })`, then assert `getAllByText('Ayşe Yılmaz')` and `getAllByText('İkinci Yolcu')`.
- `shows both legs of a round trip…`: `expect(screen.getAllByText('Ayşe Yılmaz').length).toBeGreaterThanOrEqual(2)` (both rows carry the same passenger name; table + mobile cards double it, so `>= 2` still holds).
- `shows a separately planned return record…`: add `customer_name: 'Dönüş Yolcu'` to the override and assert `getAllByText('Dönüş Yolcu')`.
- `marks a transfer leg as cost free via the cost dialog` → rename to `marks a transfer leg as cost free from the model cell` and replace the body:
  ```ts
  installQueries([makeBooking({ pickup_location: 'private_address', dropoff_location: 'hotel' })])
  render(<ProfitLossPage navigate={vi.fn()} initialPeriod="2026-08" />)

  // Eksik kârlı ayak gridde uyarılı; Model hücresinden "Maliyeti yok" seçilir → gidersiz kaydedilir.
  const modelCell = await screen.findAllByRole('button', { name: 'Ayşe Yılmaz gidiş maliyet modeli' })
  fireEvent.click(modelCell[0])
  fireEvent.change(screen.getAllByRole('combobox', { name: 'Ayşe Yılmaz gidiş maliyet modeli' })[0], { target: { value: 'no_cost' } })

  await waitFor(() => expect(mocks.updateBooking).toHaveBeenCalledWith({
    service_cost_mode: 'no_cost',
    sold_transfer_cost_try: null,
  }))
  ```
  Remove the now-unused `within` import if nothing else uses it.
- Any remaining `'AVL-10x'` grid-text assertions in that file (there are ~11 hits; some are in `makeBooking` overrides and stay): replace text lookups with the passenger name as above. Keep `booking_ref` values in the overrides — the detail link still uses them.

- [ ] **Step 4: Update `legfix` assertion**

`admin/react/pages/ProfitLossPage.legfix.test.tsx:161` — change `getAllByText('AVL-101')` to `getAllByText('Test Yolcu')` (the file's `makeBooking` uses `customer_name: 'Test Yolcu'`).

- [ ] **Step 5: Run page tests + typecheck**

Run: `npx vitest run admin/react/pages && npm run typecheck`
Expected: all pass.

- [ ] **Step 6: Commit**

```bash
git add admin/react/pages/ProfitLossPage.tsx admin/react/pages/ProfitLossPage.triplist.test.tsx admin/react/pages/ProfitLossPage.legfix.test.tsx
git commit -m "Pass period label to ledger grid and assert on passenger names

Claude-Session: https://claude.ai/code/session_01AH57d8QVYwokEYTG1dnnEd"
```

---

### Task 7: Styles

**Files:**
- Modify: `admin/react/styles.css` (around lines 1548-1606, and the `.ledger-edit-cell` / `.ledger-day*` rules)

- [ ] **Step 1: Remove dead day-group styles**

Delete the rules for `.ledger-day`, `.ledger-day-head`, `.ledger-day-head > *` (lines ~1549-1568) and `.ledger-edit-cell` (~1606). Keep `.ledger`, `.ledger-table*`, `.ledger-subtotal`, `.ledger-empty`, `.ledger-ref-link`, `.ledger-card*`, `.ledger-attention`, `.is-attention` rules.

Also replace the header alignment rule
```css
.ledger-table th:nth-child(-n+2),
.ledger-table td:nth-child(-n+2) { text-align: left; }
```
with
```css
.ledger-table th.is-left,
.ledger-table td.is-left { text-align: left; }
.ledger-table th.is-right,
.ledger-table td.is-right { text-align: right; }
```

- [ ] **Step 2: Add new grid styles**

Append after the `.ledger-empty` rule:

```css
/* Muhasebe grid'i: toolbar, kaydırma, sıralama, hücre içi düzenleme. */
.ledger-toolbar {
  display: flex; flex-wrap: wrap; align-items: center; gap: 8px 12px;
  padding: 8px 0;
}
.ledger-search {
  flex: 1 1 220px; min-width: 160px;
  padding: 6px 10px; border-radius: 8px; border: 1px solid var(--border-soft);
  background: rgba(255, 255, 255, 0.04); color: var(--text); font: inherit;
}
.ledger-toolbar-check { display: inline-flex; align-items: center; gap: 6px; font-size: 13px; color: var(--text-muted); }
.ledger-toolbar-summary { margin-left: auto; font-size: 13px; color: var(--text-muted); font-variant-numeric: tabular-nums; }
.ledger-toolbar-summary > b.is-pos { color: var(--green); }
.ledger-toolbar-summary > b.is-neg { color: var(--danger, #e5484d); }
.ledger-columns-menu { position: relative; }
.ledger-columns-list {
  position: absolute; z-index: 5; top: calc(100% + 4px); left: 0;
  list-style: none; margin: 0; padding: 8px 10px; min-width: 180px;
  background: var(--panel, #161a22); border: 1px solid var(--border-soft); border-radius: 8px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.35);
}
.ledger-columns-list label { display: flex; align-items: center; gap: 8px; padding: 3px 0; font-size: 13px; white-space: nowrap; }

.ledger-scroll { overflow-x: auto; }
.ledger-table { min-width: 1180px; }
.ledger-table th { white-space: nowrap; }
.ledger-sort {
  all: unset; cursor: pointer; font: inherit; color: inherit;
}
.ledger-sort:hover { color: var(--text); }
.ledger-col-sticky {
  position: sticky; left: 0; z-index: 1;
  background: var(--panel, #161a22);
}
.ledger-table tbody tr:nth-child(even) td.ledger-col-sticky { background: #1a1f28; }

.ledger-cell-edit {
  all: unset; cursor: text; font: inherit; color: inherit;
  border-bottom: 1px dotted var(--text-muted); padding-bottom: 1px;
}
.ledger-cell-edit:hover,
.ledger-cell-edit:focus-visible { background: rgba(115, 183, 255, 0.14); outline: none; }
.ledger-cell-editor { display: inline-flex; flex-direction: column; gap: 2px; }
.ledger-cell-input {
  width: 9ch; padding: 2px 6px; border-radius: 6px; border: 1px solid var(--accent, #73b7ff);
  background: rgba(255, 255, 255, 0.06); color: var(--text); font: inherit; text-align: right;
  font-variant-numeric: tabular-nums;
}
select.ledger-cell-input { width: auto; text-align: left; }
.ledger-cell-input[aria-busy="true"] { opacity: 0.6; }
.is-muted { opacity: 0.55; }
.ledger-card-facts dd .ledger-cell-input { text-align: left; }
```

If `--panel` / `--accent` variables don't exist in this stylesheet, the fallbacks apply; check `:root` near the top of `styles.css` and use the project's actual token names if they differ.

- [ ] **Step 3: Visual check**

Run: `npm run dev:admin` and open the admin app → **Kâr/Zarar**. Verify: flat table with sticky Yolcu column; header click sorts; dotted-underline cells open an input; Enter saves and the row recalculates; Kolonlar menu toggles columns; CSV indir downloads `kar-zarar-acik.csv` that opens correctly in Excel/Numbers with Turkish characters; narrow the window below the mobile breakpoint and confirm cards render with passenger names. Stop the dev server afterwards.

- [ ] **Step 4: Commit**

```bash
git add admin/react/styles.css
git commit -m "Style inline-editable profit ledger grid

Claude-Session: https://claude.ai/code/session_01AH57d8QVYwokEYTG1dnnEd"
```

---

### Task 8: Full verification

- [ ] **Step 1: Whole suite + types + admin build**

Run: `npm test && npm run typecheck && npm run build:admin`
Expected: all green. `CostDialog.test.tsx` still passes (component untouched).

- [ ] **Step 2: Confirm nothing references removed APIs**

Run: `grep -rn "ledger-day\|Maliyet düzenle\|ledger-edit-cell" admin/ --include=*.tsx --include=*.css --include=*.ts`
Expected: no hits outside `CostDialog*`/`BookingDetailPage` (those keep their own "Maliyet düzenle" wording if any).

- [ ] **Step 3: Final commit (if anything was touched in verification) and report**

Summarise to the user: what changed, the new columns, how to edit, where CSV lands, and that `CostDialog` remains for the booking detail page.
