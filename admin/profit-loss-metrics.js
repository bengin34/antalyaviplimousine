import { routeEdges } from '../src/routes.js'

export const DEFAULT_KM_COST_TRY = 15
export const DEFAULT_EUR_TRY_RATE = 50
export const AIRPORT_MEET_COST_EUR = 5

const REALIZED_TODAY_STATUSES = new Set(['paid', 'in_transit', 'completed'])

// Sabit yol mesafeleri. Havalimanı bağlantıları mevcut fiyat tablosundaki
// yaklaşık mesafelerle aynıdır. Komşu bölgeler arasındaki bağlantılar, admin
// panelinden havalimanı dışı bir rota girildiğinde en kısa sabit güzergâhın
// hesaplanabilmesini sağlar; harita servisine istek yapılmaz.
const ROUTE_GRAPH = routeEdges.reduce((graph, [from, to, distance]) => {
  if (!graph.has(from)) graph.set(from, [])
  if (!graph.has(to)) graph.set(to, [])
  graph.get(from).push({ location: to, distance })
  graph.get(to).push({ location: from, distance })
  return graph
}, new Map())

function normalizeLocation(value) {
  return String(value ?? '').trim().toLocaleLowerCase('tr-TR')
}

function startsFromAirport(location) {
  return normalizeLocation(location) === 'airport'
}

export function fixedRouteDistanceKm(fromValue, toValue) {
  const from = normalizeLocation(fromValue)
  const to = normalizeLocation(toValue)
  if (!from || !to || from === to) return from && from === to ? 0 : null
  if (!ROUTE_GRAPH.has(from) || !ROUTE_GRAPH.has(to)) return null

  const distances = new Map([[from, 0]])
  const visited = new Set()

  while (visited.size < ROUTE_GRAPH.size) {
    let current = null
    let currentDistance = Infinity
    for (const [location, distance] of distances) {
      if (!visited.has(location) && distance < currentDistance) {
        current = location
        currentDistance = distance
      }
    }

    if (current === null) return null
    if (current === to) return currentDistance
    visited.add(current)

    for (const edge of ROUTE_GRAPH.get(current) ?? []) {
      const nextDistance = currentDistance + edge.distance
      if (nextDistance < (distances.get(edge.location) ?? Infinity)) {
        distances.set(edge.location, nextDistance)
      }
    }
  }

  return null
}

function isInPeriod(date, period) {
  if (!date) return false
  return period === 'all' || date.slice(0, 7) === period
}

function isRealizedLeg(booking, date, today, legStatus) {
  if (!date || booking.status === 'cancelled' || date > today) return false
  return date < today || REALIZED_TODAY_STATUSES.has(legStatus || booking.status)
}

function bookingLegs(booking) {
  const priceEur = Number(booking.price_eur) || 0
  const costMode = booking.service_cost_mode === 'sold_transfer' ? 'sold_transfer' : 'own_vehicle'
  const soldTransferTotalCostTry = Number(booking.sold_transfer_cost_try) || 0
  if (booking.trip_type === 'daily_chauffeur') {
    const days = [...(booking.chauffeur_hire_days || [])].sort((left, right) => left.day_number - right.day_number)
    const dailyRate = Number(booking.daily_rate_eur) || (days.length ? priceEur / days.length : priceEur)
    return days.map(day => ({
      leg: `day-${day.day_number}`,
      date: day.service_date,
      from: 'daily_chauffeur',
      to: 'daily_chauffeur',
      revenueEur: dailyRate,
      directVehicleKm: Number.isFinite(Number(day.distance_km)) && Number(day.distance_km) >= 0 ? Number(day.distance_km) : null,
      legStatus: day.status === 'completed' ? 'completed' : day.status === 'in_progress' ? 'in_transit' : booking.status,
      isDailyChauffeur: true,
      costMode: 'own_vehicle',
      soldTransferTotalCostTry: 0,
    }))
  }
  const hasReturn = booking.trip_type === 'round_trip' && Boolean(booking.return_date)
  const legRevenueEur = hasReturn ? priceEur / 2 : priceEur
  const legs = booking.pickup_date
    ? [{
        leg: 'outbound',
        date: booking.pickup_date,
        from: booking.pickup_location,
        to: booking.dropoff_location,
        revenueEur: legRevenueEur,
        costMode,
        soldTransferTotalCostTry,
        splitSupplierCostTry: hasReturn ? soldTransferTotalCostTry / 2 : soldTransferTotalCostTry,
      }]
    : []

  if (hasReturn) {
    legs.push({
      leg: 'return',
      date: booking.return_date,
      from: booking.dropoff_location,
      to: booking.pickup_location,
      revenueEur: legRevenueEur,
      costMode,
      soldTransferTotalCostTry,
      splitSupplierCostTry: soldTransferTotalCostTry / 2,
    })
  }

  return legs
}

