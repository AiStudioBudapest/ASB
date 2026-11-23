import en from '@/content/i18n/en.json'
import fr from '@/content/i18n/fr.json'
import hu from '@/content/i18n/hu.json'

export const LANGS = ['en', 'fr', 'hu'] as const
export type Lang = (typeof LANGS)[number]
export const DEFAULT_LANG: Lang = 'en'
export const LANG_LABEL: Record<Lang, string> = { en: 'English', fr: 'Français', hu: 'Magyar' }
export const OG_LOCALE: Record<Lang, string> = { en: 'en_GB', fr: 'fr_FR', hu: 'hu_HU' }

export type Dict = typeof en
const dicts: Record<Lang, Dict> = { en, fr: fr as Dict, hu: hu as Dict }
export const getDict = (lang: Lang): Dict => dicts[lang]

/** Texte traduit : { en, fr, hu } → chaîne ; retombe sur l'anglais si une langue manque. */
export type L<T = string> = { en: T; fr?: T; hu?: T }
export const loc = <T,>(v: L<T> | undefined, lang: Lang): T | undefined => (v ? (v[lang] ?? v.en) : undefined)

/** Lien interne : l'anglais est à la racine (/portfolio/), le français sous /fr/, le hongrois sous /hu/. */
export function href(lang: Lang, path = '/'): string {
  const p = path === '/' ? '/' : '/' + path.replace(/^\/|\/$/g, '') + '/'
  return lang === DEFAULT_LANG ? p : `/${lang}${p === '/' ? '/' : p}`
}
