import { useReducer, useEffect } from 'react';

const KEY = 'kanban-board-v1';

function init(initial) {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : initial;
  } catch {
    return initial;
  }
}

export function usePersistentReducer(reducer, initial) {
  const [state, dispatch] = useReducer(reducer, initial, init); // lazy init: reads storage once
  useEffect(() => {
    try { localStorage.setItem(KEY, JSON.stringify(state)); } catch { /* storage full/blocked */ }
  }, [state]);
  return [state, dispatch];
}