/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ['localhost', 'parsefiles.back4app.com', 'cdn.glitch.global'],
  },
}

module.exports = nextConfig
