import type { MetadataRoute } from "next"
import { featuredProjects } from "@/lib/data/projects"
import { profile } from "@/lib/data/profile"

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  return [
    { url: profile.siteUrl, lastModified: now, changeFrequency: "monthly", priority: 1 },
    ...featuredProjects.map((p) => ({
      url: `${profile.siteUrl}/work/${p.slug}`,
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.8,
    })),
  ]
}
