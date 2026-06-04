"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { Trophy, Medal, Star, Rocket, Code2, ChefHat, Target, Laptop } from "lucide-react"

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
const achievements = [
  {
    id: "ryla",
    title: "Third Place – RYLA Entrepreneurship Program",
    subtitle: "Rotary Youth Leadership Awards",
    description:
      "Awarded third place and received a fully sponsored 6-day business exposure trip to Delhi and Agra for entrepreneurial excellence and leadership potential.",
    icon: Trophy,
    medal: "bronze",
    rank: "3rd Place",
    type: "Entrepreneurship",
    highlight: true,
    badge: "🚀 Sponsored Trip · Delhi & Agra",
    color: "#f59e0b",
    glow: "rgba(245,158,11,0.35)",
    light: "#fcd34d",
  },
  {
    id: "creatathon",
    title: "Second Prize – Creatathon",
    subtitle: "Engineering Innovation Challenge",
    description:
      "Recognized for developing an innovative engineering project solution and presenting a working prototype to a panel of expert judges.",
    icon: Medal,
    medal: "silver",
    rank: "2nd Place",
    type: "Innovation",
    highlight: false,
    badge: "🔧 Working Prototype",
    color: "#94a3b8",
    glow: "rgba(148,163,184,0.3)",
    light: "#e2e8f0",
  },
  {
    id: "freshathon",
    title: "Second Prize – Freshathon",
    subtitle: "Inter-College Hackathon",
    description:
      "Secured second place in an inter-college hackathon by building and demonstrating a functional prototype under strict time constraints.",
    icon: Medal,
    medal: "silver",
    rank: "2nd Place",
    type: "Hackathon",
    highlight: false,
    badge: "⏱ Under Time Pressure",
    color: "#94a3b8",
    glow: "rgba(148,163,184,0.3)",
    light: "#e2e8f0",
  },
  {
    id: "webdesign",
    title: "Second Prize – Web Design Showdown",
    subtitle: "UI/UX & Frontend Competition",
    description:
      "Awarded second place for creating an intuitive UI/UX design and high-quality frontend implementation that stood out for its polish and usability.",
    icon: Medal,
    medal: "silver",
    rank: "2nd Place",
    type: "Design",
    highlight: false,
    badge: "🎨 UI/UX Excellence",
    color: "#94a3b8",
    glow: "rgba(148,163,184,0.3)",
    light: "#e2e8f0",
  },
  {
    id: "paypal",
    title: "PayPal Mentorship Program",
    subtitle: "Industry Mentorship · PayPal",
    description:
      "Selected to participate in the PayPal Mentorship Program, gaining industry guidance from experienced software engineers and exposure to modern development practices, career strategies, and real-world engineering workflows.",
    icon: Star,
    medal: "special",
    rank: "Selected",
    type: "Mentorship",
    highlight: true,
    badge: "💡 Industry Mentorship",
    color: "#3b82f6",
    glow: "rgba(59,130,246,0.35)",
    light: "#93c5fd",
  },
  {
    id: "innohack",
    title: "Finalist – InnoHack Hackathon",
    subtitle: "VIT University",
    description:
      "Reached the finalist stage at InnoHack, a competitive hackathon by VIT University, by developing an innovative technology solution and presenting before industry experts.",
    icon: Rocket,
    medal: "finalist",
    rank: "Finalist",
    type: "Hackathon",
    highlight: true,
    badge: "🏫 VIT University",
    color: "#8b5cf6",
    glow: "rgba(139,92,246,0.35)",
    light: "#c4b5fd",
  },
]

const cpStats = [
  {
    platform: "LeetCode",
    icon: Code2,
    color: "#f97316",
    glow: "rgba(249,115,22,0.3)",
    stats: [
      { label: "Problems Solved", value: 220, suffix: "+" },
      { label: "Contest Rating", value: 1686, suffix: "" },
    ],
    badge: "DSA Specialist",
  },
  {
    platform: "CodeChef",
    icon: ChefHat,
    color: "#92400e",
    glow: "rgba(180,83,9,0.3)",
    stats: [
      { label: "Problems Solved", value: 350, suffix: "+" },
      { label: "Contest Exp.", value: null, suffix: "Multi-level" },
    ],
    badge: "Consistent Coder",
  },
  {
    platform: "SkillRack",
    icon: Target,
    color: "#10b981",
    glow: "rgba(16,185,129,0.3)",
    stats: [
      { label: "Challenges Solved", value: 1100, suffix: "+" },
      { label: "Bronze Badges", value: 310, suffix: "+" },
    ],
    badge: "Badge Champion",
  },
]

