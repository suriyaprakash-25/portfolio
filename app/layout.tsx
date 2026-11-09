import type { Metadata, Viewport } from "next"
import type { ReactNode } from "react"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "@/components/theme-provider"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { DeferredFx } from "@/components/fx/deferred-fx"
import { getProfilePhoto, getResume } from "@/lib/assets"
import { profile } from "@/lib/data/profile"
import "./globals.css"

const geist = Geist({ subsets: ["latin"], variable: "--font-geist", display: "swap" })
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono", display: "swap" })

const title = `${profile.name} — AI & Software Engineer`
const description = `${profile.headline} B.Tech AI & Data Science student building AI systems, full-stack products and cloud infrastructure.`

export const metadata: Metadata = {
  metadataBase: new URL(profile.siteUrl),
  title: { default: title, template: `%s — ${profile.name}` },
  description,
  applicationName: profile.name,
  authors: [{ name: profile.name, url: profile.siteUrl }],
  creator: profile.name,
  keywords: [
    profile.name,
    "Suriya Prakash",
    "AI engineer",
    "software engineer",
    "full-stack developer",
    "machine learning",
    "GenAI",
    "Next.js",
    "MERN",
    "Coimbatore",
    "portfolio",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "/",
    siteName: profile.name,
    title,
    description,
  },
  twitter: { card: "summary_large_image", title, description },
  robots: { index: true, follow: true },
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f7f9fc" },
    { media: "(prefers-color-scheme: dark)", color: "#12151b" },
  ],
}

export default function RootLayout({ children }: { children: ReactNode }) {
  const photo = getProfilePhoto()
  const resume = getResume()

  return (
    <html lang="en" suppressHydrationWarning className={`${geist.variable} ${geistMono.variable}`}>
      <body className="font-sans">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
          <div className="scroll-progress" aria-hidden />
          <SiteHeader photo={photo} resume={resume} />
          <main id="main">{children}</main>
          <SiteFooter />
          <DeferredFx resume={resume} />
        </ThemeProvider>
        {/* Vercel Analytics only exists on Vercel; elsewhere its script would 404 */}
        {process.env.VERCEL && <Analytics />}
      </body>
    </html>
  )
}
