/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: [
      'localhost',
      'cravings-fix-food-images.s3.amazonaws.com',
      'cravings-fix-banner-images.s3.amazonaws.com',
    ],
  },
  // output: 'standalone'
}

module.exports = nextConfig