function normalizeSetting(setting = {}) {
  const kmCost = Number(setting.km_cost_try)
  const exchangeRate = Number(setting.eur_try_rate)
  const advertising = Number(setting.advertising_expense_try)

  return {
    kmCostTry: Number.isFinite(kmCost) && kmCost > 0 ? kmCost : DEFAULT_KM_COST_TRY,
    eurTryRate: Number.isFinite(exchangeRate) && exchangeRate > 0 ? exchangeRate : DEFAULT_EUR_TRY_RATE,
    advertisingExpenseTry: Number.isFinite(advertising) && advertising >= 0 ? advertising : 0,
  }
}

function settingForMonth(settingsByMonth, month) {
  if (settingsByMonth instanceof Map) return normalizeSetting(settingsByMonth.get(month))
  return normalizeSetting(settingsByMonth?.[month])
}

function manualDistanceForLeg(booking, leg) {
  const value = leg === 'return'
    ? booking.manual_return_distance_km
    : booking.manual_outbound_distance_km
  const distance = Number(value)
  return Number.isFinite(distance) && distance > 0 ? distance : null
}

export function resolveRealizedLegs(bookings, today, settingsByMonth = {}) {
  const resolvedLegs = []
  const unresolvedLegs = []

  for (const booking of bookings) {
    for (const leg of bookingLegs(booking)) {
      if (!isRealizedLeg(booking, leg.date, today, leg.legStatus)) continue

      const manualDistanceKm = manualDistanceForLeg(booking, leg.leg)
      const oneWayKm = manualDistanceKm ?? fixedRouteDistanceKm(leg.from, leg.to)
      const legDetails = {
        ...leg,
        bookingId: booking.id,
        bookingRef: booking.booking_ref,
        customerName: booking.customer_name,
        month: leg.date.slice(0, 7),
      }
      const settings = settingForMonth(settingsByMonth, legDetails.month)
      legDetails.revenueTry = leg.revenueEur * settings.eurTryRate
      legDetails.airportMeetCostEur = !leg.isDailyChauffeur && startsFromAirport(leg.from) ? AIRPORT_MEET_COST_EUR : 0
      legDetails.airportMeetCostTry = legDetails.airportMeetCostEur * settings.eurTryRate

      if (leg.isDailyChauffeur) {
        const vehicleKm = leg.directVehicleKm ?? 0
        resolvedLegs.push({
          ...legDetails,
          oneWayKm: vehicleKm,
          vehicleKm,
          vehicleCostTry: vehicleKm * settings.kmCostTry,
          distanceSource: leg.directVehicleKm === null ? 'daily-missing' : 'daily-actual',
        })
        continue
      }

      if (leg.costMode === 'sold_transfer') {
        resolvedLegs.push({
          ...legDetails,
          oneWayKm: 0,
          vehicleKm: 0,
          vehicleCostTry: 0,
          supplierCostTry: leg.splitSupplierCostTry ?? leg.soldTransferTotalCostTry ?? 0,
          distanceSource: 'sold-transfer',
          airportMeetCostEur: 0,
          airportMeetCostTry: 0,
        })
        continue
      }

      if (oneWayKm === null) {
        unresolvedLegs.push(legDetails)
        continue
      }

      const vehicleKm = oneWayKm * 2
      resolvedLegs.push({
        ...legDetails,
        oneWayKm,
        vehicleKm,
        vehicleCostTry: vehicleKm * settings.kmCostTry,
        supplierCostTry: 0,
        distanceSource: manualDistanceKm === null ? 'fixed' : 'manual',
      })
    }
  }

  return { resolvedLegs, unresolvedLegs }
}

