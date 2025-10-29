"use client";

import React from "react";

type ProgressProps = {
  /** PUBLIC_INTERFACE: value between 0 and 100 */
  value: number;
  /** PUBLIC_INTERFACE: aria label for screen readers */
  "aria-label"?: string;
  className?: string;
};

/**
 * PUBLIC_INTERFACE
 * Progress
 * Determinate progress bar respecting Ocean Professional theme.
 */
export function Progress({ value, className, ...props }: ProgressProps) {
  const clamped = Math.max(0, Math.min(100, value ?? 0));
  return (
    <div
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={clamped}
      className={["ts-progress", className].filter(Boolean).join(" ")}
      {...props}
    >
      <div className="ts-progress-bar" style={{ width: `${clamped}%` }} />
    </div>
  );
}
