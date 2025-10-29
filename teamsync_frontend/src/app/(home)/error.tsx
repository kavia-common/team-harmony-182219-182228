"use client";

import React from "react";

export default function SegmentError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  // Reference error so ESLint doesn't flag it as unused and we can surface context for debugging
  const digest = error?.digest;

  return (
    <div className="rounded-xl border border-blue-100 bg-white/70 p-4 text-sm text-gray-700">
      <div className="flex items-center gap-2 justify-between">
        <div className="flex items-center gap-2">
          <span aria-hidden>⚠️</span>
          <span>We hit a snag loading this section.</span>
        </div>
        <button
          className="ts-btn ts-btn-ghost"
          onClick={() => reset?.()}
          type="button"
        >
          Retry
        </button>
      </div>
      {digest ? (
        <p className="mt-2 text-xs text-gray-400">Ref: {digest}</p>
      ) : null}
    </div>
  );
}
