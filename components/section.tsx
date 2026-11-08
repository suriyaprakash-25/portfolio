import type { ReactNode } from "react"
import { cn } from "@/lib/utils"
import { Reveal } from "@/components/reveal"

type SectionProps = {
  id: string
  index: string
  eyebrow: string
  title: ReactNode
  description?: ReactNode
  children: ReactNode
  className?: string
}

/** Consistent section shell: numbered eyebrow, heading, optional lede. */
export function Section({ id, index, eyebrow, title, description, children, className }: SectionProps) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className={cn("px-5 py-20 sm:px-8 sm:py-28", className)}>
      <div className="mx-auto max-w-6xl">
        <Reveal className="mb-12 max-w-2xl sm:mb-16">
          <p className="mb-4 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-accent">
            <span>{index}</span>
            <span className="h-px w-8 bg-accent/50" aria-hidden />
            <span>{eyebrow}</span>
          </p>
          <h2 id={`${id}-title`} className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            {title}
          </h2>
          {description && <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">{description}</p>}
        </Reveal>
        {children}
      </div>
    </section>
  )
}

/** Small pill used for tech stacks and tags. */
export function Tag({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-border bg-muted/60 px-2.5 py-0.5 font-mono text-[11px] text-muted-foreground",
        className,
      )}
    >
      {children}
    </span>
  )
}
