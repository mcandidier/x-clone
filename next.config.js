/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = {
  images: {
    domains: ['127.0.0.1', 'localhost', `${process.env.NEXT_PUBLIC_BACKEND_IMAGE_HOST}`]  },
    reactStrictMode: false,
};

// module.exports = nextConfig
