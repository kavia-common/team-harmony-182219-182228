import type { Metadata, Viewport } from "next";
import "./globals.css";
import ClientLayout from "@/components/ClientLayout";

/**
 * RootLayout is a server component by default. It renders ClientLayout inside the body
 * to keep AppProvider and hook-using components within a client boundary.
 */
export const metadata: Metadata = {
  title: "TeamSync – Discover better team activities",
  description:
    "TeamSync helps HR managers and team leads discover personalized team-building activities based on team personality, size, and work mode.",
  applicationName: "TeamSync",
  authors: [{ name: "TeamSync" }],
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

// PUBLIC_INTERFACE
export const generateViewport = (): Viewport => ({
  width: "device-width",
  initialScale: 1,
  themeColor: "#2563EB",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-gray-50">
        {/* Keep client-only elements inside ClientLayout */}
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
