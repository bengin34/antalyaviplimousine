import { createColumnHelper, type FilterFn, type Row, type RowData } from '@tanstack/react-table'
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
  interface TableMeta<TData extends RowData> { ledger: LedgerTableMeta }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ColumnMeta<TData extends RowData, TValue> { align?: 'left' | 'right'; csv: CsvColumn<LedgerRow>[] }
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
        kind="number" label={ctx.label('tedarikçi maliyeti')} step="0.01"
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
        kind="number" label={ctx.label('otopark saati')} step="0.25"
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
