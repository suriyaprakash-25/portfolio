/** Experience, education, skills and recognition — mirrors the résumé. */

export type Experience = {
  role: string
  org: string
  type: string
  period: string
  points: string[]
  stack: string[]
}

export const experience: Experience[] = [
  {
    role: "Mentee · Career Academy Tech Mentorship Program",
    org: "PayPal",
    type: "Industry mentorship",
    period: "Completed Sep 2026",
    points: [
      "Selected to participate in the PayPal Mentorship Program, gaining industry mentorship from experienced software engineers with exposure to modern development practices, career strategies and real-world engineering workflows.",
      "Awarded a Certificate of Appreciation by PayPal for successful participation in the Career Academy program.",
    ],
    stack: [],
  },
  {
    role: "Freelance Full-Stack & GenAI Developer",
    org: "DrivePortz",
    type: "Freelance",
    period: "Mar 2026",
    points: [
      "Built a mobility digital-twin platform end to end — Vehicle Passport, garage marketplace, admin analytics and two Gemini-powered AI features.",
    ],
    stack: ["MERN", "Gemini API", "Google Maps API"],
  },
  {
    role: "MERN Stack Developer Intern",
    org: "Infoziant",
    type: "Internship",
    period: "Dec 2025 – Jan 2026",
    points: [
      "Improved development velocity and cut UI rework by engineering 15+ reusable React components, applying object-oriented, component-based design principles across a shared codebase in a fast-paced, self-directed onboarding.",
      "Strengthened reliability and performance under concurrent multi-user load by designing and integrating RESTful APIs (Node.js/Express.js) with optimised MongoDB schemas, validated through structured manual test cases in Postman ahead of each deployment.",
      "Reduced integration risk in an agile-style team by building concurrent, asynchronous multi-user API endpoints, using peer feedback and iterative code review to strengthen CRUD reliability.",
    ],
    stack: ["React", "Node.js", "Express.js", "MongoDB", "Postman"],
  },
]

export const education = [
  {
    school: "Sri Eshwar College of Engineering",
    degree: "B.Tech, Artificial Intelligence & Data Science",
    score: "CGPA 8.5 / 10",
    period: "2024 – 2028",
  },
  {
    school: "Oxaliss International CBSE School",
    degree: "Higher Secondary (HSC)",
    score: "92.2%",
    period: "2023 – 2024",
  },
  {
    school: "Oxaliss International CBSE School",
    degree: "Secondary (SSLC)",
    score: "96.4%",
    period: "2021 – 2022",
  },
] as const

export const skillGroups = [
  {
    title: "Languages",
    items: ["C", "C++", "Python", "Java", "JavaScript", "TypeScript", "SQL"],
  },
  {
    title: "Frameworks",
    items: ["React.js", "Redux", "Next.js", "React Native", "Tailwind CSS", "Node.js", "Express.js", "FastAPI", "Flask", "REST APIs"],
  },
  {
    title: "AI / GenAI",
    items: [
      "Machine Learning",
      "Predictive Analytics",
      "Feature Engineering",
      "Prompt Engineering",
      "Gemini API",
      "XGBoost",
      "scikit-learn",
      "Pandas",
      "NumPy",
      "LangGraph",
      "MCP",
    ],
  },
  {
    title: "Databases & Tools",
    items: ["PostgreSQL", "MongoDB", "Docker", "Kubernetes", "Kafka", "GitHub Actions", "Git", "Vercel", "Postman", "Figma"],
  },
  {
    title: "CS Core",
    items: [
      "Data Structures & Algorithms",
      "Object-Oriented Design",
      "Algorithm Complexity Analysis",
      "Operating Systems",
      "Computer Networks",
    ],
  },
] as const

export type Achievement = {
  title: string
  org: string
  detail: string
  tag: string
  highlight?: boolean
}

export const achievements: Achievement[] = [
  {
    title: "PayPal Mentorship Program",
    org: "PayPal · Career Academy · 2026",
    detail: "Selected for industry mentorship from experienced software engineers — modern development practices, career strategy and real-world engineering workflows.",
    tag: "Selected",
    highlight: true,
  },
  {
    title: "Tata Innovent National Hackathon",
    org: "Tata",
    detail: "One of only 108 projects selected from more than 7,000 submissions nationwide.",
    tag: "Top 108 / 7,000+",
    highlight: true,
  },
  {
    title: "FLY TO SINGAPORE 12.0 Qualifier",
    org: "RYLA 54.0",
    detail: "Position-based selection for entrepreneurship, business planning, presentation and leadership.",
    tag: "Qualifier",
    highlight: true,
  },
  {
    title: "InnoHack Hackathon",
    org: "VIT University",
    detail: "Reached the finals with an innovative technology solution presented to industry experts.",
    tag: "Finalist",
  },
  {
    title: "Creatathon 2025",
    org: "Engineering innovation challenge",
    detail: "Recognised for standout creativity, problem-solving and engineering impact.",
    tag: "2nd Prize",
  },
  {
    title: "Freshathon 2025",
    org: "Inter-college hackathon",
    detail: "Runner-up for an innovative technical solution built under strict time constraints.",
    tag: "2nd Prize",
  },
  {
    title: "Web Design Showdown 2025",
    org: "Inter-college competition",
    detail: "Awarded for excellence in UI/UX design and front-end development.",
    tag: "2nd Prize",
  },
]

export const codingProfiles = [
  { platform: "LeetCode", stat: "250+", detail: "problems · 1613 contest rating", href: "https://leetcode.com/u/suriyaprakashrm/" },
  {
    platform: "SkillRack",
    stat: "1,100+",
    detail: "problems · 310+ bronze medals",
    href: "https://www.skillrack.com/faces/resume.xhtml?id=514570&key=312bab7d9cd41f0e6d27c5892e6e3c551b296ccc",
  },
  { platform: "CodeChef", stat: "350+", detail: "competitive programming problems", href: null },
] as const

export const certifications = [
  { name: "Career Academy Tech Mentorship Program — Certificate of Appreciation", issuer: "PayPal", year: "2026" },
  { name: "Design Thinking – A Primer", issuer: "NPTEL", year: "2026" },
  { name: "Artificial Intelligence & Machine Learning", issuer: "Corizo", year: "2025" },
  { name: "C and C++ Programming", issuer: "IIT Bombay", year: "2025" },
  { name: "Mastering Data Structures & Algorithms in C and C++", issuer: "Udemy", year: "2025" },
  { name: "Python Programming", issuer: "G-TEC", year: "2024" },
] as const
