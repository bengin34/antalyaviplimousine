import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { AdminTabs, Topbar } from '../components/AdminChrome'
import { fmtPrice, fmtShortDateWithWeekday, fmtSyncTime, fmtTime, statusLabel, todayISO, transferStartTime } from '../lib/format'
import { supabase } from '../lib/supabase'
import type { Booking, Navigate } from '../types'
import { locationDisplay } from '../../turkish-formatters.js'
import {
  customerMessageLanguage, inboxStage, INBOX_STATUSES, isAwaitingConfirmation, markCustomerMessageSent,
  sendCustomerMessage, waitingSince, type CustomerMessageKind,
} from '../lib/customer-messages'

const AUTO_REFRESH_MS = 30_000
const BASE_TITLE = typeof document !== 'undefined' ? document.title : ''

type ActionState = { ref: string; kind: CustomerMessageKind | 'dismiss' } | null

function InboxCard({ booking, now, busy, onSend, onDismiss, navigate }: {
  booking: Booking; now: Date; busy: ActionState
  onSend: (booking: Booking, kind: CustomerMessageKind) => void
  onDismiss: (booking: Booking) => void
  navigate: Navigate
}) {
  const stage = inboxStage(booking)
  const isDaily = booking.trip_type === 'daily_chauffeur'
  const roundTrip = booking.trip_type === 'round_trip'
  const pickup = locationDisplay(booking.pickup_location, booking.pickup_address)
  const dropoff = isDaily ? 'Esnek güzergâh' : locationDisplay(booking.dropoff_location, booking.dropoff_address)
  const time = transferStartTime(booking.pickup_location, booking.pickup_time, booking.flight_arrival_time)
  const isBusy = (kind: CustomerMessageKind | 'dismiss') => busy?.ref === booking.booking_ref && busy.kind === kind
  const anyBusy = busy?.ref === booking.booking_ref
  const hotel = String(booking.hotel_name ?? '').trim()
  const open = () => navigate(`#detail/${encodeURIComponent(booking.booking_ref)}?from=inbox`)

  return <div className={`card inbox-card inbox-stage-${stage}`} data-ref={booking.booking_ref}>
    <div className="inbox-card-head">
      <span className="inbox-arrived"><span aria-hidden="true">🕒</span> {waitingSince(booking.created_at, now)} geldi</span>
      <span className="card-badges">
        <span className={`badge badge-${booking.status}`}>{statusLabel(booking.status, roundTrip)}</span>
        {roundTrip && <span className="badge badge-outbound">GİDİŞ-DÖNÜŞ</span>}
        {isDaily && <span className="badge badge-daily">GÜNLÜK</span>}
      </span>
    </div>
    <div className="inbox-customer">
      <strong>{booking.customer_name}</strong>
      <a href={`tel:${booking.customer_phone}`}>{booking.customer_phone}</a>
      <span className="inbox-lang">{customerMessageLanguage(booking).toUpperCase()}</span>
    </div>
    <div className="inbox-trip">
      <div><span className="inbox-label">Transfer</span>{fmtShortDateWithWeekday(booking.pickup_date)} · {fmtTime(time) || 'saat yok'}{roundTrip && booking.return_date ? ` → dönüş ${fmtShortDateWithWeekday(booking.return_date)} ${fmtTime(booking.return_pickup_time)}` : ''}{isDaily && booking.service_end_date ? ` → ${fmtShortDateWithWeekday(booking.service_end_date)}` : ''}</div>
      <div><span className="inbox-label">Güzergâh</span>{pickup} → {dropoff}</div>
      <div><span className="inbox-label">Detay</span>{booking.guests} kişi · {booking.vehicle_type === 'vclass' ? 'V-Class' : 'Vito'} · €{fmtPrice(booking.price_eur)} · {booking.payment_method === 'cash' ? 'Nakit' : 'Kart'}{booking.flight_number ? ` · ✈ ${booking.flight_number}` : ''}</div>
      {hotel && hotel.toLocaleLowerCase('tr-TR') !== 'belirtilmedi' && <div><span className="inbox-label">Otel</span>{hotel}</div>}
      {booking.notes && <div className="inbox-note">📌 {booking.notes}</div>}
    </div>
    <div className="inbox-progress" aria-label="Karşılama adımları">
      <span className={booking.check_message_sent_at ? 'done' : 'todo'}>{booking.check_message_sent_at ? '✓' : '1'} Kontrol mesajı</span>
      <span className="todo">2 Onay mesajı</span>
    </div>
    <div className="inbox-actions">
      {stage === 'check'
        ? <button className="inbox-send primary" type="button" disabled={anyBusy} onClick={() => onSend(booking, 'check')}>{isBusy('check') ? 'Hazırlanıyor…' : '📥 Kontrol mesajı gönder'}</button>
        : <button className="inbox-send primary confirm" type="button" disabled={anyBusy} onClick={() => onSend(booking, 'confirm')}>{isBusy('confirm') ? 'Hazırlanıyor…' : '✅ Onay mesajı gönder'}</button>}
      {stage === 'check' && <button className="inbox-send" type="button" disabled={anyBusy} onClick={() => onSend(booking, 'confirm')}>{isBusy('confirm') ? '…' : '✅ Direkt onayla'}</button>}
      <button className="inbox-send" type="button" onClick={open}>Detay ›</button>
    </div>
    <div className="inbox-footer">
      <span className="card-reference">{booking.booking_ref}</span>
      <button className="inbox-dismiss" type="button" disabled={anyBusy} onClick={() => onDismiss(booking)}>{isBusy('dismiss') ? '…' : 'Mesajsız işlendi say'}</button>
    </div>
  </div>
}

