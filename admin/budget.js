import { supabase } from './supabase-client.js'
import { calculateBudgetMetrics } from './budget-metrics.js'
import { locationLabel } from './turkish-formatters.js'

const ISTANBUL_TIME_ZONE = 'Europe/Istanbul'
const PAGE_SIZE = 1000
const FIRST_BUDGET_MONTH = '2026-07'

const STATUS_LABELS = {
  pending: 'Bekleyen',
  confirmed: 'Onaylı',
  paid: 'Ödendi',
  in_transit: 'Yolda',
  completed: 'Tamamlandı',
  cancelled: 'İptal',
}

function todayISO() {
  return new Intl.DateTimeFormat('sv', { timeZone: ISTANBUL_TIME_ZONE }).format(new Date())
}

function formatCurrency(value) {
  return new Intl.NumberFormat('tr-TR', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 2,
  }).format(Number(value) || 0)
}

function escapeHTML(value) {
  return String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;')
}

function previousMonthISO(today) {
  const [year, month] = today.slice(0, 7).split('-').map(Number)
  const prevMonth = month === 1 ? 12 : month - 1
  const prevYear = month === 1 ? year - 1 : year
  return `${prevYear}-${String(prevMonth).padStart(2, '0')}`
}

function isInPeriod(date, period, today) {
  if (!date) return false
  if (period === 'all') return true
  if (period === 'last-month') return date.slice(0, 7) === previousMonthISO(today)
  return date.slice(0, 7) === period
}

