import { ArrowUpRight, FileText, Github, Linkedin, Mail } from "lucide-react"
import { CopyEmail } from "@/components/copy-email"
import { Reveal } from "@/components/reveal"
import { profile } from "@/lib/data/profile"

export function Contact({ resume }: { resume: string | null }) {
  const channels = [
    { label: "GitHub", value: "@suriyaprakash-25", href: profile.links.github, icon: Github },
    { label: "LinkedIn", value: "Suriya Prakash R M", href: profile.links.linkedin, icon: Linkedin },
    { label: "Email", value: profile.email, href: `mailto:${profile.email}`, icon: Mail },
  ]

  return (
    <section id="contact" aria-labelledby="contact-title" className="relative overflow-hidden px-5 py-24 sm:px-8 sm:py-32">
      <div className="glow pointer-events-none absolute bottom-0 left-1/2 -z-10 h-[480px] w-[900px] -translate-x-1/2 translate-y-1/2" aria-hidden />
      <div className="mx-auto max-w-6xl">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-accent">07 — Contact</p>
          <h2 id="contact-title" className="text-4xl font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl">
            Build something meaningful.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">
            I'm always open to interesting conversations, collaborations, projects and opportunities — internships,
            freelance work or a problem worth solving.
          </p>
          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <a
              href={`mailto:${profile.email}?subject=${encodeURIComponent("Hello Suriya")}`}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3.5 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90"
            >
              <Mail className="h-4 w-4" /> Say hello
            </a>
            <CopyEmail email={profile.email} />
            {resume && (
              <a
                href={resume}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-card px-6 py-3.5 text-sm font-medium transition-colors hover:border-accent hover:text-accent"
              >
                <FileText className="h-4 w-4" /> Résumé
              </a>
            )}
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <ul className="mx-auto mt-16 grid max-w-4xl gap-3 sm:grid-cols-3">
            {channels.map((c) => (
              <li key={c.label}>
                <a
                  href={c.href}
                  {...(c.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="group flex items-center gap-4 rounded-2xl border border-border bg-card p-5 transition-colors hover:border-accent/50"
                >
                  <c.icon className="h-5 w-5 shrink-0 text-muted-foreground transition-colors group-hover:text-accent" />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium">{c.label}</p>
                    <p className="truncate text-xs text-muted-foreground">{c.value}</p>
                  </div>
                  <ArrowUpRight className="h-4 w-4 shrink-0 text-subtle-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}
