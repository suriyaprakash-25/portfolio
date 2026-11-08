import { profile } from "@/lib/data/profile"
import { cn } from "@/lib/utils"

/**
 * Giant outlined motto that slides sideways as you scroll (CSS scroll-driven).
 * Two rows move in opposite directions; "Break" is outlined red and glitches on hover.
 */
export function MottoBand() {
  const words = [...profile.motto, ...profile.motto, ...profile.motto]
  // second row starts three words later so the rows never line up word-for-word
  const shifted = [...words.slice(3), ...words.slice(0, 3)]
  const row = (reverse: boolean) => (
    <div className={cn("band-row flex w-max items-center whitespace-nowrap", reverse && "band-row-rev")}>
      {(reverse ? shifted : words).map((w, i) => (
        <span key={i} className="flex items-center">
          <span className={cn("band-word", w === "Break" && "band-break")}>{w}</span>
          <span className="band-word mx-[0.35em] !text-transparent opacity-60" aria-hidden>
            →
          </span>
        </span>
      ))}
    </div>
  )

  return (
    <section
      data-component="MottoBand"
      aria-label={`How I work: ${profile.motto.join(", then ")}`}
      className="relative overflow-hidden border-y border-border py-8 sm:py-12"
    >
      <div aria-hidden className="flex flex-col gap-2 sm:gap-4">
        {row(false)}
        {row(true)}
      </div>
    </section>
  )
}
