const escapeHtml = (value: unknown) =>
  String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')

/**
 * Best-effort note to the operator. A failed email must never undo a payment
 * that already went through, so errors are logged and swallowed.
 */
export async function notifyOperator(subject: string, lines: Record<string, unknown>) {
  const apiKey = Deno.env.get('RESEND_API_KEY')
  const to = Deno.env.get('BOOKING_NOTIFICATION_EMAIL')
  const from = Deno.env.get('BOOKING_FROM_EMAIL')
  if (!apiKey || !to || !from) {
    console.warn('Operator email is not configured; skipped', { subject })
    return
  }

  const rows = Object.entries(lines)
    .map(([label, value]) =>
      `<tr><td style="padding:6px 12px;color:#777">${escapeHtml(label)}</td><td style="padding:6px 12px"><strong>${escapeHtml(value)}</strong></td></tr>`
    )
    .join('')

  try {
    const response = await fetch('https://api.resend.com/emails', {
      signal: AbortSignal.timeout(10_000),
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from,
        to: [to],
        subject,
        html: `<div style="font-family:Arial,sans-serif;color:#161616"><table style="border-collapse:collapse">${rows}</table></div>`,
      }),
    })
    if (!response.ok) console.error('Operator email failed', { subject, error: await response.text() })
  } catch (error) {
    console.error('Operator email error', { subject, error: error instanceof Error ? error.message : String(error) })
  }
}
