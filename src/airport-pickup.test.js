import { describe, expect, test } from 'vitest'
import {
  AIRPORT_CHECKIN_LEAD_MIN,
  DEFAULT_PICKUP_RULE,
  REGION_PICKUP_RULES,
  airportPickupLeadMinutes,
  comparePickupTime,
  formatDurationTr,
  pickupRuleFor,
  pickupRuleSummary,
  recommendedAirportPickup,
} from './airport-pickup.js'
import { routeCatalog } from './routes.js'

describe('bölge alınma kuralları', () => {
  test('yolcu havalimanında kalkıştan 2,5 saat önce olur', () => {
    expect(AIRPORT_CHECKIN_LEAD_MIN).toBe(150)
  })

  test('her rota bölgesi için kural vardır ve yol süresi rota kataloğundan gelir', () => {
    for (const [slug, route] of Object.entries(routeCatalog)) {
      expect(REGION_PICKUP_RULES[slug]).toBeDefined()
      expect(REGION_PICKUP_RULES[slug].driveMin).toBe(route.durationMin)
      expect(REGION_PICKUP_RULES[slug].bufferMin).toBeGreaterThan(0)
    }
  })

  test('bölgesi bilinmeyen alışta en uzun güvenli varsayım uygulanır', () => {
    expect(pickupRuleFor('hotel')).toBe(DEFAULT_PICKUP_RULE)
    expect(pickupRuleFor('private_address')).toBe(DEFAULT_PICKUP_RULE)
    expect(pickupRuleFor('airport')).toBeNull()
    expect(pickupRuleFor('')).toBeNull()
  })

  test('toplam geri sayım check-in + yol + trafik payıdır', () => {
    // Belek: 35 dk yol + 15 dk trafik payı + 150 dk havalimanı payı
    expect(airportPickupLeadMinutes('belek')).toBe(200)
    // Alanya: 120 + 30 + 150
    expect(airportPickupLeadMinutes('alanya')).toBe(300)
    expect(airportPickupLeadMinutes('airport')).toBeNull()
  })

  test('uzak bölgeler daha uzun trafik payı taşır', () => {
    expect(REGION_PICKUP_RULES.alanya.bufferMin).toBeGreaterThan(REGION_PICKUP_RULES.belek.bufferMin)
    expect(REGION_PICKUP_RULES.kemer.bufferMin).toBeGreaterThan(REGION_PICKUP_RULES.antalya.bufferMin)
  })
})

describe('recommendedAirportPickup', () => {
  test('kalkış saatinden bölge kuralı kadar geriye sayar', () => {
    // 14:00 kalkış − 200 dk = 10:40
    expect(recommendedAirportPickup('14:00', 'belek').time).toBe('10:40')
    // 14:00 kalkış − 300 dk = 09:00
    expect(recommendedAirportPickup('14:00', 'alanya').time).toBe('09:00')
  })

  test('saniyeli TIME değerlerini kabul eder', () => {
    expect(recommendedAirportPickup('14:00:00', 'belek').time).toBe('10:40')
  })

  test('5 dakikalık dilime her zaman erken tarafa yuvarlar', () => {
    // Antalya: 25 + 15 + 150 = 190 dk. 12:00 − 190 = 08:50
    expect(recommendedAirportPickup('12:00', 'antalya').time).toBe('08:50')
    // 12:04 − 190 = 08:54 → 08:50
    expect(recommendedAirportPickup('12:04', 'antalya').time).toBe('08:50')
  })

  test('gece yarısını geçen erken uçuşlarda bir önceki günü işaretler', () => {
    // Alanya 300 dk: 02:00 kalkış → önceki gün 21:00
    const pickup = recommendedAirportPickup('02:00', 'alanya')
    expect(pickup.time).toBe('21:00')
    expect(pickup.dayOffset).toBe(-1)
  })

  test('kalkış saati veya bölge yoksa tavsiye üretmez', () => {
    expect(recommendedAirportPickup('', 'belek')).toBeNull()
    expect(recommendedAirportPickup('24:00', 'belek')).toBeNull()
    expect(recommendedAirportPickup('14:00', 'airport')).toBeNull()
  })

  test('kuralın dökümünü okunabilir biçimde açıklar', () => {
    const summary = pickupRuleSummary(recommendedAirportPickup('14:00', 'belek'))
    expect(summary).toContain('Belek')
    expect(summary).toContain('2 sa 30 dk havalimanı payı')
    expect(summary).toContain('35 dk yol')
    expect(summary).toContain('15 dk trafik payı')
    expect(summary).toContain('3 sa 20 dk önce')
  })
})

describe('comparePickupTime', () => {
  const pickup = recommendedAirportPickup('14:00', 'belek') // 10:40

  test('tavsiyeden geç alış saatini işaretler', () => {
    const late = comparePickupTime('12:00', pickup)
    expect(late.diffMinutes).toBe(80)
    expect(late.isLate).toBe(true)
  })

  test('15 dakikaya kadar sapmayı sorun saymaz', () => {
    expect(comparePickupTime('10:55', pickup).isLate).toBe(false)
    expect(comparePickupTime('10:40', pickup).onTime).toBe(true)
  })

  test('önceki güne taşan tavsiyede gün farkını hesaba katar', () => {
    const earlyFlight = recommendedAirportPickup('02:00', 'alanya') // önceki gün 21:00
    const comparison = comparePickupTime('01:00', earlyFlight)
    expect(comparison.diffMinutes).toBe(240)
    expect(comparison.isLate).toBe(true)
  })
})

describe('formatDurationTr', () => {
  test('saat ve dakikayı Türkçe kısaltmalarla yazar', () => {
    expect(formatDurationTr(45)).toBe('45 dk')
    expect(formatDurationTr(120)).toBe('2 sa')
    expect(formatDurationTr(150)).toBe('2 sa 30 dk')
  })
})
