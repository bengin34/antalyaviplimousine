const LOCATION_LABELS = {
  airport: 'Antalya Havalimanı',
  hotel: 'Otel',
  private_address: 'Özel adres',
  antalya: 'Antalya',
  belek: 'Belek',
  side: 'Side',
  kemer: 'Kemer',
  alanya: 'Alanya',
  bogazkent: 'Boğazkent',
  manavgat: 'Manavgat',
  kizilagac: 'Kızılağaç',
  tekirova: 'Tekirova',
  bodrum: 'Bodrum',
  dalaman: 'Dalaman',
  fethiye: 'Fethiye',
  pamukkale: 'Pamukkale',
  kapadokya: 'Kapadokya',
}

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
    apple: `https://maps.apple.com/?saddr=${encodedOrigin}&daddr=${encodedDestination}&dirflg=d`,
  }
}

export function whatsappURL(phone) {
  let digits = String(phone ?? '').replace(/\D/g, '')
  if (digits.startsWith('00')) digits = digits.slice(2)
  if (digits.startsWith('0')) digits = `90${digits.slice(1)}`
  if (/^5\d{9}$/.test(digits)) digits = `90${digits}`

  return `https://wa.me/${digits}`
}
