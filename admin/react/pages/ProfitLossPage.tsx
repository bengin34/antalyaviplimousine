import { useCallback, useEffect, useMemo, useState, type FormEvent } from 'react'
import { AdminTabs, Topbar } from '../components/AdminChrome'
import { fmtSyncTime, formatEuro, formatNumber, formatTry, monthLabel, monthRange, todayISO } from '../lib/format'
import { supabase } from '../lib/supabase'
import type { Booking, Navigate } from '../types'
import { calculateProfitLossMetrics, DEFAULT_EUR_TRY_RATE, DEFAULT_KM_COST_TRY } from '../../profit-loss-metrics.js'
import { locationLabel } from '../../turkish-formatters.js'

const PAGE_SIZE = 1000
const FIRST_PROFIT_MONTH = '2026-07'

type SettingsMap = Map<string, any>

async function fetchAllBookings() {
  const bookings: Booking[] = []
  for (let from = 0; ; from += PAGE_SIZE) {
    const { data, error } = await supabase.from('bookings')
      .select('id, booking_ref, customer_name, pickup_location, dropoff_location, pickup_date, return_date, trip_type, price_eur, status, created_at')
      .order('created_at', { ascending: true }).range(from, from + PAGE_SIZE - 1)
    if (error) throw error
    const rows = (data ?? []) as Booking[]
    bookings.push(...rows)
    if (rows.length < PAGE_SIZE) return bookings
  }
}

async function fetchSettings() {
  const { data, error } = await supabase.from('profit_loss_settings')
    .select('period_month, km_cost_try, advertising_expense_try, eur_try_rate, updated_at').order('period_month')
  if (error) throw error
  return new Map((data ?? []).map((setting: any) => [setting.period_month.slice(0, 7), setting]))
}

function settingValues(setting: any = {}) {
  const kmCost = Number(setting.km_cost_try)
  const advertising = Number(setting.advertising_expense_try)
  const rate = Number(setting.eur_try_rate)
  return {
    kmCostTry: Number.isFinite(kmCost) && kmCost > 0 ? kmCost : DEFAULT_KM_COST_TRY,
    advertisingExpenseTry: Number.isFinite(advertising) && advertising >= 0 ? advertising : 0,
    eurTryRate: Number.isFinite(rate) && rate > 0 ? rate : DEFAULT_EUR_TRY_RATE,
  }
}

function SettingsForm({ period, settings, onSaved }: { period: string; settings: SettingsMap; onSaved: (month: string, value: any) => void }) {
  const setting = settings.get(period)
  const values = settingValues(setting)
  const [kmCost, setKmCost] = useState(String(values.kmCostTry))
  const [rate, setRate] = useState(String(values.eurTryRate))
  const [advertising, setAdvertising] = useState(String(values.advertisingExpenseTry))
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    const next = settingValues(setting)
    setKmCost(String(next.kmCostTry))
    setRate(String(next.eurTryRate))
    setAdvertising(String(next.advertisingExpenseTry))
  }, [setting])

  const submit = async (event: FormEvent) => {
    event.preventDefault()
    const km = Number(kmCost.replace(',', '.'))
    const exchange = Number(rate.replace(',', '.'))
    const ads = Number(advertising.replace(',', '.'))
    setError(''); setSuccess('')
    if (!Number.isFinite(km) || km <= 0 || km > 10000) return setError('Geçerli bir km maliyeti girin.')
    if (!Number.isFinite(exchange) || exchange <= 0 || exchange > 10000) return setError('Geçerli bir EUR/TL kuru girin.')
    if (!Number.isFinite(ads) || ads < 0 || ads > 1_000_000_000) return setError('Geçerli bir reklam gideri girin.')
    setSaving(true)
    const payload = { period_month: `${period}-01`, km_cost_try: km, advertising_expense_try: ads, eur_try_rate: exchange, updated_at: new Date().toISOString() }
    const { data, error: saveError } = await supabase.from('profit_loss_settings').upsert(payload, { onConflict: 'period_month' }).select().single()
    setSaving(false)
    if (saveError) return setError('Ayarlar kaydedilemedi, tekrar deneyin.')
    onSaved(period, data); setSuccess('Ayarlar kaydedildi, hesap güncellendi.')
  }

  return <form className="profit-settings" noValidate onSubmit={submit}>
    <div className="profit-settings-heading"><div><span className="budget-section-kicker">HESAPLAMA AYARLARI</span><h2>{monthLabel(period)}</h2></div><span>Aylık</span></div>
    <div className="profit-input-grid">
      <label className="profit-input-field"><span>KM başı maliyet</span><div><b>₺</b><input type="number" min="0.01" max="10000" step="0.01" inputMode="decimal" value={kmCost} onChange={e => setKmCost(e.target.value)} required /></div><small>Boşsa varsayılan 15 ₺/km</small></label>
      <label className="profit-input-field"><span>EUR/TL kuru</span><div><b>₺</b><input type="number" min="0.01" max="10000" step="0.0001" inputMode="decimal" value={rate} onChange={e => setRate(e.target.value)} required /></div><small>1 € karşılığı</small></label>
      <label className="profit-input-field profit-input-wide"><span>Reklam gideri</span><div><b>₺</b><input type="number" min="0" max="1000000000" step="0.01" inputMode="decimal" value={advertising} onChange={e => setAdvertising(e.target.value)} required /></div><small>Bu aya ait toplam reklam harcaması</small></label>
    </div>
    <button className="btn profit-save-button" type="submit" disabled={saving}>{saving ? 'Kaydediliyor…' : 'Ayarları kaydet ve hesapla'}</button>
    <div className="inline-success" role="status">{success}</div><div className="inline-error">{error}</div>
  </form>
}

