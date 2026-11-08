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
