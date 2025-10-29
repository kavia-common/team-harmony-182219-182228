import { render, screen } from "@testing-library/react";
import ClientLayout from "./ClientLayout";

// Mock next/navigation usePathname used by NavBar to avoid RouterContext requirements
vi.mock("next/navigation", () => ({
  usePathname: () => "/",
}));

describe("ClientLayout", () => {
  it("renders children content", () => {
    render(
      <ClientLayout>
        <div data-testid="child">Hello</div>
      </ClientLayout>
    );

    // NavBar brand appears
    expect(screen.getByText(/TeamSync/i)).toBeInTheDocument();
    // Child rendered inside layout
    expect(screen.getByTestId("child")).toHaveTextContent("Hello");
  });
});
