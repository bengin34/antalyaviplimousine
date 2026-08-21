import { describe, expect, test } from 'vitest'
import { berlinTodayISO, fmtBerlinLongDate, todayISO } from './format'

describe('Berlin profit distribution dates', () => {
  test('keeps the Berlin business date distinct from the Istanbul admin date at midnight boundaries', () => {
    const boundary = new Date('2026-01-01T22:30:00.000Z')

    expect(berlinTodayISO(boundary)).toBe('2026-01-01')
    expect(todayISO(boundary)).toBe('2026-01-02')
  })

  test('formats persisted distribution timestamps in Europe/Berlin', () => {
    expect(fmtBerlinLongDate('2026-03-31T22:30:00.000Z')).toBe('1 Nisan 2026')
  })
})
