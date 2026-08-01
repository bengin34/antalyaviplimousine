import { test, expect } from 'vitest'
import { matchesBookingQuery } from './search-match.js'

const booking = {
  customer_name: 'Ahmet Yılmaz',
  customer_phone: '+90 555 111 22 33',
  booking_ref: 'VIP-2026-0042',
  pickup_location: 'Antalya Havalimanı',
  dropoff_location: 'Belek',
}

test('empty query matches everything', () => {
  expect(matchesBookingQuery(booking, '')).toBe(true)
  expect(matchesBookingQuery(booking, '   ')).toBe(true)
})

test('matches by name, case-insensitive Turkish', () => {
  expect(matchesBookingQuery(booking, 'ahmet')).toBe(true)
  expect(matchesBookingQuery(booking, 'yılmaz')).toBe(true)
})

test('matches by phone regardless of formatting', () => {
  expect(matchesBookingQuery(booking, '5551112233')).toBe(true)
  expect(matchesBookingQuery(booking, '0555 111')).toBe(true)
  expect(matchesBookingQuery(booking, '90555')).toBe(true)
})

test('matches by booking ref', () => {
  expect(matchesBookingQuery(booking, 'vip-2026-0042')).toBe(true)
  expect(matchesBookingQuery(booking, '0042')).toBe(true)
})

test('matches by pickup or dropoff location', () => {
  expect(matchesBookingQuery(booking, 'havaliman')).toBe(true)
  expect(matchesBookingQuery(booking, 'belek')).toBe(true)
})

test('non-matching query returns false', () => {
  expect(matchesBookingQuery(booking, 'zzz')).toBe(false)
})

test('handles missing fields without throwing', () => {
  expect(matchesBookingQuery({}, 'anything')).toBe(false)
  expect(matchesBookingQuery({}, '')).toBe(true)
})
