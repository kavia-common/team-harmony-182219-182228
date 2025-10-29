"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import Container from "@/components/Container";
import SavedList from "@/components/dashboard/SavedList";
import Insights from "@/components/dashboard/Insights";
import { useAppSelector } from "@/state/store";
import {
  selectPersona,
  selectTeam,
} from "@/state/selectors";
import { Button } from "@/components/ui/Button";

/**
 * PUBLIC_INTERFACE
 * DashboardPage
 * Renders persona insights, team stats, saved items, and CTA to explore.
 * Responsive two-column layout (stacks on mobile).
 */
export default function DashboardPage() {
  const { persona, confidence } = useAppSelector(selectPersona);
  const team = useAppSelector(selectTeam);

  const personaSummary = useMemo(
    () => ({
      archetype: persona ?? undefined,
      summary:
        persona != null
          ? `Your team leans ${persona.toLowerCase()} with ${Math.round(
              confidence * 100
            )}% confidence.`
          : undefined,
      strengths: [],
      growthAreas: [],
    }),
    [persona, confidence]
  );

  const teamStats = useMemo(
    () => ({
      size: team.size ?? undefined,
      workMode: team.workMode ?? undefined,
      avgEngagement: undefined,
      lastUpdated: undefined,
    }),
    [team]
  );

  return (
    <Container>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#111827]">Team Dashboard</h1>
        <p className="text-gray-600 mt-1">
          A quick snapshot of your team profile and saved picks.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-3">
          <Insights persona={personaSummary} teamStats={teamStats} />
          <div className="mt-6">
            <Link href="/recommendations" className="inline-block">
              <Button className="bg-[#2563EB] hover:bg-blue-600 text-white shadow-md transition-all">
                Explore new picks
              </Button>
            </Link>
          </div>
        </div>
        <div className="lg:col-span-2">
          <SavedList />
        </div>
      </div>
    </Container>
  );
}
