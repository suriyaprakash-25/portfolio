import { profile } from "@/lib/data/profile"

export function SiteFooter() {
  return (
    <footer className="border-t border-border px-5 py-8 sm:px-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 text-sm text-subtle-foreground sm:flex-row">
        <p>
          © {new Date().getFullYear()} {profile.name}
        </p>
        <p className="font-mono text-xs">{profile.motto.join(" → ")}</p>
      </div>
    </footer>
  )
}
