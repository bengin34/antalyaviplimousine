import { useState } from 'react'
import { LegCostControls, legDirectionLabel, type CostMode, type LegKey } from './LegCostEditors'
import { bookingLegCostStatus } from '../../profit-loss-metrics.js'
import { saveLegDistance, saveLegSupplierCost, saveLegCostMode, saveLegMeetFee } from '../lib/leg-cost-actions'
import type { Booking } from '../types'

export default function CostDialog({ booking: initial, leg, today, onClose, onSaved }: {
  booking: Booking; leg: LegKey; today: string; onClose: () => void; onSaved: (b: Booking) => void
}) {
  const [booking, setBooking] = useState(initial)
  const apply = (patch: Partial<Booking>) => setBooking(prev => { const next = { ...prev, ...patch }; onSaved(next); return next })
  const status = bookingLegCostStatus(booking, leg, today)
  const legRef = { bookingId: booking.id, bookingRef: booking.booking_ref, leg }
  const legLabel = legDirectionLabel(booking, leg)
  const oneWayKm = leg === 'return' ? booking.manual_return_distance_km : booking.manual_outbound_distance_km
  const currentCostTry = Number(leg === 'return' ? booking.return_sold_transfer_cost_try : booking.sold_transfer_cost_try) || 0

  return (
    <div className="cost-dialog-overlay" role="dialog" aria-modal="true">
      <div className="cost-dialog">
        <div className="cost-dialog-head">
          <h3>{legLabel} maliyeti</h3>
          <p>{booking.booking_ref} · {booking.customer_name}</p>
        </div>
        <div className="cost-dialog-body">
          <LegCostControls
            booking={booking} legRef={legRef} leg={leg} legLabel={legLabel}
            currentCostTry={currentCostTry} isSoldTransfer={status.costMode === 'sold_transfer'}
            oneWayKm={typeof oneWayKm === 'number' ? oneWayKm : (oneWayKm != null ? Number(oneWayKm) || undefined : undefined)}
            onSaveDistance={async (_l, km) => { apply(await saveLegDistance(booking.id, leg, km)) }}
            onSaveCostMode={async (_b, l, mode: CostMode) => { apply(await saveLegCostMode(booking.id, l, mode)) }}
            onSaveSupplierCost={async (_b, l, cost) => { apply(await saveLegSupplierCost(booking.id, l, cost)) }}
          />
          {status.meetFeeApplicable && (
            <label className="meet-toggle">
              <input type="checkbox" checked={status.meetFeeApplies}
                onChange={async e => { apply(await saveLegMeetFee(booking.id, e.target.checked)) }} />
              <span><strong>Karşılama ücreti · 250 ₺</strong><small>Havalimanı karşılaması. Vermediyseniz kaldırın.</small></span>
            </label>
          )}
        </div>
        <div className="cost-dialog-foot">
          <div className={`cost-dialog-status ${status.complete ? 'is-done' : 'is-need'}`}>
            {status.complete ? 'Maliyet hazır ✓' : `${legLabel} maliyeti girilmedi`}
          </div>
          <div className="cost-dialog-actions">
            <button type="button" className="btn-outline" onClick={onClose}>Sonra</button>
            <button type="button" className="btn" onClick={() => { onSaved(booking); onClose() }}>Kaydet</button>
          </div>
        </div>
      </div>
    </div>
  )
}
