import { bookingHotelEnds } from '../../turkish-formatters.js'

export interface BookingPrefill {
  sourceRef?: string
  isManualReturn?: boolean
  customerName?: string
  customerPhone?: string
  hotelName?: string
  // Otelden otele seyahatte varış oteli; ters yönde kopyalanırken alış oteliyle
  // yer değiştirir, tıpkı konumlar gibi.
  dropoffHotelName?: string
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

/**
 * Bir seyahati kopyalarken ya da ters yönde planlarken otel adlarını yeni
 * kaydın uçlarına dağıtır.
 *
 * Kayıtta otel adları uçlara dolaylı bağlıdır (`bookingHotelEnds`), yeni formda
 * ise doğrudan: `hotelName` misafirin oteli, `dropoffHotelName` varış oteli.
 * Ters yönde ikisi yer değiştirir — bunu atlamak, havalimanı dönüşü planlarken
 * otel adını tamamen düşürürdü.
 */
export function prefillHotelNames(
  booking: { pickup_location?: string | null; dropoff_location?: string | null; hotel_name?: string | null; dropoff_hotel_name?: string | null },
  reverse: boolean,
) {
  const ends = bookingHotelEnds(booking)
  const fromHotel = (reverse ? ends.dropoffHotel : ends.pickupHotel).trim()
  const toHotel = (reverse ? ends.pickupHotel : ends.dropoffHotel).trim()
  const guestHotel = fromHotel || toHotel
  return {
    hotelName: guestHotel.toLocaleLowerCase('tr-TR') === 'belirtilmedi' ? '' : guestHotel,
    dropoffHotelName: fromHotel ? toHotel : '',
  }
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
