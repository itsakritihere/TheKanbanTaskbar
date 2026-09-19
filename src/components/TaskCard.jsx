import { memo, useState } from 'react';

const TaskCard = memo(function TaskCard({ task, columnId, onDelete }) {
  const [dragging, setDragging] = useState(false);

  const handleDragStart = (e) => {
    e.dataTransfer.setData('text/plain', JSON.stringify({ taskId: task.id, fromId: columnId }));
    e.dataTransfer.effectAllowed = 'move';
    setDragging(true);
  };

  return (
    <article
      className={`card ${dragging ? 'card--dragging' : ''}`}
      draggable
      data-task-id={task.id}
      onDragStart={handleDragStart}
      onDragEnd={() => setDragging(false)}
    >
      <span>{task.title}</span>
      <button onClick={() => onDelete(columnId, task.id)} aria-label="Delete task">×</button>
    </article>
  );
});

export default TaskCard;