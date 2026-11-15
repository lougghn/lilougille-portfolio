'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { SectionLabel, WordReveal, Sparkle } from '@/components/motion-primitives'

const lines = [
  "Le marketing n'est pas simplement l'art de vendre.",
  "C'est l'art de comprendre.",
  'Comprendre les comportements.',
  'Comprendre les aspirations.',
  'Comprendre les évolutions de notre société.',
]

export function Vision() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const glow = useTransform(scrollYProgress, [0, 0.5, 1], [0.1, 0.45, 0.1])

  return (
    <section ref={ref} className="relative overflow-hidden py-32 lg:py-48">
      <motion.div
        style={{ opacity: glow }}
        className="pointer-events-none absolute left-1/2 top-1/2 h-[50vh] w-[80vw] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[140px]"
        aria-hidden="true"
      >
        <div
          className="h-full w-full"
          style={{
            background:
              'radial-gradient(circle, oklch(0.78 0.09 78 / 0.35), transparent 70%)',
          }}
        />
      </motion.div>

      <div className="relative mx-auto max-w-4xl px-6 text-center lg:px-10">
        <SectionLabel className="flex justify-center">Ma vision</SectionLabel>

        <div className="mt-10 space-y-2">
          {lines.map((l, i) => (
            <div
              key={i}
              className={i === 1 ? 'flex items-center justify-center gap-3' : ''}
            >
              {i === 1 && <Sparkle size={22} />}
              <WordReveal
                as="h2"
                text={l}
                delay={i * 0.1}
                className={`font-heading leading-tight text-balance ${
                  i === 1
                    ? 'text-3xl text-gold sm:text-4xl lg:text-5xl'
                    : 'text-2xl text-foreground sm:text-3xl lg:text-4xl'
                }`}
              />
              {i === 1 && <Sparkle size={22} delay={1.1} />}
            </div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mt-12 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg"
        >
          Je souhaite évoluer dans un environnement où la créativité rencontre
          l&apos;analyse, où les intuitions sont renforcées par les données et
          où les stratégies créent des connexions authentiques entre les marques
          et les individus. Mon ambition est de participer à la construction des
          marques qui marqueront leur époque.
        </motion.p>
      </div>
    </section>
  )
}
