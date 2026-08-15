import { test, expect } from 'vitest'
import { groupRoutesByDestination, linearRegression, estimatePriceFromDistance, nearestRoute } from './price-control-metrics.js'

const routes = [
  { id: '1', to_location: 'belek', vehicle_type: 'vito', price_eur: 40, distance_km: 45, duration_min: 35 },
  { id: '2', to_location: 'belek', vehicle_type: 'vclass', price_eur: 70, distance_km: 45, duration_min: 35 },
  { id: '3', to_location: 'alanya', vehicle_type: 'vito', price_eur: 95, distance_km: 125, duration_min: 120 },
  { id: '4', to_location: 'alanya', vehicle_type: 'vclass', price_eur: 145, distance_km: 125, duration_min: 120 },
]

test('groups routes by destination with both vehicle prices attached', () => {
  const groups = groupRoutesByDestination(routes)
  expect(groups).toEqual([
    { destination: 'belek', distanceKm: 45, durationMin: 35, vito: { id: '1', priceEur: 40 }, vclass: { id: '2', priceEur: 70 } },
    { destination: 'alanya', distanceKm: 125, durationMin: 120, vito: { id: '3', priceEur: 95 }, vclass: { id: '4', priceEur: 145 } },
  ])
})

test('linearRegression fits a line through two or more points', () => {
  const fit = linearRegression([{ x: 0, y: 10 }, { x: 10, y: 20 }])
  expect(fit.slope).toBeCloseTo(1)
  expect(fit.intercept).toBeCloseTo(10)
})

test('linearRegression handles a single point as a flat line', () => {
  expect(linearRegression([{ x: 5, y: 40 }])).toEqual({ slope: 0, intercept: 40 })
})

test('linearRegression returns null for no points', () => {
  expect(linearRegression([])).toBeNull()
})

test('estimatePriceFromDistance interpolates a price for both vehicles from existing routes', () => {
  const estimate = estimatePriceFromDistance(routes, 85)
  // vito: slope = (95-40)/(125-45) = 0.6875, intercept = 40 - 0.6875*45 ≈ 9.06
  expect(estimate.vito).toBeCloseTo(0.6875 * 85 + (40 - 0.6875 * 45))
  expect(estimate.vclass).toBeGreaterThan(estimate.vito)
})

test('nearestRoute finds the closest known destination by distance', () => {
  const nearest = nearestRoute(routes, 100)
  expect(nearest.destination).toBe('alanya')
})
