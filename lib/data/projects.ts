/**
 * Featured projects are the three on the résumé, told as case studies.
 * Lab projects come from the GitHub profile.
 */

export type ProjectLink = { label: string; href: string; kind: "live" | "code" }

export type Metric = { value: string; label: string }

export type FeaturedProject = {
  slug: string
  name: string
  subtitle: string
  summary: string
  date: string
  role: string
  stack: string[]
  links: ProjectLink[]
  /** Screenshot under /public/work. Projects without a live site show their architecture instead. */
  image?: string
  problem: string
  approach: string
  highlights: { title: string; body: string }[]
  architecture: string[]
  metrics: Metric[]
}

const GH = "https://github.com/suriyaprakash-25"

export const featuredProjects: FeaturedProject[] = [
  {
    slug: "driveportz",
    name: "DrivePortz",
    subtitle: "AI-powered mobility digital twin platform",
    summary:
      "A living digital identity for every vehicle — service, insurance, ownership and maintenance in one verified profile, with Gemini-powered diagnostics and a garage marketplace.",
    date: "Mar 2026",
    role: "Freelance project · Full-stack & GenAI",
    stack: ["React.js", "Node.js", "Express.js", "MongoDB Atlas", "Gemini API", "Cloudinary", "Google Maps API", "JWT"],
    links: [
      { label: "Live site", href: "https://www.driveportz.com", kind: "live" },
      { label: "Source", href: `${GH}/Digital-Twin`, kind: "code" },
    ],
    image: "/work/driveportz-v2.webp",
    problem:
      "A vehicle's history lives on paper bills, in service-centre systems and in its owner's memory. That makes it hard to track maintenance, prove service history, estimate resale value or know what a warning light actually means.",
    approach:
      "Give every vehicle a digital twin: a single trusted profile that grows with the vehicle through its whole life, shared securely between owners, garages and administrators — with AI turning raw diagnostic data into decisions.",
    highlights: [
      {
        title: "Vehicle Passport",
        body: "Delivered end-to-end vehicle lifecycle management (service, insurance, ownership, maintenance) on a full-stack MERN platform, anchored by a QR-based digital vehicle identity with Cloudinary-backed storage for verified records.",
      },
      {
        title: "Multi-role platform & garage marketplace",
        body: "Secured access for Users, Garages and Administrators with JWT/bcrypt authentication and OTP-based recovery, then extended the platform with a geolocation Garage Marketplace (Google Maps API) and an admin analytics dashboard for user, garage and revenue insights.",
      },
      {
        title: "Two GenAI features on Gemini",
        body: "An AI Vehicle Doctor that converts diagnostic codes into plain-language probable-cause and repair-cost estimates, and a multi-agent CoPilot assistant for personalised insights and emergency roadside assistance.",
      },
    ],
    architecture: ["React client", "Express REST API", "MongoDB Atlas", "Cloudinary · Maps", "Gemini agents"],
    metrics: [
      { value: "3", label: "user roles — owners, garages, admins" },
      { value: "2", label: "Gemini-powered AI features" },
      { value: "QR", label: "Vehicle Passport identity" },
    ],
  },
  {
    slug: "trackit",
    name: "TrackIt",
    subtitle: "Smart product inventory system (GenAI)",
    summary:
      "Track expiry, minimise waste — a smart inventory platform with QR-based product entry, automated expiry reminders and demand forecasting from sales history.",
    date: "Nov 2025",
    role: "Full-stack developer",
    stack: ["Next.js", "Tailwind CSS", "Shadcn UI", "Python", "Flask", "MongoDB"],
    links: [{ label: "Live site", href: "https://inv-gdg.vercel.app/home", kind: "live" }],
    image: "/work/trackit.webp",
    problem:
      "Manual stock-keeping is slow and blind to what comes next. Stock-outs lose sales, over-ordering ties up money, and products quietly expiring on the shelf eat straight into margins.",
    approach:
      "One platform for both sides of the counter: administrators manage stock with QR scanning and automated expiry tracking, customers see their purchases and spending, and predictive analytics turns past sales into purchasing decisions.",
    highlights: [
      {
        title: "Secure multi-user workflows",
        body: "Engineered a full-stack smart inventory platform with role-based access control for administrators and customers using Next.js, Flask and MongoDB, validated through manual UI testing across both roles.",
      },
      {
        title: "Less manual stock-monitoring",
        body: "Implemented QR-code and manual product entry with automated expiry-date tracking and reminders, so nothing expires unnoticed.",
      },
      {
        title: "Smarter purchasing decisions",
        body: "Built predictive analytics for demand forecasting and data-driven dashboards from historical sales data.",
      },
    ],
    architecture: ["Next.js UI", "Role-based auth", "Flask API", "Forecasting model", "MongoDB"],
    metrics: [
      { value: "2", label: "roles — admin & customer" },
      { value: "QR", label: "scan-to-add product entry" },
      { value: "Auto", label: "expiry tracking & reminders" },
    ],
  },
  {
    slug: "sepsissense",
    name: "SepsisSense",
    subtitle: "Sepsis detection & early-warning system",
    summary:
      "A recall-first machine learning system that flags ICU patients at risk of sepsis early — trained on 1.3M+ hourly ICU records from ~40,000 patients, with per-patient explanations.",
    date: "Feb 2025",
    role: "Machine learning engineer",
    stack: ["Python", "Pandas", "NumPy", "XGBoost", "SHAP", "Flask", "Streamlit"],
    links: [{ label: "Source", href: `${GH}/SepsisSense`, kind: "code" }],
    problem:
      "Sepsis is hard to recognise early — its symptoms overlap with many other conditions, and every hour of delay matters. A missed case costs far more than a false alarm, so a model that is merely 'accurate' isn't good enough.",
    approach:
      "Optimise for recall. Engineer clinically meaningful features from raw vitals, compare several models on a patient-level split, and explain every prediction so a clinician can see why a patient was flagged.",
    highlights: [
      {
        title: "Recall-optimised risk classification",
        body: "Built the classifier on the PhysioNet 2019 Challenge dataset — 1.3M+ hourly ICU records across ~40,000 patients — to enable timely clinical intervention for high-risk patients.",
      },
      {
        title: "Clinical feature engineering",
        body: "6-hour rolling vitals (HR, MAP, temperature, respiration, O₂ saturation) plus clinical signals such as Shock Index, qSOFA and lactate/creatinine trends. Achieved 90% classification accuracy, validated via train/test split analysis and manual review of borderline cases.",
      },
      {
        title: "Explainable decision support",
        body: "Deployed a real-time Streamlit and Flask interface with SHAP explanations, so every risk score comes with the vitals that drove it.",
      },
    ],
    architecture: ["PhysioNet .psv files", "Rolling + clinical features", "XGBoost classifier", "SHAP explainer", "Streamlit dashboard"],
    metrics: [
      { value: "90%", label: "classification accuracy" },
      { value: "1.3M+", label: "hourly ICU records" },
      { value: "~40K", label: "patients · PhysioNet 2019" },
    ],
  },
]

