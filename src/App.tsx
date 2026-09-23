import { useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import { LoadingScreen } from './components/LoadingScreen'
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
// (?embed=1) — a multi-second loading screen makes no sense at thumbnail
// size, so that context skips straight to the ready homepage, and the
// back-to-portfolio button is pointless (and unreachable) at thumbnail
// scale, so it's hidden there too. A direct visit, or "View project"
// navigating here full-page, still gets the intended intro and button.
const isEmbedded =
  typeof window !== 'undefined' && new URLSearchParams(window.location.search).has('embed')

export default function App() {
  const [loading, setLoading] = useState(!isEmbedded)
  const prefersReduced = useReducedMotion()

  useSmoothScroll(!loading && !prefersReduced)

  return (
    <>
      <div className="grain" />
      <Cursor />
      {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
      {!isEmbedded && <BackButton />}

      <Nav />

      <main>
        <Hero ready={!loading} />
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
