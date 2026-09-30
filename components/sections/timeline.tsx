'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { Reveal, SectionLabel } from '@/components/motion-primitives'

const steps = [
  {
    period: '2023 — 2025',
    school: 'ISEFAC Lille',
    degree: 'Licence Communication 360',
    detail:
      'Deux premières années consacrées aux fondamentaux de la communication globale, du digital et de la création.',
  },
  {
    period: '2026 — 2027',
    school: 'ISTC — Université Catholique de Lille',
    degree: 'Licence Droit, Économie et Gestion de la Communication',
    detail:
      "Approfondissement des enjeux économiques, juridiques et stratégiques de la communication.",
  },
  {
    period: '2028',
    school: 'Objectif',
    degree: 'Mastère Marketing & Stratégie',
    detail:
      'Une trajectoire orientée vers le marketing stratégique et le développement de marque.',
  },
]

export function Timeline() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 80%', 'end 60%'],
  })
  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <section
      id="parcours"
      className="relative mx-auto max-w-7xl px-6 py-28 lg:px-10 lg:py-40"
    >
      <div className="mx-auto max-w-3xl text-center">
        <SectionLabel className="flex justify-center">
          Parcours académique
        </SectionLabel>
        <h2 className="mt-6 font-heading text-4xl text-foreground text-balance sm:text-5xl">
          Une trajectoire qui se dessine
        </h2>
      </div>

      <div ref={ref} className="relative mt-20 pl-10 sm:mx-auto sm:max-w-3xl">
        {/* track */}
        <div className="absolute left-[3px] top-2 bottom-2 w-px bg-border/60 sm:left-1/2 sm:-translate-x-1/2" />
        {/* progress */}
        <motion.div
          style={{ height: lineHeight }}
          className="absolute left-[3px] top-2 w-px origin-top bg-gradient-to-b from-gold via-gold to-transparent sm:left-1/2 sm:-translate-x-1/2"
        />

        <div className="space-y-16">
          {steps.map((s, i) => (
            <Reveal key={s.school} delay={i * 0.05}>
              <div
                className={`relative sm:grid sm:grid-cols-2 sm:gap-10 ${
                  i % 2 === 0 ? '' : 'sm:[&>*:first-child]:order-2'
                }`}
              >
                {/* node */}
                <span className="absolute -left-[37px] top-1.5 grid size-4 place-items-center rounded-full border border-gold bg-background sm:left-1/2 sm:-translate-x-1/2">
                  <span className="size-1.5 rounded-full bg-gold" />
                </span>

                <div
                  className={`${
                    i % 2 === 0
                      ? 'sm:pr-10 sm:text-right'
                      : 'sm:col-start-2 sm:pl-10'
                  }`}
                >
                  <p className="font-mono text-xs uppercase tracking-luxe text-gold">
                    {s.period}
                  </p>
                  <h3 className="mt-2 font-heading text-2xl text-foreground">
                    {s.school}
                  </h3>
                  <p className="mt-1 text-sm font-medium text-sand">
                    {s.degree}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {s.detail}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
