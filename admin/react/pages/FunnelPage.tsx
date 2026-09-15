import { useCallback, useEffect, useMemo, useState } from 'react'
import { AdminTabs, Topbar } from '../components/AdminChrome'
import { fmtSyncTime, formatEuro, formatNumber } from '../lib/format'
import {
  buildFunnel,
  CONTACT_LABELS,
  formatRate,
  SOURCE_LABELS,
  sourceRevenue,
  type FunnelSummary,
} from '../lib/funnel'
import { supabase } from '../lib/supabase'
import type { Navigate } from '../types'

const PERIODS: Array<[number, string]> = [[7, '7 gün'], [30, '30 gün'], [90, '90 gün']]

const EMPTY: FunnelSummary = {
  days: 30, funnel: [], abandoned: [], unavailable: [], contact: [], flight_failures: 0, sources: [],
}

async function fetchSummary(days: number): Promise<FunnelSummary> {
  const { data, error } = await supabase.rpc('site_funnel_summary', { p_days: days })
  if (error) throw error
  return { ...EMPTY, ...(data as Partial<FunnelSummary> | null) }
}

function FunnelSteps({ summary }: { summary: FunnelSummary }) {
  const steps = buildFunnel(summary)
  const top = steps[0].sessions

  return (
    <section className="budget-section">
      <div className="budget-section-heading">
        <div><span className="budget-section-kicker">HUNİ</span><h2>Ziyaretten rezervasyona</h2></div>
        <span>{formatNumber(top)} ziyaretçi</span>
      </div>
      {steps.map(step => (
        <div className="travel-history-row" key={step.event}>
          <div className="travel-history-heading">
            <span>{step.label}</span>
            <strong>{formatNumber(step.sessions)} <small>ziyaretçi</small></strong>
          </div>
          <div
            className="travel-history-bar"
            aria-label={`${step.label}: ${step.sessions} ziyaretçi, girenlerin ${formatRate(step.shareOfTop)} kadarı`}
          >
            <span style={{ width: `${(step.shareOfTop ?? 0) * 100}%` }} />
          </div>
          <div className="budget-payment-meta">
            {step.hint} · Girenlerin {formatRate(step.shareOfTop)}&apos;i
            {step.stepRate !== null && <> · Bir önceki adımdan geçiş {formatRate(step.stepRate)}</>}
          </div>
        </div>
      ))}
    </section>
  )
}

function SourceTable({ summary }: { summary: FunnelSummary }) {
  const { rows, totalRevenue, totalBookings } = sourceRevenue(summary)

  return (
    <section className="budget-section">
      <div className="budget-section-heading">
        <div><span className="budget-section-kicker">KAYNAK</span><h2>Hangi kanal ne kadar ciro getirdi</h2></div>
        <span>{formatEuro(totalRevenue)}</span>
      </div>
      {rows.length ? rows.map(row => (
        <div className="travel-history-row" key={row.source}>
          <div className="travel-history-heading">
            <span>{SOURCE_LABELS[row.source] ?? row.source}</span>
            <strong>{formatEuro(row.revenue)}</strong>
          </div>
          <div className="travel-history-bar" aria-label={`${row.source}: ${formatEuro(row.revenue)}`}>
            <span style={{ width: `${(row.share ?? 0) * 100}%` }} />
          </div>
          <div className="budget-payment-meta">{row.bookings} rezervasyon · Cironun {formatRate(row.share)}&apos;i</div>
        </div>
      )) : <div className="travel-history-empty">Bu dönemde rezervasyon yok.</div>}
      <p className="budget-footnote">
        Bu bölüm rezervasyon kayıtlarından gelir, ölçüm olaylarından değil — reklam engelleyici bir
        ziyaretçinin olayları düşebilir ama rezervasyonu düşmez. Toplam {totalBookings} rezervasyon,
        iptaller hariç. “Doğrudan / bilinmiyor”, kampanya parametresi olmadan gelen ziyaretleri kapsar.
      </p>
    </section>
  )
}

