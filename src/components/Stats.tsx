import { motion } from 'framer-motion'
import { useLanguage } from '../i18n/LanguageContext'

export function Stats() {
  const { t } = useLanguage()

  return (
    <section className="bg-bg py-16 md:py-24">
      <div className="mx-auto grid max-w-content grid-cols-1 gap-10 px-6 sm:grid-cols-3 md:px-10 lg:px-16">
        {t.stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, delay: i * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
            className="border-t border-stroke pt-6 text-center sm:text-left"
          >
            <p className="font-display text-5xl italic text-text-primary md:text-6xl">{stat.value}</p>
            <p className="mt-2 font-body text-xs uppercase tracking-widest2 text-muted">{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
