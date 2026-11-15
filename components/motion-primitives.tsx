'use client'

import { motion, type Variants } from 'motion/react'
import type { ReactNode } from 'react'

const easeLuxe = [0.22, 1, 0.36, 1] as const

/* A small twinkling four-point gold star/sparkle */
export function Sparkle({
  className,
  size = 14,
  delay = 0,
  duration = 2.6,
}: {
  className?: string
  size?: number
  delay?: number
  duration?: number
}) {
  return (
    <motion.span
      className={`inline-flex shrink-0 text-gold ${className ?? ''}`}
      style={{ width: size, height: size }}
      aria-hidden="true"
      initial={{ scale: 0.5, opacity: 0.35, rotate: 0 }}
      animate={{
        scale: [0.55, 1, 0.7, 1, 0.55],
        opacity: [0.35, 1, 0.6, 0.95, 0.35],
        rotate: [0, 90, 90, 180, 180],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      <svg viewBox="0 0 24 24" fill="currentColor" width={size} height={size}>
        <path d="M12 0c.5 5.6 1.9 7 7.5 7.5C13.9 8 12.5 9.4 12 15c-.5-5.6-1.9-7-7.5-7.5C10.1 7 11.5 5.6 12 0z" transform="translate(0 4.5)" />
      </svg>
    </motion.span>
  )
}

/* A decorative cluster of sparkles, e.g. floating around a heading */
export function SparkleCluster({ className }: { className?: string }) {
  return (
    <span
      className={`pointer-events-none absolute inset-0 ${className ?? ''}`}
      aria-hidden="true"
    >
      <Sparkle size={16} delay={0} className="absolute -left-2 -top-3" />
      <Sparkle size={10} delay={0.6} className="absolute right-2 -top-4" />
      <Sparkle size={12} delay={1.2} className="absolute -right-3 top-1/2" />
      <Sparkle size={8} delay={1.8} className="absolute left-4 -bottom-3" />
    </span>
  )
}

/* Fade + rise on scroll into view */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 28,
  once = true,
}: {
  children: ReactNode
  className?: string
  delay?: number
  y?: number
  once?: boolean
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: '-80px' }}
      transition={{ duration: 0.9, ease: easeLuxe, delay }}
    >
      {children}
    </motion.div>
  )
}

/* Word-by-word reveal for editorial headings/paragraphs */
export function WordReveal({
  text,
  className,
  wordClassName,
  delay = 0,
  stagger = 0.045,
  as = 'p',
}: {
  text: string
  className?: string
  wordClassName?: string
  delay?: number
  stagger?: number
  as?: 'p' | 'h1' | 'h2' | 'h3' | 'span'
}) {
  const words = text.split(' ')
  const container: Variants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: stagger, delayChildren: delay },
    },
  }
  const child: Variants = {
    hidden: { opacity: 0, y: '0.5em', filter: 'blur(6px)' },
    visible: {
      opacity: 1,
      y: '0em',
      filter: 'blur(0px)',
      transition: { duration: 0.7, ease: easeLuxe },
    },
  }
  const MotionTag = motion[as]
  return (
    <MotionTag
      className={className}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
    >
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          className="inline-block overflow-hidden align-bottom"
        >
          <motion.span
            variants={child}
            className={`inline-block ${wordClassName ?? ''}`}
          >
            {word}
            {i < words.length - 1 ? '\u00A0' : ''}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  )
}

/* Small uppercase section label with gold tick */
export function SectionLabel({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <Reveal className={className}>
      <div className="flex items-center gap-3 text-xs font-medium uppercase tracking-luxe text-gold">
        <Sparkle size={13} />
        <span className="h-px w-8 bg-gold" aria-hidden="true" />
        {children}
      </div>
    </Reveal>
  )
}
