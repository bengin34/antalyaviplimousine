import type { Booking, TimelineCard } from '../types'
import { isFutureIstanbulLeg } from '../../turkish-formatters.js'
import { transferStartTime } from '../lib/format'

export const TODAY_CACHE_KEY = 'vip-admin-today-cache-v2'

export function clearTimelineCache() {
  try { localStorage.removeItem(TODAY_CACHE_KEY) } catch { /* storage is optional */ }
}

export function expandRoundTrips(bookings: Booking[], selectedTab: 'future' | 'past'): TimelineCard[] {
  const cards: TimelineCard[] = []
  for (const booking of bookings) {
    cards.push({
      ...booking,
      _displayDate: booking.pickup_date,
      _displayTime: transferStartTime(booking.pickup_location, booking.pickup_time, booking.flight_arrival_time),
      _isReturn: false,
    })
    if (booking.trip_type === 'round_trip' && booking.return_date) {
      const needsReturnContact = booking.status === 'completed' && isFutureIstanbulLeg(
        booking.return_date, booking.return_pickup_time,
      )
      cards.push({
        ...booking,
        status: needsReturnContact ? 'confirmed' : booking.status,
        _isReturn: true,
        _needsReturnContact: needsReturnContact,
        _displayDate: booking.return_date,
        _displayTime: booking.return_pickup_time,
        pickup_location: booking.dropoff_location,
        dropoff_location: booking.pickup_location,
        pickup_address: booking.dropoff_address,
        dropoff_address: booking.pickup_address,
        flight_number: booking.return_flight_number,
        flight_arrival_time: null,
      })
    }
  }

  return cards.sort((left, right) => {
    if (left._displayDate !== right._displayDate) {
      return selectedTab === 'past'
        ? right._displayDate.localeCompare(left._displayDate)
        : left._displayDate.localeCompare(right._displayDate)
    }
    if (!left._displayTime && !right._displayTime) return 0
    if (!left._displayTime) return 1
    if (!right._displayTime) return -1
    return selectedTab === 'past'
      ? right._displayTime.localeCompare(left._displayTime)
      : left._displayTime.localeCompare(right._displayTime)
  })
}

export function countFutureReservations(bookings: Booking[]) {
  return new Set(bookings
    .filter(booking => booking.status !== 'completed' || (
      booking.trip_type === 'round_trip'
      && isFutureIstanbulLeg(booking.return_date, booking.return_pickup_time)
    ))
    .map(booking => booking.id ?? booking.booking_ref)).size
}
