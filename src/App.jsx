import { useState, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import emailjs from '@emailjs/browser'

import FloatingHearts from './components/FloatingHearts'
import RunawayButton from './components/RunawayButton'
import ChipSelect from './components/ChipSelect'
import WhenPicker from './components/WhenPicker'
import ProgressHearts from './components/ProgressHearts'
import Celebration from './components/Celebration'
import { EMAILJS_CONFIG, isEmailConfigured } from './emailConfig'

// Famous & best café / coffee spots in Faisalabad ☕
const PLACE_OPTIONS = [
  { emoji: '🫘', label: 'The Coffee Bean & Tea Leaf' },
  { emoji: '✨', label: 'Cafe Eleganza' },
  { emoji: '☕', label: "Gloria Jean's" },
  { emoji: '🤍', label: 'Whytes Coffee' },
  { emoji: '🥛', label: 'Latteete' },
  { emoji: '🍵', label: 'Chaye Khana' },
  { emoji: '🧋', label: 'Coffee & Co' },
  { emoji: '🌿', label: 'Cafe Cilantro' },
]

const DESSERT_OPTIONS = [
  { emoji: '🍰', label: 'Cake' },
  { emoji: '🍦', label: 'Ice Cream' },
  { emoji: '🧁', label: 'Cupcakes' },
  { emoji: '🍩', label: 'Donuts' },
  { emoji: '🍫', label: 'Chocolate' },
  { emoji: '🥞', label: 'Pancakes' },
]

const TOTAL_QUESTIONS = 5

// The one this little experience is for 💕
const LOVE_NAME = 'Faiqa G'

// framer-motion slide+fade variants for each step
const variants = {
  enter: { opacity: 0, x: 60, scale: 0.97 },
  center: { opacity: 1, x: 0, scale: 1 },
  exit: { opacity: 0, x: -60, scale: 0.97 },
}

export default function App() {
  const [step, setStep] = useState(0)
  const [form, setForm] = useState({
    date: '',
    confirm: '',
    place: '',
    when: '',
    dessert: '',
  })
  const [status, setStatus] = useState('idle') // idle | sending | sent | error | skipped

  const update = (key, value) => setForm((f) => ({ ...f, [key]: value }))
  const next = () => setStep((s) => s + 1)

  const sendEmail = useCallback(
    async (finalForm) => {
      const timestamp = new Date().toLocaleString()

      // No backend: if keys aren't set, run in demo mode instead of crashing.
      if (!isEmailConfigured()) {
        console.info('[EmailJS] Not configured — demo mode. Payload:', {
          ...finalForm,
          timestamp,
        })
        setStatus('skipped')
        return
      }

      setStatus('sending')
      try {
        await emailjs.send(
          EMAILJS_CONFIG.serviceId,
          EMAILJS_CONFIG.templateId,
          {
            love_name: LOVE_NAME,
            date_answer: finalForm.date,
            confirm_answer: finalForm.confirm,
            place: finalForm.place,
            when: finalForm.when,
            dessert: finalForm.dessert,
            timestamp,
            // a single readable block as a convenience template variable
            message: [
              `💖 ${LOVE_NAME} responded to your coffee date!`,
              ``,
              `☕ Coffee date: ${finalForm.date}`,
              `😏 Real date: ${finalForm.confirm}`,
              `📍 Café: ${finalForm.place}`,
              `📅 When: ${finalForm.when}`,
              `🍰 Dessert: ${finalForm.dessert}`,
              ``,
              `🕒 Submitted: ${timestamp}`,
            ].join('\n'),
          },
          { publicKey: EMAILJS_CONFIG.publicKey },
        )
        setStatus('sent')
      } catch (err) {
        console.error('[EmailJS] send failed:', err)
        setStatus('error')
      }
    },
    [],
  )

  // Move to the celebration screen and fire off the email.
  const finish = (finalForm) => {
    setStep(5)
    sendEmail(finalForm)
  }

  return (
    <div className="relative flex min-h-[100svh] w-full items-center justify-center overflow-hidden p-4">
      <FloatingHearts count={16} />

      <main className="relative z-10 w-full max-w-md">
        {step < 5 && (
          <div className="mb-5 flex flex-col items-center gap-3">
            <ProgressHearts current={step} total={TOTAL_QUESTIONS} />
          </div>
        )}

        <div className="glass rounded-[2rem] p-7 sm:p-9">
          <AnimatePresence mode="wait">
            {/* STEP 1 — the big question */}
            {step === 0 && (
              <motion.div
                key="step0"
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="flex flex-col items-center text-center"
              >
                <div className="mb-3 text-6xl">☕</div>
                <p className="font-body text-base font-semibold tracking-wide text-blush-400">
                  Hey 💕
                </p>
                <h2 className="my-1 animate-pop bg-gradient-to-r from-blush-600 via-blush-500 to-blush-400 bg-clip-text font-display text-4xl font-extrabold leading-tight text-transparent drop-shadow-sm sm:text-5xl">
                  {LOVE_NAME}
                </h2>
                <div className="mx-auto mb-3 h-1 w-16 rounded-full bg-gradient-to-r from-blush-400 to-blush-300" />
                <h1 className="font-display text-2xl font-extrabold leading-snug text-blush-600 sm:text-3xl">
                  Will you go on a coffee date with me?
                  <span className="ml-1">☕❤️</span>
                </h1>
                <p className="mt-3 font-body text-blush-400">
                  Pretty please? Pick wisely 😌
                </p>

                <div className="mt-7 flex w-full flex-col items-center gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      update('date', 'YES! 💖')
                      next()
                    }}
                    className="w-full rounded-full bg-gradient-to-r from-blush-500 to-blush-400 px-8 py-4 font-display text-lg font-bold text-white shadow-lg shadow-blush-300/60 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl active:scale-95"
                  >
                    Yes 💕
                  </button>
                  <RunawayButton />
                </div>
              </motion.div>
            )}

            {/* STEP 2 — confirmation */}
            {step === 1 && (
              <motion.div
                key="step1"
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="flex flex-col items-center text-center"
              >
                <div className="mb-3 text-6xl">😏</div>
                <h1 className="font-display text-2xl font-extrabold leading-snug text-blush-600 sm:text-3xl">
                  Is this a real date?
                </h1>
                <p className="mt-3 font-body text-blush-400">No take-backs now 😉</p>

                <div className="mt-7 flex w-full flex-col gap-3 sm:flex-row">
                  <button
                    type="button"
                    onClick={() => {
                      update('confirm', 'Yes, for real 💍')
                      next()
                    }}
                    className="flex-1 rounded-full bg-gradient-to-r from-blush-500 to-blush-400 px-6 py-4 font-display text-lg font-bold text-white shadow-lg shadow-blush-300/60 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl active:scale-95"
                  >
                    Yes 💖
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      update('confirm', 'Of course! 🥰')
                      next()
                    }}
                    className="flex-1 rounded-full border-2 border-blush-300 bg-white/80 px-6 py-4 font-display text-lg font-bold text-blush-600 shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:bg-white hover:shadow-lg active:scale-95"
                  >
                    Of course ✨
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 3 — café in Faisalabad */}
            {step === 2 && (
              <StepCard
                key="step2"
                emoji="📍"
                title="Which café in Faisalabad?"
                hint="Pick a famous spot or type your own ☕"
                value={form.place}
                onContinue={next}
              >
                <ChipSelect
                  options={PLACE_OPTIONS}
                  value={form.place}
                  onChange={(v) => update('place', v)}
                  placeholder="Another café? Type it here…"
                />
              </StepCard>
            )}

            {/* STEP 4 — when are we going */}
            {step === 3 && (
              <StepCard
                key="step3"
                emoji="📅"
                title="When are we going?"
                hint="Pick the perfect day & time"
                value={form.when}
                onContinue={next}
              >
                <WhenPicker value={form.when} onChange={(v) => update('when', v)} />
              </StepCard>
            )}

            {/* STEP 5 — dessert */}
            {step === 4 && (
              <StepCard
                key="step4"
                emoji="🍰"
                title="Dessert choice?"
                hint="Last one — make it sweet"
                value={form.dessert}
                ctaLabel="Finish 🎉"
                onContinue={() => finish(form)}
              >
                <ChipSelect
                  options={DESSERT_OPTIONS}
                  value={form.dessert}
                  onChange={(v) => update('dessert', v)}
                  placeholder="Something sweeter? Type it…"
                />
              </StepCard>
            )}

            {/* STEP 6 — celebration */}
            {step === 5 && (
              <motion.div
                key="step5"
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, ease: 'easeOut' }}
              >
                <Celebration
                  form={form}
                  name={LOVE_NAME}
                  status={status}
                  onRetry={() => sendEmail(form)}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <p className="mt-5 text-center font-body text-xs text-blush-300">
          Made with ❤️ &amp; ☕
        </p>
      </main>
    </div>
  )
}

// Shared layout for the chip-select question steps.
function StepCard({ emoji, title, hint, value, children, onContinue, ctaLabel = 'Continue ☕' }) {
  const ready = value && value.trim().length > 0
  return (
    <motion.div
      variants={variants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="flex flex-col items-center text-center"
    >
      <div className="mb-3 text-5xl">{emoji}</div>
      <h1 className="font-display text-2xl font-extrabold leading-snug text-blush-600">
        {title}
      </h1>
      <p className="mb-6 mt-2 font-body text-sm text-blush-400">{hint}</p>

      {children}

      <button
        type="button"
        disabled={!ready}
        onClick={onContinue}
        className={`mt-7 w-full rounded-full px-8 py-4 font-display text-lg font-bold transition-all duration-200 ${
          ready
            ? 'bg-gradient-to-r from-blush-500 to-blush-400 text-white shadow-lg shadow-blush-300/60 hover:-translate-y-0.5 hover:shadow-xl active:scale-95'
            : 'cursor-not-allowed bg-blush-100 text-blush-300'
        }`}
      >
        {ctaLabel}
      </button>
    </motion.div>
  )
}
