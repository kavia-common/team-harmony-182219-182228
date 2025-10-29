import { render, screen } from "@testing-library/react";
import NavBar from "./NavBar";

// Mock next/navigation usePathname hook to avoid errors in jsdom and ensure deterministic active state
vi.mock("next/navigation", () => ({
  usePathname: () => "/",
}));

describe("NavBar", () => {
  it("renders primary navigation links", () => {
    render(<NavBar />);

    const links = [
      { name: /home/i, href: "/" },
      { name: /onboard/i, href: "/onboard" },
      { name: /quiz/i, href: "/quiz" },
      { name: /recommendations/i, href: "/recommendations" },
      { name: /dashboard/i, href: "/dashboard" },
    ];

    for (const { name, href } of links) {
      const link = screen.getByRole("link", { name });
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute("href", href);
    }
  });
});
