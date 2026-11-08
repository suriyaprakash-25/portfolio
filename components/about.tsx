import { Play } from "lucide-react"
import { Reveal } from "@/components/reveal"
import { Section } from "@/components/section"
import { about, profile } from "@/lib/data/profile"

export function About() {
  return (
    <Section id="about" index="03" eyebrow="About" title="Building by learning.">
      <div className="grid gap-12 lg:grid-cols-12">
        <Reveal className="space-y-5 text-lg leading-relaxed text-muted-foreground lg:col-span-7">
          {about.paragraphs.map((p) => (
            <p key={p}>{p}</p>
          ))}
          <blockquote className="border-l-2 border-accent pl-5 text-2xl font-medium tracking-tight text-foreground">
            {about.question}
          </blockquote>

          <div className="pt-4">
            <p className="mb-3 font-mono text-xs uppercase tracking-[0.18em] text-subtle-foreground">How I build</p>
            <ol className="flex flex-wrap items-center gap-x-2 gap-y-2 font-mono text-sm text-foreground">
              {["Idea", "Explore", "Experiment", "Build", "Break", "Debug", "Learn", "Ship"].map((s, i, arr) => (
                <li key={s} className="flex items-center gap-2">
                  <span className="rounded-md border border-border bg-card px-2 py-1">{s}</span>
                  {i < arr.length - 1 && <span className="text-accent" aria-hidden>→</span>}
                </li>
              ))}
            </ol>
          </div>

          <a
            href={profile.links.selfIntro}
            target="_blank"
            rel="noopener noreferrer"
            className="group !mt-8 inline-flex items-center gap-3 text-base font-medium text-foreground"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-accent text-accent-foreground transition-transform group-hover:scale-105">
              <Play className="h-4 w-4 translate-x-px fill-current" />
            </span>
            Watch my self-introduction
          </a>
        </Reveal>

        <Reveal delay={0.1} className="space-y-6 lg:col-span-5">
          <Card title="Areas I work in">
            <ul className="space-y-2.5">
              {about.areas.map((a) => (
                <li key={a} className="flex gap-3 text-sm">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
                  {a}
                </li>
              ))}
            </ul>
          </Card>
          <Card title="Currently learning">
            <ul className="flex flex-wrap gap-2">
              {about.currentlyLearning.map((a) => (
                <li key={a} className="rounded-full border border-border px-3 py-1 text-sm text-muted-foreground">
                  {a}
                </li>
              ))}
            </ul>
          </Card>
        </Reveal>
      </div>
    </Section>
  )
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6">
      <h3 className="mb-4 font-mono text-xs uppercase tracking-[0.18em] text-subtle-foreground">{title}</h3>
      {children}
    </div>
  )
}
