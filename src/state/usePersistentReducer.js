
import { useReducer, useEffect } from 'react';

const KEY = 'kanban-board-v1';

function init(initial) {
  const savedData = localStorage.getItem(KEY);

  if (savedData) {
    try {
      return JSON.parse(savedData);
    } catch (error) {
      return initial;
    }
  }

  return initial;
}

export function usePersistentReducer(reducer, initial) {
  const [state, dispatch] = useReducer(reducer, initial, init);

  useEffect(() => {
    const data = JSON.stringify(state);

    try {
      localStorage.setItem(KEY, data);
    } catch (error) {
      // localStorage may not be available
    }
  }, [state]);

  return [state, dispatch];
}

