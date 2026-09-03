import { useState, useMemo } from 'react'
import { fmtDetailDate, formatEuro, formatNumber, formatTry, profitLocationLabel } from '../lib/format'
import type { Booking, Navigate } from '../types'
import { legCostColumns, legCostMode, toLegKey, type LegKey } from './LegCostEditors'
import CostDialog from './CostDialog'

export interface LedgerLeg {
  bookingId: string; bookingRef?: string | null; customerName?: string | null
  leg: string; date: string; from?: unknown; to?: unknown
  revenueEur?: number; revenueTry?: number; oneWayKm?: number | null
  vehicleCostTry?: number; supplierCostTry?: number; airportMeetCostTry?: number
  advertisingPerLegEur?: number; advertisingPerLegTry?: number
  netProfitTry?: number; netProfitEur?: number; eurTryRate?: number | null
  isDailyChauffeur?: boolean; distanceSource?: string; dayId?: string | null
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
  if (currentMode === 'no_cost') return false
  if (currentMode === 'sold_transfer') {
    const costTry = booking ? Number(booking[legCostColumns(legKey).cost]) || 0 : 0
    return costTry <= 0
  }
  return leg.oneWayKm == null
}

/** Lightweight "Maliyeti yok" button — yalnız günlük hizmet ayaklarında (modal yok). */
function NoCostButton({ leg, onSaveNoCost }: {
  leg: LedgerLeg
  onSaveNoCost: (leg: LedgerLeg) => Promise<void>
}) {
  const [saving, setSaving] = useState(false)
  const [failed, setFailed] = useState(false)
  const save = async () => {
    setSaving(true); setFailed(false)
    try { await onSaveNoCost(leg) } catch { setFailed(true) } finally { setSaving(false) }
  }
  return <>
    <button className="profit-leg-action is-ghost" type="button" disabled={saving} onClick={() => void save()}>
      {saving ? 'Kaydediliyor…' : 'Maliyeti yok'}
    </button>
    {failed && <span className="inline-error" role="alert">Kaydedilemedi, tekrar deneyin.</span>}
  </>
}

/** İlgili hücredeki düzenleme ikonu; tıklayınca maliyet modalını açar. */
function EditIcon({ onClick }: { onClick: () => void }) {
  return <button type="button" className="cell-edit" aria-label="Maliyet düzenle" title="Maliyet düzenle" onClick={onClick}>✎</button>
}

