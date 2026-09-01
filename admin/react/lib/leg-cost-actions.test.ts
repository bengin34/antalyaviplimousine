import { beforeEach, describe, expect, test, vi } from 'vitest'

const single = vi.fn()
const select = vi.fn(() => ({ single }))
const eq = vi.fn(() => ({ select }))
const update = vi.fn(() => ({ eq }))

// SUT (leg-cost-actions.ts, same dir) imports './supabase' — mock that specifier.
vi.mock('./supabase', () => ({ supabase: { from: () => ({ update }) } }))

import { saveLegDistance, saveLegSupplierCost, saveLegCostMode, saveLegMeetFee } from './leg-cost-actions'

beforeEach(() => {
  vi.clearAllMocks()
})

describe('saveLegDistance', () => {
  test('updates the return column and returns the patch', async () => {
    single.mockResolvedValue({ data: { id: 'b1', manual_return_distance_km: 42 }, error: null })
    const patch = await saveLegDistance('b1', 'return', 42)
    expect(update).toHaveBeenCalledWith({ manual_return_distance_km: 42 })
    expect(eq).toHaveBeenCalledWith('id', 'b1')
    expect(patch).toEqual({ manual_return_distance_km: 42 })
  })

  test('updates the outbound column', async () => {
    single.mockResolvedValue({ data: { id: 'b1', manual_outbound_distance_km: 10 }, error: null })
    const patch = await saveLegDistance('b1', 'outbound', 10)
    expect(update).toHaveBeenCalledWith({ manual_outbound_distance_km: 10 })
    expect(patch).toEqual({ manual_outbound_distance_km: 10 })
  })

  test('throws on error', async () => {
    single.mockResolvedValue({ data: null, error: new Error('boom') })
    await expect(saveLegDistance('b1', 'return', 42)).rejects.toThrow('boom')
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
