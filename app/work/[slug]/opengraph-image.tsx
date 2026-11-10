import fs from "node:fs"
import path from "node:path"
import { ImageResponse } from "next/og"
import { getProfilePhoto } from "@/lib/assets"
import { featuredProjects, getProject } from "@/lib/data/projects"
import { profile } from "@/lib/data/profile"

export const size = { width: 1200, height: 630 }
export const contentType = "image/png"
export const alt = "Case study by Suriya Prakash R M"

export function generateStaticParams() {
  return featuredProjects.map((p) => ({ slug: p.slug }))
}

/** Per-project share card: what LinkedIn/WhatsApp/X show when a case study link is shared. */
export default async function CaseStudyOgImage({ params }: { params: Promise<{ slug: string }> }) {
  const project = getProject((await params).slug) ?? featuredProjects[0]
  const photo = getProfilePhoto()
  const photoSrc = photo
    ? `data:image/jpeg;base64,${fs.readFileSync(path.join(process.cwd(), "public", photo.replace(/^\//, ""))).toString("base64")}`
    : null

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#12151b",
          backgroundImage: "radial-gradient(circle at 90% 0%, rgba(56,189,248,0.22), transparent 55%)",
          color: "#eef2f7",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 22, letterSpacing: 4, color: "#38bdf8" }}>
          CASE STUDY · {project.date.toUpperCase()}
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 88, fontWeight: 700, letterSpacing: -3, lineHeight: 1 }}>{project.name}</div>
          <div style={{ display: "flex", marginTop: 16, fontSize: 36, color: "#a8b3c4" }}>{project.subtitle}</div>
          <div style={{ display: "flex", gap: 28, marginTop: 40 }}>
            {project.metrics.map((m) => (
              <div
                key={m.label}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  padding: "16px 22px",
                  borderRadius: 16,
                  border: "1px solid rgba(255,255,255,0.12)",
                  background: "rgba(255,255,255,0.03)",
                }}
              >
                <div style={{ display: "flex", fontSize: 36, fontWeight: 700, color: "#38bdf8" }}>{m.value}</div>
                <div style={{ display: "flex", fontSize: 18, color: "#a8b3c4", maxWidth: 260 }}>{m.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          {photoSrc && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={photoSrc} alt="" width={56} height={56} style={{ borderRadius: 9999, border: "2px solid rgba(56,189,248,0.6)" }} />
          )}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", fontSize: 24, fontWeight: 600 }}>{profile.name}</div>
            <div style={{ display: "flex", fontSize: 20, color: "#7d8899" }}>suriyaprakashrm.dev/work/{project.slug}</div>
          </div>
        </div>
      </div>
    ),
    size,
  )
}
