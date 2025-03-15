/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  distDir: 'dist',
  basePath: '/viweb',
  assetPrefix: '/viweb/',
  images: {
    unoptimized: true,
    domains: ['localhost', 'ui-avatars.com', 'images.unsplash.com'],
  },
  reactStrictMode: true,
  sassOptions: {
    includePaths: ['./src/styles'],
  },
  trailingSlash: true,
  env: {
    NEXT_PUBLIC_BASE_PATH: '/viweb'
  }
}

module.exports = nextConfig;
