"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { FlaskConical, X } from "lucide-react"
import { confetti } from "@/components/fx/confetti"
import { emit, EVENTS, prefersReducedMotion, type ExperimentName } from "@/components/fx/events"

const ORDER: ExperimentName[] = ["blueprint", "break", "gravity", "terminal"]

type Toast = { id: number; title: string; body: string; persistent?: boolean }

/** Visible, leaf-most elements in the viewport — the things an experiment can move. */
function visibleLeaves(limit = 45) {
  const vh = window.innerHeight
  const vw = window.innerWidth
  const candidates = Array.from(
    document.querySelectorAll<HTMLElement>("main :is(h1, h2, h3, p, li, a, button, img, dd, blockquote, canvas + div)"),
  ).filter((el) => {
    const r = el.getBoundingClientRect()
    return r.bottom > 0 && r.top < vh && r.width > 0 && r.height > 0 && r.width < vw * 0.92 && r.height < vh * 0.7
  })
  const leaves = candidates.filter((el) => !candidates.some((o) => o !== el && el.contains(o)))
  return leaves.sort(() => Math.random() - 0.5).slice(0, limit)
}

function prepare(el: HTMLElement) {
  if (getComputedStyle(el).display === "inline") el.style.display = "inline-block"
}

function restore(els: HTMLElement[], delay = 0) {
  window.setTimeout(() => {
    for (const el of els) {
      el.style.transition = "translate 0.9s cubic-bezier(0.34, 1.56, 0.64, 1), rotate 0.9s cubic-bezier(0.34, 1.56, 0.64, 1)"
      el.style.transitionDelay = `${Math.random() * 180}ms`
      el.style.translate = ""
      el.style.rotate = ""
    }
    window.setTimeout(() => {
      for (const el of els) {
        el.style.transition = ""
        el.style.transitionDelay = ""
        el.style.display = ""
      }
    }, 1300)
  }, delay)
}

/** Listens for experiment requests and runs them, with a little lab-report toast. */
export function Experiments() {
  const [toast, setToast] = useState<Toast | null>(null)
  const next = useRef(0)
  const busy = useRef(false)
  const timer = useRef<number | undefined>(undefined)

  const show = useCallback((t: Omit<Toast, "id">) => {
    window.clearTimeout(timer.current)
    setToast({ ...t, id: Date.now() })
    if (!t.persistent) timer.current = window.setTimeout(() => setToast(null), 5200)
  }, [])

  const exitBlueprint = useCallback(() => {
    document.documentElement.classList.remove("mode-blueprint")
    setToast(null)
  }, [])

  useEffect(() => {
    const html = document.documentElement

    const blueprint = (note?: string) => {
      html.classList.add("mode-blueprint")
      show({
        title: "Experiment 01 · Blueprint",
        body: note ?? "X-rayed the page. Every dashed box is a component — this is how it's built. Press Esc to exit.",
        persistent: true,
      })
    }

    const breakIt = () => {
      busy.current = true
      const els = visibleLeaves(60)
      els.forEach(prepare)
      html.classList.add("mode-break")
      show({ title: "Experiment 02 · Break", body: "Breaking things on purpose…" })
      let n = 0
      const jitter = window.setInterval(() => {
        for (const el of els) {
          el.style.transition = "none"
          el.style.translate = `${(Math.random() - 0.5) * 28}px ${(Math.random() - 0.5) * 18}px`
          el.style.rotate = `${(Math.random() - 0.5) * 14}deg`
        }
        if (++n > 7) {
          window.clearInterval(jitter)
          html.classList.remove("mode-break")
          restore(els)
          window.setTimeout(() => {
            busy.current = false
            show({ title: "Experiment 02 · Break", body: "Broke it. Rebuilt it in 1.2 seconds. Learned something. That's the loop." })
          }, 900)
        }
      }, 120)
    }

    const gravity = () => {
      busy.current = true
      const els = visibleLeaves(45)
      const vh = window.innerHeight
      for (const el of els) {
        prepare(el)
        const r = el.getBoundingClientRect()
        el.style.transition = "translate 0.85s cubic-bezier(0.55, 0, 1, 0.45), rotate 0.85s ease-in"
        el.style.transitionDelay = `${Math.random() * 350}ms`
        el.style.translate = `0 ${Math.max(0, vh - r.bottom - Math.random() * 10)}px`
        el.style.rotate = `${(Math.random() - 0.5) * 50}deg`
      }
      show({ title: "Experiment 03 · Gravity", body: "Turned gravity on. Everything falls — and lands back where it belongs." })
      restore(els, 2300)
      window.setTimeout(() => (busy.current = false), 3600)
    }

    const run = (name?: ExperimentName) => {
      if (busy.current) return
      html.classList.remove("mode-blueprint")
      const exp = name ?? ORDER[next.current++ % ORDER.length]
      if ((exp === "break" || exp === "gravity") && prefersReducedMotion()) {
        return blueprint("Your device asks for reduced motion, so I skipped the chaos and X-rayed the page instead. Press Esc to exit.")
      }
      if (exp === "ship") {
        confetti()
        return show({ title: "Shipped 🚀", body: "Curiosity → Experiment → Build → Break → Learn → Ship. Every project ends here." })
      }
      if (exp === "blueprint") blueprint()
      else if (exp === "break") breakIt()
      else if (exp === "gravity") gravity()
      else {
        emit(EVENTS.terminal)
        show({ title: "Experiment 04 · Hidden terminal", body: "You found it. Type help — or press Ctrl K any time." })
      }
    }

    const onExperiment = (e: Event) => run((e as CustomEvent<ExperimentName | undefined>).detail)
    // ↑ ↑ ↓ ↓ ← → ← → B A
    const KONAMI = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"]
    let progress = 0
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && html.classList.contains("mode-blueprint")) exitBlueprint()
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key
      progress = key === KONAMI[progress] ? progress + 1 : key === KONAMI[0] ? 1 : 0
      if (progress === KONAMI.length) {
        progress = 0
        confetti()
        show({ title: "Achievement unlocked 🏆", body: "Konami code? You're exactly the kind of curious I like. Let's talk — the contact section is at the bottom." })
      }
    }
    window.addEventListener(EVENTS.experiment, onExperiment)
    window.addEventListener("keydown", onKey)
    return () => {
      window.removeEventListener(EVENTS.experiment, onExperiment)
      window.removeEventListener("keydown", onKey)
    }
  }, [show, exitBlueprint])

  return (
    <div aria-live="polite" className="pointer-events-none fixed inset-x-0 bottom-5 z-[70] px-4">
      {toast && (
        <div
          key={toast.id}
          role="status"
          className="toast-in pointer-events-auto absolute bottom-0 left-1/2 flex w-[min(30rem,calc(100vw-2rem))] items-start gap-3 rounded-2xl border border-accent/40 bg-card/95 p-4 shadow-2xl shadow-black/30 backdrop-blur"
        >
          <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent">
            <FlaskConical className="h-4 w-4" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="font-mono text-xs uppercase tracking-wider text-accent">{toast.title}</p>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{toast.body}</p>
          </div>
          <button
            type="button"
            onClick={toast.persistent ? exitBlueprint : () => setToast(null)}
            aria-label={toast.persistent ? "Exit blueprint mode" : "Dismiss"}
            className="shrink-0 rounded-full p-1 text-subtle-foreground hover:bg-muted hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  )
}
