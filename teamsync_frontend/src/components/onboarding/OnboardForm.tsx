"use client";

import React, { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Progress } from "@/components/ui/Progress";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { useAppDispatch, useAppState } from "@/state/store";

/**
 * PUBLIC_INTERFACE
 * OnboardForm
 * A 3-step onboarding form to collect:
 * 1) Team Name (text)
 * 2) Team Size (select)
 * 3) Work Mode (select)
 *
 * Features:
 * - Step-by-step validation and progress indicator.
 * - Uses existing UI primitives (Input, Select, Progress, Button, Card).
 * - Ocean Professional styling with subtle gradient header and rounded surfaces.
 * - Persists to global state via store actions.
 * - Navigates to /quiz upon successful submission.
 *
 * No props required; state is managed internally and synced via the global store.
 */
export default function OnboardForm() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { onboarding } = useAppState();

  // Local control for steps and errors
  const [step, setStep] = useState<number>(0);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const stepsTotal = 3;
  const progressValue = useMemo(() => {
    return Math.round(((step + 1) / stepsTotal) * 100);
  }, [step]);

  // Validation per step
  const validateStep = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (step === 0) {
      if (!onboarding.teamName || onboarding.teamName.trim().length < 2) {
        newErrors.teamName =
          "Please enter a team name (at least 2 characters).";
      }
    }
    if (step === 1) {
      if (onboarding.teamSize == null || Number.isNaN(onboarding.teamSize)) {
        newErrors.teamSize = "Please select your team size.";
      }
    }
    if (step === 2) {
      if (!onboarding.workMode) {
        newErrors.workMode = "Please select your team’s work mode.";
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) {
      if (step < stepsTotal - 1) {
        setStep((s) => s + 1);
      } else {
        // Mark onboarding complete and navigate
        dispatch({ type: "onboarding/complete", payload: { completed: true } });
        router.push("/quiz");
      }
    }
  };

  const handleBack = () => {
    setErrors({});
    setStep((s) => Math.max(0, s - 1));
  };

  // Options
  const teamSizeOptions = [
    { value: 3, label: "1–5" },
    { value: 8, label: "6–10" },
    { value: 15, label: "11–20" },
    { value: 30, label: "21–50" },
    { value: 60, label: "51+" },
  ];

  const workModeOptions = [
    { value: "remote", label: "Remote" },
    { value: "hybrid", label: "Hybrid" },
    { value: "onsite", label: "On-site" },
  ] as const;

  return (
    <Card className="overflow-hidden border-0 shadow-lg">
      {/* Gradient header area for Ocean Professional vibe */}
      <div className="bg-gradient-to-r from-blue-500/10 to-gray-50 px-6 py-5">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Onboarding</h2>
            <p className="text-sm text-gray-600">
              Step {step + 1} of {stepsTotal}
            </p>
          </div>
          <div className="w-40">
            <Progress value={progressValue} />
          </div>
        </div>
      </div>

      <div className="px-6 pb-6 pt-4">
        {step === 0 && (
          <div className="space-y-3">
            <Input
              label="Team Name"
              value={onboarding.teamName ?? ""}
              placeholder="e.g., Product Wizards"
              onChange={(e) =>
                dispatch({
                  type: "onboarding/setTeamName",
                  payload: { teamName: e.target.value },
                })
              }
              aria-invalid={!!errors.teamName}
              aria-describedby={errors.teamName ? "teamName-error" : undefined}
            />
            {errors.teamName && (
              <p id="teamName-error" className="text-sm text-red-500">
                {errors.teamName}
              </p>
            )}
            <p className="text-xs text-gray-500">
              This helps us personalize your experience across the app.
            </p>
          </div>
        )}

        {step === 1 && (
          <div className="space-y-3">
            <Select
              label="Team Size"
              value={onboarding.teamSize ?? ""}
              onChange={(e) =>
                dispatch({
                  type: "onboarding/setTeamSize",
                  payload: {
                    teamSize: e.target.value ? Number(e.target.value) : null,
                  },
                })
              }
              aria-invalid={!!errors.teamSize}
              aria-describedby={errors.teamSize ? "teamSize-error" : undefined}
            >
              <option value="" disabled>
                Select size
              </option>
              {teamSizeOptions.map((opt) => (
                <option key={opt.label} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </Select>
            {errors.teamSize && (
              <p id="teamSize-error" className="text-sm text-red-500">
                {errors.teamSize}
              </p>
            )}
            <p className="text-xs text-gray-500">
              Choose the range that best matches your current team.
            </p>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-3">
            <Select
              label="Work Mode"
              value={onboarding.workMode ?? ""}
              onChange={(e) =>
                dispatch({
                  type: "onboarding/setWorkMode",
                  payload: {
                    workMode: (e.target.value ||
                      null) as typeof workModeOptions[number]["value"] | null,
                  },
                })
              }
              aria-invalid={!!errors.workMode}
              aria-describedby={errors.workMode ? "workMode-error" : undefined}
            >
              <option value="" disabled>
                Select work mode
              </option>
              {workModeOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </Select>
            {errors.workMode && (
              <p id="workMode-error" className="text-sm text-red-500">
                {errors.workMode}
              </p>
            )}
            <p className="text-xs text-gray-500">
              We’ll tailor recommendations for your team’s collaboration style.
            </p>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="mt-8 flex items-center justify-between">
          <Button variant="ghost" onClick={handleBack} disabled={step === 0}>
            Back
          </Button>

          <Button onClick={handleNext} className="bg-blue-600 hover:bg-blue-700">
            {step < stepsTotal - 1 ? "Next" : "Start Quiz"}
          </Button>
        </div>
      </div>
    </Card>
  );
}
