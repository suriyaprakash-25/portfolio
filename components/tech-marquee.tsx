"use client"

import { useEffect, useRef } from "react"
import { skillGroups } from "@/lib/data/career"
import { cn } from "@/lib/utils"

/**
 * Endless running ticker of the tools I use. Pauses on hover, pauses while
 * off-screen (so it costs nothing until you see it), static for reduced motion.
 */
export function TechMarquee({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const all = skillGroups.filter((g) => g.title !== "CS Core").flatMap((g) => g.items)
  const half = Math.ceil(all.length / 2)
  const rows = [all.slice(0, half), all.slice(half)]

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => el.toggleAttribute("data-playing", e.isIntersecting))
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      aria-label={`Tools I use: ${all.join(", ")}`}
      role="img"
      className={cn(
        "marquee relative flex flex-col gap-3 overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)]",
        className,
      )}
    >
      {rows.map((row, r) => (
        <div key={r} className={cn("marquee-track flex w-max gap-3", r === 1 && "marquee-reverse")} aria-hidden>
          {[...row, ...row].map((item, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-border bg-card/70 px-4 py-1.5 font-mono text-xs text-muted-foreground transition-colors hover:border-accent/60 hover:text-accent"
            >
              <span className="h-1 w-1 rounded-full bg-accent" />
              {item}
            </span>
          ))}
        </div>
      ))}
    </div>
  )
}
