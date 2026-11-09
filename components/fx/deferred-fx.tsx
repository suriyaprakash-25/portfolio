"use client"

import dynamic from "next/dynamic"
import { useEffect, useState } from "react"
import { onIdle } from "@/components/fx/events"

// Code-split: none of this is needed for the first paint.
const PointerFx = dynamic(() => import("@/components/fx/pointer-fx").then((m) => m.PointerFx), { ssr: false })
const Experiments = dynamic(() => import("@/components/fx/experiments").then((m) => m.Experiments), { ssr: false })
const Terminal = dynamic(() => import("@/components/fx/terminal").then((m) => m.Terminal), { ssr: false })

/**
 * Mounts the interaction layer (pointer effects, experiments, terminal) once the
 * browser is idle — or immediately on the first keyboard/pointer interaction —
 * so it never competes with the first render.
 */
export function DeferredFx({ resume }: { resume: string | null }) {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    let done = false
    const go = () => {
      if (done) return
      done = true
      setReady(true)
    }
    const cancelIdle = onIdle(go)
    const early = () => go()
    window.addEventListener("keydown", early, { once: true })
    window.addEventListener("pointerdown", early, { once: true })
    return () => {
      cancelIdle()
      window.removeEventListener("keydown", early)
      window.removeEventListener("pointerdown", early)
    }
  }, [])

  if (!ready) return null
  return (
    <>
      <PointerFx />
      <Experiments />
      <Terminal resume={resume} />
    </>
  )
}
