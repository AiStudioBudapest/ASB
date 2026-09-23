import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

interface SectionHeaderProps {
  eyebrow: string
  heading: ReactNode
  subtext: string
  action?: ReactNode
}

/** whileInView header pattern shared by the bento, journal, and gallery sections. */
export function SectionHeader({ eyebrow, heading, subtext, action }: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
      viewport={{ once: true, margin: '-100px' }}
      className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end"
    >
      <div>
        <div className="mb-4 flex items-center gap-3">
          <span className="h-px w-8 bg-stroke" />
          <span className="font-body text-xs uppercase tracking-widest3 text-muted">{eyebrow}</span>
        </div>
        <h2 className="font-body text-3xl font-light text-text-primary md:text-4xl">{heading}</h2>
        <p className="mt-3 max-w-md font-body text-sm text-muted">{subtext}</p>
      </div>
      {action}
    </motion.div>
  )
}
