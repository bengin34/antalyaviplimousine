import { supabase } from './supabase'
import type { Booking } from '../types'
import { languageFromPhone, whatsappURL } from '../../turkish-formatters.js'
import { buildConfirmMessage, buildReceivedMessage } from '../../whatsapp-templates.js'

/**
 * Yeni rezervasyonun karşılanma adımları. `check` = "talebinizi aldık,
 * kontrol ediyoruz" mesajı; `confirm` = fiyat ve detaylarla onay mesajı.
 * Onay mesajı gönderilene kadar rezervasyon "Yeni" sekmesinde kalır.
 */
export type CustomerMessageKind = 'check' | 'confirm'

export const INBOX_STATUSES = ['pending', 'paid', 'confirmed'] as const

const SENT_COLUMN: Record<CustomerMessageKind, 'check_message_sent_at' | 'confirm_message_sent_at'> = {
  check: 'check_message_sent_at',
  confirm: 'confirm_message_sent_at',
}

function lastServiceDate(booking: Booking) {
  return [booking.pickup_date, booking.return_date, booking.service_end_date]
    .filter((value): value is string => typeof value === 'string' && value.length > 0)
    .sort()
    .at(-1) ?? null
}

/**
 * Onay mesajı bekleyen, hâlâ önünde transferi olan rezervasyon mu.
 * Kolon henüz yoksa (migration uygulanmamışsa) değer `undefined` gelir;
 * o durumda hiçbir rezervasyon "yeni" sayılmaz.
 */
export function isAwaitingConfirmation(booking: Booking, today: string) {
  if (booking.confirm_message_sent_at !== null) return false
  if (!(INBOX_STATUSES as readonly string[]).includes(booking.status)) return false
  const last = lastServiceDate(booking)
  return last !== null && last >= today
}

export function inboxStage(booking: Booking): CustomerMessageKind {
  return booking.check_message_sent_at ? 'confirm' : 'check'
}

export function countAwaitingConfirmation(bookings: Booking[], today: string) {
  return new Set(bookings
    .filter(booking => isAwaitingConfirmation(booking, today))
    .map(booking => booking.id ?? booking.booking_ref)).size
}

/** "az önce", "12 dk önce", "3 sa önce", "2 gün önce". */
export function waitingSince(createdAt: string | null | undefined, now = new Date()) {
  const created = createdAt ? Date.parse(createdAt) : Number.NaN
  if (!Number.isFinite(created)) return ''
  const minutes = Math.max(0, Math.floor((now.getTime() - created) / 60_000))
  if (minutes < 1) return 'az önce'
  if (minutes < 60) return `${minutes} dk önce`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours} sa önce`
  return `${Math.floor(hours / 24)} gün önce`
}

export function customerMessageLanguage(booking: Booking, override = '') {
  return override || booking.language || languageFromPhone(booking.customer_phone)
}

export function buildCustomerMessage(booking: Booking, kind: CustomerMessageKind, language: string, leg: 'both' | 'return' = 'both') {
  return kind === 'check'
    ? buildReceivedMessage(booking, { language })
    : buildConfirmMessage(booking, { leg, language })
}

/**
 * Mesajın gönderildiği anı kaydeder. İlk gönderim zamanı korunur: kolon
 * doluysa dokunulmaz. Kaydedilen değer (ya da var olan) döner.
 */
export async function markCustomerMessageSent(booking: Booking, kind: CustomerMessageKind) {
  const column = SENT_COLUMN[kind]
  const existing = booking[column]
  if (existing) return { sentAt: existing, error: null }
  const sentAt = new Date().toISOString()
  const { error } = await supabase.from('bookings')
    .update({ [column]: sentAt })
    .eq('id', booking.id)
    .is(column, null)
  return { sentAt: error ? null : sentAt, error }
}

export type SendCustomerMessageResult =
  | { ok: true; booking: Booking; trackingFailed: boolean }
  | { ok: false; error: string }

/**
 * Gelen kutusundaki tek dokunuşluk gönderim: WhatsApp sekmesini kullanıcı
 * tıklaması içinde açar (popup engeline takılmamak için), rezervasyonun en
 * güncel halini okur, mesajı onunla hazırlar ve gönderim anını kaydeder.
 */
export async function sendCustomerMessage(booking: Booking, kind: CustomerMessageKind): Promise<SendCustomerMessageResult> {
  const popup = window.open('about:blank', '_blank')
  if (!popup) return { ok: false, error: 'WhatsApp sekmesi açılamadı. Tarayıcıdaki açılır pencere iznini kontrol edin.' }
  try { popup.opener = null; popup.document.title = 'WhatsApp mesajı hazırlanıyor'; popup.document.body.textContent = 'Güncel rezervasyon bilgileri kontrol ediliyor…' } catch { /* redirect can still work */ }
  const { data, error } = await supabase.from('bookings').select('*').eq('id', booking.id).single()
  if (error || !data) {
    if (!popup.closed) popup.close()
    return { ok: false, error: 'Güncel rezervasyon bilgileri alınamadı; eski veriyle mesaj açılmadı.' }
  }
  const latest = data as Booking
  if (popup.closed) return { ok: false, error: 'WhatsApp sekmesi kapatıldı.' }
  popup.location.replace(whatsappURL(latest.customer_phone, buildCustomerMessage(latest, kind, customerMessageLanguage(latest))))
  const marked = await markCustomerMessageSent(latest, kind)
  const column = SENT_COLUMN[kind]
  return { ok: true, booking: { ...latest, [column]: marked.sentAt ?? latest[column] ?? null }, trackingFailed: Boolean(marked.error) }
}
