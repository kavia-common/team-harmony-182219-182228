import { render, screen, fireEvent } from "@testing-library/react";
import RecommendationCard from "./RecommendationCard";
import type { RecommendationItem } from "@/lib/mock/recommendations";

const sample: RecommendationItem = {
  id: "rec-1",
  title: "Coffee Roulette",
  subtitle: "Randomized coffee chats",
  environment: "indoor",
  duration: "short",
  energyLevel: "low",
  minSize: 2,
  maxSize: 10,
  description: "Pair team members randomly for quick coffee chats.",
  score: 82,
};

describe("RecommendationCard", () => {
  it("renders tags and info", () => {
    render(<RecommendationCard item={sample} onSave={() => {}} />);
    expect(screen.getByText(/coffee roulette/i)).toBeInTheDocument();
    expect(screen.getByText(/indoor/i)).toBeInTheDocument();
    expect(screen.getByText(/short/i)).toBeInTheDocument();
    expect(screen.getByText(/low energy/i)).toBeInTheDocument();
    expect(screen.getByText(/min 2 \/ max 10/i)).toBeInTheDocument();
    expect(screen.getByText(/match score:/i)).toBeInTheDocument();
  });

  it("invokes onSave when button clicked", () => {
    const onSave = vi.fn();
    render(<RecommendationCard item={sample} onSave={onSave} />);
    fireEvent.click(screen.getByRole("button", { name: /save to dashboard/i }));
    expect(onSave).toHaveBeenCalledTimes(1);
  });
});
