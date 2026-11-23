import Link from 'next/link'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getDict, href, loc, LANGS, OG_LOCALE, DEFAULT_LANG, type Lang } from './i18n'
import { site, getProjects, getProject, allPaths, AREAS, AREA_IMAGE, SERVICE_ONLY, type Area, type Img } from './content'
import Reveal from '@/components/Reveal'
import HeroMedia from '@/components/HeroMedia'
import Gallery from '@/components/Lightbox'
import BeforeAfter from '@/components/BeforeAfter'
import VideoBlock from '@/components/VideoBlock'
import ContactForm from '@/components/ContactForm'
import { PageHero, CtaBand, ProjectCard, AreaCard } from '@/components/ui'

export const staticSlugs = () => allPaths().map(slug => ({ slug }))
const abs = (lang: Lang, rest: string[]) => site.baseUrl + href(lang, '/' + rest.join('/'))

/* ---------- métadonnées (SEO) ---------- */
export function pageMetadata(lang: Lang, rest: string[] = []): Metadata {
  const d = getDict(lang)
  let title = d.meta.siteTitle, description = d.meta.siteDescription
  let image = '/images/site/og.jpg'
  const [a, b] = rest
  if (a === 'portfolio' && !b) ({ title, description } = d.meta.pages.portfolio)
  if (a === 'services' && !b) ({ title, description } = d.meta.pages.services)
  if (a === 'about') ({ title, description } = d.meta.pages.about)
  if (a === 'contact') ({ title, description } = d.meta.pages.contact)
  if (a === 'portfolio' && b) {
    const p = getProject(b); if (!p) return {}
    title = `${loc(p.title, lang)} — ${d.portfolio.cat[p.category]}`; description = loc(p.summary, lang) || description; image = p.cover
  }
  if (a === 'services' && b) {
    const it = d.services.items.find(i => i.slug === b); if (!it) return {}
    title = `${it.title} — Budapest`; description = it.lead; image = AREA_IMAGE[b as Area].src
  }
  const languages: Record<string, string> = Object.fromEntries(LANGS.map(l => [l, abs(l, rest)]))
  languages['x-default'] = abs(DEFAULT_LANG, rest)
  return {
    metadataBase: new URL(site.baseUrl),
    title: rest.length ? { absolute: `${title} | Anthony Saez` } : { absolute: title },
    description,
    alternates: { canonical: abs(lang, rest), languages },
    openGraph: { type: 'website', siteName: 'Anthony Saez', title, description, url: abs(lang, rest), locale: OG_LOCALE[lang], images: [{ url: image, width: 1200, height: 630 }] },
    twitter: { card: 'summary_large_image', title, description, images: [image] },
  }
}

/* ---------- routage ---------- */
export function renderPage(lang: Lang, rest: string[] = []) {
  const [a, b, c] = rest
  if (c) notFound()
  if (!a) return <Home lang={lang} />
  if (a === 'portfolio') return b ? <ProjectPage lang={lang} slug={b} /> : <Portfolio lang={lang} />
  if (a === 'services') return b ? <ServiceDetail lang={lang} area={b} /> : <Services lang={lang} />
  if (a === 'about' && !b) return <About lang={lang} />
  if (a === 'contact' && !b) return <Contact lang={lang} />
  notFound()
}

export function NotFoundView({ lang }: { lang: Lang }) {
  const d = getDict(lang)
  return (
    <section className="wrap flex min-h-[70vh] flex-col justify-center py-40">
      <h1 className="h-xl">{d.notFound.title}</h1>
      <p className="lead mt-6">{d.notFound.text}</p>
      <Link href={href(lang)} className="btn mt-10 self-start">{d.notFound.link}</Link>
    </section>
  )
}

