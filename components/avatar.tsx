import Image from "next/image"
import { profile } from "@/lib/data/profile"
import { cn } from "@/lib/utils"

/**
 * Profile picture with a built-in placeholder.
 *
 * ┌──────────────────────────────────────────────────────────┐
 * │  TO ADD YOUR PHOTO: save it as  public/profile.jpg       │
 * │  (or change `photo` in lib/data/profile.ts).             │
 * │  Until then an "SP" monogram is shown in its place.      │
 * └──────────────────────────────────────────────────────────┘
 */
export function Avatar({
  photo,
  size,
  className,
  priority,
}: {
  photo: string | null
  size: "nav" | "hero"
  className?: string
  priority?: boolean
}) {
  const isHero = size === "hero"
  const dims = isHero ? "aspect-[4/5] w-full" : "h-8 w-8"

  if (photo) {
    return (
      <div className={cn("relative overflow-hidden bg-muted", isHero ? "rounded-3xl" : "rounded-full", dims, className)}>
        <Image
          src={photo}
          alt={`Portrait of ${profile.name}`}
          fill
          priority={priority}
          sizes={isHero ? "(min-width: 1024px) 360px, 70vw" : "32px"}
          className="object-cover"
        />
      </div>
    )
  }

  // Placeholder — monogram until a real photo is added.
  return (
    <div
      role="img"
      aria-label={`${profile.name} — photo coming soon`}
      data-photo-placeholder
      className={cn(
        "relative flex items-center justify-center overflow-hidden border border-accent/30 bg-gradient-to-br from-accent/20 via-accent-soft to-transparent font-mono font-semibold text-accent",
        isHero ? "rounded-3xl text-6xl sm:text-7xl" : "rounded-full text-[11px]",
        dims,
        className,
      )}
    >
      {isHero && <div className="bg-grid absolute inset-0 opacity-60" aria-hidden />}
      <span className="relative">{profile.initials}</span>
      {isHero && process.env.NODE_ENV === "development" && (
        <span className="absolute inset-x-4 bottom-4 rounded-lg bg-background/80 px-3 py-2 text-center text-[11px] font-normal text-muted-foreground backdrop-blur">
          Add your photo at <code className="text-accent">public/profile.jpg</code>
        </span>
      )}
    </div>
  )
}
