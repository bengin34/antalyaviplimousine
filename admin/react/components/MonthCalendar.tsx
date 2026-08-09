import { useMemo } from 'react'
import { ISTANBUL_TIME_ZONE, monthLabel } from '../lib/format'
import { buildMonthCalendar, shiftCalendarMonth } from '../pages/timeline-logic'

const WEEKDAYS = ['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz']

function calendarDayLabel(isoDate: string, count: number) {
  const date = new Date(`${isoDate}T12:00:00Z`)
  const label = new Intl.DateTimeFormat('tr-TR', {
    timeZone: ISTANBUL_TIME_ZONE,
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
  }).format(date)
  return `${label}, ${count} seyahat`
}

export function MonthCalendar({ month, today, counts, selectedDate, onMonthChange, onSelectDate }: {
  month: string
  today: string
  counts: ReadonlyMap<string, number>
  selectedDate: string | null
  onMonthChange: (month: string) => void
  onSelectDate: (date: string) => void
}) {
  const days = useMemo(() => buildMonthCalendar(month), [month])
  const monthStats = useMemo(() => days.reduce((totals, day) => {
    const count = day ? counts.get(day.isoDate) ?? 0 : 0
    return { trips: totals.trips + count, activeDays: totals.activeDays + (count > 0 ? 1 : 0) }
  }, { trips: 0, activeDays: 0 }), [counts, days])
  const isCurrentMonth = month === today.slice(0, 7)

  return <section className="month-calendar" aria-label="Aylık seyahat takvimi">
    <div className="month-calendar-header">
      <button className="month-calendar-nav" type="button" aria-label="Önceki ay" onClick={() => onMonthChange(shiftCalendarMonth(month, -1))}>‹</button>
      <div className="month-calendar-heading" aria-live="polite">
        <strong>{monthLabel(month)}</strong>
        <span>{monthStats.trips ? `${monthStats.trips} seyahat · ${monthStats.activeDays} gün` : 'Bu ay seyahat yok'}</span>
      </div>
      <button className="month-calendar-nav" type="button" aria-label="Sonraki ay" onClick={() => onMonthChange(shiftCalendarMonth(month, 1))}>›</button>
    </div>
    {!isCurrentMonth && <button className="month-calendar-today" type="button" onClick={() => onMonthChange(today.slice(0, 7))}>Bu aya dön</button>}
    <div className="month-calendar-weekdays" aria-hidden="true">
      {WEEKDAYS.map(day => <span key={day}>{day}</span>)}
    </div>
    <div className="month-calendar-grid">
      {days.map((day, index) => {
        if (!day) return <span className="month-calendar-empty" aria-hidden="true" key={`empty-${index}`} />
        const count = counts.get(day.isoDate) ?? 0
        const hasTrips = count > 0
        return <button
          className={`month-calendar-day${hasTrips ? ' has-trips' : ''}${day.isoDate === today ? ' is-today' : ''}${day.isoDate === selectedDate ? ' is-selected' : ''}`}
          type="button"
          key={day.isoDate}
          disabled={!hasTrips}
          aria-label={calendarDayLabel(day.isoDate, count)}
          aria-pressed={day.isoDate === selectedDate}
          onClick={() => onSelectDate(day.isoDate)}
        >
          <time dateTime={day.isoDate}>{day.day}</time>
          {hasTrips && <span className="month-calendar-count" aria-hidden="true">{count}</span>}
        </button>
      })}
    </div>
    <div className="month-calendar-legend"><span aria-hidden="true" /> Seyahat olan gün · sayı seyahat adedini gösterir</div>
  </section>
}
