import type { LangCode, SiteContent } from '../types'
import { hu } from './hu'
import { en } from './en'
import { es } from './es'
import { de } from './de'
import { fr } from './fr'

export const CONTENT: Record<LangCode, SiteContent> = { hu, en, es, de, fr }

export const LANGUAGES: { code: LangCode; label: string }[] = [
  { code: 'hu', label: 'HU' },
  { code: 'en', label: 'EN' },
  { code: 'fr', label: 'FR' },
  { code: 'es', label: 'ES' },
  { code: 'de', label: 'DE' },
]

export const DEFAULT_LANG: LangCode = 'hu'
