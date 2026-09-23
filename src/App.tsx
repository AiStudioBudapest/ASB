import { useReducedMotion } from 'framer-motion'
import { Cursor } from './components/Cursor'
import { BackButton } from './components/BackButton'
import { Nav } from './components/Nav'
import { Hero } from './components/Hero'
import { Cuisine } from './components/Cuisine'
import { Menu } from './components/Menu'
import { Chef } from './components/Chef'
import { Gallery } from './components/Gallery'
import { Journal } from './components/Journal'
import { Stats } from './components/Stats'
import { Reservation } from './components/Reservation'
import { Location } from './components/Location'
import { Footer } from './components/Footer'
import { useSmoothScroll } from './lib/useSmoothScroll'

// The alexstudio portfolio embeds this site live in a small iframe preview
// (?embed=1) — the back-to-portfolio button is pointless (and unreachable)
// at thumbnail scale, so it's hidden there.
const isEmbedded =
  typeof window !== 'undefined' && new URLSearchParams(window.location.search).has('embed')

// LoadingScreen (components/LoadingScreen.tsx) used to gate every full-page
// visit behind a multi-second timer-driven intro (counting 0→100
// regardless of how fast the page actually loaded) — real feedback said
// that read as slow/broken, not premium, so it's no longer mounted here.
// Hero's own GSAP fade-in (a ~1s entrance, not an artificial multi-second
// hold) is what visitors see arriving; the index.html spinner (see
// index.html) already covers the brief real gap before React mounts at
// all. The component file is left in place in case a fast, real
// asset-gated loading state is wanted later — just not this one.
export default function App() {
  const prefersReduced = useReducedMotion()

  useSmoothScroll(!prefersReduced)

  return (
    <>
      <div className="grain" />
      <Cursor />
      {!isEmbedded && <BackButton />}

      <Nav />

      <main>
        <Hero ready />
        <Cuisine />
        <Menu />
        <Chef />
        <Gallery />
        <Journal />
        <Stats />
        <Reservation />
        <Location />
      </main>

      <Footer />
    </>
  )
}
