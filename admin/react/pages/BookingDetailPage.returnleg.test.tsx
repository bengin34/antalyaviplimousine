// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest'
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react'
import type { Booking } from '../types'

const mocks = vi.hoisted(() => ({
  from: vi.fn(),
  updated: vi.fn(),
  notes: vi.fn(),
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
  trip_type: 'round_trip',
  return_date: '2026-08-09',
  return_pickup_time: '14:00',
  return_flight_number: 'TK2412',
  return_service_cost_mode: 'sold_transfer',
  return_sold_transfer_cost_try: 1600,
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
  status: 'confirmed',
  payment_method: 'cash',
  notes: null,
  language: 'tr',
  created_at: '2026-08-01T10:00:00Z',
  booking_notes: [],
  chauffeur_hire_days: [],
} as unknown as Booking

function installQueries({ updatedCount = 1, status = 'confirmed' } = {}) {
  mocks.from.mockImplementation((table: string) => {
    if (table === 'booking_notes') {
      return { insert: (row: unknown) => { mocks.notes(row); return Promise.resolve({ error: null }) } }
    }
    if (table !== 'bookings') throw new Error(`Unexpected table ${table}`)
    return {
      select: (columns: string) => columns.startsWith('id, booking_ref')
        ? { eq: () => Promise.resolve({ data: [], error: null }) }
        : { eq: () => ({ limit: () => Promise.resolve({ data: [{ ...booking, status }], error: null }) }) },
      update: (payload: Record<string, unknown>) => ({
        eq: (_idColumn: string, id: string) => ({
          eq: (column: string, value: string) => {
            mocks.updated({ payload, id, guard: [column, value] })
            return Promise.resolve({ count: updatedCount, error: null })
          },
        }),
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

describe('BookingDetailPage remove return leg', () => {
  test('turns the round trip into a one-way booking and keeps the outbound', async () => {
    installQueries()
    const navigate = vi.fn()
    render(<BookingDetailPage bookingRef="AVL-101" isReturn sourceTab="future" navigate={navigate} />)

    fireEvent.click(await screen.findByRole('button', { name: 'Sadece dönüşü kaldır' }))

    await waitFor(() => expect(navigate).toHaveBeenCalledWith('#detail/AVL-101?from=future'))
    const [{ payload, id, guard }] = mocks.updated.mock.calls[0]
    expect(id).toBe('booking-1')
    expect(guard).toEqual(['trip_type', 'round_trip'])
    expect(payload).toMatchObject({
      trip_type: 'one_way',
      price_eur: 450,
      return_date: null,
      return_pickup_time: null,
      return_flight_number: null,
      return_service_cost_mode: null,
      return_sold_transfer_cost_try: null,
    })
    // The outbound leg's own fields are never part of the update.
    expect(payload).not.toHaveProperty('status')
    expect(payload).not.toHaveProperty('pickup_date')
    expect(payload).not.toHaveProperty('service_cost_mode')
    expect(mocks.notes).toHaveBeenCalledWith(expect.objectContaining({ booking_id: 'booking-1', note: expect.stringContaining('Dönüş transferi kaldırıldı') }))
  })

  test('reports a failed update and leaves the page in place', async () => {
    installQueries({ updatedCount: 0 })
    const navigate = vi.fn()
    render(<BookingDetailPage bookingRef="AVL-101" isReturn sourceTab="future" navigate={navigate} />)

    fireEvent.click(await screen.findByRole('button', { name: 'Sadece dönüşü kaldır' }))

    await screen.findByText('Dönüş kaldırılamadı, rezervasyon değişmedi. Sayfayı yenileyip tekrar deneyin.')
    expect(mocks.notes).not.toHaveBeenCalled()
    expect(navigate).not.toHaveBeenCalled()
  })

  test('removes the outbound and keeps the return as a one-way trip', async () => {
    installQueries()
    const navigate = vi.fn()
    render(<BookingDetailPage bookingRef="AVL-101" isReturn={false} sourceTab="future" navigate={navigate} />)

    expect(screen.queryByRole('button', { name: 'Sadece dönüşü kaldır' })).not.toBeInTheDocument()
    fireEvent.click(await screen.findByRole('button', { name: 'Sadece gidişi kaldır' }))

    await waitFor(() => expect(navigate).toHaveBeenCalledWith('#detail/AVL-101?from=future'))
    const [{ payload, guard }] = mocks.updated.mock.calls[0]
    expect(guard).toEqual(['trip_type', 'round_trip'])
    expect(payload).toMatchObject({
      trip_type: 'one_way',
      price_eur: 450,
      pickup_location: 'pamukkale',
      dropoff_location: 'airport',
      pickup_date: '2026-08-09',
      pickup_time: '14:00',
      flight_number: 'TK2412',
      service_cost_mode: 'sold_transfer',
      sold_transfer_cost_try: 1600,
      return_date: null,
    })
    expect(mocks.notes).toHaveBeenCalledWith(expect.objectContaining({ note: expect.stringContaining('Gidiş transferi kaldırıldı') }))
  })

  test('does not offer removing an outbound that has already been driven', async () => {
    installQueries({ status: 'completed' })
    render(<BookingDetailPage bookingRef="AVL-101" isReturn={false} sourceTab="future" navigate={vi.fn()} />)

    await screen.findByText('Durum Güncelle')
    expect(screen.queryByRole('button', { name: 'Sadece gidişi kaldır' })).not.toBeInTheDocument()
  })

  test('warns that cancelling from the return leg cancels both legs', async () => {
    installQueries()
    const confirm = vi.mocked(window.confirm).mockReturnValue(false)
    render(<BookingDetailPage bookingRef="AVL-101" isReturn sourceTab="future" navigate={vi.fn()} />)

    await screen.findByText('Durum Güncelle')
    fireEvent.click(screen.getByRole('button', { name: 'İptal' }))

    expect(confirm).toHaveBeenCalledWith(expect.stringContaining('gidiş ve dönüş'))
    expect(mocks.updated).not.toHaveBeenCalled()
  })
})
