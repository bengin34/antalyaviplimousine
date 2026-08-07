import { useCallback, useEffect, useMemo, useState } from 'react'
import { AdminTabs, Topbar } from '../components/AdminChrome'
import { fmtLongDate, fmtSyncTime, formatEuro, monthLabel, monthRange, previousMonthISO, todayISO } from '../lib/format'
import { supabase } from '../lib/supabase'
import type { Booking, Navigate } from '../types'
import { calculateBudgetMetrics } from '../../budget-metrics.js'
import { locationLabel } from '../../turkish-formatters.js'

const PAGE_SIZE = 1000
const FIRST_BUDGET_MONTH = '2026-07'
const STATUS_LABELS: Record<string, string> = {
  pending: 'Bekleyen', confirmed: 'Onaylı', paid: 'Ödendi', in_transit: 'Yolda', completed: 'Tamamlandı', cancelled: 'İptal',
}

function formatPeriodLabel(period: string, today: string) {
  if (period === 'all') return 'Tüm zamanlar'
  if (period === 'last-month') return monthLabel(previousMonthISO(today))
  return monthLabel(period)
}

function isInPeriod(date: string | null, period: string, today: string) {
  if (!date) return false
  if (period === 'all') return true
  if (period === 'last-month') return date.slice(0, 7) === previousMonthISO(today)
  return date.slice(0, 7) === period
}

async function fetchAllBookings() {
  const bookings: Booking[] = []
  for (let from = 0; ; from += PAGE_SIZE) {
    const { data, error } = await supabase.from('bookings')
      .select('id, customer_name, pickup_location, dropoff_location, pickup_date, return_date, trip_type, price_eur, status, payment_method, paid_at, created_at')
      .order('created_at', { ascending: true }).range(from, from + PAGE_SIZE - 1)
    if (error) throw error
    const rows = (data ?? []) as Booking[]
    bookings.push(...rows)
    if (rows.length < PAGE_SIZE) return bookings
  }
}

function escapeHTML(value: unknown) {
  return String(value ?? '').replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&#039;')
}

function openSummaryPDF(bookings: Booking[], selectedPeriod: string, today: string, label: string) {
  const filtered = bookings.filter(booking => booking.status !== 'cancelled' && isInPeriod(booking.pickup_date, selectedPeriod, today)).sort((a, b) => (a.pickup_date || '').localeCompare(b.pickup_date || ''))
  const rows = filtered.map(booking => {
    const destination = locationLabel(booking.dropoff_location === 'airport' ? booking.pickup_location : booking.dropoff_location)
    const status = ({ pending: 'Bekliyor', confirmed: 'Onaylı', paid: 'Ödendi', in_transit: 'Yolda', completed: 'Tamamlandı' } as Record<string, string>)[booking.status] || booking.status
    return `<tr><td>${escapeHTML(fmtLongDate(booking.pickup_date))}</td><td>${escapeHTML(booking.customer_name || '—')}</td><td>${escapeHTML(destination)}</td><td class="price">${escapeHTML(formatEuro(booking.price_eur))}</td><td>${escapeHTML(status)}</td></tr>`
  }).join('')
  const total = filtered.reduce((sum, booking) => sum + (Number(booking.price_eur) || 0), 0)
  const html = `<!DOCTYPE html><html lang="tr"><head><meta charset="UTF-8"><title>VIP Transfer Özet — ${escapeHTML(label)}</title><style>*{box-sizing:border-box;margin:0;padding:0}body{font-family:system-ui,-apple-system,sans-serif;font-size:13px;color:#111;padding:24px}h1{font-size:18px;margin-bottom:4px}.subtitle{color:#555;font-size:13px;margin-bottom:20px}table{width:100%;border-collapse:collapse}th{background:#f0f0f0;text-align:left;padding:8px 10px;font-size:12px;text-transform:uppercase;letter-spacing:.5px}td{padding:7px 10px;border-bottom:1px solid #eee;vertical-align:top}td.price{font-weight:600;white-space:nowrap}tfoot td{background:#f8f8f8;font-weight:700;padding:8px 10px;border-top:2px solid #ccc}tfoot td.price{color:#1a5c2a}@media print{body{padding:0}}</style></head><body><h1>VIP Transfer Özeti</h1><div class="subtitle">${escapeHTML(label)} · ${filtered.length} rezervasyon</div><table><thead><tr><th>Tarih</th><th>Yolcu</th><th>Gidilen Yer</th><th>Fiyat</th><th>Durum</th></tr></thead><tbody>${rows || '<tr><td colspan="5" style="text-align:center;color:#888;padding:24px">Seçilen dönemde rezervasyon yok</td></tr>'}</tbody><tfoot><tr><td colspan="3"><strong>Toplam</strong></td><td class="price">${escapeHTML(formatEuro(total))}</td><td></td></tr></tfoot></table></body></html>`
  const popup = window.open('', '_blank')
  if (!popup) return
  popup.document.write(html); popup.document.close(); popup.focus(); popup.print()
}

