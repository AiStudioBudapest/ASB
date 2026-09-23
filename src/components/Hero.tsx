import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { VideoBackground } from './VideoBackground'
import { AMBIENCE_VIDEO } from '../data/video'
import { useLanguage } from '../i18n/LanguageContext'

interface HeroProps {
  ready: boolean
}

export function Hero({ ready }: HeroProps) {
  const { t } = useLanguage()
  const roles = t.hero.roles
  const [roleIndex, setRoleIndex] = useState(0)
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const id = setInterval(() => setRoleIndex((i) => (i + 1) % roles.length), 2000)
    return () => clearInterval(id)
  }, [roles])

  useLayoutEffect(() => {
    if (!ready) return
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      tl.from('.name-reveal', { opacity: 0, y: 50, duration: 1.2 }, 0.1)
      tl.from(
        '.blur-in',
        { opacity: 0, filter: 'blur(10px)', y: 20, duration: 1, stagger: 0.1 },
        0.3,
      )
    }, rootRef)
    return () => ctx.revert()
  }, [ready])

  return (
    <section
      id="accueil"
      ref={rootRef}
      className="relative flex h-[100svh] w-full items-center justify-center overflow-hidden bg-bg"
    >
      <h1 className="sr-only">{t.meta.title}</h1>

      <div className="absolute inset-0">
        <VideoBackground src={AMBIENCE_VIDEO} />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-bg to-transparent" />
      </div>

      <div className="relative z-10 flex flex-col items-center px-6 text-center">
        <p className="blur-in mb-8 font-body text-xs uppercase tracking-widest3 text-muted">{t.hero.eyebrow}</p>

        <h2 className="name-reveal mb-6 font-display text-6xl italic leading-[0.9] tracking-tight text-text-primary md:text-8xl lg:text-9xl">
          Teszt Oldal
        </h2>

        <p className="blur-in mb-12 font-body text-sm text-muted md:text-base">
          {t.hero.descPrefix}{' '}
          <span key={roleIndex} className="inline-block animate-role-fade-in font-display italic text-text-primary">
            {roles[roleIndex]}
          </span>
          {t.hero.descSuffix}
        </p>

        <div className="blur-in inline-flex flex-wrap items-center justify-center gap-4">
          <a
            href="#menu"
            data-cursor
            onClick={(e) => {
              e.preventDefault()
              document.querySelector('#menu')?.scrollIntoView({ behavior: 'smooth' })
            }}
            className="group relative rounded-full text-sm"
          >
            <span className="absolute -inset-[2px] rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100 accent-gradient" />
            <span className="relative block rounded-full bg-text-primary px-7 py-3.5 text-bg transition-colors duration-300 group-hover:scale-105 group-hover:bg-bg group-hover:text-text-primary">
              {t.hero.ctaMenu}
            </span>
          </a>

          <a
            href="#reservation"
            data-cursor
            onClick={(e) => {
              e.preventDefault()
              document.querySelector('#reservation')?.scrollIntoView({ behavior: 'smooth' })
            }}
            className="group relative rounded-full text-sm"
          >
            <span className="absolute -inset-[2px] rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100 accent-gradient" />
            <span className="relative block rounded-full border-2 border-stroke bg-bg px-7 py-3.5 text-text-primary transition-all duration-300 group-hover:scale-105 group-hover:border-transparent">
              {t.hero.ctaReserve}
            </span>
          </a>
        </div>
      </div>

      <div className="absolute bottom-9 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-3">
        <span className="font-body text-[10px] uppercase tracking-widest2 text-muted">{t.hero.scroll}</span>
        <span className="relative h-10 w-px overflow-hidden bg-stroke">
          <span className="accent-gradient absolute left-0 top-0 h-1/2 w-full animate-scroll-down" />
        </span>
      </div>
    </section>
  )
}
