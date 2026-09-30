'use client'

import { motion } from 'motion/react'
import { Eye, Brain, BarChart3, Sparkles, Megaphone } from 'lucide-react'
import { SectionLabel } from '@/components/motion-primitives'

const steps = [
  { icon: Eye, title: 'Observer', text: 'Capter les signaux faibles et les comportements.' },
  { icon: Brain, title: 'Comprendre', text: 'Décrypter les motivations profondes.' },
  { icon: BarChart3, title: 'Analyser', text: 'Croiser les données et les tendances.' },
  { icon: Sparkles, title: 'Créer', text: 'Concevoir des idées à fort impact.' },
  { icon: Megaphone, title: 'Influencer', text: 'Transformer la stratégie en résonance.' },
]

export function Method() {
  return (
    <section
      id="methode"
      className="relative mx-auto max-w-7xl px-6 py-28 lg:px-10 lg:py-40"
    >
      <div className="mx-auto max-w-3xl text-center">
        <SectionLabel className="flex justify-center">
          Ma méthode de réflexion
        </SectionLabel>
        <h2 className="mt-6 font-heading text-4xl text-foreground text-balance sm:text-5xl">
          Du signal à la stratégie
        </h2>
      </div>

      <div className="mt-20 grid gap-6 md:grid-cols-5 md:gap-0">
        {steps.map((s, i) => {
          const Icon = s.icon
          return (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{
                duration: 0.7,
                delay: i * 0.15,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="relative flex flex-col items-center text-center md:px-4"
            >
              {/* connector */}
              {i < steps.length - 1 && (
                <motion.span
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    delay: i * 0.15 + 0.3,
                    ease: 'easeOut',
                  }}
                  className="absolute left-1/2 top-8 hidden h-px w-full origin-left bg-gradient-to-r from-gold/60 to-gold/20 md:block"
                />
              )}
              <div className="relative z-10 grid size-16 place-items-center rounded-full border border-gold/40 bg-card">
                <Icon className="size-6 text-gold" />
              </div>
              <span className="mt-2 font-mono text-xs text-gold">
                0{i + 1}
              </span>
              <h3 className="mt-3 font-heading text-2xl text-foreground">
                {s.title}
              </h3>
              <p className="mt-2 max-w-[14rem] text-sm leading-relaxed text-muted-foreground">
                {s.text}
              </p>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