export default function InboxPage({ navigate }: { navigate: Navigate }) {
  const today = useMemo(todayISO, [])
  const [rows, setRows] = useState<Booking[] | null>(null)
  const [loadError, setLoadError] = useState('')
  const [syncStatus, setSyncStatus] = useState('Yükleniyor…')
  const [refreshing, setRefreshing] = useState(false)
  const [now, setNow] = useState(new Date())
  const [busy, setBusy] = useState<ActionState>(null)
  const [notice, setNotice] = useState<{ kind: 'success' | 'error'; text: string } | null>(null)
  const mounted = useRef(true)
  const refreshingRef = useRef(false)

  const refresh = useCallback(async () => {
    if (refreshingRef.current) return
    refreshingRef.current = true; setRefreshing(true); setSyncStatus('Yenileniyor…')
    const { data, error } = await supabase.from('bookings')
      .select('*')
      .is('confirm_message_sent_at', null)
      .in('status', [...INBOX_STATUSES])
      .or(`pickup_date.gte.${today},return_date.gte.${today},service_end_date.gte.${today}`)
      .order('created_at', { ascending: false })
    refreshingRef.current = false
    if (!mounted.current) return
    setRefreshing(false)
    if (error) {
      setSyncStatus('Bağlantı hatası')
      setLoadError('Yeni rezervasyonlar alınamadı. Bağlantıyı kontrol edin; sorun sürerse mesaj takibi migration\'ı (20261003120000) uygulanmamış olabilir.')
      return
    }
    setLoadError('')
    setRows((data ?? []) as Booking[])
    setSyncStatus(`Son güncelleme: ${fmtSyncTime()}`)
  }, [today])

  useEffect(() => {
    mounted.current = true
    void refresh()
    const clock = window.setInterval(() => setNow(new Date()), 30_000)
    const auto = window.setInterval(() => void refresh(), AUTO_REFRESH_MS)
    const onFocus = () => void refresh()
    window.addEventListener('focus', onFocus)
    return () => {
      mounted.current = false
      window.clearInterval(clock); window.clearInterval(auto)
      window.removeEventListener('focus', onFocus)
      document.title = BASE_TITLE
    }
  }, [refresh])

  const pending = useMemo(() => (rows ?? []).filter(booking => isAwaitingConfirmation(booking, today)), [rows, today])
  const needsCheck = pending.filter(booking => inboxStage(booking) === 'check')
  const needsConfirm = pending.filter(booking => inboxStage(booking) === 'confirm')

  useEffect(() => {
    document.title = pending.length ? `(${pending.length}) Yeni · ${BASE_TITLE}` : BASE_TITLE
  }, [pending.length])

  const replaceRow = (next: Booking) => setRows(current => (current ?? []).map(row => row.id === next.id ? { ...row, ...next } : row))

  const send = async (booking: Booking, kind: CustomerMessageKind) => {
    setBusy({ ref: booking.booking_ref, kind }); setNotice(null)
    const result = await sendCustomerMessage(booking, kind)
    if (!mounted.current) return
    setBusy(null)
    if (!result.ok) { setNotice({ kind: 'error', text: result.error }); return }
    replaceRow(result.booking)
    setNotice(result.trackingFailed
      ? { kind: 'error', text: `${booking.customer_name}: WhatsApp açıldı ama gönderim kaydedilemedi; kart listede kalacak.` }
      : { kind: 'success', text: kind === 'check'
        ? `${booking.customer_name}: kontrol mesajı açıldı. Detayları kontrol edip onay mesajını gönderin.`
        : `${booking.customer_name}: onay mesajı açıldı, rezervasyon Yeni listesinden çıktı.` })
  }

  const dismiss = async (booking: Booking) => {
    if (!window.confirm(`${booking.customer_name} (${booking.booking_ref}) onay mesajı gönderilmiş sayılsın ve Yeni listesinden çıkarılsın mı?`)) return
    setBusy({ ref: booking.booking_ref, kind: 'dismiss' }); setNotice(null)
    const { sentAt, error } = await markCustomerMessageSent(booking, 'confirm')
    if (!mounted.current) return
    setBusy(null)
    if (error) { setNotice({ kind: 'error', text: 'Kaydedilemedi, tekrar deneyin.' }); return }
    replaceRow({ ...booking, confirm_message_sent_at: sentAt })
    setNotice({ kind: 'success', text: `${booking.customer_name} listeden çıkarıldı.` })
  }

  const renderCard = (booking: Booking) => <InboxCard key={booking.id ?? booking.booking_ref} booking={booking} now={now} busy={busy} onSend={(b, k) => void send(b, k)} onDismiss={b => void dismiss(b)} navigate={navigate} />

  return <>
    <Topbar navigate={navigate} showAdmin />
    <AdminTabs active="inbox" navigate={navigate} inboxCount={rows ? pending.length : undefined} />
    <div className="stats">
      <div className="stat stat-inbox-check"><div className="stat-number">{rows ? needsCheck.length : '…'}</div><div className="stat-label">Kontrol mesajı</div></div>
      <div className="stat stat-inbox-confirm"><div className="stat-number">{rows ? needsConfirm.length : '…'}</div><div className="stat-label">Onay mesajı</div></div>
      <div className="stat"><div className="stat-number">{rows ? pending.length : '…'}</div><div className="stat-label">Toplam yeni</div></div>
    </div>
    <div className="timeline-statusbar"><div className="live-clock-wrap"><span>Onay mesajı gönderilene kadar burada kalır</span></div><div className="sync-wrap"><span>{syncStatus}</span><button className="sync-button" type="button" aria-label="Yeni rezervasyonları yenile" disabled={refreshing} onClick={() => void refresh()}>↻</button></div></div>
    {loadError && <div className="offline-banner">{loadError}</div>}
    {notice && <div className={`inbox-notice ${notice.kind}`} role={notice.kind === 'error' ? 'alert' : 'status'}>{notice.text}</div>}
    <div className="scroll-area inbox-scroll-area">
      {!rows ? <div className="empty"><div>{loadError ? 'Liste yüklenemedi' : 'Yükleniyor…'}</div></div>
        : pending.length === 0 ? <div className="empty"><div className="empty-icon">✅</div><div>Bekleyen yeni rezervasyon yok</div><div className="empty-hint">Yeni gelen rezervasyonlar onay mesajı gönderilene kadar burada görünür.</div></div>
          : <div className="inbox-groups">
            {needsCheck.length > 0 && <section className="inbox-group"><h2 className="inbox-group-title"><span aria-hidden="true">📥</span> 1 · Kontrol mesajı bekleyenler ({needsCheck.length})</h2>{needsCheck.map(renderCard)}</section>}
            {needsConfirm.length > 0 && <section className="inbox-group"><h2 className="inbox-group-title"><span aria-hidden="true">✅</span> 2 · Onay mesajı bekleyenler ({needsConfirm.length})</h2>{needsConfirm.map(renderCard)}</section>}
          </div>}
    </div>
  </>
}
