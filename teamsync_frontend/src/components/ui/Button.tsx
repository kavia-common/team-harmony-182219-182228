"use client";

import React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  /** PUBLIC_INTERFACE: visual intent for the button */
  intent?: "primary";
  /** PUBLIC_INTERFACE: secondary styling variant */
  variant?: "solid" | "ghost";
  /** PUBLIC_INTERFACE: extra className */
  className?: string;
};

/**
 * PUBLIC_INTERFACE
 * Button
 * Themed button component with primary and ghost variants.
 */
export function Button({
  intent = "primary",
  variant = "solid",
  className,
  children,
  ...props
}: ButtonProps) {
  const base = "ts-btn";
  const styles: Record<string, string> = {
    primary:
      variant === "ghost" ? "ts-btn-ghost" : "ts-btn-primary",
  };

  return (
    <button
      className={[base, styles[intent], className].filter(Boolean).join(" ")}
      {...props}
    >
      {children}
    </button>
  );
}
