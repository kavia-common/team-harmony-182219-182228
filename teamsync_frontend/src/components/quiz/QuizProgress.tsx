"use client";

import React, { useMemo } from "react";
import { Progress } from "@/components/ui/Progress";

export type QuizProgressProps = {
  current: number; // 1-based current step
  total: number;
};

/**
 * PUBLIC_INTERFACE
 * QuizProgress renders a labeled progress bar indicating current step out of total.
 */
export default function QuizProgress({ current, total }: QuizProgressProps) {
  const percent = useMemo(() => {
    if (!total) return 0;
    const clamped = Math.max(0, Math.min(current, total));
    return Math.round((clamped / total) * 100);
  }, [current, total]);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm text-gray-600">
        <span>Progress</span>
        <span>{percent}%</span>
      </div>
      <Progress value={percent} />
    </div>
  );
}
