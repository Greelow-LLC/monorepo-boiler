/* eslint-disable no-undef */
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    domains: [
      'images.unsplash.com',
      'https://picsum.photos',
      'i.pravatar.cc',
      'likutei.s3.us-east-2.amazonaws.com',
      'https://imgcy.trivago.com',
      'https://www.marriott.com',
      'https://dynamic-media-cdn.tripadvisor.com',
      'dynamic-media-cdn.tripadvisor.com',
      'www.marriott.com',
      'imgcy.trivago.com',
    ],
  },
  env: {
    BASE_URL: process.env.BASE_URL,
  },
};

module.exports = nextConfig;
