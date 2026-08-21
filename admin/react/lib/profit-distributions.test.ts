import { beforeEach, describe, expect, test, vi } from 'vitest'
import type {
  CreateProfitDistributionInput,
  ProfitDistribution,
  ProfitDistributionSnapshot,
  ProfitShareSettings,
  SaveProfitShareSettingsInput,
} from '../types'

const mocks = vi.hoisted(() => ({
  from: vi.fn(),
  rpc: vi.fn(),
}))

vi.mock('./supabase', () => ({
  supabase: {
    from: mocks.from,
    rpc: mocks.rpc,
  },
}))

import {
  createProfitDistribution,
  fetchProfitDistributionLedger,
  profitDistributionErrorMessage,
  saveProfitShareSettings,
} from './profit-distributions'

const snapshot: ProfitDistributionSnapshot = {
  schema_version: 1,
  period_start: '2026-08-01',
  period_end: '2026-08-20',
  operations_share_pct: 50,
  vehicle_owner_share_pct: 50,
  operations_amount_eur: 450,
  vehicle_owner_amount_eur: 450,
  operations_amount_try: 18_000,
  vehicle_owner_amount_try: 18_000,
  income_eur: 1_000,
  income_try: 40_000,
  vehicle_cost_eur: 25,
  vehicle_cost_try: 1_000,
  supplier_cost_eur: 25,
  supplier_cost_try: 1_000,
  airport_cost_eur: 25,
  airport_cost_try: 1_000,
  advertising_cost_eur: 25,
  advertising_cost_try: 1_000,
  total_expense_eur: 100,
  total_expense_try: 4_000,
  net_profit_eur: 900,
  net_profit_try: 36_000,
  realized_leg_count: 2,
  resolved_legs: [{ bookingId: 'booking-1' }, { bookingId: 'booking-2' }],
  monthly_settings: {
    '2026-08': { km_cost_try: 15, advertising_expense_try: 1_000, eur_try_rate: 40 },
  },
}

const settingsFixture: ProfitShareSettings = {
  id: 1,
  opening_date: '2026-08-01',
  default_operations_share_pct: '50.00',
  default_vehicle_owner_share_pct: '50.00',
  created_at: '2026-08-01T08:00:00.000Z',
  updated_at: '2026-08-01T08:00:00.000Z',
}

function distributionFixture(overrides: Partial<ProfitDistribution> = {}): ProfitDistribution {
  return {
    id: 'distribution-1',
    period_start: '2026-08-01',
    period_end: '2026-08-20',
    operations_share_pct: '50.00',
    vehicle_owner_share_pct: '50.00',
    operations_amount_eur: '450.00',
    vehicle_owner_amount_eur: '450.00',
    operations_amount_try: '18000.00',
    vehicle_owner_amount_try: '18000.00',
    income_eur: '1000.00',
    income_try: '40000.00',
    vehicle_cost_eur: '25.00',
    vehicle_cost_try: '1000.00',
    supplier_cost_eur: '25.00',
    supplier_cost_try: '1000.00',
    airport_cost_eur: '25.00',
    airport_cost_try: '1000.00',
    advertising_cost_eur: '25.00',
    advertising_cost_try: '1000.00',
    total_expense_eur: '100.00',
    total_expense_try: '4000.00',
    net_profit_eur: '900.00',
    net_profit_try: '36000.00',
    realized_leg_count: 2,
    calculation_snapshot: snapshot,
    created_by: '11111111-1111-4111-8111-111111111111',
    created_at: '2026-08-21T08:00:00.000Z',
    ...overrides,
  }
}

function deferred<T>() {
  let resolve!: (value: T) => void
  const promise = new Promise<T>(next => { resolve = next })
  return { promise, resolve }
}

