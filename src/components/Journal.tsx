import { motion } from 'framer-motion'
import { SectionHeader } from './SectionHeader'
import { JOURNAL } from '../data/journal'
import { useLanguage } from '../i18n/LanguageContext'

export function Journal() {
  const { t } = useLanguage()

  return (
    <section className="bg-bg py-16 md:py-24">
      <div className="mx-auto max-w-content px-6 md:px-10 lg:px-16">
        <SectionHeader
          eyebrow={t.journal.eyebrow}
          heading={
            <>
              {t.journal.headingPre} <em className="font-display italic">{t.journal.headingEm}</em>.
            </>
          }
          subtext={t.journal.subtext}
          action={
            <button data-cursor className="group relative hidden rounded-full text-sm md:inline-flex">
              <span className="absolute -inset-[2px] rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100 accent-gradient" />
              <span className="relative flex items-center gap-1.5 rounded-full border border-stroke bg-bg px-5 py-2.5 text-text-primary">
                {t.journal.readAll} <span aria-hidden="true">↗</span>
              </span>
            </button>
          }
        />

        <div className="mt-12 flex flex-col gap-3 md:mt-16">
          {t.journal.entries.map((entry, i) => (
            <motion.a
              key={entry.title}
              href="#"
              data-cursor
              onClick={(e) => e.preventDefault()}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: i * 0.05, ease: [0.25, 0.1, 0.25, 1] }}
              className="flex items-center gap-6 rounded-[40px] border border-stroke bg-surface/30 p-4 transition-colors hover:bg-surface sm:rounded-full"
            >
              <img
                src={JOURNAL[i].image}
                alt=""
                loading="lazy"
                className="h-16 w-16 shrink-0 rounded-full object-cover sm:h-14 sm:w-14"
              />
              <h3 className="flex-1 truncate font-display text-lg italic text-text-primary sm:text-xl">
                {entry.title}
              </h3>
              <div className="hidden shrink-0 items-center gap-4 font-body text-xs text-muted sm:flex">
                <span>{entry.readTime}</span>
                <span>{entry.date}</span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}
