'use client'

import { useRef, useState } from 'react'

export function TiltPortrait() {
  const ref = useRef<HTMLDivElement>(null)
  const [transform, setTransform] = useState('rotateX(0deg) rotateY(0deg)')
  const [glare, setGlare] = useState({ x: 50, y: 50 })
  const [active, setActive] = useState(false)

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width
    const py = (e.clientY - rect.top) / rect.height
    const rotateY = (px - 0.5) * 22
    const rotateX = (0.5 - py) * 22
    setTransform(`rotateX(${rotateX}deg) rotateY(${rotateY}deg)`)
    setGlare({ x: px * 100, y: py * 100 })
  }

  function handleEnter() {
    setActive(true)
  }

  function handleLeave() {
    setActive(false)
    setTransform('rotateX(0deg) rotateY(0deg)')
    setGlare({ x: 50, y: 50 })
  }

  return (
    <div
      className="flex flex-col items-start gap-6 sm:flex-row sm:items-center"
      style={{ perspective: '1100px' }}
    >
      <div
        ref={ref}
        onMouseMove={handleMove}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        className="group relative h-72 w-56 shrink-0 cursor-pointer transition-transform duration-300 ease-out [transform-style:preserve-3d]"
        style={{ transform }}
      >
        {/* Floating gold frame behind */}
        <span
          aria-hidden
          className="absolute -inset-3 rounded-2xl border border-gold/40"
          style={{ transform: 'translateZ(-40px)' }}
        />
        <span
          aria-hidden
          className="absolute -bottom-4 -right-4 h-24 w-24 rounded-2xl bg-gold/10 blur-2xl"
          style={{ transform: 'translateZ(-60px)' }}
        />

        {/* Photo card */}
        <div
          className="relative h-full w-full overflow-hidden rounded-2xl border border-border/70 shadow-2xl shadow-black/40"
          style={{ transform: 'translateZ(30px)' }}
        >
          <span className="absolute inset-x-0 top-0 z-20 h-px gold-line" />
          <img
            src="/lilou-photo.png"
            alt="Portrait de Lilou Gille"
            className="h-full w-full object-cover object-top grayscale transition-[filter,transform] duration-500 group-hover:scale-[1.04] group-hover:grayscale-0"
          />

          {/* Subtle bottom gradient for text contrast */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-background/70 to-transparent"
          />

          {/* Moving glare / shine */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 mix-blend-overlay transition-opacity duration-300"
            style={{
              opacity: active ? 1 : 0,
              background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,0.45), transparent 45%)`,
            }}
          />
          {/* Gold accent glow */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 transition-opacity duration-300"
            style={{
              opacity: active ? 1 : 0,
              background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(212,175,110,0.28), transparent 55%)`,
            }}
          />
        </div>
      </div>

      <div>
        <p className="font-heading text-2xl text-foreground">Lilou Gille</p>
        <p className="mt-2 max-w-[16rem] text-sm leading-relaxed text-muted-foreground">
          Étudiante en communication · Lille
        </p>
        <span className="mt-3 block h-px w-16 gold-line" />
      </div>
    </div>
  )
}
