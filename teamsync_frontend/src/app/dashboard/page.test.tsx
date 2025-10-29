import { screen } from "@testing-library/react";
import DashboardPage from "./page";
import { renderWithProviders } from "@/test/test-utils";

describe("Dashboard route", () => {
  it("renders headings and key sections (smoke)", () => {
    renderWithProviders(<DashboardPage />);
    expect(screen.getByRole("heading", { name: /team dashboard/i })).toBeInTheDocument();

    // Button to explore new picks
    expect(screen.getByRole("button", { name: /explore new picks/i })).toBeInTheDocument();
  });
});
