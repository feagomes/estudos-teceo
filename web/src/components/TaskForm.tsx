import { useForm } from "react-hook-form";
import type { Task } from "./actions";
import useTasks from "../hooks/useTasks";

interface TaskFormProps {
  task: Task | null;
  onSaved: () => void;
  onCancel: () => void;
}

type FormValues = {
  name: string;
  description: string;
  deadline: string;
};

export default function TaskForm({ task, onSaved, onCancel }: TaskFormProps) {
  const { createTask, pendingCreateTask, editTask, pendingEditTask } = useTasks();
  const {register, handleSubmit, setError, formState: { errors, isSubmitting },} = useForm<FormValues>({
    defaultValues: {
      name: task?.name ?? "",
      description: task?.description ?? "",
      deadline: task?.deadline ?? "",
    },
  });

  async function saveTask(values: FormValues) {
    const payload = {
      name: values.name,
      ...(values.description && { description: values.description }),
      ...(values.deadline && { deadline: values.deadline }),
    };

    try {
      if (task) await editTask({ task: payload, taskId: task.id });
      else await createTask(payload);
      onSaved();
    } catch{
      setError("root",{ message: "Não foi possível salvar a tarefa" });
    }
  }

  return (
    <form className="task-form" onSubmit={handleSubmit(saveTask)} noValidate>
      <label className="form-field">
        <span>Nome</span>
        <input
          {...register("name", {
            validate: (value) => value !== "" || "Informe o nome da tarefa",
          })}
          placeholder="Ex: Fazer relatório"
        />
        {errors.name && <span role="alert">{errors.name.message}</span>}
      </label>
      <label className="form-field">
        <span>Descrição</span>
        <input {...register("description")} placeholder="Ex: Escrever no overleaf" />
      </label>
      <label className="form-field">
        <span>Prazo</span>
        <input {...register("deadline")} placeholder="Ex: 2026-11-01" />
      </label>
      <div className="form-actions">
        <button type="submit" disabled={isSubmitting || pendingCreateTask || pendingEditTask}>
          {task ? "Salvar" : "Criar Task"}
        </button>
        {task && (
          <button type="button" className="secundario" onClick={onCancel}>
            Cancelar
          </button>
        )}
      </div>
      {errors.root && <p role="alert" style={{ color: "red" }}>{errors.root.message}</p>}
    </form>
  );
}
