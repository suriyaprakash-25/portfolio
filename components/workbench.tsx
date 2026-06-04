"use client"

const experiences = [
  {
    id: "exp-1",
    role: "Full Stack Developer",
    type: "Project",
    period: "Jan 2026",
    description:
      "Built and deployed CrowdFundX — a full-featured crowdfunding platform using Next.js. Integrated campaign management, contributor flow, and live deployment on Vercel.",
    tech: ["Next.js", "JavaScript", "Vercel", "REST API"],
    icon: "💰",
  },
  {
    id: "exp-2",
    role: "Legal-Tech Developer",
    type: "Project",
    period: "Dec 2025",
    description:
      "Designed and shipped STATUTEK, a legal document discovery tool. Implemented full-text search, tagging, and a responsive UI deployed on Vercel.",
    tech: ["JavaScript", "Next.js", "MongoDB", "Vercel"],
    icon: "⚖️",
  },
  {
    id: "exp-3",
    role: "AI & MCP Engineer",
    type: "Open Source",
    period: "Aug 2025",
    description:
      "Implemented a Model Context Protocol (MCP) server in Python, enabling AI agents to interact with external tools via a standardised protocol interface. Earned 2 GitHub stars.",
    tech: ["Python", "MCP", "AI Agents", "API Design"],
    icon: "🤖",
  },
  {
    id: "exp-4",
    role: "IoT Simulation Developer",
    type: "Project",
    period: "Mar 2026",
    description:
      "Created a Digital Twin dashboard that mirrors real-time IoT device state. Visualised live sensor feeds with an interactive JavaScript-based UI for predictive monitoring.",
    tech: ["JavaScript", "IoT", "WebSocket", "Data Viz"],
    icon: "🔮",
  },
  {
    id: "exp-5",
    role: "DevOps Engineer",
    type: "Project",
    period: "May 2026",
    description:
      "Built a production-grade CI/CD pipeline in Python using GitHub Actions. Automated test, lint, build, and deploy stages with environment-specific configurations.",
    tech: ["Python", "GitHub Actions", "CI/CD", "Docker"],
    icon: "⚙️",
  },
  {
    id: "exp-6",
    role: "MLOps Learner",
    type: "Learning",
    period: "Jun 2026 (ongoing)",
    description:
      "Studying end-to-end MLOps workflows: experiment tracking, feature stores, model serving, and monitoring. Documenting learnings in a public GitHub repository.",
    tech: ["Python", "MLflow", "DVC", "Docker"],
    icon: "🧠",
  },
]

const typeColors: Record<string, string> = {
  Project: "text-emerald-400 border-emerald-400/30 bg-emerald-400/10",
  "Open Source": "text-blue-400 border-blue-400/30 bg-blue-400/10",
  Learning: "text-amber-400 border-amber-400/30 bg-amber-400/10",
}

export function Workbench() {
  return (
    <section id="experience" className="relative px-4 sm:px-6 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="mb-12 sm:mb-16 space-y-4">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-primary animate-fade-in-up">
            04 / Experience
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight animate-fade-in-up stagger-1">
            What I've{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Been Building</span>
          </h2>
          <p className="max-w-2xl text-muted-foreground text-base sm:text-lg animate-fade-in-up stagger-2">
            A timeline of projects, open source contributions, and learning milestones that define my journey.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-border to-transparent hidden sm:block" />

          <div className="space-y-6">
            {experiences.map((exp, i) => (
              <div
                key={exp.id}
                id={exp.id}
                className="group relative sm:pl-16 animate-fade-in-up"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                {/* Timeline dot */}
                <div className="absolute left-3.5 top-6 hidden sm:flex h-5 w-5 items-center justify-center rounded-full border border-primary/50 bg-background transition-all duration-300 group-hover:border-primary group-hover:bg-primary/10 -translate-x-1/2">
                  <div className="h-2 w-2 rounded-full bg-primary group-hover:animate-pulse" />
                </div>

                {/* Card */}
                <div className="rounded-xl border border-border bg-card/60 glass p-5 sm:p-6 transition-all duration-300 hover:border-primary/30 hover-lift">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl" role="img" aria-label={exp.role}>
                        {exp.icon}
                      </span>
                      <div>
                        <h3 className="font-semibold text-base tracking-tight group-hover:text-primary transition-colors">
                          {exp.role}
                        </h3>
                        <span
                          className={`inline-flex items-center rounded-md border px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider mt-0.5 ${
                            typeColors[exp.type] ?? "text-muted-foreground border-border"
                          }`}
                        >
                          {exp.type}
                        </span>
                      </div>
                    </div>
                    <span className="font-mono text-xs text-muted-foreground whitespace-nowrap">{exp.period}</span>
                  </div>

                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">{exp.description}</p>

                  <div className="flex flex-wrap gap-1.5">
                    {exp.tech.map((t) => (
                      <span
                        key={t}
                        className="inline-flex items-center rounded-md border border-border bg-secondary/50 px-2 py-0.5 font-mono text-[10px] text-muted-foreground"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
