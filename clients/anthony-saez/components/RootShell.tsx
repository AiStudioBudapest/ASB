import Script from 'next/script'
import type { ReactNode } from 'react'
import '@/app/globals.css'
import Header from './Header'
import Footer from './Footer'
import { getDict, href, type Lang } from '@/lib/i18n'
import { site } from '@/lib/content'

/** Enveloppe commune : <html lang>, en-tête, pied de page, données structurées, analytics (si renseignés). */
export default function RootShell({ lang, children }: { lang: Lang; children: ReactNode }) {
  const d = getDict(lang)
  const ld = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'Anthony Saez',
    description: d.meta.siteDescription,
    url: site.baseUrl,
    image: `${site.baseUrl}/images/site/og.jpg`,
    email: site.email || undefined,
    telephone: site.phone || undefined,
    sameAs: site.instagram ? [site.instagram] : undefined,
    address: { '@type': 'PostalAddress', addressLocality: 'Budapest', addressCountry: 'HU' },
    areaServed: [{ '@type': 'City', name: 'Budapest' }, { '@type': 'Country', name: 'Hungary' }, 'Europe'],
    knowsAbout: ['Photography', 'Video production', 'Real estate photography', 'Interior photography', 'Property styling', 'Home staging', 'Portrait photography', 'Corporate photography', 'Restaurant photography'],
    founder: { '@type': 'Person', name: 'Anthony Saez', jobTitle: 'Photographer, filmmaker and property stylist' },
  }
  const ga = site.analytics.googleAnalyticsId
  return (
    <html lang={lang}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        {site.analytics.googleSearchConsoleToken && <meta name="google-site-verification" content={site.analytics.googleSearchConsoleToken} />}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      </head>
      <body>
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:bg-bone focus:px-4 focus:py-3 focus:text-ink">{d.nav.skip}</a>
        <Header lang={lang} nav={d.nav} />
        <main id="main">{children}</main>
        <Footer lang={lang} d={d} />
        {ga && (<>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${ga}`} strategy="afterInteractive" />
          <Script id="ga" strategy="afterInteractive">{`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${ga}');`}</Script>
        </>)}
      </body>
    </html>
  )
}
