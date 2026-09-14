// admin/react/lib/exchange-rates.ts

const rateCache = new Map<string, number>() // date (YYYY-MM-DD) → EUR/TRY rate
const inFlight = new Map<string, Promise<number | null>>()
// Sunucunun "bu güne ait kur yok" dediği tarihler; geçmiş veri değişmeyeceği
// için bir daha istenmez. Ağ/CORS hatası buraya girmez, o geçici olabilir.
const unavailableDates = new Set<string>()
const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/

// Yerel güne göre bugünün ISO tarihi; kur verisi gün bazında yayımlanıyor.
function todayIso(): string {
  const now = new Date()
  return new Date(now.getTime() - now.getTimezoneOffset() * 60_000)
    .toISOString()
    .slice(0, 10)
}

// jsdelivr Türkiye'den zaman zaman 404/erişim hatası veriyor; aynı verinin
// resmi yedek aynası (pages.dev) devreye girer.
function rateUrlsForDate(date: string) {
  return [
    `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@${date}/v1/currencies/eur.json`,
    `https://${date}.currency-api.pages.dev/v1/currencies/eur.json`,
  ]
}

type RateLookup = { rate: number | null; serverSaysMissing: boolean }

async function lookupRateForDate(date: string): Promise<RateLookup> {
  let serverSaysMissing = false
  for (const url of rateUrlsForDate(date)) {
    try {
      const response = await fetch(url)
      if (!response.ok) {
        // Sunucu cevap verdi ama veri yok — ağ sorunundan farklı, kalıcı.
        serverSaysMissing = true
        continue
      }
      const data = await response.json() as { eur?: { try?: unknown } }
      const rate = data?.eur?.try
      if (typeof rate === 'number' && Number.isFinite(rate) && rate > 0) {
        return { rate, serverSaysMissing: false }
      }
    } catch {
      // Ağ hatası ya da CORS bloğu; sıradaki aynayı dene.
    }
  }
  return { rate: null, serverSaysMissing }
}

async function fetchRateForDate(date: string): Promise<number | null> {
  return (await lookupRateForDate(date)).rate
}

export async function fetchRatesForDates(dates: string[]): Promise<Map<string, number>> {
  const today = todayIso()
  const unique = [...new Set(dates.filter(d => ISO_DATE.test(d) && d <= today))]
  const missing = unique.filter(d => !rateCache.has(d) && !unavailableDates.has(d))

  await Promise.all(
    missing.map(async date => {
      if (inFlight.has(date)) {
        await inFlight.get(date)
        return // first caller already populated rateCache; outer filter handles the rest
      }
      const p = lookupRateForDate(date).then(result => {
        if (result.rate !== null) rateCache.set(date, result.rate)
        else if (result.serverSaysMissing) unavailableDates.add(date)
        return result.rate
      })
      inFlight.set(date, p)
      await p
      inFlight.delete(date)
    }),
  )

  return new Map(
    unique.filter(d => rateCache.has(d)).map(d => [d, rateCache.get(d)!]),
  )
}

export async function fetchLatestEurTryRate(): Promise<number | null> {
  // 'latest' bypasses ISO_DATE filter intentionally — always returns most recent available rate
  return fetchRateForDate('latest')
}
