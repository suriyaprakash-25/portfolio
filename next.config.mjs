/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  experimental: {
    allowedDevOrigins: ['192.168.56.1', 'localhost', '127.0.0.1'],
  },
}

export default nextConfig
