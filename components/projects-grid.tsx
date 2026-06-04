"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { Box, Zap, ScanLine, Bot, Bell, Car, Target, Activity, Clock, CheckCircle, BarChart3, RefreshCw, Wrench, Sparkles, Train, Timer, ClipboardList, Building2, Package, Gauge, Banknote, AlertTriangle, Check, ChevronLeft, ChevronRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import useEmblaCarousel from "embla-carousel-react"

/* ─────────────────────────────────────────────────────────────
   PROJECT DATA
───────────────────────────────────────────────────────────── */
const projects = [
  {
    id: "trackit",
    name: "TrackIt",
    tagline: "Intelligent Inventory Tracking with Predictive Insights",
    story:
      "Businesses lose 20% of revenue annually to poor inventory management. TrackIt replaces spreadsheets and guesswork with an AI-powered platform that predicts demand, alerts on expiries, and surfaces insights that actually move the needle.",
    problem:
      "Manual inventory tracking is error-prone, slow, and blind to future demand. Stock-outs cost sales. Overstocking wastes capital. Expiry losses destroy margins. There was no single intelligent platform to solve all three.",
    category: "AI · Inventory Management",
    year: "2025",
    status: "Live",
    icon: Box,
    gradient: "from-violet-600 via-purple-600 to-indigo-700",
    glowColor: "rgba(139,92,246,0.45)",
    accentColor: "#8b5cf6",
    lightColor: "#c4b5fd",
    color1: "#8b5cf6",
    color2: "#6366f1",
    github: "https://github.com/suriyaprakash-25",
    demo: "https://inv-gdg.vercel.app/home",
    mockupType: "inventory",
    metrics: [
      { label: "Manual Effort", value: "↓ 80%", icon: Zap },
      { label: "QR Scan Speed", value: "<0.5s", icon: ScanLine },
      { label: "Forecast Acc.", value: "94%", icon: Bot },
      { label: "Expiry Alerts", value: "Auto", icon: Bell },
    ],
    features: [
      "Role-based auth for Admins & Customers",
      "QR code-based product entry & tracking",
      "AI-powered demand forecasting engine",
      "Automated expiry reminders & notifications",
      "Interactive analytics dashboard",
      "Smart inventory recommendations",
    ],
    tech: ["Next.js", "Tailwind CSS", "Shadcn UI", "Python", "MongoDB", "GenAI"],
    architecture: ["Next.js UI", "Auth Layer", "AI Engine", "MongoDB", "Notification Service"],
    impact: "Eliminated manual tracking overhead for businesses managing 1,000+ SKUs.",
  },
  {
    id: "anpr",
    name: "ANPR System",
    tagline: "Real-Time Vehicle Identification Powered by AI",
    story:
      "Every traffic checkpoint, parking lot, and secure facility needs reliable vehicle identification — but manual checks are slow and inconsistent. This system processes live CCTV streams and extracts license plate data in real time using state-of-the-art computer vision.",
    problem:
      "Manual vehicle registration checks take 45 seconds per vehicle. Human error leads to misidentification. No existing affordable system works on standard CCTV hardware in real-time at high accuracy.",
    category: "Computer Vision · Surveillance",
    year: "2025",
    status: "Completed",
    icon: Car,
    gradient: "from-cyan-500 via-teal-500 to-emerald-600",
    glowColor: "rgba(6,182,212,0.45)",
    accentColor: "#06b6d4",
    lightColor: "#67e8f9",
    color1: "#06b6d4",
    color2: "#10b981",
    github: "https://github.com/suriyaprakash-25",
    demo: null,
    mockupType: "anpr",
    metrics: [
      { label: "Detection Acc.", value: "97%", icon: Target },
      { label: "Latency", value: "<100ms", icon: Zap },
      { label: "Vehicles/hr", value: "3,600+", icon: Car },
      { label: "Manual Work", value: "↓ 95%", icon: Bot },
    ],
    features: [
      "Vehicle detection using YOLOv8 (state-of-the-art)",
      "License plate localization & segmentation",
      "OCR-based text extraction via EasyOCR",
      "Real-time video stream processing",
      "Vehicle database with search & retrieval",
      "Automated plate recognition workflow",
    ],
    tech: ["Python", "YOLOv8", "OpenCV", "EasyOCR", "Flask", "MongoDB"],
    architecture: ["CCTV Feed", "YOLOv8 Detector", "Plate Localizer", "EasyOCR", "MongoDB"],
    impact: "Processes live video at 30fps — identifies plates faster than a human can read them.",
  },
  {
    id: "sepsis",
    name: "SepsisGuard",
    tagline: "Predicting Critical Health Risks Before They Escalate",
    story:
      "Sepsis kills 270,000 Americans annually — and 80% of deaths are preventable with early detection. SepsisGuard analyzes patient vitals and clinical data in real time, surfacing high-risk patients hours before clinical deterioration becomes irreversible.",
    problem:
      "Sepsis is notoriously difficult to diagnose early. Symptoms overlap with dozens of conditions. By the time it's obvious, organ failure has begun. Clinicians need a second brain that never tires and catches what humans miss.",
    category: "Healthcare AI · Clinical Decision Support",
    year: "2025",
    status: "Research",
    icon: Activity,
    gradient: "from-rose-500 via-pink-600 to-red-600",
    glowColor: "rgba(244,63,94,0.45)",
    accentColor: "#f43f5e",
    lightColor: "#fda4af",
    color1: "#f43f5e",
    color2: "#e11d48",
    github: "https://github.com/suriyaprakash-25",
    demo: null,
    mockupType: "sepsis",
    metrics: [
      { label: "Model Recall", value: "96%", icon: Target },
      { label: "Early Warning", value: "6hrs", icon: Clock },
      { label: "False Neg. Rate", value: "<2%", icon: CheckCircle },
      { label: "Indicators", value: "40+", icon: BarChart3 },
    ],
    features: [
      "Early sepsis risk prediction from vital signs",
      "Feature engineering on 40+ clinical indicators",
      "Multi-model evaluation (XGBoost, RF, LR)",
      "High-recall strategy — minimises missed cases",
      "Clinical decision support dashboard",
      "Real-time prediction interface via Streamlit",
    ],
    tech: ["Python", "XGBoost", "Scikit-learn", "Pandas", "NumPy", "Flask", "Streamlit"],
    architecture: ["Patient Data", "Preprocessing", "Feature Eng.", "ML Model", "Alert Dashboard"],
    impact: "Identifies high-risk patients 6+ hours before standard clinical recognition.",
  },
  {
    id: "drivix",
    name: "Drivix",
    tagline: "Creating a Digital Identity for Every Vehicle",
    story:
      "Every vehicle generates valuable data throughout its lifecycle. Drivix creates a living digital twin for each vehicle by maintaining service history, repair records, expenses, and maintenance insights—helping owners make smarter decisions, improve reliability, and maximize vehicle value.",
    problem:
      "Vehicle records are often scattered across paper bills, service centers, and personal notes. This makes it difficult to track maintenance, estimate resale value, verify service history, and predict future issues. Drivix centralizes all vehicle data into a single trusted digital profile that evolves throughout the vehicle lifecycle.",
    category: "Mobility Tech · Digital Twin",
    year: "2026",
    status: "Live",
    icon: Car,
    gradient: "from-blue-500 via-indigo-600 to-violet-600",
    glowColor: "rgba(59,130,246,0.45)",
    accentColor: "#3b82f6",
    lightColor: "#93c5fd",
    color1: "#3b82f6",
    color2: "#8b5cf6",
    github: "https://github.com/suriyaprakash-25",
    demo: null,
    mockupType: "drivix",
    metrics: [
      { label: "Lifecycle Tracking", value: "100%", icon: RefreshCw },
      { label: "Service Records", value: "Unlimited", icon: Wrench },
      { label: "Vehicle Health", value: "Real-Time", icon: BarChart3 },
      { label: "Resale", value: "Better", icon: Sparkles },
    ],
    features: [
      "Digital Twin Profile for Every Vehicle",
      "Service & Maintenance History Tracking",
      "Fuel and Expense Monitoring",
      "Service Bill Storage & Verification",
      "Accident & Repair Record Management",
      "Vehicle Health Score & Analytics",
      "Predictive Maintenance Recommendations",
      "Garage Discovery & Location Services"
    ],
    tech: ["React", "Tailwind CSS", "Node.js", "Express.js", "MongoDB", "Google Maps API", "JWT", "Chart.js"],
    architecture: ["Client UI", "REST API", "Database", "Cloud Storage", "Map Service", "Auth", "Analytics Engine"],
    impact: "Centralized vehicle data into a single trusted digital profile that evolves throughout the vehicle lifecycle.",
  },
  {
    id: "metro-planner",
    name: "Metro Planner",
    tagline: "Transforming Metro Fleet Planning from Hours to Minutes",
    story:
      "Metro operations supervisors spent 2+ hours daily hand-crafting train allocation plans. Metro Induction Planner replaces that with an AI-powered decision-support system — built for Kochi Metro Rail Limited — that allocates trains to service, standby, and maintenance in under 5 minutes.",
    problem:
      "Manual fleet planning is slow, error-prone, and cannot adapt to real-time changes. Supervisors juggle maintenance schedules, crew availability, and operational constraints on paper. A single mistake cascades into service delays affecting thousands of commuters.",
    category: "AI · Transportation Ops",
    year: "2025",
    status: "Completed",
    icon: Train,
    gradient: "from-emerald-500 via-teal-500 to-cyan-600",
    glowColor: "rgba(16,185,129,0.45)",
    accentColor: "#10b981",
    lightColor: "#6ee7b7",
    color1: "#10b981",
    color2: "#06b6d4",
    github: "https://github.com/suriyaprakash-25",
    demo: "https://sih-two-theta.vercel.app/",
    mockupType: "metro",
    metrics: [
      { label: "Planning Time", value: "↓ 96%", icon: Timer },
      { label: "From", value: "2hrs", icon: ClipboardList },
      { label: "To", value: "<5min", icon: Zap },
      { label: "Built For", value: "KMRL", icon: Building2 },
    ],
    features: [
      "Automated train allocation for service, standby & maintenance",
      "AI-powered rule-based optimization engine",
      "What-If simulation module for scenario testing",
      "Real-time fleet monitoring & conflict detection",
      "PDF & CSV reporting with planning summaries",
      "Interactive KPI dashboard with fleet analytics",
    ],
    tech: ["React 18", "Tailwind CSS", "Recharts", "Node.js", "Express.js", "jsPDF"],
    architecture: ["React App", "REST API", "Planning Engine", "Simulator", "Report Gen"],
    impact: "Reduced fleet planning time from 2+ hours to under 5 minutes for KMRL operations.",
  },
]

