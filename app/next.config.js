/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || '',
  assetPrefix: process.env.NEXT_PUBLIC_BASE_PATH || '',
  output: 'export',
  images: {
    unoptimized: true,
    domains: ['localhost'],
    // Add other image domains as needed
  },
  reactStrictMode: true,

  // Configure Turbopack for improved build performance
  experimental: {
    turbo: {
      rules: {
        // Add any custom Turbopack rules here
      }
    }
  },

  sassOptions: {
    includePaths: ['./src/styles'],
  },

  // Configure environment variables
  env: {
    MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/viwebdb'
  }
};

module.exports = nextConfig;
