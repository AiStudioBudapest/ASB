import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Reveal } from './Reveal'
import { img, IMAGES } from '../data/images'
import { useLanguage } from '../i18n/LanguageContext'

export function Chef() {
  const { t } = useLanguage()
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['-6%', '6%'])

  return (
    <section id="chef" ref={ref} className="relative bg-bg px-6 py-28 sm:px-10 sm:py-36">
      <div className="mx-auto grid max-w-content grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <Reveal direction="left" className="relative aspect-[3/4] overflow-hidden">
          <motion.img
            style={{ y }}
            src={img(IMAGES.chef, 1400)}
            alt={t.chef.name}
            className="h-[112%] w-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 ring-1 ring-inset ring-stroke/10" />
        </Reveal>

        <div>
          <Reveal>
            <p className="font-body text-[11px] uppercase tracking-widest3 text-accent">{t.chef.eyebrow}</p>
            <h2 className="mt-5 font-display text-4xl text-text-primary sm:text-5xl">{t.chef.name}</h2>
            <p className="mt-2 font-body text-sm uppercase tracking-widest2 text-muted/70">{t.chef.role}</p>
          </Reveal>

          <Reveal delay={0.15}>
            <p className="mt-8 font-display text-xl italic leading-relaxed text-muted sm:text-2xl">{t.chef.quote}</p>
          </Reveal>

          <Reveal delay={0.25}>
            <p className="mt-8 max-w-lg font-body text-base font-light leading-relaxed text-muted/90">{t.chef.bio}</p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
