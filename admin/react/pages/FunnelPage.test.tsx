// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest'
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react'
import FunnelPage from './FunnelPage'

const mocks = vi.hoisted(() => ({ rpc: vi.fn(), from: vi.fn() }))

vi.mock('../lib/supabase', () => ({ supabase: { rpc: mocks.rpc, from: mocks.from, auth: { signOut: vi.fn() } } }))
vi.mock('../pages/timeline-logic', () => ({ clearTimelineCache: vi.fn() }))

const summary = {
  days: 30,
  funnel: [
    { event: 'landing_view', sessions: 1000, events: 2400 },
    { event: 'price_shown', sessions: 300, events: 420 },
    { event: 'booking_started', sessions: 90, events: 110 },
    { event: 'booking_submitted', sessions: 30, events: 31 },
  ],
  abandoned: [{ step: '3', sessions: 44 }],
  unavailable: [{ route: 'kas', sessions: 7 }],
  contact: [{ event: 'whatsapp_clicked', events: 81 }],
  flight_failures: 5,
  sources: [
    { source: 'google-ads', bookings: 6, revenue_eur: 900 },
    { source: 'direct', bookings: 4, revenue_eur: 300 },
  ],
}

const flightChecks = [{
  booking_ref: 'AVL-1001',
  customer_name: 'Anna Weber',
  customer_phone: '+49 151 23456789',
  language: 'de',
  flight_number: 'XQ123',
  pickup_date: '2026-10-04',
  flight_verification_status: 'not_found',
}]

/** supabase-js zinciri: from().select().in().neq().gte().order() */
function mockBookings(data: unknown[], error: unknown = null) {
  const chain: Record<string, unknown> = {}
  for (const method of ['select', 'in', 'neq', 'gte']) chain[method] = () => chain
  chain.order = () => Promise.resolve({ data, error })
  mocks.from.mockReturnValue(chain)
}

beforeEach(() => {
  mocks.rpc.mockReset()
  mocks.from.mockReset()
  mocks.rpc.mockResolvedValue({ data: summary, error: null })
  mockBookings(flightChecks)
})
afterEach(cleanup)

describe('huni sayfası', () => {
  test('varsayılan 30 günlük özeti çeker ve huniyi gösterir', async () => {
    render(<FunnelPage navigate={vi.fn()} />)

    await waitFor(() => expect(screen.getByText('Ziyaretten rezervasyona')).toBeInTheDocument())
    expect(mocks.rpc).toHaveBeenCalledWith('site_funnel_summary', { p_days: 30 })
    expect(screen.getByText('Fiyat gördü')).toBeInTheDocument()
    // 30/1000 → girenlerin %3'ü rezervasyona dönüyor.
    expect(screen.getByText(/Girenlerin %3'i/)).toBeInTheDocument()
  })

  test('dönem değişince yeniden sorgular', async () => {
    render(<FunnelPage navigate={vi.fn()} />)
    await waitFor(() => expect(mocks.rpc).toHaveBeenCalledTimes(1))

    fireEvent.click(screen.getByRole('button', { name: '7 gün' }))

    await waitFor(() => expect(mocks.rpc).toHaveBeenCalledWith('site_funnel_summary', { p_days: 7 }))
  })

  test('kayıpları ve kaynak bazlı ciroyu listeler', async () => {
    render(<FunnelPage navigate={vi.fn()} />)

    await waitFor(() => expect(screen.getByText('3. adımda bıraktı')).toBeInTheDocument())
    expect(screen.getByText('kas')).toBeInTheDocument()
    expect(screen.getByText('Google Ads')).toBeInTheDocument()
    expect(screen.getByText('WhatsApp tıklaması')).toBeInTheDocument()
  })

  test('tablolar henüz canlıda değilse anlaşılır hata gösterir', async () => {
    mocks.rpc.mockResolvedValue({ data: null, error: { message: 'function does not exist' } })

    render(<FunnelPage navigate={vi.fn()} />)

    await waitFor(() => expect(screen.getByText('Huni verileri yüklenemedi.')).toBeInTheDocument())
  })

  test('uçuşu doğrulanamayanları hazır WhatsApp mesajıyla listeler', async () => {
    render(<FunnelPage navigate={vi.fn()} />)

    await waitFor(() => expect(screen.getByText('Uçuşu doğrulanamayanlar')).toBeInTheDocument())
    expect(screen.getByText('Anna Weber')).toBeInTheDocument()
    expect(screen.getByText('XQ123')).toBeInTheDocument()

    const link = screen.getByRole('link', { name: /Anna Weber için uçuş sorusunu/ })
    expect(link).toHaveAttribute('href', expect.stringContaining('wa.me/4915123456789'))
    expect(decodeURIComponent(link.getAttribute('href') ?? '')).toContain('XQ123')
  })

  test('detay butonu kaydın sayfasına götürür', async () => {
    const navigate = vi.fn()
    render(<FunnelPage navigate={navigate} />)

    await waitFor(() => expect(screen.getByText('Anna Weber')).toBeInTheDocument())
    fireEvent.click(screen.getByRole('button', { name: 'Detay' }))

    expect(navigate).toHaveBeenCalledWith('#detail/AVL-1001?from=future')
  })

  test('yaklaşan doğrulanamamış uçuş yoksa listeyi boş gösterir', async () => {
    mockBookings([])

    render(<FunnelPage navigate={vi.fn()} />)

    await waitFor(() => expect(screen.getByText('Yaklaşan transferlerde doğrulanamamış uçuş yok.')).toBeInTheDocument())
  })

  test('boş dönemde çökmez, sıfır gösterir', async () => {
    mocks.rpc.mockResolvedValue({ data: { days: 7, funnel: [], abandoned: [], unavailable: [], contact: [], flight_failures: 0, sources: [] }, error: null })
    mockBookings([])

    render(<FunnelPage navigate={vi.fn()} />)

    await waitFor(() => expect(screen.getByText('Bu dönemde rezervasyon yok.')).toBeInTheDocument())
    expect(screen.getByText('Her seçilen rota fiyat döndürdü.')).toBeInTheDocument()
  })
})
