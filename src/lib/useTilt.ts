import { useRef, type MouseEvent } from 'react'
import { useMotionValue, useSpring, useReducedMotion } from 'framer-motion'

/** Subtle pointer-driven 3D tilt for a card-like element. */
export function useTilt(maxDeg = 6) {
  const ref = useRef<HTMLDivElement>(null)
  const prefersReduced = useReducedMotion()

  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const rotateX = useSpring(rawX, { stiffness: 180, damping: 18 })
  const rotateY = useSpring(rawY, { stiffness: 180, damping: 18 })

  function onMouseMove(e: MouseEvent<HTMLDivElement>) {
    if (prefersReduced || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width - 0.5
    const py = (e.clientY - rect.top) / rect.height - 0.5
    rawY.set(px * maxDeg)
    rawX.set(-py * maxDeg)
  }

  function onMouseLeave() {
    rawX.set(0)
    rawY.set(0)
  }

  return { ref, rotateX, rotateY, onMouseMove, onMouseLeave }
}
