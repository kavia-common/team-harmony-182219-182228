import React from "react";
import { renderWithProviders } from "@/test/test-utils";
import { useClientGuard } from "./clientGuards";
import { screen } from "@testing-library/react";

// A helper component to render the hook output
function GuardProbe({ onboard, quiz }: { onboard: boolean; quiz: boolean }) {
  const { guardNotice } = useClientGuard({
    requireOnboard: onboard,
    requireQuiz: quiz,
  });
  return <div data-testid="probe">{guardNotice}</div>;
}

describe("useClientGuard", () => {
  it("renders inline alert when onboarding required and not completed", () => {
    renderWithProviders(<GuardProbe onboard={true} quiz={false} />);
    expect(
      screen.getByText(/complete onboarding to continue/i)
    ).toBeInTheDocument();
  });

  it("renders combined alert when both required", () => {
    renderWithProviders(<GuardProbe onboard={true} quiz={true} />);
    expect(
      screen.getByText(/complete onboarding and quiz to unlock this page/i)
    ).toBeInTheDocument();
  });
});
