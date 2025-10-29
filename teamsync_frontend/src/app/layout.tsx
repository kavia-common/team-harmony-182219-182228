import type { Metadata } from "next";
import "./globals.css";
import NavBar from "@/components/NavBar";
import Container from "@/components/Container";

export const metadata: Metadata = {
  title: "TeamSync – Discover better team activities",
  description:
    "TeamSync helps HR managers and team leads discover personalized team-building activities based on team personality, size, and work mode.",
  applicationName: "TeamSync",
  authors: [{ name: "TeamSync" }],
  themeColor: "#2563EB",
  viewport: { width: "device-width", initialScale: 1 },
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-gray-50">
        <div className="relative min-h-screen bg-gradient-to-b from-blue-500/10 to-gray-50">
          <NavBar />
          <Container>
            <main className="py-8">{children}</main>
          </Container>
        </div>
      </body>
    </html>
  );
}
