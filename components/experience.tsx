import { GraduationCap } from "lucide-react"
import { Reveal } from "@/components/reveal"
import { Section, Tag } from "@/components/section"
import { education, experience } from "@/lib/data/career"

export function Experience() {
  return (
    <Section id="experience" index="04" eyebrow="Experience" title="Where I've been building." className="bg-muted/40">
      <div className="grid gap-14 lg:grid-cols-12">
        <ol className="relative space-y-10 border-l border-border pl-8 lg:col-span-8">
          {experience.map((job, i) => (
            <Reveal as="li" key={job.org + job.role} delay={i * 0.05} className="relative">
                <span
                  className="absolute -left-[37px] top-1.5 h-3 w-3 rounded-full border-2 border-accent bg-background"
                  aria-hidden
                />
                <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                  <h3 className="text-lg font-semibold tracking-tight">
                    {job.role} <span className="text-accent">· {job.org}</span>
                  </h3>
                  {job.period && <p className="shrink-0 font-mono text-xs text-subtle-foreground">{job.period}</p>}
                </div>
                <p className="mt-1 font-mono text-[11px] uppercase tracking-wider text-subtle-foreground">{job.type}</p>
                <ul className="mt-4 space-y-2.5">
                  {job.points.map((p) => (
                    <li key={p} className="flex gap-3 leading-relaxed text-muted-foreground">
                      <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-muted-foreground/60" aria-hidden />
                      {p}
                    </li>
                  ))}
                </ul>
                {job.stack.length > 0 && (
                  <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Tech used">
                    {job.stack.map((t) => (
                      <li key={t}>
                        <Tag>{t}</Tag>
                      </li>
                    ))}
                  </ul>
                )}
            </Reveal>
          ))}
        </ol>

        <Reveal delay={0.1} className="lg:col-span-4">
          <div className="rounded-2xl border border-border bg-card p-6">
            <h3 className="mb-5 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-subtle-foreground">
              <GraduationCap className="h-4 w-4" /> Education
            </h3>
            <ul className="space-y-5">
              {education.map((e) => (
                <li key={e.degree}>
                  <p className="font-medium leading-snug">{e.degree}</p>
                  <p className="text-sm text-muted-foreground">{e.school}</p>
                  <p className="mt-1 flex justify-between font-mono text-xs text-subtle-foreground">
                    <span className="text-accent">{e.score}</span>
                    <span>{e.period}</span>
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </Section>
  )
}
