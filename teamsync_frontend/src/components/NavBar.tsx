"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

/**
 * PUBLIC_INTERFACE
 * NavBar
 * Top navigation for TeamSync with primary theme styling and accessible focus states.
 */
export default function NavBar() {
  const pathname = usePathname();

  const links = [
    { href: "/", label: "Home" },
    { href: "/onboard", label: "Onboard" },
    { href: "/quiz", label: "Quiz" },
    { href: "/recommendations", label: "Recommendations" },
    { href: "/dashboard", label: "Dashboard" },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-blue-100/60 bg-white/70 backdrop-blur">
      <div className="app-container h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 focus-visible:ring-2 focus-visible:ring-blue-500/40 rounded-md">
          <div
            aria-hidden
            className="h-8 w-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold"
          >
            T
          </div>
          <span className="font-semibold text-gray-900">TeamSync</span>
        </Link>

        <nav aria-label="Primary" className="hidden md:flex items-center gap-2">
          {links.map((l) => {
            const active = pathname === l.href;
            return (
              <Link
                key={l.href}
                href={l.href}
                className={[
                  "px-3 py-2 rounded-md text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-blue-500/40",
                  active
                    ? "text-blue-700 bg-blue-50"
                    : "text-gray-700 hover:text-gray-900 hover:bg-gray-100",
                ].join(" ")}
                aria-current={active ? "page" : undefined}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
