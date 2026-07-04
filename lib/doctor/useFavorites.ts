"use client";

import { useCallback, useEffect, useReducer } from "react";

const STORAGE_KEY = "cfs_doctor_favorites";

type Action = { type: "RESTORE"; ids: string[] } | { type: "TOGGLE"; id: string };

function reducer(state: string[], action: Action): string[] {
  switch (action.type) {
    case "RESTORE":
      return action.ids;
    case "TOGGLE":
      return state.includes(action.id)
        ? state.filter((existing) => existing !== action.id)
        : [...state, action.id];
  }
}

export function useFavorites() {
  const [favorites, dispatch] = useReducer(reducer, []);

  // Restore from localStorage on mount only (matches the sessionStorage
  // restore pattern in components/quiz/QuizClient.tsx) — avoids a
  // server/client hydration mismatch from reading localStorage during render.
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) dispatch({ type: "RESTORE", ids: JSON.parse(raw) });
    } catch {
      // corrupt storage — ignore, start with an empty list
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = useCallback((id: string) => {
    dispatch({ type: "TOGGLE", id });
  }, []);

  return { favorites, toggleFavorite };
}
