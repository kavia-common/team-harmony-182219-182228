"use client";

import React from "react";

/**
 * PUBLIC_INTERFACE
 * Container
 * A centered, responsive layout wrapper that constrains content width and adds horizontal padding.
 */
export default function Container({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={["app-container", className].filter(Boolean).join(" ")}>
      {children}
    </div>
  );
}
