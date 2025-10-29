"use client";

import React from "react";

type Persona = {
  archetype?: string;
  summary?: string;
  strengths?: string[];
  growthAreas?: string[];
};

type TeamStats = {
  size?: number;
  workMode?: string | null; // remote / hybrid / onsite
  avgEngagement?: number; // 0..100
  lastUpdated?: string;
};

interface InsightsProps {
  persona?: Persona | null;
  teamStats?: TeamStats | null;
}

/**
 * PUBLIC_INTERFACE
 * Insights
 * Displays persona summary and team stats in Ocean Professional theme.
 */
export default function Insights({ persona, teamStats }: InsightsProps) {
  return (
    <div className="space-y-6">
      <div className="p-6 bg-white border border-gray-100 rounded-2xl shadow-sm">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <h2 className="text-xl font-semibold text-[#111827]">Team Persona</h2>
            <p className="text-gray-500 text-sm">Summary of your team’s collaboration style</p>
          </div>
          {persona?.archetype && (
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 text-[#F59E0B] border border-amber-100">
              <span className="text-xs font-medium">Archetype</span>
              <span className="text-sm font-semibold">{persona.archetype}</span>
            </span>
          )}
        </div>
        <div className="mt-4">
          <p className="text-gray-700 leading-relaxed">
            {persona?.summary || "Complete the quiz to unlock your team persona and tailored recommendations."}
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5">
          <div className="p-4 rounded-xl bg-gradient-to-br from-blue-500/10 to-gray-50 border border-blue-100">
            <h4 className="text-sm font-semibold text-[#111827] mb-2">Strengths</h4>
            <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
              {(persona?.strengths && persona.strengths.length > 0 ? persona.strengths : ["—"]).map((s, idx) => (
                <li key={idx}>{s}</li>
              ))}
            </ul>
          </div>
          <div className="p-4 rounded-xl bg-white border border-gray-100">
            <h4 className="text-sm font-semibold text-[#111827] mb-2">Growth areas</h4>
            <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
              {(persona?.growthAreas && persona.growthAreas.length > 0 ? persona.growthAreas : ["—"]).map((g, idx) => (
                <li key={idx}>{g}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="p-6 bg-white border border-gray-100 rounded-2xl shadow-sm">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <h2 className="text-xl font-semibold text-[#111827]">Team Stats</h2>
            <p className="text-gray-500 text-sm">Key metrics at a glance</p>
          </div>
          {teamStats?.lastUpdated && (
            <span className="text-xs text-gray-500">Updated {teamStats.lastUpdated}</span>
          )}
        </div>
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <StatBlock label="Team size" value={teamStats?.size != null ? String(teamStats.size) : "—"} />
          <StatBlock label="Work mode" value={teamStats?.workMode ?? "—"} />
          <StatBlock
            label="Avg engagement"
            value={
              teamStats?.avgEngagement != null
                ? `${Math.round(teamStats.avgEngagement)}%`
                : "—"
            }
            accent
          />
        </div>
      </div>
    </div>
  );
}

function StatBlock({
  label,
  value,
  accent = false,
}: {
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div
      className={
        "p-4 rounded-xl border " +
        (accent
          ? "bg-gradient-to-br from-blue-500/10 to-gray-50 border-blue-100"
          : "bg-white border-gray-100")
      }
    >
      <p className="text-xs uppercase tracking-wide text-gray-500">{label}</p>
      <p className="mt-1 text-2xl font-semibold text-[#111827]">{value}</p>
    </div>
  );
}