/* ---------- accueil ---------- */
function Home({ lang }: { lang: Lang }) {
  const d = getDict(lang)
  const featured = getProjects().filter(p => p.featured).slice(0, 4)
  const layout = ['lg:col-span-7', 'lg:col-span-5', 'lg:col-span-5', 'lg:col-span-7']
  return (
    <>
      <section className="relative flex min-h-[100svh] items-end overflow-hidden pb-14 pt-32 sm:pb-20">
        <HeroMedia image="/images/site/hero.jpg" video={site.heroVideo || undefined} alt="" />
        <div className="wrap relative">
          <p className="eyebrow">{d.brand.tagline}</p>
          <h1 className="mt-6 font-display text-[clamp(3rem,11vw,10.5rem)] leading-[0.92] tracking-tight">{d.hero.headline}</h1>
          <div className="mt-8 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="lead max-w-xl">{d.hero.sub}</p>
              <p className="mt-5 text-[11px] uppercase tracking-[0.26em] text-beige">{d.brand.location}</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link href={href(lang, '/portfolio')} className="btn btn-solid">{d.hero.cta}</Link>
                <Link href={href(lang, '/contact')} className="btn">{d.hero.cta2}</Link>
              </div>
            </div>
            <div className="hidden items-center gap-4 text-[11px] uppercase tracking-[0.26em] text-stone lg:flex" aria-hidden>
              {d.hero.scroll}<span className="scrollcue block h-14 w-px bg-bone/60" />
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <p className="eyebrow">{d.intro.eyebrow}</p>
            <h2 className="h-lg mt-5">{d.intro.title}</h2>
          </Reveal>
          <Reveal className="lg:col-span-6 lg:col-start-7" delay={120}>
            <p className="lead">{d.intro.p1}</p>
            <p className="lead mt-6">{d.intro.p2}</p>
            <div className="mt-12 flex items-end gap-5 border-t border-bone/15 pt-8">
              <span className="font-display text-7xl leading-none sm:text-8xl">30</span>
              <p className="pb-2 text-[11px] uppercase tracking-[0.22em] text-stone"><span className="text-beige">{d.intro.approx}</span><br />{d.intro.years}</p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="pb-20 sm:pb-28 lg:pb-36">
        <div className="wrap">
          <Reveal><p className="eyebrow">{d.areas.eyebrow}</p><h2 className="h-lg mt-5">{d.areas.title}</h2></Reveal>
          <div className="mt-12 grid gap-4 lg:grid-cols-12 lg:gap-5">
            {AREAS.map((area, i) => (
              <Reveal key={area} className={layout[i]} delay={i % 2 ? 120 : 0}><AreaCard area={area} lang={lang} d={d} index={i} ratio={i === 0 ? 'aspect-[4/3] lg:aspect-[7/5]' : i === 1 ? 'aspect-[4/5] lg:aspect-[5/5]' : i === 2 ? 'aspect-[4/3] lg:aspect-[5/4]' : 'aspect-[4/3] lg:aspect-[7/4]'} /></Reveal>
            ))}
          </div>
        </div>
      </section>

      {featured.length > 0 && (
        <section className="section border-t border-bone/10 bg-coal">
          <div className="wrap">
            <Reveal className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
              <div><p className="eyebrow">{d.selected.eyebrow}</p><h2 className="h-lg mt-5">{d.selected.title}</h2></div>
              <Link href={href(lang, '/portfolio')} className="btn self-start">{d.selected.all}</Link>
            </Reveal>
            <div className="mt-14 grid gap-12 md:grid-cols-2 md:gap-x-8">
              {featured.map((p, i) => <Reveal key={p.slug} className={i % 2 ? 'md:mt-24' : ''}><ProjectCard p={p} lang={lang} d={d} tall={i % 2 === 1} /></Reveal>)}
            </div>
          </div>
        </section>
      )}

      <section className="light section">
        <div className="wrap">
          <Reveal><p className="eyebrow">{d.approach.eyebrow}</p><h2 className="h-lg mt-5 max-w-[20ch]">{d.approach.title}</h2></Reveal>
          <ol className="mt-16 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {d.approach.items.map((it, i) => (
              <Reveal as="li" key={it.t} delay={i * 100} className="border-t border-ink/25 pt-6">
                <span className="text-[11px] tracking-[0.24em] text-graphite">0{i + 1}</span>
                <h3 className="h-md mt-4">{it.t}</h3>
                <p className="mt-4 text-[15px] leading-relaxed text-graphite">{it.d}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>
      <CtaBand lang={lang} d={d} />
    </>
  )
}

