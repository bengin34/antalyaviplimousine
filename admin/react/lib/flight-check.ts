/**
 * Uçuş doğrulaması başarısız olan rezervasyonları aksiyona çevirir.
 *
 * Bu listeyi yalnızca müşteri kapatabilir: tarife sorgusu zaten başarısız
 * oldu ve iniş saatini tahmin etmek şoförü yanlış saatte havalimanına
 * göndermek demek. O yüzden her satır tek tıkla mesaja ve kaydın detayına
 * gider.
 */

import { whatsappURL } from '../../turkish-formatters.js'
import { buildFlightCheckMessage } from '../../whatsapp-templates.js'

export type FlightCheckBooking = {
  booking_ref: string
  customer_name: string
  customer_phone: string
  language: string
  flight_number: string | null
  pickup_date: string
  flight_verification_status: 'not_found' | 'wrong_airport'
}

const STATUS_LABELS: Record<FlightCheckBooking['flight_verification_status'], string> = {
  not_found: 'Uçuş bulunamadı',
  wrong_airport: 'Farklı havalimanı',
}

export type FlightCheckRow = FlightCheckBooking & {
  statusLabel: string
  /** Telefon yoksa null: boş bir wa.me adresi açmak operatörü yanıltır. */
  whatsappURL: string | null
  detailHash: string
}

export function flightCheckRows(bookings: FlightCheckBooking[]): FlightCheckRow[] {
  return [...bookings]
    .sort((left, right) => left.pickup_date.localeCompare(right.pickup_date))
    .map(booking => ({
      ...booking,
      statusLabel: STATUS_LABELS[booking.flight_verification_status] ?? booking.flight_verification_status,
      whatsappURL: booking.customer_phone
        ? whatsappURL(booking.customer_phone, buildFlightCheckMessage(booking))
        : null,
      detailHash: `#detail/${encodeURIComponent(booking.booking_ref)}?from=future`,
    }))
}
