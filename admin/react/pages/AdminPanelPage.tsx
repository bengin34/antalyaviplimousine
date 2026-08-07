import { useState } from 'react'
import { Topbar } from '../components/AdminChrome'
import { supabase } from '../lib/supabase'
import { todayISO } from '../lib/format'
import type { Navigate } from '../types'

function toE164(phone: unknown) {
  const raw = String(phone ?? '').trim()
  const hadPlus = raw.startsWith('+')
  let digits = raw.replace(/\D/g, '')
  if (!digits) return ''
  if (digits.startsWith('00')) digits = digits.slice(2)
  else if (!hadPlus) {
    if (digits.startsWith('0')) digits = `90${digits.slice(1)}`
    else if (/^5\d{9}$/.test(digits)) digits = `90${digits}`
  }
  return `+${digits}`
}

function csvCell(value: unknown) {
  const string = String(value ?? '')
  return /[",\n\r]/.test(string) ? `"${string.replaceAll('"', '""')}"` : string
}

export function buildCustomerMatchCsv(bookings: Array<Record<string, unknown>>) {
  const rows: string[] = []
  const seen = new Set<string>()
  for (const booking of bookings) {
    const email = String(booking.customer_email ?? '').trim().toLowerCase()
    const phone = toE164(booking.customer_phone)
    if (!email && !phone) continue
    const key = `${email}|${phone}`
    if (seen.has(key)) continue
    seen.add(key)
    const parts = String(booking.customer_name ?? '').trim().split(/\s+/).filter(Boolean)
    const first = parts[0] ?? ''
    const last = parts.slice(1).join(' ')
    rows.push([email, phone, first, last, '', ''].map(csvCell).join(','))
  }
  return { csv: [['Email', 'Phone Number', 'First Name', 'Last Name', 'Country', 'Zip'].join(','), ...rows].join('\r\n'), count: rows.length }
}

function downloadCsv(csv: string, filename: string) {
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = filename
  document.body.appendChild(anchor)
  anchor.click()
  anchor.remove()
  URL.revokeObjectURL(url)
}

export default function AdminPanelPage({ navigate }: { navigate: Navigate }) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const download = async () => {
    setLoading(true); setError(''); setSuccess('')
    const { data, error: fetchError } = await supabase.from('bookings').select('customer_name, customer_email, customer_phone')
    setLoading(false)
    if (fetchError) return setError('Liste alınamadı, tekrar deneyin.')
    const result = buildCustomerMatchCsv(data ?? [])
    if (!result.count) return setError('Dışa aktarılacak müşteri bulunamadı.')
    downloadCsv(result.csv, `google-ads-musteriler-${todayISO()}.csv`)
    setSuccess(`${result.count} müşteri indirildi.`)
  }

  return <>
    <Topbar navigate={navigate} title="Yönetici Paneli" back="#timeline" />
    <div className="scroll-area">
      <div className="section">
        <div className="section-label">Pazarlama</div>
        <div style={{ fontWeight: 600, marginBottom: 4 }}>Google Ads müşteri listesi</div>
        <div style={{ color: 'var(--text-muted)', fontSize: 13, lineHeight: 1.5, marginBottom: 12 }}>
          Tüm rezervasyonlardaki müşterilerin e-posta ve telefon bilgilerini, Google Ads Müşteri Eşleştirme
          (Customer Match) formatında bir CSV dosyası olarak indirir. Tekrar eden kayıtlar ayıklanır,
          telefonlar uluslararası biçime (+90…) çevrilir. Dosyayı Google Ads → Kitle yöneticisi →
          Müşteri listeleri bölümünden yükleyebilirsiniz.
        </div>
        <button className="btn" type="button" disabled={loading} onClick={download}>{loading ? 'Hazırlanıyor…' : 'Google Ads listesini indir'}</button>
        <div className="inline-success" role="status">{success}</div>
        <div className="inline-error">{error}</div>
      </div>
    </div>
  </>
}
