import type { CSSProperties, ReactNode } from "react"
import { ArrowRight, FileText, Github, Linkedin, Mail, MapPin } from "lucide-react"
import { Avatar } from "@/components/avatar"
import { CountUp } from "@/components/fx/count-up"
import { GithubPulse } from "@/components/fx/github-pulse"
import { HeroField } from "@/components/fx/hero-field"
import { HoverScramble } from "@/components/fx/hover-scramble"
import { LoopPill } from "@/components/fx/loop-pill"
import { Scramble } from "@/components/fx/scramble"
import { TryButton } from "@/components/fx/try-button"
import { Typewriter } from "@/components/fx/typewriter"
import { TechMarquee } from "@/components/tech-marquee"
import { heroStats, profile } from "@/lib/data/profile"
import { relativeTime, type LatestPush } from "@/lib/github"
import { cn } from "@/lib/utils"

const d = (n: number) => ({ "--d": n }) as CSSProperties

export function Hero({ photo, resume, push }: { photo: string | null; resume: string | null; push: LatestPush | null }) {
  const words = profile.headline.split(" ")
  const underlineFrom = words.length - 2 // "real-world products."

  return (
    <section data-component="Hero" aria-labelledby="hero-title" className="relative overflow-hidden pb-6 pt-28 sm:pb-8 sm:pt-36">
      {/* Interactive dot field — move your cursor, click anywhere */}
      <HeroField className="absolute inset-0 -z-10 h-full w-full" />
      <div className="glow pointer-events-none absolute -top-40 left-1/2 -z-10 h-[520px] w-[820px] -translate-x-1/2" aria-hidden />

      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-[1fr_340px] lg:gap-16">
        <div className="min-w-0">
          <div className="rise mb-7 flex flex-wrap items-center gap-2" style={d(0)}>
            <p className="inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-3 py-1.5 text-xs text-muted-foreground backdrop-blur">
              <span className="relative flex h-2 w-2" aria-hidden>
                <span className="animate-pulse-dot absolute inline-flex h-full w-full rounded-full bg-emerald-500/70" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              {profile.availability}
            </p>
            {push && <GithubPulse push={push} serverLabel={relativeTime(push.at)} />}
          </div>

          <p className="rise mb-4 font-mono text-xs uppercase tracking-[0.22em] text-accent sm:text-sm" style={d(1)}>
            <Scramble text={profile.areas.join(" • ")} delay={350} />
          </p>

          {/* Big hello + typed roles */}
          <h1
            id="hero-title"
            className="text-[clamp(2.4rem,7.4vw,4.6rem)] font-semibold leading-[1.04] tracking-tight"
          >
            <span className="block">
              {["Hi,", "I'm"].map((w, i) => (
                <span key={w}>
                  <span className="word-mask">
                    <span className="word" style={{ "--i": i } as CSSProperties}>
                      {w}
                    </span>
                  </span>{" "}
                </span>
              ))}
              <span className="word-mask">
                <span className="word cursor-default text-accent" style={{ "--i": 2 } as CSSProperties}>
                  <HoverScramble text={profile.firstName} />
                </span>
              </span>
              <span className="sr-only"> Prakash R M — </span>
            </span>
            {/* sized so the longest role (20 chars) always fits on one line, even on a 360px phone */}
            <span className="rise block text-[clamp(1.75rem,8.4vw,4.1rem)]" style={d(4)}>
              <span className="sr-only">{profile.roles.map((r) => r.text).join(", ")}</span>
              <span aria-hidden>
                <Typewriter roles={profile.roles} />
              </span>
            </span>
          </h1>

          {/* GitHub tagline with a hand-drawn underline */}
          <p className="rise mt-6 max-w-2xl text-xl font-medium leading-snug tracking-tight text-foreground/90 sm:text-2xl" style={d(6)}>
            {words.slice(0, underlineFrom).join(" ")}{" "}
            <span className="relative inline-block whitespace-nowrap text-accent">
              {words.slice(underlineFrom).join(" ")}
              <svg
                className="scribble pointer-events-none absolute -bottom-2 left-0 h-2.5 w-full"
                viewBox="0 0 240 14"
                preserveAspectRatio="none"
                aria-hidden
              >
                <path
                  d="M2 9 C 40 3, 90 2, 128 6 S 196 12, 238 4"
                  pathLength={1}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </p>

          <p className="rise mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground" style={d(7)}>
            {profile.introShort}
          </p>
          <p className="rise mt-4 flex items-center gap-1.5 text-sm text-subtle-foreground" style={d(7)}>
            <MapPin className="h-4 w-4" aria-hidden /> {profile.location}
          </p>

          <div className="rise mt-9 flex flex-col gap-3 sm:flex-row sm:items-center" style={d(8)}>
            <a
              href="#work"
              data-magnetic
              className="btn-shine group inline-flex items-center justify-center gap-2 rounded-full bg-foreground px-6 py-3.5 text-sm font-medium text-background"
            >
              See my work
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            {resume ? (
              <a
                href={resume}
                target="_blank"
                rel="noopener noreferrer"
                data-magnetic
                className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-card/60 px-6 py-3.5 text-sm font-medium hover:border-accent hover:text-accent"
              >
                <FileText className="h-4 w-4" /> Download résumé
              </a>
            ) : (
              <a
                href="#contact"
                data-magnetic
                className="group inline-flex items-center justify-center gap-2 rounded-full border border-border bg-card/60 px-6 py-3.5 text-sm font-medium hover:border-accent hover:text-accent"
              >
                <Mail className="h-4 w-4 transition-transform group-hover:-rotate-12" /> Get in touch
              </a>
            )}
            <div className="flex items-center gap-1 sm:ml-2">
              <IconLink href={profile.links.github} label="GitHub" hover="hover:text-foreground">
                <Github className="h-5 w-5" />
              </IconLink>
              <IconLink href={profile.links.linkedin} label="LinkedIn" hover="hover:text-[#0A66C2] dark:hover:text-[#4c9be8]">
                <Linkedin className="h-5 w-5" />
              </IconLink>
              <IconLink href={`mailto:${profile.email}`} label="Email" hover="hover:text-accent">
                <Mail className="h-5 w-5" />
              </IconLink>
            </div>
          </div>

          <div className="rise mt-6" style={d(9)}>
            <TryButton />
          </div>
        </div>

        {/* ── Profile photo (placeholder until public/profile.jpg exists) ── */}
        <div className="rise mx-auto w-full max-w-[240px] sm:max-w-[320px] lg:max-w-none" style={d(4)}>
          <div className="relative">
            <div className="absolute -inset-3 -z-10 rounded-[2rem] bg-gradient-to-br from-accent/25 via-transparent to-transparent blur-2xl" aria-hidden />
            <div data-tilt className="rounded-3xl">
              <Avatar photo={photo} size="hero" priority className="shadow-2xl shadow-black/10 ring-1 ring-border" />
            </div>
            <LoopPill className="mx-auto mt-4 block w-fit sm:absolute sm:-bottom-4 sm:left-1/2 sm:mt-0 sm:w-max sm:-translate-x-1/2 sm:whitespace-nowrap" />
          </div>
        </div>
      </div>

      <div className="rise mx-auto mt-20 max-w-6xl px-5 sm:px-8" style={d(10)}>
        <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border lg:grid-cols-4">
          {heroStats.map((s) => (
            <div key={s.label} data-spotlight className="bg-card/85 p-5 backdrop-blur sm:p-6">
              <dt className="sr-only">{s.label}</dt>
              <dd className="text-2xl font-semibold tracking-tight sm:text-3xl">
                <CountUp value={s.value} />
              </dd>
              <dd className="mt-1 text-xs text-muted-foreground sm:text-sm">{s.label}</dd>
            </div>
          ))}
        </dl>
      </div>

      {/* Running ticker of tools */}
      <TechMarquee className="rise mt-10" />
    </section>
  )
}

function IconLink({ href, label, hover, children }: { href: string; label: string; hover: string; children: ReactNode }) {
  const external = href.startsWith("http")
  return (
    <a
      href={href}
      aria-label={label}
      title={label}
      data-magnetic
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={cn(
        "inline-flex h-11 w-11 items-center justify-center rounded-full text-muted-foreground transition-[color,background-color,scale] hover:scale-110 hover:bg-muted",
        hover,
      )}
    >
      {children}
    </a>
  )
}
