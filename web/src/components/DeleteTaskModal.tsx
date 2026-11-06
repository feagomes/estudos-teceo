import useTasks from "../hooks/useTasks";
import useTaskPanel from "../hooks/useTaskPanel";

export default function DeleteTaskModal() {
  const { taskToDelete: task, closeDelete, handleDeleted } = useTaskPanel();
  const { deleteTask, pendingDeleteTask, deleteError, resetDeleteTask } = useTasks();
  if (!task) return null;

  function close() {
    resetDeleteTask();
    closeDelete();
  }
  function confirm() {
    if (!task) return;
    deleteTask(task.id, {
      onSuccess: () => {
        resetDeleteTask();
        handleDeleted(task);
      },
    });
  }

  return (
    <div className="modal-backdrop">
      <section
        className="delete-modal"
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="delete-task-title"
        onKeyDown={(event) => {
          if (event.key === "Escape") close();
        }}
      >
        <h2 id="delete-task-title">Excluir tarefa?</h2>
        <p>Deseja excluir “{task.name}”?</p>
        {deleteError && (
          <p role="alert" style={{ color: "red" }}>
            {deleteError.message}
          </p>
        )}
        <div className="modal-actions">
          <button type="button" onClick={close}>
            Cancelar
          </button>
          <button
            type="button"
            className="delete-confirm"
            disabled={pendingDeleteTask}
            onClick={confirm}
          >
            Excluir
          </button>
        </div>
      </section>
    </div>
  );
}
