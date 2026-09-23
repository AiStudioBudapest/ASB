import { useState, type FormEvent } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Reveal } from './Reveal'
import { useLanguage } from '../i18n/LanguageContext'

const TIME_SLOTS = ['19:00', '19:30', '20:00', '20:30', '21:00', '21:30']

function todayISO() {
  return new Date().toISOString().split('T')[0]
}

export function Reservation() {
  const { t } = useLanguage()
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [guests, setGuests] = useState(2)
  const [status, setStatus] = useState<'idle' | 'sent'>('idle')

  function submit(e: FormEvent) {
    e.preventDefault()
    if (!date || !time) return
    setStatus('sent')
  }

  return (
    <section id="reservation" className="relative bg-surface px-6 py-28 sm:px-10 sm:py-36">
      <div className="mx-auto max-w-2xl text-center">
        <Reveal>
          <p className="font-body text-[11px] uppercase tracking-widest3 text-accent">{t.reservation.eyebrow}</p>
          <h2 className="mt-5 font-display text-4xl text-text-primary sm:text-5xl">{t.reservation.heading}</h2>
        </Reveal>

        <Reveal delay={0.15} className="mt-14 text-left">
          <AnimatePresence mode="wait">
            {status === 'idle' ? (
              <motion.form
                key="form"
                exit={{ opacity: 0, y: -8 }}
                onSubmit={submit}
                className="grid grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-6"
              >
                <label className="block">
                  <span className="font-body text-[11px] uppercase tracking-widest2 text-muted/70">
                    {t.reservation.dateLabel}
                  </span>
                  <input
                    required
                    type="date"
                    min={todayISO()}
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="mt-3 w-full border-b border-stroke/50 bg-transparent pb-3 font-display text-lg text-text-primary outline-none [color-scheme:dark] focus:border-accent"
                  />
                </label>

                <label className="block">
                  <span className="font-body text-[11px] uppercase tracking-widest2 text-muted/70">
                    {t.reservation.heureLabel}
                  </span>
                  <select
                    required
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="mt-3 w-full border-b border-stroke/50 bg-transparent pb-3 font-display text-lg text-text-primary outline-none [color-scheme:dark] focus:border-accent"
                  >
                    <option value="" disabled className="bg-surface">
                      —
                    </option>
                    {TIME_SLOTS.map((slot) => (
                      <option key={slot} value={slot} className="bg-surface">
                        {slot}
                      </option>
                    ))}
                  </select>
                </label>

                <div>
                  <span className="font-body text-[11px] uppercase tracking-widest2 text-muted/70">
                    {t.reservation.personnesLabel}
                  </span>
                  <div className="mt-3 flex items-center justify-between border-b border-stroke/50 pb-3">
                    <button
                      type="button"
                      data-cursor
                      aria-label={t.reservation.fewer}
                      onClick={() => setGuests((g) => Math.max(1, g - 1))}
                      className="flex h-11 w-11 items-center justify-center font-display text-2xl text-muted hover:text-accent"
                    >
                      −
                    </button>
                    <span aria-live="polite" className="font-display text-lg text-text-primary">
                      {guests}
                    </span>
                    <button
                      type="button"
                      data-cursor
                      aria-label={t.reservation.more}
                      onClick={() => setGuests((g) => Math.min(10, g + 1))}
                      className="flex h-11 w-11 items-center justify-center font-display text-2xl text-muted hover:text-accent"
                    >
                      +
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  data-cursor
                  className="group relative col-span-full mt-6 overflow-hidden border border-accent px-10 py-4 text-center transition-colors hover:bg-accent"
                >
                  <span className="font-body text-xs uppercase tracking-widest3 text-accent transition-colors group-hover:text-bg">
                    {t.reservation.submit}
                  </span>
                </button>
              </motion.form>
            ) : (
              <motion.div
                key="confirm"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="border border-stroke/40 px-8 py-12 text-center"
              >
                <p className="font-display text-2xl text-text-primary">{t.reservation.confirmTitle}</p>
                <p className="mt-3 font-body text-sm font-light text-muted/80">
                  {t.reservation.confirmTableFor} {guests} ·{' '}
                  {new Date(date).toLocaleDateString(t.dateLocale, { day: 'numeric', month: 'long' })}{' '}
                  {t.reservation.confirmAt} {time}
                </p>
                <p className="mt-6 font-body text-xs font-light text-muted/60">{t.reservation.confirmNote}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </Reveal>
      </div>
    </section>
  )
}
