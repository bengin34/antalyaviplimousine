// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest'
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'
import { cleanup, render, screen } from '@testing-library/react'
import type { Booking } from '../types'

const mocks = vi.hoisted(() => ({
  from: vi.fn(),
}))

vi.mock('../lib/supabase', () => ({
  supabase: { from: mocks.from },
}))

import BookingDetailPage from './BookingDetailPage'

const base = {
  id: 'booking-1',
  booking_ref: 'AVL-201',
  customer_name: 'Burak Engin Çağlar',
  customer_email: '',
  customer_phone: '+905551112233',
  hotel_name: '',
  child_seat_count: 0,
  child_ages: [],
  luggage_count: 1,
  pickup_location: 'private_address',
  pickup_address: 'Bir adres',
  dropoff_location: 'private_address',
  dropoff_address: 'Başka adres',
  pickup_date: '2020-01-01',
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
  price_eur: 900,
  status: 'completed',
  payment_method: 'cash',
  notes: null,
  language: 'tr',
  created_at: '2020-01-01T10:00:00Z',
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

beforeEach(() => {
  vi.clearAllMocks()
})

afterEach(() => {
  cleanup()
  vi.restoreAllMocks()
})

describe('BookingDetailPage cost banner', () => {
  test('own_vehicle completed unknown-route leg shows missing-cost banner', async () => {
    installQueries(base)
    render(<BookingDetailPage bookingRef="AVL-201" isReturn={false} sourceTab="profit-loss" navigate={vi.fn()} />)

    await screen.findByText('Maliyet eksik')
    expect(screen.getByRole('button', { name: 'Maliyet gir' })).toBeInTheDocument()
  })

  test('sold_transfer completed leg shows summary and edit button', async () => {
    const sold = { ...base, service_cost_mode: 'sold_transfer', sold_transfer_cost_try: 900 } as unknown as Booking
    installQueries(sold)
    render(<BookingDetailPage bookingRef="AVL-201" isReturn={false} sourceTab="profit-loss" navigate={vi.fn()} />)

    await screen.findByText('Gidiş Maliyeti')
    const banner = document.querySelector('.cost-banner')
    expect(banner).not.toBeNull()
    expect(banner!).toHaveTextContent(/Satılan transfer · ₺/)
    expect(banner!.querySelector('button')).toHaveTextContent('Düzenle')
  })

  test('daily_chauffeur completed booking shows no cost banner', async () => {
    const daily = {
      ...base,
      trip_type: 'daily_chauffeur',
      service_cost_mode: 'own_vehicle',
      daily_rate_eur: 150,
      service_end_date: '2020-01-02',
    } as unknown as Booking
    installQueries(daily)
    render(<BookingDetailPage bookingRef="AVL-201" isReturn={false} sourceTab="profit-loss" navigate={vi.fn()} />)

    await screen.findByText('Durum Güncelle')
    expect(screen.queryByText('Maliyet eksik')).toBeNull()
    expect(screen.queryByText(/Maliyeti$/)).toBeNull()
  })
})
