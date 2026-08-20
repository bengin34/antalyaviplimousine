export const ISTANBUL_TIME_ZONE = 'Europe/Istanbul'

export function todayISO() {
  return new Intl.DateTimeFormat('sv', { timeZone: ISTANBUL_TIME_ZONE }).format(new Date())
}

export function offsetISO(days: number) {
  const date = new Date(Date.now() + days * 86_400_000)
  return new Intl.DateTimeFormat('sv', { timeZone: ISTANBUL_TIME_ZONE }).format(date)
}

export function fmtTime(value?: string | null) {
  return value ? value.slice(0, 5) : '—'
}

export function fmtPrice(value: unknown) {
  return new Intl.NumberFormat('tr-TR', { maximumFractionDigits: 2 }).format(Number(value) || 0)
}

export function formatEuro(value: unknown) {
  return new Intl.NumberFormat('tr-TR', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 2,
  }).format(Number(value) || 0)
}

export function formatTry(value: unknown) {
  return new Intl.NumberFormat('tr-TR', {
    style: 'currency',
    currency: 'TRY',
    maximumFractionDigits: 2,
  }).format(Number(value) || 0)
}

export function formatNumber(value: unknown, maximumFractionDigits = 0) {
  return new Intl.NumberFormat('tr-TR', { maximumFractionDigits }).format(Number(value) || 0)
}

export function fmtSyncTime(value = new Date()) {
  return new Intl.DateTimeFormat('tr-TR', {
    timeZone: ISTANBUL_TIME_ZONE,
    hour: '2-digit',
    minute: '2-digit',
  }).format(value)
}

export function fmtLiveDate(value = new Date()) {
  const label = new Intl.DateTimeFormat('tr-TR', {
    timeZone: ISTANBUL_TIME_ZONE,
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  }).format(value)
  return label.charAt(0).toLocaleUpperCase('tr-TR') + label.slice(1)
}

export function fmtLongDate(isoDate?: string | null) {
  if (!isoDate) return '—'
  const date = new Date(`${isoDate}T12:00:00Z`)
  return new Intl.DateTimeFormat('tr-TR', {
    day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC',
  }).format(date)
}

export function fmtDetailDate(isoDate?: string | null) {
  if (!isoDate) return '—'
  const date = new Date(`${isoDate}T12:00:00Z`)
  const label = new Intl.DateTimeFormat('tr-TR', {
    timeZone: ISTANBUL_TIME_ZONE,
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
  }).format(date)
  return label.charAt(0).toLocaleUpperCase('tr-TR') + label.slice(1)
}

export function fmtShortDate(isoDate?: string | null) {
  if (!isoDate) return '—'
  const date = new Date(`${isoDate}T12:00:00Z`)
  return new Intl.DateTimeFormat('tr-TR', {
    timeZone: ISTANBUL_TIME_ZONE,
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(date)
}

export function fmtShortDateWithWeekday(isoDate?: string | null) {
  if (!isoDate) return '—'
  const date = new Date(`${isoDate}T12:00:00Z`)
  return new Intl.DateTimeFormat('tr-TR', {
    timeZone: ISTANBUL_TIME_ZONE,
    weekday: 'long',
    day: 'numeric',
    month: 'short',
  }).format(date)
}

export function monthRange(startYyyyMm: string, endYyyyMm: string) {
  const months: string[] = []
  let [year, month] = startYyyyMm.split('-').map(Number)
  const [endYear, endMonth] = endYyyyMm.split('-').map(Number)
  while (year < endYear || (year === endYear && month <= endMonth)) {
    months.push(`${year}-${String(month).padStart(2, '0')}`)
    month += 1
    if (month > 12) { month = 1; year += 1 }
  }
  return months
}

export function monthLabel(yyyyMm: string, { short = false } = {}) {
  const [year, month] = yyyyMm.split('-').map(Number)
  const date = new Date(Date.UTC(year, month - 1, 15))
  const label = new Intl.DateTimeFormat('tr-TR', {
    month: short ? 'short' : 'long',
    year: short ? undefined : 'numeric',
    timeZone: 'UTC',
  }).format(date)
  const capitalized = label.charAt(0).toLocaleUpperCase('tr-TR') + label.slice(1)
  return short ? `${capitalized} '${String(year).slice(2)}` : capitalized
}

export function previousMonthISO(today: string) {
  const [year, month] = today.slice(0, 7).split('-').map(Number)
  const previousMonth = month === 1 ? 12 : month - 1
  const previousYear = month === 1 ? year - 1 : year
  return `${previousYear}-${String(previousMonth).padStart(2, '0')}`
}

export function transferStartTime(pickupLocation: string, pickupTime?: string | null, flightArrivalTime?: string | null) {
  return pickupLocation === 'airport' ? (flightArrivalTime || pickupTime || null) : (pickupTime || null)
}

export const STATUS_LABELS: Record<string, string> = {
  pending: 'Bekliyor', paid: 'Ödendi', confirmed: 'Onaylı',
  in_transit: 'Yolda', completed: 'Tamamlandı', cancelled: 'İptal',
}

export function statusLabel(status: string, isRoundTrip = false) {
  if (status === 'confirmed' && isRoundTrip) return 'Gidiş-Dönüş Rezerve'
  return STATUS_LABELS[status] ?? status
}
