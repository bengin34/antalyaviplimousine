import { beforeEach, describe, expect, test, vi } from 'vitest'

const single = vi.fn()
const select = vi.fn(() => ({ single }))
const eq = vi.fn(() => ({ select }))
const update = vi.fn(() => ({ eq }))

// SUT (leg-cost-actions.ts, same dir) imports './supabase' — mock that specifier.
vi.mock('./supabase', () => ({ supabase: { from: () => ({ update }) } }))

import { saveLegOwnVehicleProfit, saveLegSupplierCost, saveLegCostMode, saveLegMeetFee, saveLegMeetFeeOverride, saveLegRevenue, saveParkingHours } from './leg-cost-actions'

beforeEach(() => {
  vi.clearAllMocks()
})

describe('saveLegOwnVehicleProfit', () => {
  test('updates the return column and returns the patch', async () => {
    single.mockResolvedValue({ data: { id: 'b1', return_own_vehicle_profit_eur: 42, return_service_cost_mode: 'own_vehicle', return_sold_transfer_cost_try: null }, error: null })
    const patch = await saveLegOwnVehicleProfit('b1', 'return', 42)
    // Kâr girmek ayağı kendi aracımıza çevirir; kalan tedarikçi maliyeti silinir.
    expect(update).toHaveBeenCalledWith({ return_own_vehicle_profit_eur: 42, return_service_cost_mode: 'own_vehicle', return_sold_transfer_cost_try: null })
    expect(eq).toHaveBeenCalledWith('id', 'b1')
    expect(patch).toEqual({ return_own_vehicle_profit_eur: 42, return_service_cost_mode: 'own_vehicle', return_sold_transfer_cost_try: null })
  })

  test('updates the outbound column', async () => {
    single.mockResolvedValue({ data: { id: 'b1', own_vehicle_profit_eur: 10, service_cost_mode: 'own_vehicle', sold_transfer_cost_try: null }, error: null })
    const patch = await saveLegOwnVehicleProfit('b1', 'outbound', 10)
    expect(update).toHaveBeenCalledWith({ own_vehicle_profit_eur: 10, service_cost_mode: 'own_vehicle', sold_transfer_cost_try: null })
    expect(patch).toEqual({ own_vehicle_profit_eur: 10, service_cost_mode: 'own_vehicle', sold_transfer_cost_try: null })
  })

  test('accepts a negative profit (a loss trip)', async () => {
    single.mockResolvedValue({ data: { id: 'b1', own_vehicle_profit_eur: -50, service_cost_mode: 'own_vehicle', sold_transfer_cost_try: null }, error: null })
    const patch = await saveLegOwnVehicleProfit('b1', 'outbound', -50)
    expect(update).toHaveBeenCalledWith({ own_vehicle_profit_eur: -50, service_cost_mode: 'own_vehicle', sold_transfer_cost_try: null })
    expect(patch).toEqual({ own_vehicle_profit_eur: -50, service_cost_mode: 'own_vehicle', sold_transfer_cost_try: null })
  })

  test('throws on error', async () => {
    single.mockResolvedValue({ data: null, error: new Error('boom') })
    await expect(saveLegOwnVehicleProfit('b1', 'return', 42)).rejects.toThrow('boom')
  })
})

describe('saveParkingHours', () => {
  test('updates airport_meet_fee_parking_hours and returns the patch', async () => {
    single.mockResolvedValue({ data: { id: 'b1', airport_meet_fee_parking_hours: 3 }, error: null })
    const patch = await saveParkingHours('b1', 3)
    expect(update).toHaveBeenCalledWith({ airport_meet_fee_parking_hours: 3 })
    expect(eq).toHaveBeenCalledWith('id', 'b1')
    expect(patch).toEqual({ airport_meet_fee_parking_hours: 3 })
  })

  test('throws on error', async () => {
    single.mockResolvedValue({ data: null, error: new Error('parking fail') })
    await expect(saveParkingHours('b1', 2)).rejects.toThrow('parking fail')
  })
})

