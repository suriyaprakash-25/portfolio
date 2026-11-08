import type { MetadataRoute } from "next"
import { profile } from "@/lib/data/profile"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${profile.name} — Portfolio`,
    short_name: profile.firstName,
    description: profile.headline,
    start_url: "/",
    display: "standalone",
    background_color: "#12151b",
    theme_color: "#12151b",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
      { src: "/apple-icon", sizes: "180x180", type: "image/png" },
    ],
  }
}
