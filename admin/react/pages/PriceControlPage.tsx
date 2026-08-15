import { useCallback, useEffect, useMemo, useState, type FormEvent } from 'react'
import { Topbar } from '../components/AdminChrome'
import { fmtSyncTime, formatEuro } from '../lib/format'
import { supabase } from '../lib/supabase'
import type { Navigate } from '../types'
import { estimatePriceFromDistance, groupRoutesByDestination, nearestRoute } from '../../price-control-metrics.js'
import { locationLabel } from '../../turkish-formatters.js'

type RouteRow = { id: string; to_location: string; vehicle_type: 'vito' | 'vclass'; price_eur: number; distance_km: number; duration_min: number }
type RateRow = { vehicle_type: 'vito' | 'vclass'; daily_rate_eur: number; updated_at: string }
type RouteGroup = ReturnType<typeof groupRoutesByDestination>[number]

async function fetchRoutes(): Promise<RouteRow[]> {
  const { data, error } = await supabase.from('routes')
    .select('id, to_location, vehicle_type, price_eur, distance_km, duration_min')
    .eq('from_location', 'airport')
  if (error) throw error
  return (data ?? []) as RouteRow[]
}

async function fetchRates(): Promise<RateRow[]> {
  const { data, error } = await supabase.from('chauffeur_service_rates').select('vehicle_type, daily_rate_eur, updated_at')
  if (error) throw error
  return (data ?? []) as RateRow[]
}

function PriceCalculator({ routes }: { routes: RouteRow[] }) {
  const [km, setKm] = useState('')
  const distanceKm = Number(km.replace(',', '.'))
  const valid = km.trim() !== '' && Number.isFinite(distanceKm) && distanceKm > 0

  const result = useMemo(() => {
    if (!valid || !routes.length) return null
    return { estimate: estimatePriceFromDistance(routes, distanceKm), nearest: nearestRoute(routes, distanceKm) }
  }, [valid, distanceKm, routes])

  return (
    <section className="profit-settings price-calculator">
      <div className="profit-settings-heading"><div><span className="budget-section-kicker">HESAPLAMA ARACI</span><h2>KM'den fiyat hesapla</h2></div></div>
      <p>Mevcut rota fiyatlarından çıkarılan km başı ücrete göre, girdiğiniz mesafe için tahmini fiyat hesaplar. Yeni veya listede olmayan bir rota için fiyat belirlerken referans olarak kullanın.</p>
      <label className="profit-input-field price-km-field">
        <span>Tek yön mesafe</span>
        <div><input type="number" min="1" max="5000" step="1" inputMode="decimal" placeholder="Örn. 90" value={km} onChange={(e) => setKm(e.target.value)} /><b>km</b></div>
      </label>
      {result && (
        <div className="price-estimate-result">
          <div className="price-estimate-row"><span>Vito</span><strong>{result.estimate.vito == null ? '—' : formatEuro(result.estimate.vito)}</strong></div>
          <div className="price-estimate-row"><span>Sprinter</span><strong>{result.estimate.vclass == null ? '—' : formatEuro(result.estimate.vclass)}</strong></div>
          {result.nearest && (
            <small>En yakın mevcut rota: {locationLabel(result.nearest.destination)} · {result.nearest.distanceKm} km · Vito {result.nearest.vito ? formatEuro(result.nearest.vito.priceEur) : '—'} / Sprinter {result.nearest.vclass ? formatEuro(result.nearest.vclass.priceEur) : '—'}</small>
          )}
        </div>
      )}
    </section>
  )
}