export function ProfitLedgerGrid({ legs, bookingsById, editable, attentionSince, navigate, today, onBookingSaved, onSaveNoCost }: {
  legs: LedgerLeg[]
  bookingsById: Map<string, Booking>
  editable: boolean
  /** Bu ISO tarihten önceki ayaklar eksik-bilgi uyarısı almaz (dağıtılmış dönem kapanmış sayılır). */
  attentionSince?: string
  /** Verilirse sefer numarası tıklanabilir olur ve seyahat detayına gider. */
  navigate?: Navigate
  /** Maliyet modalının maliyet durumunu hesaplaması için bugünün ISO tarihi. */
  today?: string
  /** Modal bir maliyet kaydettiğinde güncel booking'i yukarı taşır. */
  onBookingSaved?: (booking: Booking) => void
  /** Günlük hizmet ayağını maliyetsiz işaretler (modal kapsamı dışı). */
  onSaveNoCost?: (leg: LedgerLeg) => Promise<void>
}) {
  const [dialog, setDialog] = useState<{ booking: Booking; leg: LegKey } | null>(null)
  const canEditLeg = (leg: LedgerLeg, booking: Booking | undefined): booking is Booking =>
    Boolean(editable && booking && !leg.isDailyChauffeur && today)
  const openDialog = (leg: LedgerLeg, booking: Booking) => setDialog({ booking, leg: toLegKey(leg.leg) })

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
        </tr></thead>
        <tbody>
          {group.legs.map(leg => {
            const booking = bookingsById.get(leg.bookingId)
            const legKey = toLegKey(leg.leg)
            const mode = legCostMode(booking, legKey)
            const canEdit = canEditLeg(leg, booking)
            const editKm = canEdit && mode !== 'sold_transfer'      // kendi araç / maliyeti yok
            const editSupplier = canEdit && mode === 'sold_transfer' // satılan transfer
            const dailyMissing = leg.isDailyChauffeur && leg.distanceSource === 'daily-missing'
            const needsAttention = needsAttentionFor(leg, booking)

            return <tr key={`${leg.bookingId}:${leg.leg}`} className={needsAttention ? 'is-attention' : undefined}>
              <td><RefCell leg={leg} /></td>
              <td>{profitLocationLabel(leg.from)} → {profitLocationLabel(leg.to)}</td>
              <td>{formatEuro(leg.revenueEur ?? 0)}</td>
              <td className="ledger-edit-cell">
                {leg.oneWayKm ? formatNumber(leg.oneWayKm, 1) : '—'}
                {editKm && booking && <EditIcon onClick={() => openDialog(leg, booking)} />}
                {editable && dailyMissing && onSaveNoCost && <NoCostButton leg={leg} onSaveNoCost={onSaveNoCost} />}
              </td>
              <td>{formatTry(leg.vehicleCostTry ?? 0)}</td>
              <td className="ledger-edit-cell">
                {(leg.supplierCostTry ?? 0) > 0 ? formatTry(leg.supplierCostTry) : '—'}
                {editSupplier && booking && <EditIcon onClick={() => openDialog(leg, booking)} />}
              </td>
              <td>{(leg.airportMeetCostTry ?? 0) > 0 ? formatTry(leg.airportMeetCostTry) : '—'}</td>
              <td>{formatTry(leg.advertisingPerLegTry ?? 0)}</td>
              <td className={(leg.netProfitTry ?? 0) < 0 ? 'is-neg' : 'is-pos'}>{formatTry(leg.netProfitTry ?? 0)}</td>
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
          <td className={group.netProfitTry < 0 ? 'is-neg' : 'is-pos'}>{formatTry(group.netProfitTry)}</td>
        </tr></tfoot>
      </table>
      <ul className="ledger-cards">
        {group.legs.map(leg => {
          const booking = bookingsById.get(leg.bookingId)
          const legKey = toLegKey(leg.leg)
          const mode = legCostMode(booking, legKey)
          const canEdit = canEditLeg(leg, booking)
          const editKm = canEdit && mode !== 'sold_transfer'
          const editSupplier = canEdit && mode === 'sold_transfer'
          const dailyMissing = leg.isDailyChauffeur && leg.distanceSource === 'daily-missing'
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
              {mode === 'sold_transfer'
                ? <div><dt>Tedarikçi</dt><dd>{(leg.supplierCostTry ?? 0) > 0 ? formatTry(leg.supplierCostTry) : '—'}{editSupplier && booking && <EditIcon onClick={() => openDialog(leg, booking)} />}</dd></div>
                : <><div><dt>KM</dt><dd>{leg.oneWayKm ? formatNumber(leg.oneWayKm, 1) : '—'}{editKm && booking && <EditIcon onClick={() => openDialog(leg, booking)} />}</dd></div>
                   <div><dt>Araç</dt><dd>{formatTry(leg.vehicleCostTry ?? 0)}</dd></div></>}
              {(leg.airportMeetCostTry ?? 0) > 0 && <div><dt>Karşılama</dt><dd>{formatTry(leg.airportMeetCostTry)}</dd></div>}
              <div><dt>Reklam</dt><dd>{formatTry(leg.advertisingPerLegTry ?? 0)}</dd></div>
            </dl>
            {editable && dailyMissing && onSaveNoCost && <NoCostButton leg={leg} onSaveNoCost={onSaveNoCost} />}
          </li>
        })}
      </ul>
    </section>)}
    {dialog && today && <CostDialog
      booking={dialog.booking}
      leg={dialog.leg}
      today={today}
      onClose={() => setDialog(null)}
      onSaved={next => onBookingSaved?.(next)}
    />}
  </div>
}