function PaymentRow({ label, amount, count, total, className }: { label: string; amount: number; count: number; total: number; className: string }) {
  const share = total > 0 ? Math.round((amount / total) * 100) : 0
  return <div className="budget-payment-row"><div className="budget-payment-heading"><span><i className={`budget-payment-dot ${className}`} aria-hidden="true" />{label}</span><strong>{formatEuro(amount)}</strong></div><div className="budget-progress" aria-label={`${label} tahsilat oranı yüzde ${share}`}><span className={className} style={{ width: `${share}%` }} /></div><div className="budget-payment-meta">{count} rezervasyon · Tahsilatın %{share}&apos;i</div></div>
}

function BudgetMetrics({ metrics, period, today }: { metrics: any; period: string; today: string }) {
  const mostVisited = metrics.travelHistory[0]?.count ?? 0
  return <>
    <section className="budget-hero" aria-label="Tahsil edilen gelir"><div className="budget-hero-glow" aria-hidden="true" /><div className="budget-eyebrow">{formatPeriodLabel(period, today)} · Tahsil edilen</div><div className="budget-total">{formatEuro(metrics.collectedAmount)}</div><div className="budget-hero-meta">{metrics.collectedCount} rezervasyondan alınan toplam tutar</div></section>
    <section className="budget-kpi-grid" aria-label="Bütçe ve sefer özeti">
      <article className="budget-kpi budget-kpi-expected"><span className="budget-kpi-icon" aria-hidden="true">↗</span><span className="budget-kpi-label">Beklenen gelir</span><strong>{formatEuro(metrics.expectedAmount)}</strong><small>{metrics.expectedCount} bekleyen / onaylı rezervasyon</small></article>
      <article className="budget-kpi budget-kpi-completed"><span className="budget-kpi-icon" aria-hidden="true">✓</span><span className="budget-kpi-label">Yapılan sefer</span><strong>{metrics.completedTrips}</strong><small>Geçmişe düşen gidiş ve dönüşler</small></article>
      <article className="budget-kpi"><span className="budget-kpi-icon" aria-hidden="true">●</span><span className="budget-kpi-label">Planlanan sefer</span><strong>{metrics.scheduledTrips}</strong><small>İptaller hariç tüm seferler</small></article>
      <article className="budget-kpi"><span className="budget-kpi-icon" aria-hidden="true">#</span><span className="budget-kpi-label">Rezervasyon</span><strong>{metrics.reservationCount}</strong><small>İptaller hariç toplam kayıt</small></article>
    </section>
    <section className="budget-section travel-history-section"><div className="budget-section-heading"><div><span className="budget-section-kicker">SEYAHAT GEÇMİŞİ</span><h2>Gidilen bölgeler</h2></div><span>{metrics.completedTrips} sefer</span></div>{metrics.travelHistory.length ? metrics.travelHistory.map(({ location, count }: any) => { const share = mostVisited ? Math.round((count / mostVisited) * 100) : 0; return <div className="travel-history-row" key={location}><div className="travel-history-heading"><span>{locationLabel(location)}</span><strong>{count} <small>sefer</small></strong></div><div className="travel-history-bar" aria-label={`${locationLabel(location)}: ${count} sefer`}><span style={{ width: `${share}%` }} /></div></div> }) : <div className="travel-history-empty">Seçilen dönemde geçmiş sefer bulunmuyor.</div>}</section>
    <section className="budget-section"><div className="budget-section-heading"><div><span className="budget-section-kicker">TAHSİLAT</span><h2>Ödeme dağılımı</h2></div><span>{formatEuro(metrics.collectedAmount)}</span></div><PaymentRow label="Nakit" amount={metrics.payment.cashAmount} count={metrics.payment.cashCount} total={metrics.collectedAmount} className="cash" /><PaymentRow label="Kart" amount={metrics.payment.cardAmount} count={metrics.payment.cardCount} total={metrics.collectedAmount} className="card" /></section>
    <section className="budget-section"><div className="budget-section-heading"><div><span className="budget-section-kicker">REZERVASYONLAR</span><h2>Durum özeti</h2></div></div><div className="budget-status-grid">{Object.entries(STATUS_LABELS).map(([status, label]) => <div className="budget-status-row" key={status}><span><i className={`budget-status-dot status-${status}`} aria-hidden="true" />{label}</span><strong>{metrics.statusCounts[status]}</strong></div>)}</div></section>
    <p className="budget-footnote">Gelirler rezervasyonun gidiş tarihine göre döneme eklenir. “Tahsil edilen”; gidiş tarihi geçmiş, ödeme kaydı bulunan veya ödendi/yolda/tamamlandı durumundaki rezervasyonları kapsar. “Yapılan sefer”; tarihi geçmişe düşmüş ve iptal edilmemiş gidiş/dönüşleri ayrı ayrı sayar.</p>
  </>
}

