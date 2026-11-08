# suriyaprakashrm.dev

Personal portfolio of **Suriya Prakash R M** — building intelligent systems, scalable software and real-world products.

Built with Next.js 16, React 19, TypeScript and Tailwind CSS v4. Fully static, light/dark themes, case-study pages, generated social preview image.

## Run locally

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
```

## Add your photo and résumé

| What | Where | Notes |
| --- | --- | --- |
| Profile photo | `public/profile.jpg` | 4:5 portrait or square, ≥ 800px wide. Until it exists an "SP" monogram is shown. |
| Résumé | `public/resume.pdf` | "Résumé" buttons appear automatically once the file exists. |

Rebuild (or restart `npm run dev`) after adding either file.

## Edit content

All content lives in `lib/data/` — keep it in sync with the résumé and GitHub profile:

- `profile.ts` — headline, intro, links, hero stats, about section
- `projects.ts` — featured case studies and "The lab" grid
- `career.ts` — experience, education, skills, achievements, certifications

Project screenshots are in `public/work/`.

## Interactions & easter eggs

- **Hero field** — move the cursor over the hero; click anywhere to send a ripple.
- **"What happens if I try this?"** — each click runs a different experiment: Blueprint (X-ray of the components), Break (and rebuild), Gravity, and a hidden terminal.
- **Terminal** — press `Ctrl/⌘ + K` (or the terminal icon in the nav). Try `help`, `ls`, `open driveportz`, `loop`, `sudo hire suriya`.
- **The loop** — the "How I build" orbit in About; every step links to a real project story (`buildLoop` in `lib/data/profile.ts`).
- **Typewriter roles** — edit `roles` in `lib/data/profile.ts` (keep each ≤ 20 characters; `typo` makes it mistype and fix itself).
- **Live GitHub pulse** — "last commit … · repo" in the hero, refreshed hourly from the GitHub API (hidden if GitHub is unreachable).
- **Skill usage** — hover a skill chip to see which projects use it; computed from project stacks, so it updates itself.
- **Konami code** (↑ ↑ ↓ ↓ ← → ← → B A) or the terminal's `ship` command → confetti.

All motion respects `prefers-reduced-motion`, and every section stays readable with JavaScript disabled.
