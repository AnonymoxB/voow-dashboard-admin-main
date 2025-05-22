/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
    domains:[
      "api.voow.test"
    ]
  },
};

module.exports = nextConfig;