function fmtLongDate(isoDate) {
  if (!isoDate) return '—'
  const date = new Date(`${isoDate}T12:00:00Z`)
  return new Intl.DateTimeFormat('tr-TR', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(date)
}

function openSummaryPDF(bookings, selectedPeriod, today, periodLabel) {
  const filtered = bookings
    .filter(b => b.status !== 'cancelled' && isInPeriod(b.pickup_date, selectedPeriod, today))
    .sort((a, b) => (a.pickup_date || '').localeCompare(b.pickup_date || ''))

  const rows = filtered.map(b => {
    const destRaw = b.dropoff_location === 'airport' ? b.pickup_location : b.dropoff_location
    const dest = locationLabel(destRaw)
    const date = fmtLongDate(b.pickup_date)
    const customer = escapeHTML(b.customer_name || '—')
    const price = formatCurrency(b.price_eur)
    const statusTR = { pending: 'Bekliyor', confirmed: 'Onaylı', paid: 'Ödendi', in_transit: 'Yolda', completed: 'Tamamlandı' }[b.status] || b.status
    return `<tr><td>${escapeHTML(date)}</td><td>${customer}</td><td>${escapeHTML(dest)}</td><td class="price">${escapeHTML(price)}</td><td>${statusTR}</td></tr>`
  }).join('')

  const total = filtered.reduce((sum, b) => sum + (Number(b.price_eur) || 0), 0)

  const html = `<!DOCTYPE html>
<html lang="tr">
<head>
<meta charset="UTF-8">
<title>VIP Transfer Özet — ${escapeHTML(periodLabel)}</title>
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: system-ui, -apple-system, sans-serif; font-size: 13px; color: #111; padding: 24px; }
  h1 { font-size: 18px; margin-bottom: 4px; }
  .subtitle { color: #555; font-size: 13px; margin-bottom: 20px; }
  table { width: 100%; border-collapse: collapse; }
  th { background: #f0f0f0; text-align: left; padding: 8px 10px; font-size: 12px; text-transform: uppercase; letter-spacing: .5px; }
  td { padding: 7px 10px; border-bottom: 1px solid #eee; vertical-align: top; }
  td.price { font-weight: 600; white-space: nowrap; }
  tfoot td { background: #f8f8f8; font-weight: 700; padding: 8px 10px; border-top: 2px solid #ccc; }
  tfoot td.price { color: #1a5c2a; }
  @media print { body { padding: 0; } }
</style>
</head>
<body>
<h1>VIP Transfer Özeti</h1>
<div class="subtitle">${escapeHTML(periodLabel)} · ${filtered.length} rezervasyon</div>
<table>
  <thead><tr><th>Tarih</th><th>Yolcu</th><th>Gidilen Yer</th><th>Fiyat</th><th>Durum</th></tr></thead>
  <tbody>${rows || '<tr><td colspan="5" style="text-align:center;color:#888;padding:24px">Seçilen dönemde rezervasyon yok</td></tr>'}</tbody>
  <tfoot><tr><td colspan="3"><strong>Toplam</strong></td><td class="price">${escapeHTML(formatCurrency(total))}</td><td></td></tr></tfoot>
</table>
</body>
</html>`

  const win = window.open('', '_blank')
  if (!win) return
  win.document.write(html)
  win.document.close()
  win.focus()
  win.print()
}

function monthRange(startYyyyMm, endYyyyMm) {
  const months = []
  let [year, month] = startYyyyMm.split('-').map(Number)
  const [endYear, endMonth] = endYyyyMm.split('-').map(Number)
  while (year < endYear || (year === endYear && month <= endMonth)) {
    months.push(`${year}-${String(month).padStart(2, '0')}`)
    month += 1
    if (month > 12) { month = 1; year += 1 }
  }
  return months
}

function monthLabel(yyyyMm, { short = false } = {}) {
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

function formatPeriodLabel(period, today) {
  if (period === 'all') return 'Tüm zamanlar'
  if (period === 'last-month') return monthLabel(previousMonthISO(today))
  return monthLabel(period)
}

async function fetchAllBookings() {
  const bookings = []

  for (let from = 0; ; from += PAGE_SIZE) {
    const { data, error } = await supabase
      .from('bookings')
      .select('id, customer_name, pickup_location, dropoff_location, pickup_date, return_date, trip_type, price_eur, status, payment_method, paid_at, created_at')
      .order('created_at', { ascending: true })
      .range(from, from + PAGE_SIZE - 1)

    if (error) throw error
    const rows = data ?? []
    bookings.push(...rows)
    if (rows.length < PAGE_SIZE) return bookings
  }
}

function paymentRowHTML(label, amount, count, total, className) {
  const share = total > 0 ? Math.round((amount / total) * 100) : 0
  return `
    <div class="budget-payment-row">
      <div class="budget-payment-heading">
        <span><i class="budget-payment-dot ${className}" aria-hidden="true"></i>${label}</span>
        <strong>${formatCurrency(amount)}</strong>
      </div>
      <div class="budget-progress" aria-label="${label} tahsilat oranı yüzde ${share}">
        <span class="${className}" style="width:${share}%"></span>
      </div>
      <div class="budget-payment-meta">${count} rezervasyon · Tahsilatın %${share}'i</div>
    </div>`
}

function metricsHTML(metrics, period, today) {
  const periodLabel = formatPeriodLabel(period, today)
  const statusRows = Object.entries(STATUS_LABELS).map(([status, label]) => `
    <div class="budget-status-row">
      <span><i class="budget-status-dot status-${status}" aria-hidden="true"></i>${label}</span>
      <strong>${metrics.statusCounts[status]}</strong>
    </div>`).join('')
  const mostVisited = metrics.travelHistory[0]?.count ?? 0
  const travelRows = metrics.travelHistory.map(({ location, count }) => {
    const share = mostVisited > 0 ? Math.round((count / mostVisited) * 100) : 0
    const label = locationLabel(location)
    return `
      <div class="travel-history-row">
        <div class="travel-history-heading">
          <span>${escapeHTML(label)}</span>
          <strong>${count} <small>sefer</small></strong>
        </div>
        <div class="travel-history-bar" aria-label="${escapeHTML(label)}: ${count} sefer">
          <span style="width:${share}%"></span>
        </div>
      </div>`
  }).join('')

  return `
    <section class="budget-hero" aria-label="Tahsil edilen gelir">
      <div class="budget-hero-glow" aria-hidden="true"></div>
      <div class="budget-eyebrow">${periodLabel} · Tahsil edilen</div>
      <div class="budget-total">${formatCurrency(metrics.collectedAmount)}</div>
      <div class="budget-hero-meta">${metrics.collectedCount} rezervasyondan alınan toplam tutar</div>
    </section>

    <section class="budget-kpi-grid" aria-label="Bütçe ve sefer özeti">
      <article class="budget-kpi budget-kpi-expected">
        <span class="budget-kpi-icon" aria-hidden="true">↗</span>
        <span class="budget-kpi-label">Beklenen gelir</span>
        <strong>${formatCurrency(metrics.expectedAmount)}</strong>
        <small>${metrics.expectedCount} bekleyen / onaylı rezervasyon</small>
      </article>
      <article class="budget-kpi budget-kpi-completed">
        <span class="budget-kpi-icon" aria-hidden="true">✓</span>
        <span class="budget-kpi-label">Yapılan sefer</span>
        <strong>${metrics.completedTrips}</strong>
        <small>Geçmişe düşen gidiş ve dönüşler</small>
      </article>
      <article class="budget-kpi">
        <span class="budget-kpi-icon" aria-hidden="true">●</span>
        <span class="budget-kpi-label">Planlanan sefer</span>
        <strong>${metrics.scheduledTrips}</strong>
        <small>İptaller hariç tüm seferler</small>
      </article>
      <article class="budget-kpi">
        <span class="budget-kpi-icon" aria-hidden="true">#</span>
        <span class="budget-kpi-label">Rezervasyon</span>
        <strong>${metrics.reservationCount}</strong>
        <small>İptaller hariç toplam kayıt</small>
      </article>
    </section>

    <section class="budget-section travel-history-section">
      <div class="budget-section-heading">
        <div><span class="budget-section-kicker">SEYAHAT GEÇMİŞİ</span><h2>Gidilen bölgeler</h2></div>
        <span>${metrics.completedTrips} sefer</span>
      </div>
      ${travelRows || '<div class="travel-history-empty">Seçilen dönemde geçmiş sefer bulunmuyor.</div>'}
    </section>

    <section class="budget-section">
      <div class="budget-section-heading">
        <div><span class="budget-section-kicker">TAHSİLAT</span><h2>Ödeme dağılımı</h2></div>
        <span>${formatCurrency(metrics.collectedAmount)}</span>
      </div>
      ${paymentRowHTML('Nakit', metrics.payment.cashAmount, metrics.payment.cashCount, metrics.collectedAmount, 'cash')}
      ${paymentRowHTML('Kart', metrics.payment.cardAmount, metrics.payment.cardCount, metrics.collectedAmount, 'card')}
    </section>

    <section class="budget-section">
      <div class="budget-section-heading">
        <div><span class="budget-section-kicker">REZERVASYONLAR</span><h2>Durum özeti</h2></div>
      </div>
      <div class="budget-status-grid">${statusRows}</div>
    </section>

    <p class="budget-footnote">
      Gelirler rezervasyonun gidiş tarihine göre döneme eklenir. “Tahsil edilen”; gidiş tarihi geçmiş, ödeme kaydı bulunan veya ödendi/yolda/tamamlandı durumundaki rezervasyonları kapsar. “Yapılan sefer”; tarihi geçmişe düşmüş ve iptal edilmemiş gidiş/dönüşleri ayrı ayrı sayar.
    </p>`
}

function periodButtonsHTML(months, selectedPeriod) {
  const monthButtons = months.map(month =>
    `<button type="button" data-period="${month}" class="${selectedPeriod === month ? 'active' : ''}">${monthLabel(month, { short: true })}</button>`).join('')
  return `${monthButtons}
    <button type="button" data-period="last-month" class="${selectedPeriod === 'last-month' ? 'active' : ''}">Geçen ay</button>
    <button type="button" data-period="all" class="${selectedPeriod === 'all' ? 'active' : ''}">Tümü</button>`
}

export async function renderBudget(container, navigate) {
  const today = todayISO()
  const months = monthRange(FIRST_BUDGET_MONTH, today.slice(0, 7))
  let selectedPeriod = 'all'
  let bookings = []
  let refreshInFlight = false

  container.innerHTML = `
    <div class="topbar">
      <span class="topbar-title">🚗 VIP Yönetim</span>
      <div class="topbar-actions">
        <button class="topbar-new" id="new-btn">+ Yeni Kayıt</button>
        <button class="topbar-logout" id="logout-btn">Çıkış</button>
      </div>
    </div>
    <div class="timeline-tabs timeline-tabs-with-budget" role="tablist" aria-label="Yönetim sayfaları">
      <button class="timeline-tab" type="button" role="tab" aria-selected="false" data-admin-view="future">Gelecek</button>
      <button class="timeline-tab" type="button" role="tab" aria-selected="false" data-admin-view="past">Geçmiş</button>
      <button class="timeline-tab active" type="button" role="tab" aria-selected="true" data-admin-view="budget">Bütçe</button>
      <button class="timeline-tab" type="button" role="tab" aria-selected="false" data-admin-view="profit-loss">Kâr/Zarar</button>
    </div>
    <div class="budget-toolbar">
      <div class="budget-periods" role="group" aria-label="Bütçe dönemi">${periodButtonsHTML(months, selectedPeriod)}</div>
      <div class="budget-toolbar-actions">
        <button class="btn-outline budget-pdf-btn" id="budget-pdf-btn" type="button" aria-label="Özet PDF çıkar">📄 Özet Çıkar</button>
        <button class="sync-button" id="budget-refresh-btn" type="button" aria-label="Bütçe verilerini yenile">↻</button>
      </div>
    </div>
    <div class="budget-update-status" id="budget-update-status">Yükleniyor…</div>
    <main class="scroll-area budget-content" id="budget-content">
      <div class="empty"><div>Hesaplanıyor…</div></div>
    </main>
  `

  const content = document.getElementById('budget-content')
  const refreshButton = document.getElementById('budget-refresh-btn')
  const updateStatus = document.getElementById('budget-update-status')

  const renderMetrics = () => {
    content.innerHTML = metricsHTML(calculateBudgetMetrics(bookings, selectedPeriod, today), selectedPeriod, today)
  }

  async function refreshBudget() {
    if (refreshInFlight || document.getElementById('budget-content') !== content) return
    refreshInFlight = true
    refreshButton.disabled = true
    updateStatus.textContent = 'Veriler yenileniyor…'

    try {
      bookings = await fetchAllBookings()
      if (document.getElementById('budget-content') !== content) return
      renderMetrics()
      const time = new Intl.DateTimeFormat('tr-TR', {
        timeZone: ISTANBUL_TIME_ZONE,
        hour: '2-digit',
        minute: '2-digit',
      }).format(new Date())
      updateStatus.textContent = `Son güncelleme: ${time}`
    } catch {
      if (document.getElementById('budget-content') !== content) return
      content.innerHTML = '<div class="empty"><div class="empty-icon">€</div><div>Bütçe verileri yüklenemedi.</div></div>'
      updateStatus.textContent = 'Bağlantı hatası'
    } finally {
      refreshInFlight = false
      if (document.getElementById('budget-refresh-btn') === refreshButton) refreshButton.disabled = false
    }
  }

  document.getElementById('new-btn').addEventListener('click', () => navigate('#new'))
  document.getElementById('logout-btn').addEventListener('click', async () => {
    await supabase.auth.signOut()
    navigate('#login')
  })

  document.querySelector('.timeline-tabs').addEventListener('click', event => {
    const tab = event.target.closest('[data-admin-view]')
    if (!tab || tab.dataset.adminView === 'budget') return
    if (tab.dataset.adminView === 'profit-loss') {
      navigate('#profit-loss')
      return
    }
    navigate(tab.dataset.adminView === 'past' ? '#timeline?tab=past' : '#timeline')
  })

  document.querySelector('.budget-periods').addEventListener('click', event => {
    const button = event.target.closest('[data-period]')
    if (!button || button.dataset.period === selectedPeriod) return
    selectedPeriod = button.dataset.period
    document.querySelectorAll('[data-period]').forEach(periodButton => {
      periodButton.classList.toggle('active', periodButton === button)
    })
    renderMetrics()
  })

  refreshButton.addEventListener('click', refreshBudget)

  document.getElementById('budget-pdf-btn').addEventListener('click', () => {
    const periodLabel = formatPeriodLabel(selectedPeriod, today)
    openSummaryPDF(bookings, selectedPeriod, today, periodLabel)
  })

  await refreshBudget()
}
