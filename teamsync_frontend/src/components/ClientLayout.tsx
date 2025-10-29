"use client";

import React from "react";
import { AppProvider } from "@/state/store";
import NavBar from "@/components/NavBar";
import Container from "@/components/Container";

/**
 * PUBLIC_INTERFACE
 * ClientLayout
 * Ensures that all nested components render on the client side.
 * Wraps the app with AppProvider context and provides a client boundary
 * to avoid server-only rendering of client hooks/components.
 * Also applies the top-level navigation and container shell.
 */
export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <AppProvider>
      <div className="relative min-h-screen bg-gradient-to-b from-blue-500/10 to-gray-50">
        <NavBar />
        <Container>
          <main className="py-8">{children}</main>
        </Container>
      </div>
    </AppProvider>
  );
}
