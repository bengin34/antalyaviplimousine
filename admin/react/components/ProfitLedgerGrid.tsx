import { useState, useMemo } from 'react'
import { fmtDetailDate, formatEuro, formatNumber, formatTry, profitLocationLabel } from '../lib/format'
import type { Booking, Navigate } from '../types'
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

/** Mirrors TripRow needsAttention logic from ProfitLossPage.tsx */
function computeNeedsAttention(leg: LedgerLeg, booking: Booking | undefined): boolean {
  const isDailyChauffeur = Boolean(leg.isDailyChauffeur)
  if (isDailyChauffeur && leg.distanceSource !== 'daily-missing') return false
  if (leg.distanceSource === 'daily-missing') return true
  if (isDailyChauffeur) return false
  const legKey = toLegKey(leg.leg)
  const currentMode = legCostMode(booking, legKey)
  const isSoldTransfer = currentMode === 'sold_transfer'
  const isNoCost = currentMode === 'no_cost'
  if (isNoCost) return false
  if (isSoldTransfer) {
    const costTry = booking ? Number(booking[legCostColumns(legKey).cost]) || 0 : 0
    return costTry <= 0
  }
  // own-vehicle: missing KM
  return leg.oneWayKm == null
}

/** Lightweight "Maliyeti yok" button with pending/failed state. */
function NoCostButton({ leg, onSaveNoCost }: {
  leg: LedgerLeg
  onSaveNoCost: (leg: LedgerLeg) => Promise<void>
}) {
  const [saving, setSaving] = useState(false)
  const [failed, setFailed] = useState(false)
  const save = async () => {
    setSaving(true); setFailed(false)
    try {
      await onSaveNoCost(leg)
    } catch {
      setFailed(true)
    } finally {
      setSaving(false)
    }
  }
  return <>
    <button className="profit-leg-action is-ghost" type="button" disabled={saving} onClick={() => void save()}>
      {saving ? 'Kaydediliyor…' : 'Maliyeti yok'}
    </button>
    {failed && <span className="inline-error" role="alert">Kaydedilemedi, tekrar deneyin.</span>}
  </>
}

export function ProfitLedgerGrid({ legs, bookingsById, editable, attentionSince, navigate, onSaveDistance, onSaveSupplierCost, onSaveCostMode, onSaveNoCost }: {
  legs: LedgerLeg[]
  bookingsById: Map<string, Booking>
  editable: boolean
  /** Bu ISO tarihten önceki ayaklar eksik-bilgi uyarısı almaz (dağıtılmış dönem kapanmış sayılır). */
  attentionSince?: string
  /** Verilirse sefer numarası tıklanabilir olur ve seyahat detayına gider. */
  navigate?: Navigate
  onSaveDistance?: SaveDistance
  onSaveSupplierCost?: SaveSupplierCost
  onSaveCostMode?: SaveCostMode
  onSaveNoCost?: (leg: LedgerLeg) => Promise<void>
}) {
  const needsAttentionFor = (leg: LedgerLeg, booking: Booking | undefined) =>
    computeNeedsAttention(leg, booking) && (!attentionSince || String(leg.date ?? '') >= attentionSince)
  const detailHash = (leg: LedgerLeg) =>
    `#detail/${encodeURIComponent(String(leg.bookingRef ?? ''))}?from=profit-loss${leg.leg === 'return' ? '&leg=return' : ''}`
  const refLabel = (leg: LedgerLeg) => leg.bookingRef || leg.customerName || 'Kayıt'
  const RefCell = ({ leg }: { leg: LedgerLeg }) => (navigate && leg.bookingRef)
    ? <button type="button" className="ledger-ref-link" onClick={() => navigate(detailHash(leg))}>{refLabel(leg)}</button>
    : <>{refLabel(leg)}</>
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
            const needsAttention = needsAttentionFor(leg, booking)

            return <tr key={`${leg.bookingId}:${leg.leg}`} className={needsAttention ? 'is-attention' : undefined}>
              <td><RefCell leg={leg} /></td>
              <td>{profitLocationLabel(leg.from)} → {profitLocationLabel(leg.to)}</td>
              <td>{formatEuro(leg.revenueEur ?? 0)}</td>
              <td>{leg.oneWayKm ? formatNumber(leg.oneWayKm, 1) : '—'}</td>
              <td>{formatTry(leg.vehicleCostTry ?? 0)}</td>
              <td>{(leg.supplierCostTry ?? 0) > 0 ? formatTry(leg.supplierCostTry) : '—'}</td>
              <td>{(leg.airportMeetCostTry ?? 0) > 0 ? formatTry(leg.airportMeetCostTry) : '—'}</td>
              <td>{formatTry(leg.advertisingPerLegTry ?? 0)}</td>
              <td className={(leg.netProfitTry ?? 0) < 0 ? 'is-neg' : 'is-pos'}>{formatTry(leg.netProfitTry ?? 0)}</td>
              {editable && <td>
                {needsAttention && <span className="ledger-attention">Eksik bilgi</span>}
                {editable && needsAttention && onSaveNoCost && <NoCostButton leg={leg} onSaveNoCost={onSaveNoCost} />}
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
      <ul className="ledger-cards">
        {group.legs.map(leg => {
          const booking = bookingsById.get(leg.bookingId)
          const isDailyChauffeur = Boolean(leg.isDailyChauffeur)
          const legKey = toLegKey(leg.leg)
          const legLabel = legLabelFor(leg.leg)
          const currentMode = legCostMode(booking, legKey)
          const isSoldTransfer = !isDailyChauffeur && currentMode === 'sold_transfer'
          const currentCostTry = booking ? Number(booking[legCostColumns(legKey).cost]) || 0 : 0
          const showEditor = editable && booking && !isDailyChauffeur
          const needsAttention = needsAttentionFor(leg, booking)

          return <li className={`ledger-card${needsAttention ? ' is-attention' : ''}`} key={`${leg.bookingId}:${leg.leg}`}>
            <div className="ledger-card-head">
              <strong><RefCell leg={leg} /></strong>
              <b className={(leg.netProfitTry ?? 0) < 0 ? 'is-neg' : 'is-pos'}>{formatTry(leg.netProfitTry ?? 0)}</b>
            </div>
            {needsAttention && <span className="ledger-attention">Eksik bilgi</span>}
            <div className="ledger-card-route">{profitLocationLabel(leg.from)} → {profitLocationLabel(leg.to)}</div>
            <dl className="ledger-card-facts">
              <div><dt>Gelir</dt><dd>{formatEuro(leg.revenueEur ?? 0)}</dd></div>
              {(leg.supplierCostTry ?? 0) > 0
                ? <div><dt>Tedarikçi</dt><dd>{formatTry(leg.supplierCostTry)}</dd></div>
                : <><div><dt>KM</dt><dd>{leg.oneWayKm ? formatNumber(leg.oneWayKm, 1) : '—'}</dd></div>
                   <div><dt>Araç</dt><dd>{formatTry(leg.vehicleCostTry ?? 0)}</dd></div></>}
              {(leg.airportMeetCostTry ?? 0) > 0 && <div><dt>Karşılama</dt><dd>{formatTry(leg.airportMeetCostTry)}</dd></div>}
              <div><dt>Reklam</dt><dd>{formatTry(leg.advertisingPerLegTry ?? 0)}</dd></div>
            </dl>
            {editable && needsAttention && onSaveNoCost && <NoCostButton leg={leg} onSaveNoCost={onSaveNoCost} />}
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
          </li>
        })}
      </ul>
    </section>)}
  </div>
}
