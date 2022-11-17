/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['fakestoreapi.com', 'naszsklep-api.vercel.app'],
  },
};

module.exports = nextConfig;
