"use client"

import Link from "next/link"
import { useEffect, useState } from "react"

const roles = [
  "Full Stack Developer",
  "AI/ML Engineer",
  "DevOps Enthusiast",
  "Open Source Builder",
  "Problem Solver",
]

export function HeroSection() {
  const [currentRole, setCurrentRole] = useState(0)
  const [displayText, setDisplayText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const targetText = roles[currentRole]
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          if (displayText.length < targetText.length) {
            setDisplayText(targetText.slice(0, displayText.length + 1))
          } else {
            setTimeout(() => setIsDeleting(true), 2000)
          }
        } else {
          if (displayText.length > 0) {
            setDisplayText(displayText.slice(0, -1))
          } else {
            setIsDeleting(false)
            setCurrentRole((prev) => (prev + 1) % roles.length)
          }
        }
      },
      isDeleting ? 50 : 100,
    )
    return () => clearTimeout(timeout)
  }, [displayText, isDeleting, currentRole])

  return (
    <section className="relative px-4 sm:px-6 pt-28 sm:pt-36 pb-16 sm:pb-24">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20 lg:items-center lg:min-h-[70vh]">
          {/* Left column - Text */}
          <div className="space-y-8 sm:space-y-10">
            <div className="space-y-3 animate-fade-in-up">
              <p className="font-mono text-xs uppercase tracking-[0.25em] sm:tracking-[0.35em] text-primary">
                suriyaprakash-25 — Building the Future, One Commit at a Time
              </p>
              <h1 className="text-4xl font-bold tracking-tight sm:text-4xl lg:text-5xl xl:text-6xl text-balance">
                Hi, I'm <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Suriya</span>
                <br />
                <span
                  className="bg-gradient-to-l from-primary/50 to-accent text-transparent bg-clip-text typing-cursor"
                >
                  {displayText}
                </span>
              </h1>
            </div>

            <p className="max-w-lg text-base sm:text-lg leading-relaxed text-muted-foreground animate-fade-in-up stagger-2">
              CS undergrad passionate about crafting <span className="text-foreground font-medium">scalable web applications</span>,
              {" "}experimenting with <span className="text-foreground font-medium">AI/ML systems</span>, and automating everything
              with <span className="text-foreground font-medium">DevOps</span>. Turning ideas into deployed products — fast.
            </p>

            {/* Stats row */}
            <div className="flex flex-wrap gap-6 animate-fade-in-up stagger-3">
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-primary">17+</span>
                <span className="text-xs text-muted-foreground font-mono uppercase tracking-wider">Repositories</span>
              </div>
              <div className="w-px bg-border" />
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-primary">5+</span>
                <span className="text-xs text-muted-foreground font-mono uppercase tracking-wider">Deployed Apps</span>
              </div>
              <div className="w-px bg-border" />
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-primary">3+</span>
                <span className="text-xs text-muted-foreground font-mono uppercase tracking-wider">Tech Stacks</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up stagger-3">
              <a
                href="#projects"
                className="group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-lg border border-primary bg-primary/10 px-7 py-4 sm:py-3.5 font-mono text-sm text-primary transition-all duration-500 hover:bg-primary hover:text-primary-foreground active:scale-[0.98]"
              >
                <span className="relative z-10">view projects</span>
                <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-1">→</span>
                <span className="absolute inset-0 -translate-x-full bg-primary transition-transform duration-500 group-hover:translate-x-0" />
              </a>
              <a
                href="https://github.com/suriyaprakash-25"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-3 rounded-lg border border-border px-7 py-4 sm:py-3.5 font-mono text-sm text-muted-foreground transition-all duration-300 hover:border-foreground hover:text-foreground hover:bg-secondary/50 active:scale-[0.98]"
              >
                <span>github profile</span>
                <span className="opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
                  →
                </span>
              </a>
            </div>
          </div>

          {/* Right column - Terminal Card */}
          <div className="relative animate-scale-in stagger-4">
            <div className="relative rounded-xl border border-border bg-card/60 glass p-5 sm:p-8 hover-lift">
              {/* Terminal header dots */}
              <div className="absolute top-4 left-4 flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-destructive/60 transition-colors hover:bg-destructive" />
                <div className="h-3 w-3 rounded-full bg-yellow-500/60 transition-colors hover:bg-yellow-500" />
                <div className="h-3 w-3 rounded-full bg-primary/60 transition-colors hover:bg-primary" />
              </div>
              <div className="absolute top-3.5 left-1/2 -translate-x-1/2 bg-background/50 rounded-md px-3 py-1 font-mono text-xs text-muted-foreground">
                terminal://suriya
              </div>

              <pre className="mt-6 overflow-hidden font-mono text-[10px] leading-relaxed text-primary/80 sm:text-xs md:text-sm">
                <span className="sm:hidden">{`┌──────────────────────────────┐
│ SURIYA PRAKASH R M           │
│                              │
│ > role: AI Eng • Full Stack  │
│ > stack: Next.js • Python    │
│ > projects: 8+               │
│ > deploy: Vercel · CI/CD     │
│ > repos: 17                  │
│ > status: Open               │
│                              │
│ > _                          │
└──────────────────────────────┘`}</span>
                <span className="hidden sm:block">{`┌──────────────────────────────────────────────────┐
│                                                  │
│   SURIYA PRAKASH R M                             │
│                                                  │
│   > role: AI Engineer • Full Stack Developer     │
│   > stack: Next.js • Python • Docker • ML        │
│   > projects: 8+                                 │
│   > deploy: Vercel · CI/CD                       │
│   > repos: 17                                    │
│   > status: Open to Opportunities                │
│                                                  │
│   > _                                            │
│                                                  │
└──────────────────────────────────────────────────┘`}</span>
              </pre>
            </div>

            <div className="absolute -right-2 sm:-right-6 -top-2 sm:-top-6 rounded-lg border border-primary/40 bg-primary/15 glass px-3 sm:px-4 py-1.5 font-mono text-[11px] sm:text-xs text-primary animate-float">
              <span className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                Available for hire
              </span>
            </div>
            <div
              className="absolute -bottom-3 sm:-bottom-6 -left-2 sm:-left-6 rounded-lg border border-border bg-card glass px-3 sm:px-4 py-1.5 font-mono text-[11px] sm:text-xs text-muted-foreground animate-float"
              style={{ animationDelay: "1s" }}
            >
              B.E. · AI & Data Science
            </div>

            <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] rounded-full bg-primary/5 blur-3xl" />
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-2 animate-fade-in stagger-6">
        <span className="font-mono text-xs text-muted-foreground">scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-primary/50 to-transparent animate-pulse" />
      </div>
    </section>
  )
}
