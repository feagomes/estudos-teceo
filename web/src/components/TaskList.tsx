import useTasks from "../hooks/useTasks";
import useTaskPanel from "../hooks/useTaskPanel";

export default function TasksList() {
  const { openDetails, openEdit, openDelete } = useTaskPanel();
  const {tasks, pendingTasks, isError, detailsError, showDetails, changeStatus, pendingChangeStatus,} = useTasks();

  return (
    <>
      {pendingTasks && <p>Carregando tarefas...</p>}
      {isError ? (
        <p role="alert">Não foi possível carregar as tarefas</p>
      ) : (
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
                {task.description && (
                  <span className="task-desc">{task.description}</span>
                )}
              </div>
              {task.deadline && <span className="badge">{task.deadline}</span>}
              <button
                type="button"
                className="details-btn"
                onClick={() => showDetails(task.id, openDetails)}
              >
                Detalhes
              </button>
              <button
                type="button"
                className="icon-btn"
                onClick={() => openEdit(task)}
              >
                ✏️
              </button>
              <button
                type="button"
                className="icon-btn"
                onClick={() => openDelete(task)}
              >
                🗑
              </button>
            </li>
          ))}
        </ul>
      )}

      {detailsError && <p role="alert">{detailsError}</p>}
    </>
  );
}
