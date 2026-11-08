import { Play } from "lucide-react"
import { BuildLoop } from "@/components/build-loop"
import { TryButton } from "@/components/fx/try-button"
import { Reveal } from "@/components/reveal"
import { Section } from "@/components/section"
import { about, profile } from "@/lib/data/profile"

export function About() {
  return (
    <Section id="about" index="03" eyebrow="About" title="Building by learning." component="About">
      <div className="grid gap-12 lg:grid-cols-12">
        <Reveal className="space-y-5 text-lg leading-relaxed text-muted-foreground lg:col-span-7">
          {about.paragraphs.map((p) => (
            <p key={p}>
              {p.split("**").map((part, i) =>
                i % 2 === 1 ? (
                  <mark key={i} className="hl rounded-sm px-0.5">
                    {part}
                  </mark>
                ) : (
                  part
                ),
              )}
            </p>
          ))}
          <TryButton variant="quote" />

          <a
            href={profile.links.selfIntro}
            target="_blank"
            rel="noopener noreferrer"
            data-magnetic
            className="group !mt-8 inline-flex items-center gap-3 text-base font-medium text-foreground"
          >
            <span className="relative flex h-10 w-10 items-center justify-center rounded-full bg-accent text-accent-foreground transition-transform group-hover:scale-105">
              <span className="animate-pulse-dot absolute inset-0 rounded-full bg-accent/40" aria-hidden />
              <Play className="relative h-4 w-4 translate-x-px fill-current" />
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

      <div className="mt-24">
        <Reveal className="mb-10 max-w-2xl">
          <h3 className="text-2xl font-semibold tracking-tight sm:text-3xl">How I build — the loop.</h3>
          <p className="mt-3 text-muted-foreground">
            Every project runs through the same loop. Here&apos;s each step, with a real moment from my own work.
          </p>
        </Reveal>
        <BuildLoop />
      </div>
    </Section>
  )
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div data-spotlight className="rounded-2xl border border-border bg-card p-6">
      <h3 className="mb-4 font-mono text-xs uppercase tracking-[0.18em] text-subtle-foreground">{title}</h3>
      {children}
    </div>
  )
}
