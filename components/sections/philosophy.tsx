'use client'

import { motion } from 'motion/react'
import { SectionLabel, Sparkle } from '@/components/motion-primitives'

const quotes = [
  {
    text: 'Le véritable voyage de découverte ne consiste pas à chercher de nouveaux paysages mais à avoir de nouveaux yeux.',
    author: 'Marcel Proust',
  },
  {
    text: "Les consommateurs n'achètent pas ce que vous faites, ils achètent pourquoi vous le faites.",
    author: 'Simon Sinek',
  },
  {
    text: 'La stratégie consiste à faire des choix.',
    author: 'Michael Porter',
  },
  {
    text: "Le détail n'est pas le détail. Il fait le design.",
    author: 'Charles Eames',
  },
  {
    text: "La meilleure façon de prédire l'avenir est de le créer.",
    author: 'Peter Drucker',
  },
]

export function Philosophy() {
  return (
    <section className="relative overflow-hidden border-y border-border/60 py-28 lg:py-40">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionLabel>Philosophie</SectionLabel>
        <h2 className="mt-6 font-heading text-4xl text-foreground text-balance sm:text-5xl">
          Les idées qui m&apos;accompagnent
        </h2>
      </div>

      <div className="mt-16 flex gap-6 overflow-x-auto px-6 pb-6 lg:px-10 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {quotes.map((q, i) => (
          <motion.figure
            key={q.author}
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{
              duration: 0.7,
              delay: (i % 3) * 0.1,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="group relative flex min-h-[18rem] w-[20rem] shrink-0 flex-col justify-between rounded-2xl border border-border/60 bg-card/40 p-8 transition-colors hover:border-gold/40 sm:w-[24rem]"
          >
            <Sparkle size={26} delay={(i % 3) * 0.5} />
            <blockquote className="-mt-6 font-heading text-xl italic leading-snug text-foreground/90">
              {q.text}
            </blockquote>
            <figcaption className="mt-6 text-sm uppercase tracking-luxe text-gold">
              — {q.author}
            </figcaption>
          </motion.figure>
        ))}
      </div>
    </section>
  )
}
