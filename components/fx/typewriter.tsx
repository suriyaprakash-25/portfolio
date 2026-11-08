"use client"

import { useEffect, useState } from "react"
import { prefersReducedMotion } from "@/components/fx/events"
import { cn } from "@/lib/utils"

type Role = { text: string; typo?: { after: string; wrong: string } }

/**
 * Types roles one after another with a block cursor.
 * A role with a `typo` gets mistyped, backspaced and fixed — build, break, debug.
 * Server renders the first role fully typed, so it reads fine without JS.
 */
export function Typewriter({ roles, className }: { roles: readonly Role[]; className?: string }) {
  const [text, setText] = useState(roles[0].text)
  const [typing, setTyping] = useState(false)

  useEffect(() => {
    if (prefersReducedMotion() || roles.length < 2) return
    let alive = true
    const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms))
    let cur = roles[0].text

    const put = (s: string) => {
      cur = s
      setText(s)
    }
    const type = async (s: string) => {
      for (const ch of s) {
        if (!alive) return
        put(cur + ch)
        await sleep(55 + Math.random() * 65)
      }
    }
    const erase = async (n: number, speed = 32) => {
      for (let k = 0; k < n && alive; k++) {
        put(cur.slice(0, -1))
        await sleep(speed)
      }
    }

    ;(async () => {
      let i = 0
      await sleep(2600)
      while (alive) {
        setTyping(true)
        await erase(cur.length)
        await sleep(280)
        i = (i + 1) % roles.length
        const role = roles[i]
        if (role.typo) {
          await type(role.typo.after)
          await type(role.typo.wrong)
          await sleep(420)
          await erase(role.typo.wrong.length, 110)
          await sleep(160)
          await type(role.text.slice(role.typo.after.length))
        } else {
          await type(role.text)
        }
        setTyping(false)
        await sleep(2200)
      }
    })()

    return () => {
      alive = false
    }
  }, [roles])

  return (
    <span className={cn("inline-flex items-baseline whitespace-nowrap", className)}>
      <span className="bg-gradient-to-r from-accent via-sky-400 to-violet-400 bg-clip-text pb-[0.08em] text-transparent">
        {text || "​"}
      </span>
      <span
        aria-hidden
        className={cn(
          "ml-[0.08em] inline-block h-[0.82em] w-[0.42em] translate-y-[0.1em] rounded-[2px] bg-accent",
          !typing && "animate-[caret_1s_steps(1)_infinite]",
        )}
      />
    </span>
  )
}
