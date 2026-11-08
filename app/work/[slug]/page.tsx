import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, ArrowRight, ArrowUpRight, Github } from "lucide-react"
import { ProjectVisual } from "@/components/project-visual"
import { Reveal } from "@/components/reveal"
import { Tag } from "@/components/section"
import { featuredProjects, getProject } from "@/lib/data/projects"
import { profile } from "@/lib/data/profile"

type Params = { params: Promise<{ slug: string }> }

export const dynamicParams = false

export function generateStaticParams() {
  return featuredProjects.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const project = getProject((await params).slug)
  if (!project) return {}
  const title = `${project.name} — ${project.subtitle}`
  return {
    title,
    description: project.summary,
    alternates: { canonical: `/work/${project.slug}` },
    openGraph: { title, description: project.summary, url: `/work/${project.slug}` },
  }
}

export default async function CaseStudy({ params }: Params) {
  const { slug } = await params
  const project = getProject(slug)
  if (!project) notFound()

  const index = featuredProjects.findIndex((p) => p.slug === slug)
  const next = featuredProjects[(index + 1) % featuredProjects.length]

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.name,
    headline: project.subtitle,
    description: project.summary,
    url: `${profile.siteUrl}/work/${project.slug}`,
    author: { "@type": "Person", name: profile.name, url: profile.siteUrl },
    keywords: project.stack.join(", "),
  }

  return (
    <article className="px-5 pb-24 pt-28 sm:px-8 sm:pt-36">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="mx-auto max-w-5xl">
        <Link href="/#work" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> All work
        </Link>

        <Reveal className="mt-10">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">Case study · {project.date}</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-6xl">{project.name}</h1>
          <p className="mt-3 text-xl text-muted-foreground sm:text-2xl">{project.subtitle}</p>
        </Reveal>

        <Reveal delay={0.05}>
          <dl className="mt-10 grid gap-6 border-y border-border py-6 sm:grid-cols-3">
            <div>
              <dt className="font-mono text-xs uppercase tracking-wider text-subtle-foreground">Role</dt>
              <dd className="mt-1.5">{project.role}</dd>
            </div>
            <div>
              <dt className="font-mono text-xs uppercase tracking-wider text-subtle-foreground">Timeline</dt>
              <dd className="mt-1.5">{project.date}</dd>
            </div>
            <div>
              <dt className="font-mono text-xs uppercase tracking-wider text-subtle-foreground">Links</dt>
              <dd className="mt-1.5 flex flex-wrap gap-x-4 gap-y-1">
                {project.links.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 font-medium text-accent hover:underline"
                  >
                    {l.kind === "code" ? <Github className="h-4 w-4" /> : <ArrowUpRight className="h-4 w-4" />}
                    {l.label}
                  </a>
                ))}
              </dd>
            </div>
          </dl>
        </Reveal>

        <Reveal delay={0.1} className="mt-12">
          <ProjectVisual project={project} priority />
        </Reveal>

        <div className="mt-16 grid gap-14 lg:grid-cols-12">
          <div className="space-y-14 lg:col-span-8">
            <Block title="Overview">
              <p>{project.summary}</p>
            </Block>
            <Block title="The problem">
              <p>{project.problem}</p>
            </Block>
            <Block title="The approach">
              <p>{project.approach}</p>
            </Block>
            <Block title="What I built">
              <ol className="space-y-6">
                {project.highlights.map((h, i) => (
                  <li key={h.title} className="flex gap-4">
                    <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-accent/40 bg-accent-soft font-mono text-xs text-accent">
                      {i + 1}
                    </span>
                    <div>
                      <h3 className="font-semibold text-foreground">{h.title}</h3>
                      <p className="mt-1">{h.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </Block>
            <Block title="Architecture">
              <ol className="flex flex-wrap items-center gap-2 font-mono text-sm" aria-label="Data flow">
                {project.architecture.map((step, i, arr) => (
                  <li key={step} className="flex items-center gap-2">
                    <span className="rounded-lg border border-border bg-card px-3 py-1.5 text-foreground">{step}</span>
                    {i < arr.length - 1 && <ArrowRight className="h-4 w-4 text-accent" aria-hidden />}
                  </li>
                ))}
              </ol>
            </Block>
          </div>

          <aside className="space-y-8 lg:col-span-4">
            <div className="rounded-2xl border border-border bg-card p-6 lg:sticky lg:top-24">
              <h2 className="font-mono text-xs uppercase tracking-[0.18em] text-subtle-foreground">At a glance</h2>
              <dl className="mt-5 space-y-5">
                {project.metrics.map((m) => (
                  <div key={m.label}>
                    <dt className="sr-only">{m.label}</dt>
                    <dd className="text-3xl font-semibold tracking-tight text-accent">{m.value}</dd>
                    <dd className="text-sm text-muted-foreground">{m.label}</dd>
                  </div>
                ))}
              </dl>
              <h2 className="mt-8 font-mono text-xs uppercase tracking-[0.18em] text-subtle-foreground">Tech stack</h2>
              <ul className="mt-3 flex flex-wrap gap-1.5">
                {project.stack.map((t) => (
                  <li key={t}>
                    <Tag>{t}</Tag>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>

        <Link
          href={`/work/${next.slug}`}
          className="group mt-24 flex items-center justify-between gap-6 rounded-2xl border border-border bg-card p-6 transition-colors hover:border-accent/50 sm:p-8"
        >
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-subtle-foreground">Next case study</p>
            <p className="mt-2 text-2xl font-semibold tracking-tight group-hover:text-accent">{next.name}</p>
            <p className="text-muted-foreground">{next.subtitle}</p>
          </div>
          <ArrowRight className="h-6 w-6 shrink-0 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </article>
  )
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Reveal>
      <section>
        <h2 className="mb-4 text-2xl font-semibold tracking-tight">{title}</h2>
        <div className="space-y-4 text-lg leading-relaxed text-muted-foreground">{children}</div>
      </section>
    </Reveal>
  )
}
