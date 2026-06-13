// A row of hearts that fill as the user advances through the flow.
export default function ProgressHearts({ current, total }) {
  return (
    <div className="flex items-center justify-center gap-2" aria-label={`Step ${current} of ${total}`}>
      {Array.from({ length: total }).map((_, i) => {
        const done = i < current
        return (
          <span
            key={i}
            className={`text-lg transition-all duration-500 ${
              done ? 'scale-110 opacity-100' : 'scale-90 opacity-30 grayscale'
            }`}
            style={{ transitionDelay: `${i * 40}ms` }}
          >
            {done ? '❤️' : '🤍'}
          </span>
        )
      })}
    </div>
  )
}
