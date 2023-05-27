/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['www.gravatar.com', 'www.google.com', 'cdn.pixabay.com'],
  }
}

module.exports = nextConfig
