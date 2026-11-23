'use client'
import { useEffect, useRef, useState } from 'react'

/** Fond du hero : image (lente animation) ou, si `video` est renseigné, vidéo muette en boucle. */
export default function HeroMedia({ image, video, alt }: { image: string; video?: string; alt: string }) {
  const [useVideo, setUseVideo] = useState(false)
  const ref = useRef<HTMLVideoElement>(null)
  useEffect(() => {
    if (!video) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const saver = (navigator as unknown as { connection?: { saveData?: boolean } }).connection?.saveData
    setUseVideo(!reduce && !saver)
  }, [video])
  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden={useVideo ? true : undefined}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={image} alt={alt} width={2400} height={1350} fetchPriority="high" className="kenburns absolute inset-0 h-full w-full object-cover" />
      {useVideo && <video ref={ref} src={video} poster={image} autoPlay muted loop playsInline preload="metadata" className="absolute inset-0 h-full w-full object-cover" />}
      <div className="absolute inset-0 bg-gradient-to-b from-ink/60 via-ink/20 to-ink" />
      <div className="absolute inset-0 bg-gradient-to-r from-ink/70 via-transparent to-transparent" />
    </div>
  )
}
