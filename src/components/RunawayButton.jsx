import { useState, useRef, useCallback } from 'react'

const TAUNTS = [
  'No',
  'Really? 😢',
  'Think again 🥺',
  'Are you sure?? 😭',
  'Please? 💔',
  "Don't do this ☕",
  'Catch me first! 😝',
  'Wrong button 😅',
]

// A "No" button that dodges the cursor, drifts to random spots, and grows
// increasingly desperate with each near-miss.
export default function RunawayButton({ className = '' }) {
  const wrapRef = useRef(null)
  const [pos, setPos] = useState(null) // {x, y} translate offset, null = in-flow
  const [dodges, setDodges] = useState(0)

  const dodge = useCallback(() => {
    const wrap = wrapRef.current
    if (!wrap) return
    const { width, height } = wrap.getBoundingClientRect()
    // keep the button comfortably inside the wrapper
    const maxX = Math.max(40, width / 2 - 70)
    const maxY = Math.max(30, height / 2 - 28)
    const x = (Math.random() * 2 - 1) * maxX
    const y = (Math.random() * 2 - 1) * maxY
    setPos({ x, y })
    setDodges((d) => d + 1)
  }, [])

  const label = TAUNTS[Math.min(dodges, TAUNTS.length - 1)]

  return (
    <div
      ref={wrapRef}
      className="relative flex h-16 w-full items-center justify-center"
    >
      <button
        type="button"
        // dodge on hover (desktop) and on any touch/press attempt (mobile)
        onMouseEnter={dodge}
        onPointerDown={(e) => {
          e.preventDefault()
          dodge()
        }}
        onFocus={dodge}
        style={
          pos
            ? { transform: `translate(${pos.x}px, ${pos.y}px)` }
            : undefined
        }
        className={`absolute select-none rounded-full border-2 border-blush-200 bg-white/80 px-8 py-3 font-display font-semibold text-blush-600 shadow-md transition-transform duration-300 ease-out ${className}`}
      >
        {label}
      </button>
    </div>
  )
}
