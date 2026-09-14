import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import type { FlightResult, LookupStore } from './verify.ts'

const MONTHLY_CAP = 380   // ucretsiz plan 400; 20'lik pay elle test icin

export function createLookupStore(): LookupStore {
  const client = createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
  )

  return {
    async get(key) {
      const { data } = await client
        .from('flight_lookups')
        .select('result')
        .eq('flight_key', key)
        .maybeSingle()
      return (data?.result as FlightResult) ?? null
    },

    async put(key, result) {
      await client.from('flight_lookups').upsert({ flight_key: key, result })
    },

    async consumeQuota() {
      const month = new Date().toISOString().slice(0, 7)   // 'YYYY-MM'
      const { data, error } = await client.rpc('consume_flight_quota', {
        p_month: month,
        p_cap: MONTHLY_CAP,
      })
      // Sayaci okuyamiyorsak harcamayiz. Kotayi korumak, ozelligi calistirmaktan onceliklidir.
      if (error) return false
      return data === true
    },
  }
}
