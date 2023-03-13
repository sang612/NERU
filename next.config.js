/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    headers() {
      return [
        {
          source: '/.well-known/apple-app-site-association',
          headers: [{ key: 'Content-Type', value: 'application/json' }],
        },
      ];
    },
  },
  env: {
    NEXT_PUBLIC_API_ENDPOINT: process.env.NEXT_PUBLIC_API_ENDPOINT,
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
    NEXT_PUBLIC_PRODUCT_ID: process.env.NEXT_PUBLIC_PRODUCT_ID,
    NEXT_PUBLIC_DOMAIN_URL: process.env.NEXT_PUBLIC_DOMAIN_URL,
  },
};

module.exports = nextConfig;