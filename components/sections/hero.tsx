'use client'

import { motion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'
import { ArrowDown } from 'lucide-react'
import { ParticleNetwork } from '@/components/particle-network'
import { WordReveal, Sparkle } from '@/components/motion-primitives'

const easeLuxe = [0.22, 1, 0.36, 1] as const

export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  return (
    <section
      ref={ref}
      id="top"
      className="relative flex min-h-screen items-center overflow-hidden"
    >
      <ParticleNetwork className="absolute inset-0 h-full w-full" />

      {/* light glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/3 h-[60vh] w-[60vh] -translate-x-1/2 rounded-full opacity-40 blur-[120px]"
        style={{ background: 'radial-gradient(circle, oklch(0.78 0.09 78 / 0.25), transparent 70%)' }}
        aria-hidden="true"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background" />

      <motion.div
        style={{ y, opacity }}
        className="relative z-10 mx-auto w-full max-w-5xl px-6 py-32 text-center lg:px-10"
      >
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: easeLuxe, delay: 0.3 }}
          className="flex items-center justify-center gap-3 font-heading text-lg italic text-sand sm:text-xl md:text-2xl"
        >
          <Sparkle size={16} />
          <span>
            «&nbsp;Les grandes stratégies commencent souvent par une simple
            question.&nbsp;»
          </span>
          <Sparkle size={16} delay={1.3} />
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: easeLuxe, delay: 0.55 }}
          className="mt-8 font-heading text-6xl leading-[0.95] tracking-tight text-foreground text-balance sm:text-7xl md:text-8xl lg:text-9xl"
        >
          Lilou Gille
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, ease: easeLuxe, delay: 0.85 }}
          className="mx-auto mt-6 max-w-2xl text-sm uppercase tracking-luxe text-muted-foreground sm:text-base"
        >
          Étudiante en Droit, Économie et Gestion de la Communication
          <span className="mt-2 block text-gold">
            ISTC — Université Catholique de Lille
          </span>
        </motion.p>

        <div className="mx-auto mt-10 max-w-2xl">
          <WordReveal
            text="Observer. Comprendre. Anticiper. Depuis toujours, je regarde au-delà de ce qui est visible — pour saisir les mécanismes qui influencent les comportements et façonnent les imaginaires."
            className="text-pretty text-base leading-relaxed text-foreground/80 md:text-lg"
            delay={1.1}
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: easeLuxe, delay: 1.5 }}
          className="mt-12 flex justify-center"
        >
          <a
            href="#about"
            className="group inline-flex items-center gap-3 rounded-full bg-gold px-8 py-4 text-sm font-medium uppercase tracking-luxe text-accent-foreground transition-transform duration-300 hover:scale-[1.03]"
          >
            Découvrir mon univers
            <ArrowDown className="size-4 transition-transform duration-300 group-hover:translate-y-1" />
          </a>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2"
      >
        <span className="text-[10px] uppercase tracking-luxe text-muted-foreground">
          Défiler
        </span>
        <motion.span
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
          className="h-8 w-px bg-gradient-to-b from-gold to-transparent"
        />
      </motion.div>
    </section>
  )
}
