import type { Task } from "./actions";
import useTasks from "../hooks/useTasks";

interface TasksListProps {
  onSelect: (task: Task) => void;
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
}

export default function TasksList({onSelect, onEdit, onDelete}: TasksListProps) {
  const {tasks, pendingTasks, isError, detailsError, showDetails, changeStatus, pendingChangeStatus} = useTasks();

  return (
    <>
      {pendingTasks && <p>Carregando tarefas...</p>}
      {isError && <p role="alert">Não foi possível carregar as tarefas</p>}
      <ul>
        {tasks.map((task) => (
          <li key={task.id} className={task.status ? "task done" : "task"}>
            <input
              type="checkbox"
              checked={task.status}
              disabled={pendingChangeStatus}
              onChange={() => changeStatus(task)}
            />
            <div className="task-info">
              <strong>{task.name}</strong>
              {task.description && <span className="task-desc">{task.description}</span>}
            </div>
            {task.deadline && <span className="badge">{task.deadline}</span>}
            <button
              type="button"
              className="details-btn"
              onClick={async () => {
                const selected = await showDetails(task.id);
                if (selected) onSelect(selected);
              }}
            >
              Detalhes
            </button>
            <button type="button" className="icon-btn" onClick={() => onEdit(task)}>
              ✏️
            </button>
            <button type="button" className="icon-btn" onClick={() => onDelete(task)}>
              🗑
            </button>
          </li>
        ))}
      </ul>

      {detailsError && <p role="alert">{detailsError}</p>}
    </>
  );
}
