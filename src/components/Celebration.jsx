import { useEffect, useRef } from 'react'
import confetti from 'canvas-confetti'

// Final screen: bursts confetti on mount and shows a recap of the answers.
export default function Celebration({ form, name, status, onRetry }) {
  const fired = useRef(false)

  useEffect(() => {
    if (fired.current) return
    fired.current = true

    const colors = ['#ff4778', '#ff9bb3', '#ffd9e8', '#ffffff', '#ed2e63']

    // initial big burst
    confetti({
      particleCount: 140,
      spread: 90,
      origin: { y: 0.6 },
      colors,
      scalar: 1.1,
    })

    // gentle side cannons for a few seconds
    const end = Date.now() + 1600
    const frame = () => {
      confetti({ particleCount: 4, angle: 60, spread: 60, origin: { x: 0 }, colors })
      confetti({ particleCount: 4, angle: 120, spread: 60, origin: { x: 1 }, colors })
      if (Date.now() < end) requestAnimationFrame(frame)
    }
    frame()
  }, [])

  const rows = [
    { icon: '☕', label: 'Coffee date', value: form.date },
    { icon: '😏', label: 'For real', value: form.confirm },
    { icon: '📍', label: 'Café', value: form.place },
    { icon: '📅', label: 'When', value: form.when },
    { icon: '🍰', label: 'Dessert', value: form.dessert },
  ]

  return (
    <div className="flex flex-col items-center text-center">
      <div className="mb-2 animate-wiggle text-6xl">🎉</div>
      <h1 className="bg-gradient-to-r from-blush-600 to-blush-400 bg-clip-text font-display text-3xl font-extrabold text-transparent sm:text-4xl">
        Submission Successful!
      </h1>
      <p className="mt-2 font-body text-lg text-blush-600">Cheers ☕❤️</p>
      <p className="mt-1 font-body text-sm text-blush-400">
        It's a date, {name} — I can't wait to see you ✨
      </p>

      <div className="mt-6 w-full space-y-2">
        {rows.map((r) => (
          <div
            key={r.label}
            className="flex items-center justify-between rounded-2xl border border-blush-100 bg-white/60 px-4 py-2.5 text-left"
          >
            <span className="font-display text-sm font-semibold text-blush-500">
              {r.icon} {r.label}
            </span>
            <span className="ml-3 truncate font-body text-sm text-blush-700">
              {r.value || '—'}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-5 min-h-[24px] text-sm font-body">
        {status === 'sending' && (
          <span className="text-blush-400">Sending your answers… 💌</span>
        )}
        {status === 'sent' && (
          <span className="text-green-500">Your answers are on their way! 💖</span>
        )}
        {status === 'error' && (
          <span className="text-blush-600">
            Couldn't send the email.{' '}
            <button onClick={onRetry} className="font-bold underline">
              Try again
            </button>
          </span>
        )}
        {status === 'skipped' && (
          <span className="text-blush-400">
            (Demo mode — add EmailJS keys to deliver answers 💌)
          </span>
        )}
      </div>
    </div>
  )
}