function RoutePriceRow({ group, onSave }: { group: RouteGroup; onSave: (updates: Array<{ id: string; price: number }>) => Promise<void> }) {
  const [vito, setVito] = useState(String(group.vito?.priceEur ?? ''))
  const [sprinter, setSprinter] = useState(String(group.vclass?.priceEur ?? ''))
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    setVito(String(group.vito?.priceEur ?? ''))
    setSprinter(String(group.vclass?.priceEur ?? ''))
  }, [group.vito?.priceEur, group.vclass?.priceEur])

  const dirty = Number(vito) !== group.vito?.priceEur || Number(sprinter) !== group.vclass?.priceEur

  const submit = async (event: FormEvent) => {
    event.preventDefault()
    const vitoPrice = Number(vito.replace(',', '.'))
    const sprinterPrice = Number(sprinter.replace(',', '.'))
    setError(''); setSuccess(false)
    if (!Number.isFinite(vitoPrice) || vitoPrice <= 0 || !Number.isFinite(sprinterPrice) || sprinterPrice <= 0) {
      setError('Geçerli bir fiyat girin.')
      return
    }
    const updates: Array<{ id: string; price: number }> = []
    if (group.vito && vitoPrice !== group.vito.priceEur) updates.push({ id: group.vito.id, price: vitoPrice })
    if (group.vclass && sprinterPrice !== group.vclass.priceEur) updates.push({ id: group.vclass.id, price: sprinterPrice })
    if (!updates.length) return
    setSaving(true)
    try {
      await onSave(updates)
      setSuccess(true)
    } catch {
      setError('Fiyat kaydedilemedi, tekrar deneyin.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <form className="price-route-row" onSubmit={submit} noValidate>
      <div className="price-route-heading"><strong>{locationLabel(group.destination)}</strong><span>{group.distanceKm} km</span></div>
      <div className="price-route-fields">
        <label className="profit-input-field"><span>Vito</span><div><b>€</b><input type="number" min="1" step="1" inputMode="decimal" value={vito} onChange={(e) => { setVito(e.target.value); setSuccess(false) }} required /></div></label>
        <label className="profit-input-field"><span>Sprinter</span><div><b>€</b><input type="number" min="1" step="1" inputMode="decimal" value={sprinter} onChange={(e) => { setSprinter(e.target.value); setSuccess(false) }} required /></div></label>
        <button className="btn price-route-save" type="submit" disabled={saving || !dirty}>{saving ? 'Kaydediliyor…' : 'Kaydet'}</button>
      </div>
      {success && <div className="inline-success" role="status">Fiyat güncellendi · Site ve rezervasyon sistemi anında yansıtır.</div>}
      {error && <div className="inline-error" role="alert">{error}</div>}
    </form>
  )
}

function DailyRateForm({ rates, onSaved }: { rates: RateRow[]; onSaved: (rows: RateRow[]) => void }) {
  const vitoRate = rates.find((r) => r.vehicle_type === 'vito')
  const vclassRate = rates.find((r) => r.vehicle_type === 'vclass')
  const [vito, setVito] = useState(String(vitoRate?.daily_rate_eur ?? ''))
  const [sprinter, setSprinter] = useState(String(vclassRate?.daily_rate_eur ?? ''))
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    setVito(String(vitoRate?.daily_rate_eur ?? ''))
    setSprinter(String(vclassRate?.daily_rate_eur ?? ''))
  }, [vitoRate?.daily_rate_eur, vclassRate?.daily_rate_eur])

  const submit = async (event: FormEvent) => {
    event.preventDefault()
    const vitoPrice = Number(vito.replace(',', '.'))
    const sprinterPrice = Number(sprinter.replace(',', '.'))
    setError(''); setSuccess(false)
    if (!Number.isFinite(vitoPrice) || vitoPrice <= 0 || !Number.isFinite(sprinterPrice) || sprinterPrice <= 0) {
      setError('Geçerli bir günlük ücret girin.')
      return
    }
    setSaving(true)
    try {
      const updatedAt = new Date().toISOString()
      const { data, error: saveError } = await supabase.from('chauffeur_service_rates')
        .upsert([
          { vehicle_type: 'vito', daily_rate_eur: vitoPrice, updated_at: updatedAt },
          { vehicle_type: 'vclass', daily_rate_eur: sprinterPrice, updated_at: updatedAt },
        ], { onConflict: 'vehicle_type' })
        .select('vehicle_type, daily_rate_eur, updated_at')
      if (saveError) throw saveError
      onSaved((data ?? []) as RateRow[])
      setSuccess(true)
    } catch {
      setError('Ücret kaydedilemedi, tekrar deneyin.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <form className="profit-settings" onSubmit={submit} noValidate>
      <div className="profit-settings-heading"><div><span className="budget-section-kicker">GÜNLÜK ŞOFÖRLÜ ARAÇ</span><h2>Günlük kiralama ücreti</h2></div><span>Gün başı</span></div>
      <div className="profit-input-grid">
        <label className="profit-input-field"><span>Vito</span><div><b>€</b><input type="number" min="1" step="1" inputMode="decimal" value={vito} onChange={(e) => { setVito(e.target.value); setSuccess(false) }} required /></div></label>
        <label className="profit-input-field"><span>Sprinter</span><div><b>€</b><input type="number" min="1" step="1" inputMode="decimal" value={sprinter} onChange={(e) => { setSprinter(e.target.value); setSuccess(false) }} required /></div></label>
      </div>
      <button className="btn profit-save-button" type="submit" disabled={saving}>{saving ? 'Kaydediliyor…' : 'Ücreti kaydet'}</button>
      {success && <div className="inline-success" role="status">Günlük ücret güncellendi.</div>}
      {error && <div className="inline-error" role="alert">{error}</div>}
    </form>
  )
}

export default function PriceControlPage({ navigate }: { navigate: Navigate }) {
  const [routes, setRoutes] = useState<RouteRow[]>([])
  const [rates, setRates] = useState<RateRow[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [status, setStatus] = useState('Yükleniyor…')

  const refresh = useCallback(async () => {
    setLoading(true); setError(false); setStatus('Fiyatlar yenileniyor…')
    try {
      const [nextRoutes, nextRates] = await Promise.all([fetchRoutes(), fetchRates()])
      setRoutes(nextRoutes); setRates(nextRates)
      setStatus(`Canlı fiyatlarla senkron · Son güncelleme: ${fmtSyncTime()}`)
    } catch {
      setError(true); setStatus('Bağlantı veya veri tabanı hatası')
    } finally {
      setLoading(false)
    }
  }, [])
  useEffect(() => { void refresh() }, [refresh])

  const groups = useMemo(() => groupRoutesByDestination(routes), [routes])

  const saveRoutePrices = async (updates: Array<{ id: string; price: number }>) => {
    for (const update of updates) {
      const { error: saveError } = await supabase.from('routes').update({ price_eur: update.price }).eq('id', update.id)
      if (saveError) throw saveError
    }
    setRoutes((current) => current.map((row) => {
      const match = updates.find((update) => update.id === row.id)
      return match ? { ...row, price_eur: match.price } : row
    }))
    setStatus(`Fiyat güncellendi · Son güncelleme: ${fmtSyncTime()}`)
  }

  return <>
    <Topbar navigate={navigate} title="Fiyat Kontrol Merkezi" back="#admin" />
    <div className="budget-toolbar">
      <div className="budget-update-status">{status}</div>
      <button className="sync-button" type="button" aria-label="Fiyatları yenile" disabled={loading} onClick={() => void refresh()}>↻</button>
    </div>
    <main className="scroll-area budget-content profit-content">
      {error ? (
        <div className="empty"><div className="empty-icon">€</div><div>Fiyatlar yüklenemedi.</div></div>
      ) : loading && !routes.length ? (
        <div className="empty"><div>Fiyatlar yükleniyor…</div></div>
      ) : <>
        <p className="price-control-intro">Buradan güncellediğiniz fiyatlar, kaydettiğiniz anda hem rezervasyon sisteminde (backend) hem de sitedeki canlı fiyat teklifinde kullanılır. Statik tanıtım sayfalarındaki kampanya fiyatları bir sonraki site yayınında güncellenir.</p>
        <PriceCalculator routes={routes} />
        <DailyRateForm rates={rates} onSaved={(rows) => setRates((current) => {
          const next = [...current]
          for (const row of rows) {
            const index = next.findIndex((r) => r.vehicle_type === row.vehicle_type)
            if (index === -1) next.push(row); else next[index] = row
          }
          return next
        })} />
        <section className="budget-section price-routes-section">
          <div className="budget-section-heading"><div><span className="budget-section-kicker">TRANSFER FİYATLARI</span><h2>Havalimanı rotaları</h2></div><span>{groups.length} rota</span></div>
          {groups.map((group) => <RoutePriceRow key={group.destination} group={group} onSave={saveRoutePrices} />)}
        </section>
      </>}
    </main>
  </>
}
