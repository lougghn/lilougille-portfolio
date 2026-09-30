'use client'

import Image from 'next/image'
import { motion } from 'motion/react'
import { Reveal, SectionLabel } from '@/components/motion-primitives'

const cards = [
  {
    img: '/passions/art-culture.png',
    title: 'Art, culture & patrimoine',
    tags: ['Art', 'Culture', 'Musées', 'Histoire', 'Patrimoine'],
  },
  {
    img: '/passions/spectacle-vivant.png',
    title: 'Spectacle vivant',
    tags: ['Théâtre', 'Spectacles vivants', 'Reportages documentaires'],
  },
  {
    img: '/passions/branding.png',
    title: 'Marketing & branding',
    tags: ['Marketing', 'Branding', 'Tendances', 'Analyse des marques'],
  },
]

export function Passions() {
  return (
    <section className="relative mx-auto max-w-7xl px-6 py-28 lg:px-10 lg:py-40">
      <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-7">
          <SectionLabel>Passions</SectionLabel>
          <h2 className="mt-6 font-heading text-4xl leading-tight text-foreground text-balance sm:text-5xl lg:text-6xl">
            Ce qui nourrit ma créativité.
          </h2>
        </div>
        <Reveal className="lg:col-span-5">
          <p className="text-pretty text-base leading-relaxed text-muted-foreground">
            Je puise mon inspiration dans les lieux qui racontent une histoire,
            les œuvres qui traversent le temps et les marques qui savent créer
            du sens.
          </p>
        </Reveal>
      </div>

      <div className="mt-16 grid gap-6 md:grid-cols-3">
        {cards.map((c, i) => (
          <Reveal key={c.title} delay={i * 0.1}>
            <motion.article
              whileHover="hover"
              className="group relative h-[26rem] overflow-hidden rounded-2xl border border-border/60"
            >
              <motion.div
                variants={{ hover: { scale: 1.06 } }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0"
              >
                <Image
                  src={c.img || '/placeholder.svg'}
                  alt={c.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover"
                />
              </motion.div>
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-7">
                <h3 className="font-heading text-2xl text-foreground">
                  {c.title}
                </h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {c.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-foreground/20 bg-background/30 px-3 py-1 text-xs text-foreground/80 backdrop-blur-sm"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.article>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
