import { About } from "@/components/about"
import { Contact } from "@/components/contact"
import { Experience } from "@/components/experience"
import { FeaturedWork } from "@/components/featured-work"
import { Hero } from "@/components/hero"
import { Lab } from "@/components/lab"
import { MottoBand } from "@/components/motto-band"
import { Recognition } from "@/components/recognition"
import { Skills } from "@/components/skills"
import { getProfilePhoto, getResume } from "@/lib/assets"
import { getLatestPush } from "@/lib/github"
import { personStructuredData } from "@/lib/structured-data"

// re-check GitHub activity at most once an hour
export const revalidate = 3600

export default async function Home() {
  const photo = getProfilePhoto()
  const resume = getResume()
  const push = await getLatestPush()

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personStructuredData(photo)) }}
      />
      <Hero photo={photo} resume={resume} push={push} />
      <FeaturedWork />
      <MottoBand />
      <Lab />
      <About />
      <Experience />
      <Skills />
      <Recognition />
      <Contact resume={resume} />
    </>
  )
}
