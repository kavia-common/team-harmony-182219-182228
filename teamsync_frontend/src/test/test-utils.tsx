import React, { PropsWithChildren } from "react";
import { render } from "@testing-library/react";
import { AppProvider } from "@/state/store";

// PUBLIC_INTERFACE
export function renderWithProviders(ui: React.ReactElement, options?: Parameters<typeof render>[1]) {
  /** Renders the provided UI wrapped with the AppProvider for state access in tests. */
  const Wrapper = ({ children }: PropsWithChildren) => <AppProvider>{children}</AppProvider>;
  return render(ui, { wrapper: Wrapper, ...options });
}
