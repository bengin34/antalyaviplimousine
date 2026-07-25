const COLLECTED_STATUSES = new Set(['paid', 'in_transit', 'completed'])
const BOOKING_STATUSES = ['pending', 'confirmed', 'paid', 'in_transit', 'completed', 'cancelled']

function isInPeriod(date, period, today) {
  if (!date) return false
  if (period === 'all') return true
  if (period === 'year') return date.slice(0, 4) === today.slice(0, 4)
  return date.slice(0, 7) === today.slice(0, 7)
}

function isCollected(booking) {
  if (booking.status === 'cancelled') return false
  return Boolean(booking.paid_at) || COLLECTED_STATUSES.has(booking.status)
}

function bookingLegDates(booking) {
  const dates = booking.pickup_date ? [booking.pickup_date] : []
  if (booking.trip_type === 'round_trip' && booking.return_date) dates.push(booking.return_date)
  return dates
}

export function calculateBudgetMetrics(bookings, period, today) {
  const periodBookings = bookings.filter(booking => isInPeriod(booking.pickup_date, period, today))
  const activeBookings = periodBookings.filter(booking => booking.status !== 'cancelled')
  const collectedBookings = activeBookings.filter(isCollected)
  const expectedBookings = activeBookings.filter(booking => !isCollected(booking)
    && ['pending', 'confirmed'].includes(booking.status))

  const amount = (rows) => rows.reduce((total, booking) => total + (Number(booking.price_eur) || 0), 0)
  const scheduledTrips = bookings.reduce((total, booking) => {
    if (booking.status === 'cancelled') return total
    return total + bookingLegDates(booking).filter(date => isInPeriod(date, period, today)).length
  }, 0)
  const completedTrips = bookings.reduce((total, booking) => {
    if (booking.status === 'cancelled') return total
    return total + bookingLegDates(booking)
      .filter(date => date < today && isInPeriod(date, period, today)).length
  }, 0)

  const payment = {
    cash: collectedBookings.filter(booking => booking.payment_method === 'cash'),
    card: collectedBookings.filter(booking => booking.payment_method === 'card'),
  }
  const statusCounts = Object.fromEntries(BOOKING_STATUSES.map(status => [
    status,
    periodBookings.filter(booking => booking.status === status).length,
  ]))

  return {
    collectedAmount: amount(collectedBookings),
    collectedCount: collectedBookings.length,
    expectedAmount: amount(expectedBookings),
    expectedCount: expectedBookings.length,
    reservationCount: activeBookings.length,
    scheduledTrips,
    completedTrips,
    payment: {
      cashAmount: amount(payment.cash),
      cashCount: payment.cash.length,
      cardAmount: amount(payment.card),
      cardCount: payment.card.length,
    },
    statusCounts,
  }
}
