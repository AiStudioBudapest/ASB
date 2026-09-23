import { motion } from 'framer-motion'
import { SectionHeader } from './SectionHeader'
import { INGREDIENTS } from '../data/ingredients'
import { useLanguage } from '../i18n/LanguageContext'

const SPANS = ['md:col-span-7', 'md:col-span-5', 'md:col-span-5', 'md:col-span-7']
const ASPECTS = ['aspect-[16/10]', 'aspect-[3/4]', 'aspect-[3/4]', 'aspect-[16/10]']

interface CardProps {
  name: string
  description: string
  image: string
  span: string
  aspect: string
  viewLabel: string
}

function Card({ name, description, image, span, aspect, viewLabel }: CardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
      className={`group relative overflow-hidden rounded-3xl border border-stroke bg-surface ${span} ${aspect}`}
    >
      <img
        src={image}
        alt={name}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
      />
      <div
        className="absolute inset-0 opacity-20 mix-blend-multiply"
        style={{ backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)', backgroundSize: '4px 4px' }}
      />
      <div className="absolute inset-0 flex items-center justify-center bg-bg/70 opacity-0 backdrop-blur-lg transition-opacity duration-500 group-hover:opacity-100">
        <span className="relative inline-flex overflow-hidden rounded-full p-[1.5px]">
          <span className="accent-gradient-animated absolute inset-0 animate-gradient-shift" />
          <span className="relative rounded-full bg-text-primary px-6 py-3 font-body text-sm text-bg">
            {viewLabel} — <span className="font-display italic">{name}</span>
          </span>
        </span>
      </div>
      <div className="absolute inset-x-0 bottom-0 p-5 md:hidden">
        <h3 className="font-display text-2xl italic text-text-primary">{name}</h3>
        <p className="mt-1 text-xs text-muted">{description}</p>
      </div>
    </motion.div>
  )
}

export function Cuisine() {
  const { t } = useLanguage()

  return (
    <section id="maison" className="bg-bg py-16 md:py-24">
      <div className="mx-auto max-w-content px-6 md:px-10 lg:px-16">
        <SectionHeader
          eyebrow={t.cuisine.eyebrow}
          heading={
            <>
              {t.cuisine.headingPre} <em className="font-display italic">{t.cuisine.headingEm}</em>.
            </>
          }
          subtext={t.cuisine.subtext}
          action={
            <a
              href="#menu"
              data-cursor
              onClick={(e) => {
                e.preventDefault()
                document.querySelector('#menu')?.scrollIntoView({ behavior: 'smooth' })
              }}
              className="group relative hidden rounded-full text-sm md:inline-flex"
            >
              <span className="absolute -inset-[2px] rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100 accent-gradient" />
              <span className="relative flex items-center gap-1.5 rounded-full border border-stroke bg-bg px-5 py-2.5 text-text-primary">
                {t.cuisine.viewMenu} <span aria-hidden="true">↗</span>
              </span>
            </a>
          }
        />

        <div className="mt-12 grid grid-cols-1 gap-5 md:mt-16 md:grid-cols-12 md:gap-6">
          {t.cuisine.items.map((item, i) => (
            <Card
              key={item.name}
              name={item.name}
              description={item.description}
              image={INGREDIENTS[i].image}
              span={SPANS[i]}
              aspect={ASPECTS[i]}
              viewLabel={t.cuisine.view}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
