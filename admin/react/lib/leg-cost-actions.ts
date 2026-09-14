import { supabase } from './supabase'
import { legCostColumns, type CostMode, type LegKey } from '../components/LegCostEditors'
import type { Booking } from '../types'

/** Ayağın manuel reklam-öncesi kâr sütunu (avro). */
function legOwnVehicleProfitColumn(leg: LegKey) {
  return leg === 'return' ? 'return_own_vehicle_profit_eur' as const : 'own_vehicle_profit_eur' as const
}

export async function saveLegOwnVehicleProfit(bookingId: string, leg: LegKey, profitEur: number): Promise<Partial<Booking>> {
  const column = legOwnVehicleProfitColumn(leg)
  const columns = legCostColumns(leg)
  // Kâr girmek modeli de belirler: operatör tabloda önce modeli seçmek zorunda
  // kalmasın diye maliyet/kâr yazılan ayak kendi aracımıza geçer.
  const { data, error } = await supabase.from('bookings')
    .update({ [column]: profitEur, [columns.mode]: 'own_vehicle', [columns.cost]: null })
    .eq('id', bookingId)
    .select(`id, ${column}, ${columns.mode}, ${columns.cost}`).single()
  if (error || !data) throw error ?? new Error('Kâr kaydı dönmedi')
  const saved = data as Record<string, unknown>
  return {
    [column]: Number(saved[column]),
    [columns.mode]: saved[columns.mode],
    [columns.cost]: saved[columns.cost],
  } as Partial<Booking>
}

export async function saveParkingHours(bookingId: string, hours: number): Promise<Partial<Booking>> {
  const { data, error } = await supabase.from('bookings')
    .update({ airport_meet_fee_parking_hours: hours })
    .eq('id', bookingId)
    .select('id, airport_meet_fee_parking_hours').single()
  if (error || !data) throw error ?? new Error('Otopark süresi kaydı dönmedi')
  return { airport_meet_fee_parking_hours: Number((data as Record<string, unknown>).airport_meet_fee_parking_hours) } as Partial<Booking>
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

/** Ayağın tahsil edilen gelir sütunu (avro); boş bırakılırsa fiyat bölüşümüne dönülür. */
function legRevenueColumn(leg: LegKey) {
  return leg === 'return' ? 'return_revenue_eur' as const : 'revenue_eur' as const
}

export async function saveLegRevenue(bookingId: string, leg: LegKey, revenueEur: number | null): Promise<Partial<Booking>> {
  const column = legRevenueColumn(leg)
  const { data, error } = await supabase.from('bookings')
    .update({ [column]: revenueEur })
    .eq('id', bookingId)
    .select(`id, ${column}`).single()
  if (error || !data) throw error ?? new Error('Gelir kaydı dönmedi')
  const saved = (data as Record<string, unknown>)[column]
  return { [column]: saved === null ? null : Number(saved) } as Partial<Booking>
}

/** Ayağın karşılama/otopark kararı: true karşılama, false otopark, null konum kuralı. */
function legMeetOverrideColumn(leg: LegKey) {
  return leg === 'return' ? 'return_meet_fee_override' as const : 'meet_fee_override' as const
}

export async function saveLegMeetFeeOverride(bookingId: string, leg: LegKey, applies: boolean | null): Promise<Partial<Booking>> {
  const column = legMeetOverrideColumn(leg)
  const { data, error } = await supabase.from('bookings')
    .update({ [column]: applies })
    .eq('id', bookingId)
    .select(`id, ${column}`).single()
  if (error || !data) throw error ?? new Error('Karşılama kaydı dönmedi')
  return { [column]: (data as Record<string, unknown>)[column] as boolean | null } as Partial<Booking>
}
