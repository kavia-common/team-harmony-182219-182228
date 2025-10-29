"use client";

import React, { createContext, useContext, useMemo, useReducer } from "react";
import type {
  AppAction,
  AppProviderProps,
  AppState,
  PersonaResult,
  Recommendation,
} from "./types";

/**
 * Initial baseline state for the app.
 */
const initialState: AppState = {
  onboarding: {
    teamName: "",
    teamSize: null,
    workMode: null,
    completed: false,
  },
  quiz: {
    answers: {},
  },
  result: {
    persona: null,
    confidence: 0,
  },
  recommendations: {
    items: [],
    savedIds: [],
  },
};

/**
 * Reducer handling all typed actions.
 */
function reducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case "onboarding/setTeamName": {
      return {
        ...state,
        onboarding: { ...state.onboarding, teamName: action.payload.teamName },
      };
    }
    case "onboarding/setTeamSize": {
      return {
        ...state,
        onboarding: { ...state.onboarding, teamSize: action.payload.teamSize },
      };
    }
    case "onboarding/setWorkMode": {
      return {
        ...state,
        onboarding: { ...state.onboarding, workMode: action.payload.workMode },
      };
    }
    case "onboarding/complete": {
      const completed = action.payload?.completed ?? true;
      return {
        ...state,
        onboarding: { ...state.onboarding, completed },
      };
    }
    case "quiz/setAnswer": {
      const { questionId, choiceId } = action.payload;
      return {
        ...state,
        quiz: {
          answers: { ...state.quiz.answers, [questionId]: choiceId },
        },
      };
    }
    case "quiz/setAnswers": {
      return {
        ...state,
        quiz: {
          answers: { ...action.payload.answers },
        },
      };
    }
    case "result/setPersona": {
      const result: PersonaResult = {
        persona: action.payload.persona,
        confidence: action.payload.confidence,
      };
      return { ...state, result };
    }
    case "recs/setItems": {
      const items = action.payload.items;
      // Keep savedIds consistent with existing state
      const savedIds = state.recommendations.savedIds.filter((id) =>
        items.some((it) => it.id === id)
      );
      return {
        ...state,
        recommendations: {
          items,
          savedIds,
        },
      };
    }
    case "recs/toggleSaved": {
      const id = action.payload.id;
      const isSaved = state.recommendations.savedIds.includes(id);
      const savedIds = isSaved
        ? state.recommendations.savedIds.filter((x) => x !== id)
        : [...state.recommendations.savedIds, id];

      // also update flag on item for UI convenience
      const items: Recommendation[] = state.recommendations.items.map((it) =>
        it.id === id ? { ...it, saved: !isSaved } : it
      );

      return {
        ...state,
        recommendations: { items, savedIds },
      };
    }
    case "recs/setSaved": {
      const savedIds = action.payload.savedIds;
      const items: Recommendation[] = state.recommendations.items.map((it) => ({
        ...it,
        saved: savedIds.includes(it.id),
      }));
      return {
        ...state,
        recommendations: { items, savedIds },
      };
    }
    default:
      return state;
  }
}

type AppContextValue = {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
};

// Use a non-generic createContext call and cast after to avoid TS parser/generic issues in some environments.
const AppStateContext = createContext(undefined as unknown as AppContextValue);

/**
 * PUBLIC_INTERFACE
 * AppProvider wraps the application with global state via Context + useReducer.
 */
export function AppProvider(props: AppProviderProps) {
  const { children } = props;
  const [state, dispatch] = useReducer(reducer, initialState);

  // Note: dispatch from useReducer is stable; include only state to avoid TS parse issues in some setups.
  const value = useMemo<AppContextValue>(() => ({ state, dispatch }), [state]);

  return React.createElement(
    AppStateContext.Provider,
    { value },
    children
  );
}

/**
 * PUBLIC_INTERFACE
 * Hook to access the global state.
 */
export function useAppState() {
  const ctx = useContext(AppStateContext);
  if (!ctx) {
    throw new Error("useAppState must be used within AppProvider");
  }
  return ctx.state;
}

/**
 * PUBLIC_INTERFACE
 * Hook to access the global dispatch.
 */
export function useAppDispatch() {
  const ctx = useContext(AppStateContext);
  if (!ctx) {
    throw new Error("useAppDispatch must be used within AppProvider");
  }
  return ctx.dispatch;
}
