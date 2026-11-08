import Link from "next/link"
import { ArrowRight, ArrowUpRight, Github } from "lucide-react"
import { ProjectVisual } from "@/components/project-visual"
import { Reveal } from "@/components/reveal"
import { Section, Tag } from "@/components/section"
import { featuredProjects } from "@/lib/data/projects"
import { cn } from "@/lib/utils"

export function FeaturedWork() {
  return (
    <Section
      id="work"
      index="01"
      eyebrow="Selected work"
      title="Products I've designed, built and shipped."
      description="Three projects I'm proudest of — each one started with a real problem. Open a case study for the problem, the approach and what I built."
    >
      <div className="flex flex-col gap-20 sm:gap-28">
        {featuredProjects.map((project, i) => (
          <Reveal key={project.slug}>
            <article className="grid items-center gap-8 lg:grid-cols-12 lg:gap-12">
              <Link
                href={`/work/${project.slug}`}
                className={cn("group block lg:col-span-7", i % 2 === 1 && "lg:order-2")}
                aria-label={`Read the ${project.name} case study`}
                tabIndex={-1}
              >
                <ProjectVisual
                  project={project}
                  className="transition-transform duration-500 group-hover:-translate-y-1 group-hover:shadow-2xl"
                />
              </Link>

              <div className="lg:col-span-5">
                <p className="font-mono text-xs uppercase tracking-[0.18em] text-subtle-foreground">
                  {project.date} · {project.role}
                </p>
                <h3 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
                  <Link href={`/work/${project.slug}`} className="hover:text-accent">
                    {project.name}
                  </Link>
                </h3>
                <p className="mt-1 text-accent">{project.subtitle}</p>
                <p className="mt-4 leading-relaxed text-muted-foreground">{project.summary}</p>

                <dl className="mt-6 grid grid-cols-3 gap-3 border-y border-border py-4">
                  {project.metrics.map((m) => (
                    <div key={m.label}>
                      <dt className="sr-only">{m.label}</dt>
                      <dd className="text-lg font-semibold">{m.value}</dd>
                      <dd className="text-xs leading-snug text-muted-foreground">{m.label}</dd>
                    </div>
                  ))}
                </dl>

                <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Tech stack">
                  {project.stack.slice(0, 6).map((t) => (
                    <li key={t}>
                      <Tag>{t}</Tag>
                    </li>
                  ))}
                </ul>

                <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm font-medium">
                  <Link href={`/work/${project.slug}`} className="group inline-flex items-center gap-1.5 text-foreground hover:text-accent">
                    Read case study
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                  {project.links.map((l) => (
                    <a
                      key={l.href}
                      href={l.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-foreground"
                    >
                      {l.kind === "code" ? <Github className="h-4 w-4" /> : <ArrowUpRight className="h-4 w-4" />}
                      {l.label}
                    </a>
                  ))}
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
