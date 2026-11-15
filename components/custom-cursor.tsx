'use client'

import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'motion/react'

export function CustomCursor() {
  const [enabled, setEnabled] = useState(false)
  const [hovering, setHovering] = useState(false)
  const [visible, setVisible] = useState(false)

  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const ringX = useSpring(x, { stiffness: 280, damping: 30, mass: 0.5 })
  const ringY = useSpring(y, { stiffness: 280, damping: 30, mass: 0.5 })

  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    if (!fine) return
    setEnabled(true)
    document.documentElement.classList.add('custom-cursor-active')

    const move = (e: MouseEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
      setVisible(true)
      const target = e.target as HTMLElement
      setHovering(
        !!target.closest('a, button, [data-cursor="hover"], input, textarea'),
      )
    }
    const leave = () => setVisible(false)

    window.addEventListener('mousemove', move)
    document.addEventListener('mouseleave', leave)
    return () => {
      window.removeEventListener('mousemove', move)
      document.removeEventListener('mouseleave', leave)
      document.documentElement.classList.remove('custom-cursor-active')
    }
  }, [x, y])

  if (!enabled) return null

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[100] hidden md:block"
      aria-hidden="true"
    >
      <motion.div
        className="fixed top-0 left-0 rounded-full bg-gold"
        style={{
          x,
          y,
          width: 6,
          height: 6,
          translateX: '-50%',
          translateY: '-50%',
          opacity: visible ? 1 : 0,
        }}
      />
      <motion.div
        className="fixed top-0 left-0 rounded-full border border-gold/60"
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
          opacity: visible ? 1 : 0,
        }}
        animate={{
          width: hovering ? 56 : 30,
          height: hovering ? 56 : 30,
          borderColor: hovering
            ? 'oklch(0.85 0.035 75 / 0.9)'
            : 'oklch(0.78 0.09 78 / 0.55)',
        }}
        transition={{ type: 'spring', stiffness: 250, damping: 22 }}
      />
    </div>
  )
}
