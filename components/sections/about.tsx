'use client'

import { Reveal, SectionLabel, WordReveal, Sparkle } from '@/components/motion-primitives'
import { TiltPortrait } from '@/components/tilt-portrait'

const paragraphs = [
  "Je suis actuellement étudiante à l'ISTC – Université Catholique de Lille en Licence de Droit, Économie et Gestion de la Communication.",
  "Mon parcours a débuté à l'ISEFAC Lille où j'ai suivi une Licence Communication 360 durant mes deux premières années, avant de poursuivre ma troisième année à l'ISTC afin d'approfondir ma compréhension des enjeux économiques, juridiques et stratégiques de la communication.",
  "Ce qui me passionne n'est pas seulement la communication elle-même, mais tout ce qui la précède : l'analyse, l'observation des comportements, l'étude des tendances et la conception de stratégies capables de générer un impact durable.",
  'À terme, je souhaite me spécialiser dans le marketing stratégique afin de contribuer à la construction de marques fortes, innovantes et porteuses de sens.',
]

export function About() {
  return (
    <section id="about" className="relative mx-auto max-w-7xl px-6 py-28 lg:px-10 lg:py-40">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <SectionLabel>À propos</SectionLabel>
          <WordReveal
            as="h2"
            text="Penser le monde avant de le communiquer."
            className="mt-6 font-heading text-4xl leading-tight text-foreground text-balance sm:text-5xl lg:text-6xl"
          />
          <Reveal delay={0.2} className="mt-8">
            <div className="flex items-center gap-4">
              <Sparkle size={20} />
              <p className="text-sm italic text-muted-foreground">
                Derrière une marque, je cherche toujours le pourquoi.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.3} className="mt-10">
            <TiltPortrait />
          </Reveal>
        </div>

        <div className="lg:col-span-7">
          <div className="space-y-6 border-l border-border/60 pl-6 lg:pl-10">
            {paragraphs.map((p, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <p className="text-pretty text-base leading-relaxed text-foreground/80 md:text-lg">
                  {p}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
