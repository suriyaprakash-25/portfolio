"use client"

import { useRef } from "react"
import { prefersReducedMotion } from "@/components/fx/events"

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"

/** Text that scrambles and re-decodes itself when hovered (direct DOM writes, no re-renders). */
export function HoverScramble({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const raf = useRef(0)

  const run = () => {
    const el = ref.current
    if (!el || prefersReducedMotion()) return
    cancelAnimationFrame(raf.current)
    const start = performance.now()
    const tick = (now: number) => {
      const revealed = Math.floor(((now - start) / 600) * text.length)
      let s = ""
      for (let i = 0; i < text.length; i++) s += i < revealed ? text[i] : GLYPHS[(Math.random() * GLYPHS.length) | 0]
      el.textContent = s
      if (revealed < text.length) raf.current = requestAnimationFrame(tick)
      else el.textContent = text
    }
    raf.current = requestAnimationFrame(tick)
  }

  return (
    <span className={className} onMouseEnter={run}>
      <span className="sr-only">{text}</span>
      <span ref={ref} aria-hidden>
        {text}
      </span>
    </span>
  )
}
