"use client";

import React, { createContext, useContext, useEffect, useMemo, useReducer, useState } from "react";
import type {
  AppAction,
  AppProviderProps,
  AppState,
  PersonaResult,
  Recommendation,
} from "./types";
import { readStorage, writeStorage, clearStorage, STORAGE_KEY, isBrowser } from "@/lib/utils/storage";

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
type InternalResetAction = { type: "__internal/reset" };
type ExtendedAction =
  | AppAction
  | { type: "saved/add"; payload: Recommendation }
  | InternalResetAction;

function reducer(state: AppState, action: AppAction | InternalResetAction): AppState {
  switch (action.type) {
    case "__internal/reset": {
      // Reset to initialState but keep current items list to avoid blank UI where items are generated in-memory
      return {
        ...initialState,
        recommendations: {
          ...initialState.recommendations,
          items: state.recommendations.items,
        },
      };
    }
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
      const completed =
        "payload" in action && action.payload && typeof action.payload === "object"
          ? (action as Extract<AppAction, { type: "onboarding/complete" }>).payload?.completed ?? true
          : true;
      return {
        ...state,
        onboarding: { ...state.onboarding, completed },
      };
    }
    case "quiz/setAnswer": {
      const { questionId, choiceId } = (action as Extract<AppAction, { type: "quiz/setAnswer" }>).payload;
      return {
        ...state,
        quiz: {
          answers: { ...state.quiz.answers, [questionId]: choiceId },
        },
      };
    }
    case "quiz/setAnswers": {
      const { answers } = (action as Extract<AppAction, { type: "quiz/setAnswers" }>).payload;
      return {
        ...state,
        quiz: {
          answers: { ...answers },
        },
      };
    }
    case "result/setPersona": {
      const { persona, confidence } = (action as Extract<AppAction, { type: "result/setPersona" }>).payload;
      const result: PersonaResult = {
        persona,
        confidence,
      };
      return { ...state, result };
    }
    case "recs/setItems": {
      const { items } = (action as Extract<AppAction, { type: "recs/setItems" }>).payload;
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
      const { id } = (action as Extract<AppAction, { type: "recs/toggleSaved" }>).payload;
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
      const { savedIds } = (action as Extract<AppAction, { type: "recs/setSaved" }>).payload;
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
  dispatch: React.Dispatch<ExtendedAction>;
  isHydrated: boolean;
  // PUBLIC_INTERFACE: convenience reset that also clears persisted storage
  resetApp: () => void;
};

// Use a non-generic createContext call and cast after to avoid TS parser/generic issues in some environments.
const AppStateContext = createContext(undefined as unknown as AppContextValue);

/**
 * PUBLIC_INTERFACE
 * AppProvider wraps the application with global state via Context + useReducer.
 * Adds client-side hydration from localStorage and persistence on changes.
 */
export function AppProvider(props: AppProviderProps) {
  const { children } = props;

  // Start with initialState on server; hydrate on client to avoid SSR mismatch
  const [state, baseDispatch] = useReducer(reducer, initialState);
  const [isHydrated, setIsHydrated] = useState(false);

  // Hydrate from storage on first client mount
  useEffect(() => {
    if (!isBrowser()) return;
    const persisted = readStorage<Partial<AppState>>(STORAGE_KEY);
    if (persisted) {
      // Apply onboarding
      if (persisted.onboarding) {
        const { teamName, teamSize, workMode, completed } = persisted.onboarding;
        if (typeof teamName === "string") {
          baseDispatch({ type: "onboarding/setTeamName", payload: { teamName } });
        }
        if (typeof teamSize === "number" || teamSize === null) {
          baseDispatch({ type: "onboarding/setTeamSize", payload: { teamSize } });
        }
        if (workMode === "remote" || workMode === "hybrid" || workMode === "onsite" || workMode === null) {
          baseDispatch({ type: "onboarding/setWorkMode", payload: { workMode } });
        }
        if (completed) {
          baseDispatch({ type: "onboarding/complete", payload: { completed: true } });
        }
      }
      // Apply quiz
      if (persisted.quiz?.answers) {
        baseDispatch({ type: "quiz/setAnswers", payload: { answers: persisted.quiz.answers } });
      }
      // Apply result
      if (persisted.result) {
        baseDispatch({
          type: "result/setPersona",
          payload: {
            persona: persisted.result.persona ?? null,
            confidence: Number(persisted.result.confidence ?? 0),
          },
        });
      }
      // Apply saved recommendations
      if (persisted.recommendations?.savedIds) {
        baseDispatch({ type: "recs/setSaved", payload: { savedIds: persisted.recommendations.savedIds } });
      }
    }
    setIsHydrated(true);
  }, []);

  // Persist critical slices whenever state changes after hydration
  useEffect(() => {
    if (!isHydrated || !isBrowser()) return;
    const snapshot: Partial<AppState> = {
      onboarding: state.onboarding,
      quiz: { answers: state.quiz.answers },
      result: state.result,
      recommendations: { items: [], savedIds: state.recommendations.savedIds },
    };
    writeStorage(STORAGE_KEY, snapshot);
  }, [state.onboarding, state.quiz.answers, state.result, state.recommendations.savedIds, isHydrated]);

  // Provide a small wrapper to accept "saved/add" from UI and convert to toggle; also support reset
  const dispatch = useMemo(() => {
    return (action: ExtendedAction) => {
      if (action.type === "saved/add") {
        baseDispatch({ type: "recs/toggleSaved", payload: { id: action.payload.id } });
        return;
      }
      if (action.type === "__internal/reset") {
        baseDispatch(action);
        return;
      }
      baseDispatch(action as AppAction);
    };
  }, []);

  const resetApp = useMemo(() => {
    return () => {
      clearStorage(STORAGE_KEY);
      baseDispatch({ type: "__internal/reset" });
    };
  }, []);

  const value = useMemo<AppContextValue>(
    () => ({ state, dispatch, isHydrated, resetApp }),
    [state, dispatch, isHydrated, resetApp]
  );

  // Avoid UI flicker: render children but allow clients to guard via isHydrated if needed.
  return React.createElement(AppStateContext.Provider, { value }, children);
}

/**
 * PUBLIC_INTERFACE
 * Hook that returns the whole app state object.
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
 * Hook to access a selected slice of the global state.
 */
export function useAppSelector<T>(selector: (s: AppState) => T): T {
  const state = useAppState();
  return selector(state);
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

// PUBLIC_INTERFACE
// Convenience action creator used by /recommendations page
export const addSavedRecommendation = (item: Recommendation) => ({
  type: "saved/add" as const,
  payload: item,
});

// PUBLIC_INTERFACE
// Access hydration flag for components that need to avoid SSR mismatch
export function useIsHydrated(): boolean {
  const ctx = useContext(AppStateContext);
  if (!ctx) {
    throw new Error("useIsHydrated must be used within AppProvider");
  }
  return ctx.isHydrated;
}

// PUBLIC_INTERFACE
// Access reset action to clear persisted state (optional UI can call this)
export function useResetApp(): () => void {
  const ctx = useContext(AppStateContext);
  if (!ctx) {
    throw new Error("useResetApp must be used within AppProvider");
  }
  return ctx.resetApp;
}
