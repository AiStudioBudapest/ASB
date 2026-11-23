'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { LANGS, LANG_LABEL, href, type Lang, type Dict } from '@/lib/i18n'

const ITEMS = [['/', 'home'], ['/portfolio', 'portfolio'], ['/services', 'services'], ['/about', 'about'], ['/contact', 'contact']] as const

export default function Header({ lang, nav }: { lang: Lang; nav: Dict['nav'] }) {
  const pathname = usePathname() || '/'
  const [open, setOpen] = useState(false)
  const [solid, setSolid] = useState(false)
  // chemin sans le préfixe de langue, pour changer de langue en restant sur la même page
  const rest = pathname.replace(/^\/(fr|hu)(?=\/|$)/, '') || '/'
  const isActive = (p: string) => (p === '/' ? rest === '/' : rest.startsWith(p))

  useEffect(() => {
    const f = () => setSolid(window.scrollY > 40)
    f(); window.addEventListener('scroll', f, { passive: true })
    return () => window.removeEventListener('scroll', f)
  }, [])
  useEffect(() => { setOpen(false) }, [pathname])
  useEffect(() => {
    document.documentElement.style.overflow = open ? 'hidden' : ''
    const k = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', k)
    return () => { window.removeEventListener('keydown', k); document.documentElement.style.overflow = '' }
  }, [open])

  const langs = (cls: string) => (
    <ul className={cls} aria-label={nav.language}>
      {LANGS.map(l => (
        <li key={l}>
          <Link href={href(l, rest)} hrefLang={l} lang={l} aria-label={LANG_LABEL[l]} aria-current={l === lang ? 'true' : undefined}
            className={`inline-flex min-h-[44px] min-w-[44px] items-center justify-center text-[12px] font-medium uppercase tracking-[0.18em] ${l === lang ? 'text-bone' : 'text-stone hover:text-bone'}`}>{l}</Link>
        </li>
      ))}
    </ul>
  )

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${solid || open ? 'bg-ink/90 backdrop-blur-md' : 'bg-gradient-to-b from-ink/70 to-transparent'}`}>
      <div className="wrap flex h-[72px] items-center justify-between">
        <Link href={href(lang)} className="text-[13px] font-medium uppercase tracking-[0.34em] text-bone sm:text-sm" aria-label="Anthony Saez">Anthony Saez</Link>
        <nav aria-label={nav.primary} className="hidden items-center gap-9 lg:flex">
          {ITEMS.map(([p, k]) => (
            <Link key={p} href={href(lang, p)} aria-current={isActive(p) ? 'page' : undefined} className="nav-link text-[12px] font-medium uppercase tracking-[0.2em] text-bone/90">{nav[k]}</Link>
          ))}
          {langs('ml-4 flex items-center border-l border-bone/20 pl-4')}
        </nav>
        <button type="button" className="-mr-3 inline-flex h-12 items-center gap-3 px-3 text-[12px] font-medium uppercase tracking-[0.2em] lg:hidden" aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen(o => !o)}>
          {open ? nav.close : nav.menu}
          <span aria-hidden className="relative block h-3 w-6"><span className={`absolute left-0 top-0 h-px w-full bg-bone transition-transform ${open ? 'translate-y-[6px] rotate-45' : ''}`} /><span className={`absolute bottom-0 left-0 h-px w-full bg-bone transition-transform ${open ? '-translate-y-[5px] -rotate-45' : ''}`} /></span>
        </button>
      </div>
      <div id="mobile-menu" hidden={!open} className="fixed inset-x-0 bottom-0 top-[72px] overflow-y-auto bg-ink lg:hidden">
        <nav aria-label={nav.primary} className="wrap flex min-h-full flex-col justify-between py-10">
          <ul className="space-y-1">
            {ITEMS.map(([p, k]) => (
              <li key={p}><Link href={href(lang, p)} aria-current={isActive(p) ? 'page' : undefined} className={`block py-3 font-display text-[clamp(2.2rem,10vw,3.6rem)] leading-tight ${isActive(p) ? 'text-bone' : 'text-bone/60'}`}>{nav[k]}</Link></li>
            ))}
          </ul>
          {langs('mt-10 flex items-center gap-2')}
        </nav>
      </div>
    </header>
  )
}
