'use client'

import { motion } from 'motion/react'
import { SectionLabel } from '@/components/motion-primitives'

const tools = [
  'Photoshop',
  'Illustrator',
  'InDesign',
  'Lightroom',
  'Canva',
  'CapCut',
  'Suite Adobe',
  'Excel',
  'Intelligence artificielle',
  'Outils collaboratifs digitaux',
]

export function Tools() {
  return (
    <section className="relative mx-auto max-w-7xl px-6 py-28 lg:px-10 lg:py-32">
      <div className="text-center">
        <SectionLabel className="flex justify-center">Outils</SectionLabel>
        <h2 className="mt-6 font-heading text-4xl text-foreground text-balance sm:text-5xl">
          Un atelier créatif &amp; analytique
        </h2>
      </div>

      <div className="mt-14 flex flex-wrap justify-center gap-4">
        {tools.map((t, i) => (
          <motion.div
            key={t}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{
              duration: 0.6,
              delay: (i % 5) * 0.06,
              ease: [0.22, 1, 0.36, 1],
            }}
            whileHover={{ y: -4 }}
            className="group flex items-center gap-3 rounded-full border border-border/60 bg-card/40 px-6 py-3 transition-colors hover:border-gold/50"
          >
            <span className="size-2 rounded-full bg-gold/70 transition-transform duration-300 group-hover:scale-125" />
            <span className="text-sm font-medium text-foreground/85">{t}</span>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
