import "@testing-library/jest-dom";
import { expect, afterEach } from "vitest";
import { cleanup } from "@testing-library/react";

// Ensure cleanup after each test to avoid test bleed
afterEach(() => {
  cleanup();
});

// Next.js 15 App Router testing notes:
// - next/link works in jsdom; no special mock required.
// - For next/navigation hooks in client components, tests should avoid invoking router navigation unless explicitly mocked.

// Testing Library configuration tweaks can be added here if needed.
