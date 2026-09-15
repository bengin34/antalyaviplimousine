import { expect, test } from 'vitest'
import { buildFlightCheckMessage } from './whatsapp-templates.js'

const booking = {
  customer_name: 'Anna Weber',
  language: 'de',
  flight_number: 'XQ123',
  pickup_date: '2026-10-04',
  flight_verification_status: 'not_found',
}

test('uçuş numarasını ve tarihi müşterinin dilinde sorar', () => {
  const message = buildFlightCheckMessage(booking)

  expect(message).toContain('Anna Weber')
  expect(message).toContain('XQ123')
  // Tarih diğer şablonlarla aynı biçimde, ham ISO olarak yazılır.
  expect(message).toContain('2026-10-04')
  expect(message.toLowerCase()).toContain('flug')
})

test('yanlış havalimanı durumunu uçuş bulunamadıdan ayrı anlatır', () => {
  const notFound = buildFlightCheckMessage({ ...booking, language: 'en' })
  const wrongAirport = buildFlightCheckMessage({ ...booking, language: 'en', flight_verification_status: 'wrong_airport' })

  expect(notFound).not.toBe(wrongAirport)
  expect(wrongAirport).toMatch(/Antalya/i)
})

test('bilinmeyen dil İngilizceye düşer', () => {
  expect(buildFlightCheckMessage({ ...booking, language: 'sv' })).toContain('Dear Anna Weber')
})

test('uçuş numarası yoksa uydurmaz', () => {
  const message = buildFlightCheckMessage({ ...booking, flight_number: null })

  expect(message).not.toContain('null')
  expect(message).not.toContain('undefined')
})

test('her dil için kendi metnini üretir', () => {
  const messages = ['en', 'de', 'ru', 'tr', 'fr', 'ar'].map(language =>
    buildFlightCheckMessage({ ...booking, language }))

  expect(new Set(messages).size).toBe(6)
  expect(messages.every(message => message.includes('XQ123'))).toBe(true)
})
