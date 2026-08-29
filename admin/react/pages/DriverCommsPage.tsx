import { useEffect, useMemo, useState } from 'react'
import { Topbar } from '../components/AdminChrome'
import { fmtDetailDate, fmtTime, offsetISO } from '../lib/format'
import { supabase } from '../lib/supabase'
import type { Booking, Navigate } from '../types'
import { expandRoundTrips } from './timeline-logic'
import { buildDriverDailyProgram, driverWhatsappURL } from '../../driver-message.js'
import { locationLabel } from '../../turkish-formatters.js'

function transferDisplayTime(card: Booking & { _isReturn?: boolean; _displayTime?: string | null }) {
  return card._displayTime ? card._displayTime.slice(0, 5) : '—'
}

function transferRoute(card: Booking & { _isReturn?: boolean }) {
  const pickup = card.pickup_location
  const dropoff = card.dropoff_location
  return `${locationLabel(pickup)} → ${locationLabel(dropoff ?? '')}`
}

export default function DriverCommsPage({ navigate }: { navigate: Navigate }) {
  const tomorrow = useMemo(() => offsetISO(1), [])
  const [selectedDate, setSelectedDate] = useState(tomorrow)
  const [bookings, setBookings] = useState<Booking[] | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError('')
    setBookings(null)

    supabase
      .from('bookings')
      .select('*, booking_notes(id, note, created_at), chauffeur_hire_days(*)')
      .in('status', ['pending', 'paid', 'confirmed', 'in_transit', 'completed'])
      .or(`pickup_date.eq.${selectedDate},return_date.eq.${selectedDate},and(trip_type.eq.daily_chauffeur,pickup_date.lte.${selectedDate},service_end_date.gte.${selectedDate})`)
      .order('pickup_date')
      .order('pickup_time', { nullsFirst: false })
      .then(({ data, error: err }) => {
        if (cancelled) return
        setLoading(false)
        if (err) { setError('Veri yüklenemedi: ' + err.message); return }
        setBookings((data ?? []) as Booking[])
      })

    return () => { cancelled = true }
  }, [selectedDate])

  const cards = useMemo(() => {
    if (!bookings) return []
    return expandRoundTrips(bookings, 'future').filter(card => card._displayDate === selectedDate)
  }, [bookings, selectedDate])

  const message = useMemo(() => buildDriverDailyProgram(cards, selectedDate), [cards, selectedDate])
  const waURL = useMemo(() => driverWhatsappURL(message), [message])

  return <>
    <Topbar navigate={navigate} title="📱 Şoför İletişimi" back="#timeline" />

    <div className="driver-comms-page">
      <div className="driver-comms-controls">
        <label className="driver-date-label">
          <span>Tarih</span>
          <input
            type="date"
            className="driver-date-input"
            value={selectedDate}
            onChange={e => setSelectedDate(e.target.value)}
          />
        </label>
        <div className="driver-date-hint">{fmtDetailDate(selectedDate)}</div>
      </div>

      <div className="driver-comms-body">
        <div className="driver-transfer-list">
          <div className="driver-section-title">
            {loading ? 'Yükleniyor…' : error ? error : `${cards.length} transfer`}
          </div>

          {!loading && !error && cards.length === 0 && (
            <div className="driver-empty">Bu tarihte aktif transfer yok</div>
          )}

          {cards.map((card, index) => (
            <div className="driver-transfer-item" key={`${card.booking_ref}-${card._isReturn ? 'return' : 'out'}-${index}`}>
              <div className="driver-transfer-time">{transferDisplayTime(card)}</div>
              <div className="driver-transfer-info">
                <div className="driver-transfer-route">{transferRoute(card)}</div>
                <div className="driver-transfer-meta">
                  {card.customer_name}
                  {card.flight_number ? ` · ✈️ ${card.flight_number}` : ''}
                  {` · ${card.guests ?? '?'} kişi`}
                  {card._isReturn ? ' · DÖNÜŞ' : ''}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="driver-message-preview">
          <div className="driver-section-title">Mesaj Önizleme</div>
          <pre className="driver-message-text">{message}</pre>
        </div>
      </div>

      <div className="driver-comms-footer">
        <a
          className={`driver-whatsapp-btn${cards.length === 0 ? ' disabled' : ''}`}
          href={cards.length > 0 ? waURL : undefined}
          target="_blank"
          rel="noopener noreferrer"
          aria-disabled={cards.length === 0}
          onClick={e => { if (cards.length === 0) e.preventDefault() }}
        >
          📲 WhatsApp'ta Gönder
        </a>
      </div>
    </div>
  </>
}
