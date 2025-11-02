/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  experimental: {
    serverComponentsExternalPackages: ['framer-motion'],
  },
  output: 'standalone',
  trailingSlash: true,
  generateBuildId: async () => {
    return 'build-' + Date.now()
  },
}

module.exports = nextConfig