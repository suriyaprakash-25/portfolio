"use client"

import { useRef, useState } from "react"
import { prefersReducedMotion } from "@/components/fx/events"

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"

/** Text that scrambles and re-decodes itself when hovered. */
export function HoverScramble({ text, className }: { text: string; className?: string }) {
  const [out, setOut] = useState(text)
  const raf = useRef(0)

  const run = () => {
    if (prefersReducedMotion()) return
    cancelAnimationFrame(raf.current)
    const start = performance.now()
    const tick = (now: number) => {
      const revealed = Math.floor(((now - start) / 600) * text.length)
      let s = ""
      for (let i = 0; i < text.length; i++) s += i < revealed ? text[i] : GLYPHS[(Math.random() * GLYPHS.length) | 0]
      setOut(s)
      if (revealed < text.length) raf.current = requestAnimationFrame(tick)
      else setOut(text)
    }
    raf.current = requestAnimationFrame(tick)
  }

  return (
    <span className={className} onMouseEnter={run}>
      <span className="sr-only">{text}</span>
      <span aria-hidden>{out}</span>
    </span>
  )
}
