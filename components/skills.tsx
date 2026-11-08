import { Reveal } from "@/components/reveal"
import { Section } from "@/components/section"
import { skillGroups } from "@/lib/data/career"

export function Skills() {
  return (
    <Section
      id="skills"
      index="05"
      eyebrow="Skills"
      title="I don't follow a fixed stack — I follow interesting problems."
      description="The tools I reach for most, across AI, software engineering and infrastructure."
    >
      <div className="divide-y divide-border border-y border-border">
        {skillGroups.map((g, i) => (
          <Reveal key={g.title} delay={i * 0.04}>
            <div className="grid gap-4 py-6 sm:grid-cols-[200px_1fr] sm:gap-8">
              <h3 className="font-mono text-xs uppercase tracking-[0.18em] text-subtle-foreground sm:pt-1.5">{g.title}</h3>
              <ul className="flex flex-wrap gap-2">
                {g.items.map((s) => (
                  <li
                    key={s}
                    className="rounded-lg border border-border bg-card px-3 py-1.5 text-sm transition-colors hover:border-accent/60 hover:text-accent"
                  >
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