export default function BudgetPage({ navigate }: { navigate: Navigate }) {
  const today = useMemo(todayISO, [])
  const months = useMemo(() => monthRange(FIRST_BUDGET_MONTH, today.slice(0, 7)), [today])
  const [period, setPeriod] = useState('all')
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)
  const [status, setStatus] = useState('Yükleniyor…')
  const [error, setError] = useState(false)
  const refresh = useCallback(async () => {
    setLoading(true); setStatus('Veriler yenileniyor…'); setError(false)
    try {
      setBookings(await fetchAllBookings()); setStatus(`Son güncelleme: ${fmtSyncTime()}`)
    } catch { setError(true); setStatus('Bağlantı hatası') }
    finally { setLoading(false) }
  }, [])
  useEffect(() => { void refresh() }, [refresh])
  const metrics = useMemo(() => calculateBudgetMetrics(bookings, period, today), [bookings, period, today])
  const periods = [...months, 'last-month', 'all']
  const label = (value: string) => value === 'last-month' ? 'Geçen ay' : value === 'all' ? 'Tümü' : monthLabel(value, { short: true })
  return <><Topbar navigate={navigate} /><AdminTabs active="budget" navigate={navigate} />
    <div className="budget-toolbar"><div className="budget-periods" role="group" aria-label="Bütçe dönemi">{periods.map(value => <button key={value} type="button" className={period === value ? 'active' : ''} onClick={() => setPeriod(value)}>{label(value)}</button>)}</div><div className="budget-toolbar-actions"><button className="btn-outline budget-pdf-btn" type="button" aria-label="Özet PDF çıkar" onClick={() => openSummaryPDF(bookings, period, today, formatPeriodLabel(period, today))}>📄 Özet Çıkar</button><button className="sync-button" type="button" aria-label="Bütçe verilerini yenile" disabled={loading} onClick={() => void refresh()}>↻</button></div></div>
    <div className="budget-update-status">{status}</div>
    <main className="scroll-area budget-content">{error ? <div className="empty"><div className="empty-icon">€</div><div>Bütçe verileri yüklenemedi.</div></div> : loading && !bookings.length ? <div className="empty"><div>Hesaplanıyor…</div></div> : <BudgetMetrics metrics={metrics} period={period} today={today} />}</main>
  </>
}
