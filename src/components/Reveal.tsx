import { useRef, type ReactNode } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'

interface RevealProps {
  children: ReactNode
  className?: string
  delay?: number
  direction?: 'up' | 'down' | 'left' | 'right' | 'none'
  as?: 'div' | 'span'
}

/** Blur + offset fade-in, triggered once when the element enters view. */
export function Reveal({ children, className, delay = 0, direction = 'up', as = 'div' }: RevealProps) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-10% 0px -10% 0px' })
  const prefersReduced = useReducedMotion()

  const offset = direction === 'none' ? 0 : 18
  const axis = direction === 'left' || direction === 'right' ? 'x' : 'y'
  const sign = direction === 'left' || direction === 'up' ? 1 : -1

  const hidden = prefersReduced
    ? { opacity: 0 }
    : { opacity: 0, filter: 'blur(10px)', [axis]: offset * sign }
  const visible = prefersReduced
    ? { opacity: 1 }
    : { opacity: 1, filter: 'blur(0px)', [axis]: 0 }

  const Component = motion[as]

  return (
    <Component
      ref={ref}
      initial={hidden}
      animate={inView ? visible : hidden}
      transition={{ duration: 1.1, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </Component>
  )
}