/* ─────────────────────────────────────────────────────────────
   ANIMATED SVG MOCKUPS
───────────────────────────────────────────── */

function InventoryMockup({ c1, c2 }: { c1: string; c2: string }) {
  return (
    <div className="w-full h-full p-4 flex flex-col gap-3 font-mono">
      {/* Header */}
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-bold" style={{ color: c1 }}>TrackIt Dashboard</span>
        <span className="text-[9px] px-2 py-0.5 rounded-full animate-pulse" style={{ background: `${c1}25`, color: c1 }}>● Live</span>
      </div>
      {/* KPI row */}
      <div className="grid grid-cols-3 gap-2">
        {[["2,847", "Total SKUs"], ["142", "Low Stock"], ["23", "Expiring Soon"]].map(([v, l]) => (
          <div key={l} className="rounded-xl p-2.5 text-center" style={{ background: `${c1}12` }}>
            <div className="text-sm font-bold text-slate-900 dark:text-white">{v}</div>
            <div className="text-[8px] text-slate-900 dark:text-slate-500 dark:text-white/40 mt-0.5">{l}</div>
          </div>
        ))}
      </div>
      {/* Chart */}
      <div className="flex-1 rounded-xl relative overflow-hidden" style={{ background: `${c1}08` }}>
        <div className="absolute top-2 left-3 text-[9px] text-slate-900 dark:text-slate-500 dark:text-white/40">AI Demand Forecast</div>
        <svg viewBox="0 0 260 90" className="w-full h-full" preserveAspectRatio="none">
          <defs>
            <linearGradient id="ig1" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={c1} stopOpacity="0.5" />
              <stop offset="100%" stopColor={c1} stopOpacity="0" />
            </linearGradient>
            <linearGradient id="ig2" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={c2} stopOpacity="0.3" />
              <stop offset="100%" stopColor={c2} stopOpacity="0" />
            </linearGradient>
          </defs>
          {/* Actual */}
          <path d="M10,70 C40,55 70,40 100,45 S150,30 180,20 S220,35 250,18 L260,16 L260,90 L10,90Z" fill="url(#ig1)" />
          <path d="M10,70 C40,55 70,40 100,45 S150,30 180,20 S220,35 250,18" fill="none" stroke={c1} strokeWidth="2" />
          {/* Forecast dashed */}
          <path d="M180,20 C200,14 220,10 250,6" fill="none" stroke={c2} strokeWidth="1.5" strokeDasharray="4,2" />
          {/* Points */}
          {[[10,70],[60,48],[110,42],[160,25],[210,22],[250,18]].map(([x,y],i) => (
            <circle key={i} cx={x} cy={y} r="2.5" fill={c1} />
          ))}
        </svg>
      </div>
      {/* Stock list */}
      {[["Widget Pro", "847 units", "In Stock"],["USB Cable", "12 units", "Low"],["HDMI Adapter", "0 units", "Out"]].map(([n,q,s]) => (
        <div key={n} className="flex items-center gap-2 rounded-lg px-2.5 py-2" style={{ background: `${c1}08` }}>
          <div className="w-6 h-6 rounded-lg flex items-center justify-center" style={{ background: `${c1}20` }}><Package className="w-3.5 h-3.5 text-slate-900 dark:text-slate-800 dark:text-white/90" /></div>
          <div className="flex-1">
            <div className="text-[10px] font-medium text-slate-900 dark:text-slate-700 dark:text-white/80">{n}</div>
            <div className="text-[8px] text-slate-900 dark:text-slate-400 dark:text-white/30">{q}</div>
          </div>
          <span className={`text-[8px] px-1.5 py-0.5 rounded-full ${s==="In Stock" ? "text-emerald-400 bg-emerald-400/10" : s==="Low" ? "text-amber-400 bg-amber-400/10" : "text-red-400 bg-red-400/10"}`}>{s}</span>
        </div>
      ))}
    </div>
  )
}

