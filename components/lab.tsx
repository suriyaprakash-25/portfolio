"use client"

import { useState } from "react"
import { ArrowUpRight, Github } from "lucide-react"
import { Section, Tag } from "@/components/section"
import { labProjects, type LabCategory } from "@/lib/data/projects"
import { profile } from "@/lib/data/profile"
import { cn } from "@/lib/utils"

const filters: ("All" | LabCategory)[] = ["All", "AI & ML", "Agents & LLMs", "Full-Stack"]

export function Lab() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("All")
  const shown = filter === "All" ? labProjects : labProjects.filter((p) => p.category === filter)

  return (
    <Section
      id="lab"
      index="02"
      eyebrow="The lab"
      title="Experiments, hackathons and side projects."
      description={
        <>
          Where I answer the question <em className="text-foreground">“what happens if I try this?”</em> — from agentic
          commerce to CAN-bus security. Everything here is open on GitHub.
        </>
      }
      className="bg-muted/40"
    >
      <div role="group" aria-label="Filter projects" className="mb-8 flex flex-wrap gap-2">
        {filters.map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFilter(f)}
            aria-pressed={filter === f}
            className={cn(
              "rounded-full border px-4 py-1.5 text-sm transition-colors",
              filter === f
                ? "border-foreground bg-foreground text-background"
                : "border-border text-muted-foreground hover:border-foreground/40 hover:text-foreground",
            )}
          >
            {f}
          </button>
        ))}
      </div>

      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((p) => {
          const primary = p.links.find((l) => l.kind === "live") ?? p.links[0]
          return (
            <li
              key={p.name}
              className="group relative flex flex-col rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-0.5 hover:border-accent/50 hover:shadow-lg hover:shadow-black/5"
            >
              <div className="mb-4 flex items-start justify-between gap-4">
                <span className="font-mono text-[11px] uppercase tracking-wider text-accent">{p.category}</span>
                <div className="relative z-10 flex items-center gap-1">
                  {p.links.map((l) => (
                    <a
                      key={l.href}
                      href={l.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${p.name} — ${l.label}`}
                      title={l.label}
                      className="inline-flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                    >
                      {l.kind === "code" ? <Github className="h-4 w-4" /> : <ArrowUpRight className="h-4 w-4" />}
                    </a>
                  ))}
                </div>
              </div>
              <h3 className="text-lg font-semibold tracking-tight">
                <a href={primary.href} target="_blank" rel="noopener noreferrer" className="after:absolute after:inset-0 after:rounded-2xl">
                  {p.name}
                </a>
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{p.description}</p>
              <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Tech stack">
                {p.stack.map((t) => (
                  <li key={t}>
                    <Tag>{t}</Tag>
                  </li>
                ))}
              </ul>
            </li>
          )
        })}
      </ul>

      <p className="mt-10 text-center text-sm text-muted-foreground">
        More in progress on{" "}
        <a
          href={profile.links.github}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-foreground underline decoration-accent/50 underline-offset-4 hover:text-accent"
        >
          GitHub
        </a>
        .
      </p>
    </Section>
  )
}
