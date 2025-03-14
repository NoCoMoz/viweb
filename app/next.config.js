/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || '',
  assetPrefix: process.env.NEXT_PUBLIC_BASE_PATH || '',
  images: {
    unoptimized: true,
    domains: ['localhost', 'ui-avatars.com', 'images.unsplash.com'],
  },
  reactStrictMode: true,
  sassOptions: {
    includePaths: ['./src/styles'],
  },
  // Disable server-side features for static export
  experimental: {
    appDir: false,
  },
  // Handle trailing slashes consistently
  trailingSlash: true,
  // Disable image optimization for static export
  optimizeFonts: false,
  // Add TypeScript strict mode
  typescript: {
    strict: true,
  },
  // Ensure proper static export
  distDir: 'out',
  cleanDistDir: true,
};

module.exports = nextConfig;
