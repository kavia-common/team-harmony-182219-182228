import React, { PropsWithChildren } from "react";
import { render } from "@testing-library/react";
import { vi } from "vitest";
import { AppProvider } from "@/state/store";

// PUBLIC_INTERFACE
export function renderWithProviders(ui: React.ReactElement, options?: Parameters<typeof render>[1]) {
  const Wrapper = ({ children }: PropsWithChildren) => <AppProvider>{children}</AppProvider>;
  return render(ui, { wrapper: Wrapper, ...options });
}

// Create a minimal URLSearchParams-like interface used by next/navigation
type ReadonlyURLSearchParamsLike = {
  get(name: string): string | null;
  has(name: string): boolean;
  toString(): string;
};

// PUBLIC_INTERFACE
export function mockNextNavigation() {
  // Provide a minimal mock for next/navigation hooks used in components
  vi.mock("next/navigation", () => {
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
}
