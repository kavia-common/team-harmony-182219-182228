import { render, screen } from "@testing-library/react";
import OnboardPage from "./page";
import { AppProvider } from "@/state/store";

// Mock next/navigation used in subcomponents if any
vi.mock("next/navigation", () => ({
  usePathname: () => "/onboard",
  useRouter: () => ({ push: vi.fn(), prefetch: vi.fn() }),
}));

// Simple render helper to wrap components with AppProvider
function renderWithProviders(ui: React.ReactElement) {
  return render(<AppProvider>{ui}</AppProvider>);
}

describe("Onboard page", () => {
  it("renders without crashing and shows the form title", () => {
    renderWithProviders(<OnboardPage />);
    expect(
      screen.getByRole("heading", { name: /let’s set up your team/i })
    ).toBeInTheDocument();
  });
});
