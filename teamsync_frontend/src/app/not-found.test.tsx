import { render, screen } from "@testing-library/react";
import NotFound from "./not-found";

describe("not-found page", () => {
  it("renders 404 message and nav buttons", () => {
    render(<NotFound />);
    expect(screen.getByRole("heading", { name: /page not found/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /go to home/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /explore recommendations/i })).toBeInTheDocument();
  });
});
