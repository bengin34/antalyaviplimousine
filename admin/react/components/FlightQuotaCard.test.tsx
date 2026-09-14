// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest'
import { afterEach, describe, expect, test, vi } from 'vitest'
import { cleanup, render, screen, waitFor } from '@testing-library/react'
import { cycleKey, MONTHLY_CAP } from '../../../supabase/functions/verify-flight/cycle'

const mocks = vi.hoisted(() => ({ eq: vi.fn() }))

vi.mock('../lib/supabase', () => ({
  supabase: {
    from: () => ({ select: () => ({ eq: mocks.eq }) }),
  },
}))

import { FlightQuotaCard, quotaTone } from './FlightQuotaCard'

const respond = (result: { data: { calls: number } | null; error: unknown }) => {
  mocks.eq.mockReturnValue({ maybeSingle: () => Promise.resolve(result) })
}

afterEach(() => { cleanup(); vi.clearAllMocks() })

describe('quotaTone', () => {
  test('a fresh cycle reads as normal', () => {
    expect(quotaTone(50, 380)).toBe('ok')
  })

  test('just under four fifths is still normal', () => {
    expect(quotaTone(303, 380)).toBe('ok')
  })

  test('four fifths spent turns amber', () => {
    expect(quotaTone(304, 380)).toBe('low')
  })

  test('350 of 380 is amber', () => {
    expect(quotaTone(350, 380)).toBe('low')
  })

  test('reaching the cap turns red', () => {
    expect(quotaTone(380, 380)).toBe('spent')
  })

  test('the cap defaults to the value the Edge Function enforces', () => {
    expect(quotaTone(MONTHLY_CAP)).toBe('spent')
    expect(quotaTone(MONTHLY_CAP - 1)).toBe('low')
  })
})

describe('FlightQuotaCard', () => {
  test('reads the row keyed by the subscription cycle, not the calendar month', async () => {
    respond({ data: { calls: 50 }, error: null })
    render(<FlightQuotaCard />)
    await waitFor(() => expect(screen.getByText(`50 / ${MONTHLY_CAP}`)).toBeInTheDocument())
    const requestedKey = mocks.eq.mock.calls[0]?.[1]
    expect(requestedKey).toBe(cycleKey(new Date(), 14))
    // Takvim ayı anahtarı ('2026-09') kullanılsaydı sayaç satırı hiç
    // bulunmaz, kart dönem boyunca 0 gösterirdi.
    expect(requestedKey).not.toMatch(/^\d{4}-\d{2}$/)
  })

  // Satır yokluğunun iki sebebi var ve kart ikisini birbirinden ayıramaz:
  // ya bu dönem gerçekten hiç sorgu olmadı, ya da kartın hesapladığı dönem
  // anahtarı store.ts'in yazdığından farklı (yıldönümü günü iki tarafta ayrı
  // ayarlanır). İkincisinde kart kör demektir. "0 / 380 · kalan hak yeterli"
  // demek, dolmuş bir kotayı yeşil göstermek olurdu — kartın yapmaması
  // gereken tek şey bu. Sayı dürüst kalır, ama söz vermez.
  test('a missing row is reported as no record, never as plenty left', async () => {
    respond({ data: null, error: null })
    const { container } = render(<FlightQuotaCard />)
    await waitFor(() => expect(screen.getByText(/henüz kayıt yok/)).toBeInTheDocument())
    expect(screen.queryByText(/kalan hak yeterli/)).not.toBeInTheDocument()
    expect(container.querySelector('.flight-quota.ok')).toBeNull()
  })

  test('a cycle with lookups on record still reads as normal', async () => {
    respond({ data: { calls: 50 }, error: null })
    const { container } = render(<FlightQuotaCard />)
    await waitFor(() => expect(screen.getByText(/kalan hak yeterli/)).toBeInTheDocument())
    expect(container.querySelector('.flight-quota.ok')).not.toBeNull()
  })

  test('a read failure shows no number at all rather than a reassuring zero', async () => {
    respond({ data: null, error: { message: 'permission denied' } })
    render(<FlightQuotaCard />)
    await waitFor(() => expect(screen.getByText(/Sayaç okunamadı/)).toBeInTheDocument())
    expect(screen.queryByText(`0 / ${MONTHLY_CAP}`)).not.toBeInTheDocument()
  })

  test('a spent cycle says plainly that flight times are now entered by hand', async () => {
    respond({ data: { calls: MONTHLY_CAP }, error: null })
    const { container } = render(<FlightQuotaCard />)
    await waitFor(() => expect(screen.getByText(/elle girilecek/)).toBeInTheDocument())
    expect(container.querySelector('.flight-quota.spent')).not.toBeNull()
  })
})
