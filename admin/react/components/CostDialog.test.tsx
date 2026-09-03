// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest'
import { afterEach, describe, expect, test, vi } from 'vitest'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import CostDialog from './CostDialog'
import type { Booking } from '../types'

afterEach(cleanup)

function bookingFixture(overrides: Partial<Booking> = {}): Booking {
  return {
    id: 'booking-1',
    booking_ref: 'AVL-101',
    customer_name: 'Test Yolcu',
    customer_email: 'test@example.com',
    customer_phone: '+905551112233',
    hotel_name: '',
    child_seat_count: 0,
    luggage_count: 1,
    pickup_location: 'private_address',
    pickup_address: null,
    dropoff_location: 'private_address',
    dropoff_address: null,
    pickup_date: '2026-08-01',
    pickup_time: '09:00',
    flight_number: null,
    flight_arrival_time: null,
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
    price_eur: 100,
    status: 'completed',
    payment_method: 'cash',
    notes: null,
    language: 'tr',
    created_at: '2026-07-01T10:00:00Z',
    ...overrides,
    child_ages: overrides.child_ages ?? [],
  }
}

const noop = () => {}

test('own_vehicle bilinmeyen rota: eksik durum ve KM kontrolü gösterir', () => {
  const booking = bookingFixture()
  render(<CostDialog booking={booking} leg="outbound" today="2026-09-01" onClose={noop} onSaved={noop} />)
  expect(screen.getByText(/girilmedi/i)).toBeInTheDocument()
  expect(screen.getByRole('button', { name: /KM gir/i })).toBeInTheDocument()
})

describe('karşılama ücreti görünürlüğü', () => {
  test('havalimanından başlayan ayakta gösterilir', () => {
    const booking = bookingFixture({ pickup_location: 'airport', dropoff_location: 'belek' })
    render(<CostDialog booking={booking} leg="outbound" today="2026-09-01" onClose={noop} onSaved={noop} />)
    expect(screen.getByText(/Karşılama ücreti/i)).toBeInTheDocument()
  })

  test('özel adresten başlayan ayakta gösterilmez', () => {
    const booking = bookingFixture({ pickup_location: 'private_address', dropoff_location: 'private_address' })
    render(<CostDialog booking={booking} leg="outbound" today="2026-09-01" onClose={noop} onSaved={noop} />)
    expect(screen.queryByText(/Karşılama ücreti/i)).toBeNull()
  })
})

test('“Sonra” düğmesi onClose çağırır', () => {
  const booking = bookingFixture()
  const onClose = vi.fn()
  render(<CostDialog booking={booking} leg="outbound" today="2026-09-01" onClose={onClose} onSaved={noop} />)
  fireEvent.click(screen.getByRole('button', { name: /Sonra/i }))
  expect(onClose).toHaveBeenCalledTimes(1)
})
