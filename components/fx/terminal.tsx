"use client"

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react"
import { useRouter } from "next/navigation"
import { useTheme } from "next-themes"
import { emit, EVENTS, type ExperimentName } from "@/components/fx/events"
import { achievements, experience, skillGroups } from "@/lib/data/career"
import { about, buildLoop, profile } from "@/lib/data/profile"
import { featuredProjects, labProjects } from "@/lib/data/projects"

type Line = { id: number; kind: "in" | "out"; body: ReactNode }

const COMMANDS: Record<string, string> = {
  help: "list commands",
  whoami: "who is this guy?",
  about: "the short story",
  ls: "list projects",
  open: "open <project>  — e.g. open driveportz",
  loop: "how I build",
  skills: "what I build with",
  experience: "where I've worked",
  awards: "hackathons & recognition",
  contact: "ways to reach me",
  email: "copy my email",
  resume: "open my résumé",
  github: "open GitHub",
  linkedin: "open LinkedIn",
  try: "run an experiment on this page",
  ship: "ship it 🚀",
  theme: "theme <light|dark>",
  clear: "clear the screen",
  exit: "close the terminal",
}

const A = ({ href, children }: { href: string; children: ReactNode }) => (
  <a
    href={href}
    {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    className="text-accent underline decoration-accent/40 underline-offset-2 hover:decoration-accent"
  >
    {children}
  </a>
)

const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")

/** A tiny terminal for the curious. Opens with Ctrl/⌘+K or the nav button. */
export function Terminal({ resume }: { resume: string | null }) {
  const [open, setOpen] = useState(false)
  const [lines, setLines] = useState<Line[]>([])
  const [input, setInput] = useState("")
  const history = useRef<string[]>([])
  const histIdx = useRef(-1)
  const inputRef = useRef<HTMLInputElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const lastFocus = useRef<HTMLElement | null>(null)
  const nextId = useRef(0)
  const router = useRouter()
  const { setTheme } = useTheme()

  const print = useCallback((kind: Line["kind"], body: ReactNode) => {
    setLines((l) => [...l, { id: nextId.current++, kind, body }])
  }, [])

  const welcome = useCallback(() => {
    setLines([])
    print(
      "out",
      <>
        <span className="text-foreground">You found the terminal.</span> Curiosity noted.{"\n"}Type{" "}
        <span className="text-accent">help</span> to see what I can do.
      </>,
    )
  }, [print])

  const openTerminal = useCallback(() => {
    lastFocus.current = document.activeElement as HTMLElement | null
    setOpen(true)
  }, [])
  const close = useCallback(() => {
    setOpen(false)
    lastFocus.current?.focus?.()
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault()
        setOpen((o) => {
          if (!o) lastFocus.current = document.activeElement as HTMLElement | null
          return !o
        })
      }
    }
    window.addEventListener("keydown", onKey)
    window.addEventListener(EVENTS.terminal, openTerminal)
    return () => {
      window.removeEventListener("keydown", onKey)
      window.removeEventListener(EVENTS.terminal, openTerminal)
    }
  }, [openTerminal])

  useEffect(() => {
    if (!open) return
    if (lines.length === 0) welcome()
    document.body.style.overflow = "hidden"
    requestAnimationFrame(() => inputRef.current?.focus())
    return () => {
      document.body.style.overflow = ""
    }
  }, [open, lines.length, welcome])

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight })
  }, [lines])

  const experiment = (name: ExperimentName) => {
    close()
    window.setTimeout(() => emit(EVENTS.experiment, name), 250)
  }

  const run = (raw: string) => {
    const cmdline = raw.trim()
    print("in", cmdline)
    if (!cmdline) return
    history.current.unshift(cmdline)
    histIdx.current = -1
    const [cmd, ...args] = cmdline.split(/\s+/)
    const arg = args.join(" ").toLowerCase()

    switch (cmd.toLowerCase()) {
      case "help":
        return print(
          "out",
          <div className="grid grid-cols-[7rem_1fr] gap-x-3">
            {Object.entries(COMMANDS).map(([c, d]) => (
              <div key={c} className="contents">
                <span className="text-accent">{c}</span>
                <span>{d}</span>
              </div>
            ))}
          </div>,
        )
      case "whoami":
        return print(
          "out",
          <>
            <span className="text-foreground">{profile.name}</span> — {profile.areas.join(" • ")}
            {"\n"}
            {profile.headline}
          </>,
        )
      case "about":
        return print("out", `${profile.intro}\n\n${about.paragraphs[2].replace(/\*\*/g, "")} "${about.question}"`)
      case "ls":
      case "projects":
        return print(
          "out",
          <>
            <span className="text-subtle-foreground"># featured — try: open {featuredProjects[0].slug}</span>
            {featuredProjects.map((p) => (
              <div key={p.slug}>
                <A href={`/work/${p.slug}`}>{p.slug}</A> <span className="text-subtle-foreground">— {p.subtitle}</span>
              </div>
            ))}
            <span className="mt-2 block text-subtle-foreground"># the lab</span>
            {labProjects.map((p) => (
              <div key={p.name}>
                <A href={p.links[0].href}>{slug(p.name)}</A>{" "}
                <span className="text-subtle-foreground">— {p.category}</span>
              </div>
            ))}
          </>,
        )
      case "open":
      case "cd": {
        if (!arg) return print("out", "usage: open <project>   (run ls to see them)")
        const f = featuredProjects.find((p) => p.slug.startsWith(slug(arg)))
        if (f) {
          print("out", `opening /work/${f.slug} …`)
          close()
          return router.push(`/work/${f.slug}`)
        }
        const l = labProjects.find((p) => slug(p.name).startsWith(slug(arg)))
        if (l) {
          const href = (l.links.find((x) => x.kind === "live") ?? l.links[0]).href
          window.open(href, "_blank", "noopener,noreferrer")
          return print("out", <>opened <A href={href}>{l.name}</A> in a new tab</>)
        }
        return print("out", `open: no project called "${arg}". Try ls.`)
      }
      case "loop":
        return print(
          "out",
          <>
            {buildLoop.map((s, i) => (
              <div key={s.step}>
                <span className="text-accent">{String(i + 1).padStart(2, "0")} {s.step.padEnd(11)}</span>
                {s.line} <span className="text-subtle-foreground">({s.project})</span>
              </div>
            ))}
          </>,
        )
      case "skills":
        return print(
          "out",
          <>
            {skillGroups.map((g) => (
              <div key={g.title}>
                <span className="text-accent">{g.title}:</span> {g.items.join(", ")}
              </div>
            ))}
          </>,
        )
      case "experience":
        return print(
          "out",
          <>
            {experience.map((x) => (
              <div key={x.org + x.role}>
                <span className="text-foreground">{x.role}</span> @ <span className="text-accent">{x.org}</span>
                {x.period && <span className="text-subtle-foreground"> · {x.period}</span>}
              </div>
            ))}
          </>,
        )
      case "awards":
        return print(
          "out",
          <>
            {achievements.map((a) => (
              <div key={a.title}>
                <span className="text-accent">[{a.tag}]</span> {a.title}
              </div>
            ))}
          </>,
        )
      case "contact":
        return print(
          "out",
          <>
            email     <A href={`mailto:${profile.email}`}>{profile.email}</A>
            {"\n"}github    <A href={profile.links.github}>github.com/suriyaprakash-25</A>
            {"\n"}linkedin  <A href={profile.links.linkedin}>linkedin.com/in/suriya-prakash-r-m</A>
          </>,
        )
      case "email":
        navigator.clipboard?.writeText(profile.email).catch(() => {})
        return print("out", `copied ${profile.email} to your clipboard ✓`)
      case "resume":
        if (!resume) return print("out", "résumé is being updated — try `contact` in the meantime.")
        window.open(resume, "_blank", "noopener,noreferrer")
        return print("out", "opening résumé in a new tab …")
      case "github":
      case "linkedin": {
        const href = profile.links[cmd.toLowerCase() as "github" | "linkedin"]
        window.open(href, "_blank", "noopener,noreferrer")
        return print("out", <>opened <A href={href}>{cmd}</A></>)
      }
      case "try":
      case "experiment":
        if (["blueprint", "break", "gravity"].includes(arg)) return experiment(arg as ExperimentName)
        return experiment(["blueprint", "break", "gravity"][Math.floor(Math.random() * 3)] as ExperimentName)
      case "ship":
        return experiment("ship")
      case "blueprint":
      case "break":
      case "gravity":
        return experiment(cmd.toLowerCase() as ExperimentName)
      case "theme":
        if (arg !== "light" && arg !== "dark") return print("out", "usage: theme <light|dark>")
        setTheme(arg)
        return print("out", `theme → ${arg}`)
      case "sudo":
        if (arg.includes("hire")) {
          window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent("Let's work together")}`
          return print("out", "permission granted. opening your mail client … 🚀")
        }
        return print("out", "nice try. (hint: sudo hire suriya)")
      case "pwd":
        return print("out", "/home/suriya/curiosity")
      case "date":
        return print("out", new Date().toString())
      case "echo":
        return print("out", args.join(" "))
      case "rm":
        return print("out", "rm: refusing to delete — but I respect the instinct to break things.")
      case "clear":
        return setLines([])
      case "exit":
      case "quit":
        return close()
      default:
        return print(
          "out",
          <>
            command not found: {cmd} — but what happens if you try <span className="text-accent">help</span>?
          </>,
        )
    }
  }

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      run(input)
      setInput("")
    } else if (e.key === "Escape") {
      close()
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      const i = Math.min(histIdx.current + 1, history.current.length - 1)
      if (i >= 0) {
        histIdx.current = i
        setInput(history.current[i])
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault()
      const i = histIdx.current - 1
      histIdx.current = Math.max(i, -1)
      setInput(i >= 0 ? history.current[i] : "")
    } else if (e.key === "Tab") {
      e.preventDefault()
      const [c, ...rest] = input.split(" ")
      if (rest.length === 0) {
        const hit = Object.keys(COMMANDS).find((k) => k.startsWith(c.toLowerCase()))
        if (hit) setInput(hit + " ")
      } else if (c === "open") {
        const names = [...featuredProjects.map((p) => p.slug), ...labProjects.map((p) => slug(p.name))]
        const hit = names.find((n) => n.startsWith(slug(rest.join(" "))))
        if (hit) setInput(`open ${hit}`)
      }
    }
  }

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-[80] flex items-start justify-center bg-black/50 px-4 pt-[12vh] backdrop-blur-sm"
      onMouseDown={(e) => e.target === e.currentTarget && close()}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Terminal"
        className="panel-in w-full max-w-2xl overflow-hidden rounded-xl border border-border bg-card font-mono text-[13px] shadow-2xl shadow-black/40"
      >
        <div className="flex items-center gap-2 border-b border-border bg-muted/60 px-4 py-2.5">
          <span className="flex gap-1.5" aria-hidden>
            <button type="button" tabIndex={-1} onClick={close} className="h-3 w-3 rounded-full bg-rose-400/80" />
            <span className="h-3 w-3 rounded-full bg-amber-400/80" />
            <span className="h-3 w-3 rounded-full bg-emerald-400/80" />
          </span>
          <span className="mx-auto text-xs text-subtle-foreground">suriya@portfolio: ~</span>
          <kbd className="rounded border border-border px-1.5 text-[10px] text-subtle-foreground">esc</kbd>
        </div>
        <div
          ref={scrollRef}
          className="max-h-[55vh] min-h-[16rem] overflow-y-auto p-4 leading-relaxed"
          onClick={() => inputRef.current?.focus()}
        >
          {lines.map((l) => (
            <div key={l.id} className="mb-1.5 whitespace-pre-wrap break-words">
              {l.kind === "in" ? (
                <span>
                  <span className="text-emerald-400">suriya@portfolio</span>
                  <span className="text-subtle-foreground">:~$ </span>
                  <span className="text-foreground">{l.body}</span>
                </span>
              ) : (
                <div className="text-muted-foreground">{l.body}</div>
              )}
            </div>
          ))}
          <label className="flex items-center">
            <span className="shrink-0">
              <span className="text-emerald-400">suriya@portfolio</span>
              <span className="text-subtle-foreground">:~$&nbsp;</span>
            </span>
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              aria-label="Terminal command"
              autoComplete="off"
              autoCapitalize="off"
              spellCheck={false}
              className="min-w-0 flex-1 bg-transparent text-foreground caret-accent outline-none"
            />
          </label>
        </div>
      </div>
    </div>
  )
}
