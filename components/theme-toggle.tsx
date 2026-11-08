"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { prefersReducedMotion } from "@/components/fx/events"

type ViewTransitionDoc = Document & {
  startViewTransition?: (cb: () => void) => { ready: Promise<void> }
}

/** Theme switch that floods the new theme out from the button in a circle (View Transitions API). */
export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  const isDark = resolvedTheme === "dark"

  const toggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    const next = isDark ? "light" : "dark"
    const doc = document as ViewTransitionDoc
    if (!doc.startViewTransition || prefersReducedMotion()) return setTheme(next)

    const x = e.clientX || window.innerWidth - 40
    const y = e.clientY || 32
    const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y))

    const transition = doc.startViewTransition(() => {
      // apply synchronously so the transition captures the new theme
      const root = document.documentElement
      root.classList.toggle("dark", next === "dark")
      root.classList.toggle("light", next === "light")
      root.style.colorScheme = next
      setTheme(next)
    })
    transition.ready.then(() => {
      document.documentElement.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
        { duration: 650, easing: "cubic-bezier(0.65, 0, 0.35, 1)", pseudoElement: "::view-transition-new(root)" },
      )
    })
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={mounted ? `Switch to ${isDark ? "light" : "dark"} theme` : "Toggle theme"}
      className="group inline-flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
    >
      {mounted ? (
        isDark ? (
          <Sun className="h-4 w-4 transition-transform duration-500 group-hover:rotate-90" />
        ) : (
          <Moon className="h-4 w-4 transition-transform duration-500 group-hover:-rotate-12" />
        )
      ) : (
        <span className="h-4 w-4" />
      )}
    </button>
  )
}
