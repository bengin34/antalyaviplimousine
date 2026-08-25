import { turkishLocationNames as LOCATION_LABELS } from '../src/routes.js'

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
  const normalizedAddress = String(address ?? '').trim().replace(/\s+/g, ' ')
  if (normalizedAddress) return normalizedAddress

  const normalizedHotel = String(hotelName ?? '').trim().replace(/\s+/g, ' ')
  const hasHotel = normalizedHotel && normalizedHotel.toLocaleLowerCase('tr-TR') !== 'belirtilmedi'
  const location = String(value ?? '').trim().toLocaleLowerCase('tr-TR')

  if (location !== 'airport' && hasHotel) {
    return `${normalizedHotel}, ${locationLabel(value)}, Antalya, Türkiye`
  }

  if (location === 'airport') return 'Antalya Havalimanı, Antalya, Türkiye'
  return `${locationLabel(value)}, Antalya, Türkiye`
}

export function navigationURLs({
  originValue,
  originAddress,
  destinationValue,
  destinationAddress,
  hotelName = '',
}) {
  const originLocation = String(originValue ?? '').trim().toLocaleLowerCase('tr-TR')
  const destinationLocation = String(destinationValue ?? '').trim().toLocaleLowerCase('tr-TR')
  const originHotel = originLocation === 'hotel' || destinationLocation === 'airport'
    ? hotelName
    : ''
  const destinationHotel = destinationLocation !== 'airport' ? hotelName : ''
  const origin = navigationPoint(originValue, originAddress, originHotel)
  const destination = navigationPoint(destinationValue, destinationAddress, destinationHotel)
  const encodedOrigin = encodeURIComponent(origin)
  const encodedDestination = encodeURIComponent(destination)

  return {
    origin,
    destination,
    google: `https://www.google.com/maps/dir/?api=1&origin=${encodedOrigin}&destination=${encodedDestination}&travelmode=driving`,
  }
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
