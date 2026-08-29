import type { Booking, TimelineCard } from '../types'
import { isFutureIstanbulLeg } from '../../turkish-formatters.js'
import { transferStartTime } from '../lib/format'

export const TODAY_CACHE_KEY = 'vip-admin-today-cache-v2'

export interface MonthCalendarDay {
  isoDate: string
  day: number
}

export function shiftCalendarMonth(yyyyMm: string, difference: number) {
  const [year, month] = yyyyMm.split('-').map(Number)
  const shifted = new Date(Date.UTC(year, month - 1 + difference, 1))
  return `${shifted.getUTCFullYear()}-${String(shifted.getUTCMonth() + 1).padStart(2, '0')}`
}

export function buildMonthCalendar(yyyyMm: string): Array<MonthCalendarDay | null> {
  const [year, month] = yyyyMm.split('-').map(Number)
  const firstDay = new Date(Date.UTC(year, month - 1, 1))
  const mondayOffset = (firstDay.getUTCDay() + 6) % 7
  const daysInMonth = new Date(Date.UTC(year, month, 0)).getUTCDate()
  const cells: Array<MonthCalendarDay | null> = Array.from({ length: 42 }, () => null)

  for (let day = 1; day <= daysInMonth; day += 1) {
    cells[mondayOffset + day - 1] = {
      day,
      isoDate: `${yyyyMm}-${String(day).padStart(2, '0')}`,
    }
  }

  return cells
}

export function clearTimelineCache() {
  try { localStorage.removeItem(TODAY_CACHE_KEY) } catch { /* storage is optional */ }
}

export function expandRoundTrips(bookings: Booking[], mode: 'timeline' | 'cancelled' = 'timeline'): TimelineCard[] {
  const cards: TimelineCard[] = []
  for (const booking of bookings) {
    if (booking.trip_type === 'daily_chauffeur' && booking.service_end_date) {
      const start = Date.parse(`${booking.pickup_date}T00:00:00Z`)
      const end = Date.parse(`${booking.service_end_date}T00:00:00Z`)
      const dayCount = Math.floor((end - start) / 86_400_000) + 1
      const dayRecords = new Map((booking.chauffeur_hire_days ?? []).map(day => [day.service_date, day]))
      if (Number.isInteger(dayCount) && dayCount > 0 && dayCount <= 30) {
        for (let index = 0; index < dayCount; index += 1) {
          const serviceDate = new Date(start + index * 86_400_000).toISOString().slice(0, 10)
          const day = dayRecords.get(serviceDate)
          const dailyStatus = day?.status === 'completed' ? 'completed' : day?.status === 'in_progress' ? 'in_transit' : booking.status
          cards.push({
            ...booking,
            status: dailyStatus,
            driver_name: day?.driver_name || booking.driver_name,
            vehicle_plate: day?.vehicle_plate || booking.vehicle_plate,
            flight_number: index === 0 ? booking.flight_number : index === dayCount - 1 ? booking.departure_flight_number : null,
            flight_arrival_time: index === 0 ? booking.flight_arrival_time : index === dayCount - 1 ? booking.departure_flight_time : null,
            _displayDate: serviceDate,
            _displayTime: booking.pickup_time,
            _isReturn: false,
            _hireDayNumber: index + 1,
            _hireDayCount: dayCount,
          })
        }
      }
      continue
    }
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
        pickup_location: booking.dropoff_location ?? 'hotel',
        dropoff_location: booking.pickup_location,
        pickup_address: booking.dropoff_address,
        dropoff_address: booking.pickup_address,
        flight_number: booking.return_flight_number,
        flight_arrival_time: null,
      })
    }
  }

  const descending = mode === 'cancelled'
  return cards.sort((left, right) => {
    if (left._displayDate !== right._displayDate) {
      return descending
        ? right._displayDate.localeCompare(left._displayDate)
        : left._displayDate.localeCompare(right._displayDate)
    }
    if (!left._displayTime && !right._displayTime) return 0
    if (!left._displayTime) return 1
    if (!right._displayTime) return -1
    return descending
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
