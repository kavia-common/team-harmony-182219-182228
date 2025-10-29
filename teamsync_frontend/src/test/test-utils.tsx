import React, { PropsWithChildren } from "react";
import { render } from "@testing-library/react";
import { AppProvider } from "@/state/store";

// PUBLIC_INTERFACE
export function renderWithProviders(ui: React.ReactElement, options?: Parameters<typeof render>[1]) {
  /** Renders the provided UI wrapped with the AppProvider for state access in tests. */
  const Wrapper = ({ children }: PropsWithChildren) => <AppProvider>{children}</AppProvider>;
  return render(ui, { wrapper: Wrapper, ...options });
}

// PUBLIC_INTERFACE
export function mockNextNavigation() {
  /**
   * This helper previously wrapped vi.mock for next/navigation.
   * The project now centralizes this mock in vitest.setup.ts.
   * We expose a no-op function to maintain backward compatibility
   * with suites that call mockNextNavigation().
   */
  // no-op on purpose; centralized mock is applied in vitest.setup.ts
}
