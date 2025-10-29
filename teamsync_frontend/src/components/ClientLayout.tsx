"use client";

import React from "react";
import { AppProvider } from "@/state/store";

/**
 * PUBLIC_INTERFACE
 * ClientLayout
 * Ensures that all nested components render on the client side.
 * Wraps the app with AppProvider context and provides a client boundary
 * to avoid server-only rendering of client hooks/components.
 */
export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return <AppProvider>{children}</AppProvider>;
}
