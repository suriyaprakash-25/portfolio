"use client"

import { useEffect, useRef } from "react"
import { onIdle } from "@/components/fx/events"
import { cn } from "@/lib/utils"

/**
 * Interactive dot field behind the hero.
 * Dots brighten and drift away from the cursor; clicking sends a ripple
 * through the field. An occasional ambient ripple runs on its own.
 *
 * Performance: the static grid is drawn once to an offscreen layer and blitted;
 * only dots near the cursor / a ripple are redrawn, and the animation loop
 * sleeps completely whenever nothing is moving. Interactivity starts after the
 * page is idle, so it never competes with the first render.
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
    const BASE_ALPHA = 0.13

    let w = 0
    let h = 0
    let dpr = 1
    let xs: Float32Array = new Float32Array(0)
    let ys: Float32Array = new Float32Array(0)
    let color = "#38bdf8"
    const base = document.createElement("canvas")
    const bctx = base.getContext("2d")
    const pointer = { x: -9999, y: -9999, tx: -9999, ty: -9999, active: false }
    let ripples: { x: number; y: number; t: number }[] = []
    let raf = 0
    let running = false
    let visible = true
    let ambient: number | undefined

    const readColor = () => {
      const v = getComputedStyle(document.documentElement).getPropertyValue("--accent").trim()
      ctx.fillStyle = "#000001"
      ctx.fillStyle = v
      color = v && ctx.fillStyle !== "#000001" ? v : "#38bdf8"
    }

    const drawBase = () => {
      if (!bctx) return
      base.width = canvas.width
      base.height = canvas.height
      bctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      bctx.clearRect(0, 0, w, h)
      bctx.globalAlpha = BASE_ALPHA
      bctx.fillStyle = color
      for (let i = 0; i < xs.length; i++) bctx.fillRect(xs[i] - 1, ys[i] - 1, 2, 2)
    }

    const blitBase = () => {
      ctx.setTransform(1, 0, 0, 1, 0, 0)
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.drawImage(base, 0, 0)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      const r = canvas.getBoundingClientRect()
      w = r.width
      h = r.height
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      const ox = (w % GAP) / 2
      const oy = (h % GAP) / 2
      const cols = Math.ceil((w - ox) / GAP)
      const rows = Math.ceil((h - oy) / GAP)
      xs = new Float32Array(cols * rows)
      ys = new Float32Array(cols * rows)
      let k = 0
      for (let y = oy; y < h; y += GAP)
        for (let x = ox; x < w; x += GAP) {
          xs[k] = x
          ys[k++] = y
        }
      xs = xs.subarray(0, k)
      ys = ys.subarray(0, k)
      drawBase()
      blitBase()
    }

    const frame = (now: number) => {
      pointer.x += (pointer.tx - pointer.x) * 0.14
      pointer.y += (pointer.ty - pointer.y) * 0.14
      ripples = ripples.filter((r) => now - r.t < RIPPLE_LIFE)
      blitBase()
      ctx.fillStyle = color

      for (let i = 0; i < xs.length; i++) {
        const x = xs[i]
        const y = ys[i]
        let intensity = 0
        let ox = 0
        let oy = 0
        if (pointer.active) {
          const dx = x - pointer.x
          const dy = y - pointer.y
          if (dx > -RADIUS && dx < RADIUS && dy > -RADIUS && dy < RADIUS) {
            const dist = Math.sqrt(dx * dx + dy * dy)
            if (dist < RADIUS) {
              const k = 1 - dist / RADIUS
              intensity = k * k
              const push = (intensity * 9) / (dist || 1)
              ox = dx * push
              oy = dy * push
            }
          }
        }
        for (let j = 0; j < ripples.length; j++) {
          const r = ripples[j]
          const age = now - r.t
          const ring = Math.abs(Math.hypot(x - r.x, y - r.y) - age * RIPPLE_SPEED)
          if (ring < 36) intensity += (1 - ring / 36) * (1 - age / RIPPLE_LIFE) * 0.9
        }
        if (intensity < 0.02) continue
        if (intensity > 1) intensity = 1
        ctx.globalAlpha = 0.15 + intensity * 0.75
        ctx.beginPath()
        ctx.arc(x + ox, y + oy, 1 + intensity * 1.8, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.globalAlpha = 1

      if (pointer.active || ripples.length) raf = requestAnimationFrame(frame)
      else {
        running = false
        blitBase()
      }
    }

    const wake = () => {
      if (running || reduced || !visible || document.hidden) return
      running = true
      raf = requestAnimationFrame(frame)
    }

    const scheduleAmbient = (delay: number) => {
      window.clearTimeout(ambient)
      ambient = window.setTimeout(() => {
        if (!pointer.active && visible && !document.hidden) {
          ripples.push({ x: w * (0.15 + Math.random() * 0.7), y: h * (0.2 + Math.random() * 0.5), t: performance.now() })
          wake()
        }
        scheduleAmbient(5500 + Math.random() * 2500)
      }, delay)
    }

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse" && e.pointerType !== "pen") return
      const r = canvas.getBoundingClientRect()
      pointer.tx = e.clientX - r.left
      pointer.ty = e.clientY - r.top
      if (!pointer.active) {
        pointer.x = pointer.tx
        pointer.y = pointer.ty
        pointer.active = true
      }
      wake()
    }
    const onLeave = () => {
      pointer.active = false
    }
    const onDown = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect()
      ripples.push({ x: e.clientX - r.left, y: e.clientY - r.top, t: performance.now() })
      wake()
    }

    readColor()
    resize()

    const ro = new ResizeObserver(() => resize())
    ro.observe(canvas)
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      if (visible) wake()
    })
    io.observe(canvas)
    const mo = new MutationObserver(() => {
      readColor()
      drawBase()
      if (!running) blitBase()
    })
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] })

    // Start interactivity once the page is idle — never during the first render.
    let started = false
    let cancelIdle = () => {}
    if (!reduced) {
      cancelIdle = onIdle(() => {
        started = true
        host.addEventListener("pointermove", onMove, { passive: true })
        host.addEventListener("pointerleave", onLeave)
        host.addEventListener("pointerdown", onDown)
        scheduleAmbient(9000)
      }, 3000)
    }

    return () => {
      cancelIdle()
      window.cancelAnimationFrame(raf)
      window.clearTimeout(ambient)
      ro.disconnect()
      io.disconnect()
      mo.disconnect()
      if (started) {
        host.removeEventListener("pointermove", onMove)
        host.removeEventListener("pointerleave", onLeave)
        host.removeEventListener("pointerdown", onDown)
      }
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
