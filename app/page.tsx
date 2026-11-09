import { Suspense } from "react"
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
      {/* Each section is its own Suspense boundary so React 19 can hydrate them
          one at a time and yield to the browser in between (no long blocking task). */}
      <Suspense>
        <Hero photo={photo} resume={resume} push={push} />
      </Suspense>
      <Suspense>
        <FeaturedWork />
      </Suspense>
      <MottoBand />
      <Suspense>
        <Lab />
      </Suspense>
      <Suspense>
        <About />
      </Suspense>
      <Suspense>
        <Experience />
      </Suspense>
      <Suspense>
        <Skills />
      </Suspense>
      <Suspense>
        <Recognition />
      </Suspense>
      <Suspense>
        <Contact resume={resume} />
      </Suspense>
    </>
  )
}
