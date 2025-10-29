"use client";

import React from "react";

/**
 * PUBLIC_INTERFACE
 * Card
 * Surface container with rounded corners and subtle shadow.
 */
export function Card({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={["ts-card", className].filter(Boolean).join(" ")} {...props}>
      {children}
    </div>
  );
}

/**
 * PUBLIC_INTERFACE
 * CardHeader
 * Top section for titles and subtitles.
 */
export function CardHeader({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={["px-6 pt-6", className].filter(Boolean).join(" ")} {...props}>
      {children}
    </div>
  );
}

/**
 * PUBLIC_INTERFACE
 * CardBody
 * Main content area of the card.
 */
export function CardBody({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={["px-6 py-4", className].filter(Boolean).join(" ")} {...props}>
      {children}
    </div>
  );
}

/**
 * PUBLIC_INTERFACE
 * CardFooter
 * Bottom section for actions or metadata.
 */
export function CardFooter({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={["px-6 pb-6", className].filter(Boolean).join(" ")} {...props}>
      {children}
    </div>
  );
}
