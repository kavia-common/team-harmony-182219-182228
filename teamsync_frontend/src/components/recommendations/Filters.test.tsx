import { screen, fireEvent } from "@testing-library/react";
import Filters, { FiltersState } from "./Filters";
import { render } from "@testing-library/react";

describe("Filters", () => {
  const base: FiltersState = { duration: "any", energy: "any", environment: "any" };

  it("renders all labels and options", () => {
    render(<Filters value={base} onChange={() => {}} />);

    expect(screen.getByLabelText(/duration/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/energy level/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/environment/i)).toBeInTheDocument();

    // Spot check options exist
    expect(screen.getAllByRole("option", { name: /any/i }).length).toBeGreaterThan(0);
  });

  it("calls onChange when selections change", () => {
    const onChange = vi.fn();
    render(<Filters value={base} onChange={onChange} />);

    fireEvent.change(screen.getByLabelText(/duration/i), { target: { value: "short" } });
    expect(onChange).toHaveBeenCalled();
    fireEvent.change(screen.getByLabelText(/energy level/i), { target: { value: "high" } });
    expect(onChange).toHaveBeenCalled();
    fireEvent.change(screen.getByLabelText(/environment/i), { target: { value: "outdoor" } });
    expect(onChange).toHaveBeenCalled();
  });
});
