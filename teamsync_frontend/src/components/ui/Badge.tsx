"use client";

import React from "react";

type BadgeProps = React.HTMLAttributes<HTMLSpanElement> & {
  /** PUBLIC_INTERFACE: visual intent of the badge */
  intent?: "info";
};

/**
 * PUBLIC_INTERFACE
 * Badge
 * Small label to annotate UI with theme-based colors.
 */
export function Badge({ intent = "info", className, children, ...props }: BadgeProps) {
  const styles: Record<string, string> = {
    info: "ts-badge ts-badge-info",
  };
  return (
    <span className={[styles[intent], className].filter(Boolean).join(" ")} {...props}>
      {children}
    </span>
  );
}
