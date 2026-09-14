import { createLookupStore } from './store.ts'
import { verifyFlight } from './verify.ts'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const jsonResponse = (body: Record<string, unknown>, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  })

const store = createLookupStore()

Deno.serve(async (request) => {
  if (request.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })

  // Bu fonksiyon asla hata durumu donmez. Cagiran icin tek bir basarisizlik
  // bicimi var: unavailable. Rezervasyon akisi bunun ustune dal kurmaz.
  try {
    const payload = await request.json()
    return jsonResponse(await verifyFlight({
      flightNumber: String(payload?.flightNumber ?? ''),
      date: String(payload?.date ?? ''),
      apiKey: Deno.env.get('RAPIDAPI_API_KEY') ?? '',
      store,
    }))
  } catch {
    return jsonResponse({ status: 'unavailable' })
  }
})
