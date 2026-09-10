// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest'
import { afterEach, describe, expect, test, vi } from 'vitest'
import { cleanup, fireEvent, render, screen, waitFor, within } from '@testing-library/react'
import { ProfitDistributionSection } from './ProfitDistributionSection'
import type {
  Booking,
  ProfitDistribution,
  ProfitShareSettings,
} from '../types'

afterEach(cleanup)

const today = '2026-08-21'
const settingsByMonth = new Map([
  ['2026-08', { eur_try_rate: 50, advertising_expense_try: 0 }],
])

const shareSettings: ProfitShareSettings = {
  id: 1,
  opening_date: '2026-08-01',
  default_operations_share_pct: 50,
  default_vehicle_owner_share_pct: 50,
  created_at: '2026-08-01T08:00:00Z',
  updated_at: '2026-08-01T08:00:00Z',
}

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
    pickup_location: 'daily_chauffeur',
    pickup_address: null,
    dropoff_location: 'daily_chauffeur',
    dropoff_address: null,
    pickup_date: '2026-08-10',
    pickup_time: '09:00',
    flight_number: null,
    flight_arrival_time: null,
    trip_type: 'daily_chauffeur',
    return_date: null,
    return_pickup_time: null,
    return_flight_number: null,
    service_end_date: '2026-08-10',
    daily_rate_eur: 900,
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
    chauffeur_hire_days: [{
      id: 'day-1',
      booking_id: 'booking-1',
      service_date: '2026-08-10',
      day_number: 1,
      status: 'completed',
      driver_name: null,
      vehicle_plate: null,
      distance_km: 0,
      profit_before_ads_eur: 900,
      fuel_amount_eur: null,
      fuel_paid: false,
      notes: null,
      updated_at: '2026-08-10T20:00:00Z',
    }],
    ...overrides,
    child_ages: overrides.child_ages ?? [],
  }
}

function distributionFixture(overrides: Partial<ProfitDistribution> = {}): ProfitDistribution {
  const periodStart = String(overrides.period_start ?? '2026-08-01')
  const periodEnd = String(overrides.period_end ?? '2026-08-10')
  const snapshot = {
    schema_version: 1 as const,
    period_start: periodStart,
    period_end: periodEnd,
    operations_share_pct: 60,
    vehicle_owner_share_pct: 40,
    operations_amount_eur: 540,
    vehicle_owner_amount_eur: 360,
    operations_amount_try: 27000,
    vehicle_owner_amount_try: 18000,
    income_eur: 1000,
    income_try: 50000,
    vehicle_cost_eur: 40,
    vehicle_cost_try: 2000,
    supplier_cost_eur: 20,
    supplier_cost_try: 1000,
    airport_cost_eur: 10,
    airport_cost_try: 500,
    advertising_cost_eur: 30,
    advertising_cost_try: 1500,
    total_expense_eur: 100,
    total_expense_try: 5000,
    net_profit_eur: 900,
    net_profit_try: 45000,
    realized_leg_count: 3,
    resolved_legs: [],
    monthly_settings: {},
  }

  return {
    id: 'distribution-new',
    period_start: periodStart,
    period_end: periodEnd,
    operations_share_pct: 60,
    vehicle_owner_share_pct: 40,
    operations_amount_eur: 540,
    vehicle_owner_amount_eur: 360,
    operations_amount_try: 27000,
    vehicle_owner_amount_try: 18000,
    income_eur: 1000,
    income_try: 50000,
    vehicle_cost_eur: 40,
    vehicle_cost_try: 2000,
    supplier_cost_eur: 20,
    supplier_cost_try: 1000,
    airport_cost_eur: 10,
    airport_cost_try: 500,
    advertising_cost_eur: 30,
    advertising_cost_try: 1500,
    total_expense_eur: 100,
    total_expense_try: 5000,
    net_profit_eur: 900,
    net_profit_try: 45000,
    realized_leg_count: 3,
    calculation_snapshot: snapshot,
    created_by: 'admin-1',
    created_at: '2026-08-11T14:30:00Z',
    ...overrides,
  }
}

function renderSection(overrides: Partial<React.ComponentProps<typeof ProfitDistributionSection>> = {}) {
  const props: React.ComponentProps<typeof ProfitDistributionSection> = {
    today,
    bookings: [bookingFixture()],
    settingsByMonth,
    shareSettings,
    distributions: [],
    loading: false,
    error: '',
    onRetry: vi.fn(),
    onSaveSettings: vi.fn().mockResolvedValue(undefined),
    onCreateDistribution: vi.fn().mockResolvedValue(undefined),
    ...overrides,
  }
  return { ...render(<ProfitDistributionSection {...props} />), props }
}