export type LabCategory = "AI & ML" | "Agents & LLMs" | "Full-Stack"

export type LabProject = {
  name: string
  description: string
  category: LabCategory
  stack: string[]
  links: ProjectLink[]
}

/** More work from GitHub — "the lab": experiments, hackathons and products. */
export const labProjects: LabProject[] = [
  {
    name: "BoreSakshi",
    description:
      "Know before you drill. A verified-outcome network and AI prediction engine that tells farmers where a borewell is likely to succeed, how deep, and with what yield — with calibrated uncertainty on every prediction.",
    category: "AI & ML",
    stack: ["React", "Node.js", "MongoDB", "FastAPI", "Geospatial ML"],
    links: [
      { label: "Live", href: "https://boresakshi.vercel.app", kind: "live" },
      { label: "Code", href: `${GH}/BoreSakshi`, kind: "code" },
    ],
  },
  {
    name: "AgentShelf",
    description:
      "Made by you, found by AI. Turns WhatsApp product photos and voice notes from independent sellers into an AI-discoverable MCP storefront with server-verified quotes and human-approved PayPal checkout.",
    category: "Agents & LLMs",
    stack: ["FastAPI", "PostgreSQL", "MCP", "PayPal Orders v2"],
    links: [{ label: "Code", href: `${GH}/AgentShelf`, kind: "code" }],
  },
  {
    name: "Redrob Ranker",
    description:
      "Hackathon ranking pipeline that picks the top 100 of 100,000 candidates in ~64 seconds on a single CPU — honeypot detection, structured JD-fit scoring and semantic similarity.",
    category: "AI & ML",
    stack: ["Python", "TF-IDF / SVD", "Hugging Face Spaces"],
    links: [
      { label: "Demo", href: "https://huggingface.co/spaces/Suriya-25/redrob-ranker", kind: "live" },
      { label: "Code", href: `${GH}/redrob-ranker`, kind: "code" },
    ],
  },
  {
    name: "AutoShield Edge AI",
    description:
      "In-vehicle CAN-bus intrusion detection: a hybrid rules + ML policy that catches DoS, fuzzing and RPM/gear spoofing, visualised on a live vehicle digital-twin dashboard.",
    category: "AI & ML",
    stack: ["Python", "Logistic Regression", "Edge AI", "Simulation"],
    links: [{ label: "Code", href: `${GH}/AutoShield-Edge-AI`, kind: "code" }],
  },
  {
    name: "AskMetrics",
    description:
      "Ask analytics questions in plain English. A local Qwen3 8B model writes SQL, which is validated against strict read-only safety checks before it ever touches the database.",
    category: "Agents & LLMs",
    stack: ["FastAPI", "React", "TypeScript", "Ollama"],
    links: [{ label: "Code", href: `${GH}/AskMetrics`, kind: "code" }],
  },
  {
    name: "CounterGuard",
    description:
      "A LangGraph multi-agent system that investigates marketplace listings for counterfeit and grey-market risk, collecting evidence and producing a 0–100 risk score.",
    category: "Agents & LLMs",
    stack: ["Python", "FastAPI", "LangGraph"],
    links: [{ label: "Code", href: `${GH}/counterguard-ai`, kind: "code" }],
  },
  {
    name: "Metro Induction Planner",
    description:
      "Smart India Hackathon build for Kochi Metro Rail: a decision-support system that allocates trains to service, standby and maintenance — cutting planning from 2+ hours to under 5 minutes.",
    category: "Full-Stack",
    stack: ["React", "Node.js", "Recharts", "jsPDF"],
    links: [
      { label: "Live", href: "https://sih-two-theta.vercel.app/", kind: "live" },
      { label: "Code", href: `${GH}/SIH`, kind: "code" },
    ],
  },
  {
    name: "MedFlow Guardian",
    description:
      "Patient-controlled medical records: hospitals upload reports, patients grant time-limited access to other doctors, and every upload, view and revocation is audited.",
    category: "Full-Stack",
    stack: ["FastAPI", "PostgreSQL", "React", "WebSockets"],
    links: [{ label: "Code", href: `${GH}/medflow-guardian`, kind: "code" }],
  },
  {
    name: "STATUTEK",
    description:
      "Compliance meets technology — a business compliance and documentation platform helping startups and MSMEs with registrations, compliance and related services.",
    category: "Full-Stack",
    stack: ["React", "Tailwind CSS", "Framer Motion"],
    links: [
      { label: "Live", href: "https://statutek.vercel.app/", kind: "live" },
      { label: "Code", href: `${GH}/STATUTEK`, kind: "code" },
    ],
  },
  {
    name: "CrowdFundX",
    description:
      "A MERN community fundraising platform — campaign management, JWT authentication, Razorpay donations and dedicated user and admin dashboards.",
    category: "Full-Stack",
    stack: ["React", "Node.js", "MongoDB", "Razorpay"],
    links: [
      { label: "Live", href: "https://crowd-fund-x-psi.vercel.app/", kind: "live" },
      { label: "Code", href: `${GH}/CrowdFundX`, kind: "code" },
    ],
  },
  {
    name: "Shorts & Reels MCP Server",
    description:
      "A Model Context Protocol server that lets AI agents publish videos to YouTube Shorts and Instagram Reels, with OAuth 2.0, token refresh and file validation.",
    category: "Agents & LLMs",
    stack: ["Python", "FastAPI", "MCP", "OAuth 2.0"],
    links: [{ label: "Code", href: `${GH}/mcp`, kind: "code" }],
  },
]

export function getProject(slug: string) {
  return featuredProjects.find((p) => p.slug === slug)
}