function totalsForLegs(resolvedLegs, unresolvedLegs, settingsByMonth) {
  const totals = [...resolvedLegs, ...unresolvedLegs].reduce((result, leg) => {
    result.incomeEur += leg.revenueEur
    result.incomeTry += leg.revenueTry
    result.airportMeetCostEur += leg.airportMeetCostEur ?? 0
    result.airportMeetCostTry += leg.airportMeetCostTry ?? 0
    result.passengerKm += leg.oneWayKm ?? 0
    result.vehicleKm += leg.vehicleKm ?? 0
    result.vehicleCostTry += leg.vehicleCostTry ?? 0
    result.supplierCostTry += leg.supplierCostTry ?? 0
    return result
  }, {
    incomeEur: 0,
    incomeTry: 0,
    airportMeetCostEur: 0,
    airportMeetCostTry: 0,
    passengerKm: 0,
    vehicleKm: 0,
    vehicleCostTry: 0,
    supplierCostTry: 0,
  })

  totals.vehicleCostEur = resolvedLegs.reduce((total, leg) => {
    return total + (leg.vehicleCostTry / settingForMonth(settingsByMonth, leg.month).eurTryRate)
  }, 0)
  totals.supplierCostEur = resolvedLegs.reduce((total, leg) => {
    return total + ((leg.supplierCostTry ?? 0) / settingForMonth(settingsByMonth, leg.month).eurTryRate)
  }, 0)

  return totals
}

export function calculateProfitLossMetrics(bookings, period, today, settingsByMonth = {}) {
  const realizedLegs = resolveRealizedLegs(bookings, today, settingsByMonth)
  const resolvedLegs = realizedLegs.resolvedLegs.filter(leg => isInPeriod(leg.date, period))
  const unresolvedLegs = realizedLegs.unresolvedLegs.filter(leg => isInPeriod(leg.date, period))

  const relevantMonths = period === 'all'
    ? new Set([
        ...resolvedLegs.map(leg => leg.month),
        ...unresolvedLegs.map(leg => leg.month),
        ...(settingsByMonth instanceof Map ? settingsByMonth.keys() : Object.keys(settingsByMonth ?? {})),
      ])
    : new Set([period])

  const advertisingExpenseTry = [...relevantMonths].reduce((total, month) => {
    return total + settingForMonth(settingsByMonth, month).advertisingExpenseTry
  }, 0)
  const advertisingExpenseEur = [...relevantMonths].reduce((total, month) => {
    const settings = settingForMonth(settingsByMonth, month)
    return total + (settings.advertisingExpenseTry / settings.eurTryRate)
  }, 0)

  const totals = totalsForLegs(resolvedLegs, unresolvedLegs, settingsByMonth)

  totals.advertisingExpenseTry = advertisingExpenseTry
  totals.totalExpenseTry = totals.vehicleCostTry + totals.supplierCostTry + totals.airportMeetCostTry + advertisingExpenseTry
  totals.netProfitTry = totals.incomeTry - totals.totalExpenseTry
  totals.totalExpenseEur = totals.vehicleCostEur + totals.supplierCostEur + totals.airportMeetCostEur + advertisingExpenseEur
  totals.netProfitEur = totals.incomeEur - totals.totalExpenseEur
  totals.profitMargin = totals.incomeTry > 0 ? (totals.netProfitTry / totals.incomeTry) * 100 : 0

  const routeMap = new Map()
  for (const leg of resolvedLegs) {
    const routeKey = [normalizeLocation(leg.from), normalizeLocation(leg.to)].sort().join('|')
    const route = routeMap.get(routeKey) ?? {
      routeKey,
      from: leg.from,
      to: leg.to,
      legCount: 0,
      passengerKm: 0,
      vehicleKm: 0,
      incomeEur: 0,
      vehicleCostTry: 0,
      supplierCostTry: 0,
    }
    route.legCount += 1
    route.passengerKm += leg.oneWayKm
    route.vehicleKm += leg.vehicleKm
    route.incomeEur += leg.revenueEur
    route.vehicleCostTry += leg.vehicleCostTry
    route.supplierCostTry += leg.supplierCostTry ?? 0
    routeMap.set(routeKey, route)
  }

  const routes = [...routeMap.values()]
    .sort((a, b) => b.vehicleKm - a.vehicleKm || b.incomeEur - a.incomeEur)

  return {
    ...totals,
    completedLegs: resolvedLegs.length + unresolvedLegs.length,
    resolvedLegs,
    unresolvedLegs,
    missingDailyDistanceCount: resolvedLegs.filter(leg => leg.distanceSource === 'daily-missing').length,
    routes,
  }
}
