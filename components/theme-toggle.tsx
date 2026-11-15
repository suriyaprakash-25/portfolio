"use client"

import { MoonStar, Newspaper } from "lucide-react"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { prefersReducedMotion } from "@/components/fx/events"
import { cn } from "@/lib/utils"

type ViewTransitionDoc = Document & {
  startViewTransition?: (cb: () => void) => { ready: Promise<void> }
}

/**
 * Two editions of the same portfolio:
 *   Midnight — next-themes "dark"  → <html class="dark">
 *   Paper    — next-themes "light" → <html class="paper">
 * Switching turns the page like a sheet of paper (View Transitions API).
 */
export const EDITIONS = { dark: "Midnight", light: "Paper" } as const
const THEME_COLOR = { dark: "#12151b", light: "#f4f4ef" } as const

/** Apply an edition synchronously (used inside view transitions so the snapshot sees it). */
export function applyEdition(next: "dark" | "light") {
  const root = document.documentElement
  root.classList.toggle("dark", next === "dark")
  root.classList.toggle("paper", next === "light")
  root.style.colorScheme = next
}

export function ThemeToggle({ withLabel = false }: { withLabel?: boolean }) {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  const current = resolvedTheme === "light" ? "light" : "dark"
  const next = current === "dark" ? "light" : "dark"

  // Keep the browser chrome colour in step with the edition.
  useEffect(() => {
    if (!mounted) return
    document.querySelectorAll('meta[name="theme-color"]').forEach((m) => m.setAttribute("content", THEME_COLOR[current]))
  }, [current, mounted])

  const toggle = () => {
    const doc = document as ViewTransitionDoc
    if (!doc.startViewTransition || prefersReducedMotion()) return setTheme(next)

    const transition = doc.startViewTransition(() => {
      applyEdition(next)
      setTheme(next)
    })
    // Page turn: the new edition sweeps in from the right on a slanted edge.
    transition.ready.then(() => {
      document.documentElement.animate(
        {
          clipPath: [
            "polygon(110% 0, 110% 0, 110% 100%, 130% 100%)",
            "polygon(-30% 0, 110% 0, 110% 100%, 0% 100%)",
          ],
        },
        { duration: 750, easing: "cubic-bezier(0.65, 0, 0.35, 1)", pseudoElement: "::view-transition-new(root)" },
      )
    })
  }

  const label = mounted ? `Switch to the ${EDITIONS[next]} edition` : "Switch edition"
  const Icon = next === "light" ? Newspaper : MoonStar

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      className={cn(
        "group inline-flex h-9 items-center justify-center gap-2 rounded-full text-muted-foreground transition-colors hover:text-foreground",
        withLabel
          ? "border border-border px-3 font-mono text-[11px] uppercase tracking-wider hover:border-accent hover:text-accent paper:border-[1.5px] paper:border-foreground paper:text-foreground paper:hover:bg-[var(--lime)]"
          : "w-9 hover:bg-muted",
      )}
    >
      {mounted ? (
        <>
          <Icon className="h-4 w-4 transition-transform duration-500 group-hover:-rotate-12" aria-hidden />
          {withLabel && (
            <span aria-hidden>
              {EDITIONS[next]}
            </span>
          )}
        </>
      ) : (
        <span className="h-4 w-4" />
      )}
    </button>
  )
}
