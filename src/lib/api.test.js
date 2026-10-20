import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'

const { createBooking } = await import('./api.js')

const fetchMock = vi.fn()

beforeEach(() => {
  fetchMock.mockReset()
  vi.stubGlobal('fetch', fetchMock)
  vi.stubEnv('VITE_SUPABASE_URL', 'https://project.supabase.co')
  vi.stubEnv('VITE_SUPABASE_ANON_KEY', 'anon-key')
})

afterEach(() => {
  vi.unstubAllGlobals()
  vi.unstubAllEnvs()
})

const json = (body, status = 200) => new Response(JSON.stringify(body), {
  status,
  headers: { 'Content-Type': 'application/json' },
})

describe('createBooking', () => {
  test('surfaces the Edge Function response instead of a generic FunctionsHttpError', async () => {
    fetchMock.mockResolvedValue(json({ error: 'No active price was found for this route' }, 400))

    await expect(createBooking({})).rejects.toThrow('No active price was found for this route')
  })

  test('falls back to the body `message` field', async () => {
    fetchMock.mockResolvedValue(json({ message: 'Rate limited' }, 429))

    await expect(createBooking({})).rejects.toThrow('Rate limited')
  })

  test('a non-JSON error body keeps the supabase-js FunctionsHttpError message', async () => {
    fetchMock.mockResolvedValue(new Response('<html>Bad gateway</html>', { status: 502 }))

    const error = await createBooking({}).catch((caught) => caught)
    expect(error.message).toBe('Edge Function returned a non-2xx status code')
    expect(error.cause.name).toBe('FunctionsHttpError')
    expect(error.cause.context.status).toBe(502)
  })

  test('a network failure keeps the supabase-js FunctionsFetchError message', async () => {
    fetchMock.mockRejectedValue(new TypeError('Failed to fetch'))

    const error = await createBooking({}).catch((caught) => caught)
    expect(error.message).toBe('Failed to send a request to the Edge Function')
    expect(error.cause.name).toBe('FunctionsFetchError')
  })

  test('posts the payload as JSON to create-booking with the anon key', async () => {
    fetchMock.mockResolvedValue(json({ booking: { booking_ref: 'AVL-1' } }))

    await expect(createBooking({ customer_name: 'Ada' })).resolves.toEqual({ booking_ref: 'AVL-1' })
    const [url, init] = fetchMock.mock.calls[0]
    expect(url).toBe('https://project.supabase.co/functions/v1/create-booking')
    expect(init.method).toBe('POST')
    expect(init.headers).toMatchObject({
      apikey: 'anon-key',
      Authorization: 'Bearer anon-key',
      'Content-Type': 'application/json',
    })
    expect(JSON.parse(init.body)).toEqual({ customer_name: 'Ada' })
  })

  test('a 2xx body with an error or without a booking still fails', async () => {
    fetchMock.mockResolvedValueOnce(json({ error: 'Hotel not found' }))
    await expect(createBooking({})).rejects.toThrow('Hotel not found')

    fetchMock.mockResolvedValueOnce(json({}))
    await expect(createBooking({})).rejects.toThrow('Booking could not be created')
  })

  test('missing configuration throws before any request', async () => {
    vi.stubEnv('VITE_SUPABASE_ANON_KEY', '')

    await expect(createBooking({})).rejects.toThrow('Supabase is not configured')
    expect(fetchMock).not.toHaveBeenCalled()
  })
})
