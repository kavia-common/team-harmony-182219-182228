"use client";

import React from "react";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  /** PUBLIC_INTERFACE: optional label text for accessibility */
  label?: string;
  /** PUBLIC_INTERFACE: optional helper text */
  helperText?: string;
  id?: string;
};

/**
 * PUBLIC_INTERFACE
 * Input
 * Accessible, themed text input with consistent focus ring.
 */
export function Input({ label, helperText, id, className, ...props }: InputProps) {
  // Always call the hook; do not call conditionally
  const autoId = React.useId();
  const inputId = id ?? autoId;

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={inputId} className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <input id={inputId} className={["ts-input", className].filter(Boolean).join(" ")} {...props} />
      {helperText && <p className="mt-1 text-xs text-gray-500">{helperText}</p>}
    </div>
  );
}
