import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "node:path";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"],
    globals: true,
    css: true,
    include: ["src/**/*.test.{ts,tsx}"],
    coverage: {
      enabled: false,
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@/*": path.resolve(__dirname, "./src/*"),
    },
    extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
  },
});
