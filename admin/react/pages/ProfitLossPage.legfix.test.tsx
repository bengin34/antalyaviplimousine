// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest'
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'
import { cleanup, fireEvent, render, screen, waitFor, within } from '@testing-library/react'
import type { Booking, ProfitShareSettings } from '../types'

const mocks = vi.hoisted(() => ({
  fetchLedger: vi.fn(),
  from: vi.fn(),
  updateBooking: vi.fn(),
}))

vi.mock('../lib/profit-distributions', async importOriginal => ({
  ...await importOriginal<typeof import('../lib/profit-distributions')>(),
  fetchProfitDistributionLedger: mocks.fetchLedger,
}))

vi.mock('../lib/supabase', () => ({
  supabase: { from: mocks.from },
}))

vi.mock('../lib/exchange-rates', () => ({
  fetchRatesForDates: vi.fn().mockResolvedValue(new Map()),
  fetchLatestEurTryRate: vi.fn().mockResolvedValue(null),
}))

import ProfitLossPage from './ProfitLossPage'

/** Sabit rota tablosunda karşılığı olmayan bir güzergâh; tek yön KM zorunlu olur. */
function unresolvedBooking(overrides: Partial<Booking> = {}): Booking {
  return {
    id: 'booking-1',
    booking_ref: 'AVL-101',
    customer_name: 'Test Yolcu',
    customer_email: 'test@example.com',
    customer_phone: '+905551112233',
    hotel_name: '',
    child_seat_count: 0,
    child_ages: [],
    luggage_count: 1,
    pickup_location: 'private_address',
    pickup_address: null,
    dropoff_location: 'hotel',
    dropoff_address: null,
    pickup_date: '2026-07-20',
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
    created_at: '2026-07-01T10:00:00Z',
    ...overrides,
  } as Booking
}

const shareSettings: ProfitShareSettings = {
  id: 1,
  opening_date: '2026-07-01',
  default_operations_share_pct: 50,
  default_vehicle_owner_share_pct: 50,
  created_at: '2026-07-01T08:00:00Z',
  updated_at: '2026-07-01T08:00:00Z',
}

function installQueries(bookings: Booking[]) {
  mocks.from.mockImplementation((table: string) => {
    if (table === 'bookings') {
      return {
        select: () => ({
          order: () => ({
            range: async () => ({ data: bookings, error: null }),
          }),
        }),
        update: (payload: Record<string, unknown>) => {
          mocks.updateBooking(payload)
          return {
            eq: () => ({
              select: () => ({
                single: async () => ({
                  data: { id: bookings[0].id, ...payload },
                  error: null,
                }),
              }),
            }),
          }
        },
      }
    }
    if (table === 'profit_loss_settings') {
      return {
        select: () => ({
          order: async () => ({
            data: [{
              period_month: '2026-07-01',
              km_cost_try: 15,
              advertising_expense_try: 0,
              eur_try_rate: 50,
              updated_at: '2026-07-01T08:00:00Z',
            }],
            error: null,
          }),
        }),
      }
    }
    throw new Error(`Unexpected table ${table}`)
  })
}

beforeEach(() => {
  vi.useFakeTimers({ shouldAdvanceTime: true })
  vi.setSystemTime(new Date('2026-08-05T09:00:00Z'))
  vi.clearAllMocks()
  mocks.fetchLedger.mockResolvedValue({ settings: shareSettings, distributions: [] })
})

afterEach(() => {
  cleanup()
  vi.useRealTimers()
})

describe('ProfitLossPage missing distance recovery', () => {
  test('clears the distribution blocker once the KM is entered on the blocker itself', async () => {
    installQueries([unresolvedBooking()])
    render(<ProfitLossPage navigate={vi.fn()} initialPeriod="2026-08" />)

    const blocker = await screen.findByRole('alert')
    expect(blocker).toHaveTextContent('Rota mesafesi eksik.')
    expect(screen.getByRole('button', { name: 'Kârı dağıt' })).toBeDisabled()

    fireEvent.click(within(blocker).getByRole('button', { name: 'KM gir' }))
    fireEvent.change(within(blocker).getByLabelText('Tek yön KM'), { target: { value: '38' } })
    fireEvent.click(within(blocker).getByRole('button', { name: 'Kaydet ve hesapla' }))

    await waitFor(() => expect(mocks.updateBooking).toHaveBeenCalledWith({ manual_outbound_distance_km: 38 }))
    await waitFor(() => expect(screen.queryByText('Rota mesafesi eksik.')).toBeNull())
    expect(screen.getByRole('button', { name: 'Kârı dağıt' })).toBeEnabled()
  })

  test('moves the trip list to the blocked leg period so the row can be reached', async () => {
    installQueries([unresolvedBooking()])
    render(<ProfitLossPage navigate={vi.fn()} initialPeriod="2026-08" />)

    const blocker = await screen.findByRole('alert')
    // Ağustos seçiliyken temmuz ayağı listede yoktur; "Listede aç" dönemi taşımalıdır.
    expect(document.getElementById('profit-leg-booking-1-outbound')).toBeNull()

    fireEvent.click(within(blocker).getByRole('button', { name: 'Listede aç' }))

    await waitFor(() => expect(document.getElementById('profit-leg-booking-1-outbound')).not.toBeNull())
    expect(document.getElementById('profit-leg-booking-1-outbound')).toHaveClass('is-focused')
    expect(screen.getByRole('button', { name: "Tem '26" })).toHaveClass('active')
  })
})
