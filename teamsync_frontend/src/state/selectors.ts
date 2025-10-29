import { AppState, Persona, Recommendation, WorkMode } from "./types";

/**
 * Lightweight selector helpers. These are pure functions that read from AppState.
 * Memoization can be added at call sites if necessary.
 */

// PUBLIC_INTERFACE
export function selectOnboarding(state: AppState) {
  /** Returns onboarding slice (teamName, teamSize, workMode, completed). */
  return state.onboarding;
}

// PUBLIC_INTERFACE
export function selectQuizAnswers(state: AppState) {
  /** Returns questionId -> choiceId map. */
  return state.quiz.answers;
}

// PUBLIC_INTERFACE
export function selectPersona(state: AppState): { persona: Persona | null; confidence: number } {
  /** Returns derived persona result and confidence. */
  return state.result;
}

// PUBLIC_INTERFACE
export function selectRecommendations(state: AppState): Recommendation[] {
  /** Returns all recommendation items in state. */
  return state.recommendations.items;
}

// PUBLIC_INTERFACE
export function selectSavedRecommendationIds(state: AppState): string[] {
  /** Returns saved recommendation IDs. */
  return state.recommendations.savedIds;
}

// PUBLIC_INTERFACE
export function selectSavedRecommendations(state: AppState): Recommendation[] {
  /** Returns saved recommendation items. */
  const saved = new Set(state.recommendations.savedIds);
  return state.recommendations.items.filter((it) => saved.has(it.id));
}

// PUBLIC_INTERFACE
export function selectContextualRecommendations(
  state: AppState
): Recommendation[] {
  /**
   * Filter recommendations based on persona and team context.
   */
  const { persona } = state.result;
  const { teamSize, workMode } = state.onboarding;
  return filterRecommendations(state.recommendations.items, persona, teamSize, workMode);
}

function filterRecommendations(
  items: Recommendation[],
  persona: Persona | null,
  teamSize: number | null,
  workMode: WorkMode | null
): Recommendation[] {
  return items.filter((it) => {
    const personaOk = persona ? it.personaFit.includes(persona) : true;
    const sizeOk =
      teamSize == null
        ? true
        : teamSize >= it.minSize && (it.maxSize == null || teamSize <= it.maxSize);
    const modeOk = workMode ? it.supportedModes.includes(workMode) : true;
    return personaOk && sizeOk && modeOk;
  });
}
