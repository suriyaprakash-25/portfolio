/** @type {import('next').NextConfig} */
const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), interest-cohort=()" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
]

const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  poweredByHeader: false,
  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders },
      {
        // open in the browser's PDF viewer, but save with a sensible name
        source: "/resume.pdf",
        headers: [
          { key: "Content-Disposition", value: 'inline; filename="Suriya-Prakash-R-M-Resume.pdf"' },
          { key: "Cache-Control", value: "public, max-age=3600, must-revalidate" },
        ],
      },
    ]
  },
}

export default nextConfig
