import { supabase } from './supabase-client.js'

function todayISO() {
  return new Intl.DateTimeFormat('sv', { timeZone: 'Europe/Istanbul' }).format(new Date())
}

// Normalise a stored phone number to E.164 (+country…) for Google Ads Customer
// Match. Mirrors the WhatsApp normalisation already used in the admin panel:
// public bookings were validated as international numbers, and Turkish local
// formats (0xxx / bare 5xxxxxxxxx) are assumed to be +90.
function toE164(phone) {
  const raw = String(phone ?? '').trim()
  const hadPlus = raw.startsWith('+')
  let digits = raw.replace(/\D/g, '')
  if (!digits) return ''

  if (digits.startsWith('00')) {
    digits = digits.slice(2)
  } else if (!hadPlus) {
    if (digits.startsWith('0')) digits = `90${digits.slice(1)}`
    else if (/^5\d{9}$/.test(digits)) digits = `90${digits}`
  }

  return `+${digits}`
}

function splitName(fullName) {
  const parts = String(fullName ?? '').trim().split(/\s+/).filter(Boolean)
  if (parts.length === 0) return { first: '', last: '' }
  if (parts.length === 1) return { first: parts[0], last: '' }
  return { first: parts[0], last: parts.slice(1).join(' ') }
}

function csvCell(value) {
  const s = String(value ?? '')
  return /[",\n\r]/.test(s) ? `"${s.replaceAll('"', '""')}"` : s
}

function buildCsv(bookings) {
  const header = ['Email', 'Phone Number', 'First Name', 'Last Name', 'Country', 'Zip']
  const seen = new Set()
  const rows = []

  for (const b of bookings) {
    const email = String(b.customer_email ?? '').trim().toLowerCase()
    const phone = toE164(b.customer_phone)
    if (!email && !phone) continue

    const key = `${email}|${phone}`
    if (seen.has(key)) continue
    seen.add(key)

    const { first, last } = splitName(b.customer_name)
    rows.push([email, phone, first, last, '', ''].map(csvCell).join(','))
  }

  return { csv: [header.join(','), ...rows].join('\r\n'), count: rows.length }
}

function downloadCsv(csv, filename) {
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  a.remove()
  URL.revokeObjectURL(url)
}

export function renderAdminPanel(container, navigate) {
  container.innerHTML = `
    <div class="topbar">
      <button class="detail-back" id="back-btn">← Geri</button>
      <span class="topbar-title">Yönetici Paneli</span>
      <span></span>
    </div>
    <div class="scroll-area">
      <div class="section">
        <div class="section-label">Pazarlama</div>
        <div style="font-weight:600;margin-bottom:4px">Google Ads müşteri listesi</div>
        <div style="color:var(--text-muted);font-size:13px;line-height:1.5;margin-bottom:12px">
          Tüm rezervasyonlardaki müşterilerin e-posta ve telefon bilgilerini,
          Google Ads Müşteri Eşleştirme (Customer Match) formatında bir CSV
          dosyası olarak indirir. Tekrar eden kayıtlar ayıklanır, telefonlar
          uluslararası biçime (+90…) çevrilir. Dosyayı Google Ads → Kitle
          yöneticisi → Müşteri listeleri bölümünden yükleyebilirsiniz.
        </div>
        <button class="btn" id="google-ads-btn" type="button">Google Ads listesini indir</button>
        <div class="inline-success" id="google-ads-status" role="status"></div>
        <div class="inline-error" id="google-ads-error"></div>
      </div>
    </div>
  `

  document.getElementById('back-btn').addEventListener('click', () => navigate('#timeline'))

  const btn = document.getElementById('google-ads-btn')
  const statusEl = document.getElementById('google-ads-status')
  const errorEl = document.getElementById('google-ads-error')

  btn.addEventListener('click', async () => {
    btn.disabled = true
    btn.textContent = 'Hazırlanıyor…'
    statusEl.textContent = ''
    errorEl.textContent = ''

    const { data, error } = await supabase
      .from('bookings')
      .select('customer_name, customer_email, customer_phone')

    btn.disabled = false
    btn.textContent = 'Google Ads listesini indir'

    if (error) {
      errorEl.textContent = 'Liste alınamadı, tekrar deneyin.'
      return
    }

    const { csv, count } = buildCsv(data ?? [])

    if (count === 0) {
      errorEl.textContent = 'Dışa aktarılacak müşteri bulunamadı.'
      return
    }

    downloadCsv(csv, `google-ads-musteriler-${todayISO()}.csv`)
    statusEl.textContent = `${count} müşteri indirildi.`
  })
}
