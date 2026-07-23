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

export function whatsappURL(phone) {
  let digits = String(phone ?? '').replace(/\D/g, '')
  if (digits.startsWith('00')) digits = digits.slice(2)
  if (digits.startsWith('0')) digits = `90${digits.slice(1)}`
  if (/^5\d{9}$/.test(digits)) digits = `90${digits}`

  return `https://wa.me/${digits}`
}
