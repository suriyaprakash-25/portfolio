"use client"

import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { ArrowUpRight } from "lucide-react"
import { useReducedMotion } from "@/components/fx/events"
import { buildLoop } from "@/lib/data/profile"
import { cn } from "@/lib/utils"

const STEP_MS = 5500
const N = buildLoop.length

/**
 * "How I build" as a living loop: a comet orbits through eight stages,
 * each backed by a real story from my projects. Auto-plays while in view,
 * pauses on hover/focus, and stops once the visitor takes over.
 */
export function BuildLoop() {
  const reduced = useReducedMotion()
  const [active, setActive] = useState(0)
  const [rotation, setRotation] = useState(0)
  const [inView, setInView] = useState(false)
  const [hovering, setHovering] = useState(false)
  const [manual, setManual] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])

  const autoplay = !reduced && !manual && inView && !hovering

  useEffect(() => {
    const el = rootRef.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.35 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const go = (i: number, fromUser = false) => {
    const target = (i + N) % N
    let delta = (target - active + N) % N
    if (delta > N / 2) delta -= N
    setRotation((r) => r + delta * (360 / N))
    setActive(target)
    if (fromUser) setManual(true)
  }

  const onKeyDown = (e: React.KeyboardEvent) => {
    const keys: Record<string, number> = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }
    if (e.key in keys) {
      e.preventDefault()
      const i = (active + keys[e.key] + N) % N
      go(i, true)
      tabRefs.current[i]?.focus()
    }
  }

  const step = buildLoop[active]
  const isInternal = step.href.startsWith("/")

  return (
    <div
      id="loop"
      ref={rootRef}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      onFocus={() => setHovering(true)}
      onBlur={() => setHovering(false)}
      className={cn("grid items-center gap-10 lg:grid-cols-[minmax(0,420px)_1fr] lg:gap-16", !autoplay && "loop-paused")}
    >
      {/* ── The ring ── */}
      <div className="relative mx-auto aspect-square w-full max-w-[400px]">
        <div className="absolute inset-[15%] rounded-full border border-dashed border-border" aria-hidden />
        <div className="glow absolute inset-[22%] rounded-full opacity-80" aria-hidden />

        {/* comet */}
        <div
          aria-hidden
          className="absolute inset-[15%] transition-transform duration-700 ease-[cubic-bezier(0.65,0,0.35,1)]"
          style={{ transform: `rotate(${rotation}deg)` }}
        >
          <span
            className={cn(
              "absolute -top-[7px] left-1/2 h-3.5 w-3.5 -translate-x-1/2 rounded-full shadow-[0_0_24px_6px] transition-colors",
              step.step === "Break"
                ? "bg-rose-400 shadow-rose-400/50"
                : step.step === "Ship"
                  ? "bg-emerald-400 shadow-emerald-400/50"
                  : "bg-accent shadow-accent/50",
            )}
          />
        </div>

        {/* centre */}
        <div className="absolute inset-[30%] flex flex-col items-center justify-center text-center" aria-hidden>
          <span className="font-mono text-xs text-subtle-foreground">
            {String(active + 1).padStart(2, "0")} / {String(N).padStart(2, "0")}
          </span>
          <span
            key={step.step}
            className={cn(
              "panel-in mt-1 text-2xl font-semibold tracking-tight sm:text-3xl",
              step.step === "Break" && !reduced && "glitch text-rose-400",
              step.step === "Ship" && "text-emerald-400",
            )}
          >
            {step.step}
          </span>
        </div>

        {/* nodes */}
        <div role="tablist" aria-label="How I build" aria-orientation="horizontal" onKeyDown={onKeyDown}>
          {buildLoop.map((s, i) => {
            const angle = (i / N) * Math.PI * 2 - Math.PI / 2
            const r = 35 // % of the box — matches inset-[15%]
            return (
              <button
                key={s.step}
                ref={(el) => {
                  tabRefs.current[i] = el
                }}
                type="button"
                role="tab"
                id={`loop-tab-${i}`}
                aria-selected={i === active}
                aria-controls="loop-panel"
                tabIndex={i === active ? 0 : -1}
                onClick={() => go(i, true)}
                className={cn(
                  "absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full border px-2.5 py-1 font-mono text-[11px] transition-all duration-300 sm:text-xs",
                  i === active
                    ? "scale-110 border-accent bg-accent text-accent-foreground shadow-lg shadow-accent/20"
                    : "border-border bg-card text-muted-foreground hover:border-accent/60 hover:text-foreground",
                )}
                style={{ left: `${50 + r * Math.cos(angle)}%`, top: `${50 + r * Math.sin(angle)}%` }}
              >
                {s.step}
              </button>
            )
          })}
        </div>
      </div>

      {/* ── The story ── */}
      <div
        id="loop-panel"
        role="tabpanel"
        aria-labelledby={`loop-tab-${active}`}
        className="relative overflow-hidden rounded-2xl border border-border bg-card p-6 sm:p-8"
        data-spotlight
      >
        <div key={active} className="panel-in">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
            {String(active + 1).padStart(2, "0")} — {step.step}
          </p>
          <h4 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">{step.line}</h4>
          <p className="mt-2 font-mono text-xs text-subtle-foreground">from {step.project}</p>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{step.story}</p>
          {isInternal ? (
            <Link href={step.href} className="group mt-6 inline-flex items-center gap-1.5 text-sm font-medium hover:text-accent">
              See {step.project === "Live in production" ? "the work" : step.project}
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          ) : (
            <a
              href={step.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-6 inline-flex items-center gap-1.5 text-sm font-medium hover:text-accent"
            >
              See {step.project} on GitHub
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          )}
        </div>

        {/* auto-advance timer; finishing it moves to the next stage */}
        {!reduced && !manual && (
          <div className="absolute inset-x-0 bottom-0 h-0.5 bg-border/60" aria-hidden>
            <div
              key={active}
              className="loop-progress h-full bg-accent"
              style={{ "--loop-ms": `${STEP_MS}ms` } as React.CSSProperties}
              onAnimationEnd={() => go(active + 1)}
            />
          </div>
        )}
        {manual && (
          <p className="mt-6 font-mono text-[11px] text-subtle-foreground">← → to move around the loop</p>
        )}
      </div>
    </div>
  )
}
