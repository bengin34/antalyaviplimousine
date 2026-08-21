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

function normalizeDailyDistanceKm(value) {
  if (value === null || value === undefined || String(value).trim() === '') return null
  const distance = Number(value)
  return Number.isFinite(distance) && distance >= 0 ? distance : null
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
      directVehicleKm: normalizeDailyDistanceKm(day.distance_km),
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

const ISO_DATE_ONLY = /^(\d{4})-(\d{2})-(\d{2})$/

function dateOnlyUtc(value) {
  const match = ISO_DATE_ONLY.exec(String(value ?? ''))
  if (!match) return null
  const [, yearText, monthText, dayText] = match
  const year = Number(yearText)
  const month = Number(monthText)
  const day = Number(dayText)
  const date = new Date(Date.UTC(year, month - 1, day))
  if (
    date.getUTCFullYear() !== year
    || date.getUTCMonth() !== month - 1
    || date.getUTCDate() !== day
  ) return null
  return date
}

function formatDateOnlyUtc(date) {
  return date.toISOString().slice(0, 10)
}

const DECIMAL_VALUE = /^([+-]?)(?:(\d+)(?:\.(\d*))?|\.(\d+))(?:[eE]([+-]?\d+))?$/
const MAX_DECIMAL_EXPONENT = 100

function decimalFraction(value) {
  const text = String(value ?? '').trim()
  const match = DECIMAL_VALUE.exec(text)
  if (!match) throw new RangeError('Invalid decimal value')

  const [, sign, integer = '0', decimal = '', leadingDecimal = '', exponentText = '0'] = match
  const exponent = Number(exponentText)
  const fractionDigits = decimal || leadingDecimal
  const scale = fractionDigits.length - exponent
  if (!Number.isInteger(exponent) || Math.abs(exponent) > MAX_DECIMAL_EXPONENT || Math.abs(scale) > MAX_DECIMAL_EXPONENT) {
    throw new RangeError('Decimal exponent is outside the supported range')
  }

  const digits = `${integer}${fractionDigits}`.replace(/^0+(?=\d)/, '')
  let numerator = BigInt(digits || '0')
  let denominator = 1n
  if (scale > 0) denominator = 10n ** BigInt(scale)
  if (scale < 0) numerator *= 10n ** BigInt(-scale)
  if (sign === '-') numerator = -numerator
  return { numerator, denominator }
}

function roundFractionToCents(numerator, denominator) {
  if (denominator === 0n) throw new RangeError('Cannot divide by zero')
  if (denominator < 0n) {
    numerator = -numerator
    denominator = -denominator
  }

  const negative = numerator < 0n
  const absoluteNumerator = negative ? -numerator : numerator
  const scaledNumerator = absoluteNumerator * 100n
  let cents = scaledNumerator / denominator
  const remainder = scaledNumerator % denominator
  if (remainder * 2n >= denominator) cents += 1n
  return negative ? -cents : cents
}

function centsToNumber(cents) {
  const absoluteCents = cents < 0n ? -cents : cents
  if (absoluteCents > BigInt(Number.MAX_SAFE_INTEGER)) {
    throw new RangeError('Money value is outside the supported range')
  }
  const amount = Number(cents) / 100
  return Object.is(amount, -0) ? 0 : amount
}

function multiplyDivideMoneyToCents(amount, multiplier, divisor) {
  const amountFraction = decimalFraction(amount)
  const multiplierFraction = decimalFraction(multiplier)
  const divisorFraction = decimalFraction(divisor)
  if (divisorFraction.numerator === 0n) throw new RangeError('Cannot divide by zero')

  return roundFractionToCents(
    amountFraction.numerator * multiplierFraction.numerator * divisorFraction.denominator,
    amountFraction.denominator * multiplierFraction.denominator * divisorFraction.numerator,
  )
}

function roundMoney(value) {
  const amount = Number(value)
  if (!Number.isFinite(amount)) return 0
  try {
    const fraction = decimalFraction(value)
    return centsToNumber(roundFractionToCents(fraction.numerator, fraction.denominator))
  } catch {
    return 0
  }
}

function monthsForRange(startDate, endDate) {
  const start = dateOnlyUtc(startDate)
  const end = dateOnlyUtc(endDate)
  if (!start || !end || start > end) return []

  const months = []
  const cursor = new Date(Date.UTC(start.getUTCFullYear(), start.getUTCMonth(), 1))
  const finalMonth = Date.UTC(end.getUTCFullYear(), end.getUTCMonth(), 1)
  while (cursor.getTime() <= finalMonth) {
    months.push(formatDateOnlyUtc(cursor).slice(0, 7))
    cursor.setUTCMonth(cursor.getUTCMonth() + 1)
  }
  return months
}

function settingsSnapshotForMonths(months, settingsByMonth) {
  return Object.fromEntries(months.map(month => {
    const settings = settingForMonth(settingsByMonth, month)
    return [month, {
      km_cost_try: settings.kmCostTry,
      eur_try_rate: settings.eurTryRate,
      advertising_expense_try: settings.advertisingExpenseTry,
    }]
  }))
}

export function allocatedAdvertisingForRange(startDate, endDate, settingsByMonth = {}) {
  const start = dateOnlyUtc(startDate)
  const end = dateOnlyUtc(endDate)
  if (!start || !end || start > end) {
    throw new RangeError('Invalid advertising date range')
  }

  const monthlyAllocations = {}
  let advertisingExpenseTryCents = 0n
  let advertisingExpenseEurCents = 0n

  for (const month of monthsForRange(startDate, endDate)) {
    const [year, monthNumber] = month.split('-').map(Number)
    const daysInMonth = new Date(Date.UTC(year, monthNumber, 0)).getUTCDate()
    const monthStart = new Date(Date.UTC(year, monthNumber - 1, 1))
    const monthEnd = new Date(Date.UTC(year, monthNumber - 1, daysInMonth))
    const allocationStart = start > monthStart ? start : monthStart
    const allocationEnd = end < monthEnd ? end : monthEnd
    const settings = settingForMonth(settingsByMonth, month)
    const throughEndCents = multiplyDivideMoneyToCents(
      settings.advertisingExpenseTry,
      allocationEnd.getUTCDate(),
      daysInMonth,
    )
    const beforeStartCents = multiplyDivideMoneyToCents(
      settings.advertisingExpenseTry,
      allocationStart.getUTCDate() - 1,
      daysInMonth,
    )
    const allocatedTryCents = throughEndCents - beforeStartCents
    const allocatedTry = centsToNumber(allocatedTryCents)
    const allocatedEurCents = multiplyDivideMoneyToCents(allocatedTry, 1, settings.eurTryRate)
    const allocatedEur = centsToNumber(allocatedEurCents)

    monthlyAllocations[month] = {
      startDate: formatDateOnlyUtc(allocationStart),
      endDate: formatDateOnlyUtc(allocationEnd),
      advertisingExpenseTry: allocatedTry,
      advertisingExpenseEur: allocatedEur,
    }
    advertisingExpenseTryCents += allocatedTryCents
    advertisingExpenseEurCents += allocatedEurCents
  }

  return {
    advertisingExpenseTry: centsToNumber(advertisingExpenseTryCents),
    advertisingExpenseEur: centsToNumber(advertisingExpenseEurCents),
    monthlyAllocations,
  }
}

export function splitProfit(netProfitEur, netProfitTry, operationsSharePct) {
  if (
    operationsSharePct === null
    || operationsSharePct === undefined
    || String(operationsSharePct).trim() === ''
  ) throw new RangeError('Invalid percentage')

  let percentageFraction
  try {
    percentageFraction = decimalFraction(operationsSharePct)
  } catch {
    throw new RangeError('Invalid percentage')
  }
  const percentageHundredthsNumerator = percentageFraction.numerator * 100n
  if (
    percentageHundredthsNumerator < 0n
    || percentageHundredthsNumerator > 10000n * percentageFraction.denominator
    || percentageHundredthsNumerator % percentageFraction.denominator !== 0n
  ) throw new RangeError('Invalid percentage')

  const percentageHundredths = percentageHundredthsNumerator / percentageFraction.denominator
  const percentage = centsToNumber(percentageHundredths)
  const vehicleOwnerSharePct = centsToNumber(10000n - percentageHundredths)
  const eurFraction = decimalFraction(netProfitEur)
  const tryFraction = decimalFraction(netProfitTry)
  const eurCents = roundFractionToCents(eurFraction.numerator, eurFraction.denominator)
  const tryCents = roundFractionToCents(tryFraction.numerator, tryFraction.denominator)
  const operationsEurCents = multiplyDivideMoneyToCents(netProfitEur, operationsSharePct, 100)
  const operationsTryCents = multiplyDivideMoneyToCents(netProfitTry, operationsSharePct, 100)

  return {
    operationsSharePct: percentage,
    vehicleOwnerSharePct,
    operationsAmountEur: centsToNumber(operationsEurCents),
    vehicleOwnerAmountEur: centsToNumber(eurCents - operationsEurCents),
    operationsAmountTry: centsToNumber(operationsTryCents),
    vehicleOwnerAmountTry: centsToNumber(tryCents - operationsTryCents),
  }
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

function distributionBlocker(code, leg, extra = {}) {
  return {
    code,
    bookingId: leg?.bookingId ?? null,
    bookingRef: leg?.bookingRef ?? null,
    leg: leg?.leg ?? null,
    date: leg?.date ?? null,
    ...extra,
  }
}

export function calculateProfitDistribution(bookings, options = {}) {
  const startDate = String(options.startDate ?? '')
  const endDate = String(options.endDate ?? '')
  const today = String(options.today ?? '')
  const settingsByMonth = options.settingsByMonth ?? {}
  const start = dateOnlyUtc(startDate)
  const end = dateOnlyUtc(endDate)
  const todayDate = dateOnlyUtc(today)
  const rangeIsValid = Boolean(start && end && todayDate && start <= end)
  const blockers = []

  if (!rangeIsValid) {
    blockers.push(distributionBlocker('invalid-date-range', null))
  } else if (end >= todayDate) {
    blockers.push(distributionBlocker('end-date-not-closed', null))
  }

  const realized = todayDate
    ? resolveRealizedLegs(Array.isArray(bookings) ? bookings : [], today, settingsByMonth)
    : { resolvedLegs: [], unresolvedLegs: [] }
  const withinRange = leg => rangeIsValid && leg.date >= startDate && leg.date <= endDate
  const resolvedLegs = realized.resolvedLegs.filter(withinRange)
  const unresolvedLegs = realized.unresolvedLegs.filter(withinRange)

  for (const leg of unresolvedLegs) {
    blockers.push(distributionBlocker('unresolved-route', leg))
  }
  for (const leg of resolvedLegs) {
    if (leg.distanceSource === 'daily-missing') {
      blockers.push(distributionBlocker('daily-distance-missing', leg))
    }
    if (
      leg.costMode === 'sold_transfer'
      && (!Number.isFinite(leg.supplierCostTry) || leg.supplierCostTry <= 0)
    ) {
      blockers.push(distributionBlocker('supplier-cost-invalid', leg))
    }
  }

  const directTotals = totalsForLegs(resolvedLegs, unresolvedLegs, settingsByMonth)
  const advertising = rangeIsValid
    ? allocatedAdvertisingForRange(startDate, endDate, settingsByMonth)
    : { advertisingExpenseTry: 0, advertisingExpenseEur: 0 }
  const months = rangeIsValid ? monthsForRange(startDate, endDate) : []
  const monthlySettingsSnapshot = settingsSnapshotForMonths(months, settingsByMonth)

  const incomeEur = roundMoney(directTotals.incomeEur)
  const incomeTry = roundMoney(directTotals.incomeTry)
  const vehicleCostEur = roundMoney(directTotals.vehicleCostEur)
  const vehicleCostTry = roundMoney(directTotals.vehicleCostTry)
  const supplierCostEur = roundMoney(directTotals.supplierCostEur)
  const supplierCostTry = roundMoney(directTotals.supplierCostTry)
  const airportMeetCostEur = roundMoney(directTotals.airportMeetCostEur)
  const airportMeetCostTry = roundMoney(directTotals.airportMeetCostTry)
  const advertisingExpenseEur = roundMoney(advertising.advertisingExpenseEur)
  const advertisingExpenseTry = roundMoney(advertising.advertisingExpenseTry)
  const totalExpenseEur = roundMoney(
    vehicleCostEur + supplierCostEur + airportMeetCostEur + advertisingExpenseEur,
  )
  const totalExpenseTry = roundMoney(
    vehicleCostTry + supplierCostTry + airportMeetCostTry + advertisingExpenseTry,
  )
  const netProfitEur = roundMoney(incomeEur - totalExpenseEur)
  const netProfitTry = roundMoney(incomeTry - totalExpenseTry)

  let shares = null
  try {
    shares = splitProfit(netProfitEur, netProfitTry, options.operationsSharePct)
  } catch {
    blockers.push(distributionBlocker('invalid-share', null))
  }

  if (rangeIsValid && netProfitEur <= 0) {
    blockers.push(distributionBlocker('non-positive-profit', null))
  }

  return {
    startDate,
    endDate,
    incomeEur,
    incomeTry,
    vehicleCostEur,
    vehicleCostTry,
    supplierCostEur,
    supplierCostTry,
    airportMeetCostEur,
    airportMeetCostTry,
    advertisingExpenseEur,
    advertisingExpenseTry,
    totalExpenseEur,
    totalExpenseTry,
    netProfitEur,
    netProfitTry,
    realizedLegCount: resolvedLegs.length + unresolvedLegs.length,
    resolvedLegs,
    monthlySettingsSnapshot,
    blockers,
    canDistribute: blockers.length === 0 && netProfitEur > 0,
    shares,
  }
}

function legSnapshot(leg, monthlySettings) {
  const settings = monthlySettings[leg.month] ?? {
    eur_try_rate: DEFAULT_EUR_TRY_RATE,
  }
  return {
    key: `${leg.bookingId}:${leg.leg}`,
    booking_id: leg.bookingId ?? null,
    booking_ref: leg.bookingRef ?? null,
    customer_name: leg.customerName ?? null,
    leg: leg.leg ?? null,
    date: leg.date ?? null,
    month: leg.month ?? null,
    from: leg.from ?? null,
    to: leg.to ?? null,
    cost_mode: leg.costMode ?? null,
    distance_source: leg.distanceSource ?? null,
    one_way_km: roundMoney(leg.oneWayKm ?? 0),
    vehicle_km: roundMoney(leg.vehicleKm ?? 0),
    revenue_eur: roundMoney(leg.revenueEur ?? 0),
    revenue_try: roundMoney(leg.revenueTry ?? 0),
    vehicle_cost_eur: roundMoney((leg.vehicleCostTry ?? 0) / settings.eur_try_rate),
    vehicle_cost_try: roundMoney(leg.vehicleCostTry ?? 0),
    supplier_cost_eur: roundMoney((leg.supplierCostTry ?? 0) / settings.eur_try_rate),
    supplier_cost_try: roundMoney(leg.supplierCostTry ?? 0),
    airport_cost_eur: roundMoney(leg.airportMeetCostEur ?? 0),
    airport_cost_try: roundMoney(leg.airportMeetCostTry ?? 0),
  }
}

export function buildProfitDistributionSnapshot(metrics = {}) {
  const monthlySettings = Object.fromEntries(
    Object.entries(metrics.monthlySettingsSnapshot ?? {}).map(([month, settings]) => [month, {
      km_cost_try: Number(settings.km_cost_try),
      eur_try_rate: Number(settings.eur_try_rate),
      advertising_expense_try: roundMoney(settings.advertising_expense_try),
    }]),
  )
  const shares = metrics.shares ?? {}
  const snapshot = {
    schema_version: 1,
    period_start: metrics.startDate ?? null,
    period_end: metrics.endDate ?? null,
    operations_share_pct: shares.operationsSharePct ?? null,
    vehicle_owner_share_pct: shares.vehicleOwnerSharePct ?? null,
    operations_amount_eur: roundMoney(shares.operationsAmountEur),
    vehicle_owner_amount_eur: roundMoney(shares.vehicleOwnerAmountEur),
    operations_amount_try: roundMoney(shares.operationsAmountTry),
    vehicle_owner_amount_try: roundMoney(shares.vehicleOwnerAmountTry),
    income_eur: roundMoney(metrics.incomeEur),
    income_try: roundMoney(metrics.incomeTry),
    vehicle_cost_eur: roundMoney(metrics.vehicleCostEur),
    vehicle_cost_try: roundMoney(metrics.vehicleCostTry),
    supplier_cost_eur: roundMoney(metrics.supplierCostEur),
    supplier_cost_try: roundMoney(metrics.supplierCostTry),
    airport_cost_eur: roundMoney(metrics.airportMeetCostEur),
    airport_cost_try: roundMoney(metrics.airportMeetCostTry),
    advertising_cost_eur: roundMoney(metrics.advertisingExpenseEur),
    advertising_cost_try: roundMoney(metrics.advertisingExpenseTry),
    total_expense_eur: roundMoney(metrics.totalExpenseEur),
    total_expense_try: roundMoney(metrics.totalExpenseTry),
    net_profit_eur: roundMoney(metrics.netProfitEur),
    net_profit_try: roundMoney(metrics.netProfitTry),
    realized_leg_count: Number(metrics.realizedLegCount) || 0,
    resolved_legs: (metrics.resolvedLegs ?? []).map(leg => legSnapshot(leg, monthlySettings)),
    monthly_settings: monthlySettings,
  }

  return JSON.parse(JSON.stringify(snapshot))
}
