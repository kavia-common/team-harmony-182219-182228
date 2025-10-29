"use client";

import React from "react";
import { Select } from "@/components/ui/Select";
import { Card } from "@/components/ui/Card";

export type FiltersState = {
  duration: "any" | "short" | "medium" | "long";
  energy: "any" | "low" | "medium" | "high";
  environment: "any" | "indoor" | "outdoor";
};

type Props = {
  value: FiltersState;
  onChange: (next: FiltersState) => void;
};

/**
 * PUBLIC_INTERFACE
 * Filters
 * Provides client-side filters for recommendations list: duration, energy, and environment (indoor/outdoor).
 */
export default function Filters({ value, onChange }: Props) {
  const setField = <K extends keyof FiltersState>(key: K, val: FiltersState[K]) => {
    onChange({ ...value, [key]: val });
  };

  return (
    <Card className="bg-gradient-to-r from-blue-500/10 to-gray-50 border border-blue-100">
      <div className="py-4 px-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">Duration</label>
            <Select
              value={value.duration}
              onChange={(e) => setField("duration", e.target.value as FiltersState["duration"])}
            >
              <option value="any">Any</option>
              <option value="short">Short (≤ 30m)</option>
              <option value="medium">Medium (30-60m)</option>
              <option value="long">Long (≥ 60m)</option>
            </Select>
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">Energy Level</label>
            <Select
              value={value.energy}
              onChange={(e) => setField("energy", e.target.value as FiltersState["energy"])}
            >
              <option value="any">Any</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </Select>
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">Environment</label>
            <Select
              value={value.environment}
              onChange={(e) =>
                setField("environment", e.target.value as FiltersState["environment"])
              }
            >
              <option value="any">Any</option>
              <option value="indoor">Indoor</option>
              <option value="outdoor">Outdoor</option>
            </Select>
          </div>
        </div>
      </div>
    </Card>
  );
}
