// frontend/next.config.mjs
// Configures the standalone Next.js build used by the local HomeScope prototype.
// It does not suppress TypeScript failures or define deployment infrastructure.

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: true,
  },
  // Enable standalone output for Docker
  output: "standalone",
}
export default nextConfig
