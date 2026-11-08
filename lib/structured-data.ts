import { profile } from "@/lib/data/profile"
import { education, skillGroups } from "@/lib/data/career"

/** schema.org Person + WebSite graph so search engines know who the site is about. */
export function personStructuredData(photo: string | null) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${profile.siteUrl}/#website`,
        url: profile.siteUrl,
        name: profile.name,
        description: profile.headline,
        author: { "@id": `${profile.siteUrl}/#person` },
      },
      {
        "@type": "Person",
        "@id": `${profile.siteUrl}/#person`,
        name: profile.name,
        url: profile.siteUrl,
        email: `mailto:${profile.email}`,
        image: photo ? `${profile.siteUrl}${photo}` : "https://avatars.githubusercontent.com/u/183195307?v=4",
        jobTitle: "AI & Software Engineer",
        description: profile.intro,
        address: { "@type": "PostalAddress", addressLocality: "Coimbatore", addressCountry: "IN" },
        alumniOf: { "@type": "CollegeOrUniversity", name: education[0].school },
        knowsAbout: skillGroups.flatMap((g) => g.items).slice(0, 30),
        sameAs: [profile.links.github, profile.links.linkedin, profile.links.leetcode],
      },
    ],
  }
}
