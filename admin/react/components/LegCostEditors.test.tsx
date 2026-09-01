// @vitest-environment jsdom
import { describe, test, expect } from 'vitest'
import { legDirectionLabel } from './LegCostEditors'
import type { Booking } from '../types'

const b = (over: Partial<Booking>) => ({ pickup_location: 'airport', dropoff_location: 'side', ...over }) as Booking

describe('legDirectionLabel', () => {
  test('havalimanından çıkış → Gidiş', () => {
    expect(legDirectionLabel(b({ pickup_location: 'airport', dropoff_location: 'hotel' }), 'outbound')).toBe('Gidiş')
  })

  test('varış havalimanı, kalkış değil → Dönüş (tek yön olsa da)', () => {
    expect(legDirectionLabel(b({ pickup_location: 'hotel', dropoff_location: 'airport' }), 'outbound')).toBe('Dönüş')
  })

  test('return ayağı her zaman Dönüş', () => {
    expect(legDirectionLabel(b({ pickup_location: 'airport', dropoff_location: 'hotel' }), 'return')).toBe('Dönüş')
  })

  test('dönüş planla kaydı → Dönüş', () => {
    expect(legDirectionLabel(b({ pickup_location: 'side', dropoff_location: 'kemer', manual_return_of_ref: 'AVL-1' }), 'outbound')).toBe('Dönüş')
  })

  test('iki uç da havalimanı değil → varsayılan Gidiş', () => {
    expect(legDirectionLabel(b({ pickup_location: 'side', dropoff_location: 'kemer' }), 'outbound')).toBe('Gidiş')
  })

  test('günlük hizmet gün adı', () => {
    expect(legDirectionLabel(undefined, 'day-3')).toBe('3. gün')
  })
})
