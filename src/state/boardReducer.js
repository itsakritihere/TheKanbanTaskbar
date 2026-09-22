export const initialState = {
  tasks: {
    t1: { id: 't1', title: 'Design the component tree' },
    t2: { id: 't2', title: 'Write the reducer' },
    t3: { id: 't3', title: 'Deploy to Vercel' },
  },
  columns: {
    todo:       { id: 'todo',       title: 'To Do',       taskIds: ['t1', 't2', 't3'] },
    inprogress: { id: 'inprogress', title: 'In Progress', taskIds: [] },
    done:       { id: 'done',       title: 'Done',        taskIds: [] },
  },
  columnOrder: ['todo', 'inprogress', 'done'],
};

export function boardReducer(state, action) {
  switch (action.type) {
    case 'ADD_TASK': {
      const { columnId, task } = action; 
      const col = state.columns[columnId];
      return {
        ...state,
        tasks: { ...state.tasks, [task.id]: task },
        columns: { ...state.columns, [columnId]: { ...col, taskIds: [...col.taskIds, task.id] } },
      };
    }

    case 'DELETE_TASK': {
      const { columnId, taskId } = action;
      const col = state.columns[columnId];
      const { [taskId]: _removed, ...tasks } = state.tasks;
      return {
        ...state,
        tasks,
        columns: { ...state.columns, [columnId]: { ...col, taskIds: col.taskIds.filter((id) => id !== taskId) } },
      };
    }

    case 'MOVE_TASK': {
      const { taskId, fromId, toId, beforeId } = action; 
      if (beforeId === taskId) return state; 

      const from = state.columns[fromId];
      const to = state.columns[toId];
      const fromIds = from.taskIds.filter((id) => id !== taskId);
      const targetIds = fromId === toId ? fromIds : [...to.taskIds];

      const at = beforeId ? targetIds.indexOf(beforeId) : -1;
      const nextTarget =
        at === -1 ? [...targetIds, taskId] : [...targetIds.slice(0, at), taskId, ...targetIds.slice(at)];

      return {
        ...state,
        columns: {
          ...state.columns,
          [fromId]: { ...from, taskIds: fromIds },
          [toId]: { ...to, taskIds: nextTarget },
        },
      };
    }

    default:
      return state;
  }
}