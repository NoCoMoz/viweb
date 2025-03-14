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
  trailingSlash: true,
  // Disable server-side features
  experimental: {
    appDir: false,
  },
  // Ensure clean builds
  distDir: '.next',
  cleanDistDir: true,
  // Disable font optimization for static export
  optimizeFonts: false,
  // Ensure proper static paths
  env: {
    NEXT_PUBLIC_BASE_PATH: '/viweb'
  }
}

module.exports = nextConfig;
