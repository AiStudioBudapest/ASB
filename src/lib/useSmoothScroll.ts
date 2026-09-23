import { useEffect } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

let sharedLenis: Lenis | null = null

export function getLenis(): Lenis | null {
  return sharedLenis
}

/**
 * Initializes a single Lenis smooth-scroll instance, driven by GSAP's own
 * ticker so ScrollTrigger's pins/scrub effects stay in sync with Lenis's
 * smoothed scroll position instead of drifting against it.
 */
export function useSmoothScroll(enabled: boolean) {
  useEffect(() => {
    if (!enabled) return

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
    })
    sharedLenis = lenis

    lenis.on('scroll', ScrollTrigger.update)

    function tick(time: number) {
      lenis.raf(time * 1000)
    }
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(tick)
      lenis.destroy()
      sharedLenis = null
    }
  }, [enabled])
}