/* ---------- portfolio ---------- */
function Portfolio({ lang }: { lang: Lang }) {
  const d = getDict(lang)
  const projects = getProjects()
  return (
    <>
      <PageHero eyebrow={d.portfolio.eyebrow} title={d.portfolio.title} intro={d.portfolio.intro} />
      <section className="section">
        <div className="wrap">
          <Reveal><h2 className="h-lg">{d.portfolio.existingTitle}</h2><p className="mt-4 text-stone">{d.portfolio.existingNote}</p></Reveal>
          {(['real-estate', 'portraits'] as const).map(cat => {
            const list = projects.filter(p => p.category === cat)
            return (
              <div key={cat} id={cat} className="mt-16 scroll-mt-28">
                <div className="flex items-center gap-6"><h3 className="eyebrow whitespace-normal">{d.portfolio.cat[cat]}</h3><span className="rule flex-1" /></div>
                {list.length ? (
                  <div className="mt-10 grid gap-12 md:grid-cols-2 lg:grid-cols-3 md:gap-x-6">{list.map(p => <Reveal key={p.slug}><ProjectCard p={p} lang={lang} d={d} /></Reveal>)}</div>
                ) : <p className="mt-8 text-stone">{d.portfolio.emptyCat}</p>}
              </div>
            )
          })}
        </div>
      </section>
      <section className="section border-t border-bone/10 bg-coal">
        <div className="wrap">
          <Reveal><h2 className="h-lg">{d.portfolio.developTitle}</h2><p className="mt-4 max-w-2xl text-stone">{d.portfolio.developNote}</p></Reveal>
          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {SERVICE_ONLY.map(area => {
              const it = d.services.items.find(i => i.slug === area)!
              return (
                <Reveal key={area}>
                  <Link href={href(lang, `/services/${area}`)} className="hover-zoom group block">
                    <div className="relative aspect-[4/3] overflow-hidden bg-anthracite">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={AREA_IMAGE[area].src} alt="" loading="lazy" decoding="async" className="h-full w-full object-cover" />
                      <span className="badge absolute left-3 top-3">{d.portfolio.illustrative}</span>
                    </div>
                    <p className="eyebrow mt-5">{d.services.inDevelopment}</p>
                    <h3 className="h-md mt-2">{it.title}</h3>
                    <p className="mt-3 max-w-md text-sm leading-relaxed text-stone">{it.lead}</p>
                    <span className="mt-4 inline-block text-[11px] uppercase tracking-[0.22em]">{d.portfolio.viewService} →</span>
                  </Link>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>
      <CtaBand lang={lang} d={d} />
    </>
  )
}

/* ---------- fiche projet (avant / transformation / après / photo & film) ---------- */
function toG(images: Img[] | undefined, lang: Lang) { return (images || []).map(i => ({ src: i.src, alt: loc(i.alt, lang) || '', w: i.width, h: i.height })) }

function ProjectPage({ lang, slug }: { lang: Lang; slug: string }) {
  const d = getDict(lang); const pj = d.project
  const p = getProject(slug); if (!p) notFound()
  const all = getProjects(); const next = all[(all.findIndex(x => x.slug === slug) + 1) % all.length]
  const labels = { close: d.lightbox.close, prev: d.lightbox.prev, next: d.lightbox.next, counter: d.lightbox.counter, open: pj.openImage }
  const meta = [[pj.location, loc(p.location, lang)], [pj.year, p.year], [pj.scope, p.scope ? (p.scope[lang] ?? p.scope.en).join(' · ') : undefined]].filter(([, v]) => v) as [string, string][]
  const chapter = (n: string, title: string) => (
    <div className="mb-10 flex items-baseline gap-5"><span className="font-display text-5xl text-beige sm:text-6xl">{n}</span><h2 className="h-lg">{title}</h2></div>
  )
  const steps = p.transformation?.steps
  return (
    <>
      <section className="relative flex min-h-[78svh] items-end overflow-hidden pb-14 pt-32">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={p.cover} alt={loc(p.coverAlt, lang) || ''} fetchPriority="high" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/60 via-ink/30 to-ink" />
        <div className="wrap relative">
          <Link href={href(lang, '/portfolio')} className="inline-flex min-h-[44px] items-center text-[11px] uppercase tracking-[0.22em] text-sand hover:text-bone">← {pj.back}</Link>
          <p className="eyebrow mt-6">{d.portfolio.cat[p.category]}</p>
          <h1 className="h-xl mt-4 max-w-[18ch]">{loc(p.title, lang)}</h1>
          {p.placeholder && <p className="badge mt-6 whitespace-normal">{pj.placeholderNote}</p>}
        </div>
      </section>
      <section className="border-b border-bone/10 py-12">
        <div className="wrap grid gap-10 lg:grid-cols-12">
          <dl className="grid gap-6 sm:grid-cols-3 lg:col-span-5 lg:grid-cols-1">{meta.map(([k, v]) => <div key={k}><dt className="eyebrow">{k}</dt><dd className="mt-2 text-sand">{v}</dd></div>)}</dl>
          <p className="lead lg:col-span-7">{loc(p.intro, lang) || loc(p.summary, lang)}</p>
        </div>
      </section>

      {p.before && (
        <section className="section"><div className="wrap">
          {chapter('01', pj.before)}
          <Reveal><p className="lead mb-10 max-w-2xl">{loc(p.before.text, lang)}</p><Gallery images={toG(p.before.images, lang)} labels={labels} variant="row" /></Reveal>
        </div></section>
      )}
      {p.transformation && (
        <section className="section bg-coal"><div className="wrap">
          {chapter('02', pj.transformation)}
          <Reveal><p className="lead mb-12 max-w-2xl">{loc(p.transformation.text, lang)}</p></Reveal>
          {steps && <ol className="mb-12 grid gap-x-8 gap-y-8 sm:grid-cols-3">{steps.map((s, i) => <Reveal as="li" key={i} delay={i * 100} className="border-t border-bone/20 pt-5"><span className="text-[11px] tracking-[0.24em] text-beige">0{i + 1}</span><h3 className="h-md mt-3">{loc(s.title, lang)}</h3><p className="mt-3 text-sm leading-relaxed text-stone">{loc(s.text, lang)}</p></Reveal>)}</ol>}
          {p.transformation.images && <Gallery images={toG(p.transformation.images, lang)} labels={labels} variant="row" />}
        </div></section>
      )}
      {p.after && (
        <section className="section"><div className="wrap">
          {chapter('03', pj.after)}
          <Reveal><p className="lead mb-10 max-w-2xl">{loc(p.after.text, lang)}</p>
            {p.beforeAfter && <div className="mb-10"><BeforeAfter before={p.beforeAfter.before} after={p.beforeAfter.after} alt={loc(p.beforeAfter.alt, lang) || ''} labels={{ before: pj.beforeLabel, after: pj.afterLabel, drag: pj.drag }} /></div>}
            <Gallery images={toG(p.after.images, lang)} labels={labels} variant="row" /></Reveal>
        </div></section>
      )}
      {p.film && (p.film.video?.url || p.film.images?.length) && (
        <section className="section bg-coal"><div className="wrap">
          {chapter(p.before ? '04' : '01', pj.film)}
          <Reveal>
            {p.film.text && <p className="lead mb-10 max-w-2xl">{loc(p.film.text, lang)}</p>}
            {p.film.video?.url && <div className="mb-10"><VideoBlock url={p.film.video.url} poster={p.film.video.poster} title={loc(p.title, lang) || ''} play={pj.video} /></div>}
            {p.film.images && <Gallery images={toG(p.film.images, lang)} labels={labels} />}
          </Reveal>
        </div></section>
      )}
      {p.gallery && (
        <section className="section"><div className="wrap">
          <Reveal><h2 className="h-lg mb-10">{pj.gallery}</h2>
            {p.film?.video?.url && <div className="mb-10"><VideoBlock url={p.film.video.url} poster={p.film.video.poster} title={loc(p.title, lang) || ''} play={pj.video} /></div>}
            <Gallery images={toG(p.gallery, lang)} labels={labels} /></Reveal>
        </div></section>
      )}

      <section className="section border-t border-bone/10">
        <div className="wrap grid gap-12 lg:grid-cols-2">
          <Reveal><h2 className="h-lg">{pj.enquire}</h2><Link href={href(lang, '/contact')} className="btn btn-solid mt-8">{pj.enquireBtn}</Link></Reveal>
          {next && next.slug !== slug && <Reveal delay={120}><p className="eyebrow mb-4">{pj.next}</p><ProjectCard p={next} lang={lang} d={d} /></Reveal>}
        </div>
      </section>
    </>
  )
}

/* ---------- services ---------- */
function Services({ lang }: { lang: Lang }) {
  const d = getDict(lang)
  return (
    <>
      <PageHero eyebrow={d.services.eyebrow} title={d.services.title} intro={d.services.intro} />
      {d.services.items.map((it, i) => <ServiceBlock key={it.slug} lang={lang} d={d} area={it.slug as Area} i={i} />)}
      <CtaBand lang={lang} d={d} />
    </>
  )
}

function ServiceBlock({ lang, d, area, i, solo }: { lang: Lang; d: ReturnType<typeof getDict>; area: Area; i: number; solo?: boolean }) {
  const it = d.services.items.find(x => x.slug === area)!
  const dev = SERVICE_ONLY.includes(area); const im = AREA_IMAGE[area]
  return (
    <section id={area} className={`section scroll-mt-20 border-b border-bone/10 ${i % 2 ? 'bg-coal' : ''}`}>
      <div className="wrap grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
        <Reveal className={`lg:col-span-6 ${i % 2 ? 'lg:order-2' : ''}`}>
          <div className="relative overflow-hidden bg-anthracite" style={{ aspectRatio: `${im.w} / ${im.h}` }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={im.src} alt="" width={im.w} height={im.h} loading="lazy" decoding="async" className="h-full w-full object-cover" />
            {dev && <span className="badge absolute left-3 top-3">{d.portfolio.illustrative}</span>}
          </div>
          {dev && <p className="mt-3 text-xs text-stone">{d.services.illustrativeNote}</p>}
        </Reveal>
        <Reveal className={`lg:col-span-6 ${i % 2 ? 'lg:order-1' : ''}`} delay={100}>
          <p className="eyebrow">{it.kicker}</p>
          {solo ? <h1 className="h-lg mt-4">{it.title}</h1> : <h2 className="h-lg mt-4">{it.title}</h2>}
          <p className="lead mt-6">{it.lead}</p>
          <p className="mt-5 leading-relaxed text-stone">{it.desc}</p>
          <div className="mt-10 grid gap-10 sm:grid-cols-2">
            <div><h3 className="eyebrow mb-4">{d.services.benefits}</h3><ul className="space-y-3 text-sm leading-relaxed text-sand">{it.benefits.map(b => <li key={b} className="border-t border-bone/15 pt-3">{b}</li>)}</ul></div>
            <div><h3 className="eyebrow mb-4">{d.services.deliverables}</h3><ul className="space-y-3 text-sm leading-relaxed text-sand">{it.deliverables.map(b => <li key={b} className="border-t border-bone/15 pt-3">{b}</li>)}</ul></div>
          </div>
          <p className="mt-10 text-[11px] uppercase tracking-[0.22em] text-beige">{d.services.noPrice}</p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link href={href(lang, '/contact')} className="btn btn-solid">{d.services.cta}</Link>
            {!solo && (area === 'real-estate' || area === 'portraits') && <Link href={href(lang, `/portfolio#${area}`)} className="btn">{d.nav.portfolio}</Link>}
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function ServiceDetail({ lang, area }: { lang: Lang; area: string }) {
  const d = getDict(lang)
  if (!(AREAS as readonly string[]).includes(area)) notFound()
  return (
    <>
      <div className="h-24" />
      <ServiceBlock lang={lang} d={d} area={area as Area} i={0} solo />
      <section className="section">
        <div className="wrap"><Link href={href(lang, '/services')} className="btn">{d.services.allServices}</Link></div>
      </section>
    </>
  )
}

/* ---------- à propos ---------- */
function About({ lang }: { lang: Lang }) {
  const d = getDict(lang); const a = d.about
  return (
    <>
      <PageHero eyebrow={a.eyebrow} title={a.title} />
      <section className="section">
        <div className="wrap grid gap-14 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <div className="relative aspect-[4/5] overflow-hidden bg-anthracite">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/site/about-portrait.jpg" alt={a.portraitAlt} width={1200} height={1500} loading="lazy" className="h-full w-full object-cover" />
              <span className="badge absolute left-3 top-3 whitespace-normal">{a.portraitNote}</span>
            </div>
          </Reveal>
          <Reveal className="lg:col-span-7" delay={100}>
            <p className="font-display text-[clamp(1.6rem,3vw,2.5rem)] leading-snug">{a.lead}</p>
            <div className="mt-10 space-y-6 text-lg leading-relaxed text-sand/90"><p>{a.p1}</p><p>{a.p2}</p><p>{a.p3}</p></div>
            <Link href={href(lang, '/contact')} className="btn btn-solid mt-12">{a.cta}</Link>
          </Reveal>
        </div>
      </section>
      <section className="section border-t border-bone/10 bg-coal">
        <div className="wrap grid gap-16 lg:grid-cols-2">
          <Reveal><h2 className="eyebrow mb-6">{a.factsTitle}</h2>
            <dl>{a.facts.map(f => <div key={f.k} className="grid gap-1 border-t border-bone/15 py-4 sm:grid-cols-3"><dt className="text-[11px] uppercase tracking-[0.2em] text-stone">{f.k}</dt><dd className="sm:col-span-2">{f.v}</dd></div>)}</dl></Reveal>
          <Reveal delay={100}><h2 className="eyebrow mb-6">{a.skillsTitle}</h2>
            <ul>{a.skills.map(s => <li key={s} className="border-t border-bone/15 py-4 font-display text-2xl">{s}</li>)}</ul></Reveal>
        </div>
      </section>
    </>
  )
}

/* ---------- contact ---------- */
function Contact({ lang }: { lang: Lang }) {
  const d = getDict(lang); const c = d.contact
  return (
    <>
      <PageHero eyebrow={c.eyebrow} title={c.title} intro={c.intro} />
      <section className="section">
        <div className="wrap grid gap-16 lg:grid-cols-12">
          <Reveal className="lg:col-span-7"><ContactForm c={c} endpoint={site.formEndpoint} lang={lang} /></Reveal>
          <Reveal className="lg:col-span-4 lg:col-start-9" delay={100}>
            <p className="eyebrow">{d.brand.tagline}</p>
            <p className="mt-4 text-sand">{c.based}</p>
            <ul className="mt-8 space-y-2 text-sand">
              {site.email && <li><span className="text-stone">{c.direct}</span><br /><a className="inline-flex min-h-[44px] items-center underline underline-offset-4" href={`mailto:${site.email}`}>{site.email}</a></li>}
              {site.phone && <li><a className="inline-flex min-h-[44px] items-center" href={`tel:${site.phone.replace(/\s/g, '')}`}>{site.phone}</a></li>}
              {site.instagram && <li><a className="inline-flex min-h-[44px] items-center underline underline-offset-4" href={site.instagram} target="_blank" rel="noopener noreferrer">Instagram</a></li>}
            </ul>
          </Reveal>
        </div>
      </section>
    </>
  )
}
