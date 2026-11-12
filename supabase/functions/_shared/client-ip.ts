/** Caller IP, or null when no proxy header is present (never a shared default bucket). */
export const clientIp = (req: Request): string | null =>
  req.headers.get('cf-connecting-ip') ||
  req.headers.get('x-real-ip') ||
  req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
  null

/** true = allowed, false = over the limit, null = RPC error (caller picks fail-open/closed). */
export async function consumeRateLimit(
  client: { rpc: (fn: string, args: Record<string, unknown>) => PromiseLike<{ data: unknown; error: unknown }> },
  bucket: string,
  ip: string,
  limit: number,
  windowSeconds: number,
): Promise<boolean | null> {
  const { data, error } = await client.rpc('consume_rate_limit', {
    p_bucket: bucket,
    p_subject: ip,
    p_limit: limit,
    p_window_seconds: windowSeconds,
  })
  if (error || typeof data !== 'boolean') {
    console.error('consume_rate_limit failed', error)
    return null
  }
  return data
}
