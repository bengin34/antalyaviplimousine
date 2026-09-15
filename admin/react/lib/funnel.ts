/**
 * Huni raporunun hesap katmanı.
 *
 * Veri `site_funnel_summary` RPC'sinden hazır toplanmış gelir; buradaki iş
 * yalnızca sıralama, oranlama ve biçimlendirme. Oranlar bilerek `null`
 * olabiliyor: paydası sıfır olan bir oran "%0" değildir, bilinmiyordur — ve
 * panelde bunu %0 göstermek yanlış karar verdirir.
 */

export type FunnelEventRow = { event: string; sessions: number; events: number }
export type FunnelSummary = {
  days: number
  funnel: FunnelEventRow[]
  abandoned: Array<{ step: string; sessions: number }>
  unavailable: Array<{ route: string; sessions: number }>
  contact: Array<{ event: string; events: number }>
  flight_failures: number
  sources: Array<{ source: string; bookings: number; revenue_eur: number }>
}

export type FunnelStep = {
  event: string
  label: string
  hint: string
  sessions: number
  /** Bir önceki adıma göre geçiş oranı. İlk adımda ve payda sıfırken null. */
  stepRate: number | null
  /** Siteye girenlere göre oran. Giriş sıfırken null. */
  shareOfTop: number | null
}

/** Huninin sırası koddan gelir; SQL tarafı alfabetik döner. */
const STEPS: Array<{ event: string; label: string; hint: string }> = [
  { event: 'landing_view', label: 'Siteye giriş', hint: 'Sayfayı açan ziyaretçi' },
  { event: 'price_shown', label: 'Fiyat gördü', hint: 'Rota seçip 2. adıma geçti' },
  { event: 'booking_started', label: 'Bilgilerini girmeye başladı', hint: '3. adıma geçti' },
  { event: 'booking_submitted', label: 'Rezervasyon gönderdi', hint: 'Formu tamamladı' },
]

const ratio = (value: number, base: number) => (base > 0 ? value / base : null)

export function buildFunnel(summary: FunnelSummary): FunnelStep[] {
  const sessionsFor = (event: string) =>
    Number(summary.funnel.find(row => row.event === event)?.sessions) || 0
  const top = sessionsFor(STEPS[0].event)

  return STEPS.map((step, index) => {
    const sessions = sessionsFor(step.event)
    const previous = index === 0 ? null : sessionsFor(STEPS[index - 1].event)
    return {
      ...step,
      sessions,
      stepRate: previous === null ? null : ratio(sessions, previous),
      shareOfTop: ratio(sessions, top),
    }
  })
}

export function formatRate(value: number | null) {
  if (value === null || !Number.isFinite(value)) return '—'
  return `%${new Intl.NumberFormat('tr-TR', { maximumFractionDigits: 1 }).format(value * 100)}`
}

export type SourceRow = {
  source: string
  bookings: number
  revenue: number
  /** Toplam ciro içindeki payı; ciro yokken null. */
  share: number | null
}

export function sourceRevenue(summary: FunnelSummary) {
  const rows = summary.sources.map(row => ({
    source: row.source,
    bookings: Number(row.bookings) || 0,
    revenue: Number(row.revenue_eur) || 0,
  }))
  const totalRevenue = rows.reduce((sum, row) => sum + row.revenue, 0)
  const totalBookings = rows.reduce((sum, row) => sum + row.bookings, 0)

  return {
    rows: rows
      .map(row => ({ ...row, share: ratio(row.revenue, totalRevenue) }))
      .sort((left, right) => right.revenue - left.revenue || right.bookings - left.bookings),
    totalRevenue,
    totalBookings,
  }
}

export const SOURCE_LABELS: Record<string, string> = {
  'google-ads': 'Google Ads',
  direct: 'Doğrudan / bilinmiyor',
  google: 'Google (organik/utm)',
}

export const CONTACT_LABELS: Record<string, string> = {
  whatsapp_clicked: 'WhatsApp',
  phone_clicked: 'Telefon',
}
