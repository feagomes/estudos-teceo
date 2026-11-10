import { useState } from "react";
import useTaskForm, { type TaskPayload } from "./useTaskForm";
import useTasks from "./useTasks";
import type { Task } from "../components/actions";

export default function useEditTask(task: Task) {
  const { editTask, pendingEditTask } = useTasks();
  const [editing, setEditing] = useState(false);
  const { control, handleSubmit, reset, setError, formState: { errors } } = useTaskForm();

  function startEdit() {
    reset({
      name: task.name,
      description: task.description ?? "",
      deadline: task.deadline ?? "",
    });
    setEditing(true);
  }

  function cancelEdit() {
    setEditing(false);
  }

  function onSubmit(values: TaskPayload) {
    editTask(
      { task: values, taskId: task.id },
      {
        onSuccess: () => setEditing(false),
        onError: () => setError("root", { message: "Não foi possível editar a tarefa" }),
      },
    );
  }

  return {
    editing,
    startEdit,
    cancelEdit,
    control,
    errors,
    submit: handleSubmit(onSubmit),
    pendingEditTask,
  };
}
