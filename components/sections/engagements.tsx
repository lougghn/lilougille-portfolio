'use client'

import { motion } from 'motion/react'
import { Reveal, SectionLabel } from '@/components/motion-primitives'

const partners = [
  'Lille Grand Palais',
  'Lille Events',
  'Le Jost',
  'Le 14 Avenue',
  'Les Tanneurs',
  'Casino Barrière',
  'LaCom',
]

export function Engagements() {
  // Duplicate the list so the marquee can loop seamlessly.
  const loop = [...partners, ...partners]

  return (
    <section className="relative overflow-hidden py-28 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionLabel>Bénévolat</SectionLabel>
        <Reveal delay={0.1}>
          <h2 className="mt-6 max-w-3xl font-heading text-4xl leading-tight text-foreground text-balance sm:text-5xl">
            Ils m&apos;ont fait confiance.
          </h2>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="mt-5 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground">
            Accueil, logistique, création de contenu et soutien événementiel —
            l&apos;expérience se construit aussi sur le terrain, aux côtés de
            lieux et d&apos;événements qui m&apos;ont accordé leur confiance.
          </p>
        </Reveal>
      </div>

      <div className="relative mt-16">
        {/* Fade edges */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent lg:w-40" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background to-transparent lg:w-40" />

        <motion.div
          className="flex w-max gap-4"
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 26, ease: 'linear', repeat: Infinity }}
        >
          {loop.map((name, i) => (
            <div
              key={`${name}-${i}`}
              className="group flex h-20 shrink-0 items-center justify-center rounded-2xl border border-border/60 bg-card/40 px-10 transition-colors hover:border-gold/40"
            >
              <span className="whitespace-nowrap font-heading text-xl text-foreground/70 transition-colors group-hover:text-foreground sm:text-2xl">
                {name}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
