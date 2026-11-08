import type { CSSProperties, ReactNode } from "react"
import { cn } from "@/lib/utils"

/**
 * Fades content up as it scrolls into view using CSS scroll-driven animations.
 * Content is visible by default — no JavaScript, never hidden from crawlers,
 * and skipped entirely for reduced-motion users (see `.reveal` in globals.css).
 */
export function Reveal({
  children,
  className,
  delay = 0,
  as: Tag = "div",
}: {
  children: ReactNode
  className?: string
  delay?: number
  as?: "div" | "li"
}) {
  const style = delay ? ({ "--reveal-delay": `${Math.round(delay * 100)}px` } as CSSProperties) : undefined
  return (
    <Tag className={cn("reveal", className)} style={style}>
      {children}
    </Tag>
  )
}
