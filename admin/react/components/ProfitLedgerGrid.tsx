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
import { LedgerSurfaceContext } from './EditableCell'
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
    enableSortingRemoval: false, // desc → asc → desc; üçüncü "sırasız" durum yok
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

    <LedgerSurfaceContext.Provider value="card"><ul className="ledger-cards">
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
    </ul></LedgerSurfaceContext.Provider>
  </div>
}
