/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            hostname: 'cdn.sanity.io',
          },
        ],
      },
}

module.exports = nextConfig
