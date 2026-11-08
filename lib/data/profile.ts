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
  motto: ["Curiosity", "Experiment", "Build", "Break", "Learn", "Ship"],

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
    "I enjoy building at the intersection of AI, software engineering, data, cloud infrastructure and product development.",
    "I learn best by building. If a technology catches my attention, I usually end up experimenting with it, building a prototype, breaking it, figuring out why it broke, and trying again. I don't want to just learn how technology works — I want to build with it.",
    "I don't follow a fixed technology stack. I follow interesting problems. Most of my projects start with a simple question:",
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
