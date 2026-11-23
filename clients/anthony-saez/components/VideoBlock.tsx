'use client'
import { useState } from 'react'

/** Vidéo : YouTube/Vimeo (chargée au clic, rien n'est transmis avant) ou fichier .mp4 (preload léger). */
export default function VideoBlock({ url, poster, title, play }: { url: string; poster?: string; title: string; play: string }) {
  const [on, setOn] = useState(false)
  const yt = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([\w-]{6,})/)
  const vm = url.match(/vimeo\.com\/(?:video\/)?(\d+)/)
  if (yt || vm) {
    const src = yt ? `https://www.youtube-nocookie.com/embed/${yt[1]}?autoplay=1&rel=0` : `https://player.vimeo.com/video/${vm![1]}?autoplay=1&dnt=1`
    return (
      <div className="relative aspect-video w-full overflow-hidden bg-anthracite">
        {on ? <iframe src={src} title={title} allow="autoplay; fullscreen; picture-in-picture" allowFullScreen className="absolute inset-0 h-full w-full" /> : (
          <button type="button" onClick={() => setOn(true)} aria-label={`${play}: ${title}`} className="group absolute inset-0 flex items-center justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            {poster && <img src={poster} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-80" />}
            <span className="relative flex h-20 w-20 items-center justify-center rounded-full border border-bone/70 bg-ink/50 text-xl backdrop-blur-sm transition-transform group-hover:scale-105">▶</span>
          </button>
        )}
      </div>
    )
  }
  return <video src={url} poster={poster} controls preload="none" playsInline className="aspect-video w-full bg-anthracite" aria-label={title} />
}
