'use client'

import { useEffect, useRef, useState } from 'react'
import { Volume2, VolumeX } from 'lucide-react'

/**
 * Generative calm/ambient background music using the Web Audio API.
 * No external asset needed. Plays soft, slowly-evolving pad chords.
 * Off by default (browser autoplay policies + user comfort).
 */
export function AmbientAudio() {
  const [playing, setPlaying] = useState(false)
  const [ready, setReady] = useState(false)
  const ctxRef = useRef<AudioContext | null>(null)
  const masterRef = useRef<GainNode | null>(null)
  const nodesRef = useRef<{ stop: () => void }[]>([])
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([])

  useEffect(() => {
    setReady(true)
    return () => {
      stopAll()
      ctxRef.current?.close().catch(() => {})
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function stopAll() {
    timersRef.current.forEach((t) => clearTimeout(t))
    timersRef.current = []
    nodesRef.current.forEach((n) => n.stop())
    nodesRef.current = []
  }

  // Slow, emotional minor ballad progression (power-ballad mood, original voicing):
  // Am — F — C — G — Em — Am  in A minor. Heartfelt but never dissonant.
  const chords = [
    [110.0, 164.81, 220.0, 261.63], // Am   (A E A C)
    [87.31, 174.61, 220.0, 261.63], // F    (F F A C)
    [130.81, 196.0, 261.63, 329.63], // C   (C G C E)
    [98.0, 196.0, 246.94, 293.66], // G     (G G B D)
    [82.41, 164.81, 246.94, 329.63], // Em  (E E B E)
    [110.0, 164.81, 220.0, 329.63], // Am   (A E A E)
  ]
  // Expressive arpeggio notes per chord (A natural-minor scale) for the lead line
  const arps = [
    [440.0, 523.25, 659.25, 523.25], // over Am
    [349.23, 440.0, 523.25, 440.0], // over F
    [523.25, 659.25, 783.99, 659.25], // over C
    [392.0, 493.88, 587.33, 493.88], // over G
    [493.88, 659.25, 587.33, 493.88], // over Em
    [440.0, 659.25, 587.33, 523.25], // over Am
  ]

  // Soft, string/guitar-like pad chord with long overlapping swells
  function playChord(ctx: AudioContext, master: GainNode, freqs: number[], at: number, dur: number) {
    freqs.forEach((f, i) => {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      // triangle for a warm, slightly reedy "string" body; sine for the low root
      osc.type = i === 0 ? 'sine' : 'triangle'
      osc.frequency.value = f
      osc.detune.value = (Math.random() - 0.5) * 4

      const peak = (i === 0 ? 0.07 : 0.038) / 1
      gain.gain.setValueAtTime(0.0001, at)
      gain.gain.linearRampToValueAtTime(peak, at + dur * 0.4) // slow emotional swell
      gain.gain.linearRampToValueAtTime(0.0001, at + dur)

      osc.connect(gain)
      gain.connect(master)
      osc.start(at)
      osc.stop(at + dur + 0.2)
      nodesRef.current.push({ stop: () => { try { osc.stop() } catch {} } })
    })
  }

  // Plucked, expressive lead note (guitar-like: soft attack, singing decay + vibrato)
  function playLead(ctx: AudioContext, master: GainNode, freq: number, at: number, dur: number) {
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.type = 'triangle'
    osc.frequency.value = freq

    // gentle vibrato for emotional expression
    const lfo = ctx.createOscillator()
    const lfoGain = ctx.createGain()
    lfo.frequency.value = 5
    lfoGain.gain.value = 3.2
    lfo.connect(lfoGain)
    lfoGain.connect(osc.frequency)

    gain.gain.setValueAtTime(0.0001, at)
    gain.gain.linearRampToValueAtTime(0.06, at + 0.08)
    gain.gain.exponentialRampToValueAtTime(0.0001, at + dur)

    osc.connect(gain)
    gain.connect(master)
    osc.start(at)
    lfo.start(at)
    osc.stop(at + dur + 0.1)
    lfo.stop(at + dur + 0.1)
    nodesRef.current.push({ stop: () => { try { osc.stop() } catch {} try { lfo.stop() } catch {} } })
  }

  function scheduleLoop(ctx: AudioContext, master: GainNode) {
    let index = 0
    const chordDur = 7 // seconds per chord — slow ballad pace
    const step = () => {
      const now = ctx.currentTime
      const i = index % chords.length
      // overlapping pad so the harmony breathes without gaps
      playChord(ctx, master, chords[i], now, chordDur + 2.5)
      // slow, expressive arpeggio spread across the chord
      const phrase = arps[i]
      phrase.forEach((n, k) => {
        playLead(ctx, master, n, now + 0.6 + k * (chordDur / (phrase.length + 0.5)), 2.4)
      })
      index++
      const t = setTimeout(step, chordDur * 1000)
      timersRef.current.push(t)
    }
    step()
  }

  async function toggle() {
    if (playing) {
      stopAll()
      if (masterRef.current && ctxRef.current) {
        masterRef.current.gain.linearRampToValueAtTime(0.0001, ctxRef.current.currentTime + 0.6)
      }
      setPlaying(false)
      return
    }

    let ctx = ctxRef.current
    if (!ctx) {
      ctx = new (window.AudioContext || (window as any).webkitAudioContext)()
      ctxRef.current = ctx
      const master = ctx.createGain()
      master.gain.value = 0.0001
      // gentle low-pass for warmth (open enough to stay clear, not muffled)
      const filter = ctx.createBiquadFilter()
      filter.type = 'lowpass'
      filter.frequency.value = 2600
      // soft echo for a spacious, calm "reverb" feel
      const delay = ctx.createDelay()
      delay.delayTime.value = 0.45
      const feedback = ctx.createGain()
      feedback.gain.value = 0.28
      const wet = ctx.createGain()
      wet.gain.value = 0.35
      master.connect(filter)
      filter.connect(ctx.destination)
      filter.connect(delay)
      delay.connect(feedback)
      feedback.connect(delay)
      delay.connect(wet)
      wet.connect(ctx.destination)
      masterRef.current = master
    }
    await ctx.resume()
    masterRef.current!.gain.cancelScheduledValues(ctx.currentTime)
    masterRef.current!.gain.setValueAtTime(0.0001, ctx.currentTime)
    masterRef.current!.gain.linearRampToValueAtTime(0.5, ctx.currentTime + 2)
    scheduleLoop(ctx, masterRef.current!)
    setPlaying(true)
  }

  if (!ready) return null

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={playing ? 'Couper la musique d’ambiance' : 'Activer la musique d’ambiance'}
      aria-pressed={playing}
      className="fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-full border border-border/70 bg-card/80 px-4 py-2.5 text-xs font-medium text-foreground shadow-lg shadow-black/30 backdrop-blur-md transition-colors hover:border-gold/60 hover:text-gold"
    >
      <span className="relative flex h-4 w-4 items-center justify-center">
        {playing ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
        {playing && (
          <span className="absolute -inset-1 animate-ping rounded-full border border-gold/40" />
        )}
      </span>
      <span className="hidden sm:inline">{playing ? 'Ambiance' : 'Musique'}</span>
    </button>
  )
}
