import fs from "node:fs"
import path from "node:path"
import { profile } from "@/lib/data/profile"

/** True when a file exists under /public. Evaluated at build time for static pages. */
function publicFileExists(publicPath: string) {
  return fs.existsSync(path.join(process.cwd(), "public", publicPath.replace(/^\//, "")))
}

/** The profile photo path, or null while the placeholder should be shown. */
export function getProfilePhoto(): string | null {
  return publicFileExists(profile.photo) ? profile.photo : null
}

/** The résumé path, or null until `public/resume.pdf` is added. */
export function getResume(): string | null {
  return publicFileExists(profile.resume) ? profile.resume : null
}