/* ─────────────────────────────────────────────
   COUNT-UP HOOK
───────────────────────────────────────────── */
function useCountUp(target: number | null, started: boolean, duration = 1800) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!started || target === null) return
    const step = Math.ceil(target / (duration / 16))
    let current = 0
    const timer = setInterval(() => {
      current = Math.min(current + step, target)
      setCount(current)
      if (current >= target) clearInterval(timer)
    }, 16)
    return () => clearInterval(timer)
  }, [started, target, duration])
  return count
}

/* ─────────────────────────────────────────────
   ACHIEVEMENT CARD
───────────────────────────────────────────── */
function AchievementCard({ a, index, visible }: { a: (typeof achievements)[0]; index: number; visible: boolean }) {
  const [hovered, setHovered] = useState(false)
  const [spot, setSpot] = useState({ x: 50, y: 50 })

  const onMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    setSpot({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 })
  }, [])

  const medalBg: Record<string, string> = {
    bronze: "linear-gradient(135deg,#92400e,#f59e0b,#78350f)",
    silver: "linear-gradient(135deg,#475569,#e2e8f0,#334155)",
    special: "linear-gradient(135deg,#1d4ed8,#3b82f6,#1e40af)",
    finalist: "linear-gradient(135deg,#6d28d9,#8b5cf6,#5b21b6)",
  }

  return (
    <div
      className="relative rounded-2xl border overflow-hidden cursor-default bg-white/70 dark:bg-[#080812]/70"
      style={{
        
        borderColor: hovered ? `${a.color}50` : `${a.color}18`,
        backdropFilter: "blur(20px)",
        boxShadow: hovered ? `0 0 40px ${a.glow}, 0 1px 0 ${a.color}20 inset` : "none",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0) scale(1)" : "translateY(24px) scale(0.97)",
        transition: `opacity 0.6s ease, transform 0.6s ease, box-shadow 0.3s ease, border-color 0.3s ease`,
        transitionDelay: `${index * 0.08}s`,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={onMove}
    >
      {/* Spotlight */}
      {hovered && (
        <div className="pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-200"
          style={{ background: `radial-gradient(160px at ${spot.x}% ${spot.y}%,${a.color}12 0%,transparent 70%)` }} />
      )}

      {/* Top accent bar */}
      <div className="h-0.5 w-full" style={{ background: `linear-gradient(90deg,transparent,${a.color},transparent)`, opacity: hovered ? 1 : 0.4, transition: "opacity 0.3s" }} />

      <div className="p-5">
        <div className="flex items-start gap-4">
          {/* Medal icon */}
          <div className="relative flex-shrink-0">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center text-slate-900 dark:text-slate-800 dark:text-white/90"
              style={{ background: medalBg[a.medal], boxShadow: `0 4px 16px ${a.glow}` }}>
              <a.icon className="w-6 h-6" />
            </div>
            {a.highlight && (
              <div className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full flex items-center justify-center"
                style={{ background: a.color }}>
                <span className="text-[7px] font-bold text-black">★</span>
              </div>
            )}
          </div>

          <div className="flex-1 min-w-0">
            {/* Rank + type */}
            <div className="flex items-center gap-2 mb-1.5 flex-wrap">
              <span className="font-mono text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full"
                style={{ background: `${a.color}18`, color: a.color }}>
                {a.rank}
              </span>
              <span className="font-mono text-[9px] uppercase tracking-wider text-slate-900 dark:text-slate-400 dark:text-white/30">{a.type}</span>
            </div>

            {/* Title */}
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white leading-snug mb-0.5 group-hover:text-primary transition-colors">
              {a.title}
            </h3>
            <p className="font-mono text-[10px] mb-2.5" style={{ color: a.color }}>{a.subtitle}</p>
            <p className="text-[11px] text-slate-900 dark:text-slate-600 dark:text-white/50 leading-relaxed mb-3">{a.description}</p>

            {/* Badge */}
            <span className="inline-flex items-center gap-1.5 text-[9px] font-mono px-2.5 py-1 rounded-full border"
              style={{ borderColor: `${a.color}25`, background: `${a.color}08`, color: a.light }}>
              {a.badge}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────
   CP STAT CARD WITH COUNT-UP
───────────────────────────────────────────── */
function CPCard({ cp, visible, delay }: { cp: (typeof cpStats)[0]; visible: boolean; delay: number }) {
  const [hovered, setHovered] = useState(false)
  const v0 = useCountUp(cp.stats[0].value, visible, 1600)
  const v1 = useCountUp(typeof cp.stats[1].value === "number" ? cp.stats[1].value : null, visible, 1800)

  return (
    <div className="relative rounded-2xl border overflow-hidden cursor-default bg-white/70 dark:bg-[#080812]/70"
      style={{
        
        borderColor: hovered ? `${cp.color}45` : `${cp.color}18`,
        backdropFilter: "blur(20px)",
        boxShadow: hovered ? `0 0 36px ${cp.glow}` : "none",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0) scale(1)" : "translateY(24px) scale(0.96)",
        transition: `opacity 0.6s ease, transform 0.6s ease, box-shadow 0.3s ease, border-color 0.3s ease`,
        transitionDelay: `${delay}s`,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="h-0.5 w-full" style={{ background: `linear-gradient(90deg,transparent,${cp.color},transparent)`, opacity: hovered ? 1 : 0.5, transition: "opacity 0.3s" }} />
      <div className="p-5">
        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center text-slate-900 dark:text-slate-700 dark:text-white/80"
            style={{ background: `${cp.color}18`, border: `1px solid ${cp.color}30` }}>
            <cp.icon className="w-5 h-5" />
          </div>
          <div>
            <div className="font-bold text-sm text-slate-900 dark:text-white">{cp.platform}</div>
            <div className="font-mono text-[9px] uppercase tracking-wider" style={{ color: cp.color }}>{cp.badge}</div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-xl p-3 text-center" style={{ background: `${cp.color}08` }}>
            <div className="text-2xl font-black text-slate-900 dark:text-white tabular-nums">
              {v0.toLocaleString()}{cp.stats[0].suffix}
            </div>
            <div className="font-mono text-[8px] uppercase tracking-wider text-slate-900 dark:text-slate-500 dark:text-white/35 mt-1">
              {cp.stats[0].label}
            </div>
          </div>
          <div className="rounded-xl p-3 text-center" style={{ background: `${cp.color}08` }}>
            <div className="text-2xl font-black tabular-nums" style={{ color: cp.color }}>
              {cp.stats[1].value !== null ? `${v1.toLocaleString()}${cp.stats[1].suffix}` : cp.stats[1].suffix}
            </div>
            <div className="font-mono text-[8px] uppercase tracking-wider text-slate-900 dark:text-slate-500 dark:text-white/35 mt-1">
              {cp.stats[1].label}
            </div>
          </div>
        </div>

        {/* Progress bar decoration */}
        <div className="mt-3 h-1 rounded-full overflow-hidden" style={{ background: `${cp.color}15` }}>
          <div className="h-full rounded-full transition-all duration-[1800ms]"
            style={{
              width: visible ? "100%" : "0%",
              background: `linear-gradient(90deg,${cp.color}80,${cp.color})`,
              transitionDelay: `${delay + 0.3}s`,
            }} />
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────
   MAIN SECTION EXPORT
───────────────────────────────────────────── */
export function Achievements() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true) }, { threshold: 0.08 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <section id="achievements" ref={sectionRef} className="relative px-4 sm:px-8 lg:px-16 py-24 sm:py-32 overflow-hidden">

      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(ellipse 60% 40% at 50% 50%,rgba(245,158,11,0.06) 0%,transparent 70%)" }} />

      <div className="mx-auto max-w-7xl">

        {/* ── Section Header ── */}
        <div className="mb-16 space-y-4"
          style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(32px)", transition: "all 0.7s ease" }}>
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-slate-900 dark:text-slate-400 dark:text-white/30">04 / Recognition</p>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tighter leading-none">
            <span className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-500 dark:from-white dark:via-white/80 dark:to-white/30 bg-clip-text text-transparent">
              Achievements &
            </span>
            <br />
            <span className="bg-gradient-to-r from-amber-400 via-yellow-300 to-orange-400 bg-clip-text text-transparent">
              Recognition
            </span>
          </h2>
          <p className="max-w-2xl text-base sm:text-lg text-slate-900 dark:text-slate-500 dark:text-white/40 leading-relaxed">
            Hackathon podiums, entrepreneurship recognitions, mentorship selections, and 1,600+ competitive
            programming solutions — a track record built one challenge at a time.
          </p>

          {/* Quick stats bar */}
          <div className="flex flex-wrap items-center gap-6 pt-2">
            {[
              { v: "6", l: "Awards & Recognitions" },
              { v: "1,670+", l: "CP Problems Solved" },
              { v: "310+", l: "Badges Earned" },
              { v: "1686", l: "LeetCode Rating" },
            ].map(s => (
              <div key={s.l} className="flex flex-col">
                <span className="text-2xl font-black text-slate-900 dark:text-white">{s.v}</span>
                <span className="font-mono text-[9px] text-slate-900 dark:text-slate-400 dark:text-white/30 uppercase tracking-wider">{s.l}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Achievement Cards Grid ── */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-6"
            style={{ opacity: visible ? 1 : 0, transition: "opacity 0.6s ease 0.2s" }}>
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-slate-900 dark:text-slate-400 dark:text-white/30">Awards & Programs</span>
            <div className="flex-1 h-px bg-slate-200 dark:bg-white/8" />
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {achievements.map((a, i) => (
              <AchievementCard key={a.id} a={a} index={i} visible={visible} />
            ))}
          </div>
        </div>

        {/* ── Competitive Programming ── */}
        <div>
          <div className="flex items-center gap-3 mb-6"
            style={{ opacity: visible ? 1 : 0, transition: "opacity 0.6s ease 0.5s" }}>
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-slate-900 dark:text-slate-400 dark:text-white/30 flex items-center gap-2">
              <Laptop className="w-3.5 h-3.5" /> Competitive Programming
            </span>
            <div className="flex-1 h-px bg-slate-200 dark:bg-white/8" />
          </div>

          {/* Total problems banner */}
          <div className="mb-6 rounded-2xl border p-5 relative overflow-hidden bg-white/70 dark:bg-[#080812]/70"
            style={{
              
              borderColor: "var(--border)",
              backdropFilter: "blur(20px)",
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(20px)",
              transition: "all 0.6s ease 0.55s",
            }}>
            <div className="pointer-events-none absolute inset-0"
              style={{ background: "radial-gradient(ellipse 80% 100% at 50% 50%,rgba(16,185,129,0.05) 0%,transparent 70%)" }} />
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8 relative">
              <div className="text-center sm:text-left">
                <div className="text-5xl font-black text-slate-900 dark:text-white">1,670<span className="text-emerald-400">+</span></div>
                <div className="font-mono text-[10px] uppercase tracking-widest text-slate-900 dark:text-slate-400 dark:text-white/30 mt-1">Total Problems Solved Across All Platforms</div>
              </div>
              <div className="hidden sm:block w-px h-12 bg-slate-200 dark:bg-white/10" />
              <div className="flex flex-wrap gap-3">
                {cpStats.map((cp) => (
                  <div key={cp.platform} className="flex items-center gap-2 rounded-xl px-3 py-2" style={{ background: "var(--secondary)" }}>
                    <span className="text-slate-900 dark:text-slate-700 dark:text-white/80"><cp.icon className="w-4 h-4" /></span>
                    <div>
                      <div className="text-xs font-bold text-slate-900 dark:text-white">{cp.stats[0].value}{cp.stats[0].suffix}</div>
                      <div className="font-mono text-[8px] text-slate-900 dark:text-slate-400 dark:text-white/30">{cp.platform}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="hidden lg:flex ml-auto items-center gap-2 rounded-full border px-4 py-2"
                style={{ borderColor: "rgba(16,185,129,0.3)", background: "rgba(16,185,129,0.08)" }}>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="font-mono text-[10px] text-emerald-400 uppercase tracking-wider">Actively Solving</span>
              </div>
            </div>
          </div>

          {/* Platform cards */}
          <div className="grid gap-4 sm:grid-cols-3">
            {cpStats.map((cp, i) => (
              <CPCard key={cp.platform} cp={cp} visible={visible} delay={0.65 + i * 0.1} />
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
