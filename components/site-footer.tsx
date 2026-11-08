import { ArrowUp } from "lucide-react"
import { profile } from "@/lib/data/profile"

export function SiteFooter() {
  return (
    <footer className="border-t border-border px-5 py-8 sm:px-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 text-sm text-subtle-foreground sm:flex-row">
        <p>
          © {new Date().getFullYear()} {profile.name} · Designed &amp; built by me.
        </p>
        <p className="hidden font-mono text-xs md:block">
          psst — press <kbd className="rounded border border-border px-1.5 py-0.5 text-[10px]">Ctrl</kbd>{" "}
          <kbd className="rounded border border-border px-1.5 py-0.5 text-[10px]">K</kbd> for a terminal
        </p>
        <a href="#main" className="group inline-flex items-center gap-1.5 hover:text-foreground">
          Back to top <ArrowUp className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5" />
        </a>
      </div>
    </footer>
  )
}
