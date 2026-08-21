// admin/react/lib/exchange-rates.ts

const rateCache = new Map<string, number>() // date (YYYY-MM-DD) → EUR/TRY rate
const inFlight = new Map<string, Promise<number | null>>()
const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/

async function fetchRateForDate(date: string): Promise<number | null> {
  const url = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@${date}/v1/currencies/eur.json`
  try {
    const response = await fetch(url)
    if (!response.ok) throw new Error('HTTP ' + response.status)
    const data = await response.json() as { eur?: { try?: unknown } }
    const rate = data?.eur?.try
    return typeof rate === 'number' && Number.isFinite(rate) && rate > 0 ? rate : null
  } catch {
    return null
  }
}

export async function fetchRatesForDates(dates: string[]): Promise<Map<string, number>> {
  const unique = [...new Set(dates.filter(d => ISO_DATE.test(d)))]
  const missing = unique.filter(d => !rateCache.has(d))

  await Promise.all(
    missing.map(async date => {
      if (inFlight.has(date)) {
        await inFlight.get(date)
        return
      }
      const p = fetchRateForDate(date)
      inFlight.set(date, p)
      const rate = await p
      inFlight.delete(date)
      if (rate !== null) rateCache.set(date, rate)
    }),
  )

  return new Map(
    unique.filter(d => rateCache.has(d)).map(d => [d, rateCache.get(d)!]),
  )
}

// Fetches today's or latest available EUR/TRY rate (for SettingsForm helper).
// Falls back to fetchRateForDate('latest') directly — note: 'latest' is not an
// ISO date so it bypasses the ISO_DATE filter in fetchRatesForDates intentionally.
export async function fetchLatestEurTryRate(): Promise<number | null> {
  const today = new Date().toISOString().slice(0, 10)
  const result = await fetchRatesForDates([today])
  if (result.has(today)) return result.get(today)!
  return fetchRateForDate('latest')
}