describe('saveLegSupplierCost', () => {
  test('updates cost + mode and returns the patch', async () => {
    single.mockResolvedValue({
      data: { id: 'b1', service_cost_mode: 'sold_transfer', sold_transfer_cost_try: 500 },
      error: null,
    })
    const patch = await saveLegSupplierCost('b1', 'outbound', 500)
    expect(update).toHaveBeenCalledWith({ sold_transfer_cost_try: 500, service_cost_mode: 'sold_transfer' })
    expect(patch).toEqual({ service_cost_mode: 'sold_transfer', sold_transfer_cost_try: 500 })
  })

  test('throws on error', async () => {
    single.mockResolvedValue({ data: null, error: new Error('cost fail') })
    await expect(saveLegSupplierCost('b1', 'outbound', 500)).rejects.toThrow('cost fail')
  })
})

describe('saveLegCostMode', () => {
  test('sold_transfer keeps cost untouched', async () => {
    single.mockResolvedValue({
      data: { id: 'b1', service_cost_mode: 'sold_transfer', sold_transfer_cost_try: 300 },
      error: null,
    })
    const patch = await saveLegCostMode('b1', 'outbound', 'sold_transfer')
    expect(update).toHaveBeenCalledWith({ service_cost_mode: 'sold_transfer' })
    expect(patch).toEqual({ service_cost_mode: 'sold_transfer', sold_transfer_cost_try: 300 })
  })

  test('non-sold mode nulls the cost', async () => {
    single.mockResolvedValue({
      data: { id: 'b1', service_cost_mode: 'own_vehicle', sold_transfer_cost_try: null },
      error: null,
    })
    const patch = await saveLegCostMode('b1', 'outbound', 'own_vehicle')
    expect(update).toHaveBeenCalledWith({ service_cost_mode: 'own_vehicle', sold_transfer_cost_try: null })
    expect(patch).toEqual({ service_cost_mode: 'own_vehicle', sold_transfer_cost_try: null })
  })

  test('throws on error', async () => {
    single.mockResolvedValue({ data: null, error: new Error('mode fail') })
    await expect(saveLegCostMode('b1', 'outbound', 'no_cost')).rejects.toThrow('mode fail')
  })
})

describe('saveLegMeetFee', () => {
  test('updates airport_meet_fee_applies and returns the patch', async () => {
    single.mockResolvedValue({ data: { id: 'b1', airport_meet_fee_applies: false }, error: null })
    const patch = await saveLegMeetFee('b1', false)
    expect(update).toHaveBeenCalledWith({ airport_meet_fee_applies: false })
    expect(eq).toHaveBeenCalledWith('id', 'b1')
    expect(patch).toEqual({ airport_meet_fee_applies: false })
  })

  test('throws on error', async () => {
    single.mockResolvedValue({ data: null, error: new Error('meet fail') })
    await expect(saveLegMeetFee('b1', true)).rejects.toThrow('meet fail')
  })
})

describe('saveLegRevenue', () => {
  test('tahsil edilen geliri ayağın kolonuna yazar', async () => {
    single.mockResolvedValue({ data: { id: 'b1', revenue_eur: 80 }, error: null })
    const patch = await saveLegRevenue('b1', 'outbound', 80)
    expect(update).toHaveBeenCalledWith({ revenue_eur: 80 })
    expect(patch).toEqual({ revenue_eur: 80 })
  })

  test('boşaltmak fiyat bölüşümüne döndürür', async () => {
    single.mockResolvedValue({ data: { id: 'b1', return_revenue_eur: null }, error: null })
    const patch = await saveLegRevenue('b1', 'return', null)
    expect(update).toHaveBeenCalledWith({ return_revenue_eur: null })
    expect(patch).toEqual({ return_revenue_eur: null })
  })
})

describe('saveLegMeetFeeOverride', () => {
  test('ayağa özel karşılama kararını yazar', async () => {
    single.mockResolvedValue({ data: { id: 'b1', meet_fee_override: true }, error: null })
    const patch = await saveLegMeetFeeOverride('b1', 'outbound', true)
    expect(update).toHaveBeenCalledWith({ meet_fee_override: true })
    expect(patch).toEqual({ meet_fee_override: true })
  })

  test('null yazmak konum kuralına döndürür', async () => {
    single.mockResolvedValue({ data: { id: 'b1', return_meet_fee_override: null }, error: null })
    const patch = await saveLegMeetFeeOverride('b1', 'return', null)
    expect(update).toHaveBeenCalledWith({ return_meet_fee_override: null })
    expect(patch).toEqual({ return_meet_fee_override: null })
  })
})
