import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Ignore ESLint errors during build for faster development
  eslint: {
    ignoreDuringBuilds: true,
  },

  // Configure image domains for external images
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**',
      },
      {
        protocol: 'https', 
        hostname: 'cloudinary.com',
        pathname: '/**',
      },
      // Add other domains if needed
      {
        protocol: 'https',
        hostname: '**.imgur.com',
        pathname: '/**',
      }
    ],
    // Enable image optimization
    formats: ['image/avif', 'image/webp'],
  },

  // Environment variables that should be exposed to the client
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },

  // Configure redirects if needed
  async redirects() {
    return [
      // Example redirect
      // {
      //   source: '/old-path',
      //   destination: '/new-path',
      //   permanent: true,
      // },
    ];
  },

  // Configure headers for security
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: process.env.NODE_ENV === 'development' ? '*' : 'https://yourdomain.com',
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET, POST, PUT, DELETE, OPTIONS',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'Content-Type, Authorization',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
