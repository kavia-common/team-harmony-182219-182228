"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

/**
 * PUBLIC_INTERFACE
 * Global error boundary for the App Router.
 * This renders when an error is thrown in a route segment without a closer error.tsx.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body className="app-container py-16">
        <section
          className="ts-card ts-card-hover p-8 text-center bg-gradient-to-b from-blue-500/10 to-gray-50 border border-blue-100"
          role="alert"
          aria-live="assertive"
        >
          <div className="mx-auto w-14 h-14 rounded-2xl bg-white shadow flex items-center justify-center border border-blue-100">
            <span aria-hidden className="text-[#2563EB] text-2xl">⚠️</span>
          </div>
          <h1 className="ts-heading text-2xl md:text-3xl font-semibold mt-4">
            Something went wrong
          </h1>
          <p className="ts-subtle mt-2 max-w-2xl mx-auto">
            {error?.message ? String(error.message) : "An unexpected error occurred."}
          </p>
          {error?.digest ? (
            <p className="mt-2 text-xs text-gray-400">Ref: {error.digest}</p>
          ) : null}
          <div className="mt-6 flex items-center justify-center gap-3">
            <Button onClick={() => reset?.()}>Try again</Button>
            <Link href="/" className="inline-block">
              <Button variant="ghost">Go Home</Button>
            </Link>
          </div>
        </section>
      </body>
    </html>
  );
}
