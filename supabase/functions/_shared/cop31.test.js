import { describe, expect, it } from 'vitest'
import { COP31_DAILY_RATE_EUR, isCop31Period, transferFare } from './cop31.js'

describe('COP31 package', () => {
  it('charges the published day rates', () => {
    expect(COP31_DAILY_RATE_EUR).toEqual({ vito: 200, vclass: 250 })
  })

  it('takes hires inside the window, including arrival and departure days', () => {
    expect(isCop31Period('2026-11-09', '2026-11-20')).toBe(true)
    expect(isCop31Period('2026-11-07', '2026-11-22')).toBe(true)
    expect(isCop31Period('2026-11-12', '2026-11-12')).toBe(true)
  })

  it('refuses hires that leave the window, run backwards or are malformed', () => {
    expect(isCop31Period('2026-11-06', '2026-11-10')).toBe(false)
    expect(isCop31Period('2026-11-20', '2026-11-23')).toBe(false)
    expect(isCop31Period('2026-11-12', '2026-11-10')).toBe(false)
    expect(isCop31Period('', '2026-11-10')).toBe(false)
    expect(isCop31Period('2026-11-1', '2026-11-10')).toBe(false)
  })
})

describe('summit transfer floor', () => {
  it('floors airport legs on summit days only, each leg on its own date', () => {
    expect(transferFare(53, ['2026-11-10'], true)).toBe(100)
    expect(transferFare(173, ['2026-11-10'], true)).toBe(173)
    expect(transferFare(53, ['2026-11-09'], true)).toBe(100)
    expect(transferFare(53, ['2026-11-20'], true)).toBe(100)
    expect(transferFare(53, ['2026-11-08'], true)).toBe(53)
    expect(transferFare(53, ['2026-11-21'], true)).toBe(53)
    expect(transferFare(53, ['2026-11-10', '2026-11-15'], true)).toBe(200)
    expect(transferFare(53, ['2026-11-08', '2026-11-15'], true)).toBe(153)
    expect(transferFare(53, ['2026-11-20', '2026-11-21'], true)).toBe(153)
    expect(transferFare(53, ['2026-11-01', '2026-11-02'], true)).toBe(106)
  })

  it('leaves journeys without an airport end alone', () => {
    expect(transferFare(53, ['2026-11-10', '2026-11-12'], false)).toBe(106)
  })
})
