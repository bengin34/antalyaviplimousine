import { useMemo } from 'react'
import { fmtDetailDate, formatEuro, formatNumber, formatTry, profitLocationLabel } from '../lib/format'
import type { Booking } from '../types'
import {
  LegCostControls,
  legCostColumns,
  legCostMode,
  legLabelFor,
  toLegKey,
  type SaveCostMode,
  type SaveDistance,
  type SaveSupplierCost,
} from './LegCostEditors'

export interface LedgerLeg {
  bookingId: string; bookingRef?: string | null; customerName?: string | null
  leg: string; date: string; from?: unknown; to?: unknown
  revenueEur?: number; revenueTry?: number; oneWayKm?: number | null
  vehicleCostTry?: number; supplierCostTry?: number; airportMeetCostTry?: number
  advertisingPerLegEur?: number; advertisingPerLegTry?: number
  netProfitTry?: number; netProfitEur?: number; eurTryRate?: number | null
  isDailyChauffeur?: boolean; distanceSource?: string
}

function groupByDate(legs: LedgerLeg[]) {
  const groups = new Map<string, LedgerLeg[]>()
  for (const leg of legs) {
    const d = String(leg.date ?? '')
    const g = groups.get(d)
    if (g) g.push(leg); else groups.set(d, [leg])
  }
  const sum = (ls: LedgerLeg[], k: keyof LedgerLeg) => ls.reduce((t, l) => t + (Number(l[k]) || 0), 0)
  return [...groups.entries()]
    .sort((a, b) => b[0].localeCompare(a[0]))
    .map(([date, ls]) => ({
      date, legs: ls,
      revenueEur: sum(ls, 'revenueEur'), revenueTry: sum(ls, 'revenueTry'),
      vehicleCostTry: sum(ls, 'vehicleCostTry'), supplierCostTry: sum(ls, 'supplierCostTry'),
      airportMeetCostTry: sum(ls, 'airportMeetCostTry'), advertisingPerLegTry: sum(ls, 'advertisingPerLegTry'),
      netProfitTry: sum(ls, 'netProfitTry'),
    }))
}

export function ProfitLedgerGrid({ legs, bookingsById, editable, onSaveDistance, onSaveSupplierCost, onSaveCostMode }: {
  legs: LedgerLeg[]
  bookingsById: Map<string, Booking>
  editable: boolean
  onSaveDistance?: SaveDistance
  onSaveSupplierCost?: SaveSupplierCost
  onSaveCostMode?: SaveCostMode
}) {
  const groups = useMemo(() => groupByDate([...legs].sort((a, b) =>
    String(b.date).localeCompare(String(a.date)) || String(a.bookingRef ?? '').localeCompare(String(b.bookingRef ?? '')),
  )), [legs])

  if (!groups.length) return <div className="ledger-empty">Bu dönemde gerçekleşmiş sefer yok.</div>

  const colCount = editable ? 10 : 9

  return <div className="ledger">
    {groups.map(group => <section className="ledger-day" key={group.date}>
      <header className="ledger-day-head">
        <span>{fmtDetailDate(group.date)}</span>
        <span>{group.legs.length} sefer</span>
        <b className={group.netProfitTry < 0 ? 'is-neg' : 'is-pos'}>{formatTry(group.netProfitTry)}</b>
      </header>
      <table className="ledger-table">
        <thead><tr>
          <th>Sefer</th><th>Rota</th><th>Gelir</th><th>KM</th><th>Araç</th>
          <th>Tedarikçi</th><th>Karşılama</th><th>Reklam</th><th>Kâr</th>
          {editable && <th>Düzenle</th>}
        </tr></thead>
        <tbody>
          {group.legs.map(leg => {
            const booking = bookingsById.get(leg.bookingId)
            const isDailyChauffeur = Boolean(leg.isDailyChauffeur)
            const legKey = toLegKey(leg.leg)
            const legLabel = legLabelFor(leg.leg)
            const currentMode = legCostMode(booking, legKey)
            const isSoldTransfer = !isDailyChauffeur && currentMode === 'sold_transfer'
            const currentCostTry = booking ? Number(booking[legCostColumns(legKey).cost]) || 0 : 0
            const showEditor = editable && booking && !isDailyChauffeur

            return <tr key={`${leg.bookingId}:${leg.leg}`}>
              <td>{leg.bookingRef || leg.customerName || 'Kayıt'}</td>
              <td>{profitLocationLabel(leg.from)} → {profitLocationLabel(leg.to)}</td>
              <td>{formatEuro(leg.revenueEur ?? 0)}</td>
              <td>{leg.oneWayKm ? formatNumber(leg.oneWayKm, 1) : '—'}</td>
              <td>{formatTry(leg.vehicleCostTry ?? 0)}</td>
              <td>{(leg.supplierCostTry ?? 0) > 0 ? formatTry(leg.supplierCostTry) : '—'}</td>
              <td>{(leg.airportMeetCostTry ?? 0) > 0 ? formatTry(leg.airportMeetCostTry) : '—'}</td>
              <td>{formatTry(leg.advertisingPerLegTry ?? 0)}</td>
              <td className={(leg.netProfitTry ?? 0) < 0 ? 'is-neg' : 'is-pos'}>{formatTry(leg.netProfitTry ?? 0)}</td>
              {editable && <td>
                {showEditor && onSaveDistance && onSaveCostMode && onSaveSupplierCost && <LegCostControls
                  booking={booking}
                  legRef={{ bookingId: leg.bookingId, bookingRef: leg.bookingRef, leg: leg.leg }}
                  leg={legKey}
                  legLabel={legLabel}
                  currentCostTry={currentCostTry}
                  isSoldTransfer={isSoldTransfer}
                  oneWayKm={leg.oneWayKm ?? undefined}
                  onSaveDistance={onSaveDistance}
                  onSaveCostMode={onSaveCostMode}
                  onSaveSupplierCost={onSaveSupplierCost}
                />}
              </td>}
            </tr>
          })}
        </tbody>
        <tfoot><tr className="ledger-subtotal">
          <td colSpan={2}>Gün toplamı</td>
          <td>{formatEuro(group.revenueEur)}</td><td></td>
          <td>{formatTry(group.vehicleCostTry)}</td>
          <td>{formatTry(group.supplierCostTry)}</td>
          <td>{formatTry(group.airportMeetCostTry)}</td>
          <td>{formatTry(group.advertisingPerLegTry)}</td>
          <td className={group.netProfitTry < 0 ? 'is-neg' : 'is-pos'} colSpan={colCount - 8}>{formatTry(group.netProfitTry)}</td>
        </tr></tfoot>
      </table>
    </section>)}
  </div>
}
