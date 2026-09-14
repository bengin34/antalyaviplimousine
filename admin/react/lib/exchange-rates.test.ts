import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'

const RATE_BODY = { eur: { try: 47.5 } }

function jsonResponse(body: unknown) {
  return { ok: true, status: 200, json: async () => body } as unknown as Response
}

function notFound() {
  return { ok: false, status: 404, json: async () => ({}) } as unknown as Response
}

// Tarayıcıda CORS ile bloklanan istek TypeError fırlatır; ayna 404'ünde olan bu.
function corsBlocked() {
  return Promise.reject(new TypeError('Failed to fetch'))
}

async function loadModule() {
  vi.resetModules()
  return import('./exchange-rates')
}

let fetchMock: ReturnType<typeof vi.fn>

beforeEach(() => {
  vi.useFakeTimers()
  vi.setSystemTime(new Date('2026-09-14T09:00:00+03:00'))
  fetchMock = vi.fn()
  vi.stubGlobal('fetch', fetchMock)
})

afterEach(() => {
  vi.useRealTimers()
  vi.unstubAllGlobals()
})

describe('fetchRatesForDates', () => {
  test('ileri tarihli rezervasyonlar için hiç kur isteği yapmaz', async () => {
    const { fetchRatesForDates } = await loadModule()

    const rates = await fetchRatesForDates(['2026-10-14'])

    expect(fetchMock).not.toHaveBeenCalled()
    expect(rates.size).toBe(0)
  })

  test('bugünün tarihini ister ve kuru döndürür', async () => {
    fetchMock.mockResolvedValue(jsonResponse(RATE_BODY))
    const { fetchRatesForDates } = await loadModule()

    const rates = await fetchRatesForDates(['2026-09-14'])

    expect(rates.get('2026-09-14')).toBe(47.5)
  })

  test('geçmiş ve gelecek karışık gelince sadece geçmişi ister', async () => {
    fetchMock.mockResolvedValue(jsonResponse(RATE_BODY))
    const { fetchRatesForDates } = await loadModule()

    const rates = await fetchRatesForDates(['2026-09-10', '2026-12-01'])

    expect(fetchMock.mock.calls.every(([url]) => String(url).includes('2026-09-10'))).toBe(true)
    expect(rates.has('2026-12-01')).toBe(false)
    expect(rates.get('2026-09-10')).toBe(47.5)
  })

  test('jsdelivr 404 verince aynaya düşer', async () => {
    fetchMock.mockResolvedValueOnce(notFound()).mockResolvedValueOnce(jsonResponse(RATE_BODY))
    const { fetchRatesForDates } = await loadModule()

    const rates = await fetchRatesForDates(['2026-09-10'])

    expect(fetchMock).toHaveBeenCalledTimes(2)
    expect(rates.get('2026-09-10')).toBe(47.5)
  })

  test('sunucu veri yok dediğinde aynı tarihi bir daha istemez', async () => {
    fetchMock.mockResolvedValueOnce(notFound()).mockImplementationOnce(corsBlocked)
    const { fetchRatesForDates } = await loadModule()

    await fetchRatesForDates(['2026-09-10'])
    expect(fetchMock).toHaveBeenCalledTimes(2)

    await fetchRatesForDates(['2026-09-10'])
    expect(fetchMock).toHaveBeenCalledTimes(2)
  })

  test('ağ hatası kalıcı sayılmaz, sonraki yenilemede yeniden dener', async () => {
    fetchMock.mockImplementation(corsBlocked)
    const { fetchRatesForDates } = await loadModule()

    await fetchRatesForDates(['2026-09-10'])
    const afterFirst = fetchMock.mock.calls.length

    await fetchRatesForDates(['2026-09-10'])

    expect(fetchMock.mock.calls.length).toBeGreaterThan(afterFirst)
  })
})

describe('fetchLatestEurTryRate', () => {
  test("tarih filtresine takılmadan 'latest' ister", async () => {
    fetchMock.mockResolvedValue(jsonResponse(RATE_BODY))
    const { fetchLatestEurTryRate } = await loadModule()

    expect(await fetchLatestEurTryRate()).toBe(47.5)
    expect(String(fetchMock.mock.calls[0][0])).toContain('latest')
  })
})
