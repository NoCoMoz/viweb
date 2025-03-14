/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable React strict mode for better development practices
  reactStrictMode: true,

  // Configure Turbopack for improved build performance
  experimental: {
    turbo: {
      rules: {
        // Add any custom Turbopack rules here
      }
    }
  },

  // Optimize image handling
  images: {
    domains: ['localhost'],
    // Add other image domains as needed
  },

  // Configure environment variables
  env: {
    MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/viwebdb'
  }
};

module.exports = nextConfig;
