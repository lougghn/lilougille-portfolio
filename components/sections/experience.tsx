'use client'

import { Reveal, SectionLabel, WordReveal } from '@/components/motion-primitives'

const experiences = [
  {
    role: 'Chargée de Communication',
    org: 'Campus Créatif',
    sub: 'Université Catholique de Lille',
    period: 'Mai 2026 — Juillet 2026',
    missions: [
      'Communication globale, visuelle et 360° du spectacle Mozart',
      'Création de contenus digitaux et réalisation de vidéos',
      'Réels Instagram et stories immersives en direct',
      'Conception des flyers et du plan de communication Carmina',
      'Valorisation vidéo des équipes',
      'Mise à jour du site internet et des supports institutionnels',
    ],
  },
  {
    role: 'Chargée de Promotion',
    org: 'Hello Lille',
    sub: 'Promotion territoriale',
    period: 'Mai 2025 — Juillet 2025',
    missions: [
      'Valorisation du territoire métropolitain',
      'Promotion des lieux événementiels',
      'Création de programmes et gestion CRM',
      'Relation téléphonique professionnelle',
      'Mise à jour des bases documentaires',
      'Soutien opérationnel lors d\u2019événements',
    ],
  },
]

export function Experience() {
  return (
    <section
      id="experiences"
      className="relative mx-auto max-w-7xl px-6 py-28 lg:px-10 lg:py-40"
    >
      <SectionLabel>Expériences professionnelles</SectionLabel>
      <WordReveal
        as="h2"
        text="Transformer les idées en expériences."
        className="mt-6 max-w-3xl font-heading text-4xl leading-tight text-foreground text-balance sm:text-5xl lg:text-6xl"
      />

      <div className="mt-16 space-y-px overflow-hidden rounded-2xl border border-border/60 bg-border/40">
        {experiences.map((exp, i) => (
          <Reveal key={exp.role} delay={i * 0.1}>
            <article className="group grid gap-8 bg-card/50 p-8 transition-colors duration-500 hover:bg-card sm:p-12 lg:grid-cols-12">
              <div className="lg:col-span-4">
                <p className="font-mono text-xs uppercase tracking-luxe text-gold">
                  {exp.period}
                </p>
                <h3 className="mt-4 font-heading text-3xl text-foreground">
                  {exp.role}
                </h3>
                <p className="mt-2 text-base font-medium text-sand">
                  {exp.org}
                </p>
                <p className="text-sm text-muted-foreground">{exp.sub}</p>
              </div>
              <div className="lg:col-span-8">
                <ul className="grid gap-x-8 gap-y-3 sm:grid-cols-2">
                  {exp.missions.map((m) => (
                    <li
                      key={m}
                      className="flex gap-3 text-sm leading-relaxed text-foreground/80"
                    >
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-gold" />
                      {m}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
