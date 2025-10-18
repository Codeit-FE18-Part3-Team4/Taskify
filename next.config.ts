import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  images: {
    remotePatterns: [
      new URL("https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/**"),
    ],
  },
};

export default nextConfig;
