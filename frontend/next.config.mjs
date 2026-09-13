// frontend/next.config.mjs
// Configures the standalone Next.js build used by the local HomeScope prototype.
// It does not suppress TypeScript failures or define deployment infrastructure.

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  // Standalone output keeps the production image independent of this workspace.
  output: "standalone",
}
export default nextConfig
