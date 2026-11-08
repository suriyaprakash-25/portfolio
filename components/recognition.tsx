import { ArrowUpRight, Award, Trophy } from "lucide-react"
import { CountUp } from "@/components/fx/count-up"
import { Reveal } from "@/components/reveal"
import { Section } from "@/components/section"
import { achievements, certifications, codingProfiles } from "@/lib/data/career"
import { cn } from "@/lib/utils"

export function Recognition() {
  return (
    <Section id="recognition" index="06" eyebrow="Recognition" title="Hackathons, mentorship and problem solving." className="bg-muted/40" component="Recognition">
      <ul className="grid gap-4 md:grid-cols-3">
        {achievements
          .filter((a) => a.highlight)
          .map((a, i) => (
            <Reveal as="li" key={a.title} delay={i * 0.05} data-spotlight className="group h-full rounded-2xl border border-accent/30 bg-card p-6 shadow-[inset_0_1px_0_0] shadow-accent/30 hover:-translate-y-1 hover:border-accent/60">
                <Trophy className="hop h-5 w-5 text-accent" aria-hidden />
                <p className="mt-4 font-mono text-xs uppercase tracking-wider text-accent">{a.tag}</p>
                <h3 className="mt-1 text-lg font-semibold leading-snug tracking-tight">{a.title}</h3>
                <p className="text-sm text-subtle-foreground">{a.org}</p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{a.detail}</p>
            </Reveal>
          ))}
      </ul>

      <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {achievements
          .filter((a) => !a.highlight)
          .map((a, i) => (
            <Reveal as="li" key={a.title} delay={i * 0.04} data-spotlight className="h-full rounded-2xl border border-border bg-card p-5 hover:-translate-y-1 hover:border-accent/40">
                <p className="font-mono text-xs uppercase tracking-wider text-accent">{a.tag}</p>
                <h3 className="mt-1 font-semibold leading-snug">{a.title}</h3>
                <p className="text-sm text-subtle-foreground">{a.org}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{a.detail}</p>
            </Reveal>
          ))}
      </ul>

      <div className="mt-16 grid gap-12 lg:grid-cols-2">
        <Reveal>
          <h3 className="mb-5 font-mono text-xs uppercase tracking-[0.18em] text-subtle-foreground">Coding profiles</h3>
          <ul className="space-y-3">
            {codingProfiles.map((c) => {
              const inner = (
                <>
                  <div>
                    <p className="font-medium">{c.platform}</p>
                    <p className="text-sm text-muted-foreground">{c.detail}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl font-semibold tracking-tight">
                      <CountUp value={c.stat} />
                    </span>
                    {c.href && <ArrowUpRight className="h-4 w-4 text-subtle-foreground transition-colors group-hover:text-accent" />}
                  </div>
                </>
              )
              const cls = cn(
                "group flex items-center justify-between gap-4 rounded-2xl border border-border bg-card px-5 py-4",
                c.href && "transition-[border-color,translate] duration-300 hover:-translate-y-0.5 hover:border-accent/50",
              )
              return (
                <li key={c.platform}>
                  {c.href ? (
                    <a href={c.href} target="_blank" rel="noopener noreferrer" className={cls}>
                      {inner}
                    </a>
                  ) : (
                    <div className={cls}>{inner}</div>
                  )}
                </li>
              )
            })}
          </ul>
        </Reveal>

        <Reveal delay={0.08}>
          <h3 className="mb-5 font-mono text-xs uppercase tracking-[0.18em] text-subtle-foreground">Certifications</h3>
          <ul className="divide-y divide-border rounded-2xl border border-border bg-card">
            {certifications.map((c) => (
              <li key={c.name} className="group flex items-center gap-4 px-5 py-4 transition-colors hover:bg-accent-soft">
                <Award className="hop h-4 w-4 shrink-0 text-accent" aria-hidden />
                <div className="min-w-0 flex-1 transition-transform duration-300 group-hover:translate-x-1">
                  <p className="text-sm font-medium leading-snug">{c.name}</p>
                  <p className="text-xs text-muted-foreground">{c.issuer}</p>
                </div>
                <span className="font-mono text-xs text-subtle-foreground">{c.year}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </Section>
  )
}
