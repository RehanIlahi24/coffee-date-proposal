import { useMemo } from 'react'

const EMOJIS = ['❤️', '🩷', '☕', '✨', '🍰', '💕', '🌸']

// Decorative, non-interactive layer of emoji that drift upward forever.
export default function FloatingHearts({ count = 18 }) {
  const hearts = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => {
        const left = Math.random() * 100
        const size = 14 + Math.random() * 26
        const duration = 9 + Math.random() * 12
        const delay = Math.random() * 12
        const emoji = EMOJIS[Math.floor(Math.random() * EMOJIS.length)]
        return { i, left, size, duration, delay, emoji }
      }),
    [count],
  )

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      {hearts.map((h) => (
        <span
          key={h.i}
          className="absolute bottom-[-40px] animate-float select-none will-change-transform"
          style={{
            left: `${h.left}%`,
            fontSize: `${h.size}px`,
            animationDuration: `${h.duration}s`,
            animationDelay: `${h.delay}s`,
            filter: 'drop-shadow(0 4px 8px rgba(237,46,99,0.15))',
          }}
        >
          {h.emoji}
        </span>
      ))}
    </div>
  )
}
