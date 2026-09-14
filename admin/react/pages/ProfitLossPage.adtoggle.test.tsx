// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest'
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react'
import type { ComponentProps } from 'react'
import type { ProfitDistributionSection } from '../components/ProfitDistributionSection'
import type { Booking, ProfitShareSettings } from '../types'

const mocks = vi.hoisted(() => ({
  fetchLedger: vi.fn(),
  saveShareSettings: vi.fn(),
  createDistribution: vi.fn(),
  mapError: vi.fn(),
  from: vi.fn(),
}))

vi.mock('../lib/profit-distributions', () => ({
  fetchProfitDistributionLedger: mocks.fetchLedger,
  saveProfitShareSettings: mocks.saveShareSettings,
  createProfitDistribution: mocks.createDistribution,
  profitDistributionErrorMessage: mocks.mapError,
}))

vi.mock('../lib/supabase', () => ({ supabase: { from: mocks.from } }))

vi.mock('../lib/exchange-rates', () => ({
  fetchRatesForDates: vi.fn().mockResolvedValue(new Map()),
  fetchLatestEurTryRate: vi.fn().mockResolvedValue(null),
}))

vi.mock('../components/ProfitDistributionSection', () => ({
  ProfitDistributionSection: (props: ComponentProps<typeof ProfitDistributionSection>) => <section data-testid="distribution-section">
    <span data-testid="distribution-include-ads">{String(props.includeAdvertising)}</span>
  </section>,
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
  service_cost_mode: 'no_cost',
  sold_transfer_cost_try: null,
  own_vehicle_profit_eur: null,
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

function installLedgerQueries() {
  mocks.from.mockImplementation((table: string) => {
    if (table === 'bookings') {
      return { select: () => ({ order: () => ({ range: async () => ({ data: [booking], error: null }) }) }) }
    }
    if (table === 'profit_loss_settings') {
      return {
        select: () => ({
          order: async () => ({
            data: [{
              period_month: '2026-08-01',
              km_cost_try: 15,
              advertising_expense_try: 5000,
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
  window.localStorage.clear()
  installLedgerQueries()
  mocks.fetchLedger.mockResolvedValue({ settings: shareSettings, distributions: [] })
  mocks.mapError.mockReturnValue('Kâr paylaşımı kayıtları alınamadı.')
})

afterEach(cleanup)

const toggle = () => screen.getByRole('checkbox', { name: /reklam/i })

describe('ProfitLossPage reklam toggle', () => {
  test('varsayılan olarak reklam dahildir ve net kâr reklamı düşer', async () => {
    render(<ProfitLossPage navigate={vi.fn()} />)
    await screen.findByLabelText('Net kâr')

    expect(toggle()).toBeChecked()
    // 900 € gelir = 45.000 ₺, reklam 5.000 ₺ (tek seyahat tüm havuzu taşır)
    expect(screen.getByLabelText('Net kâr')).toHaveTextContent('40.000')
  })

  test('toggle kapatılınca net kâr reklamsız hesaplanır', async () => {
    render(<ProfitLossPage navigate={vi.fn()} />)
    await screen.findByLabelText('Net kâr')

    fireEvent.click(toggle())

    await waitFor(() => expect(screen.getByLabelText('Net kâr')).toHaveTextContent('45.000'))
    expect(toggle()).not.toBeChecked()
  })

  test('seçim kalıcıdır; sayfa yeniden açıldığında korunur', async () => {
    const { unmount } = render(<ProfitLossPage navigate={vi.fn()} />)
    await screen.findByLabelText('Net kâr')
    fireEvent.click(toggle())
    await waitFor(() => expect(toggle()).not.toBeChecked())
    unmount()

    render(<ProfitLossPage navigate={vi.fn()} />)
    await screen.findByLabelText('Net kâr')
    expect(toggle()).not.toBeChecked()
  })

  test('seçim kâr dağıtımı bölümüne de geçer', async () => {
    render(<ProfitLossPage navigate={vi.fn()} />)
    await screen.findByTestId('distribution-section')
    expect(screen.getByTestId('distribution-include-ads')).toHaveTextContent('true')

    fireEvent.click(toggle())

    await waitFor(() => expect(screen.getByTestId('distribution-include-ads')).toHaveTextContent('false'))
  })
})
