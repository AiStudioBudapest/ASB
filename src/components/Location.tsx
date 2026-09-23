import { Reveal } from './Reveal'
import { useLanguage } from '../i18n/LanguageContext'

function AbstractMap() {
  return (
    <svg viewBox="0 0 400 400" className="h-full w-full" role="img" aria-label="Teszt Oldal">
      <rect width="400" height="400" fill="#0a0a09" />
      {[60, 140, 220, 300].map((y) => (
        <line key={`h-${y}`} x1="0" y1={y} x2="400" y2={y} stroke="#3a3632" strokeWidth="1" />
      ))}
      {[70, 160, 250, 330].map((x) => (
        <line key={`v-${x}`} x1={x} y1="0" x2={x} y2="400" stroke="#3a3632" strokeWidth="1" />
      ))}
      <path d="M0 40 Q 200 120 400 60" stroke="#5a5349" strokeWidth="1.5" fill="none" />
      <path d="M0 340 Q 220 260 400 360" stroke="#5a5349" strokeWidth="1.5" fill="none" />
      <circle cx="200" cy="190" r="5" fill="#c8a76a" />
      <circle cx="200" cy="190" r="14" fill="none" stroke="#c8a76a" strokeWidth="1" opacity="0.6">
        <animate attributeName="r" values="10;26;10" dur="3.4s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.7;0;0.7" dur="3.4s" repeatCount="indefinite" />
      </circle>
      <text x="212" y="185" fill="#f3ede1" fontFamily="Instrument Serif, serif" fontStyle="italic" fontSize="14">
        Teszt Oldal
      </text>
    </svg>
  )
}

export function Location() {
  const { t } = useLanguage()

  return (
    <section id="contact" className="relative bg-bg px-6 py-28 sm:px-10 sm:py-36">
      <div className="mx-auto grid max-w-content grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <Reveal direction="left" className="aspect-square overflow-hidden border border-stroke/30">
          <AbstractMap />
        </Reveal>

        <div>
          <Reveal>
            <p className="font-body text-[11px] uppercase tracking-widest3 text-accent">{t.location.eyebrow}</p>
            <h2 className="mt-5 font-display text-3xl text-text-primary sm:text-4xl">
              {t.location.addressLine1}
              <br />
              {t.location.addressLine2}
            </h2>
          </Reveal>

          <Reveal delay={0.15} className="mt-10 space-y-2 font-body text-sm font-light text-muted/90">
            <p>{t.location.dinnerHours}</p>
            <p>{t.location.lunchHours}</p>
            <p className="pt-4 text-muted/60">+33 1 42 00 00 00</p>
            <p className="text-muted/60">reservation@teszt-oldal.fr</p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
