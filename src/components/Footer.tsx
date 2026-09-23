import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { VideoBackground } from './VideoBackground'
import { AMBIENCE_VIDEO } from '../data/video'
import { useLanguage } from '../i18n/LanguageContext'

function InstagramIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  )
}

function FacebookIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
      <path d="M15 8.5h-2a1.5 1.5 0 0 0-1.5 1.5v2H15l-.4 3H11.5v7h-3v-7H7v-3h1.5v-2A4 4 0 0 1 12.5 5H15z" />
    </svg>
  )
}

export function Footer() {
  const { t } = useLanguage()
  const marqueeRef = useRef<HTMLDivElement>(null)

  const NAV_LINKS = [
    { label: t.nav.maison, href: '#maison' },
    { label: t.nav.menu, href: '#menu' },
    { label: t.nav.chef, href: '#chef' },
    { label: t.nav.galerie, href: '#galerie' },
    { label: t.reservation.eyebrow, href: '#reservation' },
    { label: t.footer.contactEyebrow, href: '#contact' },
  ]

  useLayoutEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const ctx = gsap.context(() => {
      gsap.to(marqueeRef.current, { xPercent: -50, duration: 40, ease: 'none', repeat: -1 })
    })
    return () => ctx.revert()
  }, [])

  return (
    <footer className="relative overflow-hidden bg-bg pb-8 pt-16 md:pb-12 md:pt-20">
      <div className="absolute inset-0">
        <VideoBackground src={AMBIENCE_VIDEO} flip />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      <div className="relative z-10 mx-auto max-w-content px-6 md:px-10 lg:px-16">
        <div className="flex flex-col items-center py-16 text-center md:py-24">
          <p className="font-body text-xs uppercase tracking-widest3 text-muted">{t.footer.contactEyebrow}</p>
          <h2 className="mt-6 font-display text-4xl italic text-text-primary sm:text-5xl md:text-6xl">
            {t.footer.contactHeading}
          </h2>
          <a
            href="mailto:reservation@teszt-oldal.fr"
            data-cursor
            className="group relative mt-10 inline-flex rounded-full text-sm"
          >
            <span className="absolute -inset-[2px] rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100 accent-gradient" />
            <span className="relative flex items-center gap-2 rounded-full bg-text-primary px-8 py-4 text-bg">
              reservation@teszt-oldal.fr <span aria-hidden="true">↗</span>
            </span>
          </a>
        </div>

        <div className="overflow-hidden border-y border-white/10 py-6">
          <div ref={marqueeRef} className="flex w-max whitespace-nowrap">
            {Array.from({ length: 2 }).map((_, rep) => (
              <span key={rep} className="flex shrink-0">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i} className="font-display text-3xl italic text-text-primary/70 md:text-4xl">
                    Teszt Oldal — Paris&nbsp;
                    <span className="mx-4 text-accent" aria-hidden="true">
                      •
                    </span>
                  </span>
                ))}
              </span>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-10 pt-12 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="font-display text-2xl italic text-text-primary">Teszt Oldal</p>
            <p className="mt-2 font-body text-xs uppercase tracking-widest2 text-muted">{t.footer.tagline}</p>
            <p className="mt-1 font-body text-xs uppercase tracking-widest2 text-muted">{t.footer.city}</p>
          </div>

          <nav className="grid grid-cols-2 gap-x-10 gap-y-3 sm:flex sm:flex-col sm:items-end">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                data-cursor
                onClick={(e) => {
                  e.preventDefault()
                  document.querySelector(l.href)?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="underline-fade font-body text-xs uppercase tracking-widest2 text-muted hover:text-text-primary"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex flex-col items-start gap-4 sm:items-end">
            <div className="flex gap-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                data-cursor
                aria-label="Instagram"
                className="flex items-center gap-2 text-muted hover:text-text-primary"
              >
                <InstagramIcon />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                data-cursor
                aria-label="Facebook"
                className="flex items-center gap-2 text-muted hover:text-text-primary"
              >
                <FacebookIcon />
              </a>
            </div>
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
              </span>
              <span className="font-body text-xs text-muted">{t.footer.status}</span>
            </div>
          </div>
        </div>

        <p className="mt-16 font-body text-[11px] text-muted/60">{t.footer.copyright}</p>
      </div>
    </footer>
  )
}
