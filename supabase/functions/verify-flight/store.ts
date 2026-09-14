import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import type { FlightResult, LookupStore } from './verify.ts'
import { cycleKey, DEFAULT_ANCHOR_DAY, MONTHLY_CAP } from './cycle.ts'

// RapidAPI kotasi abonelik yildonumunde sifirlanir, ayin 1'inde degil.
// Sayaci takvim ayina baglamak, iki pencere kaydiginda tek bir RapidAPI
// dongusunde 400'u gercekten asmamiza yol acar. Gercek gun hesap
// sahibiyle dogrulandi (14); kod degistirmeden duzeltilebilsin diye env
// degiskeni ile ayarlanabilir birakildi. Tarih aritmetigi cycle.ts'te -
// Deno API'lerine bagimli olmadigi icin vitest altinda dogrudan test edilir.
const CYCLE_ANCHOR_DAY = Number(Deno.env.get('RAPIDAPI_CYCLE_ANCHOR_DAY') ?? String(DEFAULT_ANCHOR_DAY))

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
      const month = cycleKey(new Date(), CYCLE_ANCHOR_DAY)
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
