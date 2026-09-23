import { useEffect, useRef, useState } from 'react'
import type Hls from 'hls.js'

interface VideoBackgroundProps {
  src: string
  className?: string
  flip?: boolean
  /** Image shown instantly, until the first video frame is ready. */
  poster?: string
  /**
   * Start loading right away instead of waiting to scroll near the viewport.
   * For an above-the-fold video: inside the alexstudio showcase iframe the
   * IntersectionObserver never fires while the iframe is offscreen, so the
   * download would only begin once the visitor scrolls to it.
   */
  eager?: boolean
}

/**
 * Plays an .m3u8 stream via hls.js where needed, or falls back to a plain
 * progressive src (used today, since we ship a self-hosted mp4 rather than
 * a live adaptive stream). hls.js (~150kB) is only fetched when the source
 * actually is a stream, so a plain mp4 never pays for it.
 *
 * Loading (and decoding) is deferred until the video is near the viewport —
 * the footer's copy would otherwise autoplay off-screen for the entire visit.
 */
export function VideoBackground({ src, className, flip, poster, eager }: VideoBackgroundProps) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [inView, setInView] = useState(!!eager)

  useEffect(() => {
    const el = wrapperRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        if (eager) {
          // Already loading. Chrome pauses muted autoplay videos while they're
          // offscreen (as in the showcase iframe), so make sure it plays
          // whenever it comes into view.
          videoRef.current?.play().catch(() => {})
          return
        }
        setInView(true)
        observer.disconnect()
      },
      { rootMargin: '200px' },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [eager])

  useEffect(() => {
    if (!inView) return
    const video = videoRef.current
    if (!video) return

    // The `autoplay` attribute isn't reliably honoured when `src` is
    // assigned after mount (our case, since loading is deferred) — call
    // play() explicitly. The promise rejects if the browser blocks it, and
    // there's nothing useful to do about that for a muted background loop.
    function play() {
      video?.play().catch(() => {})
    }

    const isHls = src.endsWith('.m3u8')
    if (!isHls) {
      video.src = src
      play()
      return
    }

    let hls: Hls | null = null
    let cancelled = false

    import('hls.js').then(({ default: HlsCtor }) => {
      if (cancelled) return
      if (HlsCtor.isSupported()) {
        hls = new HlsCtor()
        hls.loadSource(src)
        hls.attachMedia(video)
        hls.on(HlsCtor.Events.MANIFEST_PARSED, play)
      } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = src
        play()
      }
    })

    return () => {
      cancelled = true
      hls?.destroy()
    }
  }, [inView, src])

  return (
    <div ref={wrapperRef} className="absolute inset-0 overflow-hidden">
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        poster={poster}
        preload={eager ? 'auto' : 'none'}
        className={`absolute left-1/2 top-1/2 min-h-full min-w-full -translate-x-1/2 -translate-y-1/2 object-cover ${
          flip ? 'scale-y-[-1]' : ''
        } ${className ?? ''}`}
      />
    </div>
  )
}
