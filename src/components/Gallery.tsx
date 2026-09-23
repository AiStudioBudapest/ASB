import { useLayoutEffect, useRef, useState, type RefObject } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { GALLERY } from '../data/gallery'
import { useLanguage } from '../i18n/LanguageContext'

gsap.registerPlugin(ScrollTrigger)

const ITEMS = GALLERY.slice(0, 6)
const COLUMN_A = [ITEMS[0], ITEMS[2], ITEMS[4]]
const COLUMN_B = [ITEMS[1], ITEMS[3], ITEMS[5]]
const ROTATIONS = ['-rotate-2', 'rotate-3', '-rotate-1']

function Column({
  items,
  colRef,
  rotate,
  onOpen,
  align,
  captions,
}: {
  items: typeof ITEMS
  colRef: RefObject<HTMLDivElement>
  rotate: string[]
  onOpen: (index: number) => void
  align: 'start' | 'end'
  captions: string[]
}) {
  return (
    <div ref={colRef} className={`flex flex-col gap-8 md:gap-12 ${align === 'end' ? 'items-end' : 'items-start'}`}>
      {items.map((item, i) => {
        const index = GALLERY.indexOf(item)
        return (
          <button
            key={item.id}
            data-cursor
            onClick={() => onOpen(index)}
            className={`aspect-square w-full max-w-[320px] overflow-hidden rounded-2xl border border-stroke bg-surface transition-transform duration-500 hover:scale-[1.03] hover:rotate-0 ${rotate[i % rotate.length]}`}
          >
            <img src={item.image} alt={captions[index]} loading="lazy" className="h-full w-full object-cover" />
          </button>
        )
      })}
    </div>
  )
}

export function Gallery() {
  const { t } = useLanguage()
  const captions = t.gallery.captions
  const sectionRef = useRef<HTMLDivElement>(null)
  const pinRef = useRef<HTMLDivElement>(null)
  const colARef = useRef<HTMLDivElement>(null!)
  const colBRef = useRef<HTMLDivElement>(null!)
  const [lightbox, setLightbox] = useState<number | null>(null)

  useLayoutEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (mq.matches) return

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom bottom',
        pin: pinRef.current,
        pinSpacing: false,
      })

      gsap.to(colARef.current, {
        yPercent: -18,
        ease: 'none',
        scrollTrigger: { trigger: sectionRef.current, start: 'top top', end: 'bottom bottom', scrub: true },
      })
      gsap.to(colBRef.current, {
        yPercent: 18,
        ease: 'none',
        scrollTrigger: { trigger: sectionRef.current, start: 'top top', end: 'bottom bottom', scrub: true },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  function close() {
    setLightbox(null)
  }
  function step(delta: number) {
    setLightbox((i) => (i === null ? i : (i + delta + ITEMS.length) % ITEMS.length))
  }

  return (
    <section id="galerie" ref={sectionRef} className="relative min-h-[300vh] bg-bg">
      <div ref={pinRef} className="relative flex h-screen items-center justify-center overflow-hidden">
        <div className="pointer-events-none relative z-30 max-w-[280px] rounded-3xl bg-bg/70 px-6 py-8 text-center backdrop-blur-xl sm:max-w-sm">
          <div className="mb-4 flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-stroke" />
            <span className="font-body text-xs uppercase tracking-widest3 text-muted">{t.gallery.eyebrow}</span>
          </div>
          <h2 className="font-body text-3xl font-light text-text-primary md:text-4xl">
            {t.gallery.headingPre} <em className="font-display italic">{t.gallery.headingEm}</em>
          </h2>
          <p className="mt-4 font-body text-sm text-muted">{t.gallery.subtext}</p>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            data-cursor
            className="group pointer-events-auto relative mt-8 inline-flex rounded-full text-sm"
          >
            <span className="absolute -inset-[2px] rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100 accent-gradient" />
            <span className="relative flex items-center gap-1.5 rounded-full border border-stroke bg-bg px-5 py-2.5 text-text-primary">
              {t.gallery.instagram} <span aria-hidden="true">↗</span>
            </span>
          </a>
        </div>

        <div className="absolute inset-0 z-20 mx-auto grid max-w-[1400px] grid-cols-2 gap-6 px-6 pt-24 md:gap-24 md:px-16">
          <Column items={COLUMN_A} colRef={colARef} rotate={ROTATIONS} onOpen={setLightbox} align="start" captions={captions} />
          <Column items={COLUMN_B} colRef={colBRef} rotate={ROTATIONS} onOpen={setLightbox} align="end" captions={captions} />
        </div>
      </div>

      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] flex items-center justify-center bg-bg/97 p-6"
            onClick={close}
          >
            <button
              data-cursor
              aria-label={t.gallery.close}
              onClick={close}
              className="absolute right-3 top-3 flex h-11 items-center gap-2 px-3 font-body text-xs uppercase tracking-widest2 text-muted hover:text-text-primary"
            >
              {t.gallery.close}
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
                <path d="M5 5l14 14M19 5L5 19" />
              </svg>
            </button>
            <button
              data-cursor
              aria-label={t.gallery.prev}
              onClick={(e) => {
                e.stopPropagation()
                step(-1)
              }}
              className="absolute left-2 flex h-11 w-11 items-center justify-center font-display text-3xl text-muted hover:text-text-primary sm:left-8"
            >
              ‹
            </button>
            <motion.img
              key={GALLERY[lightbox].id}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              src={GALLERY[lightbox].image}
              alt={captions[lightbox]}
              onClick={(e) => e.stopPropagation()}
              className="max-h-[80vh] max-w-[86vw] rounded-lg object-contain"
            />
            <button
              data-cursor
              aria-label={t.gallery.next}
              onClick={(e) => {
                e.stopPropagation()
                step(1)
              }}
              className="absolute right-2 flex h-11 w-11 items-center justify-center font-display text-3xl text-muted hover:text-text-primary sm:right-8"
            >
              ›
            </button>
            <p className="absolute bottom-8 font-body text-[11px] uppercase tracking-widest2 text-muted">
              {String(lightbox + 1).padStart(2, '0')} / {String(ITEMS.length).padStart(2, '0')} — {captions[lightbox]}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
