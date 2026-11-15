'use client'

import { motion } from 'motion/react'
import { SparkleCluster } from '@/components/motion-primitives'

const phrase =
  "Les grandes stratégies naissent souvent d'une curiosité que l'on refuse d'ignorer."

export function Outro() {
  const letters = Array.from(phrase)

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 py-32 text-center">
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[40vh] w-[60vw] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-30 blur-[140px]"
        style={{
          background:
            'radial-gradient(circle, oklch(0.78 0.09 78 / 0.3), transparent 70%)',
        }}
        aria-hidden="true"
      />

      <motion.h2
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.025 } },
        }}
        className="relative mx-auto max-w-4xl font-heading text-3xl leading-snug text-foreground text-balance sm:text-4xl lg:text-5xl"
      >
        {letters.map((char, i) => (
          <motion.span
            key={i}
            variants={{
              hidden: { opacity: 0, y: 12 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
              },
            }}
            className="inline-block whitespace-pre"
          >
            {char}
          </motion.span>
        ))}
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 1.2, duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="relative mt-14"
      >
        <span className="mx-auto block h-px w-16 bg-gold" />
        <p className="relative mx-auto mt-8 inline-block font-heading text-3xl text-foreground sm:text-4xl">
          <SparkleCluster />
          Lilou Gille
        </p>
        <p className="mx-auto mt-4 max-w-md text-sm uppercase tracking-luxe text-muted-foreground">
          Future professionnelle du marketing stratégique, de la communication
          et du développement de marque.
        </p>
      </motion.div>
    </section>
  )
}
