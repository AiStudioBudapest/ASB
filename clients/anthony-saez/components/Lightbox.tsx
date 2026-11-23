'use client'
import { useCallback, useEffect, useRef, useState } from 'react'

export type GImg = { src: string; alt: string; w?: number; h?: number }
type Labels = { close: string; prev: string; next: string; counter: string; open: string }

/** Grille de photos (colonnes « maçonnerie ») avec visionneuse plein écran : flèches, Échap, balayage. */
export default function Gallery({ images, labels, variant = 'masonry' }: { images: GImg[]; labels: Labels; variant?: 'masonry' | 'row' }) {
  const [i, setI] = useState<number | null>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const opener = useRef<HTMLElement | null>(null)
  const n = images.length
  const go = useCallback((d: number) => setI(v => (v === null ? v : (v + d + n) % n)), [n])
  const close = useCallback(() => { setI(null); opener.current?.focus() }, [])

  useEffect(() => {
    if (i === null) return
    document.documentElement.style.overflow = 'hidden'
    closeRef.current?.focus()
    const k = (e: KeyboardEvent) => { if (e.key === 'Escape') close(); if (e.key === 'ArrowRight') go(1); if (e.key === 'ArrowLeft') go(-1) }
    window.addEventListener('keydown', k)
    return () => { window.removeEventListener('keydown', k); document.documentElement.style.overflow = '' }
  }, [i, go, close])

  const touch = useRef(0)
  const cur = i === null ? null : images[i]
  return (
    <>
      <ul className={variant === 'masonry' ? 'columns-1 gap-3 sm:columns-2 lg:columns-3 [&>li]:mb-3' : 'grid gap-3 sm:grid-cols-2'}>
        {images.map((im, k) => (
          <li key={im.src + k} className="break-inside-avoid">
            <button type="button" aria-label={`${labels.open}: ${im.alt}`} onClick={e => { opener.current = e.currentTarget; setI(k) }} className="hover-zoom block w-full cursor-zoom-in overflow-hidden bg-anthracite">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={im.src} alt={im.alt} width={im.w || 1600} height={im.h || 1000} loading="lazy" decoding="async" className="h-auto w-full" />
            </button>
          </li>
        ))}
      </ul>
      {cur && (
        <div role="dialog" aria-modal="true" aria-label={cur.alt} className="fixed inset-0 z-[100] flex flex-col bg-ink/95"
          onTouchStart={e => { touch.current = e.touches[0].clientX }}
          onTouchEnd={e => { const dx = e.changedTouches[0].clientX - touch.current; if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1) }}>
          <div className="flex items-center justify-between px-5 py-3 text-xs uppercase tracking-[0.2em] text-sand">
            <span aria-live="polite">{labels.counter.replace('{n}', String(i! + 1)).replace('{total}', String(n))}</span>
            <button ref={closeRef} type="button" onClick={close} className="min-h-[44px] min-w-[44px] px-2 uppercase tracking-[0.2em] hover:text-bone">{labels.close}</button>
          </div>
          <div className="relative flex min-h-0 flex-1 items-center justify-center px-2 sm:px-16" onClick={close}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={cur.src} alt={cur.alt} className="max-h-full max-w-full object-contain" onClick={e => e.stopPropagation()} />
            {n > 1 && <>
              <button type="button" aria-label={labels.prev} onClick={e => { e.stopPropagation(); go(-1) }} className="absolute left-0 top-1/2 h-14 w-12 -translate-y-1/2 text-3xl text-sand hover:text-bone sm:left-3">‹</button>
              <button type="button" aria-label={labels.next} onClick={e => { e.stopPropagation(); go(1) }} className="absolute right-0 top-1/2 h-14 w-12 -translate-y-1/2 text-3xl text-sand hover:text-bone sm:right-3">›</button>
            </>}
          </div>
          <p className="px-5 py-3 text-center text-xs text-stone">{cur.alt}</p>
        </div>
      )}
    </>
  )
}
