import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function NotFound() {
  return (
    <section className="flex min-h-[80vh] items-center justify-center px-5 pt-16">
      <div className="text-center">
        <p className="font-mono text-sm text-accent">404</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">This page broke.</h1>
        <p className="mx-auto mt-4 max-w-md text-muted-foreground">
          Build → Break → Learn. The page you were looking for doesn't exist — but the work does.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background hover:opacity-90"
        >
          <ArrowLeft className="h-4 w-4" /> Back home
        </Link>
      </div>
    </section>
  )
}
