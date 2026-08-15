export const VEHICLE_TYPES = ['vito', 'vclass']

export function groupRoutesByDestination(routes) {
  const groups = new Map()
  for (const row of routes) {
    if (!groups.has(row.to_location)) {
      groups.set(row.to_location, {
        destination: row.to_location,
        distanceKm: Number(row.distance_km),
        durationMin: Number(row.duration_min),
        vito: null,
        vclass: null,
      })
    }
    if (VEHICLE_TYPES.includes(row.vehicle_type)) {
      groups.get(row.to_location)[row.vehicle_type] = { id: row.id, priceEur: Number(row.price_eur) }
    }
  }
  return [...groups.values()].sort((a, b) => a.distanceKm - b.distanceKm)
}

export function linearRegression(points) {
  const n = points.length
  if (n === 0) return null
  if (n === 1) return { slope: 0, intercept: points[0].y }
  const meanX = points.reduce((sum, p) => sum + p.x, 0) / n
  const meanY = points.reduce((sum, p) => sum + p.y, 0) / n
  let numerator = 0
  let denominator = 0
  for (const { x, y } of points) {
    numerator += (x - meanX) * (y - meanY)
    denominator += (x - meanX) ** 2
  }
  if (denominator === 0) return { slope: 0, intercept: meanY }
  const slope = numerator / denominator
  return { slope, intercept: meanY - slope * meanX }
}

function pointsForVehicle(routes, vehicleType) {
  return routes
    .filter((row) => row.vehicle_type === vehicleType && Number.isFinite(Number(row.distance_km)) && Number.isFinite(Number(row.price_eur)))
    .map((row) => ({ x: Number(row.distance_km), y: Number(row.price_eur) }))
}

function estimateForVehicle(routes, vehicleType, distanceKm) {
  const regression = linearRegression(pointsForVehicle(routes, vehicleType))
  return regression ? Math.max(0, regression.intercept + regression.slope * distanceKm) : null
}

export function estimatePriceFromDistance(routes, distanceKm) {
  return {
    vito: estimateForVehicle(routes, 'vito', distanceKm),
    vclass: estimateForVehicle(routes, 'vclass', distanceKm),
  }
}

export function nearestRoute(routes, distanceKm) {
  const byDestination = groupRoutesByDestination(routes)
  let nearest = null
  let bestDiff = Infinity
  for (const route of byDestination) {
    const diff = Math.abs(route.distanceKm - distanceKm)
    if (diff < bestDiff) {
      bestDiff = diff
      nearest = route
    }
  }
  return nearest
}
