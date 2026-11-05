import type { Task } from "./actions";

interface DeleteTaskModalProps {
  task: Task | null;
  error: string | null;
  onCancel: () => void;
  onConfirm: () => void;
}

export default function DeleteTaskModal({task, error, onCancel, onConfirm,}: DeleteTaskModalProps) {
  if (!task) return null;
  return (
    <div className="modal-backdrop">
      <section
        className="delete-modal"
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="delete-task-title"
        onKeyDown={(event) => {
          if (event.key === "Escape") onCancel();
        }}
      >
        <h2 id="delete-task-title">Excluir tarefa?</h2>
        <p>Deseja excluir “{task.name}”?</p>
        {error && <p role="alert" style={{ color: "red" }}>{error}</p>}
        <div className="modal-actions">
          <button type="button" onClick={onCancel} autoFocus>Cancelar</button>
          <button type="button" className="delete-confirm" onClick={onConfirm}>Excluir</button>
        </div>
      </section>
    </div>
  );
}
