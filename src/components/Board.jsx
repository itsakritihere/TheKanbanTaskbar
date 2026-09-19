import { useCallback } from 'react';
import { boardReducer, initialState } from '../state/boardReducer';
import { usePersistentReducer } from '../state/usePersistentReducer';
import Column from './Column';

export default function Board() {
  const [state, dispatch] = usePersistentReducer(boardReducer, initialState);

  const handleMove = useCallback((move) => dispatch({ type: 'MOVE_TASK', ...move }), [dispatch]);
  const handleAdd = useCallback(
    (columnId, title) =>
      dispatch({ type: 'ADD_TASK', columnId, task: { id: crypto.randomUUID(), title } }),
    [dispatch]
  );
  const handleDelete = useCallback(
    (columnId, taskId) => dispatch({ type: 'DELETE_TASK', columnId, taskId }),
    [dispatch]
  );

  return (
    <main className="board">
      {state.columnOrder.map((id) => (
        <Column
          key={id}
          column={state.columns[id]}
          tasks={state.tasks}
          onMove={handleMove}
          onAdd={handleAdd}
          onDelete={handleDelete}
        />
      ))}
    </main>
  );
}