import { useState } from 'react'

// Selectable emoji chips plus an optional free-text field. Single-select:
// picking a chip fills `value`; typing in the box overrides it.
export default function ChipSelect({ options, value, onChange, placeholder }) {
  const [custom, setCustom] = useState('')

  const isChip = options.some((o) => o.label === value)

  return (
    <div className="flex w-full flex-col gap-4">
      <div className="flex flex-wrap justify-center gap-2.5">
        {options.map((opt) => {
          const active = value === opt.label
          return (
            <button
              key={opt.label}
              type="button"
              onClick={() => {
                setCustom('')
                onChange(opt.label)
              }}
              className={`group rounded-full border px-4 py-2.5 font-display text-sm font-semibold transition-all duration-200 active:scale-95 ${
                active
                  ? 'border-transparent bg-gradient-to-r from-blush-500 to-blush-400 text-white shadow-lg shadow-blush-300/50 scale-105'
                  : 'border-blush-200 bg-white/70 text-blush-600 hover:-translate-y-0.5 hover:border-blush-300 hover:shadow-md'
              }`}
            >
              <span className="mr-1.5">{opt.emoji}</span>
              {opt.label}
            </button>
          )
        })}
      </div>

      <div className="relative">
        <input
          type="text"
          value={isChip ? '' : value}
          placeholder={placeholder}
          onChange={(e) => {
            setCustom(e.target.value)
            onChange(e.target.value)
          }}
          className="w-full rounded-2xl border border-blush-200 bg-white/70 px-4 py-3 text-center font-body text-blush-600 placeholder:text-blush-300 outline-none transition-all duration-200 focus:border-blush-400 focus:bg-white focus:ring-4 focus:ring-blush-200/50"
        />
      </div>
    </div>
  )
}