describe('ProfitDistributionSection setup', () => {
  test('requires a valid closed opening date and saves the initial 50/50 split', async () => {
    const onSaveSettings = vi.fn().mockResolvedValue(undefined)
    renderSection({ shareSettings: null, bookings: [], onSaveSettings })

    const date = screen.getByLabelText('Yeni dönem başlangıcı')
    expect(date).toBeRequired()
    expect(screen.getByText('Bu tarihten önce gerçekleşen seyahatler daha önce paylaşılmış kabul edilir.')).toBeVisible()

    fireEvent.change(date, { target: { value: '2026-08-20' } })
    fireEvent.click(screen.getByRole('button', { name: 'Dönemi başlat' }))

    await waitFor(() => expect(onSaveSettings).toHaveBeenCalledWith({
      openingDate: '2026-08-20',
      operationsSharePct: 50,
      vehicleOwnerSharePct: 50,
    }))
  })

  test.each(['', '2026-02-30', today, '2026-08-22'])('rejects invalid or future opening date %s', async openingDate => {
    const onSaveSettings = vi.fn()
    renderSection({ shareSettings: null, bookings: [], onSaveSettings })

    fireEvent.change(screen.getByLabelText('Yeni dönem başlangıcı'), { target: { value: openingDate } })
    fireEvent.click(screen.getByRole('button', { name: 'Dönemi başlat' }))

    expect(onSaveSettings).not.toHaveBeenCalled()
    expect(screen.getByRole('alert')).toHaveTextContent(/geçerli|bugünden önce/i)
  })

  test('preserves the entered date when setup save fails so it can be retried', async () => {
    const onSaveSettings = vi.fn().mockRejectedValue(new Error('Bağlantı kurulamadı. İnternet bağlantınızı kontrol edip tekrar deneyin.'))
    renderSection({ shareSettings: null, bookings: [], onSaveSettings })

    const date = screen.getByLabelText('Yeni dönem başlangıcı')
    fireEvent.change(date, { target: { value: '2026-08-19' } })
    fireEvent.click(screen.getByRole('button', { name: 'Dönemi başlat' }))

    await screen.findByRole('alert')
    expect(date).toHaveValue('2026-08-19')
    expect(screen.getByRole('alert')).toHaveTextContent('Bağlantı kurulamadı. İnternet bağlantınızı kontrol edip tekrar deneyin.')
  })

  test('edits the opening date with current ratios only before the first distribution', async () => {
    const onSaveSettings = vi.fn().mockResolvedValue(undefined)
    const { rerender, props } = renderSection({ onSaveSettings })

    fireEvent.click(screen.getByRole('button', { name: 'Başlangıç tarihini düzenle' }))
    const date = screen.getByLabelText('Dağıtılmamış dönem başlangıcı')
    expect(date).toHaveValue('2026-08-01')
    expect(screen.getByText('Bu tarihten önce gerçekleşen seyahatler daha önce paylaşılmış kabul edilir.')).toBeVisible()

    fireEvent.change(date, { target: { value: '2026-08-02' } })
    fireEvent.click(screen.getByRole('button', { name: 'Başlangıç tarihini kaydet' }))

    await waitFor(() => expect(onSaveSettings).toHaveBeenCalledWith({
      openingDate: '2026-08-02',
      operationsSharePct: 50,
      vehicleOwnerSharePct: 50,
    }))

    rerender(<ProfitDistributionSection {...props} distributions={[distributionFixture()]} />)
    expect(screen.queryByRole('button', { name: 'Başlangıç tarihini düzenle' })).not.toBeInTheDocument()
  })
})

