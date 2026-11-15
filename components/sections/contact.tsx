'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { Mail, ArrowUpRight } from 'lucide-react'
import { Reveal } from '@/components/motion-primitives'

const paragraphs = [
  'Les affiches ne racontent pas les heures de réflexion.',
  'Les vidéos ne révèlent pas les stratégies qui les ont fait naître.',
  "Les événements ne montrent pas l'ensemble du travail accompli en coulisses.",
  "Derrière chaque projet présenté ici se cache une histoire plus vaste, faite d'idées, d'analyses, de créations et d'ambitions.",
]

export function Contact() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'center center'],
  })
  const leftCurtain = useTransform(scrollYProgress, [0, 1], ['0%', '-100%'])
  const rightCurtain = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <section
      id="contact"
      ref={ref}
      className="relative overflow-hidden bg-[oklch(0.13_0.006_60)] py-28 lg:py-40"
    >
      {/* curtains */}
      <motion.div
        style={{ x: leftCurtain }}
        className="pointer-events-none absolute inset-y-0 left-0 z-20 w-1/2"
        aria-hidden="true"
      >
        <div className="h-full w-full bg-gradient-to-r from-[oklch(0.1_0.01_40)] to-[oklch(0.16_0.02_45)] shadow-2xl" />
      </motion.div>
      <motion.div
        style={{ x: rightCurtain }}
        className="pointer-events-none absolute inset-y-0 right-0 z-20 w-1/2"
        aria-hidden="true"
      >
        <div className="h-full w-full bg-gradient-to-l from-[oklch(0.1_0.01_40)] to-[oklch(0.16_0.02_45)] shadow-2xl" />
      </motion.div>

      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center lg:px-10">
        <Reveal>
          <p className="text-xs uppercase tracking-luxe text-gold">
            Contact
          </p>
        </Reveal>
        <h2 className="mt-6 font-heading text-4xl leading-tight text-foreground text-balance sm:text-5xl lg:text-6xl">
          Ce que vous voyez n&apos;est qu&apos;un premier acte.
        </h2>

        <div className="mx-auto mt-10 max-w-2xl space-y-4">
          {paragraphs.map((p, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <p className="text-pretty leading-relaxed text-muted-foreground">
                {p}
              </p>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <p className="mt-10 font-heading text-2xl italic text-sand">
            Le rideau est entrouvert.
          </p>
          <p className="mx-auto mt-4 max-w-xl text-pretty leading-relaxed text-muted-foreground">
            Pour découvrir mes productions complètes, mes réalisations
            exclusives et les projets qui ne sont pas exposés publiquement, je
            vous invite à entrer dans les coulisses.
          </p>
        </Reveal>

        <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href="mailto:lilougille24@gmail.com"
            className="group inline-flex items-center gap-3 rounded-full bg-gold px-7 py-4 text-sm font-medium text-accent-foreground transition-transform duration-300 hover:scale-[1.03]"
          >
            <Mail className="size-4" />
            lilougille24@gmail.com
          </a>
          <a
            href="https://www.linkedin.com/in/lilou-gille-8a55aa321/"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 rounded-full border border-border/60 px-7 py-4 text-sm text-foreground transition-colors duration-300 hover:border-gold/50"
          >
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-4 text-gold"
              aria-hidden="true"
            >
              <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.55V9h3.57v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
            </svg>
            LinkedIn
            <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>

        <Reveal delay={0.3}>
          <p className="mx-auto mt-16 max-w-xl border-t border-border/60 pt-8 font-heading text-lg italic leading-relaxed text-foreground/70">
            «&nbsp;Le spectacle appartient au public. La stratégie appartient à
            ceux qui osent regarder derrière le rideau.&nbsp;»
          </p>
        </Reveal>
      </div>
    </section>
  )
}
