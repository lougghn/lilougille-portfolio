'use client'

import { motion, useInView } from 'motion/react'
import { useRef } from 'react'
import { Reveal, SectionLabel } from '@/components/motion-primitives'

const axes = [
  { label: 'Créativité', value: 0.92 },
  { label: 'Communication', value: 0.95 },
  { label: 'Analyse', value: 0.85 },
  { label: 'Organisation', value: 0.88 },
  { label: 'Gestion de projet', value: 0.82 },
  { label: "Travail d'équipe", value: 0.9 },
]

const softSkills = [
  'Patiente',
  'Ambitieuse',
  'Énergique',
  'Productive',
  'Autonome',
  "Esprit d'équipe",
  'Curieuse',
  'Rigoureuse',
  "Sens de l'analyse",
]

const SIZE = 320
const CENTER = SIZE / 2
const RADIUS = 120

function point(i: number, r: number) {
  const angle = (Math.PI * 2 * i) / axes.length - Math.PI / 2
  return {
    x: CENTER + Math.cos(angle) * r,
    y: CENTER + Math.sin(angle) * r,
  }
}

export function Skills() {
  const ref = useRef<SVGSVGElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const dataPoints = axes.map((a, i) => point(i, RADIUS * a.value))
  const dataPath =
    dataPoints.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ') +
    ' Z'

  const rings = [0.25, 0.5, 0.75, 1]

  return (
    <section
      id="competences"
      className="relative mx-auto max-w-7xl px-6 py-28 lg:px-10 lg:py-40"
    >
      <div className="grid items-center gap-16 lg:grid-cols-2">
        <div>
          <SectionLabel>Compétences</SectionLabel>
          <h2 className="mt-6 font-heading text-4xl leading-tight text-foreground text-balance sm:text-5xl">
            Un équilibre entre analyse et création
          </h2>
          <p className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground">
            Mon profil se construit à l&apos;intersection de la sensibilité
            créative et de la rigueur analytique — deux forces complémentaires
            au service de la stratégie.
          </p>

          <div className="mt-10">
            <p className="text-xs font-medium uppercase tracking-luxe text-gold">
              Soft skills
            </p>
            <div className="mt-4 flex flex-wrap gap-2.5">
              {softSkills.map((s, i) => (
                <Reveal key={s} delay={i * 0.04}>
                  <span className="rounded-full border border-border/60 bg-card/40 px-4 py-2 text-sm text-foreground/80">
                    {s}
                  </span>
                </Reveal>
              ))}
            </div>
          </div>
        </div>

        <Reveal className="flex justify-center">
          <svg
            ref={ref}
            viewBox={`0 0 ${SIZE} ${SIZE}`}
            className="w-full max-w-md"
            role="img"
            aria-label="Radar des compétences"
          >
            {/* rings */}
            {rings.map((r, ri) => (
              <polygon
                key={ri}
                points={axes
                  .map((_, i) => {
                    const p = point(i, RADIUS * r)
                    return `${p.x},${p.y}`
                  })
                  .join(' ')}
                fill="none"
                stroke="oklch(0.32 0.008 70 / 0.5)"
                strokeWidth="1"
              />
            ))}

            {/* spokes */}
            {axes.map((_, i) => {
              const p = point(i, RADIUS)
              return (
                <line
                  key={i}
                  x1={CENTER}
                  y1={CENTER}
                  x2={p.x}
                  y2={p.y}
                  stroke="oklch(0.32 0.008 70 / 0.45)"
                  strokeWidth="1"
                />
              )
            })}

            {/* data area */}
            <motion.path
              d={dataPath}
              fill="oklch(0.78 0.09 78 / 0.18)"
              stroke="oklch(0.78 0.09 78)"
              strokeWidth="2"
              initial={{ opacity: 0, scale: 0.4 }}
              animate={
                inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.4 }
              }
              transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
              style={{ transformOrigin: `${CENTER}px ${CENTER}px` }}
            />

            {/* data dots + labels */}
            {axes.map((a, i) => {
              const dp = dataPoints[i]
              const lp = point(i, RADIUS + 26)
              return (
                <g key={a.label}>
                  <motion.circle
                    cx={dp.x}
                    cy={dp.y}
                    r="3.5"
                    fill="oklch(0.85 0.035 75)"
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ delay: 0.6 + i * 0.06 }}
                  />
                  <text
                    x={lp.x}
                    y={lp.y}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="fill-[oklch(0.66_0.01_70)] font-sans text-[9px]"
                  >
                    {a.label}
                  </text>
                </g>
              )
            })}
          </svg>
        </Reveal>
      </div>
    </section>
  )
}
