import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono, Space_Grotesk } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"

// Configure fonts with proper options
const geist = Geist({
  subsets: ["latin"],
  variable: '--font-geist',
  display: 'swap',
})
const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: '--font-geist-mono',
  display: 'swap',
})
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: '--font-space-grotesk',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://suriyaprakash.dev'),
  title: {
    default: "Suriya Prakash R M — Full Stack Developer & AI/ML Enthusiast",
    template: "%s | Suriya Prakash",
  },
  description:
    "Portfolio of Suriya Prakash R M — Full Stack Developer passionate about building scalable web apps, AI/ML systems, and DevOps automation. Explore my projects, skills, and journey.",
  keywords: ["Full Stack Developer", "Web Development", "Next.js", "React", "Python", "AI", "Machine Learning", "MLOps", "CI/CD", "DevOps", "JavaScript", "Digital Twin"],
  authors: [{ name: "Suriya Prakash R M", url: "https://github.com/suriyaprakash-25" }],
  creator: "Suriya Prakash R M",
  publisher: "Suriya Prakash R M",
  generator: "Next.js",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "Suriya Prakash R M — Full Stack Developer & AI/ML Enthusiast",
    description: "Portfolio of Suriya Prakash R M — Full Stack Developer building scalable web apps, AI/ML systems, and DevOps automation.",
    siteName: "Suriya Prakash",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Suriya Prakash R M — Full Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Suriya Prakash R M — Full Stack Developer & AI/ML Enthusiast",
    description: "Building scalable web apps, AI/ML systems, and DevOps automation.",
    creator: "@suriyaprakash25",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
  manifest: "/site.webmanifest",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${geist.variable} ${geistMono.variable} ${spaceGrotesk.variable}`}>
      <body className="font-sans antialiased" suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="dark" forcedTheme="dark" enableSystem={false} storageKey="theme-mode">
          {children}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
