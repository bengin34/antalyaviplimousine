import { allocateMoneyAmounts, usesLegacyCostSplit } from './profit-loss-metrics.js'

// Gidiş-dönüş tek kayıttır. Ayaklardan biri kaldırıldığında kayıt, kalan
// ayağı anlatan tek yönlü bir rezervasyona çevrilir. Kalan ayağın kâr/zarar
// defterindeki geliri, maliyeti ve elle girilmiş değerleri değişmemelidir;
// bu yüzden fiyat ve eski kayıtlardaki ortak maliyet, defterin ayaklara
// bölüştürdüğü kuruşlarla aynı şekilde bölünür.

const CLEARED_RETURN_FIELDS = Object.freeze({
  return_date: null,
  return_pickup_time: null,
  return_flight_number: null,
  return_flight_departure_time: null,
  return_service_cost_mode: null,
  return_sold_transfer_cost_try: null,
  return_own_vehicle_profit_eur: null,
  return_revenue_eur: null,
  return_meet_fee_override: null,
  manual_return_distance_km: null,
})

/**
 * `leg` kaldırılacak ayaktır ('outbound' | 'return'). Dönen nesne, kaydı
 * kalan ayağın tek yönlü hâline getiren güncelleme yüküdür.
 */
export function removeRoundTripLegPayload(booking, leg) {
  if (booking?.trip_type !== 'round_trip' || !booking.return_date) {
    throw new Error('Yalnızca gidiş-dönüş rezervasyonunun bir ayağı kaldırılabilir.')
  }
  const [outboundPrice, returnPrice] = allocateMoneyAmounts(booking.price_eur, 2)
  // Eski kayıtlarda (dönüş maliyet modu boş) iki ayak gidişin maliyet
  // alanlarını paylaşır ve tutar ikiye bölünür.
  const legacySplit = usesLegacyCostSplit(booking)
  const [outboundLegacyCost, returnLegacyCost] = legacySplit && booking.service_cost_mode === 'sold_transfer'
    ? allocateMoneyAmounts(booking.sold_transfer_cost_try, 2)
    : [null, null]

  if (leg === 'return') {
    return {
      trip_type: 'one_way',
      price_eur: outboundPrice,
      ...(outboundLegacyCost !== null ? { sold_transfer_cost_try: outboundLegacyCost } : {}),
      ...CLEARED_RETURN_FIELDS,
    }
  }
  if (leg !== 'outbound') throw new Error(`Bilinmeyen ayak: ${leg}`)

  const costMode = legacySplit ? booking.service_cost_mode : booking.return_service_cost_mode
  return {
    trip_type: 'one_way',
    price_eur: returnPrice,
    // Dönüş, gidişin ters yönüdür.
    pickup_location: booking.dropoff_location,
    pickup_address: booking.dropoff_address ?? null,
    dropoff_location: booking.pickup_location,
    dropoff_address: booking.pickup_address ?? null,
    pickup_date: booking.return_date,
    pickup_time: booking.return_pickup_time ?? null,
    flight_number: booking.return_flight_number ?? null,
    flight_arrival_time: null,
    flight_verification_status: null,
    flight_scheduled_arrival: null,
    service_cost_mode: costMode,
    sold_transfer_cost_try: costMode === 'sold_transfer'
      ? (legacySplit ? returnLegacyCost : booking.return_sold_transfer_cost_try)
      : null,
    own_vehicle_profit_eur: booking.return_own_vehicle_profit_eur ?? null,
    revenue_eur: booking.return_revenue_eur ?? null,
    meet_fee_override: booking.return_meet_fee_override ?? null,
    manual_outbound_distance_km: booking.manual_return_distance_km ?? null,
    // Gidiş yapılmışsa kayıt "tamamlandı" duruyordur; kalan tek ayak henüz
    // yapılmadı.
    ...(booking.status === 'completed' || booking.status === 'in_transit' ? { status: 'confirmed' } : {}),
    ...CLEARED_RETURN_FIELDS,
  }
}
