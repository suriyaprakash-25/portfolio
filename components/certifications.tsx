"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { Bot, Laptop, Lightbulb, GraduationCap, BrainCircuit, Building, Ruler, Code, Palette, FileBadge } from "lucide-react"

/* ─────────────────────────────────────────────
   CERTIFICATIONS DATA
───────────────────────────────────────────── */
const categories = [
  {
    id: "ai-ml",
    title: "Artificial Intelligence & Machine Learning",
    icon: Bot,
    description:
      "Focused on machine learning, generative AI, intelligent systems, and data-driven solutions.",
    color: "#8b5cf6",
    glow: "rgba(139,92,246,0.35)",
    light: "#c4b5fd",
    gradient: "from-violet-600 to-purple-700",
    certs: [
      {
        name: "Artificial Intelligence and Machine Learning",
        issuer: "Corizo",
        year: "2025",
        badge: GraduationCap,
        tags: ["AI", "ML", "Deep Learning"],
      },
      {
        name: "Python Mastery with Generative AI",
        issuer: "Udemy",
        year: "2025",
        badge: BrainCircuit,
        tags: ["Python", "GenAI", "LLMs"],
      },
    ],
  },
  {
    id: "programming",
    title: "Programming & Software Engineering",
    icon: Laptop,
    description:
      "Strong foundation in programming, problem solving, algorithms, and software development.",
    color: "#06b6d4",
    glow: "rgba(6,182,212,0.35)",
    light: "#67e8f9",
    gradient: "from-cyan-500 to-teal-600",
    certs: [
      {
        name: "Certified in C and C++ Programming",
        issuer: "IIT Bombay",
        year: "2025",
        badge: Building,
        tags: ["C", "C++", "Systems"],
      },
      {
        name: "Mastering Data Structures and Algorithms in C & C++",
        issuer: "Udemy",
        year: "2025",
        badge: Ruler,
        tags: ["DSA", "Algorithms", "C++"],
      },
      {
        name: "Offline Python Course",
        issuer: "G-TEC",
        year: "2024",
        badge: Code,
        tags: ["Python", "Programming"],
      },
    ],
  },
  {
    id: "innovation",
    title: "Innovation & Product Design",
    icon: Lightbulb,
    description:
      "Focused on user-centric problem solving, innovation frameworks, and product thinking.",
    color: "#f59e0b",
    glow: "rgba(245,158,11,0.35)",
    light: "#fcd34d",
    gradient: "from-amber-500 to-orange-500",
    certs: [
      {
        name: "Design Thinking for Innovation",
        issuer: "NPTEL",
        year: "2025",
        badge: Palette,
        tags: ["Design Thinking", "Innovation", "UX"],
      },
    ],
  },
]

const stats = [
  { value: "6+", label: "Professional Certifications", icon: FileBadge },
  { value: "2+", label: "AI & ML Certifications", icon: Bot },
  { value: "3+", label: "Programming Certifications", icon: Laptop },
  { value: "1+", label: "Innovation & Design", icon: Lightbulb },
]

