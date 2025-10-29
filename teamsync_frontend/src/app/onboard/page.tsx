"use client";

import React from "react";
import Container from "@/components/Container";
import OnboardForm from "@/components/onboarding/OnboardForm";

/**
 * PUBLIC_INTERFACE
 * OnboardPage
 * Renders the onboarding flow for TeamSync where users provide team details.
 * - Displays a multi-step form to collect team name, size, and work mode.
 * - Applies Ocean Professional styling through the shared Container.
 * - Persists data via global store actions from the form.
 * Returns a centered responsive layout that hosts the onboarding steps.
 */
export default function OnboardPage() {
  return (
    <Container>
      <div className="mx-auto max-w-2xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900">Let’s set up your team</h1>
          <p className="mt-2 text-gray-600">
            A quick setup to personalize your experience. You can change this later in the dashboard.
          </p>
        </div>
        <OnboardForm />
      </div>
    </Container>
  );
}
