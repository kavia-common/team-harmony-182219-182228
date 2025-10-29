"use client";

import React from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import type { RecommendationItem } from "@/lib/mock/recommendations";

type Props = {
  item: RecommendationItem;
  onSave: () => void;
};

/**
 * PUBLIC_INTERFACE
 * RecommendationCard
 * Renders a single recommendation item with key attributes and "Save to Dashboard" action.
 */
export default function RecommendationCard({ item, onSave }: Props) {
  return (
    <Card className="hover:shadow-md transition-shadow duration-200 p-4">
      <div className="mb-3">
        <div className="flex items-start justify-between">
          <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
          <Badge intent="info" className="ml-2 capitalize">
            {item.environment}
          </Badge>
        </div>
        {item.subtitle && <p className="text-sm text-gray-600 mt-1">{item.subtitle}</p>}
      </div>
      <div>
        <div className="flex flex-wrap gap-2 mb-3">
          <Badge className="capitalize">{item.duration}</Badge>
          <Badge className="capitalize">{item.energyLevel} energy</Badge>
          {typeof item.minSize === "number" && (
            <Badge>min {item.minSize}{item.maxSize ? ` / max ${item.maxSize}` : ""}</Badge>
          )}
        </div>
        <p className="text-sm text-gray-700 mb-4">{item.description}</p>
        <div className="flex items-center justify-between">
          <div className="text-xs text-gray-500">
            Match score: <span className="font-medium text-gray-700">{Math.round(item.score ?? 70)}%</span>
          </div>
          <Button onClick={onSave}>Save to Dashboard</Button>
        </div>
      </div>
    </Card>
  );
}