function AnprMockup({ c1, c2 }: { c1: string; c2: string }) {
  return (
    <div className="w-full h-full p-4 flex flex-col gap-3 font-mono">
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-bold" style={{ color: c1 }}>ANPR Live Feed</span>
        <span className="text-[9px] px-2 py-0.5 rounded-full animate-pulse" style={{ background: `${c1}25`, color: c1 }}>● Recording</span>
      </div>
      {/* Camera feed simulation */}
      <div className="relative rounded-xl overflow-hidden flex-shrink-0" style={{ height: 110, background: '#0a0a14' }}>
        {/* Road/scene */}
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Simulated car with bounding box */}
          <div className="relative">
            <div className="w-12 h-12 flex items-center justify-center"><Car className="w-10 h-10 text-slate-900 dark:text-slate-700 dark:text-white/80" /></div>
            {/* Bounding box animation */}
            <div className="absolute inset-0 -m-2 border-2 rounded animate-pulse" style={{ borderColor: c1 }} />
            {/* Plate detection box below */}
            <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 w-16 h-4 border rounded-sm flex items-center justify-center" style={{ borderColor: c2, background: `${c2}15` }}>
              <span className="text-[7px] font-bold" style={{ color: c2 }}>TN09 AB1234</span>
            </div>
          </div>
        </div>
        {/* Corner markers */}
        {[['top-1 left-1','border-t border-l'],['top-1 right-1','border-t border-r'],['bottom-1 left-1','border-b border-l'],['bottom-1 right-1','border-b border-r']].map(([pos, brd]) => (
          <div key={pos} className={`absolute ${pos} w-4 h-4 ${brd}`} style={{ borderColor: c1 }} />
        ))}
        <div className="absolute bottom-2 left-3 text-[8px]" style={{ color: c1 }}>CAM_01 · 30fps</div>
      </div>
      {/* OCR result */}
      <div className="rounded-xl p-3 border" style={{ background: `${c1}10`, borderColor: `${c1}30` }}>
        <div className="text-[8px] text-slate-900 dark:text-slate-400 dark:text-white/30 mb-1">OCR Extraction</div>
        <div className="flex items-center gap-3">
          <div className="text-xl font-black tracking-widest" style={{ color: c1 }}>TN09 AB1234</div>
          <div className="text-[8px] px-2 py-0.5 rounded-full bg-emerald-400/10 text-emerald-400">97.4% conf.</div>
        </div>
        <div className="text-[8px] text-slate-900 dark:text-slate-400 dark:text-white/30 mt-1">State: Tamil Nadu · Detected at 14:32:07</div>
      </div>
      {/* DB records */}
      {[["TN09 AB1234","Toyota Camry","Registered"],["KA05 XY9001","Honda City","Registered"],["MH12 QW3456","Maruti Swift","Flagged"]].map(([p,v,s]) => (
        <div key={p} className="flex items-center gap-2 rounded-lg px-2.5 py-1.5" style={{ background: `${c1}07` }}>
          <span className="text-[9px] font-bold w-24 flex-shrink-0" style={{ color: c1 }}>{p}</span>
          <span className="text-[8px] text-slate-900 dark:text-slate-500 dark:text-white/40 flex-1">{v}</span>
          <span className={`text-[8px] flex items-center gap-1 ${s === "Flagged" ? "text-amber-400" : "text-emerald-400"}`}>
            {s === "Flagged" ? <AlertTriangle className="w-2.5 h-2.5" /> : <Check className="w-2.5 h-2.5" />} {s}
          </span>
        </div>
      ))}
    </div>
  )
}

