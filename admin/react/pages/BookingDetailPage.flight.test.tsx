// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest'
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'
import { cleanup, render, screen } from '@testing-library/react'
import type { Booking } from '../types'

const mocks = vi.hoisted(() => ({ from: vi.fn() }))

vi.mock('../lib/supabase', () => ({
  supabase: { from: mocks.from },
}))

import BookingDetailPage, { flightVerificationBadge } from './BookingDetailPage'

const baseBooking = {
  id: 'booking-1',
  booking_ref: 'AVL-201',
  customer_name: 'Burak Engin Çağlar',
  customer_email: '',
  customer_phone: '+905551112233',
  hotel_name: '',
  child_seat_count: 0,
  child_ages: [],
  luggage_count: 0,
  pickup_location: 'airport',
  pickup_address: null,
  dropoff_location: 'kemer',
  dropoff_address: null,
  pickup_date: '2026-09-20',
  pickup_time: '09:00',
  flight_number: 'TK2412',
  flight_arrival_time: '08:40',
  trip_type: 'one_way',
  return_date: null,
  return_pickup_time: null,
  return_flight_number: null,
  service_end_date: null,
  daily_rate_eur: null,
  departure_flight_date: null,
  departure_flight_time: null,
  departure_flight_number: null,
  fuel_terms_accepted_at: null,
  guests: 2,
  vehicle_type: 'vclass',
  service_cost_mode: 'own_vehicle',
  sold_transfer_cost_try: null,
  price_eur: 120,
  status: 'confirmed',
  payment_method: 'cash',
  notes: null,
  language: 'tr',
  created_at: '2026-09-01T10:00:00Z',
  booking_notes: [],
  chauffeur_hire_days: [],
} as unknown as Booking

function installQueries(booking: Booking) {
  mocks.from.mockImplementation((table: string) => {
    if (table !== 'bookings') throw new Error(`Unexpected table ${table}`)
    return {
      select: (columns: string) => columns.startsWith('id, booking_ref')
        ? { eq: () => Promise.resolve({ data: [], error: null }) }
        : { eq: () => ({ limit: () => Promise.resolve({ data: [booking], error: null }) }) },
    }
  })
}

const renderWith = async (overrides: Partial<Booking>) => {
  const booking = { ...baseBooking, ...overrides } as Booking
  installQueries(booking)
  const view = render(<BookingDetailPage bookingRef="AVL-201" isReturn={false} sourceTab="future" navigate={vi.fn()} />)
  await screen.findByText(/TK2412/)
  return view
}

beforeEach(() => { vi.clearAllMocks() })
afterEach(() => { cleanup(); vi.restoreAllMocks() })

describe('flightVerificationBadge', () => {
  test('a schedule match gets a positive badge', () => {
    expect(flightVerificationBadge('verified')).toEqual({ tone: 'ok', label: 'doğrulandı' })
  })

  test('an unknown flight number gets a warning badge', () => {
    expect(flightVerificationBadge('not_found')?.tone).toBe('warn')
  })

  test('a flight landing somewhere else gets a warning badge', () => {
    expect(flightVerificationBadge('wrong_airport')?.tone).toBe('warn')
  })

  test('"unavailable" is missing information, not a finding', () => {
    expect(flightVerificationBadge('unavailable')).toBeUndefined()
  })

  test('null is missing information, not a finding', () => {
    expect(flightVerificationBadge(null)).toBeUndefined()
  })
})

describe('BookingDetailPage flight badge', () => {
  test('shows the badge next to the flight number for a verified flight', async () => {
    const { container } = await renderWith({ flight_verification_status: 'verified' })
    expect(screen.getByText('doğrulandı')).toBeInTheDocument()
    expect(container.querySelector('.flight-badge.ok')).not.toBeNull()
  })

  test('shows a warning badge when the schedule had no such flight', async () => {
    await renderWith({ flight_verification_status: 'not_found' })
    expect(screen.getByText('bulunamadı')).toBeInTheDocument()
  })

  test('shows a warning badge when the flight lands at another airport', async () => {
    await renderWith({ flight_verification_status: 'wrong_airport' })
    expect(screen.getByText('farklı havalimanı')).toBeInTheDocument()
  })

  test('renders no badge element at all when the check could not run', async () => {
    const { container } = await renderWith({ flight_verification_status: 'unavailable' })
    expect(container.querySelector('.flight-badge')).toBeNull()
  })

  test('renders no badge element at all for a booking made before the feature', async () => {
    // Geçmişteki her kayıt bu durumda; boş bir span bile bırakmamalıyız.
    const { container } = await renderWith({ flight_verification_status: null })
    expect(container.querySelector('.flight-badge')).toBeNull()
  })

  test('does not badge the return leg, whose flight number is a different flight', async () => {
    const booking = {
      ...baseBooking,
      trip_type: 'round_trip',
      return_date: '2026-09-27',
      return_flight_number: 'TK2413',
      return_flight_departure_time: '12:00',
      flight_verification_status: 'verified',
    } as unknown as Booking
    installQueries(booking)
    const { container } = render(<BookingDetailPage bookingRef="AVL-201" isReturn sourceTab="future" navigate={vi.fn()} />)
    // Dönüş uçuş numarası hem transfer satırında hem dönüş bölümünde geçer.
    await screen.findAllByText(/TK2413/)
    expect(container.querySelector('.flight-badge')).toBeNull()
  })
})
