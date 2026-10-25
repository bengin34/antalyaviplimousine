import { hotelToHotelUnitPrice } from '../_shared/hotel-to-hotel-pricing.js'

/** A `routes` row for one region, as the booking function selects it. */
export type RoutePriceRow = {
  to_location: string
  price_eur: number | string
}

/**
 * Varış bölgesinin satılan bir bölge olup olmadığı.
 *
 * Tanınmayan bir varış, operatörün elle fiyatlayacağı bir yolculuk değil,
 * bozuk bir istek: eski fiyat yolu da böyle bir istemciye 400 dönüyordu.
 */
export function hasTariffRow(rows: readonly RoutePriceRow[], region: string) {
  return rows.some((row) => row.to_location === region && Number(row.price_eur) > 0)
}

type RadialJourney = {
  pickupLocation: string
  dropoffLocation: string
  /** The pick-up hotel's region, when the index could place it; else "". */
  pickupHotelRegion: string
}

/**
 * Hangi bölgenin havalimanı tarifesi bu yolculuğu fiyatlar — fiyatlayacak bir
 * bölge yoksa "".
 *
 * Tarife havalimanından ölçülür, yani ücreti veren uç her zaman yolculuğun
 * otel ucudur; yön onu değiştirmez. Gelişte bu, misafirin listeden seçtiği
 * varış bölgesidir; gidişte alış otelinin bölgesi: AYT → otel ne ise
 * otel → AYT da odur. Otel indekste yoksa ya da yolculuk bir özel adrese
 * gidiyorsa ölçülecek bir şey yoktur ve fiyatı operatör verir.
 */
export function airportTariffRegion({
  pickupLocation,
  dropoffLocation,
  pickupHotelRegion,
}: RadialJourney) {
  if (dropoffLocation === 'private_address') return ''
  if (dropoffLocation !== 'airport') return dropoffLocation
  return pickupLocation === 'hotel' ? pickupHotelRegion : ''
}

type Journey = {
  pickupRegion: string
  dropoffRegion: string
  vehicleType: string
  isRoundTrip: boolean
}

/**
 * Otelden otele transferin kaydedilecek fiyatı (EUR), ya da elle teklif
 * gerekiyorsa null.
 *
 * Tarife `routes` tablosundan okunur, yani paneldeki bir fiyat güncellemesi bu
 * ücreti de hemen değiştirir; mesafeler `_shared` içindeki sabit haritadan
 * gelir. Hesabı yapan modül tarayıcıdaki teklifi de üretiyor, yani misafirin
 * gördüğü fiyat ile kayda yazılan fiyat aynı aritmetikten çıkar. Alış otelinin
 * bölgesi çözülemediyse (indekste olmayan bir otel) ölçecek bir yolculuk
 * yoktur; çağıran taraf kaydı beklemede bırakır ve fiyatı operatör verir.
 */
export function hotelToHotelPriceEur(
  rows: readonly RoutePriceRow[],
  { pickupRegion, dropoffRegion, vehicleType, isRoundTrip }: Journey,
): number | null {
  if (!pickupRegion || !dropoffRegion) return null

  const tariff: Record<string, number> = {}
  for (const row of rows) {
    const price = Number(row.price_eur)
    // Fiyatı okunamayan satır yok sayılır: ücreti sıfır bir tarifeyle değil,
    // elle vermek gerekir.
    if (price > 0) tariff[row.to_location] = price
  }

  const unitPrice = hotelToHotelUnitPrice({
    pickupRegion,
    dropoffRegion,
    vehicle: vehicleType === 'vclass' ? 'sprinter' : 'vito',
    tariffFor: (region: string) => tariff[region] ?? null,
  })
  return unitPrice === null ? null : unitPrice * (isRoundTrip ? 2 : 1)
}
