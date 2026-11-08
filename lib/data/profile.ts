/**
 * Single source of truth for who you are.
 * Everything here mirrors the résumé and the GitHub profile README so the
 * three tell the same story. Edit here — every section of the site updates.
 */

export const profile = {
  name: "Suriya Prakash R M",
  firstName: "Suriya",
  initials: "SP",

  /**
   * PROFILE PHOTO — drop your picture at `public/profile.jpg`
   * (square or 4:5 portrait, at least 800px wide). Until the file exists the
   * site shows an "SP" monogram in its place. Change the path if you use a
   * different file name or format (e.g. "/profile.webp").
   */
  photo: "/profile.jpg",

  /**
   * RÉSUMÉ — drop your latest résumé at `public/resume.pdf`.
   * The "Résumé" buttons appear automatically once the file exists.
   */
  resume: "/resume.pdf",

  // Same headline and tagline as the GitHub profile README.
  areas: ["AI", "Software Engineering", "Cloud", "Products"],
  headline: "Building intelligent systems, scalable software and real-world products.",
  intro:
    "I'm Suriya — a B.Tech Artificial Intelligence & Data Science student at Sri Eshwar College of Engineering, Coimbatore. I learn best by building: when a technology catches my attention, I prototype it, break it, figure out why it broke, and ship it.",
  /** Hero intro without the "I'm Suriya" opener (the headline already says hi). */
  introShort:
    "A B.Tech Artificial Intelligence & Data Science student at Sri Eshwar College of Engineering, Coimbatore. I learn best by building: when a technology catches my attention, I prototype it, break it, figure out why it broke, and ship it.",
  motto: ["Curiosity", "Experiment", "Build", "Break", "Learn", "Ship"],

  /**
   * Roles typed out in the hero. Keep each ≤ 20 characters so it fits on one line.
   * `typo` makes the typewriter mistype and correct itself — build, break, debug.
   */
  roles: [
    { text: "AI/ML Engineer" },
    { text: "Full-Stack Developer", typo: { after: "Full-Stack Dev", wrong: "lo" } },
    { text: "Software Engineer" },
    { text: "Cloud & DevOps" },
    { text: "Product Builder" },
    { text: "Problem Solver" },
    { text: "Chronically Curious" },
  ],

  location: "Coimbatore, India",
  availability: "Open to internships, collaborations & opportunities",

  email: "suriyaprakashrm25@gmail.com",
  siteUrl: "https://www.suriyaprakashrm.dev",

  links: {
    github: "https://github.com/suriyaprakash-25",
    linkedin: "https://www.linkedin.com/in/suriyaprakash-r-m-64133a327/",
    leetcode: "https://leetcode.com/u/suriyaprakashrm/",
    skillrack:
      "https://www.skillrack.com/faces/resume.xhtml?id=514570&key=312bab7d9cd41f0e6d27c5892e6e3c551b296ccc",
    selfIntro: "https://drive.google.com/file/d/1_6WYHCTruZ3H99-XRGOhESM6wSX5qC-K/view?usp=drive_link",
  },
} as const

/** Proof points shown under the hero — all taken from the résumé. */
export const heroStats = [
  { value: "Top 108", label: "of 7,000+ teams · Tata Innovent" },
  { value: "1613", label: "LeetCode contest rating" },
  { value: "1,100+", label: "problems solved on SkillRack" },
  { value: "8.5", label: "CGPA · B.Tech AI & DS" },
] as const

/** "Who I am" — adapted from the GitHub README so the voice matches. */
export const about = {
  paragraphs: [
    // **double asterisks** mark phrases that get a scroll-drawn highlighter
    "I enjoy building at the intersection of **AI, software engineering, data, cloud infrastructure and product development**.",
    "**I learn best by building.** If a technology catches my attention, I usually end up experimenting with it, building a prototype, breaking it, figuring out why it broke, and trying again. I don't want to just learn how technology works — **I want to build with it.**",
    "I don't follow a fixed technology stack. **I follow interesting problems.** Most of my projects start with a simple question:",
  ],
  question: "What happens if I try this?",
  areas: [
    "Artificial Intelligence & Machine Learning",
    "Software Engineering & Full-Stack Development",
    "Cloud & DevOps",
    "Data & Intelligent Systems",
    "Startups, SaaS & Product Development",
  ],
  currentlyLearning: [
    "System Design & Scalable Architecture",
    "Distributed Systems",
    "Machine Learning Engineering",
    "Generative AI & LLM Applications",
  ],
} as const

/**
 * "The loop" — how I build, with a real example from my own repos for every step.
 * Every story here is backed by a project README; keep it that way.
 */
export const buildLoop = [
  {
    step: "Idea",
    line: "Start with a real question.",
    project: "BoreSakshi",
    story:
      "Could a farmer know where a borewell will succeed — how deep, and with what yield — before spending lakhs on drilling? That one question became a verified-outcome network and an AI prediction engine.",
    href: "https://github.com/suriyaprakash-25/BoreSakshi",
  },
  {
    step: "Explore",
    line: "Go where the question leads.",
    project: "AgentShelf",
    story:
      "What if AI shopping agents could discover and buy from independent sellers who only have WhatsApp photos? I explored the Model Context Protocol and built an AI-discoverable storefront with human-approved PayPal checkout.",
    href: "https://github.com/suriyaprakash-25/AgentShelf",
  },
  {
    step: "Experiment",
    line: "Measure before you commit.",
    project: "Redrob Ranker",
    story:
      "I tried local LLM re-ranking with Ollama, then did the maths: 100,000 candidates × 100 ms–2 s per call is 2.8–55 hours against a 300-second budget. The experiment said no — so the deterministic pipeline shipped instead.",
    href: "https://github.com/suriyaprakash-25/redrob-ranker",
  },
  {
    step: "Build",
    line: "Make it real, end to end.",
    project: "DrivePortz",
    story:
      "A full MERN platform built end to end — Vehicle Passport, a geolocation garage marketplace, admin analytics, and two Gemini-powered AI features.",
    href: "/work/driveportz",
  },
  {
    step: "Break",
    line: "Break it on purpose.",
    project: "AutoShield Edge AI",
    story:
      "I attacked a simulated vehicle CAN bus with DoS, fuzzing, RPM spoofing and gear spoofing — on purpose — so every attack had to be caught by real detection logic, not a dashboard animation.",
    href: "https://github.com/suriyaprakash-25/AutoShield-Edge-AI",
  },
  {
    step: "Debug",
    line: "Find out why it broke.",
    project: "Redrob Ranker",
    story:
      "Every component was validated against the real 100,000-candidate dataset. Several real bugs surfaced — each one found, fixed and written up in a validation log.",
    href: "https://github.com/suriyaprakash-25/redrob-ranker",
  },
  {
    step: "Learn",
    line: "Keep the lesson.",
    project: "SepsisSense",
    story:
      "In healthcare, 'accurate' isn't enough: missing a sepsis case costs far more than a false alarm. So the model is tuned for recall, and every prediction explains itself.",
    href: "/work/sepsissense",
  },
  {
    step: "Ship",
    line: "Get it off the laptop.",
    project: "Live in production",
    story:
      "DrivePortz, TrackIt, BoreSakshi, STATUTEK and CrowdFundX are all live. An idea only counts once someone else can use it.",
    href: "/#work",
  },
] as const
