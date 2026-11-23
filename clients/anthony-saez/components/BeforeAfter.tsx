'use client'
import { useRef, useState } from 'react'

/** Curseur avant / après : se déplace à la souris, au doigt ou au clavier (flèches). */
export default function BeforeAfter({ before, after, alt, labels }: { before: string; after: string; alt: string; labels: { before: string; after: string; drag: string } }) {
  const [pos, setPos] = useState(50)
  const box = useRef<HTMLDivElement>(null)
  const move = (x: number) => { const r = box.current!.getBoundingClientRect(); setPos(Math.min(100, Math.max(0, ((x - r.left) / r.width) * 100))) }
  return (
    <figure>
      <div ref={box} className="relative aspect-[16/10] w-full touch-pan-y select-none overflow-hidden bg-anthracite"
        onPointerDown={e => { (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId); move(e.clientX) }}
        onPointerMove={e => { if (e.buttons || e.pointerType === 'touch') move(e.clientX) }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={after} alt={alt} loading="lazy" draggable={false} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 overflow-hidden" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={before} alt="" loading="lazy" draggable={false} className="absolute inset-0 h-full w-full object-cover" />
        </div>
        <span className="badge absolute left-3 top-3">{labels.before}</span>
        <span className="badge absolute right-3 top-3">{labels.after}</span>
        <div className="pointer-events-none absolute inset-y-0 w-px bg-bone" style={{ left: `${pos}%` }}>
          <span className="absolute left-1/2 top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-bone bg-ink/70 text-xs backdrop-blur-sm" aria-hidden>↔</span>
        </div>
        <input type="range" min={0} max={100} value={Math.round(pos)} onChange={e => setPos(Number(e.target.value))} aria-label={labels.drag} className="absolute inset-x-0 bottom-0 h-11 w-full cursor-ew-resize opacity-0" />
      </div>
      <figcaption className="mt-3 text-xs uppercase tracking-[0.2em] text-stone">{labels.drag}</figcaption>
    </figure>
  )
}
