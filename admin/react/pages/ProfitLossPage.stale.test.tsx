// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest'
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'
import { act, cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react'
import type { Booking, ProfitDistribution, ProfitShareSettings } from '../types'

const mocks = vi.hoisted(() => ({
  fetchLedger: vi.fn(),
  saveShareSettings: vi.fn(),
  createDistribution: vi.fn(),
  from: vi.fn(),
}))

vi.mock('../lib/profit-distributions', async importOriginal => ({
  ...await importOriginal<typeof import('../lib/profit-distributions')>(),
  fetchProfitDistributionLedger: mocks.fetchLedger,
  saveProfitShareSettings: mocks.saveShareSettings,
  createProfitDistribution: mocks.createDistribution,
}))

vi.mock('../lib/supabase', () => ({
  supabase: { from: mocks.from },
}))

import ProfitLossPage from './ProfitLossPage'

const booking: Booking = {
  id: 'booking-1',
  booking_ref: 'AVL-101',
  customer_name: 'Test Yolcu',
  customer_email: 'test@example.com',
  customer_phone: '+905551112233',
  hotel_name: '',
  child_seat_count: 0,
  child_ages: [],
  luggage_count: 1,
  pickup_location: 'airport',
  pickup_address: null,
  dropoff_location: 'belek',
  dropoff_address: null,
  pickup_date: '2026-08-10',
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
  created_at: '2026-08-01T10:00:00Z',
}

const shareSettings: ProfitShareSettings = {
  id: 1,
  opening_date: '2026-08-01',
  default_operations_share_pct: 50,
  default_vehicle_owner_share_pct: 50,
  created_at: '2026-08-01T08:00:00Z',
  updated_at: '2026-08-01T08:00:00Z',
}

const refreshedDistribution = {
  id: 'distribution-1',
  period_start: '2026-08-01',
  period_end: '2026-08-10',
  operations_share_pct: 50,
  vehicle_owner_share_pct: 50,
  operations_amount_eur: 200,
  vehicle_owner_amount_eur: 200,
  operations_amount_try: 10000,
  vehicle_owner_amount_try: 10000,
  income_eur: 450,
  income_try: 22500,
  vehicle_cost_eur: 20,
  vehicle_cost_try: 1000,
  supplier_cost_eur: 0,
  supplier_cost_try: 0,
  airport_cost_eur: 5,
  airport_cost_try: 250,
  advertising_cost_eur: 25,
  advertising_cost_try: 1250,
  total_expense_eur: 50,
  total_expense_try: 2500,
  net_profit_eur: 400,
  net_profit_try: 20000,
  realized_leg_count: 1,
  calculation_snapshot: {} as never,
  created_by: 'admin-1',
  created_at: '2026-08-11T08:00:00Z',
} satisfies ProfitDistribution

let resolveRefreshedLedger!: (value: {
  settings: ProfitShareSettings
  distributions: ProfitDistribution[]
}) => void

function installQueries() {
  mocks.from.mockImplementation((table: string) => {
    if (table === 'bookings') {
      return {
        select: () => ({
          order: () => ({
            range: async () => ({ data: [booking], error: null }),
          }),
        }),
      }
    }
    if (table === 'profit_loss_settings') {
      return {
        select: () => ({
          order: async () => ({
            data: [{
              period_month: '2026-08-01',
              km_cost_try: 15,
              advertising_expense_try: 0,
              eur_try_rate: 50,
              updated_at: '2026-08-01T08:00:00Z',
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
  vi.clearAllMocks()
  installQueries()
  mocks.fetchLedger
    .mockResolvedValueOnce({ settings: shareSettings, distributions: [] })
    .mockImplementationOnce(() => new Promise(resolve => { resolveRefreshedLedger = resolve }))
  mocks.createDistribution.mockRejectedValueOnce({
    code: '23P01',
    message: 'Distribution start is stale or not contiguous',
  })
})

afterEach(cleanup)

describe('ProfitLossPage stale distribution recovery', () => {
  test('keeps the mapped error visible while silently advancing to refreshed ledger history', async () => {
    render(<ProfitLossPage navigate={vi.fn()} initialPeriod="2026-08" />)
    await screen.findByRole('button', { name: 'Kârı dağıt' })

    fireEvent.click(screen.getByRole('button', { name: 'Kârı dağıt' }))
    fireEvent.click(screen.getByRole('button', { name: 'Dağıtımı onayla' }))

    await waitFor(() => expect(mocks.fetchLedger).toHaveBeenCalledTimes(2))
    await act(async () => resolveRefreshedLedger({ settings: shareSettings, distributions: [refreshedDistribution] }))
    await waitFor(() => expect(screen.getByLabelText('Dağıtım başlangıç tarihi')).toHaveValue('2026-08-11'))
    expect(screen.getByRole('alert')).toHaveTextContent(
      'Dağıtım dönemi güncelliğini yitirdi. Verileri yenileyip tekrar deneyin.',
    )
  })
})
