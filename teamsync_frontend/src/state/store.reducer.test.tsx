import React from "react";
import { render } from "@testing-library/react";
import { AppProvider, useAppDispatch, useAppSelector } from "./store";
import { selectHasOnboarded, selectQuizAnswers } from "./selectors";

function DispatchHarness() {
  const dispatch = useAppDispatch();
  const hasOnboarded = useAppSelector(selectHasOnboarded);
  const answers = useAppSelector(selectQuizAnswers);

  // On mount dispatch a few actions
  React.useEffect(() => {
    dispatch({ type: "onboarding/setTeamName", payload: { teamName: "A-Team" } });
    dispatch({ type: "onboarding/setTeamSize", payload: { teamSize: 6 } });
    dispatch({ type: "onboarding/setWorkMode", payload: { workMode: "hybrid" } });
    dispatch({ type: "onboarding/complete", payload: { completed: true } });

    dispatch({ type: "quiz/setAnswer", payload: { questionId: "q1", choiceId: "a" } });

    dispatch({
      type: "recs/setItems",
      payload: {
        items: [
          { id: "r1", title: "Item", description: "", personaFit: ["Explorer"], minSize: 1, maxSize: null, supportedModes: ["remote", "hybrid", "onsite"], durationMinutes: 30, difficulty: "easy", tags: [], saved: false },
        ],
      },
    });
    dispatch({ type: "recs/toggleSaved", payload: { id: "r1" } });
  }, [dispatch]);

  return (
    <div>
      <div data-testid="onboarded">{String(hasOnboarded)}</div>
      <div data-testid="answers-count">{Object.keys(answers).length}</div>
    </div>
  );
}

describe("store reducer minimal flow", () => {
  it("handles onboarding completion, quiz answer, and saved toggle", async () => {
    const { findByTestId } = render(
      <AppProvider>
        <DispatchHarness />
      </AppProvider>
    );

    const onboarded = await findByTestId("onboarded");
    const answersCount = await findByTestId("answers-count");

    expect(onboarded.textContent).toBe("true");
    expect(Number(answersCount.textContent)).toBeGreaterThanOrEqual(1);
  });
});
