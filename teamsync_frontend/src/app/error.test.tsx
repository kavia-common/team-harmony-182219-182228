import { render, screen, fireEvent } from "@testing-library/react";
import GlobalError from "./error";

describe("Global error boundary", () => {
  it("renders error message and calls reset", () => {
    const reset = vi.fn();
    const error = new Error("Boom!");
    render(<GlobalError error={error} reset={reset} />);

    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
    expect(screen.getByText(/boom!/i)).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /try again/i }));
    expect(reset).toHaveBeenCalledTimes(1);
  });
});