function SepsisMockup({ c1, c2 }: { c1: string; c2: string }) {
  return (
    <div className="w-full h-full p-4 flex flex-col gap-3 font-mono">
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-bold" style={{ color: c1 }}>SepsisGuard Monitor</span>
        <span className="text-[9px] px-2 py-0.5 rounded-full animate-pulse" style={{ background: `${c1}25`, color: c1 }}>● Active</span>
      </div>
      {/* Risk gauge */}
      <div className="rounded-xl p-3 border" style={{ background: `${c1}10`, borderColor: `${c1}30` }}>
        <div className="text-[8px] text-slate-900 dark:text-slate-400 dark:text-white/30 mb-2">Patient ID: #PT-4421 · ICU Bed 7</div>
        <div className="flex items-center gap-4">
          <div className="relative w-16 h-16 flex-shrink-0">
            <svg viewBox="0 0 64 64" className="w-full h-full -rotate-90">
              <circle cx="32" cy="32" r="24" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="8" />
              <circle cx="32" cy="32" r="24" fill="none" stroke={c1} strokeWidth="8"
                strokeDasharray={`${0.74 * 150} 150`} strokeLinecap="round" />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-sm font-black text-slate-900 dark:text-white">74%</span>
              <span className="text-[7px] text-slate-900 dark:text-slate-500 dark:text-white/40">Risk</span>
            </div>
          </div>
          <div className="flex-1 space-y-1">
            <div className="text-xs font-bold text-amber-400 flex items-center gap-1.5"><AlertTriangle className="w-3.5 h-3.5" /> HIGH RISK</div>
            <div className="text-[9px] text-slate-900 dark:text-slate-600 dark:text-white/50">Sepsis probability: 74%</div>
            <div className="text-[8px] text-slate-900 dark:text-slate-400 dark:text-white/30">Alert sent → ICU physician</div>
            <div className="text-[8px] px-2 py-0.5 rounded-full inline-flex" style={{ background: `${c1}20`, color: c1 }}>
              Early warning: +6hrs ahead
            </div>
          </div>
        </div>
      </div>
      {/* Vital indicators */}
      {[["Heart Rate","128 bpm","High"],["Temperature","38.9°C","Elevated"],["WBC Count","18.2 K/μL","Abnormal"],["Lactate","3.8 mmol/L","Critical"]].map(([lbl,val,st]) => {
        const col = st === "Critical" ? "#ef4444" : st === "Abnormal" ? c1 : "#f59e0b"
        return (
          <div key={lbl} className="flex items-center gap-2 rounded-lg px-2.5 py-1.5" style={{ background: `${c1}07` }}>
            <span className="text-[9px] text-slate-900 dark:text-slate-600 dark:text-white/50 flex-1">{lbl}</span>
            <span className="text-[9px] font-bold text-slate-900 dark:text-white">{val}</span>
            <span className="text-[8px] px-1.5 py-0.5 rounded-full" style={{ background: `${col}20`, color: col }}>{st}</span>
          </div>
        )
      })}
      {/* Model confidence */}
      <div className="rounded-lg p-2" style={{ background: `${c1}10` }}>
        <div className="text-[8px] text-slate-900 dark:text-slate-400 dark:text-white/30 mb-1.5">Model Ensemble</div>
        {[["XGBoost","78%"],["Random Forest","71%"],["Logistic Reg.","62%"]].map(([m,p]) => (
          <div key={m} className="flex items-center gap-2 mb-1">
            <span className="text-[8px] text-slate-900 dark:text-slate-500 dark:text-white/40 w-24">{m}</span>
            <div className="flex-1 h-1 rounded-full bg-slate-200 dark:bg-white/10 overflow-hidden">
              <div className="h-full rounded-full" style={{ width: p, background: c1 }} />
            </div>
            <span className="text-[8px] w-6 text-right" style={{ color: c1 }}>{p}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function DrivixMockup({ c1, c2 }: { c1: string; c2: string }) {
  return (
    <div className="w-full h-full p-4 flex flex-col gap-3 font-mono">
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-bold" style={{ color: c1 }}>Drivix · Vehicle Profile</span>
        <span className="text-[9px] px-2 py-0.5 rounded-full animate-pulse" style={{ background: `${c1}25`, color: c1 }}>● Connected</span>
      </div>
      
      {/* Vehicle Identity */}
      <div className="flex items-center gap-3 rounded-xl p-3" style={{ background: `${c1}10` }}>
        <div className="w-10 h-10 rounded-lg flex items-center justify-center text-xl bg-slate-100 dark:bg-white/5 border" style={{ borderColor: `${c1}30` }}><Car className="w-5 h-5 text-slate-900 dark:text-slate-700 dark:text-white/80" /></div>
        <div className="flex-1">
          <div className="text-xs font-bold text-slate-900 dark:text-white">Tesla Model 3</div>
          <div className="text-[8px] text-slate-900 dark:text-slate-600 dark:text-white/50">VIN: 5YJ3E1EA5KFXXXXXX</div>
        </div>
        <div className="text-right">
          <div className="text-[10px] font-bold" style={{ color: c1 }}>Health Score</div>
          <div className="text-sm font-black text-emerald-400">92/100</div>
        </div>
      </div>
      
      {/* Quick Stats Grid */}
      <div className="grid grid-cols-3 gap-2">
        {[
          { lbl: "Odometer", val: "42,500 km", icon: <Gauge className="w-3 h-3 text-slate-900 dark:text-slate-700 dark:text-white/80" /> },
          { lbl: "Fuel/Charge", val: "85%", icon: <Zap className="w-3 h-3 text-slate-900 dark:text-slate-700 dark:text-white/80" /> },
          { lbl: "Est. Value", val: "$35,000", icon: <Banknote className="w-3 h-3 text-slate-900 dark:text-slate-700 dark:text-white/80" /> },
        ].map(s => (
          <div key={s.lbl} className="rounded-xl p-2.5" style={{ background: `${c1}08` }}>
             <div className="flex items-center gap-1.5 mb-1">
              <div className="text-[10px]">{s.icon}</div>
              <span className="text-[7px] text-slate-900 dark:text-slate-500 dark:text-white/40">{s.lbl}</span>
            </div>
            <div className="text-[10px] font-bold text-slate-900 dark:text-white">{s.val}</div>
          </div>
        ))}
      </div>

      {/* Maintenance Timeline */}
      <div className="flex-1 rounded-xl p-3 border relative overflow-hidden" style={{ borderColor: `${c1}15`, background: `${c1}05` }}>
        <div className="text-[9px] text-slate-900 dark:text-slate-500 dark:text-white/40 mb-2">Service History Timeline</div>
        <div className="space-y-2">
          {[
            { date: "Oct 12, 2025", desc: "Routine Maintenance", status: "Completed", icon: <Check className="w-2.5 h-2.5" /> },
            { date: "Jan 05, 2026", desc: "Tire Replacement", status: "Completed", icon: <Check className="w-2.5 h-2.5" /> },
            { date: "Next Service", desc: "Brake Pad Inspection", status: "Due in 15 days", icon: <AlertTriangle className="w-2.5 h-2.5" /> },
          ].map((item, i) => (
             <div key={i} className="flex items-center gap-2 relative">
               <div className="w-px h-full absolute left-[7px] top-[14px] bg-slate-200 dark:bg-white/10" />
               <div className={`w-3.5 h-3.5 rounded-full flex items-center justify-center text-[6px] z-10 ${i === 2 ? 'bg-amber-500 text-black' : 'bg-emerald-500 text-slate-900 dark:text-white'}`}>
                 {item.icon}
               </div>
               <div className="flex-1 ml-1 rounded-md px-2 py-1.5" style={{ background: `${c1}10` }}>
                 <div className="text-[8px] font-bold text-slate-900 dark:text-white">{item.desc}</div>
                 <div className="flex justify-between items-center mt-0.5">
                   <span className="text-[7px] text-slate-900 dark:text-slate-400 dark:text-white/30">{item.date}</span>
                   <span className={`text-[7px] ${item.icon === '⚠' ? 'text-amber-400' : 'text-emerald-400'}`}>{item.status}</span>
                 </div>
               </div>
             </div>
          ))}
        </div>
      </div>
      
      {/* Expense Chart placeholder */}
      <div className="h-10 rounded-lg flex items-end gap-1 px-3 py-1.5" style={{ background: `${c1}08` }}>
         {[40, 60, 30, 80, 50, 90, 45, 70].map((h, i) => (
           <div key={i} className="flex-1 rounded-sm opacity-70" style={{ height: `${h}%`, background: i === 5 ? c1 : `${c1}50` }} />
         ))}
      </div>
    </div>
  )
}

function MetroMockup({ c1, c2 }: { c1: string; c2: string }) {
  return (
    <div className="w-full h-full p-4 flex flex-col gap-3 font-mono">
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-bold" style={{ color: c1 }}>Metro Command Center</span>
        <span className="text-[9px] px-2 py-0.5 rounded-full animate-pulse" style={{ background: `${c1}25`, color: c1 }}>● KMRL Live</span>
      </div>
      {/* KPI row */}
      <div className="grid grid-cols-4 gap-1.5">
        {[["22","Fleet Size"],["18","In Service"],["2","Standby"],["2","Maint."]].map(([v,l]) => (
          <div key={l} className="rounded-lg p-2 text-center" style={{ background: `${c1}10` }}>
            <div className="text-sm font-bold text-slate-900 dark:text-white">{v}</div>
            <div className="text-[7px] text-slate-900 dark:text-slate-500 dark:text-white/35 mt-0.5">{l}</div>
          </div>
        ))}
      </div>
      {/* Allocation table */}
      <div className="rounded-xl overflow-hidden border" style={{ borderColor: `${c1}20` }}>
        <div className="grid grid-cols-4 gap-px text-[8px] text-slate-900 dark:text-slate-500 dark:text-white/40 px-2 py-1.5" style={{ background: `${c1}10` }}>
          <span>Train ID</span><span>Status</span><span>Line</span><span>Action</span>
        </div>
        {[["TRN-001","In Service","Blue Line","Running","normal"],["TRN-004","Standby","—","Reserve","standby"],["TRN-009","Maintenance","—","Overhaul","maint"],["TRN-012","In Service","Green Line","Running","normal"],["TRN-017","Flagged","Blue Line","Inspect","warning"]].map(([id,status,line,action,type]) => (
          <div key={id} className="grid grid-cols-4 gap-px px-2 py-1.5 text-[8px]" style={{ background: `${c1}05` }}>
            <span className="font-bold" style={{ color: c1 }}>{id}</span>
            <span className={`flex items-center gap-1 ${type==="warning" ? "text-amber-400" : type==="maint" ? "text-purple-400" : type==="standby" ? "text-blue-400" : "text-emerald-400"}`}>
              {type === "warning" && <AlertTriangle className="w-2.5 h-2.5" />} {status}
            </span>
            <span className="text-slate-900 dark:text-slate-500 dark:text-white/35">{line}</span>
            <span className="text-slate-900 dark:text-slate-600 dark:text-white/50">{action}</span>
          </div>
        ))}
      </div>
      {/* Timeline bar */}
      <div className="rounded-xl p-2.5" style={{ background: `${c1}08` }}>
        <div className="text-[8px] text-slate-900 dark:text-slate-400 dark:text-white/30 mb-1.5">Today's Planning Timeline</div>
        <div className="flex items-center gap-1">
          {["05:00","06:00","08:00","10:00","14:00","18:00","22:00"].map((t,i) => (
            <div key={t} className="flex-1 flex flex-col items-center">
              <div className="w-full h-2 rounded-sm" style={{ background: i < 5 ? c1 : `${c1}30`, opacity: i < 5 ? 0.8 : 0.3 }} />
              <span className="text-[6px] text-slate-900 dark:text-slate-400 dark:text-white/25 mt-0.5">{t}</span>
            </div>
          ))}
        </div>
      </div>
      {/* Impact banner */}
      <div className="flex items-center justify-between rounded-xl p-2.5 border" style={{ borderColor: `${c1}25`, background: `${c1}10` }}>
        <div>
          <div className="text-[8px] text-slate-900 dark:text-slate-400 dark:text-white/30">Planning Time Reduction</div>
          <div className="flex items-baseline gap-1">
            <span className="text-[9px] text-slate-900 dark:text-slate-500 dark:text-white/40 line-through">2+ hours</span>
            <span className="text-[11px] font-black" style={{ color: c1 }}>→ {'<'}5 min</span>
          </div>
        </div>
        <div className="text-[22px] font-black" style={{ color: c1 }}>96%↓</div>
      </div>
    </div>
  )
}

function ProjectMockup({ type, c1, c2 }: { type: string; c1: string; c2: string }) {
  if (type === "inventory") return <InventoryMockup c1={c1} c2={c2} />
  if (type === "anpr") return <AnprMockup c1={c1} c2={c2} />
  if (type === "sepsis") return <SepsisMockup c1={c1} c2={c2} />
  if (type === "metro") return <MetroMockup c1={c1} c2={c2} />
  if (type === "drivix") return <DrivixMockup c1={c1} c2={c2} />
  return null
}

/* ─────────────────────────────────────────────────────────────
   STATUS BADGE CONFIG
───────────────────────────────────────────── */
const statusConfig: Record<string, string> = {
  Live: "bg-emerald-400/15 text-emerald-400 border-emerald-400/30",
  Beta: "bg-amber-400/15 text-amber-400 border-amber-400/30",
  Research: "bg-purple-400/15 text-purple-400 border-purple-400/30",
  Completed: "bg-blue-400/15 text-blue-400 border-blue-400/30",
  "SIH Project": "bg-emerald-400/15 text-emerald-400 border-emerald-400/30",
}

/* ─────────────────────────────────────────────────────────────
   SINGLE PROJECT PANEL
───────────────────────────────────────────── */
export function ProjectsGrid() {
  const [activeProject, setActiveProject] = useState(projects[0])
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, align: 'start' })
  const [selectedIndex, setSelectedIndex] = useState(0)

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
    setActiveProject(projects[emblaApi.selectedScrollSnap()])
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    onSelect()
    emblaApi.on('select', onSelect)
  }, [emblaApi, onSelect])

  return (
    <section id="projects" className="relative px-4 sm:px-8 lg:px-16 py-20 sm:py-32 overflow-hidden">
      {/* Intro */}
      <div className="relative mx-auto max-w-7xl mb-12 lg:mb-20">
        <div className="space-y-6 max-w-3xl">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-slate-900 dark:text-slate-400 dark:text-white/25">
            02 / Shipped Products
          </p>
          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tighter leading-[0.9]">
            <span className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-500 dark:from-white dark:via-white/80 dark:to-white/30 bg-clip-text text-transparent">
              Things I've
            </span>
            <br />
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Built & Shipped
            </span>
          </h2>
          <p className="text-lg text-slate-900 dark:text-slate-500 dark:text-white/35 max-w-xl leading-relaxed">
            Not portfolio pieces. Real end-to-end products spanning AI/ML, Computer Vision, IoT, and
            Healthcare — built with production-grade architecture from day one.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl">
        {/* Desktop Tab Navigation */}
        <div className="hidden lg:flex gap-2 overflow-x-auto pb-4 mb-12 scrollbar-none border-b border-border/50">
          {projects.map((p) => (
            <button
              key={p.id}
              onClick={() => setActiveProject(p)}
              className={`relative flex items-center gap-3 px-6 py-4 rounded-t-xl transition-all duration-300 font-mono text-sm uppercase tracking-wider whitespace-nowrap overflow-hidden
                ${activeProject.id === p.id ? 'text-primary' : 'text-slate-900 dark:text-slate-400 dark:text-white/40 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5'}
              `}
            >
              <p.icon className="w-4 h-4" />
              {p.name}
              {activeProject.id === p.id && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5"
                  style={{ background: `linear-gradient(90deg, ${p.color1}, ${p.color2})` }}
                  initial={false}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Desktop Content Area */}
        <div className="hidden lg:block min-h-[600px] relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeProject.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="grid grid-cols-12 gap-12"
            >
              {/* Left Column: Details */}
              <div className="col-span-5 flex flex-col space-y-8">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="font-mono text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-full border"
                      style={{ color: activeProject.accentColor, borderColor: `${activeProject.accentColor}35`, background: `${activeProject.accentColor}10` }}>
                      {activeProject.category}
                    </span>
                    <span className={`inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest px-2.5 py-1 rounded-full border ${statusConfig[activeProject.status]}`}>
                      <span className="w-1.5 h-1.5 rounded-full animate-pulse bg-current" />
                      {activeProject.status}
                    </span>
                  </div>
                  
                  <h3 className="text-5xl font-bold tracking-tight mb-3" style={{
                      background: `linear-gradient(135deg, #fff 0%, ${activeProject.lightColor} 100%)`,
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}>
                    {activeProject.name}
                  </h3>
                  <p className="text-xl font-medium" style={{ color: activeProject.lightColor }}>{activeProject.tagline}</p>
                </div>

                <p className="text-slate-900 dark:text-white/60 leading-relaxed text-lg">
                  {activeProject.story}
                </p>

                <div className="grid grid-cols-2 gap-3">
                  {activeProject.metrics.map((m, i) => {
                    const Icon = m.icon;
                    return (
                      <div key={m.label} className="group rounded-xl p-3 border bg-slate-100 dark:bg-white/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:bg-slate-200 dark:hover:bg-white/10"
                        style={{ borderColor: `${activeProject.accentColor}20` }}>
                        <div className="mb-2 flex items-center gap-2 text-slate-900 dark:text-white/70 group-hover:text-slate-900 dark:text-white transition-colors duration-300">
                          <Icon className="w-5 h-5" style={{ color: activeProject.lightColor }} />
                          <div className="font-bold text-sm" style={{ color: activeProject.lightColor }}>{m.value}</div>
                        </div>
                        <div className="font-mono text-[8px] uppercase tracking-wider text-slate-900 dark:text-slate-400 dark:text-white/40">{m.label}</div>
                      </div>
                    )
                  })}
                </div>

                <div>
                  <h4 className="font-mono text-[10px] uppercase tracking-widest text-slate-900 dark:text-slate-400 dark:text-white/40 mb-3">Tech Stack</h4>
                  <div className="flex flex-wrap gap-2">
                    {activeProject.tech.map(t => (
                      <span key={t} className="font-mono text-[10px] px-2.5 py-1 rounded-md border text-slate-900 dark:text-white"
                         style={{ background: `${activeProject.accentColor}10`, borderColor: `${activeProject.accentColor}22` }}>
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap gap-3 mt-auto pt-4">
                  {activeProject.demo && (
                    <a href={activeProject.demo} target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-mono text-sm font-medium text-black dark:text-white transition-all hover:scale-[1.03]"
                      style={{ background: `linear-gradient(135deg,${activeProject.color1},${activeProject.color2})`, boxShadow: `0 8px 32px ${activeProject.glowColor}` }}>
                      ↗ Live Demo
                    </a>
                  )}
                  <a href={activeProject.github} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-mono text-sm border transition-all hover:scale-[1.03]"
                    style={{ borderColor: `${activeProject.accentColor}38`, color: activeProject.lightColor, background: `${activeProject.accentColor}07` }}>
                    Source Code
                  </a>
                </div>
              </div>

              {/* Right Column: Visuals */}
              <div className="col-span-7 flex items-center justify-center relative">
                {/* Glow behind */}
                <div className="absolute inset-0 rounded-[2rem] blur-3xl opacity-20 pointer-events-none" 
                     style={{ background: `linear-gradient(135deg, ${activeProject.color1}, ${activeProject.color2})` }} />
                
                {/* Mockup Container */}
                <div className="relative w-full aspect-[4/3] rounded-2xl border overflow-hidden shadow-2xl flex flex-col"
                     style={{ background: "rgba(8,8,18,0.88)", borderColor: `${activeProject.accentColor}28`, backdropFilter: "blur(24px)" }}>
                  
                  {/* Browser Bar */}
                  <div className="flex items-center gap-2 px-4 py-3 border-b" style={{ borderColor: `${activeProject.accentColor}14`, background: `${activeProject.accentColor}05` }}>
                    <div className="flex gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                      <div className="w-2.5 h-2.5 rounded-full bg-amber-500/60" />
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/60" />
                    </div>
                    <div className="flex-1 mx-2 rounded px-3 py-1 font-mono text-[10px] text-center" style={{ background: `${activeProject.accentColor}08`, color: 'rgba(255,255,255,0.4)' }}>
                      {activeProject.id}.suriyaprakash.dev
                    </div>
                  </div>
                  
                  {/* Mockup Content */}
                  <div className="flex-1 overflow-hidden relative">
                    <ProjectMockup type={activeProject.mockupType} c1={activeProject.color1} c2={activeProject.color2} />
                  </div>

                  {/* Architecture flow pill */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center rounded-full border px-3 py-2 backdrop-blur-2xl"
                    style={{ background: "rgba(8,8,18,0.92)", borderColor: `${activeProject.accentColor}28`, boxShadow: `0 4px 24px ${activeProject.glowColor}` }}>
                    {activeProject.architecture.map((layer, i) => (
                      <div key={layer} className="flex items-center">
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full"
                          style={{ color: i === 0 ? activeProject.lightColor : "rgba(255,255,255,0.5)" }}>
                          {layer}
                        </span>
                        {i < activeProject.architecture.length - 1 && (
                          <span className="text-[9px] opacity-40 mx-0.5" style={{ color: activeProject.accentColor }}>›</span>
                        )}
                      </div>
                    ))}
                  </div>

                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Mobile Carousel Area */}
        <div className="block lg:hidden">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {projects.map((p) => (
                <div className="flex-[0_0_100%] min-w-0 pr-4" key={p.id}>
                  <div className="rounded-3xl border p-5 sm:p-7 flex flex-col gap-6"
                       style={{ background: `${p.accentColor}05`, borderColor: `${p.accentColor}20` }}>
                    
                    {/* Header */}
                    <div>
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-12 h-12 rounded-xl flex items-center justify-center border"
                          style={{
                            background: `linear-gradient(135deg,${p.color1}18,${p.color2}18)`,
                            borderColor: `${p.accentColor}28`,
                          }}>
                          <p.icon className="w-6 h-6 text-slate-900 dark:text-slate-800 dark:text-white/90" style={{ color: p.lightColor }} />
                        </div>
                        <div className="flex-1">
                          <span className="font-mono text-[9px] uppercase tracking-widest px-2 py-0.5 rounded-full border mb-1 inline-block"
                            style={{ color: p.accentColor, borderColor: `${p.accentColor}35`, background: `${p.accentColor}10` }}>
                            {p.category}
                          </span>
                          <span className={`inline-flex ml-2 items-center gap-1 text-[9px] font-mono uppercase tracking-widest px-2 py-0.5 rounded-full border ${statusConfig[p.status]}`}>
                            {p.status}
                          </span>
                        </div>
                      </div>
                      
                      <h3 className="text-3xl font-bold tracking-tight mb-2" style={{ color: p.lightColor }}>{p.name}</h3>
                      <p className="text-sm font-medium text-slate-900 dark:text-white/80">{p.tagline}</p>
                    </div>

                    {/* Mockup Mini */}
                    <div className="relative w-full aspect-[4/3] rounded-xl border overflow-hidden flex flex-col shadow-lg"
                         style={{ background: "rgba(8,8,18,0.88)", borderColor: `${p.accentColor}28` }}>
                      <div className="flex-1 relative overflow-hidden">
                        <ProjectMockup type={p.mockupType} c1={p.color1} c2={p.color2} />
                      </div>
                    </div>

                    {/* Story */}
                    <p className="text-sm text-slate-900 dark:text-white/60 leading-relaxed">
                      {p.story}
                    </p>

                    {/* Mobile Metrics */}
                    <div className="grid grid-cols-2 gap-2">
                       {p.metrics.map(m => (
                          <div key={m.label} className="rounded-lg p-2.5 text-center border" style={{ background: `${p.accentColor}08`, borderColor: `${p.accentColor}20` }}>
                            <div className="font-bold text-sm" style={{ color: p.lightColor }}>{m.value}</div>
                            <div className="font-mono text-[8px] uppercase tracking-wider text-slate-900 dark:text-slate-400 dark:text-white/40 mt-1">{m.label}</div>
                          </div>
                       ))}
                    </div>
                    
                    {/* Tech stack */}
                    <div className="flex flex-wrap gap-1.5">
                      {p.tech.map(t => (
                        <span key={t} className="font-mono text-[9px] px-2 py-0.5 rounded-md border text-slate-900 dark:text-white"
                           style={{ background: `${p.accentColor}10`, borderColor: `${p.accentColor}22` }}>
                          {t}
                        </span>
                      ))}
                    </div>

                    {/* CTA */}
                     <div className="flex flex-col gap-3 mt-2">
                        {p.demo && (
                          <a href={p.demo} target="_blank" rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl font-mono text-sm font-medium transition-all"
                            style={{ background: `linear-gradient(135deg,${p.color1},${p.color2})`, color: '#fff', boxShadow: `0 4px 16px ${p.glowColor}` }}>
                            Live Demo
                          </a>
                        )}
                        <a href={p.github} target="_blank" rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl font-mono text-sm border transition-all"
                          style={{ borderColor: `${p.accentColor}38`, color: p.lightColor, background: `${p.accentColor}07` }}>
                          Source Code
                        </a>
                      </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Carousel Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {projects.map((p, index) => (
              <button
                key={index}
                className="h-1.5 rounded-full transition-all duration-300"
                style={{ 
                  width: index === selectedIndex ? '24px' : '6px',
                  background: index === selectedIndex ? p.accentColor : `${p.accentColor}30`
                }}
                onClick={() => emblaApi?.scrollTo(index)}
              />
            ))}
          </div>
        </div>

      </div>

      {/* Footer CTA */}
      <div className="relative mx-auto max-w-7xl px-4 sm:px-8 lg:px-16 mt-20 pt-10 border-t border-border/30 text-center">
        <a href="https://github.com/suriyaprakash-25" target="_blank" rel="noopener noreferrer"
          id="github-profile-cta"
          className="group inline-flex items-center gap-3 rounded-2xl border px-8 py-4 font-mono text-sm transition-all duration-300 hover:scale-[1.04]"
          style={{ borderColor: "var(--border)", background: "rgba(255,255,255,0.02)", color: "rgba(255,255,255,0.4)" }}>
          <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden>
            <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844a9.59 9.59 0 012.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0022 12.017C22 6.484 17.522 2 12 2z" />
          </svg>
          Explore all repositories on GitHub
          <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
        </a>
      </div>
    </section>
  )
}
