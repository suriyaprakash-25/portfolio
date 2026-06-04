"use client"

import { useState } from "react"
import { Palette, Server, Bot, Wrench, Zap, User } from "lucide-react"

const skillCategories = [
  {
    id: "frontend",
    icon: Palette,
    title: "Frontend",
    skills: [
      { name: "React / Next.js", level: 90 },
      { name: "JavaScript (ES2022+)", level: 88 },
      { name: "HTML5 / CSS3", level: 92 },
      { name: "Tailwind CSS", level: 85 },
    ],
  },
  {
    id: "backend",
    icon: Server,
    title: "Backend",
    skills: [
      { name: "Node.js / Express", level: 80 },
      { name: "Python / FastAPI", level: 82 },
      { name: "REST API Design", level: 85 },
      { name: "MongoDB / SQL", level: 75 },
    ],
  },
  {
    id: "ai",
    icon: Bot,
    title: "AI / ML",
    skills: [
      { name: "Machine Learning", level: 78 },
      { name: "MLOps Pipelines", level: 72 },
      { name: "Model Context Protocol", level: 70 },
      { name: "Data Analysis", level: 75 },
    ],
  },
  {
    id: "devops",
    icon: Wrench,
    title: "DevOps",
    skills: [
      { name: "GitHub Actions / CI-CD", level: 80 },
      { name: "Docker", level: 70 },
      { name: "Vercel / Cloud Deploy", level: 88 },
      { name: "Git / Version Control", level: 90 },
    ],
  },
]

const tools = [
  "Next.js", "React", "Python", "Node.js", "Docker",
  "GitHub Actions", "Vercel", "MongoDB", "FastAPI",
  "Tailwind CSS", "Git", "MLOps", "REST APIs", "MCP",
]

export function LabNotes() {
  const [activeCategory, setActiveCategory] = useState("frontend")

  const active = skillCategories.find((c) => c.id === activeCategory)!

  return (
    <section id="skills" className="relative px-4 sm:px-6 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="mb-12 sm:mb-16 space-y-4">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-primary animate-fade-in-up">
            03 / Skills
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight animate-fade-in-up stagger-1">
            Tools I{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Work With</span>
          </h2>
          <p className="max-w-2xl text-muted-foreground text-base sm:text-lg animate-fade-in-up stagger-2">
            Full stack by day, MLOps explorer by night. My stack spans frontend to backend, with a growing
            focus on AI/ML and DevOps automation.
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-2">
          {/* Left: Category Tabs + Progress bars */}
          <div className="space-y-6 animate-fade-in-up stagger-2">
            {/* Tabs */}
            <div className="flex flex-wrap gap-2">
              {skillCategories.map((cat) => (
                <button
                  key={cat.id}
                  id={`skill-tab-${cat.id}`}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-mono text-xs uppercase tracking-wider transition-all duration-200 border ${
                    activeCategory === cat.id
                      ? "border-primary bg-primary/15 text-primary"
                      : "border-border text-muted-foreground hover:border-primary/50 hover:text-foreground"
                  }`}
                >
                  <span className="flex items-center"><cat.icon className="w-4 h-4" /></span>
                  {cat.title}
                </button>
              ))}
            </div>

            {/* Skill bars */}
            <div className="rounded-xl border border-border bg-card/60 glass p-6 space-y-5">
              <h3 className="font-mono text-sm text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                <active.icon className="w-4 h-4" /> {active.title}
              </h3>
              {active.skills.map((skill, i) => (
                <div key={skill.name} className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-sm text-foreground">{skill.name}</span>
                    <span className="font-mono text-xs text-primary">{skill.level}%</span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-border overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-primary to-accent transition-all duration-700"
                      style={{
                        width: `${skill.level}%`,
                        animationDelay: `${i * 100}ms`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Tools cloud + About card */}
          <div className="space-y-6 animate-fade-in-up stagger-3">
            {/* Tools Grid */}
            <div className="rounded-xl border border-border bg-card/60 glass p-6">
              <h3 className="font-mono text-xs uppercase tracking-wider text-muted-foreground mb-4 flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-primary" /> Tech Stack at a Glance
              </h3>
              <div className="flex flex-wrap gap-2">
                {tools.map((tool) => (
                  <span
                    key={tool}
                    className="inline-flex items-center rounded-lg border border-primary/20 bg-primary/5 px-3 py-1.5 font-mono text-xs text-primary hover:border-primary/60 hover:bg-primary/15 transition-all duration-200 cursor-default"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            {/* About card */}
            <div className="rounded-xl border border-border bg-card/60 glass p-6 space-y-4">
              <h3 className="font-mono text-xs uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                <User className="w-4 h-4 text-primary" /> About Me
              </h3>
              <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                <p>
                  I'm <span className="text-foreground font-medium">Suriya Prakash R M</span>, a B.E. Artificial Intelligence & Data Science undergraduate passionate about building intelligent software that solves real-world problems.
                </p>
                <p>
                  My experience spans <span className="text-foreground font-medium">full-stack development</span>, machine learning, AI-powered applications, and modern cloud deployment. I've developed solutions ranging from metro operation planning systems and digital twin platforms to healthcare AI and inventory intelligence systems.
                </p>
                <p>
                  I enjoy transforming ideas into scalable products using technologies like <span className="text-foreground font-medium">React, Next.js, Python, Node.js, Docker, and Machine Learning</span>. Currently, I'm exploring MLOps, DevOps, and AI engineering to build production-ready intelligent systems that create measurable impact.
                </p>
              </div>
              <div className="flex flex-wrap gap-2 pt-2">
                {["Open Source", "AI/ML", "DevOps", "Web Dev"].map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center rounded-md border border-border bg-secondary/50 px-2.5 py-1 font-mono text-[10px] text-muted-foreground"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
