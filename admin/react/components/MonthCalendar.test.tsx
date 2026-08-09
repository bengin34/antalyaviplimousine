// @vitest-environment jsdom
import { afterEach, describe, expect, test, vi } from 'vitest'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { MonthCalendar } from './MonthCalendar'

afterEach(cleanup)

describe('MonthCalendar', () => {
  test('shows trip counts, selects an active day and changes months', () => {
    const onMonthChange = vi.fn()
    const onSelectDate = vi.fn()
    render(<MonthCalendar
      month="2026-08"
      today="2026-08-09"
      counts={new Map([['2026-08-10', 2]])}
      selectedDate={null}
      onMonthChange={onMonthChange}
      onSelectDate={onSelectDate}
    />)

    const activeDay = screen.getByRole('button', { name: '10 Ağustos 2026 Pazartesi, 2 seyahat' })
    const emptyDay = screen.getByRole('button', { name: '11 Ağustos 2026 Salı, 0 seyahat' })
    expect((activeDay as HTMLButtonElement).disabled).toBe(false)
    expect((emptyDay as HTMLButtonElement).disabled).toBe(true)

    fireEvent.click(activeDay)
    fireEvent.click(screen.getByRole('button', { name: 'Sonraki ay' }))

    expect(onSelectDate).toHaveBeenCalledWith('2026-08-10')
    expect(onMonthChange).toHaveBeenCalledWith('2026-09')
  })
})