function ProfitMetrics({ metrics, period }: { metrics: any; period: string }) {
  const negative = metrics.netProfitTry < 0
  const formulaOperator = negative ? 'Zarar' : 'Net kâr'
  return <>
    <section className={`profit-hero ${negative ? 'is-negative' : 'is-positive'}`} aria-label={formulaOperator}><div className="budget-eyebrow">{period === 'all' ? 'Tüm zamanlar' : monthLabel(period)} · {formulaOperator}</div><div className="profit-total">{formatTry(metrics.netProfitTry)}</div><div className="profit-total-eur">{formatEuro(metrics.netProfitEur)}</div><div className="profit-margin"><span>Kâr marjı</span><strong>%{formatNumber(metrics.profitMargin, 1)}</strong></div></section>
    <section className="profit-formula" aria-label="Kâr hesaplama özeti"><span><small>Gelir</small><strong>{formatTry(metrics.incomeTry)}</strong></span><i>−</i><span><small>Araç</small><strong>{formatTry(metrics.vehicleCostTry)}</strong></span><i>−</i><span><small>Reklam</small><strong>{formatTry(metrics.advertisingExpenseTry)}</strong></span></section>
    <section className="budget-kpi-grid profit-kpi-grid" aria-label="Kâr zarar özeti">
      <article className="budget-kpi profit-income-kpi"><span className="budget-kpi-icon" aria-hidden="true">€</span><span className="budget-kpi-label">Seyahat geliri</span><strong>{formatEuro(metrics.incomeEur)}</strong><small>{formatTry(metrics.incomeTry)} · yalnızca tamamlanan seferler</small></article>
      <article className="budget-kpi profit-distance-kpi"><span className="budget-kpi-icon" aria-hidden="true">KM</span><span className="budget-kpi-label">Toplam araç KM</span><strong>{formatNumber(metrics.vehicleKm)} km</strong><small>{formatNumber(metrics.passengerKm)} km yolculu + aynı mesafe boş dönüş</small></article>
      <article className="budget-kpi"><span className="budget-kpi-icon" aria-hidden="true">₺</span><span className="budget-kpi-label">Araç maliyeti</span><strong>{formatTry(metrics.vehicleCostTry)}</strong><small>Toplam araç KM × ayın km maliyeti</small></article>
      <article className="budget-kpi"><span className="budget-kpi-icon" aria-hidden="true">↗</span><span className="budget-kpi-label">Reklam gideri</span><strong>{formatTry(metrics.advertisingExpenseTry)}</strong><small>Manuel girilen aylık reklam toplamı</small></article>
    </section>
    {metrics.unresolvedLegs.length > 0 && <section className="profit-warning" role="status"><strong>⚠ {metrics.unresolvedLegs.length} seferin sabit mesafesi bulunamadı</strong><p>Özel adres veya genel “Otel” rotalarının geliri dahil edildi; araç kilometresi ve maliyeti net kâra eklenemedi.</p><ul>{metrics.unresolvedLegs.slice(0, 5).map((leg: any, index: number) => <li key={`${leg.bookingRef}-${index}`}><span>{leg.bookingRef || leg.customerName || 'Kayıt'}</span><small>{locationLabel(leg.from)} → {locationLabel(leg.to)}</small></li>)}</ul>{metrics.unresolvedLegs.length > 5 && <p>+ {metrics.unresolvedLegs.length - 5} rota daha</p>}</section>}
    <section className="budget-section profit-routes"><div className="budget-section-heading"><div><span className="budget-section-kicker">ROTA DÖKÜMÜ</span><h2>Seyahatlerden gelen hesap</h2></div><span>{metrics.completedLegs} sefer</span></div>{metrics.routes.length ? metrics.routes.map((route: any) => <div className="profit-route-row" key={route.routeKey}><div className="profit-route-heading"><strong>{locationLabel(route.from)} ↔ {locationLabel(route.to)}</strong><span>{route.legCount} sefer</span></div><div className="profit-route-metrics"><span><small>Araç KM</small><b>{formatNumber(route.vehicleKm)} km</b></span><span><small>Gelir</small><b>{formatEuro(route.incomeEur)}</b></span><span><small>Araç maliyeti</small><b>{formatTry(route.vehicleCostTry)}</b></span></div></div>) : <div className="travel-history-empty">Seçilen dönemde tamamlanmış ve sabit mesafesi bulunan sefer yok.</div>}</section>
    <p className="budget-footnote profit-footnote">İptal edilen ve henüz gerçekleşmemiş seferler hesaba katılmaz. Gidiş-dönüş fiyatı iki seyahat ayağına eşit bölünür. Her ayakta aracın yolculu mesafesine aynı uzunlukta boş dönüş eklenir. KM değerleri sabit yaklaşık rota tablosundan gelir; canlı harita hesabı yapılmaz.</p>
  </>
}

