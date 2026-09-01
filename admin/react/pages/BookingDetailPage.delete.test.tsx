// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest'
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react'
import type { Booking } from '../types'

const mocks = vi.hoisted(() => ({
  from: vi.fn(),
  deleted: vi.fn(),
}))

vi.mock('../lib/supabase', () => ({
  supabase: { from: mocks.from },
}))

import BookingDetailPage from './BookingDetailPage'

const booking = {
  id: 'booking-1',
  booking_ref: 'AVL-101',
  customer_name: 'Burak Engin Çağlar',
  customer_email: '',
  customer_phone: '+905551112233',
  hotel_name: '',
  child_seat_count: 0,
  child_ages: [],
  luggage_count: 1,
  pickup_location: 'airport',
  pickup_address: null,
  dropoff_location: 'pamukkale',
  dropoff_address: null,
  pickup_date: '2026-08-02',
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
  status: 'cancelled',
  payment_method: 'cash',
  notes: null,
  language: 'tr',
  created_at: '2026-08-01T10:00:00Z',
  booking_notes: [],
  chauffeur_hire_days: [],
} as unknown as Booking

const linkedReturn = { id: 'booking-2', booking_ref: 'AVL-102', pickup_date: '2026-08-06', status: 'completed' }

function installQueries({ linked = [linkedReturn], deletedCount = 1 } = {}) {
  mocks.from.mockImplementation((table: string) => {
    if (table !== 'bookings') throw new Error(`Unexpected table ${table}`)
    return {
      select: (columns: string) => columns.startsWith('id, booking_ref')
        ? {
            eq: () => Promise.resolve({ data: linked, error: null }),
          }
        : {
            eq: () => ({ limit: () => Promise.resolve({ data: [booking], error: null }) }),
          },
      delete: () => ({
        eq: (_column: string, value: string) => {
          mocks.deleted(value)
          return Promise.resolve({ count: deletedCount, error: null })
        },
      }),
    }
  })
}

beforeEach(() => {
  vi.clearAllMocks()
  vi.spyOn(window, 'confirm').mockReturnValue(true)
})

afterEach(() => {
  cleanup()
  vi.restoreAllMocks()
})

describe('BookingDetailPage permanent delete', () => {
  test('removes the separately planned return record together with the booking', async () => {
    installQueries()
    const navigate = vi.fn()
    render(<BookingDetailPage bookingRef="AVL-101" isReturn={false} sourceTab="profit-loss" navigate={navigate} />)

    await screen.findByText('Kalıcı Silme')
    expect(screen.getByText(/Bu rezervasyondan planlanan ayrı kayıt/)).toBeInTheDocument()
    expect(screen.getByText('Bağlı kayıtlar da silinsin')).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: /Kalıcı olarak sil/ }))

    await waitFor(() => expect(navigate).toHaveBeenCalledWith('#profit-loss'))
    expect(mocks.deleted.mock.calls.map(([id]) => id)).toEqual(['booking-2', 'booking-1'])
  })

  test('keeps the booking when a linked record cannot be removed', async () => {
    installQueries({ deletedCount: 0 })
    const navigate = vi.fn()
    render(<BookingDetailPage bookingRef="AVL-101" isReturn={false} sourceTab="profit-loss" navigate={navigate} />)

    await screen.findByText('Kalıcı Silme')
    fireEvent.click(screen.getByRole('button', { name: /Kalıcı olarak sil/ }))

    await screen.findByText('AVL-102 silinemedi, hiçbir kayıt silinmedi. Tekrar deneyin.')
    expect(mocks.deleted).toHaveBeenCalledTimes(1)
    expect(navigate).not.toHaveBeenCalled()
  })

  test('deletes only the booking when the linked records are kept', async () => {
    installQueries()
    render(<BookingDetailPage bookingRef="AVL-101" isReturn={false} sourceTab="profit-loss" navigate={vi.fn()} />)

    await screen.findByText('Bağlı kayıtlar da silinsin')
    fireEvent.click(screen.getByRole('checkbox', { name: /Bağlı kayıtlar da silinsin/ }))
    fireEvent.click(screen.getByRole('button', { name: /Kalıcı olarak sil/ }))

    await waitFor(() => expect(mocks.deleted).toHaveBeenCalledWith('booking-1'))
    expect(mocks.deleted).toHaveBeenCalledTimes(1)
  })
})
