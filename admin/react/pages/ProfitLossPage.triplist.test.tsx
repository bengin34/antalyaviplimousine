// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest'
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'
import { cleanup, fireEvent, render, screen, waitFor, within } from '@testing-library/react'
import { formatEuro, formatTry } from '../lib/format'
import type { Booking, ProfitShareSettings } from '../types'

const mocks = vi.hoisted(() => ({
  fetchLedger: vi.fn(),
  from: vi.fn(),
  updateBooking: vi.fn(),
  updateHireDay: vi.fn(),
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

function makeBooking(overrides: Partial<Booking> = {}): Booking {
  return {
    id: 'booking-1',
    booking_ref: 'AVL-101',
    customer_name: 'Ayşe Yılmaz',
    customer_email: 'test@example.com',
    customer_phone: '+905551112233',
    hotel_name: 'Otel Test',
    child_seat_count: 0,
    child_ages: [],
    luggage_count: 2,
    pickup_location: 'airport',
    pickup_address: null,
    dropoff_location: 'side',
    dropoff_address: null,
    pickup_date: '2026-08-02',
    pickup_time: '09:00',
    flight_number: 'TK123',
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
    guests: 3,
    vehicle_type: 'vclass',
    service_cost_mode: 'own_vehicle',
    sold_transfer_cost_try: null,
    price_eur: 100,
    status: 'completed',
    payment_method: 'cash',
    notes: null,
    language: 'tr',
    created_at: '2026-08-01T10:00:00Z',
    ...overrides,
  } as Booking
}

const shareSettings: ProfitShareSettings = {
  id: 1,
  opening_date: '2026-08-01',
  default_operations_share_pct: 50,
  default_vehicle_owner_share_pct: 50,
  created_at: '2026-08-01T08:00:00Z',
  updated_at: '2026-08-01T08:00:00Z',
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
                single: async () => ({ data: { id: bookings[0].id, ...payload }, error: null }),
              }),
            }),
          }
        },
      }
    }
    if (table === 'chauffeur_hire_days') {
      return {
        update: (payload: Record<string, unknown>) => {
          mocks.updateHireDay(payload)
          return {
            eq: () => ({
              select: () => ({
                single: async () => ({ data: { id: 'day-1', ...payload }, error: null }),
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
  vi.useFakeTimers({ shouldAdvanceTime: true })
  vi.setSystemTime(new Date('2026-08-05T09:00:00Z'))
  vi.clearAllMocks()
  mocks.fetchLedger.mockResolvedValue({ settings: shareSettings, distributions: [] })
})

afterEach(() => {
  cleanup()
  vi.useRealTimers()
})

describe('ProfitLossPage travel history', () => {
  test('leaves cancelled bookings out of the report entirely', async () => {
    installQueries([
      makeBooking(),
      makeBooking({ id: 'booking-2', booking_ref: 'AVL-IPTAL', status: 'cancelled' }),
    ])
    render(<ProfitLossPage navigate={vi.fn()} initialPeriod="2026-08" />)

    await waitFor(() => expect(document.getElementById('profit-leg-booking-1-outbound')).not.toBeNull())
    expect(screen.queryByText('AVL-IPTAL')).toBeNull()
    expect(document.getElementById('profit-leg-booking-2-outbound')).toBeNull()
    // Tek gerçekleşen ayak: 100 € gelir, iptal edilen kayıt hesaba girmez.
    expect(screen.getByText('1 sefer · 1 gün')).toBeInTheDocument()
  })

  test('groups legs under their date and opens an older day on demand', async () => {
    installQueries([
      makeBooking(),
      makeBooking({ id: 'booking-2', booking_ref: 'AVL-102', pickup_date: '2026-08-01' }),
    ])
    render(<ProfitLossPage navigate={vi.fn()} initialPeriod="2026-08" />)

    await waitFor(() => expect(document.getElementById('profit-leg-booking-1-outbound')).not.toBeNull())
    // En yeni gün açık gelir, önceki gün kapalıdır.
    expect(document.getElementById('profit-leg-booking-2-outbound')).toBeNull()

    fireEvent.click(screen.getByRole('button', { name: /1 Ağustos 2026/ }))

    await waitFor(() => expect(document.getElementById('profit-leg-booking-2-outbound')).not.toBeNull())
  })

  test('shows the leg direction, passenger details and the TL value of the income', async () => {
    installQueries([makeBooking({
      trip_type: 'round_trip',
      price_eur: 200,
      return_date: '2026-08-02',
      return_service_cost_mode: 'own_vehicle',
    })])
    render(<ProfitLossPage navigate={vi.fn()} initialPeriod="2026-08" />)

    await waitFor(() => expect(document.getElementById('profit-leg-booking-1-outbound')).not.toBeNull())
    const outbound = within(document.getElementById('profit-leg-booking-1-outbound') as HTMLElement)
    const returnLeg = within(document.getElementById('profit-leg-booking-1-return') as HTMLElement)

    expect(outbound.getByText('Gidiş')).toBeInTheDocument()
    expect(returnLeg.getByText('Dönüş')).toBeInTheDocument()
    expect(outbound.getByText('Ayşe Yılmaz')).toBeInTheDocument()
    expect(outbound.getByText('+905551112233')).toBeInTheDocument()
    expect(outbound.getByText('3 kişi · 2 bagaj')).toBeInTheDocument()
    // Gelir hem € hem TL karşılığıyla yazılır (gidiş ayağı: 200 €'nun yarısı).
    expect(outbound.getByText(formatEuro(100))).toBeInTheDocument()
    expect(outbound.getByText(`TL karşılığı ${formatTry(5000)}`)).toBeInTheDocument()
  })

  test('marks a transfer leg as cost free from the pending list', async () => {
    installQueries([makeBooking({ pickup_location: 'private_address', dropoff_location: 'hotel' })])
    render(<ProfitLossPage navigate={vi.fn()} initialPeriod="2026-08" />)

    const pending = await screen.findByText('İşlem bekleyen kayıtlar')
    fireEvent.click(pending)
    // Uyarı listesindeki kısayol; satırdaki maliyet modeli seçiciyle karışmasın.
    const pendingRow = (await screen.findByRole('button', { name: 'Kaydı aç' })).closest('li') as HTMLElement

    fireEvent.click(within(pendingRow).getByRole('button', { name: 'Maliyeti yok' }))

    await waitFor(() => expect(mocks.updateBooking).toHaveBeenCalledWith({
      service_cost_mode: 'no_cost',
      sold_transfer_cost_try: null,
    }))
    await waitFor(() => expect(screen.queryByText('Tek yön KM bilgisi eksik')).toBeNull())
  })

  test('zeroes the distance of a daily service day marked as cost free', async () => {
    installQueries([makeBooking({
      trip_type: 'daily_chauffeur',
      pickup_location: 'daily_chauffeur',
      dropoff_location: null,
      pickup_date: '2026-08-02',
      service_end_date: '2026-08-02',
      daily_rate_eur: 150,
      price_eur: 150,
      chauffeur_hire_days: [{
        id: 'day-1',
        booking_id: 'booking-1',
        service_date: '2026-08-02',
        day_number: 1,
        status: 'completed',
        driver_name: null,
        vehicle_plate: null,
        distance_km: null,
        fuel_amount_eur: null,
        fuel_paid: false,
        notes: null,
        updated_at: '2026-08-02T10:00:00Z',
      }],
    })])
    render(<ProfitLossPage navigate={vi.fn()} initialPeriod="2026-08" />)

    const pending = await screen.findByText('İşlem bekleyen kayıtlar')
    fireEvent.click(pending)
    const pendingRow = (await screen.findByRole('button', { name: 'Kaydı aç' })).closest('li') as HTMLElement

    fireEvent.click(within(pendingRow).getByRole('button', { name: 'Maliyeti yok' }))

    await waitFor(() => expect(mocks.updateHireDay).toHaveBeenCalledWith({ distance_km: 0 }))
    await waitFor(() => expect(screen.queryByText('Günlük hizmet KM bilgisi eksik')).toBeNull())
  })
})
