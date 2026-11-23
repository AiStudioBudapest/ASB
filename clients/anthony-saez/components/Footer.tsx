import Link from 'next/link'
import { href, type Lang, type Dict } from '@/lib/i18n'
import { site } from '@/lib/content'

export default function Footer({ lang, d }: { lang: Lang; d: Dict }) {
  const links = [['/portfolio', d.nav.portfolio], ['/services', d.nav.services], ['/about', d.nav.about], ['/contact', d.nav.contact]] as const
  return (
    <footer className="border-t border-bone/10 bg-coal">
      <div className="wrap grid gap-12 py-16 md:grid-cols-12">
        <div className="md:col-span-6">
          <p className="text-sm font-medium uppercase tracking-[0.34em]">Anthony Saez</p>
          <p className="mt-2 text-[11px] uppercase tracking-[0.22em] text-beige">{d.brand.tagline}</p>
          <p className="mt-6 max-w-md text-sm leading-relaxed text-stone">{d.footer.blurb}</p>
        </div>
        <nav aria-label={d.footer.navTitle} className="md:col-span-3">
          <p className="eyebrow mb-4">{d.footer.navTitle}</p>
          <ul className="space-y-1">{links.map(([p, t]) => <li key={p}><Link className="inline-flex min-h-[40px] items-center text-sm text-sand hover:text-bone" href={href(lang, p)}>{t}</Link></li>)}</ul>
        </nav>
        <div className="md:col-span-3">
          <p className="eyebrow mb-4">{d.footer.contactTitle}</p>
          <ul className="space-y-1 text-sm text-sand">
            <li className="py-2">{d.brand.location}</li>
            {site.email && <li><a className="inline-flex min-h-[40px] items-center hover:text-bone" href={`mailto:${site.email}`}>{site.email}</a></li>}
            {site.phone && <li><a className="inline-flex min-h-[40px] items-center hover:text-bone" href={`tel:${site.phone.replace(/\s/g, '')}`}>{site.phone}</a></li>}
            {site.instagram && <li><a className="inline-flex min-h-[40px] items-center hover:text-bone" href={site.instagram} rel="noopener noreferrer" target="_blank">Instagram</a></li>}
          </ul>
        </div>
      </div>
      <div className="wrap flex flex-col gap-3 border-t border-bone/10 py-6 text-xs text-stone sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} Anthony Saez. {d.footer.rights}</p>
        {site.temporaryImages && <p>{d.footer.temporary}</p>}
      </div>
    </footer>
  )
}
