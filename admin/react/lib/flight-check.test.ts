import { describe, expect, test } from 'vitest'
import { flightCheckRows, type FlightCheckBooking } from './flight-check'

const booking = (overrides: Partial<FlightCheckBooking> = {}): FlightCheckBooking => ({
  booking_ref: 'AVL-1001',
  customer_name: 'Anna Weber',
  customer_phone: '+49 151 23456789',
  language: 'de',
  flight_number: 'XQ123',
  pickup_date: '2026-10-04',
  flight_verification_status: 'not_found',
  ...overrides,
})

describe('uçuşu doğrulanamayan rezervasyonlar', () => {
  test('WhatsApp bağlantısını müşterinin dilindeki mesajla hazırlar', () => {
    const [row] = flightCheckRows([booking()])

    expect(row.whatsappURL).toContain('wa.me/4915123456789')
    expect(decodeURIComponent(row.whatsappURL ?? '')).toContain('XQ123')
    expect(decodeURIComponent(row.whatsappURL ?? '')).toContain('Flug') // Almanca
  })

  test('detay sayfasının adresini üretir', () => {
    expect(flightCheckRows([booking()])[0].detailHash).toBe('#detail/AVL-1001?from=future')
  })

  test('referansı adres için kodlar', () => {
    const [row] = flightCheckRows([booking({ booking_ref: 'AVL/10 01' })])

    expect(row.detailHash).toBe('#detail/AVL%2F10%2001?from=future')
  })

  test('iki hata türünü ayrı etiketler', () => {
    const rows = flightCheckRows([
      booking({ booking_ref: 'A', flight_verification_status: 'not_found' }),
      booking({ booking_ref: 'B', flight_verification_status: 'wrong_airport' }),
    ])

    expect(rows.map(row => row.statusLabel)).toEqual(['Uçuş bulunamadı', 'Farklı havalimanı'])
  })

  test('en yakın tarihli transferi başa alır', () => {
    const rows = flightCheckRows([
      booking({ booking_ref: 'geç', pickup_date: '2026-12-01' }),
      booking({ booking_ref: 'yakın', pickup_date: '2026-10-04' }),
    ])

    expect(rows.map(row => row.booking_ref)).toEqual(['yakın', 'geç'])
  })

  test('telefonu olmayan kayıt için WhatsApp bağlantısı üretmez', () => {
    const [row] = flightCheckRows([booking({ customer_phone: '' })])

    expect(row.whatsappURL).toBeNull()
  })
})
