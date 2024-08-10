/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'api.microlink.io', // Microlink Image Preview
      'images.unsplash.com',
    ],
  },
  async rewrites() {
    return [
      {
        source: '/api/get-filenames',
        destination: 'http://65.20.81.185:3000/api/get-filenames',
      },
    ];
  },
};

module.exports = nextConfig;
