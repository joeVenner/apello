/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  async redirects() {
    return [
      {
        source: "/create", // When banner creator moved to subdomain
        destination: "https://zeus.apello.xyz/create",
        permanent: true,
      },
      {
        source: "/create/:slug", // When banner creator moved to subdomain
        destination: "https://zeus.apello.xyz/create",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