export default function ProfitLossPage({ navigate }: { navigate: Navigate }) {
  const today = useMemo(todayISO, [])
  const months = useMemo(() => monthRange(FIRST_PROFIT_MONTH, today.slice(0, 7)), [today])
  const [period, setPeriod] = useState(today.slice(0, 7))
  const [bookings, setBookings] = useState<Booking[]>([])
  const [settings, setSettings] = useState<SettingsMap>(new Map())
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [status, setStatus] = useState('Yükleniyor…')
  const refresh = useCallback(async () => {
    setLoading(true); setError(false); setStatus('Seyahatler ve ayarlar yenileniyor…')
    try {
      const [nextBookings, nextSettings] = await Promise.all([fetchAllBookings(), fetchSettings()])
      setBookings(nextBookings); setSettings(nextSettings); setStatus(`Seyahatlerle senkron · Son güncelleme: ${fmtSyncTime()}`)
    } catch { setError(true); setStatus('Bağlantı veya veri tabanı hatası') }
    finally { setLoading(false) }
  }, [])
  useEffect(() => { void refresh() }, [refresh])
  const metrics = useMemo(() => calculateProfitLossMetrics(bookings, period, today, settings), [bookings, period, settings, today])
  const saveSetting = (month: string, value: any) => setSettings(current => new Map(current).set(month, value))
  return <><Topbar navigate={navigate} /><AdminTabs active="profit-loss" navigate={navigate} />
    <div className="budget-toolbar profit-toolbar"><div className="budget-periods" role="group" aria-label="Kâr zarar dönemi">{[...months, 'all'].map(value => <button type="button" key={value} className={period === value ? 'active' : ''} onClick={() => setPeriod(value)}>{value === 'all' ? 'Tümü' : monthLabel(value, { short: true })}</button>)}</div><button className="sync-button" type="button" aria-label="Kâr zarar verilerini yenile" disabled={loading} onClick={() => void refresh()}>↻</button></div>
    <div className="budget-update-status">{status}</div>
    <main className="scroll-area budget-content profit-content">
      {error ? <div className="empty"><div className="empty-icon">₺</div><div>Kâr/zarar verileri yüklenemedi.</div></div> : loading && !bookings.length ? <><div className="empty"><div>Ayarlar yükleniyor…</div></div><div className="empty"><div>Hesaplanıyor…</div></div></> : <>{period === 'all' ? <section className="profit-settings profit-settings-summary"><div><span className="budget-section-kicker">HESAPLAMA AYARLARI</span><h2>Aylık değerler uygulanıyor</h2><p>Tümü görünümünde her aya kaydettiğiniz km maliyeti, reklam gideri ve kur ayrı ayrı kullanılır.</p></div></section> : <SettingsForm key={period} period={period} settings={settings} onSaved={saveSetting} />}<ProfitMetrics metrics={metrics} period={period} /></>}
    </main>
  </>
}
