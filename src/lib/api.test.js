import { beforeEach, describe, expect, test, vi } from 'vitest'

const invoke = vi.fn()

vi.mock('./supabase.js', () => ({
  supabase: { functions: { invoke } },
}))

const { createBooking } = await import('./api.js')

describe('createBooking', () => {
  beforeEach(() => invoke.mockReset())

  test('surfaces the Edge Function response instead of a generic FunctionsHttpError', async () => {
    invoke.mockResolvedValue({
      data: null,
      error: {
        message: 'Edge Function returned a non-2xx status code',
        context: new Response(JSON.stringify({ error: 'No active price was found for this route' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }),
      },
    })

    await expect(createBooking({})).rejects.toThrow('No active price was found for this route')
  })
})
