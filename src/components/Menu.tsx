import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Reveal } from './Reveal'
import { COURSES as COURSE_IMAGES, TASTING_MENU } from '../data/menu'
import { useLanguage } from '../i18n/LanguageContext'

export function Menu() {
  const { t } = useLanguage()
  const [active, setActive] = useState(0)
  const course = t.menu.courses[active]
  const image = COURSE_IMAGES[active]

  return (
    <section id="menu" className="relative bg-surface px-6 py-28 sm:px-10 sm:py-36">
      <div className="mx-auto max-w-content">
        <Reveal className="text-center">
          <p className="font-body text-[11px] uppercase tracking-widest3 text-accent">{t.menu.eyebrow}</p>
          <h2 className="mt-5 font-display text-4xl text-text-primary sm:text-5xl">{t.menu.title}</h2>
          <p className="mt-3 font-body text-sm font-light tracking-wide text-muted/80">
            {t.menu.subtitle} · <span className="text-text-primary">{TASTING_MENU.price} {t.menu.priceSuffix}</span>
          </p>
        </Reveal>

        {/* Desktop / tablet-landscape: interactive list + large reveal image. */}
        <div className="mt-16 hidden gap-16 sm:mt-24 lg:grid lg:grid-cols-2">
          <Reveal direction="left">
            <ul className="divide-y divide-stroke/40 border-y border-stroke/40">
              {t.menu.courses.map((c, i) => (
                <li key={c.title}>
                  <button
                    data-cursor
                    onClick={() => setActive(i)}
                    onMouseEnter={() => setActive(i)}
                    aria-pressed={active === i}
                    className="flex w-full items-baseline gap-5 py-5 text-left transition-colors"
                  >
                    <span
                      className={`font-display text-lg transition-colors ${
                        active === i ? 'text-accent' : 'text-muted/50'
                      }`}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span
                      className={`font-display text-xl transition-colors sm:text-2xl ${
                        active === i ? 'text-text-primary' : 'text-muted/60'
                      }`}
                    >
                      {c.title}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal direction="right" className="relative overflow-hidden bg-bg">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0"
              >
                <img src={image.image} alt={course.title} className="h-full w-full object-cover" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                  <p className="font-body text-xs uppercase tracking-widest2 text-accent">
                    {String(active + 1).padStart(2, '0')} {t.menu.courseOf}
                  </p>
                  <h3 className="mt-2 font-display text-2xl text-text-primary sm:text-3xl">{course.title}</h3>
                  <p className="mt-3 max-w-md font-body text-sm font-light leading-relaxed text-muted/90">
                    {course.description}
                  </p>
                  <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-1">
                    {course.ingredients.map((ing) => (
                      <li key={ing} className="font-body text-[11px] uppercase tracking-wide text-muted/60">
                        {ing}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </AnimatePresence>
          </Reveal>
        </div>

        {/* Mobile / tablet-portrait: a full menu list, thumbnail always visible, no tap required. */}
        <div className="mt-14 flex flex-col divide-y divide-stroke/40 border-y border-stroke/40 lg:hidden">
          {t.menu.courses.map((c, i) => (
            <Reveal key={c.title} delay={i * 0.04}>
              <div className="flex gap-4 py-6">
                <img
                  src={COURSE_IMAGES[i].image}
                  alt={c.title}
                  loading="lazy"
                  className="h-20 w-20 shrink-0 rounded-2xl border border-stroke object-cover sm:h-24 sm:w-24"
                />
                <div className="min-w-0 flex-1">
                  <p className="font-body text-[11px] uppercase tracking-widest2 text-accent">
                    {String(i + 1).padStart(2, '0')} {t.menu.courseOf}
                  </p>
                  <h3 className="mt-1 font-display text-lg text-text-primary sm:text-xl">{c.title}</h3>
                  <p className="mt-1 font-body text-xs font-light leading-relaxed text-muted/90">{c.description}</p>
                  <ul className="mt-2 flex flex-wrap gap-x-3 gap-y-1">
                    {c.ingredients.map((ing) => (
                      <li key={ing} className="font-body text-[10px] uppercase tracking-wide text-muted/60">
                        {ing}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
