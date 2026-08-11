export interface BookingPrefill {
  sourceRef?: string
  isManualReturn?: boolean
  customerName?: string
  customerPhone?: string
  hotelName?: string
  pickupLocation?: string
  pickupAddress?: string | null
  dropoffLocation?: string
  dropoffAddress?: string | null
  vehicleType?: string
  guests?: number
  luggageCount?: number
  childSeatCount?: number
  paymentMethod?: string
  notes?: string
}

const PREFILL_STORAGE_KEY = 'vip-admin-new-booking-prefill'

export function queueBookingPrefill(data: BookingPrefill) {
  try {
    sessionStorage.setItem(PREFILL_STORAGE_KEY, JSON.stringify(data))
  } catch {
    // Storage is optional; the form can still be opened without prefill.
  }
}

export function consumeBookingPrefill(): BookingPrefill | null {
  try {
    const raw = sessionStorage.getItem(PREFILL_STORAGE_KEY)
    if (!raw) return null
    sessionStorage.removeItem(PREFILL_STORAGE_KEY)
    return JSON.parse(raw) as BookingPrefill
  } catch {
    return null
  }
}
