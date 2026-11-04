import { useState } from "react";
import tasksApi, { type Task } from "./actions";

interface TaskFormProps {
  task: Task | null;
  onSaved: () => void;
  onCancel: () => void;
}

export default function TaskForm({ task, onSaved, onCancel }: TaskFormProps) {
  const [name, setName] = useState(task?.name ?? "");
  const [description, setDescription] = useState(task?.description ?? "");
  const [deadline, setDeadline] = useState(task?.deadline ?? "");
  const [error, setError] = useState<string | null>(null);
  async function saveTask() {
    const payload = {
      name,
      ...(description && { description }),
      ...(deadline && { deadline }),
    };
    let saved = false;
    if (task) {
      const response = await tasksApi.editTask(payload, task.id);
      saved = response.ok;
    } else {
      saved = (await tasksApi.createTask(payload as Task)) === "success";
    }
    if (!saved) {
      setError("Não foi possível salvar a tarefa");
      return;
    }
    setName("");
    setDescription("");
    setDeadline("");
    setError(null);
    onSaved();
  }

  /*const {mutate: createTask, isPending} = useMutation({
    mutationFn: (data: Task) => tasksApi.createTask(data)
  });
  console.log(createTask, isPending)*/

  return (
    <div className="task-form">
      <label className="form-field">
        <span>Nome</span>
        <input
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Ex: Fazer relatório"
        />
      </label>
      <label className="form-field">
        <span>Descrição</span>
        <input
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          placeholder="Ex: Escrever no overleaf"
        />
      </label>
      <label className="form-field">
        <span>Prazo</span>
        <input
          value={deadline}
          onChange={(event) => setDeadline(event.target.value)}
          placeholder="Ex: 2026-11-01"
        />
      </label>
      <div className="form-actions">
        <button type="button" onClick={saveTask}>
          {task ? "Salvar" : "Criar Task"}
        </button>
        {task && (
          <button type="button" className="secundario" onClick={onCancel}>
            Cancelar
          </button>
        )}
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
