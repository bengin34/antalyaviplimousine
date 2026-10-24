import { DEFAULT_PROVINCE, provinceByRegion, turkishLocationNames as LOCATION_LABELS } from '../src/routes.js'
import { LAND_OF_LEGENDS_PARK_ADDRESS } from '../src/land-of-legends.js'

const ISTANBUL_TIME_ZONE = 'Europe/Istanbul'

export function locationLabel(value) {
  const raw = String(value ?? '').trim()
  if (!raw) return '—'

  const key = raw.toLocaleLowerCase('tr-TR')
  if (LOCATION_LABELS[key]) return LOCATION_LABELS[key]

  const readable = raw.replaceAll('_', ' ').replaceAll('-', ' ')
  return readable.charAt(0).toLocaleUpperCase('tr-TR') + readable.slice(1)
}

export function locationDisplay(value, address) {
  const normalizedAddress = String(address ?? '').trim().replace(/\s+/g, ' ')
  if (String(value ?? '').trim().toLocaleLowerCase('tr-TR') === 'private_address' && normalizedAddress) {
    return normalizedAddress
  }
  return locationLabel(value)
}

export function navigationPoint(value, address, hotelName = '') {
  // The park is a fixed place: never the guest's hotel name in front of it.
  if (String(value ?? '').trim().toLocaleLowerCase('tr-TR') === 'land_of_legends') return LAND_OF_LEGENDS_PARK_ADDRESS

  const normalizedAddress = String(address ?? '').trim().replace(/\s+/g, ' ')
  if (normalizedAddress) return normalizedAddress

  const normalizedHotel = String(hotelName ?? '').trim().replace(/\s+/g, ' ')
  const hasHotel = normalizedHotel && normalizedHotel.toLocaleLowerCase('tr-TR') !== 'belirtilmedi'
  const location = String(value ?? '').trim().toLocaleLowerCase('tr-TR')
  // Bolgelerin cogu Antalya'dadir ama hepsi degil: Bodrum'u "Antalya" diye
  // aratmak soforu yanlis ile gonderir ya da hic sonuc dondurmez.
  const province = provinceByRegion[location] ?? DEFAULT_PROVINCE

  if (location !== 'airport' && hasHotel) {
    return `${normalizedHotel}, ${locationLabel(value)}, ${province}, Türkiye`
  }

  if (location === 'airport') return `Antalya Havalimanı, ${DEFAULT_PROVINCE}, Türkiye`
  return `${locationLabel(value)}, ${province}, Türkiye`
}

const normalizeLocation = (value) => String(value ?? '').trim().toLocaleLowerCase('tr-TR')

/**
 * Bu uçta misafirin konakladığı bir yer var mı? Havalimanı, özel adres ve park
 * otel değildir; geri kalan her şey oteldir — hem sitenin gönderdiği `hotel`
 * değeri hem de panelin konum listesinden seçilebilen bölge slug'ları
 * (`belek`, `side`...). Bölge slug'ını otel saymamak, tek otel adının yanlış
 * uca yazılması demekti.
 */
const isHotelEnd = (location) =>
  Boolean(location) && !['airport', 'private_address', 'land_of_legends'].includes(location)

/** İki ucu da otel olan, yani varış otelinin kendi adını gerektiren seyahat. */
export function isHotelToHotelJourney(pickupLocation, dropoffLocation) {
  return isHotelEnd(normalizeLocation(pickupLocation)) && isHotelEnd(normalizeLocation(dropoffLocation))
}

/**
 * Kaydın otel adlarını uçlara bağlar.
 *
 * Kayıt tek bir `hotel_name` taşır: misafirin oteli. Hangi uca ait olduğu
 * yöne göre değişir — otelden alışta ya da havalimanına gidişte alış ucuna,
 * diğer hâllerde varış ucuna. Otelden otele transferde varış otelinin kendi
 * adı (`dropoff_hotel_name`) vardır; tek ad asla iki uca da yazılmaz, yoksa
 * şoför alış otelinin adını varış bölgesinde arar.
 *
 * Konumlar kayıtta gidiş yönünde saklanır: dönüş bacağında çağıran taraf
 * konumlarla birlikte bu iki adı da takas eder.
 */
