import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useLanguage } from '../i18n/LanguageContext'

interface LoadingScreenProps {
  onComplete: () => void
}

const DURATION = 2700

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const { t } = useLanguage()
  const words = t.loading.words
  const [count, setCount] = useState(0)
  const [wordIndex, setWordIndex] = useState(0)
  const [leaving, setLeaving] = useState(false)
  const prefersReduced = useReducedMotion()

  useEffect(() => {
    if (prefersReduced) {
      setCount(100)
      setLeaving(true)
      onComplete()
      return
    }

    const start = Date.now()
    const tick = setInterval(() => {
      const pct = Math.min(100, Math.round(((Date.now() - start) / DURATION) * 100))
      setCount(pct)
      if (pct >= 100) clearInterval(tick)
    }, 30)

    const wordTick = setInterval(() => {
      setWordIndex((i) => (i + 1) % words.length)
    }, 900)

    // A plain timer — not gated on any animation-completion callback — so
    // the site is guaranteed to reveal even if the browser throttles rAF.
    const leaveTimer = setTimeout(() => setLeaving(true), DURATION + 400)
    const doneTimer = setTimeout(onDone, DURATION + 400 + 700)

    function onDone() {
      onComplete()
    }

    return () => {
      clearInterval(tick)
      clearInterval(wordTick)
      clearTimeout(leaveTimer)
      clearTimeout(doneTimer)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prefersReduced])

  return (
    <AnimatePresence>
      {!leaving && (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col justify-between bg-bg px-6 py-8 md:px-10 md:py-10"
          exit={{ clipPath: 'inset(0 0 100% 0)' }}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
        >
          <motion.p
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="font-body text-xs uppercase tracking-[0.3em] text-muted"
          >
            {t.loading.label}
          </motion.p>

          <div className="flex flex-1 items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.p
                key={wordIndex}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className="font-display italic text-4xl text-text-primary/80 md:text-6xl lg:text-7xl"
              >
                {words[wordIndex]}
              </motion.p>
            </AnimatePresence>
          </div>

          <div className="flex items-end justify-between">
            <div className="h-[3px] w-40 overflow-hidden bg-stroke/50 sm:w-64">
              <div
                className="accent-gradient h-full origin-left"
                style={{
                  transform: `scaleX(${count / 100})`,
                  boxShadow: '0 0 8px hsla(38, 45%, 62%, 0.35)',
                }}
              />
            </div>
            <p className="font-display text-6xl tabular-nums text-text-primary md:text-8xl lg:text-9xl">
              {String(count).padStart(3, '0')}
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
