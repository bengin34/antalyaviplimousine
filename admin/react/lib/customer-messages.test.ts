import { describe, expect, test, vi } from 'vitest'
import type { Booking } from '../types'

vi.mock('./supabase', () => ({ supabase: { from: vi.fn() } }))

import { buildCustomerMessage, countAwaitingConfirmation, inboxStage, isAwaitingConfirmation, waitingSince } from './customer-messages'

const TODAY = '2026-10-03'

function booking(overrides: Partial<Booking> = {}) {
  return {
    id: 'b-1', booking_ref: 'AVL-1', customer_name: 'Anna', customer_phone: '+491701234567',
    pickup_location: 'airport', dropoff_location: 'belek', pickup_date: '2026-10-05', pickup_time: '10:00',
    trip_type: 'one_way', return_date: null, service_end_date: null, guests: 2, vehicle_type: 'vito',
    price_eur: 60, status: 'confirmed', payment_method: 'cash', notes: null, language: 'de',
    check_message_sent_at: null, confirm_message_sent_at: null, created_at: '2026-10-03T08:00:00Z',
    ...overrides,
  } as Booking
}

describe('isAwaitingConfirmation', () => {
  test('a fresh upcoming booking is new until the confirmation message is sent', () => {
    expect(isAwaitingConfirmation(booking(), TODAY)).toBe(true)
    expect(isAwaitingConfirmation(booking({ check_message_sent_at: '2026-10-03T08:05:00Z' }), TODAY)).toBe(true)
    expect(isAwaitingConfirmation(booking({ confirm_message_sent_at: '2026-10-03T08:10:00Z' }), TODAY)).toBe(false)
  })

  test('web bookings auto-confirmed by status still need the message', () => {
    expect(isAwaitingConfirmation(booking({ status: 'confirmed' }), TODAY)).toBe(true)
    expect(isAwaitingConfirmation(booking({ status: 'paid' }), TODAY)).toBe(true)
    expect(isAwaitingConfirmation(booking({ status: 'pending' }), TODAY)).toBe(true)
  })

  test('cancelled, completed and past trips never sit in the inbox', () => {
    expect(isAwaitingConfirmation(booking({ status: 'cancelled' }), TODAY)).toBe(false)
    expect(isAwaitingConfirmation(booking({ status: 'completed' }), TODAY)).toBe(false)
    expect(isAwaitingConfirmation(booking({ pickup_date: '2026-10-01' }), TODAY)).toBe(false)
  })

  test('a round trip whose outbound is past but return is upcoming still counts', () => {
    expect(isAwaitingConfirmation(booking({ pickup_date: '2026-10-01', trip_type: 'round_trip', return_date: '2026-10-08' }), TODAY)).toBe(true)
  })

  test('rows from before the migration (column missing) are not treated as new', () => {
    const legacy = booking()
    delete (legacy as Record<string, unknown>).confirm_message_sent_at
    expect(isAwaitingConfirmation(legacy, TODAY)).toBe(false)
  })
})

describe('inbox helpers', () => {
  test('stage moves from check to confirm once the check message is sent', () => {
    expect(inboxStage(booking())).toBe('check')
    expect(inboxStage(booking({ check_message_sent_at: '2026-10-03T08:05:00Z' }))).toBe('confirm')
  })

  test('count dedupes bookings by id', () => {
    const first = booking()
    expect(countAwaitingConfirmation([first, first, booking({ id: 'b-2', confirm_message_sent_at: 'x' })], TODAY)).toBe(1)
  })

  test('waitingSince reads like an inbox timestamp', () => {
    const now = new Date('2026-10-03T10:00:00Z')
    expect(waitingSince('2026-10-03T09:59:40Z', now)).toBe('az önce')
    expect(waitingSince('2026-10-03T09:48:00Z', now)).toBe('12 dk önce')
    expect(waitingSince('2026-10-03T07:00:00Z', now)).toBe('3 sa önce')
    expect(waitingSince('2026-10-01T09:00:00Z', now)).toBe('2 gün önce')
    expect(waitingSince(null, now)).toBe('')
  })

  test('check and confirm map to the existing received and confirm templates', () => {
    expect(buildCustomerMessage(booking(), 'check', 'tr')).toContain('detayları kontrol ediyoruz')
    expect(buildCustomerMessage(booking(), 'confirm', 'tr')).toContain('onaylandı')
  })
})