export function bookingHotelEnds(booking) {
  const pickup = normalizeLocation(booking?.pickup_location)
  const dropoff = normalizeLocation(booking?.dropoff_location)
  const guestHotel = String(booking?.hotel_name ?? '')
  const dropoffHotel = String(booking?.dropoff_hotel_name ?? '')
  // Havalimanına gidiş alış ucunu otel yapar: konumu boş kalmış eski kayıtlar
  // da misafirin otelini alış ucunda göstermeye devam etsin.
  const guestHotelAtPickup = dropoff === 'airport' || isHotelEnd(pickup)
  return {
    pickupHotel: guestHotelAtPickup ? guestHotel : '',
    dropoffHotel: dropoffHotel || (guestHotelAtPickup ? '' : guestHotel),
  }
}

export function navigationURLs({
  originValue,
  originAddress,
  destinationValue,
  destinationAddress,
  originHotelName = '',
  destinationHotelName = '',
}) {
  const origin = navigationPoint(originValue, originAddress, originHotelName)
  const destination = navigationPoint(destinationValue, destinationAddress, destinationHotelName)
  const encodedOrigin = encodeURIComponent(origin)
  const encodedDestination = encodeURIComponent(destination)

  return {
    origin,
    destination,
    google: `https://www.google.com/maps/dir/?api=1&origin=${encodedOrigin}&destination=${encodedDestination}&travelmode=driving`,
  }
}

/**
 * Kayıt müşterinin dönüş seyahati mi? İki durum vardır: gidiş-dönüş
 * rezervasyonunun dönüş bacağı (`_isReturn`, `expandRoundTrips` kartları) ve
 * ayrı bir kayıt olarak açılmış dönüş (`manual_return_of_ref`). İkincisinin
 * konumları kendi yönünde saklanır; bu yüzden bu yordam yalnızca etiketleme ve
 * vurgu içindir, bacak yönü için `_isReturn` okunmalıdır.
 */
export function isReturnJourney(card) {
  return card?._isReturn === true || Boolean(card?.manual_return_of_ref)
}

export function isFutureIstanbulLeg(date, time, now = new Date()) {
  const normalizedDate = String(date ?? '').trim()
  if (!/^\d{4}-\d{2}-\d{2}$/.test(normalizedDate)) return false

  const currentDate = new Intl.DateTimeFormat('sv', {
    timeZone: ISTANBUL_TIME_ZONE,
  }).format(now)
  if (normalizedDate !== currentDate) return normalizedDate > currentDate

  const normalizedTime = String(time ?? '').trim().slice(0, 5)
  if (!/^([01]\d|2[0-3]):[0-5]\d$/.test(normalizedTime)) return true

  const currentTime = new Intl.DateTimeFormat('en-GB', {
    timeZone: ISTANBUL_TIME_ZONE,
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).format(now)
  return normalizedTime > currentTime
}

// Calling codes mapped to a language WhatsApp templates are translated into
// (see admin/whatsapp-templates.js). Sorted longest-prefix-first so e.g. '971'
// (UAE) is matched before a shorter unrelated prefix would be.
const LANGUAGE_BY_CALLING_CODE = [
  ['966', 'ar'], ['971', 'ar'], ['974', 'ar'], ['973', 'ar'], ['968', 'ar'],
  ['965', 'ar'], ['962', 'ar'], ['961', 'ar'], ['963', 'ar'], ['964', 'ar'],
  ['970', 'ar'], ['212', 'ar'], ['216', 'ar'], ['213', 'ar'], ['218', 'ar'],
  ['249', 'ar'], ['380', 'ru'], ['375', 'ru'], ['90', 'tr'], ['49', 'de'],
  ['43', 'de'], ['41', 'de'], ['33', 'fr'], ['32', 'fr'], ['20', 'ar'],
  ['7', 'ru'],
].sort((a, b) => b[0].length - a[0].length)

export function languageFromPhone(phone) {
  let digits = String(phone ?? '').replace(/\D/g, '')
  if (!digits) return 'en'
  if (digits.startsWith('00')) digits = digits.slice(2)
  if (digits.startsWith('0')) return 'tr'
  if (/^5\d{9}$/.test(digits)) return 'tr'

  const match = LANGUAGE_BY_CALLING_CODE.find(([code]) => digits.startsWith(code))
  return match ? match[1] : 'en'
}

export function whatsappURL(phone, text) {
  let digits = String(phone ?? '').replace(/\D/g, '')
  if (digits.startsWith('00')) digits = digits.slice(2)
  if (digits.startsWith('0')) digits = `90${digits.slice(1)}`
  if (/^5\d{9}$/.test(digits)) digits = `90${digits}`

  const base = `https://wa.me/${digits}`
  return text ? `${base}?text=${encodeURIComponent(text)}` : base
}
