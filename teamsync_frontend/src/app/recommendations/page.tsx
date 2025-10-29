"use client";

import React, { useMemo, useState } from "react";
import Container from "@/components/Container";
import { useAppDispatch, useAppSelector } from "@/state/store";
import { selectPersona, selectTeam } from "@/state/selectors";
import { generateRecommendations, type RecommendationItem } from "@/lib/mock/recommendations";
import RecommendationCard from "@/components/recommendations/RecommendationCard";
import Filters, { FiltersState } from "@/components/recommendations/Filters";
import { addSavedRecommendation } from "@/state/store";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { useClientGuard } from "@/middleware/clientGuards";

/**
 * PUBLIC_INTERFACE
 * RecommendationsPage with lightweight guard hook and inline alert.
 */
export default function RecommendationsPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const personaRes = useAppSelector(selectPersona);
  const team = useAppSelector(selectTeam);

  // Guard: require both onboarding and quiz
  const { guardSatisfied, guardNotice } = useClientGuard({
    requireOnboard: true,
    requireQuiz: true,
  });

  // Initial filter state
  const [filters, setFilters] = useState<FiltersState>({
    duration: "any",
    energy: "any",
    environment: "any",
  });

  // Generate recommendation list based on persona/team
  const allRecommendations = useMemo<RecommendationItem[]>(() => {
    return generateRecommendations(personaRes?.persona ?? null, team?.size ?? null, team?.workMode ?? null);
  }, [personaRes, team]);

  // Apply client-side filters
  const filteredRecommendations = useMemo<RecommendationItem[]>(() => {
    return allRecommendations.filter((rec) => {
      const durationMatch =
        filters.duration === "any" || rec.duration === filters.duration;
      const energyMatch =
        filters.energy === "any" || rec.energyLevel === filters.energy;
      const environmentMatch =
        filters.environment === "any" || rec.environment === filters.environment;

      return durationMatch && energyMatch && environmentMatch;
    });
  }, [allRecommendations, filters]);

  const handleSave = (item: RecommendationItem) => {
    // PUBLIC_INTERFACE
    // Dispatch save to dashboard action
    dispatch(addSavedRecommendation(item));
  };

  return (
    <Container>
      <header className="mb-6">
        <h1 className="text-2xl md:text-3xl font-semibold text-gray-900">Smart Recommendations</h1>
        <p className="text-sm text-gray-600 mt-1">
          Personalized activities for your team{personaRes?.persona ? `: ${personaRes.persona}` : ""}.
        </p>
      </header>

      {guardNotice}

      <div className="transition-opacity duration-200" style={{ opacity: guardSatisfied ? 1 : 0.6 }}>
        <div className="flex items-center justify-between mb-4">
          <div />
          <Button variant="ghost" onClick={() => router.push("/dashboard")}>
            View Dashboard
          </Button>
        </div>

        <Filters value={filters} onChange={setFilters} />

        <div className="grid gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-6">
          {filteredRecommendations.map((item) => (
            <RecommendationCard
              key={item.id}
              item={item}
              onSave={() => handleSave(item)}
            />
          ))}
        </div>

        {filteredRecommendations.length === 0 && (
          <div className="text-center text-gray-600 mt-12">
            No activities match your filters. Try adjusting the filters above.
          </div>
        )}
      </div>
    </Container>
  );
}