describe('profit distribution data access', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  test('loads singleton settings and newest-first history concurrently', async () => {
    const newest = distributionFixture()
    const oldest = distributionFixture({
      id: 'distribution-0',
      period_start: '2026-07-01',
      period_end: '2026-07-31',
    })
    const settingsResponse = deferred<{ data: ProfitShareSettings; error: null }>()
    const distributionsResponse = deferred<{ data: ProfitDistribution[]; error: null }>()
    const maybeSingle = vi.fn(() => settingsResponse.promise)
    const order = vi.fn(() => distributionsResponse.promise)
    const settingsSelect = vi.fn(() => ({ maybeSingle }))
    const distributionsSelect = vi.fn(() => ({ order }))

    mocks.from.mockImplementation((table: string) => ({
      select: table === 'profit_share_settings' ? settingsSelect : distributionsSelect,
    }))

    const resultPromise = fetchProfitDistributionLedger()

    expect(mocks.from).toHaveBeenNthCalledWith(1, 'profit_share_settings')
    expect(mocks.from).toHaveBeenNthCalledWith(2, 'profit_distributions')
    expect(settingsSelect).toHaveBeenCalledWith('*')
    expect(distributionsSelect).toHaveBeenCalledWith('*')
    expect(maybeSingle).toHaveBeenCalledOnce()
    expect(order).toHaveBeenCalledWith('period_end', { ascending: false })

    settingsResponse.resolve({ data: settingsFixture, error: null })
    distributionsResponse.resolve({ data: [newest, oldest], error: null })

    await expect(resultPromise).resolves.toEqual({
      settings: settingsFixture,
      distributions: [newest, oldest],
    })
  })

  test.each([
    ['settings', new Error('settings read failed')],
    ['distributions', new Error('distribution read failed')],
  ])('throws the %s read error', async (failedQuery, expectedError) => {
    const maybeSingle = vi.fn().mockResolvedValue({
      data: settingsFixture,
      error: failedQuery === 'settings' ? expectedError : null,
    })
    const order = vi.fn().mockResolvedValue({
      data: [distributionFixture()],
      error: failedQuery === 'distributions' ? expectedError : null,
    })
    mocks.from.mockImplementation((table: string) => ({
      select: vi.fn(() => table === 'profit_share_settings' ? { maybeSingle } : { order }),
    }))

    await expect(fetchProfitDistributionLedger()).rejects.toBe(expectedError)
  })

  test('saves profit-share settings through the named RPC and returns its row', async () => {
    const single = vi.fn().mockResolvedValue({ data: settingsFixture, error: null })
    mocks.rpc.mockReturnValue({ single })
    const input: SaveProfitShareSettingsInput = {
      openingDate: '2026-08-01',
      operationsSharePct: 55,
      vehicleOwnerSharePct: 45,
    }

    await expect(saveProfitShareSettings(input)).resolves.toBe(settingsFixture)
    expect(mocks.rpc).toHaveBeenCalledWith('set_profit_share_settings', {
      p_opening_date: '2026-08-01',
      p_default_operations_share_pct: 55,
      p_default_vehicle_owner_share_pct: 45,
    })
    expect(single).toHaveBeenCalledOnce()
  })

  test('sends the expected start and immutable snapshot through the create RPC', async () => {
    const distribution = distributionFixture()
    const single = vi.fn().mockResolvedValue({ data: distribution, error: null })
    mocks.rpc.mockReturnValue({ single })
    const input: CreateProfitDistributionInput = {
      expectedStart: '2026-08-01',
      periodEnd: '2026-08-20',
      operationsSharePct: 50,
      vehicleOwnerSharePct: 50,
      snapshot,
    }

    await expect(createProfitDistribution(input)).resolves.toBe(distribution)
    expect(mocks.rpc).toHaveBeenCalledWith('create_profit_distribution', {
      p_expected_start: '2026-08-01',
      p_period_end: '2026-08-20',
      p_operations_share_pct: 50,
      p_vehicle_owner_share_pct: 50,
      p_snapshot: snapshot,
    })
    expect(single).toHaveBeenCalledOnce()
  })

  test.each([
    ['save', saveProfitShareSettings, {
      openingDate: '2026-08-01', operationsSharePct: 50, vehicleOwnerSharePct: 50,
    }],
    ['create', createProfitDistribution, {
      expectedStart: '2026-08-01', periodEnd: '2026-08-20',
      operationsSharePct: 50, vehicleOwnerSharePct: 50, snapshot,
    }],
  ])('throws an RPC failure from %s', async (_name, operation, input) => {
    const expectedError = new Error('rpc failed')
    mocks.rpc.mockReturnValue({
      single: vi.fn().mockResolvedValue({ data: null, error: expectedError }),
    })

    await expect(operation(input as never)).rejects.toBe(expectedError)
  })
})

describe('profitDistributionErrorMessage', () => {
  test.each([
    [
      { message: 'Distribution start is stale or not contiguous', code: 'P0001' },
      'Dağıtım dönemi güncelliğini yitirdi. Verileri yenileyip tekrar deneyin.',
    ],
    [
      { message: 'conflicting period', code: '23P01' },
      'Dağıtım dönemi güncelliğini yitirdi. Verileri yenileyip tekrar deneyin.',
    ],
    [
      { message: 'Distribution end must be on or after its start', code: 'P0001' },
      'Bitiş tarihi başlangıç tarihinden önce olamaz.',
    ],
    [
      { message: 'Only closed Berlin calendar days can be distributed', code: 'P0001' },
      'Yalnızca tamamlanmış günler için dağıtım yapılabilir.',
    ],
    [
      { message: 'Opening date cannot change after the first distribution', code: 'P0001' },
      'İlk dağıtımdan sonra başlangıç tarihi değiştirilemez.',
    ],
    [
      { message: 'Malformed profit distribution snapshot', code: 'P0001' },
      'Hesap özeti doğrulanamadı. Verileri yenileyip tekrar deneyin.',
    ],
    [
      { message: 'Profit distribution snapshot does not reconcile', code: 'P0001' },
      'Hesap özeti doğrulanamadı. Verileri yenileyip tekrar deneyin.',
    ],
    [
      { message: 'permission denied for table profit_distributions', code: '42501' },
      'Bu işlem için yetkiniz yok. Lütfen yeniden giriş yapın.',
    ],
    [
      new TypeError('Failed to fetch'),
      'Bağlantı kurulamadı. İnternet bağlantınızı kontrol edip tekrar deneyin.',
    ],
    [
      { message: 'duplicate key value violates unique constraint internal_name', code: '23505' },
      'İşlem tamamlanamadı. Lütfen tekrar deneyin.',
    ],
  ])('maps %# into safe Turkish copy', (error, expected) => {
    expect(profitDistributionErrorMessage(error)).toBe(expected)
  })
})
