import type { NextConfig } from "next";

/**
 * Next.js configuration
 * Keep default server output; do not force `output: "export"`.
 * This supports the dev server and app router features in preview.
 */
const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Do not set output: "export"
};

export default nextConfig;
