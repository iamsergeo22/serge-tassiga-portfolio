/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  trailingSlash: true,
  
  images: {
    unoptimized: true, // Required for static export
  },
  
  // Optional: If using TypeScript, ensure types are recognized
  typescript: {
    ignoreBuildErrors: false,
  },
}

module.exports = nextConfig;