"use client"

import { FlaskConical } from "lucide-react"
import { emit, EVENTS } from "@/components/fx/events"
import { about } from "@/lib/data/profile"
import { cn } from "@/lib/utils"

/**
 * The signature question as an actual button.
 * Every click runs a different experiment on the page (see <Experiments />).
 */
export function TryButton({ variant = "inline", className }: { variant?: "inline" | "quote"; className?: string }) {
  const run = () => emit(EVENTS.experiment)

  if (variant === "quote") {
    return (
      <button
        type="button"
        onClick={run}
        className={cn(
          "group w-full rounded-r-xl border-l-2 border-accent py-1 pl-5 text-left transition-colors hover:bg-accent-soft",
          className,
        )}
      >
        <span className="flex items-center gap-3 text-2xl font-medium tracking-tight text-foreground">
          {about.question}
          <FlaskConical className="wiggle h-6 w-6 shrink-0 text-accent" aria-hidden />
        </span>
        <span className="mt-1 block font-mono text-xs text-subtle-foreground group-hover:text-accent">
          Go on — click it. Something different happens every time.
        </span>
      </button>
    )
  }

  return (
    <button
      type="button"
      onClick={run}
      className={cn(
        "group inline-flex items-center gap-2.5 rounded-full border border-dashed border-accent/40 px-4 py-2 font-mono text-xs text-muted-foreground transition-colors hover:border-accent hover:bg-accent-soft hover:text-accent",
        className,
      )}
    >
      <FlaskConical className="wiggle h-4 w-4 text-accent" aria-hidden />
      {about.question}
      <span className="rounded border border-border px-1.5 py-0.5 text-[10px] text-subtle-foreground group-hover:border-accent/50 group-hover:text-accent">
        try it
      </span>
    </button>
  )
}
