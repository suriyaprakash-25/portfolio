import fs from "node:fs"
import path from "node:path"
import { ImageResponse } from "next/og"
import { getProfilePhoto } from "@/lib/assets"
import { profile } from "@/lib/data/profile"

export const alt = `${profile.name} — ${profile.headline}`
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

/** The preview card shown when the site is shared on LinkedIn, WhatsApp, X, etc. */
export default function OpengraphImage() {
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
          alignItems: "center",
          justifyContent: "space-between",
          padding: 72,
          gap: 56,
          background: "#12151b",
          backgroundImage: "radial-gradient(circle at 85% 0%, rgba(56,189,248,0.22), transparent 55%)",
          color: "#eef2f7",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100%", flex: 1 }}>
          <div style={{ display: "flex", fontSize: 22, letterSpacing: 4, color: "#38bdf8" }}>
            {profile.areas.join("  •  ").toUpperCase()}
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", fontSize: 30, color: "#a8b3c4" }}>Hi, I&apos;m</div>
            <div style={{ display: "flex", fontSize: 68, fontWeight: 700, letterSpacing: -2, lineHeight: 1.05 }}>{profile.name}</div>
            <div style={{ display: "flex", marginTop: 20, fontSize: 32, color: "#a8b3c4", lineHeight: 1.3 }}>{profile.headline}</div>
          </div>
          <div style={{ display: "flex", fontSize: 22, color: "#7d8899" }}>suriyaprakashrm.dev</div>
        </div>

        {photoSrc ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={photoSrc}
            alt=""
            width={360}
            height={360}
            style={{ borderRadius: 9999, border: "6px solid rgba(56,189,248,0.55)", objectFit: "cover" }}
          />
        ) : (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 300,
              height: 300,
              borderRadius: 48,
              border: "3px solid rgba(56,189,248,0.5)",
              color: "#38bdf8",
              fontSize: 110,
              fontWeight: 700,
            }}
          >
            {profile.initials}
          </div>
        )}
      </div>
    ),
    size,
  )
}
