"use client";

import Link from "next/link";
import { Card, CardBody, CardHeader, CardFooter } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

/**
 * PUBLIC_INTERFACE
 * Home page with a safe, minimal fallback to guarantee rendering.
 */
export default function Home() {
  // Fallback content – always safe to render
  const Fallback = (
    <div className="rounded-xl border border-blue-100 bg-white/70 p-4 text-sm text-gray-700">
      <div className="flex items-center gap-2">
        <span aria-hidden>✅</span>
        <span>Health check: UI mounted successfully.</span>
      </div>
    </div>
  );

  return (
    <section className="mt-8">
      <div className="mb-4">{Fallback}</div>

      <div className="grid gap-6 lg:grid-cols-3 items-stretch">
        <div className="lg:col-span-2">
          <Card className="ts-card-hover">
            <CardHeader>
              <Badge intent="info">Ocean Professional</Badge>
              <h1 className="ts-heading text-3xl sm:text-4xl font-semibold mt-2">
                Discover better team activities with TeamSync
              </h1>
              <p className="ts-subtle mt-2">
                Personalized recommendations based on your team’s size, work mode, and
                personality—in minutes, not meetings.
              </p>
            </CardHeader>
            <CardBody>
              <ul className="grid gap-3 text-sm text-gray-600 list-disc pl-5">
                <li>Fast onboarding for team context</li>
                <li>5-question personality quiz</li>
                <li>Curated, ready-to-run activities</li>
              </ul>
            </CardBody>
            <CardFooter className="flex flex-col sm:flex-row gap-3">
              <Link href="/onboard" className="w-full sm:w-auto">
                <Button className="w-full" intent="primary">
                  Start Onboarding
                </Button>
              </Link>
              <Link href="/quiz" className="w-full sm:w-auto">
                <Button className="w-full" variant="ghost">
                  Take the Quiz
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <h2 className="ts-heading text-xl font-semibold">What’s inside</h2>
              <p className="ts-subtle">A quick tour of the MVP routes.</p>
            </CardHeader>
            <CardBody>
              <ol className="space-y-2 text-sm text-gray-700">
                <li>
                  <strong className="text-gray-900">/onboard</strong> – add team basics
                </li>
                <li>
                  <strong className="text-gray-900">/quiz</strong> – 5 quick questions
                </li>
                <li>
                  <strong className="text-gray-900">/recommendations</strong> – tailored ideas
                </li>
                <li>
                  <strong className="text-gray-900">/dashboard</strong> – saved activities
                </li>
              </ol>
            </CardBody>
          </Card>
        </div>
      </div>
    </section>
  );
}
