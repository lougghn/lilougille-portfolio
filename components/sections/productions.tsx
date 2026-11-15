'use client'

import { useMemo, useState } from 'react'
import Image from 'next/image'
import { AnimatePresence, motion } from 'motion/react'
import { Reveal, SectionLabel } from '@/components/motion-primitives'

type Category =
  | 'Communication'
  | 'Événementiel'
  | 'Création de contenu'
  | 'Vidéo'
  | 'Branding'
  | 'Supports print'
  | 'Réseaux sociaux'
  | 'Affiches'
  | 'Publicité'
  | 'Prévention'

type Project = {
  title: string
  org: string
  img: string
  categories: Category[]
}

const projects: Project[] = [
  {
    title: 'Airwaves — « Sous vos pieds »',
    org: 'Affiche publicitaire · Concept créatif',
    img: '/productions/affiche-airwaves.png',
    categories: ['Affiches', 'Publicité', 'Branding'],
  },
  {
    title: '3 secondes / 15 ans',
    org: 'Affiche de prévention · Déchets dans la rue',
    img: '/productions/affiche-dechet.png',
    categories: ['Affiches', 'Prévention', 'Communication'],
  },
  {
    title: 'Pas leur jeu',
    org: 'Affiche de prévention · Sécurité en soirée',
    img: '/productions/affiche-soiree.png',
    categories: ['Affiches', 'Prévention', 'Communication'],
  },
  {
    title: 'Garde le contrôle',
    org: 'Affiche de prévention · Alcool & soumission chimique',
    img: '/productions/affiche-alcool.png',
    categories: ['Affiches', 'Prévention', 'Communication'],
  },
  {
    title: 'Campagne IKEA — Le tapis',
    org: 'Projet créatif · « Un zeste de bonne humeur »',
    img: '/productions/ikea-tapis.jpg',
    categories: ['Affiches', 'Branding', 'Communication'],
  },
  {
    title: 'Campagne IKEA — Le fauteuil',
    org: 'Projet créatif · « Une excuse pour rester »',
    img: '/productions/ikea-fauteuil.jpg',
    categories: ['Affiches', 'Branding', 'Communication'],
  },
  {
    title: 'Campagne IKEA — Le vase',
    org: 'Projet créatif · « Fleurir chaque instant »',
    img: '/productions/ikea-vase.jpg',
    categories: ['Affiches', 'Branding', 'Communication'],
  },
  {
    title: 'Flyer Carmina Burana — Recto',
    org: 'Spectacle Carmina · Université Catholique de Lille',
    img: '/productions/carmina-flyer-recto.jpg',
    categories: ['Supports print', 'Communication', 'Branding'],
  },
  {
    title: 'Flyer Carmina Burana — Verso',
    org: 'Spectacle Carmina · Université Catholique de Lille',
    img: '/productions/carmina-flyer-verso.jpg',
    categories: ['Supports print', 'Communication'],
  },
]

const filters: ('Tout' | Category)[] = [
  'Tout',
  'Affiches',
  'Publicité',
  'Prévention',
  'Communication',
  'Branding',
  'Supports print',
]

export function Productions() {
  const [active, setActive] = useState<'Tout' | Category>('Tout')

  const filtered = useMemo(
    () =>
      active === 'Tout'
        ? projects
        : projects.filter((p) => p.categories.includes(active)),
    [active],
  )

  return (
    <section
      id="productions"
      className="relative mx-auto max-w-7xl px-6 py-28 lg:px-10 lg:py-40"
    >
      <SectionLabel>Mes productions</SectionLabel>
      <h2 className="mt-6 max-w-3xl font-heading text-4xl leading-tight text-foreground text-balance sm:text-5xl lg:text-6xl">
        Une sélection de réalisations
      </h2>

      <div className="mt-10 flex flex-wrap gap-2.5">
        {filters.map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setActive(f)}
            className={`rounded-full border px-4 py-2 text-xs uppercase tracking-luxe transition-colors duration-300 ${
              active === f
                ? 'border-gold bg-gold text-accent-foreground'
                : 'border-border/60 text-muted-foreground hover:border-gold/50 hover:text-foreground'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <motion.div layout className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filtered.map((p) => (
            <motion.article
              key={p.title}
              layout
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="group relative overflow-hidden rounded-2xl border border-border/60"
            >
              <div className="relative aspect-[210/297] overflow-hidden">
                <Image
                  src={p.img || '/placeholder.svg'}
                  alt={p.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent opacity-90" />
              </div>
              <div className="absolute inset-x-0 bottom-0 p-6">
                <div className="flex flex-wrap gap-1.5">
                  {p.categories.map((c) => (
                    <span
                      key={c}
                      className="rounded-full bg-gold/15 px-2.5 py-0.5 text-[10px] uppercase tracking-wide text-gold"
                    >
                      {c}
                    </span>
                  ))}
                </div>
                <h3 className="mt-3 font-heading text-xl text-foreground">
                  {p.title}
                </h3>
                <p className="text-sm text-muted-foreground">{p.org}</p>
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </motion.div>

      <Reveal className="mt-12">
        <p className="text-sm italic text-muted-foreground">
          Affiches · réels · vidéos · flyers · plans de communication ·
          présentations · projets académiques — d&apos;autres réalisations sont
          dévoilées dans les coulisses.
        </p>
      </Reveal>
    </section>
  )
}
