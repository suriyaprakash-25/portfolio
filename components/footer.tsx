import { Github, Linkedin, Mail, ExternalLink, Heart } from "lucide-react"

const socialLinks = [
  { label: "GitHub", href: "https://github.com/suriyaprakash-25", handle: "@suriyaprakash-25", icon: Github },
  { label: "LinkedIn", href: "https://linkedin.com/in/suriyaprakash-rm", handle: "/in/suriyaprakash-rm", icon: Linkedin },
  { label: "Email", href: "https://mail.google.com/mail/?view=cm&fs=1&to=suriyaprakashrm25@gmail.com", handle: "suriyaprakashrm25@gmail.com", icon: Mail },
]

const quickLinks = [
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "GitHub Profile", href: "https://github.com/suriyaprakash-25" },
]

export function Footer() {
  return (
    <footer id="connect" className="border-t border-border/30 px-4 sm:px-6 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 sm:gap-16 lg:grid-cols-2">
          {/* Left column */}
          <div className="space-y-6 sm:space-y-8 animate-fade-in-up">
            <div className="space-y-3">
              <p className="font-mono text-xs uppercase tracking-[0.25em] sm:tracking-[0.35em] text-primary">Let's Connect</p>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl text-balance">
                {"Open to "}
                <span className="bg-gradient-to-l from-primary/50 to-accent text-transparent bg-clip-text">
                  opportunities
                </span>
              </h2>
            </div>
            <p className="max-w-md text-base sm:text-lg text-muted-foreground leading-relaxed">
              Looking for internships, freelance projects, and full-time roles. If you have an exciting problem
              to solve — let's talk code.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=suriyaprakashrm25@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                id="contact-email-btn"
                className="group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-xl border border-primary bg-primary/10 px-8 py-4 font-mono text-sm text-primary transition-all duration-500 hover:text-primary-foreground active:scale-[0.98] w-full sm:w-auto"
              >
                <span className="relative z-10">send a message</span>
                <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-1">→</span>
                <span className="absolute inset-0 -translate-x-full bg-primary transition-transform duration-500 group-hover:translate-x-0" />
              </a>
              <a
                href="https://github.com/suriyaprakash-25"
                target="_blank"
                rel="noopener noreferrer"
                id="contact-github-btn"
                className="group inline-flex items-center justify-center gap-3 rounded-xl border border-border px-8 py-4 font-mono text-sm text-muted-foreground transition-all duration-300 hover:border-primary/50 hover:text-primary hover:bg-primary/5 w-full sm:w-auto"
              >
                <Github className="h-4 w-4" />
                <span>View GitHub</span>
              </a>
            </div>

            {/* Quick Links */}
            <div className="flex flex-wrap gap-3 pt-2">
              {quickLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="font-mono text-xs text-muted-foreground hover:text-primary underline-animate transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Right column - Social Links */}
          <div className="space-y-6 lg:text-right animate-fade-in-up stagger-2">
            <p className="font-mono text-xs uppercase tracking-[0.25em] sm:tracking-[0.35em] text-muted-foreground">
              Find me elsewhere
            </p>
            <div className="space-y-2">
              {socialLinks.map((link, index) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between gap-4 rounded-xl border border-transparent p-4 transition-all duration-300 lg:flex-row-reverse active:bg-secondary/30 hover:border-border/50 hover:bg-card/50 glass animate-fade-in"
                  style={{ animationDelay: `${index * 100 + 400}ms` }}
                >
                  <div className="flex items-center gap-3 lg:flex-row-reverse">
                    <link.icon className="h-5 w-5 text-muted-foreground transition-all duration-300 group-hover:text-primary group-hover:scale-110" />
                    <span className="font-mono text-sm font-medium transition-colors group-hover:text-gradient">
                      {link.label}
                    </span>
                    {link.label !== "Email" && (
                      <ExternalLink className="h-3 w-3 text-muted-foreground/50 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-1" />
                    )}
                  </div>
                  <span className="font-mono text-xs text-muted-foreground truncate">{link.handle}</span>
                </a>
              ))}
            </div>

            {/* Availability badge */}
            <div className="flex items-center gap-3 lg:justify-end mt-4">
              <div className="flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
                </span>
                <span className="font-mono text-xs text-primary">Available for opportunities</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 sm:mt-20 flex flex-col items-center justify-between gap-6 border-t border-border/30 pt-8 sm:pt-10 sm:flex-row animate-fade-in stagger-4">
          <div className="flex items-center gap-2.5 font-mono text-xs text-muted-foreground">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            <span>Built with</span>
            <Heart className="h-3.5 w-3.5 text-destructive animate-pulse" />
            <span>& Next.js</span>
          </div>

          <div className="flex items-center gap-4">
            {socialLinks.slice(0, 2).map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
                className="text-muted-foreground/50 transition-all duration-300 hover:text-primary hover:scale-110"
              >
                <link.icon className="h-5 w-5" />
              </a>
            ))}
          </div>

          <p className="font-mono text-xs text-muted-foreground text-center sm:text-right">
            © {new Date().getFullYear()} Suriya Prakash R M — All rights reserved
          </p>
        </div>
      </div>
    </footer>
  )
}
