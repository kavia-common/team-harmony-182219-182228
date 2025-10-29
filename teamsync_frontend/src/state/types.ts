import { ReactNode } from "react";

/**
 * Shared type definitions for TeamSync global state, actions, and domain models.
 */

/**
 * Team working mode options for onboarding context.
 */
export type WorkMode = "remote" | "hybrid" | "onsite";

/**
 * Team context captured from onboarding.
 */
export interface OnboardingState {
  teamName: string;
  teamSize: number | null;
  workMode: WorkMode | null;
  completed: boolean;
}

/**
 * A single weighted choice in a question.
 */
export interface QuestionChoice {
  id: string;
  label: string;
  weight: number; // used to compute persona/score
}

/**
 * A single quiz question definition.
 */
export interface Question {
  id: string;
  prompt: string;
  choices: QuestionChoice[];
}

/**
 * The user's answer for a given question.
 */
export interface Answer {
  questionId: string;
  choiceId: string;
}

/**
 * Derived persona classification after scoring answers.
 */
export type Persona =
  | "Connector"     // prioritizes social connection and collaboration
  | "Challenger"    // enjoys competition and high energy activities
  | "Explorer"      // prefers variety, creativity, learning
  | "Balancer";     // appreciates calm, mindfulness, and balance

/**
 * Result of scoring the quiz answers.
 */
export interface PersonaResult {
  persona: Persona | null;
  confidence: number; // 0..1
}

/**
 * A recommendation returned by the generator.
 */
export interface Recommendation {
  id: string;
  title: string;
  description: string;
  personaFit: Persona[]; // personas this suits
  minSize: number; // minimal team size
  maxSize: number | null; // null means no max
  supportedModes: WorkMode[]; // applicable work modes
  durationMinutes: number;
  difficulty: "easy" | "moderate" | "high";
  tags: string[];
  saved?: boolean;
}

/**
 * State slice for recommendations.
 */
export interface RecommendationsState {
  items: Recommendation[];
  savedIds: string[]; // saved by user
}

/**
 * Root application state for the TeamSync MVP.
 */
export interface AppState {
  onboarding: OnboardingState;
  quiz: {
    answers: Record<string, string>; // questionId -> choiceId
  };
  result: PersonaResult;
  recommendations: RecommendationsState;
}

/**
 * PUBLIC_INTERFACE
 * Typed actions supported by the reducer/store.
 */
export type AppAction =
  | {
      type: "onboarding/setTeamName";
      payload: { teamName: string };
    }
  | {
      type: "onboarding/setTeamSize";
      payload: { teamSize: number | null };
    }
  | {
      type: "onboarding/setWorkMode";
      payload: { workMode: WorkMode | null };
    }
  | {
      type: "onboarding/complete";
      payload?: { completed?: boolean };
    }
  | {
    /**
     * Set a quiz answer for a specific question.
     */
      type: "quiz/setAnswer";
      payload: { questionId: string; choiceId: string };
    }
  | {
    /**
     * Bulk replace all quiz answers (e.g., resetting or prefill).
     */
      type: "quiz/setAnswers";
      payload: { answers: Record<string, string> };
    }
  | {
    /**
     * Set persona result after scoring.
     */
      type: "result/setPersona";
      payload: { persona: Persona | null; confidence: number };
    }
  | {
    /**
     * Load or replace recommendation items (e.g., from generator).
     */
      type: "recs/setItems";
      payload: { items: Recommendation[] };
    }
  | {
    /**
     * Toggle save state for a recommendation ID.
     */
      type: "recs/toggleSaved";
      payload: { id: string };
    }
  | {
    /**
     * Explicitly set saved recommendation IDs.
     */
      type: "recs/setSaved";
      payload: { savedIds: string[] };
    };

/**
 * PUBLIC_INTERFACE
 * React Context props interface.
 */
export interface AppProviderProps {
  children: ReactNode;
}
