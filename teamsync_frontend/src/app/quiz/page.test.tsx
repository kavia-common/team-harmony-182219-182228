import { render, screen } from "@testing-library/react";
import QuizPage from "./page";

// Mock next/navigation router used in QuizPage
vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn(), prefetch: vi.fn() }),
}));

// Mock global store hooks to provide minimal state
vi.mock("@/state/store", () => {
  const state = {
    onboarding: { teamName: "", teamSize: null, workMode: null, completed: false },
    quiz: { answers: {} as Record<string, string> },
    result: { persona: null as string | null, confidence: 0 },
    recommendations: { items: [] as Array<unknown>, savedIds: [] as string[] },
  };
  return {
    useAppDispatch: () => vi.fn(),
    useAppState: () => state,
  };
});

// Use real mock questions implementation (returns 5 items) - no changes required
// If needed in future, we can explicitly mock it; for now use module as-is.

describe("Quiz page", () => {
  it("renders question container initially", () => {
    render(<QuizPage />);
    // Title
    expect(screen.getByRole("heading", { name: /team personality quiz/i })).toBeInTheDocument();
    // Progress text "1 of 5"
    expect(screen.getByText(/1 of/i)).toBeInTheDocument();
    // Expect the quiz card question prompt area present
    // Using text from real mock questions: ensure at least "Loading" isn't shown
    expect(screen.queryByText(/loading quiz/i)).not.toBeInTheDocument();
  });
});
