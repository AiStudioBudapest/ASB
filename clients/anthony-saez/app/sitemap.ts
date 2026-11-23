import type { MetadataRoute } from 'next'
import { site, allPaths } from '@/lib/content'
import { LANGS, href } from '@/lib/i18n'
export const dynamic = 'force-static'
export default function sitemap(): MetadataRoute.Sitemap {
  return LANGS.flatMap(l => allPaths().map(r => ({
    url: site.baseUrl + href(l, '/' + r.join('/')),
    changeFrequency: 'monthly' as const,
    priority: r.length === 0 ? 1 : r.length === 1 ? 0.8 : 0.6,
    alternates: { languages: Object.fromEntries(LANGS.map(x => [x, site.baseUrl + href(x, '/' + r.join('/'))])) },
  })))
}
