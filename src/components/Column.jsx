import { memo, useMemo, useState, useCallback } from 'react';
import TaskCard from './TaskCard';

const Column = memo(function Column({ column, tasks, onMove, onAdd, onDelete }) {
  const [isOver, setIsOver] = useState(false); // local state: hovering only re-renders THIS column
  const [draft, setDraft] = useState('');

  const list = useMemo(() => column.taskIds.map((id) => tasks[id]), [column.taskIds, tasks]);

  const handleDragOver = useCallback((e) => {
    e.preventDefault(); // required to allow dropping
    e.dataTransfer.dropEffect = 'move';
    setIsOver(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    if (!e.currentTarget.contains(e.relatedTarget)) setIsOver(false);
  }, []);

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      setIsOver(false);
      const raw = e.dataTransfer.getData('text/plain');
      if (!raw) return;
      const { taskId, fromId } = JSON.parse(raw);
      const beforeEl = e.target.closest('[data-task-id]');
      onMove({ taskId, fromId, toId: column.id, beforeId: beforeEl ? beforeEl.dataset.taskId : null });
    },
    [column.id, onMove]
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const title = draft.trim();
    if (!title) return;
    onAdd(column.id, title);
    setDraft('');
  };

  return (
    <section
      className={`column ${isOver ? 'column--over' : ''}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <h2>{column.title} <span>{list.length}</span></h2>
      <div className="column__list">
        {list.map((task) => (
          <TaskCard key={task.id} task={task} columnId={column.id} onDelete={onDelete} />
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <input value={draft} onChange={(e) => setDraft(e.target.value)} placeholder="Add a task…" />
      </form>
    </section>
  );
});

export default Column;