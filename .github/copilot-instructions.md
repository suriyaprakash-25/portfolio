# AI agent notes — Suriya Prakash R M portfolio

Personal portfolio built with Next.js 16 (App Router), React 19, TypeScript and Tailwind CSS v4.

## Where things live
- `lib/data/profile.ts` — name, headline, intro, links, photo/résumé paths, hero stats, about copy.
- `lib/data/projects.ts` — featured case studies (`/work/[slug]`) and "The lab" project grid.
- `lib/data/career.ts` — experience, education, skills, achievements, coding profiles, certifications.
- `components/` — one component per homepage section; `section.tsx` holds the shared section shell.
- `app/` — layout, home page, `work/[slug]` case studies, OG image, icons, sitemap, robots, manifest.

## Rules
- Content must stay consistent with the résumé and the GitHub profile README. Never invent metrics.
- Edit content in `lib/data/*`, not inside components.
- Design tokens live in `app/globals.css` (`:root` = light, `.dark` = dark). Use token classes
  (`bg-card`, `text-muted-foreground`, `text-accent`, …), not raw colours.
- Keep components server components unless they need state (header, theme toggle, lab filter, copy button).
- Scroll reveals are CSS-only (`components/reveal.tsx` + `.reveal` in globals.css) — content must never
  depend on JavaScript to become visible.

## Commands
- `npm run dev` · `npm run build` · `npm run typecheck`
