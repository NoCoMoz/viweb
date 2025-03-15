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
    modules: true,
    importLoaders: 1,
    localIdentName: '[local]___[hash:base64:5]'
  },
  trailingSlash: true,
  // Ensure proper static paths
  env: {
    NEXT_PUBLIC_BASE_PATH: '/viweb'
  }
}

module.exports = nextConfig;
