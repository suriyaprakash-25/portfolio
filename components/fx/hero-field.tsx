"use client"

import { useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

/**
 * Interactive dot field behind the hero.
 * Dots brighten and drift away from the cursor; clicking sends a ripple
 * through the field ("what happens if I click here?"). With no pointer
 * activity, an ambient pulse ripples on its own.
 * Pauses off-screen / in background tabs; static for reduced motion.
 */
export function HeroField({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas?.getContext("2d")
    if (!canvas || !ctx) return
    const host = canvas.parentElement ?? canvas

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const GAP = 26
    const RADIUS = 170
    const RIPPLE_SPEED = 0.5 // px per ms
    const RIPPLE_LIFE = 2400

    let w = 0
    let h = 0
    let dots: { x: number; y: number }[] = []
    let color = "#38bdf8"
    let pointer = { x: -9999, y: -9999, tx: -9999, ty: -9999, active: false }
    let ripples: { x: number; y: number; t: number }[] = []
    let lastActivity = performance.now()
    let lastAmbient = 0
    let raf = 0
    let running = false

    const readColor = () => {
      const v = getComputedStyle(document.documentElement).getPropertyValue("--accent").trim()
      ctx.fillStyle = "#000001"
      ctx.fillStyle = v
      color = v && ctx.fillStyle !== "#000001" ? v : "#38bdf8"
    }

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const r = canvas.getBoundingClientRect()
      w = r.width
      h = r.height
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      dots = []
      const ox = (w % GAP) / 2
      const oy = (h % GAP) / 2
      for (let y = oy; y < h; y += GAP) for (let x = ox; x < w; x += GAP) dots.push({ x, y })
      if (!running) draw(performance.now())
    }

    const draw = (now: number) => {
      ctx.clearRect(0, 0, w, h)
      pointer.x += (pointer.tx - pointer.x) * 0.14
      pointer.y += (pointer.ty - pointer.y) * 0.14
      ripples = ripples.filter((r) => now - r.t < RIPPLE_LIFE)
      ctx.fillStyle = color

      for (const d of dots) {
        let intensity = 0
        let ox = 0
        let oy = 0
        if (pointer.active) {
          const dx = d.x - pointer.x
          const dy = d.y - pointer.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < RADIUS) {
            const k = 1 - dist / RADIUS
            intensity = k * k
            const push = intensity * 9
            ox = (dx / (dist || 1)) * push
            oy = (dy / (dist || 1)) * push
          }
        }
        for (const r of ripples) {
          const age = now - r.t
          const dist = Math.hypot(d.x - r.x, d.y - r.y)
          const ring = Math.abs(dist - age * RIPPLE_SPEED)
          if (ring < 36) intensity += (1 - ring / 36) * (1 - age / RIPPLE_LIFE) * 0.9
        }
        intensity = Math.min(intensity, 1)
        ctx.globalAlpha = 0.13 + intensity * 0.75
        const size = 1 + intensity * 1.8
        ctx.beginPath()
        ctx.arc(d.x + ox, d.y + oy, size, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.globalAlpha = 1
    }

    const loop = (now: number) => {
      // ambient pulse when nobody is interacting
      if (now - lastActivity > 3500 && now - lastAmbient > 4200) {
        lastAmbient = now
        ripples.push({ x: w * (0.15 + Math.random() * 0.7), y: h * (0.2 + Math.random() * 0.5), t: now })
      }
      draw(now)
      raf = requestAnimationFrame(loop)
    }

    const start = () => {
      if (running || reduced || document.hidden) return
      running = true
      raf = requestAnimationFrame(loop)
    }
    const stop = () => {
      running = false
      cancelAnimationFrame(raf)
    }

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect()
      pointer.tx = e.clientX - r.left
      pointer.ty = e.clientY - r.top
      if (!pointer.active) {
        pointer.x = pointer.tx
        pointer.y = pointer.ty
      }
      pointer.active = e.pointerType === "mouse" || e.pointerType === "pen"
      lastActivity = performance.now()
    }
    const onLeave = () => {
      pointer.active = false
    }
    const onDown = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect()
      ripples.push({ x: e.clientX - r.left, y: e.clientY - r.top, t: performance.now() })
      lastActivity = performance.now()
    }

    readColor()
    resize()

    const ro = new ResizeObserver(resize)
    ro.observe(canvas)
    const io = new IntersectionObserver(([entry]) => (entry.isIntersecting ? start() : stop()))
    io.observe(canvas)
    const mo = new MutationObserver(() => {
      readColor()
      if (!running) draw(performance.now())
    })
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] })
    const onVisibility = () => (document.hidden ? stop() : start())
    document.addEventListener("visibilitychange", onVisibility)

    if (!reduced) {
      host.addEventListener("pointermove", onMove, { passive: true })
      host.addEventListener("pointerleave", onLeave)
      host.addEventListener("pointerdown", onDown)
    }

    return () => {
      stop()
      ro.disconnect()
      io.disconnect()
      mo.disconnect()
      document.removeEventListener("visibilitychange", onVisibility)
      host.removeEventListener("pointermove", onMove)
      host.removeEventListener("pointerleave", onLeave)
      host.removeEventListener("pointerdown", onDown)
    }
  }, [])

  return (
    <canvas
      ref={ref}
      aria-hidden
      className={cn(
        "pointer-events-none [mask-image:radial-gradient(ellipse_75%_70%_at_50%_35%,black_35%,transparent_100%)]",
        className,
      )}
    />
  )
}
