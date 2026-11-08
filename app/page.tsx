import { About } from "@/components/about"
import { Contact } from "@/components/contact"
import { Experience } from "@/components/experience"
import { FeaturedWork } from "@/components/featured-work"
import { Hero } from "@/components/hero"
import { Lab } from "@/components/lab"
import { Recognition } from "@/components/recognition"
import { Skills } from "@/components/skills"
import { getProfilePhoto, getResume } from "@/lib/assets"
import { personStructuredData } from "@/lib/structured-data"

export default function Home() {
  const photo = getProfilePhoto()
  const resume = getResume()

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personStructuredData(photo)) }}
      />
      <Hero photo={photo} resume={resume} />
      <FeaturedWork />
      <Lab />
      <About />
      <Experience />
      <Skills />
      <Recognition />
      <Contact resume={resume} />
    </>
  )
}
