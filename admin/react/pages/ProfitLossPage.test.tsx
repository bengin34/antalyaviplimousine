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
  callbackError: vi.fn(),
  from: vi.fn(),
}))

vi.mock('../lib/profit-distributions', () => ({
  fetchProfitDistributionLedger: mocks.fetchLedger,
  saveProfitShareSettings: mocks.saveShareSettings,
  createProfitDistribution: mocks.createDistribution,
  profitDistributionErrorMessage: mocks.mapError,
}))

vi.mock('../lib/supabase', () => ({
  supabase: { from: mocks.from },
}))

vi.mock('../components/ProfitDistributionSection', () => ({
  ProfitDistributionSection: (props: ComponentProps<typeof ProfitDistributionSection>) => <section data-testid="distribution-section">
    <span data-testid="distribution-error">{props.error}</span>
    <span data-testid="distribution-opening-date">{props.shareSettings?.opening_date ?? ''}</span>
    <button type="button" onClick={props.onRetry}>Dağıtım kayıtlarını yenile</button>
    <span data-testid="distribution-period-end">{props.distributions[0]?.period_end ?? ''}</span>
    <button type="button" onClick={() => void props.onSaveSettings({
      openingDate: '2026-08-01',
      operationsSharePct: 50,
      vehicleOwnerSharePct: 50,
    }).catch(mocks.callbackError)}>Paylaşımı kur</button>
    <button type="button" onClick={() => void props.onCreateDistribution({
      expectedStart: '2026-08-01',
      periodEnd: '2026-08-20',
      operationsSharePct: 50,
      vehicleOwnerSharePct: 50,
      snapshot: { schema_version: 1, period_start: 'stale' } as never,
    }).catch(mocks.callbackError)}>Dağıtımı kaydet</button>
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

function installLedgerQueries() {
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
  installLedgerQueries()
  mocks.fetchLedger.mockResolvedValue({ settings: shareSettings, distributions: [] })
  mocks.saveShareSettings.mockResolvedValue(shareSettings)
  mocks.createDistribution.mockResolvedValue({ id: 'distribution-1' })
  mocks.mapError.mockImplementation((error: unknown) => {
    const code = error && typeof error === 'object' ? (error as { code?: string }).code : ''
    if (code?.toLowerCase() === '23p01') return 'Dağıtım dönemi güncelliğini yitirdi. Verileri yenileyip tekrar deneyin.'
    if (error instanceof Error && error.message === 'network') return 'Bağlantı kurulamadı. İnternet bağlantınızı kontrol edip tekrar deneyin.'
    return 'Kâr paylaşımı kayıtları alınamadı.'
  })
})

afterEach(cleanup)

describe('ProfitLossPage profit distribution integration', () => {
  test('keeps monthly profit visible when the distribution ledger fails', async () => {
    mocks.fetchLedger.mockRejectedValueOnce(new Error('ledger unavailable'))

    render(<ProfitLossPage navigate={vi.fn()} initialPeriod="2026-08" />)

    expect(await screen.findByTestId('distribution-section')).toBeInTheDocument()
    expect(screen.getByTestId('distribution-error')).toHaveTextContent('Kâr paylaşımı kayıtları alınamadı.')
    expect(screen.getByLabelText('Net kâr')).toBeInTheDocument()
    expect(screen.queryByText('Kâr/zarar verileri yüklenemedi.')).not.toBeInTheDocument()
  })

  test('retries only the distribution ledger after its isolated failure', async () => {
    mocks.fetchLedger.mockRejectedValueOnce(new Error('ledger unavailable'))

    render(<ProfitLossPage navigate={vi.fn()} initialPeriod="2026-08" />)
    await screen.findByText('Dağıtım kayıtlarını yenile')

    fireEvent.click(screen.getByText('Dağıtım kayıtlarını yenile'))

    await waitFor(() => expect(mocks.fetchLedger).toHaveBeenCalledTimes(2))
    expect(mocks.from.mock.calls.filter(([table]) => table === 'bookings')).toHaveLength(1)
    expect(mocks.from.mock.calls.filter(([table]) => table === 'profit_loss_settings')).toHaveLength(1)
  })

  test('saves setup settings and immediately publishes the returned configuration', async () => {
    render(<ProfitLossPage navigate={vi.fn()} initialPeriod="2026-08" />)
    await screen.findByText('Paylaşımı kur')

    fireEvent.click(screen.getByText('Paylaşımı kur'))

    await waitFor(() => expect(mocks.saveShareSettings).toHaveBeenCalledWith({
      openingDate: '2026-08-01',
      operationsSharePct: 50,
      vehicleOwnerSharePct: 50,
    }))
    expect(screen.getByTestId('distribution-opening-date')).toHaveTextContent('2026-08-01')
  })

  test('maps setup write failures before surfacing them to the section', async () => {
    const apiError = new Error('network')
    mocks.saveShareSettings.mockRejectedValueOnce(apiError)
    render(<ProfitLossPage navigate={vi.fn()} initialPeriod="2026-08" />)
    await screen.findByText('Paylaşımı kur')

    fireEvent.click(screen.getByText('Paylaşımı kur'))

    await waitFor(() => expect(mocks.mapError).toHaveBeenCalledWith(apiError))
    expect(mocks.callbackError).toHaveBeenCalledWith(expect.objectContaining({
      message: 'Bağlantı kurulamadı. İnternet bağlantınızı kontrol edip tekrar deneyin.',
    }))
  })

  test('rebuilds the snapshot and refreshes all three data sources after confirmation', async () => {
    render(<ProfitLossPage navigate={vi.fn()} initialPeriod="2026-08" />)
    await screen.findByText('Dağıtımı kaydet')

    fireEvent.click(screen.getByText('Dağıtımı kaydet'))

    await waitFor(() => expect(mocks.createDistribution).toHaveBeenCalledTimes(1))
    const savedInput = mocks.createDistribution.mock.calls[0][0]
    expect(savedInput.snapshot).toMatchObject({
      schema_version: 1,
      period_start: '2026-08-01',
      period_end: '2026-08-20',
    })
    expect(savedInput.snapshot.period_start).not.toBe('stale')
    await waitFor(() => expect(mocks.fetchLedger).toHaveBeenCalledTimes(2))
    expect(mocks.from.mock.calls.filter(([table]) => table === 'bookings')).toHaveLength(2)
    expect(mocks.from.mock.calls.filter(([table]) => table === 'profit_loss_settings')).toHaveLength(2)
  })

  test('reloads the ledger and surfaces the mapped error when confirmation is stale', async () => {
    const staleError = { code: '23P01', message: 'stale or not contiguous' }
    mocks.createDistribution.mockRejectedValueOnce(staleError)
    mocks.fetchLedger
      .mockResolvedValueOnce({ settings: shareSettings, distributions: [] })
      .mockResolvedValueOnce({
        settings: shareSettings,
        distributions: [{ period_end: '2026-08-10' } as never],
      })
    render(<ProfitLossPage navigate={vi.fn()} initialPeriod="2026-08" />)
    await screen.findByText('Dağıtımı kaydet')

    fireEvent.click(screen.getByText('Dağıtımı kaydet'))

    await waitFor(() => expect(mocks.fetchLedger).toHaveBeenCalledTimes(2))
    expect(screen.getByTestId('distribution-period-end')).toHaveTextContent('2026-08-10')
    expect(mocks.callbackError).toHaveBeenCalledWith(expect.objectContaining({
      message: 'Dağıtım dönemi güncelliğini yitirdi. Verileri yenileyip tekrar deneyin.',
    }))
    expect(mocks.from.mock.calls.filter(([table]) => table === 'bookings')).toHaveLength(1)
    expect(mocks.from.mock.calls.filter(([table]) => table === 'profit_loss_settings')).toHaveLength(1)
  })
})
