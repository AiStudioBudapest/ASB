import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import type { LangCode } from './types'
import { CONTENT, DEFAULT_LANG } from './content'

const STORAGE_KEY = 'teszt-oldal-lang'

interface LanguageContextValue {
  lang: LangCode
  setLang: (lang: LangCode) => void
  t: (typeof CONTENT)[LangCode]
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

function readStoredLang(): LangCode {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored && stored in CONTENT) return stored as LangCode
  } catch {
    // localStorage unavailable — fall through to the default.
  }
  return DEFAULT_LANG
}

/** Hungarian is the site's primary language for first-time visitors; a later
 * explicit choice is remembered so we don't reset returning visitors. */
export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<LangCode>(readStoredLang)

  useEffect(() => {
    document.documentElement.lang = CONTENT[lang].htmlLang
    document.title = CONTENT[lang].meta.title
    const metaDesc = document.querySelector('meta[name="description"]')
    if (metaDesc) metaDesc.setAttribute('content', CONTENT[lang].meta.description)
  }, [lang])

  function setLang(next: LangCode) {
    setLangState(next)
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {
      // Non-fatal — the choice just won't survive a reload.
    }
  }

  const value = useMemo(() => ({ lang, setLang, t: CONTENT[lang] }), [lang])

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within a LanguageProvider')
  return ctx
}