describe('ProfitDistributionSection preview and confirmation', () => {
  test('shows a €900 preview split equally and recalculates it to 60/40', () => {
    renderSection()

    expect(screen.getByText('KÂR PAYLAŞIMI')).toBeVisible()
    expect(screen.getByText('Dağıtılmamış net kâr')).toBeVisible()
    expect(screen.getByText('€900,00')).toBeVisible()
    expect(screen.getAllByText('€450,00')).toHaveLength(2)
    expect(screen.getByText('1 gerçekleşen seyahat ayağı')).toBeVisible()

    fireEvent.change(screen.getByLabelText('Operasyon ortağı yüzdesi'), { target: { value: '60' } })

    expect(screen.getByLabelText('Araç sahibi yüzdesi')).toHaveValue(40)
    expect(screen.getByText('€540,00')).toBeVisible()
    expect(screen.getByText('€360,00')).toBeVisible()
  })

  test('derives the open start from the newest period end plus one UTC day', () => {
    const older = distributionFixture({ id: 'old', period_start: '2026-07-01', period_end: '2026-07-31', created_at: '2026-08-01T08:00:00Z' })
    const newer = distributionFixture({ id: 'new', period_start: '2026-08-01', period_end: '2026-08-10', created_at: '2026-08-11T08:00:00Z' })
    renderSection({ distributions: [older, newer] })

    expect(screen.getByLabelText('Dağıtım başlangıç tarihi')).toHaveValue('2026-08-11')
    expect(screen.getByLabelText('Dağıtım bitiş tarihi')).toHaveValue('2026-08-20')
  })

  test('does not save when opening confirmation and submits exact data only after explicit confirmation', async () => {
    const onCreateDistribution = vi.fn().mockResolvedValue(undefined)
    renderSection({ onCreateDistribution })

    fireEvent.change(screen.getByLabelText('Operasyon ortağı yüzdesi'), { target: { value: '60' } })
    fireEvent.click(screen.getByRole('button', { name: 'Kârı dağıt' }))

    expect(onCreateDistribution).not.toHaveBeenCalled()
    const confirmation = screen.getByRole('dialog', { name: 'Dağıtım özeti' })
    expect(confirmation).toHaveTextContent('1 Ağustos 2026')
    expect(confirmation).toHaveTextContent('20 Ağustos 2026')
    expect(confirmation).toHaveTextContent('€540,00')
    fireEvent.click(within(confirmation).getByRole('button', { name: 'Dağıtımı onayla' }))

    await waitFor(() => expect(onCreateDistribution).toHaveBeenCalledTimes(1))
    const input = onCreateDistribution.mock.calls[0][0]
    expect(input).toMatchObject({
      expectedStart: '2026-08-01',
      periodEnd: '2026-08-20',
      operationsSharePct: 60,
      vehicleOwnerSharePct: 40,
      snapshot: {
        schema_version: 1,
        period_start: '2026-08-01',
        period_end: '2026-08-20',
        operations_share_pct: 60,
        vehicle_owner_share_pct: 40,
        net_profit_eur: 900,
      },
    })
    expect(Object.isFrozen(input.snapshot)).toBe(true)
  })

  test('prevents double confirmation and keeps the preview visible when save fails', async () => {
    let rejectSave!: (error: Error) => void
    const onCreateDistribution = vi.fn(() => new Promise<void>((_resolve, reject) => { rejectSave = reject }))
    renderSection({ onCreateDistribution })

    fireEvent.click(screen.getByRole('button', { name: 'Kârı dağıt' }))
    const confirm = screen.getByRole('button', { name: 'Dağıtımı onayla' })
    fireEvent.click(confirm)
    expect(confirm).toBeDisabled()
    fireEvent.click(confirm)
    expect(onCreateDistribution).toHaveBeenCalledTimes(1)

    rejectSave(new Error('Dağıtım dönemi güncelliğini yitirdi. Verileri yenileyip tekrar deneyin.'))
    await waitFor(() => expect(screen.getByRole('alert')).toHaveTextContent('Dağıtım dönemi güncelliğini yitirdi. Verileri yenileyip tekrar deneyin.'))
    expect(screen.getByText('Dağıtılmamış net kâr')).toBeVisible()
    expect(screen.getByText('€900,00')).toBeVisible()
    expect(screen.getByRole('dialog', { name: 'Dağıtım özeti' })).toBeVisible()
  })

  test('shows a mapped stale error while moving the open start to refreshed history', async () => {
    let rejectSave!: (error: Error) => void
    const onCreateDistribution = vi.fn(() => new Promise<void>((_resolve, reject) => { rejectSave = reject }))
    const { rerender, props } = renderSection({ onCreateDistribution })

    fireEvent.click(screen.getByRole('button', { name: 'Kârı dağıt' }))
    fireEvent.click(screen.getByRole('button', { name: 'Dağıtımı onayla' }))
    rerender(<ProfitDistributionSection {...props} distributions={[distributionFixture()]} />)
    rejectSave(new Error('Dağıtım dönemi güncelliğini yitirdi. Verileri yenileyip tekrar deneyin.'))

    await waitFor(() => expect(screen.getByLabelText('Dağıtım başlangıç tarihi')).toHaveValue('2026-08-11'))
    expect(screen.getByRole('alert')).toHaveTextContent('Dağıtım dönemi güncelliğini yitirdi. Verileri yenileyip tekrar deneyin.')
  })

  test.each([
    ['today', { endDate: today }, 'Dağıtım bitiş tarihi bugünden önce olmalıdır.'],
    ['later', { endDate: '2026-08-22' }, 'Dağıtım bitiş tarihi bugünden önce olmalıdır.'],
    ['ratio total', { operationsShare: '60.01', vehicleShare: '40' }, 'Payların toplamı %100 olmalıdır.'],
    ['ratio precision', { operationsShare: '33.333', vehicleShare: '66.667' }, 'Pay yüzdeleri en fazla iki ondalık basamak içermelidir.'],
  ])('blocks %s with an explanation', (_name, changes, message) => {
    renderSection()
    const blockChanges: { endDate?: string; operationsShare?: string; vehicleShare?: string } = changes

    if (blockChanges.endDate) fireEvent.change(screen.getByLabelText('Dağıtım bitiş tarihi'), { target: { value: blockChanges.endDate } })
    if (blockChanges.operationsShare) fireEvent.change(screen.getByLabelText('Operasyon ortağı yüzdesi'), { target: { value: blockChanges.operationsShare } })
    if (blockChanges.vehicleShare) fireEvent.change(screen.getByLabelText('Araç sahibi yüzdesi'), { target: { value: blockChanges.vehicleShare } })

    expect(screen.getByRole('alert')).toHaveTextContent(message)
    expect(screen.getByRole('button', { name: 'Kârı dağıt' })).toBeDisabled()
  })

  test('blocks a nonpositive EUR result', () => {
    renderSection({
      bookings: [bookingFixture({
        daily_rate_eur: 0,
        price_eur: 0,
        chauffeur_hire_days: [{
          ...(bookingFixture().chauffeur_hire_days?.[0]!),
          profit_before_ads_eur: 0,
        }],
      })],
    })

    expect(screen.getByRole('alert')).toHaveTextContent('Net kâr oluşmadığı için bu dönem henüz dağıtılamaz.')
    expect(screen.getByRole('button', { name: 'Kârı dağıt' })).toBeDisabled()
  })

  test.each([
    ['unresolved route', bookingFixture({
      trip_type: 'one_way',
      pickup_location: 'private_address',
      dropoff_location: 'airport',
      chauffeur_hire_days: [],
    })],
    ['missing daily profit', bookingFixture({
      chauffeur_hire_days: [{
        ...(bookingFixture().chauffeur_hire_days?.[0]!),
        profit_before_ads_eur: null,
      }],
    })],
    ['invalid supplier source', bookingFixture({
      trip_type: 'one_way',
      pickup_location: 'airport',
      dropoff_location: 'side',
      chauffeur_hire_days: [],
      service_cost_mode: 'sold_transfer',
      sold_transfer_cost_try: null,
    })],
  ])('blocks distribution for %s without listing the leg in a card', (_name, booking) => {
    renderSection({ bookings: [booking] })

    // Eksik bilgi artık burada değil, seyahat listesindeki vurgulu satırda görünür.
    expect(screen.getByRole('button', { name: 'Kârı dağıt' })).toBeDisabled()
    expect(screen.queryByRole('alert')).toBeNull()
    expect(screen.queryByRole('button', { name: 'Seyahate git' })).toBeNull()
    expect(screen.queryByRole('button', { name: 'Listede aç' })).toBeNull()
    expect(screen.queryByRole('button', { name: 'Kâr/maliyet gir' })).toBeNull()
  })

  test('still shows distribution-wide messages that no trip row can carry', () => {
    renderSection({ bookings: [bookingFixture({ price_eur: 0, own_vehicle_profit_eur: 0 })] })

    fireEvent.change(screen.getByLabelText('Operasyon ortağı yüzdesi'), { target: { value: '60' } })
    fireEvent.change(screen.getByLabelText('Araç sahibi yüzdesi'), { target: { value: '10' } })

    expect(screen.getByRole('alert')).toHaveTextContent('Payların toplamı %100 olmalıdır.')
    expect(screen.getByRole('button', { name: 'Kârı dağıt' })).toBeDisabled()
  })

  test('prices the preview with the same per-date rates the confirmation uses', () => {
    const bookings = [bookingFixture({
      trip_type: 'one_way',
      pickup_location: 'airport',
      dropoff_location: 'side',
      chauffeur_hire_days: [],
      price_eur: 100,
      daily_rate_eur: null,
      own_vehicle_profit_eur: 50,
    })]
    renderSection({ bookings, ratesByDate: new Map([['2026-08-10', 40]]) })

    // Aylık kur 50 ₺ olsa da tarihe özel 40 ₺ kullanılır: 100 € geliri 4.000 ₺ olur.
    expect(screen.getByText('Gelir').parentElement).toHaveTextContent('₺4.000,00')
  })
})

describe('ProfitDistributionSection history and loading states', () => {
  test('shows a loading status and a retryable external error', () => {
    const onRetry = vi.fn()
    const { rerender, props } = renderSection({ loading: true, bookings: [], shareSettings: null, onRetry })

    expect(screen.getByRole('status')).toHaveTextContent('Kâr paylaşımı yükleniyor…')

    rerender(<ProfitDistributionSection {...props} loading={false} error="Kayıtlar alınamadı." />)
    expect(screen.getByRole('alert')).toHaveTextContent('Kayıtlar alınamadı.')
    fireEvent.click(screen.getByRole('button', { name: 'Tekrar dene' }))
    expect(onRetry).toHaveBeenCalledTimes(1)
  })
})
