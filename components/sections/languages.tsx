'use client'

import { motion } from 'motion/react'
import { Reveal, SectionLabel } from '@/components/motion-primitives'

const languages = [
  { name: 'Français', level: 'Langue maternelle', value: 1 },
  { name: 'Anglais', level: 'B1', value: 0.55 },
  { name: 'Italien', level: 'B1 en progression', value: 0.5 },
]

export function Languages() {
  return (
    <section className="relative mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
      <SectionLabel>Langues</SectionLabel>
      <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-border/60 bg-border/40 md:grid-cols-3">
        {languages.map((l, i) => (
          <Reveal key={l.name} delay={i * 0.1}>
            <div className="h-full bg-card/50 p-8">
              <div className="flex items-baseline justify-between">
                <h3 className="font-heading text-2xl text-foreground">
                  {l.name}
                </h3>
                <span className="font-mono text-xs uppercase tracking-luxe text-gold">
                  {l.level}
                </span>
              </div>
              <div className="mt-6 h-1 w-full overflow-hidden rounded-full bg-border/60">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-gold to-sand"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${l.value * 100}%` }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 1.2,
                    delay: 0.2 + i * 0.1,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                />
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
