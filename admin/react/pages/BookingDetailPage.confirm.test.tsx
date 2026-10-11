// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest'
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react'
import type { Booking } from '../types'

const mocks = vi.hoisted(() => ({ from: vi.fn(), updates: [] as Array<Record<string, unknown>> }))

vi.mock('../lib/supabase', () => ({ supabase: { from: mocks.from } }))

import BookingDetailPage from './BookingDetailPage'

const roundTrip = {
  id: 'booking-1', booking_ref: 'AVL-301', customer_name: 'Anna Schmidt', customer_email: '', customer_phone: '+491701234567',
  hotel_name: 'Regnum', child_seat_count: 0, child_ages: [], luggage_count: 0,
  pickup_location: 'airport', pickup_address: null, dropoff_location: 'belek', dropoff_address: null,
  pickup_date: '2099-05-10', pickup_time: '10:00', flight_number: 'TK123', flight_arrival_time: '10:00',
  trip_type: 'round_trip', return_date: '2099-05-17', return_pickup_time: '06:30', return_flight_number: 'TK124',
  return_flight_departure_time: '09:30', service_end_date: null, daily_rate_eur: null,
  departure_flight_date: null, departure_flight_time: null, departure_flight_number: null, fuel_terms_accepted_at: null,
  guests: 2, vehicle_type: 'vito', service_cost_mode: 'own_vehicle', sold_transfer_cost_try: null,
  price_eur: 120, status: 'confirmed', payment_method: 'cash', notes: null, language: 'en',
  check_message_sent_at: null, confirm_message_sent_at: null,
  created_at: '2099-05-01T10:00:00Z', booking_notes: [], chauffeur_hire_days: [],
} as unknown as Booking

function installQueries(booking: Booking) {
  mocks.from.mockImplementation(() => ({
    select: (columns: string) => columns.startsWith('id, booking_ref')
      ? { eq: () => Promise.resolve({ data: [], error: null }) }
      : columns === '*'
        ? { eq: () => ({ single: () => Promise.resolve({ data: booking, error: null }) }) }
        : { eq: () => ({ limit: () => Promise.resolve({ data: [booking], error: null }) }) },
    update: (values: Record<string, unknown>) => ({
      eq: () => ({ is: () => { mocks.updates.push(values); return Promise.resolve({ error: null }) } }),
    }),
  }))
}

const confirmButton = (title: RegExp) => screen.getAllByRole('button').find(button => title.test(button.textContent ?? ''))

beforeEach(() => { mocks.from.mockReset(); mocks.updates = [] })
afterEach(() => { cleanup(); vi.restoreAllMocks() })

describe('BookingDetailPage per-leg confirmations', () => {
  test('a round trip offers separate outbound and return confirmations', async () => {
    installQueries(roundTrip)
    render(<BookingDetailPage bookingRef="AVL-301" isReturn={false} sourceTab="future" navigate={vi.fn()} />)
    await screen.findByText(/Rezervasyon onayı \(gidiş \+ dönüş\)/)
    expect(confirmButton(/Gidiş onayı gönder/)).toBeTruthy()
    expect(confirmButton(/Dönüş onayı gönder/)).toBeTruthy()
  })

  test('the return confirmation sends only the return leg and keeps the booking in the inbox', async () => {
    installQueries(roundTrip)
    const popup = { closed: false, opener: {}, document: { title: '', body: { textContent: '' } }, location: { replace: vi.fn() }, close: vi.fn() }
    vi.spyOn(window, 'open').mockReturnValue(popup as unknown as Window)
    render(<BookingDetailPage bookingRef="AVL-301" isReturn={false} sourceTab="future" navigate={vi.fn()} />)
    await screen.findByText(/Dönüş onayı gönder/)
    fireEvent.click(confirmButton(/Dönüş onayı gönder/)!)

    await waitFor(() => expect(popup.location.replace).toHaveBeenCalledTimes(1))
    const text = decodeURIComponent(String(popup.location.replace.mock.calls[0][0]))
    expect(text).toContain('TK124')
    expect(text).not.toContain('TK123')
    await screen.findByText(/en güncel transfer/)
    expect(mocks.updates).toEqual([])
  })

  test('the outbound confirmation sends only the outbound leg', async () => {
    installQueries(roundTrip)
    const popup = { closed: false, opener: {}, document: { title: '', body: { textContent: '' } }, location: { replace: vi.fn() }, close: vi.fn() }
    vi.spyOn(window, 'open').mockReturnValue(popup as unknown as Window)
    render(<BookingDetailPage bookingRef="AVL-301" isReturn={false} sourceTab="future" navigate={vi.fn()} />)
    await screen.findByText(/Gidiş onayı gönder/)
    fireEvent.click(confirmButton(/Gidiş onayı gönder/)!)

    await waitFor(() => expect(popup.location.replace).toHaveBeenCalledTimes(1))
    const text = decodeURIComponent(String(popup.location.replace.mock.calls[0][0]))
    expect(text).toContain('TK123')
    expect(text).not.toContain('TK124')
    await waitFor(() => expect(mocks.updates).toEqual([{ confirm_message_sent_at: expect.any(String) }]))
  })

  test('one-way bookings keep a single confirmation', async () => {
    installQueries({ ...roundTrip, trip_type: 'one_way', return_date: null } as Booking)
    render(<BookingDetailPage bookingRef="AVL-301" isReturn={false} sourceTab="future" navigate={vi.fn()} />)
    await screen.findByText('Rezervasyon onayı')
    expect(confirmButton(/Gidiş onayı gönder/)).toBeUndefined()
    expect(confirmButton(/Dönüş onayı gönder/)).toBeUndefined()
  })
})
