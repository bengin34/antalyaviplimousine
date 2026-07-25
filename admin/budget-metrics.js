const COLLECTED_STATUSES = new Set(['paid', 'in_transit', 'completed'])
const BOOKING_STATUSES = ['pending', 'confirmed', 'paid', 'in_transit', 'completed', 'cancelled']

function isInPeriod(date, period, today) {
  if (!date) return false
  if (period === 'all') return true
  if (period === 'year') return date.slice(0, 4) === today.slice(0, 4)
  return date.slice(0, 7) === today.slice(0, 7)
}

function isCollected(booking, today) {
  if (booking.status === 'cancelled') return false
  return booking.pickup_date < today
    || Boolean(booking.paid_at)
    || COLLECTED_STATUSES.has(booking.status)
}

function bookingLegs(booking) {
  const legs = booking.pickup_date
    ? [{ date: booking.pickup_date, from: booking.pickup_location, to: booking.dropoff_location }]
    : []
  if (booking.trip_type === 'round_trip' && booking.return_date) {
    legs.push({ date: booking.return_date, from: booking.dropoff_location, to: booking.pickup_location })
  }
  return legs
}

function travelArea(leg) {
  if (leg.from === 'airport' && leg.to !== 'airport') return leg.to
  if (leg.to === 'airport' && leg.from !== 'airport') return leg.from
  return leg.to || leg.from || 'unknown'
}

export function calculateBudgetMetrics(bookings, period, today) {
  const periodBookings = bookings.filter(booking => isInPeriod(booking.pickup_date, period, today))
  const activeBookings = periodBookings.filter(booking => booking.status !== 'cancelled')
  const collectedBookings = activeBookings.filter(booking => isCollected(booking, today))
  const expectedBookings = activeBookings.filter(booking => !isCollected(booking, today)
    && ['pending', 'confirmed'].includes(booking.status))

  const amount = (rows) => rows.reduce((total, booking) => total + (Number(booking.price_eur) || 0), 0)
  const scheduledTrips = bookings.reduce((total, booking) => {
    if (booking.status === 'cancelled') return total
    return total + bookingLegs(booking).filter(leg => isInPeriod(leg.date, period, today)).length
  }, 0)
  const completedLegs = bookings.flatMap(booking => {
    if (booking.status === 'cancelled') return []
    return bookingLegs(booking)
      .filter(leg => leg.date < today && isInPeriod(leg.date, period, today))
  })
  const travelCounts = completedLegs.reduce((counts, leg) => {
    const area = travelArea(leg)
    counts.set(area, (counts.get(area) ?? 0) + 1)
    return counts
  }, new Map())
  const travelHistory = [...travelCounts.entries()]
    .map(([location, count]) => ({ location, count }))
    .sort((a, b) => b.count - a.count || a.location.localeCompare(b.location, 'tr'))

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
    completedTrips: completedLegs.length,
    travelHistory,
    payment: {
      cashAmount: amount(payment.cash),
      cashCount: payment.cash.length,
      cardAmount: amount(payment.card),
      cardCount: payment.card.length,
    },
    statusCounts,
  }
}