function Leaks({ summary }: { summary: FunnelSummary }) {
  return (
    <section className="budget-section">
      <div className="budget-section-heading">
        <div><span className="budget-section-kicker">KAYIPLAR</span><h2>Nerede kaybediyoruz</h2></div>
      </div>

      <div className="budget-section-heading"><div><h2>Formu yarıda bırakma</h2></div></div>
      {summary.abandoned.length ? (
        <div className="budget-status-grid">
          {summary.abandoned.map(row => (
            <div className="budget-status-row" key={row.step}>
              <span>{row.step}. adımda bıraktı</span>
              <strong>{formatNumber(row.sessions)}</strong>
            </div>
          ))}
        </div>
      ) : <div className="travel-history-empty">Bu dönemde yarıda bırakma kaydı yok.</div>}

      <div className="budget-section-heading"><div><h2>Fiyat verilemeyen rotalar</h2></div></div>
      {summary.unavailable.length ? (
        <div className="budget-status-grid">
          {summary.unavailable.map(row => (
            <div className="budget-status-row" key={row.route}>
              <span>{row.route}</span>
              <strong>{formatNumber(row.sessions)}</strong>
            </div>
          ))}
        </div>
      ) : <div className="travel-history-empty">Her seçilen rota fiyat döndürdü.</div>}
      <p className="budget-footnote">
        Fiyat verilemeyen rota, müşterinin istediği ama sitenin karşılık veremediği transferdir —
        doğrudan kaçan taleptir. Listede tekrar eden bir rota varsa fiyat tablosuna eklenmeli.
      </p>
    </section>
  )
}

export default function FunnelPage({ navigate }: { navigate: Navigate }) {
  const [days, setDays] = useState(30)
  const [summary, setSummary] = useState<FunnelSummary | null>(null)
  const [loading, setLoading] = useState(true)
  const [status, setStatus] = useState('Yükleniyor…')
  const [error, setError] = useState(false)

  const refresh = useCallback(async () => {
    setLoading(true); setStatus('Veriler yenileniyor…'); setError(false)
    try {
      setSummary(await fetchSummary(days)); setStatus(`Son güncelleme: ${fmtSyncTime()}`)
    } catch { setError(true); setStatus('Bağlantı hatası') }
    finally { setLoading(false) }
  }, [days])

  useEffect(() => { void refresh() }, [refresh])

  const contact = useMemo(
    () => summary?.contact.map(row => ({ ...row, label: CONTACT_LABELS[row.event] ?? row.event })) ?? [],
    [summary],
  )

  return <><Topbar navigate={navigate} /><AdminTabs active="funnel" navigate={navigate} />
    <div className="budget-toolbar">
      <div className="budget-periods" role="group" aria-label="Rapor dönemi">
        {PERIODS.map(([value, label]) => (
          <button key={value} type="button" className={days === value ? 'active' : ''} onClick={() => setDays(value)}>{label}</button>
        ))}
      </div>
      <div className="budget-toolbar-actions">
        <button className="sync-button" type="button" aria-label="Huni verilerini yenile" disabled={loading} onClick={() => void refresh()}>↻</button>
      </div>
    </div>
    <div className="budget-update-status">{status}</div>
    <main className="scroll-area budget-content">
      {error ? (
        <div className="empty">
          <div className="empty-icon">📊</div>
          <div>Huni verileri yüklenemedi.</div>
          <div className="budget-payment-meta">Ölçüm tabloları henüz canlıya alınmamış olabilir.</div>
        </div>
      ) : !summary ? (
        <div className="empty"><div>Hesaplanıyor…</div></div>
      ) : <>
        <section className="budget-kpi-grid" aria-label="Dönem özeti">
          {contact.map(row => (
            <article className="budget-kpi" key={row.event}>
              <span className="budget-kpi-icon" aria-hidden="true">☎</span>
              <span className="budget-kpi-label">{row.label} tıklaması</span>
              <strong>{formatNumber(row.events)}</strong>
              <small>Formu doldurmadan doğrudan iletişim</small>
            </article>
          ))}
          <article className="budget-kpi">
            <span className="budget-kpi-icon" aria-hidden="true">✈</span>
            <span className="budget-kpi-label">Uçuş doğrulanamadı</span>
            <strong>{formatNumber(summary.flight_failures)}</strong>
            <small>Girilen uçuş numarası tarifede bulunamadı</small>
          </article>
        </section>
        <FunnelSteps summary={summary} />
        <Leaks summary={summary} />
        <SourceTable summary={summary} />
      </>}
    </main>
  </>
}
