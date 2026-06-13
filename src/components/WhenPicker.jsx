import { useState } from 'react'

// A cute, fully-responsive date + time picker:
//  • a themed month calendar (no native popup quirks, great on mobile)
//  • quick time chips + a native time field
// Emits a human-readable string via onChange, e.g.
//   "Sat, Jun 20, 2026 at 6:30 PM"
const WEEKDAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S']
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]
const TIME_CHIPS = [
  { label: '☀️ 10:00 AM', value: '10:00' },
  { label: '🍵 1:00 PM', value: '13:00' },
  { label: '☕ 4:00 PM', value: '16:00' },
  { label: '🌆 7:00 PM', value: '19:00' },
]

const startOfDay = (d) => new Date(d.getFullYear(), d.getMonth(), d.getDate())

export default function WhenPicker({ onChange }) {
  const today = startOfDay(new Date())

  const [view, setView] = useState({ year: today.getFullYear(), month: today.getMonth() })
  const [selectedDay, setSelectedDay] = useState(null) // Date or null
  const [time, setTime] = useState('') // "HH:MM"

  const to12h = (t) => {
    const [hStr, m] = t.split(':')
    let h = parseInt(hStr, 10)
    const ampm = h >= 12 ? 'PM' : 'AM'
    h = h % 12 || 12
    return `${h}:${m} ${ampm}`
  }

  // Push the combined value up whenever both halves are known.
  const emit = (day, t) => {
    if (!day || !t) return
    const [h, m] = t.split(':').map(Number)
    const dt = new Date(day.getFullYear(), day.getMonth(), day.getDate(), h, m)
    onChange(
      dt.toLocaleString(undefined, {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
      }),
    )
  }

  const pickDay = (day) => {
    setSelectedDay(day)
    emit(day, time)
  }
  const pickTime = (t) => {
    setTime(t)
    emit(selectedDay, t)
  }

  // Calendar grid maths
  const firstWeekday = new Date(view.year, view.month, 1).getDay()
  const daysInMonth = new Date(view.year, view.month + 1, 0).getDate()
  const cells = [
    ...Array.from({ length: firstWeekday }, () => null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ]

  const atFirstMonth =
    view.year === today.getFullYear() && view.month === today.getMonth()

  const shiftMonth = (delta) => {
    setView((v) => {
      const m = v.month + delta
      return { year: v.year + Math.floor(m / 12), month: ((m % 12) + 12) % 12 }
    })
  }

  const sameDay = (a, b) =>
    a && b && a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate()

  return (
    <div className="flex w-full flex-col gap-4">
      {/* Calendar */}
      <div className="rounded-2xl border border-blush-100 bg-white/60 p-3 sm:p-4">
        <div className="mb-2 flex items-center justify-between">
          <button
            type="button"
            onClick={() => shiftMonth(-1)}
            disabled={atFirstMonth}
            className="flex h-9 w-9 items-center justify-center rounded-full text-blush-500 transition hover:bg-blush-100 disabled:opacity-25"
            aria-label="Previous month"
          >
            ‹
          </button>
          <span className="font-display text-sm font-bold text-blush-600 sm:text-base">
            {MONTHS[view.month]} {view.year}
          </span>
          <button
            type="button"
            onClick={() => shiftMonth(1)}
            className="flex h-9 w-9 items-center justify-center rounded-full text-blush-500 transition hover:bg-blush-100"
            aria-label="Next month"
          >
            ›
          </button>
        </div>

        <div className="grid grid-cols-7 gap-1 text-center">
          {WEEKDAYS.map((d, i) => (
            <span key={i} className="py-1 font-display text-[11px] font-bold text-blush-300">
              {d}
            </span>
          ))}
          {cells.map((day, i) => {
            if (day === null) return <span key={`e${i}`} />
            const date = new Date(view.year, view.month, day)
            const past = date < today
            const selected = sameDay(date, selectedDay)
            const isToday = sameDay(date, today)
            return (
              <button
                key={day}
                type="button"
                disabled={past}
                onClick={() => pickDay(date)}
                className={`flex aspect-square items-center justify-center rounded-full text-sm font-semibold transition-all duration-150 active:scale-90 ${
                  selected
                    ? 'bg-gradient-to-br from-blush-500 to-blush-400 text-white shadow-md shadow-blush-300/50'
                    : past
                    ? 'cursor-not-allowed text-blush-200'
                    : `text-blush-600 hover:bg-blush-100 ${isToday ? 'ring-1 ring-blush-300' : ''}`
                }`}
              >
                {day}
              </button>
            )
          })}
        </div>
      </div>

      {/* Time */}
      <div className="flex flex-col gap-2.5">
        <div className="flex flex-wrap justify-center gap-2">
          {TIME_CHIPS.map((c) => {
            const active = time === c.value
            return (
              <button
                key={c.value}
                type="button"
                onClick={() => pickTime(c.value)}
                className={`rounded-full border px-3 py-2 font-display text-xs font-semibold transition-all duration-200 active:scale-95 ${
                  active
                    ? 'border-transparent bg-gradient-to-r from-blush-500 to-blush-400 text-white shadow-md'
                    : 'border-blush-200 bg-white/70 text-blush-600 hover:-translate-y-0.5 hover:border-blush-300'
                }`}
              >
                {c.label}
              </button>
            )
          })}
        </div>
        <div className="flex items-center justify-center gap-2">
          <span className="font-body text-xs text-blush-400">or pick a time</span>
          <input
            type="time"
            value={time}
            onChange={(e) => pickTime(e.target.value)}
            className="rounded-xl border border-blush-200 bg-white/70 px-3 py-2 text-center font-display text-sm font-semibold text-blush-600 outline-none transition focus:border-blush-400 focus:bg-white focus:ring-4 focus:ring-blush-200/50"
          />
        </div>
      </div>

      {selectedDay && time && (
        <p className="text-center font-body text-sm text-blush-500">
          📅{' '}
          <span className="font-semibold">
            {selectedDay.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })} at {to12h(time)}
          </span>{' '}
          — can't wait! 🥰
        </p>
      )}
    </div>
  )
}
