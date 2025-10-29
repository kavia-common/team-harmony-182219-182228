import { render, screen } from "@testing-library/react";
import Home from "./page";

describe("Home page", () => {
  it("renders and shows CTAs to /onboard and /quiz", () => {
    render(<Home />);
    // Should render the health check text
    expect(screen.getByText(/UI mounted successfully/i)).toBeInTheDocument();

    // Find the CTA buttons/links
    const onboardCta = screen.getByRole("link", { name: /start onboarding/i });
    const quizCta = screen.getByRole("link", { name: /take the quiz/i });

    expect(onboardCta).toBeInTheDocument();
    expect(onboardCta).toHaveAttribute("href", "/onboard");
    expect(quizCta).toBeInTheDocument();
    expect(quizCta).toHaveAttribute("href", "/quiz");
  });
});
