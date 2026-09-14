import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import type { FlightResult, LookupStore } from './verify.ts'

const MONTHLY_CAP = 380   // ucretsiz plan 400; 20'lik pay elle test icin

// RapidAPI kotasi abonelik yildonumunde sifirlanir, ayin 1'inde degil.
// Sayaci takvim ayina baglamak, iki pencere kaydiginda tek bir RapidAPI
// dongusunde 400'u gercekten asmamiza yol acar. Gercek gun hesap
// sahibiyle dogrulaniyor; kod degistirmeden duzeltilebilsin diye env
// degiskeni ile ayarlanabilir birakildi.
const CYCLE_ANCHOR_DAY = Number(Deno.env.get('RAPIDAPI_CYCLE_ANCHOR_DAY') ?? '14')

const lastDayOfMonth = (year: number, month0: number) =>
  new Date(Date.UTC(year, month0 + 1, 0)).getUTCDate()

const pad2 = (value: number) => String(value).padStart(2, '0')

/** En son gecilen abonelik-dongusu baslangic tarihini 'YYYY-MM-DD' olarak dondurur.
 *  `flight_api_usage.month` sutunu artik takvim ayi degil bu dongu kimligini tutuyor
 *  (sutun adi degistirilmedi, anlamı degisti). Anchor 29/30/31 gibi kisa aylarda
 *  o ayin son gunune sabitlenir, boylece Subat bir donguyu atlamaz. */
export function cycleKey(now: Date, anchorDay: number = CYCLE_ANCHOR_DAY): string {
  const year = now.getUTCFullYear()
  const month0 = now.getUTCMonth()
  const day = now.getUTCDate()

  let cycleYear = year
  let cycleMonth0 = month0
  if (day < anchorDay) {
    cycleMonth0 -= 1
    if (cycleMonth0 < 0) {
      cycleMonth0 = 11
      cycleYear -= 1
    }
  }
  const clampedDay = Math.min(anchorDay, lastDayOfMonth(cycleYear, cycleMonth0))
  return `${cycleYear}-${pad2(cycleMonth0 + 1)}-${pad2(clampedDay)}`
}

export function createLookupStore(): LookupStore {
  // Istemci burada degil, her cagride kuruluyor: SUPABASE_URL /
  // SUPABASE_SERVICE_ROLE_KEY eksikse createClient fırlatır, ve bunun modul
  // yuklenirken (index.ts'te ust seviyede) olmasi butun isolate'i cokertip
  // her istege 500 + JSON-olmayan govde dondurur - "her zaman 200,
  // her zaman {status}" sozlesmesini kirar. Burada firlatilirsa
  // verifyFlight'in disaridaki try/catch'i onu yakalayip unavailable doner.
  const getClient = () =>
    createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
    )

  return {
    async get(key) {
      const { data, error } = await getClient()
        .from('flight_lookups')
        .select('result')
        .eq('flight_key', key)
        .maybeSingle()
      if (error) {
        // Okuyamamak ile "onbellekte yok" ayni sey degil. Onbellek bozuksa
        // kotayi harcamaya devam etmek 380 hakki bir gunde tuketebilir.
        console.error('flight_lookups read failed', error)
        throw error
      }
      return (data?.result as FlightResult) ?? null
    },

    async put(key, result) {
      const { error } = await getClient().from('flight_lookups').upsert({ flight_key: key, result })
      // Yazamamak cevabi cope atmayi gerektirmez, ama sessiz de kalmamali:
      // onbellek yazilmiyorsa ayni ucus her rezervasyonda yeniden satin alinir.
      if (error) console.error('flight_lookups write failed', error)
    },

    async consumeQuota() {
      const month = cycleKey(new Date())
      const { data, error } = await getClient().rpc('consume_flight_quota', {
        p_month: month,
        p_cap: MONTHLY_CAP,
      })
      // Sayaci okuyamiyorsak harcamayiz. Kotayi korumak, ozelligi calistirmaktan onceliklidir.
      if (error) return false
      return data === true
    },
  }
}
