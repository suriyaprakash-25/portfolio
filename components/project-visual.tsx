import Image from "next/image"
import type { FeaturedProject } from "@/lib/data/projects"
import { cn } from "@/lib/utils"

/**
 * A real screenshot in a browser frame when the project is live;
 * otherwise its architecture drawn as a pipeline (honest, no fake UI).
 */
export function ProjectVisual({
  project,
  priority,
  className,
}: {
  project: FeaturedProject
  priority?: boolean
  className?: string
}) {
  const host = project.links.find((l) => l.kind === "live")?.href.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "")

  return (
    <div className={cn("overflow-hidden rounded-2xl border border-border bg-card shadow-xl shadow-black/5", className)}>
      <div className="flex items-center gap-2 border-b border-border bg-muted/60 px-4 py-2.5">
        <span className="flex gap-1.5" aria-hidden>
          <span className="h-2.5 w-2.5 rounded-full bg-foreground/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-foreground/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-foreground/15" />
        </span>
        <span className="mx-auto truncate rounded-md bg-background/70 px-3 py-0.5 font-mono text-[11px] text-subtle-foreground">
          {host ?? `${project.slug} — system architecture`}
        </span>
      </div>

      {project.image ? (
        <div className="relative aspect-[16/10] bg-muted">
          <Image
            src={project.image}
            alt={`Screenshot of ${project.name}`}
            fill
            priority={priority}
            sizes="(min-width: 1024px) 640px, 100vw"
            className="object-cover object-top"
          />
        </div>
      ) : (
        <ArchitectureDiagram steps={project.architecture} metrics={project.metrics} />
      )}
    </div>
  )
}

function ArchitectureDiagram({ steps, metrics }: { steps: string[]; metrics: FeaturedProject["metrics"] }) {
  return (
    <div className="relative flex aspect-[16/10] flex-col justify-center gap-6 p-6 sm:p-10">
      <div className="bg-grid absolute inset-0 opacity-70" aria-hidden />
      <ol className="relative flex flex-col gap-2 sm:gap-2.5" aria-label="System architecture">
        {steps.map((step, i) => (
          <li key={step} className="flex items-center gap-3">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-accent/40 bg-accent-soft font-mono text-[10px] text-accent">
              {i + 1}
            </span>
            <span className="flex-1 rounded-lg border border-border bg-background/80 px-3 py-1.5 font-mono text-xs backdrop-blur sm:py-2 sm:text-sm">
              {step}
            </span>
          </li>
        ))}
      </ol>
      <div className="relative hidden grid-cols-3 gap-2 sm:grid">
        {metrics.map((m) => (
          <div key={m.label} className="rounded-lg border border-border bg-background/80 px-3 py-2 backdrop-blur">
            <div className="text-lg font-semibold text-accent">{m.value}</div>
            <div className="text-[11px] leading-tight text-muted-foreground">{m.label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
