import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <main className="app-container py-16">
      <section
        className="ts-card ts-card-hover p-10 text-center bg-gradient-to-b from-blue-500/10 to-gray-50 border border-blue-100"
        role="alert"
        aria-live="assertive"
      >
        <div className="mx-auto w-14 h-14 rounded-2xl bg-white shadow flex items-center justify-center border border-blue-100">
          <span aria-hidden className="text-[#2563EB] text-2xl">🔎</span>
        </div>
        <h1 className="ts-heading text-3xl md:text-4xl font-semibold mt-4">404 – Page not found</h1>
        <p className="ts-subtle mt-2 max-w-2xl mx-auto">
          We couldn’t find that page. It might have been moved or the link is incorrect.
        </p>

        <div className="mt-6 flex items-center justify-center gap-3">
          <Link href="/" className="inline-block">
            <Button className="bg-[#2563EB] hover:bg-blue-600 text-white shadow-md">
              Go to Home
            </Button>
          </Link>
          <Link href="/recommendations" className="inline-block">
            <Button variant="ghost">Explore recommendations</Button>
          </Link>
        </div>
      </section>
    </main>
  );
}
