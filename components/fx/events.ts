"use client"

import { useEffect, useState } from "react"

/** Custom DOM events that connect buttons, the terminal and the experiments. */
export const EVENTS = {
  experiment: "sp:experiment",
  terminal: "sp:terminal",
} as const

export type ExperimentName = "blueprint" | "break" | "gravity" | "terminal" | "ship"

export function emit(name: string, detail?: unknown) {
  window.dispatchEvent(new CustomEvent(name, { detail }))
}

/** Run `cb` when the browser is idle (falls back to a short timeout). Returns a cancel function. */
export function onIdle(cb: () => void, timeout = 2500): () => void {
  if (typeof window.requestIdleCallback === "function") {
    const id = window.requestIdleCallback(cb, { timeout })
    return () => window.cancelIdleCallback(id)
  }
  const id = setTimeout(cb, 1200)
  return () => clearTimeout(id)
}

export function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
}

export function useReducedMotion() {
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    const update = () => setReduced(mq.matches)
    update()
    mq.addEventListener("change", update)
    return () => mq.removeEventListener("change", update)
  }, [])
  return reduced
}
