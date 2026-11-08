"use client"

import { useEffect } from "react"

/**
 * One pointer listener for the whole site (cheap, delegated):
 *  - [data-spotlight]  cursor-following glow inside cards
 *  - [data-magnetic]   buttons that lean toward the cursor
 *  - [data-tilt]       subtle 3D tilt on project screenshots
 * Only runs on fine pointers; magnet/tilt are skipped for reduced motion.
 */
export function PointerFx() {
  useEffect(() => {
    console.log("%c$ whoami", "color:#38bdf8;font:600 14px ui-monospace,monospace")
    console.log(
      "%cSuriya Prakash R M — you opened DevTools. Curious. I like that.\nPress Ctrl+K on the page for a terminal, or read the source: https://github.com/suriyaprakash-25/portfolio",
      "font:13px/1.6 ui-monospace,monospace",
    )

    if (!window.matchMedia("(pointer: fine)").matches) return
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    let magnet: HTMLElement | null = null
    let tilt: HTMLElement | null = null
    let last: PointerEvent | null = null
    let raf = 0

    const resetMagnet = () => {
      if (magnet) magnet.style.translate = ""
      magnet = null
    }
    const resetTilt = () => {
      if (tilt) {
        tilt.style.setProperty("--rx", "0deg")
        tilt.style.setProperty("--ry", "0deg")
      }
      tilt = null
    }

    const frame = () => {
      raf = 0
      const e = last
      if (!e) return
      const target = e.target instanceof Element ? e.target : null

      const spot = target?.closest<HTMLElement>("[data-spotlight]")
      if (spot) {
        const r = spot.getBoundingClientRect()
        spot.style.setProperty("--mx", `${e.clientX - r.left}px`)
        spot.style.setProperty("--my", `${e.clientY - r.top}px`)
      }
      if (reduced) return

      const m = target?.closest<HTMLElement>("[data-magnetic]") ?? null
      if (m !== magnet) resetMagnet()
      if (m) {
        magnet = m
        const r = m.getBoundingClientRect()
        const x = e.clientX - (r.left + r.width / 2)
        const y = e.clientY - (r.top + r.height / 2)
        m.style.translate = `${(x * 0.22).toFixed(1)}px ${(y * 0.32).toFixed(1)}px`
      }

      const t = target?.closest<HTMLElement>("[data-tilt]") ?? null
      if (t !== tilt) resetTilt()
      if (t) {
        tilt = t
        const r = t.getBoundingClientRect()
        const px = (e.clientX - r.left) / r.width - 0.5
        const py = (e.clientY - r.top) / r.height - 0.5
        t.style.setProperty("--rx", `${(-py * 5).toFixed(2)}deg`)
        t.style.setProperty("--ry", `${(px * 7).toFixed(2)}deg`)
      }
    }

    const onMove = (e: PointerEvent) => {
      last = e
      if (!raf) raf = requestAnimationFrame(frame)
    }
    const onLeave = () => {
      resetMagnet()
      resetTilt()
    }

    document.addEventListener("pointermove", onMove, { passive: true })
    document.documentElement.addEventListener("pointerleave", onLeave)
    return () => {
      cancelAnimationFrame(raf)
      document.removeEventListener("pointermove", onMove)
      document.documentElement.removeEventListener("pointerleave", onLeave)
    }
  }, [])

  return null
}
