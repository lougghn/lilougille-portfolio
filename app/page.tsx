import { CustomCursor } from '@/components/custom-cursor'
import { AmbientAudio } from '@/components/ambient-audio'
import { SiteNav } from '@/components/site-nav'
import { Hero } from '@/components/sections/hero'
import { About } from '@/components/sections/about'
import { Timeline } from '@/components/sections/timeline'
import { Dashboard } from '@/components/sections/dashboard'
import { Method } from '@/components/sections/method'
import { Experience } from '@/components/sections/experience'
import { Engagements } from '@/components/sections/engagements'
import { Skills } from '@/components/sections/skills'
import { Tools } from '@/components/sections/tools'
import { Languages } from '@/components/sections/languages'
import { Passions } from '@/components/sections/passions'
import { Philosophy } from '@/components/sections/philosophy'
import { Vision } from '@/components/sections/vision'
import { Productions } from '@/components/sections/productions'
import { Contact } from '@/components/sections/contact'
import { Outro } from '@/components/sections/outro'

export default function Page() {
  return (
    <>
      <CustomCursor />
      <AmbientAudio />
      <SiteNav />
      <main className="relative">
        <Hero />
        <About />
        <Timeline />
        <Dashboard />
        <Method />
        <Experience />
        <Engagements />
        <Skills />
        <Tools />
        <Languages />
        <Passions />
        <Philosophy />
        <Vision />
        <Productions />
        <Contact />
        <Outro />
      </main>
    </>
  )
}
