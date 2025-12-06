/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // Ensure server route handlers can load native Node packages like 'square'
    serverComponentsExternalPackages: ['square'],
  },
  images: {
    domains: ['images.unsplash.com', 'education.ti.com'],
    unoptimized: true,
  },
}

module.exports = nextConfig
