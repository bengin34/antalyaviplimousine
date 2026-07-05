const encoder = new TextEncoder()

export type IyzicoConfig = {
  apiKey: string
  secretKey: string
  baseUrl: string
}

export type IyzicoResponse = Record<string, unknown> & {
  status?: string
  errorCode?: string
  errorMessage?: string
  signature?: string
}

const bytesToHex = (bytes: ArrayBuffer) =>
  Array.from(new Uint8Array(bytes))
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('')

const bytesToBase64 = (bytes: Uint8Array) => {
  let binary = ''
  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte)
  })
  return btoa(binary)
}

const hmacSha256 = async (secret: string, value: string) => {
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  )
  return bytesToHex(await crypto.subtle.sign('HMAC', key, encoder.encode(value)))
}

const secureEqual = (left: string, right: string) => {
  if (left.length !== right.length) return false

  let difference = 0
  for (let index = 0; index < left.length; index += 1) {
    difference |= left.charCodeAt(index) ^ right.charCodeAt(index)
  }
  return difference === 0
}

export const getIyzicoConfig = (): IyzicoConfig => {
  const apiKey = Deno.env.get('IYZICO_API_KEY')
  const secretKey = Deno.env.get('IYZICO_SECRET_KEY')
  const baseUrl = Deno.env.get('IYZICO_BASE_URL')

  if (!apiKey || !secretKey || !baseUrl) {
    throw new Error('iyzico credentials are not configured')
  }

  return {
    apiKey,
    secretKey,
    baseUrl: baseUrl.replace(/\/$/, ''),
  }
}

export const iyzicoRequest = async (
  config: IyzicoConfig,
  path: string,
  payload: Record<string, unknown>
): Promise<IyzicoResponse> => {
  const randomKey = `${Date.now()}${crypto.randomUUID().replaceAll('-', '')}`
  const body = JSON.stringify(payload)
  const signature = await hmacSha256(config.secretKey, `${randomKey}${path}${body}`)
  const authParameters =
    `apiKey:${config.apiKey}&randomKey:${randomKey}&signature:${signature}`
  const authorization = `IYZWSv2 ${bytesToBase64(encoder.encode(authParameters))}`

  const response = await fetch(`${config.baseUrl}${path}`, {
    method: 'POST',
    headers: {
      Authorization: authorization,
      'Content-Type': 'application/json',
      'x-iyzi-rnd': randomKey,
      'x-iyzi-client-version': 'antalyavip-supabase-1.0',
    },
    body,
  })

  const result = await response.json().catch(() => null)
  if (!response.ok || !result || typeof result !== 'object') {
    throw new Error(`iyzico request failed with HTTP ${response.status}`)
  }

  return result as IyzicoResponse
}

export const verifyIyzicoResponseSignature = async (
  secretKey: string,
  values: unknown[],
  receivedSignature: unknown
) => {
  if (typeof receivedSignature !== 'string' || !receivedSignature) return false

  const signaturePayload = values.map((value) => String(value ?? '')).join(':')
  const expectedSignature = await hmacSha256(secretKey, signaturePayload)
  return secureEqual(expectedSignature, receivedSignature.toLowerCase())
}

export const formatPrice = (value: number) => {
  return Number(value).toFixed(2)
}
