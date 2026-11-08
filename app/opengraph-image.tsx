import { ImageResponse } from "next/og"
import { profile } from "@/lib/data/profile"

export const alt = `${profile.name} — ${profile.headline}`
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

/** The preview card shown when the site is shared on LinkedIn, WhatsApp, X, etc. */
export default function OpengraphImage() {
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
          backgroundImage: "radial-gradient(circle at 85% 0%, rgba(56,189,248,0.22), transparent 55%)",
          color: "#eef2f7",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 72,
              height: 72,
              borderRadius: 18,
              border: "2px solid rgba(56,189,248,0.5)",
              color: "#38bdf8",
              fontSize: 30,
              fontWeight: 700,
            }}
          >
            {profile.initials}
          </div>
          <div style={{ display: "flex", fontSize: 24, letterSpacing: 4, color: "#38bdf8" }}>
            {profile.areas.join("  •  ").toUpperCase()}
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 76, fontWeight: 700, letterSpacing: -2 }}>{profile.name}</div>
          <div style={{ display: "flex", marginTop: 18, fontSize: 36, color: "#a8b3c4", lineHeight: 1.3, maxWidth: 980 }}>
            {profile.headline}
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 24, color: "#7d8899" }}>
          <div style={{ display: "flex" }}>{profile.motto.join(" → ")}</div>
          <div style={{ display: "flex" }}>suriyaprakashrm.dev</div>
        </div>
      </div>
    ),
    size,
  )
}
