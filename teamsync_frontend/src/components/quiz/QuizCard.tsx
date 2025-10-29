"use client";

import React from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

type Option = {
  label: string;
  value: string | number;
};

export type QuizCardProps = {
  index: number;
  question: string;
  options: Option[];
  value?: string | number | null;
  onChange: (value: string | number) => void;
};

/**
 * PUBLIC_INTERFACE
 * QuizCard renders a single quiz question with selectable options.
 * It uses existing UI primitives and emits onChange with the selected value.
 */
export default function QuizCard({ index, question, options, value, onChange }: QuizCardProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="text-xs uppercase tracking-wide text-blue-600">Question {index + 1}</div>
        <h2 className="text-xl font-medium text-gray-900">{question}</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {options?.map((opt) => {
          const isActive = value === opt.value;
          return (
            <Card
              key={String(opt.value)}
              className={`p-4 border cursor-pointer transition-colors rounded-xl ${
                isActive ? "border-blue-500 bg-blue-50" : "hover:border-blue-300"
              }`}
              onClick={() => onChange(opt.value)}
            >
              <div className="flex items-center justify-between">
                <span className={`text-sm ${isActive ? "text-blue-700" : "text-gray-800"}`}>
                  {opt.label}
                </span>
                <Button
                  variant={isActive ? "solid" : "ghost"}
                  onClick={(e) => {
                    e.stopPropagation();
                    onChange(opt.value);
                  }}
                >
                  {isActive ? "Selected" : "Select"}
                </Button>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
