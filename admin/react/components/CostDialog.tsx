import { useState } from 'react'
import { LegCostControls, legDirectionLabel, type CostMode, type LegKey } from './LegCostEditors'
import { bookingLegCostStatus } from '../../profit-loss-metrics.js'
import { saveLegOwnVehicleProfit, saveLegSupplierCost, saveLegCostMode, saveLegMeetFee, saveParkingHours } from '../lib/leg-cost-actions'
import type { Booking } from '../types'

export default function CostDialog({ booking: initial, leg, today, onClose, onSaved }: {
  booking: Booking; leg: LegKey; today: string; onClose: () => void; onSaved: (b: Booking) => void
}) {
  const [booking, setBooking] = useState(initial)
  const apply = (patch: Partial<Booking>) => setBooking(prev => { const next = { ...prev, ...patch }; onSaved(next); return next })
  const status = bookingLegCostStatus(booking, leg, today)
  const legRef = { bookingId: booking.id, bookingRef: booking.booking_ref, leg }
  const legLabel = legDirectionLabel(booking, leg)
  const ownVehicleProfitEur = leg === 'return' ? booking.return_own_vehicle_profit_eur : booking.own_vehicle_profit_eur
  const currentCostTry = Number(leg === 'return' ? booking.return_sold_transfer_cost_try : booking.sold_transfer_cost_try) || 0
  const parkingHours = Number(booking.airport_meet_fee_parking_hours) || 1

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
            ownVehicleProfitEur={typeof ownVehicleProfitEur === 'number' ? ownVehicleProfitEur : (ownVehicleProfitEur != null ? Number(ownVehicleProfitEur) : null)}
            onSaveOwnVehicleProfit={async (_l, profitEur) => { apply(await saveLegOwnVehicleProfit(booking.id, leg, profitEur)) }}
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
          {status.meetFeeApplicable && !status.meetFeeApplies && (
            <label className="meet-toggle">
              <span><strong>Otopark saati · ₺{status.parkingCostTry ?? parkingHours * 180} eşdeğer</strong><small>Karşılama ücreti verilmediği için saat başı ₺180 otopark gideri uygulanır.</small></span>
              <input type="number" min="0.5" max="24" step="0.5" value={parkingHours}
                onChange={async e => {
                  const hours = Number(e.target.value)
                  if (Number.isFinite(hours) && hours > 0) apply(await saveParkingHours(booking.id, hours))
                }} />
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
