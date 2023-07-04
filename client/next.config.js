/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['parsefiles.back4app.com', 'cdn.glitch.global'],
  },
}

module.exports = nextConfig
