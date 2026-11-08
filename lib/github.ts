import { profile } from "@/lib/data/profile"

export type LatestPush = { repo: string; url: string; at: string }

const USER = "suriyaprakash-25"

/**
 * Most recent public push on GitHub, refreshed at most once an hour (ISR).
 * Returns null on any failure so the site never depends on GitHub being up.
 */
export async function getLatestPush(): Promise<LatestPush | null> {
  try {
    const res = await fetch(`https://api.github.com/users/${USER}/events/public?per_page=50`, {
      headers: { Accept: "application/vnd.github+json", "User-Agent": profile.siteUrl },
      next: { revalidate: 3600 },
    })
    if (!res.ok) return null
    const events: { type: string; repo: { name: string }; created_at: string }[] = await res.json()
    // skip the profile-README repo — it's not "work"
    const push = events.find((e) => e.type === "PushEvent" && e.repo.name !== `${USER}/${USER}`)
    if (!push) return null
    return { repo: push.repo.name.split("/")[1], url: `https://github.com/${push.repo.name}`, at: push.created_at }
  } catch {
    return null
  }
}

export function relativeTime(iso: string, now = Date.now()) {
  const mins = Math.max(0, Math.round((now - new Date(iso).getTime()) / 60000))
  if (mins < 60) return mins <= 1 ? "just now" : `${mins} min ago`
  const hours = Math.round(mins / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.round(hours / 24)
  if (days === 1) return "yesterday"
  if (days < 30) return `${days} days ago`
  const months = Math.round(days / 30)
  return months <= 1 ? "a month ago" : `${months} months ago`
}
