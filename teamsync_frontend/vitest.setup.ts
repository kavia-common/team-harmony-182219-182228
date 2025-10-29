import "@testing-library/jest-dom";
import { afterEach, vi } from "vitest";
import { cleanup } from "@testing-library/react";

/**
 * Global test cleanup
 * Ensures the DOM is reset between tests to avoid cross-test bleed.
 */
afterEach(() => {
  cleanup();
});

/**
 * Centralized mock for Next.js App Router hooks.
 * This ensures components using next/navigation hooks can mount
 * in tests without requiring an App Router context.
 *
 * Provided mocks:
 * - useRouter: push, replace, back, prefetch, refresh (all vi.fn)
 * - usePathname: returns "/"
 * - useSearchParams: minimal ReadonlyURLSearchParams-like object
 *
 * If a specific test needs to change values (pathname or search params),
 * it can override these via vi.mocked or by re-mocking next/navigation
 * inside the test.
 */
vi.mock("next/navigation", () => {
  type ReadonlyURLSearchParamsLike = {
    get(name: string): string | null;
    has(name: string): boolean;
    toString(): string;
  };

  const searchParamsMock: ReadonlyURLSearchParamsLike = {
    get: () => null,
    has: () => false,
    toString: () => "",
  };

  return {
    useRouter: () => ({
      push: vi.fn(),
      replace: vi.fn(),
      back: vi.fn(),
      prefetch: vi.fn(),
      refresh: vi.fn(),
    }),
    usePathname: () => "/",
    useSearchParams: () => searchParamsMock,
  };
});

// Additional Testing Library configuration tweaks can be added here if needed.
