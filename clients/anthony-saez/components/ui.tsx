import Link from 'next/link'
import { href, loc, type Lang, type Dict } from '@/lib/i18n'
import { AREA_IMAGE, SERVICE_ONLY, type Area, type Project } from '@/lib/content'
import Reveal from './Reveal'

export function PageHero({ eyebrow, title, intro }: { eyebrow: string; title: string; intro?: string }) {
  return (
    <section className="border-b border-bone/10 pb-16 pt-36 sm:pb-24 sm:pt-44">
      <div className="wrap">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="h-xl mt-6 max-w-[16ch]">{title}</h1>
        {intro && <p className="lead mt-8 max-w-2xl">{intro}</p>}
      </div>
    </section>
  )
}

export function CtaBand({ lang, d }: { lang: Lang; d: Dict }) {
  return (
    <section className="section border-t border-bone/10 bg-coal">
      <div className="wrap grid items-end gap-10 lg:grid-cols-12">
        <Reveal className="lg:col-span-8"><h2 className="h-lg max-w-[18ch]">{d.cta.title}</h2></Reveal>
        <Reveal className="lg:col-span-4" delay={150}>
          <p className="lead mb-8">{d.cta.text}</p>
          <Link href={href(lang, '/contact')} className="btn btn-solid">{d.cta.button}</Link>
        </Reveal>
      </div>
    </section>
  )
}

export function ProjectCard({ p, lang, d, tall }: { p: Project; lang: Lang; d: Dict; tall?: boolean }) {
  return (
    <Link href={href(lang, `/portfolio/${p.slug}`)} className="hover-zoom group block">
      <div className={`relative overflow-hidden bg-anthracite ${tall ? 'aspect-[4/5]' : 'aspect-[4/3]'}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={p.cover} alt={loc(p.coverAlt, lang) || ''} loading="lazy" decoding="async" className="h-full w-full object-cover" />
        {p.placeholder && <span className="badge absolute left-3 top-3">{d.portfolio.placeholder}</span>}
      </div>
      <p className="eyebrow mt-5">{d.portfolio.cat[p.category]}{p.year ? ` · ${p.year}` : ''}</p>
      <h3 className="h-md mt-2">{loc(p.title, lang)}</h3>
      <p className="mt-3 max-w-md text-sm leading-relaxed text-stone">{loc(p.summary, lang)}</p>
    </Link>
  )
}

export function AreaCard({ area, lang, d, className = '', ratio = 'aspect-[4/3]', index }: { area: Area; lang: Lang; d: Dict; className?: string; ratio?: string; index: number }) {
  const item = d.areas.items.find(i => i.slug === area)!
  const im = AREA_IMAGE[area]
  const dev = SERVICE_ONLY.includes(area)
  return (
    <Link href={href(lang, `/services/${area}`)} className={`hover-zoom group relative block overflow-hidden bg-anthracite ${className}`}>
      <div className={`relative w-full ${ratio} min-h-[340px]`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={im.src} alt="" width={im.w} height={im.h} loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/25 to-ink/10" />
        <span className="absolute left-5 top-5 text-[11px] tracking-[0.24em] text-bone/70">0{index + 1}</span>
        {dev && <span className="badge absolute right-5 top-5">{d.services.inDevelopment}</span>}
        <div className="absolute inset-x-0 bottom-0 p-5 sm:p-8">
          <h3 className="h-md max-w-[16ch]">{item.title}</h3>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-sand/85">{item.short}</p>
          <span className="mt-5 inline-block text-[11px] font-medium uppercase tracking-[0.22em] text-bone">{d.areas.explore} →</span>
        </div>
      </div>
    </Link>
  )
}
