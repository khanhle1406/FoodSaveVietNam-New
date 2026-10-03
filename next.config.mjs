/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: '/',
          destination: '/index.html',
        },
        {
          source: '/partner',
          destination: '/PARTNER.html',
        },
        {
          source: '/charity',
          destination: '/CHARITY.html',
        },
        {
          source: '/admin',
          destination: '/ADMIN_FOODSAVE.html',
        },
      ],
      afterFiles: [],
      fallback: [],
    };
  },
};

export default nextConfig;
