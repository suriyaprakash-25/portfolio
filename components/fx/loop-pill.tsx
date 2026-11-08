"use client"

import { Fragment, useEffect, useState } from "react"
import { prefersReducedMotion } from "@/components/fx/events"
import { profile } from "@/lib/data/profile"
import { cn } from "@/lib/utils"

/** The motto, running as a loop: each stage lights up in turn — and "Break" glitches. */
export function LoopPill({ className }: { className?: string }) {
  const steps = profile.motto
  const [active, setActive] = useState(-1)

  useEffect(() => {
    if (prefersReducedMotion()) return
    let i = 0
    const id = window.setInterval(() => {
      setActive(i)
      i = (i + 1) % steps.length
    }, 1300)
    return () => window.clearInterval(id)
  }, [steps.length])

  return (
    <a
      href="#loop"
      aria-label={`How I build: ${steps.join(", ")}`}
      className={cn(
        "rounded-2xl border border-border bg-card px-3 py-2 text-center font-mono text-[10px] text-muted-foreground shadow-lg transition-colors hover:border-accent/60 sm:rounded-full sm:px-4 sm:text-[11px]",
        className,
      )}
    >
      <span aria-hidden>
        {steps.map((s, i) => (
          <Fragment key={s}>
            <span
              className={cn(
                "transition-colors duration-300",
                i === active && "text-accent",
                i === active && s === "Break" && "glitch text-rose-400",
                i === active && s === "Ship" && "text-emerald-400",
              )}
            >
              {s}
              {s === "Ship" && <span className={cn("transition-opacity", i === active ? "opacity-100" : "opacity-0")}> ✓</span>}
            </span>
            {i < steps.length - 1 && <span className="text-subtle-foreground"> → </span>}
          </Fragment>
        ))}
      </span>
    </a>
  )
}
