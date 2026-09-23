import { useLanguage } from '../i18n/LanguageContext'

export function BackButton() {
  const { t } = useLanguage()

  return (
    <a
      href="/alexstudio/index.html"
      data-cursor
      aria-label={t.back.aria}
      className="fixed bottom-4 left-4 z-50 inline-flex items-center gap-2 rounded-full border border-white/10 bg-surface/90 px-4 py-2.5 font-body text-sm text-text-primary backdrop-blur-md transition-colors hover:bg-surface"
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2.4}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        className="h-4 w-4"
      >
        <path d="M19 12H5M11 18l-6-6 6-6" />
      </svg>
      {t.back.label}
    </a>
  )
}
