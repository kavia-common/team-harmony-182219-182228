import type { NextConfig } from "next";

/**
 * Next.js configuration
 * Note:
 * - Using default server output to ensure all app routes (/quiz, /dashboard, etc.)
 *   are included in the production build. Static export can omit app routes that
 *   rely on client features and dynamic navigation.
 */
const nextConfig: NextConfig = {
  // Keep default output (server). Do not set `output: "export"`.
};

export default nextConfig;
