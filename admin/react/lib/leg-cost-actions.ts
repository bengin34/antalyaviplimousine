import { supabase } from './supabase'
import { legCostColumns, type CostMode, type LegKey } from '../components/LegCostEditors'
import type { Booking } from '../types'

export async function saveLegDistance(bookingId: string, leg: LegKey, distanceKm: number): Promise<Partial<Booking>> {
  const column = leg === 'return' ? 'manual_return_distance_km' : 'manual_outbound_distance_km'
  const { data, error } = await supabase.from('bookings')
    .update({ [column]: distanceKm })
    .eq('id', bookingId)
    .select(`id, ${column}`).single()
  if (error || !data) throw error ?? new Error('KM kaydı dönmedi')
  return { [column]: Number((data as Record<string, unknown>)[column]) } as Partial<Booking>
}

export async function saveLegSupplierCost(bookingId: string, leg: LegKey, costTry: number): Promise<Partial<Booking>> {
  const columns = legCostColumns(leg)
  const { data, error } = await supabase.from('bookings')
    .update({ [columns.cost]: costTry, [columns.mode]: 'sold_transfer' })
    .eq('id', bookingId)
    .select(`id, ${columns.mode}, ${columns.cost}`).single()
  if (error || !data) throw error ?? new Error('Maliyet kaydı dönmedi')
  const saved = data as Record<string, unknown>
  return { [columns.mode]: saved[columns.mode], [columns.cost]: Number(saved[columns.cost]) } as Partial<Booking>
}

export async function saveLegCostMode(bookingId: string, leg: LegKey, nextMode: CostMode): Promise<Partial<Booking>> {
  const columns = legCostColumns(leg)
  const update: Record<string, unknown> = nextMode === 'sold_transfer'
    ? { [columns.mode]: nextMode }
    : { [columns.mode]: nextMode, [columns.cost]: null }
  const { data, error } = await supabase.from('bookings')
    .update(update)
    .eq('id', bookingId)
    .select(`id, ${columns.mode}, ${columns.cost}`).single()
  if (error || !data) throw error ?? new Error('Maliyet modeli kaydı dönmedi')
  const saved = data as Record<string, unknown>
  return { [columns.mode]: saved[columns.mode], [columns.cost]: saved[columns.cost] } as Partial<Booking>
}

export async function saveLegMeetFee(bookingId: string, applies: boolean): Promise<Partial<Booking>> {
  const { data, error } = await supabase.from('bookings')
    .update({ airport_meet_fee_applies: applies })
    .eq('id', bookingId)
    .select('id, airport_meet_fee_applies').single()
  if (error || !data) throw error ?? new Error('Karşılama ayarı dönmedi')
  return { airport_meet_fee_applies: (data as Record<string, unknown>).airport_meet_fee_applies as boolean } as Partial<Booking>
}
