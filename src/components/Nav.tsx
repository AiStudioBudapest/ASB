import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '../i18n/LanguageContext'
import { LANGUAGES } from '../i18n/content'

export function Nav() {
  const { lang, setLang, t } = useLanguage()
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('#accueil')
  const [open, setOpen] = useState(false)
  const [langOpen, setLangOpen] = useState(false)
  const langRef = useRef<HTMLDivElement>(null)

  const LINKS = [
    { label: t.nav.maison, href: '#maison' },
    { label: t.nav.menu, href: '#menu' },
    { label: t.nav.chef, href: '#chef' },
    { label: t.nav.galerie, href: '#galerie' },
  ]

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 100)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const sections = LINKS.map((l) => document.querySelector(l.href)).filter(Boolean) as Element[]
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting)
        if (visible.length > 0) setActive(`#${visible[0].target.id}`)
      },
      { rootMargin: '-40% 0px -50% 0px' },
    )
    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
  }, [open])

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (langRef.current && !langRef.current.contains(e.target as Node)) setLangOpen(false)
    }
    document.addEventListener('click', onClickOutside)
    return () => document.removeEventListener('click', onClickOutside)
  }, [])

  function go(href: string) {
    setOpen(false)
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4 md:pt-6">
        <motion.div
          animate={{ boxShadow: scrolled ? '0 10px 30px -10px rgba(0,0,0,0.5)' : '0 0 0 rgba(0,0,0,0)' }}
          className="inline-flex items-center rounded-full border border-white/10 bg-surface/90 px-2 py-2 backdrop-blur-md"
        >
          <a href="#accueil" data-cursor onClick={(e) => { e.preventDefault(); go('#accueil') }} className="group relative flex h-9 w-9 shrink-0 items-center justify-center">
            <span className="accent-gradient absolute inset-0 rounded-full transition-transform duration-500 group-hover:rotate-180" />
            <span className="absolute inset-[1.5px] flex items-center justify-center rounded-full bg-bg">
              <span className="font-display text-[13px] italic text-text-primary">TO</span>
            </span>
          </a>

          <span className="mx-1 hidden h-5 w-px bg-stroke sm:block" />

          <nav className="hidden items-center lg:flex">
            {LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                data-cursor
                onClick={(e) => {
                  e.preventDefault()
                  go(link.href)
                }}
                className={`rounded-full px-3 py-1.5 font-body text-xs transition-colors sm:px-4 sm:py-2 sm:text-sm ${
                  active === link.href ? 'bg-stroke/50 text-text-primary' : 'text-muted hover:bg-stroke/50 hover:text-text-primary'
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <span className="mx-1 hidden h-5 w-px bg-stroke sm:block" />

          <div ref={langRef} className="relative hidden sm:block">
            <button
              data-cursor
              onClick={() => setLangOpen((v) => !v)}
              aria-label="Choisir la langue"
              aria-expanded={langOpen}
              className="rounded-full px-3 py-1.5 font-body text-xs uppercase tracking-wide text-muted transition-colors hover:bg-stroke/50 hover:text-text-primary sm:px-4 sm:py-2"
            >
              {lang}
            </button>
            <AnimatePresence>
              {langOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.2 }}
                  className="absolute left-1/2 top-full mt-2 flex -translate-x-1/2 flex-col overflow-hidden rounded-2xl border border-white/10 bg-surface/95 py-1 backdrop-blur-md"
                >
                  {LANGUAGES.map((l) => (
                    <button
                      key={l.code}
                      data-cursor
                      onClick={() => {
                        setLang(l.code)
                        setLangOpen(false)
                      }}
                      className={`px-5 py-2 text-left font-body text-xs uppercase tracking-wide transition-colors ${
                        l.code === lang ? 'text-accent' : 'text-muted hover:text-text-primary'
                      }`}
                    >
                      {l.label}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <a
            href="#reservation"
            data-cursor
            onClick={(e) => {
              e.preventDefault()
              go('#reservation')
            }}
            className="group relative ml-1 hidden rounded-full px-4 py-2 font-body text-sm sm:inline-block"
          >
            <span className="absolute -inset-[2px] rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100 accent-gradient" />
            <span className="relative flex items-center gap-1.5 rounded-full bg-surface px-4 py-2 text-text-primary backdrop-blur-md">
              {t.nav.reserver} <span aria-hidden="true">↗</span>
            </span>
          </a>

          <button
            data-cursor
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="ml-1 flex h-9 w-9 flex-col items-center justify-center gap-[5px] lg:hidden"
          >
            <motion.span animate={open ? { rotate: 45, y: 3.5 } : {}} className="block h-px w-5 bg-text-primary" />
            <motion.span animate={open ? { rotate: -45, y: -3.5 } : {}} className="block h-px w-5 bg-text-primary" />
          </button>
        </motion.div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 bg-bg lg:hidden"
          >
            {[...LINKS, { label: t.nav.reserver, href: '#reservation' }].map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault()
                  go(link.href)
                }}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.06, duration: 0.5 }}
                className="font-display text-3xl italic text-text-primary"
              >
                {link.label}
              </motion.a>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + LINKS.length * 0.06 + 0.06, duration: 0.5 }}
              className="mt-4 flex items-center gap-4"
            >
              {LANGUAGES.map((l) => (
                <button
                  key={l.code}
                  data-cursor
                  onClick={() => setLang(l.code)}
                  className={`font-body text-sm uppercase tracking-wide transition-colors ${
                    l.code === lang ? 'text-accent' : 'text-muted hover:text-text-primary'
                  }`}
                >
                  {l.label}
                </button>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
