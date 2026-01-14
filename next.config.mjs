/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'pub-a541fcb4769b4b0782b51f2b72d105e9.r2.dev',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig