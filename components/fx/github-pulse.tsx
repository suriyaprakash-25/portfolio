"use client"

import { useEffect, useState } from "react"
import { GitCommitHorizontal } from "lucide-react"
import { relativeTime, type LatestPush } from "@/lib/github"

/** "Last commit 2 days ago · Digital-Twin" — proof the work is alive. Time refreshes in the browser. */
export function GithubPulse({ push, serverLabel }: { push: LatestPush; serverLabel: string }) {
  const [label, setLabel] = useState(serverLabel)
  useEffect(() => setLabel(relativeTime(push.at)), [push.at])

  return (
    <a
      href={push.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-3 py-1.5 font-mono text-[11px] text-muted-foreground backdrop-blur transition-colors hover:border-accent/60 hover:text-foreground"
    >
      <GitCommitHorizontal className="h-3.5 w-3.5 text-accent transition-transform duration-500 group-hover:rotate-180" />
      <span>
        last commit <span className="text-foreground">{label}</span>
        <span className="text-subtle-foreground"> · </span>
        <span className="text-accent">{push.repo}</span>
      </span>
    </a>
  )
}
