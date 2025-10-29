"use client";

import React from "react";

type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  /** PUBLIC_INTERFACE: visible label for the select. If provided, a label element will be rendered and associated via htmlFor. */
  label?: string;
  /** PUBLIC_INTERFACE: helper text below */
  helperText?: string;
  /** PUBLIC_INTERFACE: optional id to control stable association; if not provided, an auto id is generated */
  id?: string;
};

/**
 * PUBLIC_INTERFACE
 * Select
 * Themed select input with focus ring and accessible label.
 * This component forwards accessibility-related attributes such as id, name, aria-*, and data-* to the native <select>.
 */
export function Select({
  label,
  helperText,
  id,
  className,
  children,
  ...props
}: SelectProps) {
  // Always call the hook; do not call conditionally
  const autoId = React.useId();
  const selectId = id ?? autoId;

  // Extract props that should be passed to native select, including accessibility attributes.
  // Since we spread ...props onto <select>, id/name/aria-* will be forwarded by default.
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={selectId} className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <select
        id={selectId}
        className={["ts-select", className].filter(Boolean).join(" ")}
        {...props}
      >
        {children}
      </select>
      {helperText && <p className="mt-1 text-xs text-gray-500">{helperText}</p>}
    </div>
  );
}
