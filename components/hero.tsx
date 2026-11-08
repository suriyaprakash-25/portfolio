import { ArrowRight, FileText, Github, Linkedin, Mail, MapPin } from "lucide-react"
import { Avatar } from "@/components/avatar"
import { Reveal } from "@/components/reveal"
import { heroStats, profile } from "@/lib/data/profile"

export function Hero({ photo, resume }: { photo: string | null; resume: string | null }) {
  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden px-5 pb-6 pt-28 sm:px-8 sm:pb-8 sm:pt-36">
      <div className="bg-grid pointer-events-none absolute inset-0 -z-10" aria-hidden />
      <div className="glow pointer-events-none absolute -top-40 left-1/2 -z-10 h-[520px] w-[820px] -translate-x-1/2" aria-hidden />

      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1fr_340px] lg:gap-16">
        <div>
          <Reveal>
            <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1.5 text-xs text-muted-foreground backdrop-blur">
              <span className="relative flex h-2 w-2" aria-hidden>
                <span className="animate-pulse-dot absolute inline-flex h-full w-full rounded-full bg-emerald-500/70" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              {profile.availability}
            </p>
          </Reveal>

          <Reveal delay={0.05}>
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.22em] text-accent sm:text-sm">
              {profile.areas.join(" • ")}
            </p>
            <h1 id="hero-title" className="text-4xl font-semibold leading-[1.08] tracking-tight text-balance sm:text-5xl lg:text-6xl">
              {profile.headline}
            </h1>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">{profile.intro}</p>
            <p className="mt-4 flex items-center gap-1.5 text-sm text-subtle-foreground">
              <MapPin className="h-4 w-4" aria-hidden /> {profile.location}
            </p>
          </Reveal>

          <Reveal delay={0.15} className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href="#work"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-foreground px-6 py-3.5 text-sm font-medium text-background transition-opacity hover:opacity-90"
            >
              See my work
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
            {resume ? (
              <a
                href={resume}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-card/60 px-6 py-3.5 text-sm font-medium transition-colors hover:border-accent hover:text-accent"
              >
                <FileText className="h-4 w-4" /> Download résumé
              </a>
            ) : (
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-card/60 px-6 py-3.5 text-sm font-medium transition-colors hover:border-accent hover:text-accent"
              >
                <Mail className="h-4 w-4" /> Get in touch
              </a>
            )}
            <div className="flex items-center gap-1 sm:ml-2">
              <IconLink href={profile.links.github} label="GitHub">
                <Github className="h-5 w-5" />
              </IconLink>
              <IconLink href={profile.links.linkedin} label="LinkedIn">
                <Linkedin className="h-5 w-5" />
              </IconLink>
              <IconLink href={`mailto:${profile.email}`} label="Email">
                <Mail className="h-5 w-5" />
              </IconLink>
            </div>
          </Reveal>
        </div>

        {/* ── Profile photo (placeholder until public/profile.jpg exists) ── */}
        <Reveal delay={0.1} className="mx-auto w-full max-w-[240px] sm:max-w-[320px] lg:max-w-none">
          <div className="relative">
            <div className="absolute -inset-3 -z-10 rounded-[2rem] bg-gradient-to-br from-accent/25 via-transparent to-transparent blur-2xl" aria-hidden />
            <Avatar photo={photo} size="hero" priority className="shadow-2xl shadow-black/10 ring-1 ring-border" />
            <div className="mx-auto mt-4 w-fit rounded-2xl border border-border bg-card px-3 py-2 text-center font-mono text-[10px] text-muted-foreground shadow-lg sm:absolute sm:-bottom-4 sm:left-1/2 sm:mt-0 sm:w-max sm:-translate-x-1/2 sm:whitespace-nowrap sm:rounded-full sm:px-4 sm:text-[11px]">
              {profile.motto.join(" → ")}
            </div>
          </div>
        </Reveal>
      </div>

      <Reveal delay={0.2} className="mx-auto mt-20 max-w-6xl">
        <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border lg:grid-cols-4">
          {heroStats.map((s) => (
            <div key={s.label} className="bg-card/80 p-5 backdrop-blur sm:p-6">
              <dt className="sr-only">{s.label}</dt>
              <dd className="text-2xl font-semibold tracking-tight sm:text-3xl">{s.value}</dd>
              <dd className="mt-1 text-xs text-muted-foreground sm:text-sm">{s.label}</dd>
            </div>
          ))}
        </dl>
      </Reveal>
    </section>
  )
}

function IconLink({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  const external = href.startsWith("http")
  return (
    <a
      href={href}
      aria-label={label}
      title={label}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="inline-flex h-11 w-11 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
    >
      {children}
    </a>
  )
}
