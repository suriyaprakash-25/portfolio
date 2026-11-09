"use client"

import { useEffect, useRef } from "react"
import { prefersReducedMotion } from "@/components/fx/events"
import { cn } from "@/lib/utils"

const PATTERN = /^(\D*?)(\d[\d,]*(?:\.\d+)?)(.*)$/

/**
 * Counts a stat up from zero when it scrolls into view.
 * Accepts display strings like "Top 108", "1,100+", "8.5", "~40K", "1.3M+".
 * Non-numeric values ("QR", "Auto") render as-is. Server renders the final value,
 * and frames are written straight to the DOM (no React re-render per frame).
 */
export function CountUp({ value, className, duration = 1500 }: { value: string; className?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const match = value.match(PATTERN)
    const el = ref.current
    if (!match || !el || prefersReducedMotion()) return

    const [, prefix, num, suffix] = match
    const target = parseFloat(num.replace(/,/g, ""))
    const decimals = (num.split(".")[1] ?? "").length
    const grouped = num.includes(",")
    const format = (n: number) =>
      prefix +
      (grouped
        ? n.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals })
        : n.toFixed(decimals)) +
      suffix

    let raf = 0
    // Only reset to zero if it's not already on screen — avoids a visible flash.
    const r = el.getBoundingClientRect()
    const onScreen = r.top < window.innerHeight && r.bottom > 0
    if (!onScreen) el.textContent = format(0)

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        io.disconnect()
        const t0 = performance.now()
        const step = (now: number) => {
          const p = Math.min(1, (now - t0) / duration)
          const eased = p === 1 ? 1 : 1 - Math.pow(2, -10 * p)
          el.textContent = p === 1 ? value : format(target * eased)
          if (p < 1) raf = requestAnimationFrame(step)
        }
        raf = requestAnimationFrame(step)
      },
      { threshold: 0.1 },
    )
    io.observe(el)
    return () => {
      io.disconnect()
      cancelAnimationFrame(raf)
      el.textContent = value
    }
  }, [value, duration])

  return (
    <span className={cn("tabular-nums", className)}>
      <span className="sr-only">{value}</span>
      <span ref={ref} aria-hidden>
        {value}
      </span>
    </span>
  )
}
