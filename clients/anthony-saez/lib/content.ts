import fs from 'node:fs'
import path from 'node:path'
import site from '@/content/site.json'
import type { L } from './i18n'

export { site }

export type Img = { src: string; alt: L; width?: number; height?: number }
export type Block = { text?: L; images?: Img[] }
export type Project = {
  placeholder?: boolean
  slug: string
  category: 'real-estate' | 'portraits'
  featured?: boolean
  order?: number
  year?: string
  location?: L
  title: L
  summary: L
  intro?: L
  scope?: { en: string[]; fr?: string[]; hu?: string[] }
  cover: string
  coverAlt: L
  before?: Block
  transformation?: Block & { steps?: { title: L; text: L }[] }
  after?: Block
  beforeAfter?: { before: string; after: string; alt: L }
  film?: Block & { video?: { url?: string; poster?: string } }
  gallery?: Img[]
}

/** Lit tous les fichiers content/projects/*.json (ceux qui commencent par « _ » sont ignorés). */
export function getProjects(): Project[] {
  const dir = path.join(process.cwd(), 'content', 'projects')
  return fs
    .readdirSync(dir)
    .filter(f => f.endsWith('.json') && !f.startsWith('_'))
    .map(f => JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8')) as Project)
    .sort((a, b) => (a.order ?? 999) - (b.order ?? 999) || (b.year ?? '').localeCompare(a.year ?? ''))
}
export const getProject = (slug: string) => getProjects().find(p => p.slug === slug)

export const AREAS = ['real-estate', 'portraits', 'business', 'hospitality'] as const
export type Area = (typeof AREAS)[number]
export const AREA_IMAGE: Record<Area, { src: string; w: number; h: number }> = {
  'real-estate': { src: '/images/areas/real-estate.jpg', w: 1600, h: 1200 },
  portraits: { src: '/images/areas/portraits.jpg', w: 1200, h: 1500 },
  business: { src: '/images/areas/business.jpg', w: 1600, h: 1200 },
  hospitality: { src: '/images/areas/hospitality.jpg', w: 1600, h: 1200 },
}
/** Domaines qui sont des services à développer (images illustratives, pas de vrais projets). */
export const SERVICE_ONLY: Area[] = ['business', 'hospitality']

/** Toutes les pages (hors préfixe de langue) : sert au routage statique et au sitemap. */
export function allPaths(): string[][] {
  return [
    [], ['portfolio'], ['services'], ['about'], ['contact'],
    ...getProjects().map(p => ['portfolio', p.slug]),
    ...AREAS.map(a => ['services', a]),
  ]
}
