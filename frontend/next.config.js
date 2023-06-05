/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'www.gravatar.com',
      'www.google.com',
      'cdn.pixabay.com',
      'demos.creative-tim.com',
      'images.pexels.com',
      'res.cloudinary.com',
    ],
  },
};

module.exports = nextConfig;
