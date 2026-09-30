'use client'

import { useEffect, useRef, useState } from 'react'
import {
  animate,
  motion,
  useInView,
} from 'motion/react'
import { Reveal, SectionLabel } from '@/components/motion-primitives'

function Counter({
  to,
  suffix = '',
  prefix = '',
}: {
  to: number
  suffix?: string
  prefix?: string
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [val, setVal] = useState(0)

  useEffect(() => {
    if (!inView) return
    const controls = animate(0, to, {
      duration: 1.8,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setVal(Math.round(v)),
    })
    return () => controls.stop()
  }, [inView, to])

  return (
    <span ref={ref}>
      {prefix}
      {val.toLocaleString('fr-FR')}
      {suffix}
    </span>
  )
}

const cards = [
  { value: <Counter to={100} prefix="+" suffix="%" />, label: 'Motivation' },
  { value: '+∞', label: 'Curiosité' },
  { value: <Counter to={1000} prefix="+" />, label: 'Idées à explorer' },
  { value: '2028', label: 'Objectif : Master Marketing & Stratégie' },
]

export function Dashboard() {
  return (
    <section className="relative mx-auto max-w-7xl px-6 py-28 lg:px-10 lg:py-32">
      <div className="rounded-3xl border border-border/60 bg-card/40 p-8 backdrop-blur-sm sm:p-12">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <SectionLabel>Tableau de bord stratégique</SectionLabel>
            <h2 className="mt-4 font-heading text-3xl text-foreground sm:text-4xl">
              Les indicateurs d&apos;une ambition
            </h2>
          </div>
          <p className="max-w-xs text-sm text-muted-foreground">
            À la manière des directions marketing et cabinets de conseil — des
            métriques qui disent qui je suis.
          </p>
        </div>

        <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-border/60 bg-border/40 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((c, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <div className="group h-full bg-card/60 p-8 transition-colors duration-500 hover:bg-card">
                <div className="flex items-center justify-between">
                  <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                  <motion.span
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 1,
                      delay: 0.3 + i * 0.08,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="h-px w-12 origin-right bg-gold/50"
                  />
                </div>
                <p className="mt-8 font-heading text-5xl text-foreground lg:text-6xl">
                  {c.value}
                </p>
                <p className="mt-3 text-sm leading-snug text-muted-foreground">
                  {c.label}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
