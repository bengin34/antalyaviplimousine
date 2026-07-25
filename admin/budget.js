import { supabase } from './supabase-client.js'
import { calculateBudgetMetrics } from './budget-metrics.js'

const ISTANBUL_TIME_ZONE = 'Europe/Istanbul'
const PAGE_SIZE = 1000

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

function formatPeriodLabel(period, today) {
  if (period === 'all') return 'Tüm zamanlar'

  const date = new Date(`${today}T12:00:00Z`)
  if (period === 'year') {
    return new Intl.DateTimeFormat('tr-TR', { year: 'numeric' }).format(date)
  }

  const label = new Intl.DateTimeFormat('tr-TR', {
    month: 'long',
    year: 'numeric',
  }).format(date)
  return label.charAt(0).toLocaleUpperCase('tr-TR') + label.slice(1)
}

async function fetchAllBookings() {
  const bookings = []

  for (let from = 0; ; from += PAGE_SIZE) {
    const { data, error } = await supabase
      .from('bookings')
      .select('id, pickup_date, return_date, trip_type, price_eur, status, payment_method, paid_at, created_at')
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
      Gelirler rezervasyonun gidiş tarihine göre döneme eklenir. “Tahsil edilen”; ödeme kaydı bulunan veya ödendi, yolda ya da tamamlandı durumundaki rezervasyonları kapsar. “Yapılan sefer”; tarihi geçmişe düşmüş ve iptal edilmemiş gidiş/dönüşleri ayrı ayrı sayar.
    </p>`
}

export async function renderBudget(container, navigate) {
  const today = todayISO()
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
    </div>
    <div class="budget-toolbar">
      <div class="budget-periods" role="group" aria-label="Bütçe dönemi">
        <button type="button" data-period="month">Bu ay</button>
        <button type="button" data-period="year">Bu yıl</button>
        <button class="active" type="button" data-period="all">Tümü</button>
      </div>
      <button class="sync-button" id="budget-refresh-btn" type="button" aria-label="Bütçe verilerini yenile">↻</button>
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
  await refreshBudget()
}
