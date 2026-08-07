import { supabase } from './supabase-client.js'
import {
  calculateProfitLossMetrics,
  DEFAULT_EUR_TRY_RATE,
  DEFAULT_KM_COST_TRY,
} from './profit-loss-metrics.js'
import { locationLabel } from './turkish-formatters.js'

const ISTANBUL_TIME_ZONE = 'Europe/Istanbul'
const PAGE_SIZE = 1000
const FIRST_PROFIT_MONTH = '2026-07'

function todayISO() {
  return new Intl.DateTimeFormat('sv', { timeZone: ISTANBUL_TIME_ZONE }).format(new Date())
}

function escapeHTML(value) {
  return String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;')
}

function formatEuro(value) {
  return new Intl.NumberFormat('tr-TR', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 2,
  }).format(Number(value) || 0)
}

function formatTry(value) {
  return new Intl.NumberFormat('tr-TR', {
    style: 'currency',
    currency: 'TRY',
    maximumFractionDigits: 2,
  }).format(Number(value) || 0)
}

function formatNumber(value, maximumFractionDigits = 0) {
  return new Intl.NumberFormat('tr-TR', { maximumFractionDigits }).format(Number(value) || 0)
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

function periodLabel(period) {
  return period === 'all' ? 'Tüm zamanlar' : monthLabel(period)
}

function settingValues(setting = {}) {
  const kmCost = Number(setting.km_cost_try)
  const advertising = Number(setting.advertising_expense_try)
  const rate = Number(setting.eur_try_rate)
  return {
    kmCostTry: Number.isFinite(kmCost) && kmCost > 0 ? kmCost : DEFAULT_KM_COST_TRY,
    advertisingExpenseTry: Number.isFinite(advertising) && advertising >= 0 ? advertising : 0,
    eurTryRate: Number.isFinite(rate) && rate > 0 ? rate : DEFAULT_EUR_TRY_RATE,
  }
}

async function fetchAllBookings() {
  const bookings = []
  for (let from = 0; ; from += PAGE_SIZE) {
    const { data, error } = await supabase
      .from('bookings')
      .select('id, booking_ref, customer_name, pickup_location, dropoff_location, pickup_date, return_date, trip_type, price_eur, status, created_at')
      .order('created_at', { ascending: true })
      .range(from, from + PAGE_SIZE - 1)

    if (error) throw error
    const rows = data ?? []
    bookings.push(...rows)
    if (rows.length < PAGE_SIZE) return bookings
  }
}

async function fetchSettings() {
  const { data, error } = await supabase
    .from('profit_loss_settings')
    .select('period_month, km_cost_try, advertising_expense_try, eur_try_rate, updated_at')
    .order('period_month')
  if (error) throw error
  return new Map((data ?? []).map(setting => [setting.period_month.slice(0, 7), setting]))
}

function periodButtonsHTML(months, selectedPeriod) {
  const monthButtons = months.map(month => `
    <button type="button" data-period="${month}" class="${selectedPeriod === month ? 'active' : ''}">${monthLabel(month, { short: true })}</button>`).join('')
  return `${monthButtons}<button type="button" data-period="all" class="${selectedPeriod === 'all' ? 'active' : ''}">Tümü</button>`
}

function settingsHTML(selectedPeriod, settingsByMonth) {
  if (selectedPeriod === 'all') {
    return `
      <section class="profit-settings profit-settings-summary">
        <div>
          <span class="budget-section-kicker">HESAPLAMA AYARLARI</span>
          <h2>Aylık değerler uygulanıyor</h2>
          <p>Tümü görünümünde her aya kaydettiğiniz km maliyeti, reklam gideri ve kur ayrı ayrı kullanılır.</p>
        </div>
      </section>`
  }

  const values = settingValues(settingsByMonth.get(selectedPeriod))
  return `
    <form class="profit-settings" id="profit-settings-form" novalidate>
      <div class="profit-settings-heading">
        <div><span class="budget-section-kicker">HESAPLAMA AYARLARI</span><h2>${monthLabel(selectedPeriod)}</h2></div>
        <span>Aylık</span>
      </div>
      <div class="profit-input-grid">
        <label class="profit-input-field">
          <span>KM başı maliyet</span>
          <div><b>₺</b><input id="profit-km-cost" type="number" min="0.01" max="10000" step="0.01" inputmode="decimal" value="${values.kmCostTry}" required /></div>
          <small>Boşsa varsayılan 15 ₺/km</small>
        </label>
        <label class="profit-input-field">
          <span>EUR/TL kuru</span>
          <div><b>₺</b><input id="profit-exchange-rate" type="number" min="0.01" max="10000" step="0.0001" inputmode="decimal" value="${values.eurTryRate}" required /></div>
          <small>1 € karşılığı</small>
        </label>
        <label class="profit-input-field profit-input-wide">
          <span>Reklam gideri</span>
          <div><b>₺</b><input id="profit-ad-expense" type="number" min="0" max="1000000000" step="0.01" inputmode="decimal" value="${values.advertisingExpenseTry}" required /></div>
          <small>Bu aya ait toplam reklam harcaması</small>
        </label>
      </div>
      <button class="btn profit-save-button" id="profit-save-button" type="submit">Ayarları kaydet ve hesapla</button>
      <div class="inline-success" id="profit-save-success" role="status"></div>
      <div class="inline-error" id="profit-save-error"></div>
    </form>`
}

function routeRowsHTML(routes) {
  if (routes.length === 0) {
    return '<div class="travel-history-empty">Seçilen dönemde tamamlanmış ve sabit mesafesi bulunan sefer yok.</div>'
  }

  return routes.map(route => {
    const from = locationLabel(route.from)
    const to = locationLabel(route.to)
    return `
      <div class="profit-route-row">
        <div class="profit-route-heading">
          <strong>${escapeHTML(from)} ↔ ${escapeHTML(to)}</strong>
          <span>${route.legCount} sefer</span>
        </div>
        <div class="profit-route-metrics">
          <span><small>Araç KM</small><b>${formatNumber(route.vehicleKm)} km</b></span>
          <span><small>Gelir</small><b>${formatEuro(route.incomeEur)}</b></span>
          <span><small>Araç maliyeti</small><b>${formatTry(route.vehicleCostTry)}</b></span>
        </div>
      </div>`
  }).join('')
}

function unresolvedHTML(unresolvedLegs) {
  if (unresolvedLegs.length === 0) return ''

  const rows = unresolvedLegs.slice(0, 5).map(leg => `
    <li>
      <span>${escapeHTML(leg.bookingRef || leg.customerName || 'Kayıt')}</span>
      <small>${escapeHTML(locationLabel(leg.from))} → ${escapeHTML(locationLabel(leg.to))}</small>
    </li>`).join('')
  const remaining = unresolvedLegs.length > 5 ? `<p>+ ${unresolvedLegs.length - 5} rota daha</p>` : ''

  return `
    <section class="profit-warning" role="status">
      <strong>⚠ ${unresolvedLegs.length} seferin sabit mesafesi bulunamadı</strong>
      <p>Özel adres veya genel “Otel” rotalarının geliri dahil edildi; araç kilometresi ve maliyeti net kâra eklenemedi.</p>
      <ul>${rows}</ul>
      ${remaining}
    </section>`
}

function metricsHTML(metrics, selectedPeriod) {
  const negative = metrics.netProfitTry < 0
  const profitClass = negative ? 'is-negative' : 'is-positive'
  const formulaOperator = negative ? 'Zarar' : 'Net kâr'

  return `
    <section class="profit-hero ${profitClass}" aria-label="${formulaOperator}">
      <div class="budget-eyebrow">${periodLabel(selectedPeriod)} · ${formulaOperator}</div>
      <div class="profit-total">${formatTry(metrics.netProfitTry)}</div>
      <div class="profit-total-eur">${formatEuro(metrics.netProfitEur)}</div>
      <div class="profit-margin"><span>Kâr marjı</span><strong>%${formatNumber(metrics.profitMargin, 1)}</strong></div>
    </section>

    <section class="profit-formula" aria-label="Kâr hesaplama özeti">
      <span><small>Gelir</small><strong>${formatTry(metrics.incomeTry)}</strong></span>
      <i>−</i>
      <span><small>Araç</small><strong>${formatTry(metrics.vehicleCostTry)}</strong></span>
      <i>−</i>
      <span><small>Reklam</small><strong>${formatTry(metrics.advertisingExpenseTry)}</strong></span>
    </section>

    <section class="budget-kpi-grid profit-kpi-grid" aria-label="Kâr zarar özeti">
      <article class="budget-kpi profit-income-kpi">
        <span class="budget-kpi-icon" aria-hidden="true">€</span>
        <span class="budget-kpi-label">Seyahat geliri</span>
        <strong>${formatEuro(metrics.incomeEur)}</strong>
        <small>${formatTry(metrics.incomeTry)} · yalnızca tamamlanan seferler</small>
      </article>
      <article class="budget-kpi profit-distance-kpi">
        <span class="budget-kpi-icon" aria-hidden="true">KM</span>
        <span class="budget-kpi-label">Toplam araç KM</span>
        <strong>${formatNumber(metrics.vehicleKm)} km</strong>
        <small>${formatNumber(metrics.passengerKm)} km yolculu + aynı mesafe boş dönüş</small>
      </article>
      <article class="budget-kpi">
        <span class="budget-kpi-icon" aria-hidden="true">₺</span>
        <span class="budget-kpi-label">Araç maliyeti</span>
        <strong>${formatTry(metrics.vehicleCostTry)}</strong>
        <small>Toplam araç KM × ayın km maliyeti</small>
      </article>
      <article class="budget-kpi">
        <span class="budget-kpi-icon" aria-hidden="true">↗</span>
        <span class="budget-kpi-label">Reklam gideri</span>
        <strong>${formatTry(metrics.advertisingExpenseTry)}</strong>
        <small>Manuel girilen aylık reklam toplamı</small>
      </article>
    </section>

    ${unresolvedHTML(metrics.unresolvedLegs)}

    <section class="budget-section profit-routes">
      <div class="budget-section-heading">
        <div><span class="budget-section-kicker">ROTA DÖKÜMÜ</span><h2>Seyahatlerden gelen hesap</h2></div>
        <span>${metrics.completedLegs} sefer</span>
      </div>
      ${routeRowsHTML(metrics.routes)}
    </section>

    <p class="budget-footnote profit-footnote">
      İptal edilen ve henüz gerçekleşmemiş seferler hesaba katılmaz. Gidiş-dönüş fiyatı iki seyahat ayağına eşit bölünür. Her ayakta aracın yolculu mesafesine aynı uzunlukta boş dönüş eklenir. KM değerleri sabit yaklaşık rota tablosundan gelir; canlı harita hesabı yapılmaz.
    </p>`
}

export async function renderProfitLoss(container, navigate) {
  const today = todayISO()
  const months = monthRange(FIRST_PROFIT_MONTH, today.slice(0, 7))
  let selectedPeriod = today.slice(0, 7)
  let bookings = []
  let settingsByMonth = new Map()
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
      <button class="timeline-tab" type="button" role="tab" aria-selected="false" data-admin-view="budget">Bütçe</button>
      <button class="timeline-tab active" type="button" role="tab" aria-selected="true" data-admin-view="profit-loss">Kâr/Zarar</button>
    </div>
    <div class="budget-toolbar profit-toolbar">
      <div class="budget-periods" role="group" aria-label="Kâr zarar dönemi">${periodButtonsHTML(months, selectedPeriod)}</div>
      <button class="sync-button" id="profit-refresh-btn" type="button" aria-label="Kâr zarar verilerini yenile">↻</button>
    </div>
    <div class="budget-update-status" id="profit-update-status">Yükleniyor…</div>
    <main class="scroll-area budget-content profit-content">
      <div id="profit-settings"><div class="empty"><div>Ayarlar yükleniyor…</div></div></div>
      <div id="profit-metrics"><div class="empty"><div>Hesaplanıyor…</div></div></div>
    </main>
  `

  const settingsContainer = document.getElementById('profit-settings')
  const metricsContainer = document.getElementById('profit-metrics')
  const refreshButton = document.getElementById('profit-refresh-btn')
  const updateStatus = document.getElementById('profit-update-status')

  const bindSettingsForm = () => {
    const form = document.getElementById('profit-settings-form')
    if (!form) return
    form.addEventListener('submit', async event => {
      event.preventDefault()
      const formPeriod = selectedPeriod
      const saveButton = document.getElementById('profit-save-button')
      const successEl = document.getElementById('profit-save-success')
      const errorEl = document.getElementById('profit-save-error')
      const parseValue = id => Number(String(document.getElementById(id).value).replace(',', '.'))
      const kmCost = parseValue('profit-km-cost')
      const exchangeRate = parseValue('profit-exchange-rate')
      const advertising = parseValue('profit-ad-expense')

      successEl.textContent = ''
      errorEl.textContent = ''
      if (!Number.isFinite(kmCost) || kmCost <= 0 || kmCost > 10000) {
        errorEl.textContent = 'Geçerli bir km maliyeti girin.'
        return
      }
      if (!Number.isFinite(exchangeRate) || exchangeRate <= 0 || exchangeRate > 10000) {
        errorEl.textContent = 'Geçerli bir EUR/TL kuru girin.'
        return
      }
      if (!Number.isFinite(advertising) || advertising < 0 || advertising > 1000000000) {
        errorEl.textContent = 'Geçerli bir reklam gideri girin.'
        return
      }

      saveButton.disabled = true
      saveButton.textContent = 'Kaydediliyor…'
      const payload = {
        period_month: `${formPeriod}-01`,
        km_cost_try: kmCost,
        advertising_expense_try: advertising,
        eur_try_rate: exchangeRate,
        updated_at: new Date().toISOString(),
      }
      const { data, error } = await supabase
        .from('profit_loss_settings')
        .upsert(payload, { onConflict: 'period_month' })
        .select()
        .single()

      saveButton.disabled = false
      saveButton.textContent = 'Ayarları kaydet ve hesapla'
      if (error) {
        errorEl.textContent = 'Ayarlar kaydedilemedi, tekrar deneyin.'
        return
      }

      settingsByMonth.set(formPeriod, data)
      if (selectedPeriod === formPeriod && document.getElementById('profit-settings-form') === form) {
        metricsContainer.innerHTML = metricsHTML(
          calculateProfitLossMetrics(bookings, selectedPeriod, today, settingsByMonth),
          selectedPeriod,
        )
        successEl.textContent = 'Ayarlar kaydedildi, hesap güncellendi.'
      }
    })
  }

  const renderReport = () => {
    settingsContainer.innerHTML = settingsHTML(selectedPeriod, settingsByMonth)
    metricsContainer.innerHTML = metricsHTML(
      calculateProfitLossMetrics(bookings, selectedPeriod, today, settingsByMonth),
      selectedPeriod,
    )
    bindSettingsForm()
  }

  async function refreshReport() {
    if (refreshInFlight || document.getElementById('profit-metrics') !== metricsContainer) return
    refreshInFlight = true
    refreshButton.disabled = true
    updateStatus.textContent = 'Seyahatler ve ayarlar yenileniyor…'

    try {
      const [fetchedBookings, fetchedSettings] = await Promise.all([fetchAllBookings(), fetchSettings()])
      bookings = fetchedBookings
      settingsByMonth = fetchedSettings
      if (document.getElementById('profit-metrics') !== metricsContainer) return
      renderReport()
      const time = new Intl.DateTimeFormat('tr-TR', {
        timeZone: ISTANBUL_TIME_ZONE,
        hour: '2-digit',
        minute: '2-digit',
      }).format(new Date())
      updateStatus.textContent = `Seyahatlerle senkron · Son güncelleme: ${time}`
    } catch {
      if (document.getElementById('profit-metrics') !== metricsContainer) return
      settingsContainer.innerHTML = ''
      metricsContainer.innerHTML = '<div class="empty"><div class="empty-icon">₺</div><div>Kâr/zarar verileri yüklenemedi.</div></div>'
      updateStatus.textContent = 'Bağlantı veya veri tabanı hatası'
    } finally {
      refreshInFlight = false
      if (document.getElementById('profit-refresh-btn') === refreshButton) refreshButton.disabled = false
    }
  }

  document.getElementById('new-btn').addEventListener('click', () => navigate('#new'))
  document.getElementById('logout-btn').addEventListener('click', async () => {
    await supabase.auth.signOut()
    navigate('#login')
  })

  document.querySelector('.timeline-tabs').addEventListener('click', event => {
    const tab = event.target.closest('[data-admin-view]')
    if (!tab || tab.dataset.adminView === 'profit-loss') return
    if (tab.dataset.adminView === 'budget') navigate('#budget')
    else navigate(tab.dataset.adminView === 'past' ? '#timeline?tab=past' : '#timeline')
  })

  document.querySelector('.budget-periods').addEventListener('click', event => {
    const button = event.target.closest('[data-period]')
    if (!button || button.dataset.period === selectedPeriod) return
    selectedPeriod = button.dataset.period
    document.querySelectorAll('[data-period]').forEach(periodButton => {
      periodButton.classList.toggle('active', periodButton === button)
    })
    renderReport()
  })

  refreshButton.addEventListener('click', refreshReport)
  await refreshReport()
}
