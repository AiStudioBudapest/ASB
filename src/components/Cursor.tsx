import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion'

/** Elegant custom cursor — dot + trailing ring, grows on interactive targets. */
export function Cursor() {
  const [active, setActive] = useState(false)
  const [visible, setVisible] = useState(false)
  const [fine, setFine] = useState(false)
  const prefersReduced = useReducedMotion()

  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const ringX = useSpring(x, { damping: 30, stiffness: 250, mass: 0.5 })
  const ringY = useSpring(y, { damping: 30, stiffness: 250, mass: 0.5 })

  useEffect(() => {
    const mq = window.matchMedia('(pointer: fine)')
    setFine(mq.matches)
    const onChange = () => setFine(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  useEffect(() => {
    if (!fine) return
    document.body.classList.add('cursor-ready')

    function onMove(e: MouseEvent) {
      x.set(e.clientX)
      y.set(e.clientY)
      if (!visible) setVisible(true)
    }
    function onOver(e: MouseEvent) {
      const target = (e.target as HTMLElement)?.closest('a, button, [data-cursor]')
      setActive(Boolean(target))
    }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseover', onOver)
    return () => {
      document.body.classList.remove('cursor-ready')
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseover', onOver)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fine])

  if (!fine || prefersReduced) return null

  return (
    <div className="pointer-events-none fixed inset-0 z-[70]" aria-hidden="true">
      <motion.div
        className="absolute top-0 left-0 rounded-full bg-accent"
        style={{ x, y, width: 6, height: 6, translateX: '-50%', translateY: '-50%' }}
        animate={{ opacity: visible ? 1 : 0 }}
      />
      <motion.div
        className="absolute top-0 left-0 rounded-full border border-accent/70"
        style={{
          x: ringX,
          y: ringY,
          width: active ? 52 : 32,
          height: active ? 52 : 32,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{ opacity: visible ? (active ? 0.9 : 0.5) : 0 }}
        transition={{ width: { duration: 0.35, ease: [0.16, 1, 0.3, 1] }, height: { duration: 0.35, ease: [0.16, 1, 0.3, 1] } }}
      />
    </div>
  )
}
