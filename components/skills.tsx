import { Reveal } from "@/components/reveal"
import { Section } from "@/components/section"
import { experience, skillGroups } from "@/lib/data/career"
import { featuredProjects, labProjects } from "@/lib/data/projects"
import { cn } from "@/lib/utils"

const norm = (s: string) =>
  s
    .toLowerCase()
    .replace(/\.js\b/g, "")
    .replace(/[^a-z0-9+#/ ]/g, "")
    .trim()

/** Where each skill shows up — derived from project and experience stacks, so it can never drift. */
function usageFor(skill: string) {
  const sources = [
    ...featuredProjects.map((p) => ({ name: p.name, stack: p.stack })),
    ...labProjects.map((p) => ({ name: p.name, stack: p.stack })),
    ...experience.filter((e) => e.stack.length).map((e) => ({ name: e.org, stack: e.stack })),
  ]
  const k = norm(skill)
  return sources
    .filter(({ stack }) =>
      stack.some((item) => {
        const n = norm(item)
        return n === k || (!k.includes(" ") && n.split(" ").includes(k))
      }),
    )
    .map((s) => s.name)
    .filter((n, i, all) => all.indexOf(n) === i)
}

export function Skills() {
  return (
    <Section
      id="skills"
      index="05"
      eyebrow="Skills"
      title="I don't follow a fixed stack — I follow interesting problems."
      description="The tools I reach for most. Hover (or tap) a highlighted skill to see exactly where I've used it."
      component="Skills"
    >
      <div className="divide-y divide-border border-y border-border">
        {skillGroups.map((g, i) => (
          <Reveal key={g.title} delay={i * 0.04}>
            <div className="grid gap-4 py-6 sm:grid-cols-[200px_1fr] sm:gap-8">
              <h3 className="font-mono text-xs uppercase tracking-[0.18em] text-subtle-foreground sm:pt-1.5">{g.title}</h3>
              <ul className="flex flex-wrap gap-2">
                {g.items.map((s) => {
                  const used = usageFor(s)
                  return (
                    <li
                      key={s}
                      tabIndex={used.length ? 0 : undefined}
                      aria-label={used.length ? `${s} — used in ${used.join(", ")}` : undefined}
                      className={cn(
                        "group relative rounded-lg border bg-card px-3 py-1.5 text-sm transition-[color,border-color,translate,box-shadow] duration-300 hover:-translate-y-0.5 hover:text-accent hover:shadow-[0_6px_20px_-8px] hover:shadow-accent/40 focus-visible:-translate-y-0.5",
                        used.length ? "cursor-help border-accent/25 hover:border-accent/70" : "border-border hover:border-accent/50",
                      )}
                    >
                      {s}
                      {used.length > 0 && (
                        <>
                          <span className="ml-1.5 rounded bg-accent-soft px-1 font-mono text-[10px] text-accent" aria-hidden>
                            {used.length}
                          </span>
                          <span
                            role="tooltip"
                            className="pointer-events-none absolute bottom-full left-1/2 z-20 mb-2 w-max max-w-[min(16rem,70vw)] -translate-x-1/2 translate-y-1 rounded-lg border border-border bg-card px-3 py-2 text-left text-xs leading-relaxed text-muted-foreground opacity-0 shadow-xl transition-[opacity,translate] duration-200 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100"
                          >
                            <span className="block font-mono text-[10px] uppercase tracking-wider text-accent">Used in</span>
                            {used.join(" · ")}
                          </span>
                        </>
                      )}
                    </li>
                  )
                })}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