/* ─────────────────────────────────────────────
   CERTIFICATION CARD
───────────────────────────────────────────── */
function CertCard({
  cert,
  color,
  light,
  visible,
  delay,
}: {
  cert: (typeof categories)[0]["certs"][0]
  color: string
  light: string
  visible: boolean
  delay: number
}) {
  const [hovered, setHovered] = useState(false)
  const [spot, setSpot] = useState({ x: 50, y: 50 })

  const onMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    setSpot({
      x: ((e.clientX - r.left) / r.width) * 100,
      y: ((e.clientY - r.top) / r.height) * 100,
    })
  }, [])

  return (
    <div
      className="relative rounded-2xl border overflow-hidden cursor-default bg-white/70 dark:bg-[#080812]/70"
      style={{
        
        borderColor: hovered ? `${color}45` : `${color}15`,
        backdropFilter: "blur(20px)",
        boxShadow: hovered ? `0 0 32px ${color}20` : "none",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition:
          "opacity 0.55s ease, transform 0.55s ease, box-shadow 0.3s ease, border-color 0.3s ease",
        transitionDelay: `${delay}s`,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={onMove}
    >
      {/* Spotlight */}
      {hovered && (
        <div
          className="pointer-events-none absolute inset-0 rounded-2xl"
          style={{
            background: `radial-gradient(140px at ${spot.x}% ${spot.y}%,${color}12 0%,transparent 70%)`,
          }}
        />
      )}

      {/* Top accent */}
      <div
        className="h-px w-full"
        style={{
          background: `linear-gradient(90deg,transparent,${color},transparent)`,
          opacity: hovered ? 1 : 0.3,
          transition: "opacity 0.3s",
        }}
      />

      <div className="p-5">
        <div className="flex items-start gap-4">
          {/* Badge */}
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
            style={{
              background: `${color}15`,
              border: `1px solid ${color}28`,
              boxShadow: hovered ? `0 0 20px ${color}20` : "none",
              transition: "box-shadow 0.3s",
            }}
          >
            <cert.badge className="w-5 h-5 text-slate-900 dark:text-slate-800 dark:text-white/90" />
          </div>

          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-semibold text-slate-900 dark:text-white leading-snug mb-1">{cert.name}</h4>
            <div className="flex items-center gap-2 mb-3">
              <span
                className="font-mono text-[10px] font-medium"
                style={{ color }}
              >
                {cert.issuer}
              </span>
              <span className="text-slate-900 dark:text-slate-300 dark:text-white/15">·</span>
              <span className="font-mono text-[10px] text-slate-900 dark:text-slate-400 dark:text-white/30">{cert.year}</span>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5">
              {cert.tags.map((tag) => (
                <span
                  key={tag}
                  className="font-mono text-[9px] px-2 py-0.5 rounded-md border"
                  style={{
                    background: `${color}08`,
                    borderColor: `${color}18`,
                    color: light,
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Year pill */}
          <div
            className="flex-shrink-0 font-mono text-[10px] px-2.5 py-1 rounded-full border"
            style={{
              borderColor: `${color}25`,
              background: `${color}08`,
              color,
            }}
          >
            {cert.year}
          </div>
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────
   CATEGORY BLOCK
───────────────────────────────────────────── */
function CategoryBlock({
  cat,
  index,
  visible,
}: {
  cat: (typeof categories)[0]
  index: number
  visible: boolean
}) {
  return (
    <div
      className="relative"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(32px)",
        transition: "opacity 0.65s ease, transform 0.65s ease",
        transitionDelay: `${0.15 + index * 0.15}s`,
      }}
    >
      {/* Category header */}
      <div className="flex items-start gap-4 mb-5">
        {/* Icon */}
        <div
          className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0 border"
          style={{
            background: `linear-gradient(135deg,${cat.color}18,${cat.color}08)`,
            borderColor: `${cat.color}25`,
            boxShadow: `0 0 28px ${cat.glow}`,
          }}
        >
          <cat.icon className="w-6 h-6 text-slate-900 dark:text-slate-800 dark:text-white/90" />
        </div>
        <div className="flex-1">
          <h3
            className="text-lg sm:text-xl font-bold tracking-tight"
            style={{
              background: `linear-gradient(135deg,#fff 0%,${cat.light} 100%)`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            {cat.title}
          </h3>
          <p className="text-[12px] text-slate-900 dark:text-slate-500 dark:text-white/40 leading-relaxed mt-1 max-w-lg">
            {cat.description}
          </p>
        </div>
        <span
          className="font-mono text-[10px] px-2.5 py-1 rounded-full border hidden sm:inline-flex"
          style={{
            borderColor: `${cat.color}25`,
            background: `${cat.color}08`,
            color: cat.color,
          }}
        >
          {cat.certs.length} cert{cat.certs.length > 1 ? "s" : ""}
        </span>
      </div>

      {/* Certification cards */}
      <div className="space-y-3 pl-0 sm:pl-16">
        {cat.certs.map((cert, ci) => (
          <CertCard
            key={cert.name}
            cert={cert}
            color={cat.color}
            light={cat.light}
            visible={visible}
            delay={0.3 + index * 0.15 + ci * 0.08}
          />
        ))}
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────
   MAIN EXPORT
───────────────────────────────────────────── */
export function Certifications() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setVisible(true)
      },
      { threshold: 0.06 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <section
      id="certifications"
      ref={sectionRef}
      className="relative px-4 sm:px-8 lg:px-16 py-24 sm:py-32 overflow-hidden"
    >
      {/* Background glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 50% 35% at 50% 50%,rgba(139,92,246,0.05) 0%,transparent 70%)",
        }}
      />

      <div className="mx-auto max-w-7xl">
        {/* ── Header ── */}
        <div
          className="mb-16 space-y-4"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(28px)",
            transition: "all 0.7s ease",
          }}
        >
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-slate-900 dark:text-slate-400 dark:text-white/30">
            05 / Learning
          </p>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tighter leading-none">
            <span className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-500 dark:from-white dark:via-white/80 dark:to-white/30 bg-clip-text text-transparent">
              Certifications &
            </span>
            <br />
            <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
              Professional Learning
            </span>
          </h2>
          <p className="max-w-2xl text-base sm:text-lg text-slate-900 dark:text-slate-500 dark:text-white/40 leading-relaxed">
            A journey of continuous learning across AI, Programming, Product Thinking, and
            Software Engineering — backed by certifications from IIT Bombay, NPTEL, Udemy &
            more.
          </p>

          {/* Stats bar */}
          <div className="flex flex-wrap items-center gap-6 pt-3">
            {stats.map((s) => (
              <div key={s.label} className="flex items-center gap-2.5">
                <div className="text-slate-900 dark:text-slate-700 dark:text-white/80"><s.icon className="w-5 h-5" /></div>
                <div className="flex flex-col">
                  <span className="text-xl font-black text-slate-900 dark:text-white">{s.value}</span>
                  <span className="font-mono text-[8px] text-slate-900 dark:text-slate-400 dark:text-white/30 uppercase tracking-wider">
                    {s.label}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Categories ── */}
        <div className="space-y-14">
          {categories.map((cat, i) => (
            <CategoryBlock key={cat.id} cat={cat} index={i} visible={visible} />
          ))}
        </div>

        {/* ── Bottom accent ── */}
        <div
          className="mt-16 flex items-center gap-4 opacity-15"
          style={{
            opacity: visible ? 0.15 : 0,
            transition: "opacity 0.6s ease 0.8s",
          }}
        >
          <div className="flex-1 h-px bg-gradient-to-r from-transparent to-violet-500" />
          <span className="font-mono text-[10px] uppercase tracking-widest text-violet-400">
            Always Learning
          </span>
          <div className="flex-1 h-px bg-gradient-to-r from-violet-500 to-transparent" />
        </div>
      </div>
    </section>
  )
}
