"use client"

import { useEffect, useState } from "react"
import { prefersReducedMotion } from "@/components/fx/events"

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789<>/{}[]#$%&*+="

/** Decodes text from random glyphs, left to right. Server renders the real text. */
export function Scramble({ text, className, delay = 250, duration = 1100 }: {
  text: string
  className?: string
  delay?: number
  duration?: number
}) {
  const [out, setOut] = useState(text)

  useEffect(() => {
    if (prefersReducedMotion()) return
    let raf = 0
    const start = performance.now() + delay
    const tick = (now: number) => {
      const p = Math.max(0, (now - start) / duration)
      const revealed = Math.floor(p * text.length)
      let s = ""
      for (let i = 0; i < text.length; i++) {
        const c = text[i]
        s += i < revealed || c === " " || c === "•" ? c : GLYPHS[(Math.random() * GLYPHS.length) | 0]
      }
      setOut(s)
      if (revealed < text.length) raf = requestAnimationFrame(tick)
      else setOut(text)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [text, delay, duration])

  return (
    <span className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden>{out}</span>
    </span>
  )
}
