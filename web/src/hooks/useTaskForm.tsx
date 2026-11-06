import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {taskFormSchema, type TaskFormInput, type TaskPayload, } from "../components/actions";
import useTasks from "./useTasks";
import useTaskPanel from "./useTaskPanel";

export default function useTaskForm() {
  const { editingTask: task, closeForm } = useTaskPanel();
  const { saveTask, pendingSaveTask } = useTasks();
  const {register, handleSubmit, setError, formState: { errors }, } = useForm<TaskFormInput, unknown, TaskPayload>({
    resolver: zodResolver(taskFormSchema),
    defaultValues: {
      name: task?.name ?? "",
      description: task?.description ?? "",
      deadline: task?.deadline ?? "",
    },
  });

  function onSubmit(values: TaskPayload) {
    saveTask(
      { task: values, taskId: task?.id },
      {
        onSuccess: closeForm,
        onError: () =>
          setError("root", { message: "Não foi possível salvar a tarefa" }),
      },
    );
  }

  return {
    task,
    closeForm,
    pendingSaveTask,
    register,
    handleSubmit,
    errors,
    onSubmit,
  };
}