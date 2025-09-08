import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  experimental:{

  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'minio-tck0cgg04s4k4sko080ow0ko.sogeinsoft.com',
        pathname: '**',
      },
    ],
  }
};

export default nextConfig;
