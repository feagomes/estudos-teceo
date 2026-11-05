import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import tasksApi, { type Task } from "../components/actions";

export default function useTasks() {
  const queryClient = useQueryClient();
  const [detailsError, setDetailsError] = useState<string | null>(null);

  const {
    data: tasks = [],
    isError,
    isPending: pendingTasks,
  } = useQuery({
    queryKey: ["tasks"],
    queryFn: tasksApi.getTasks,
  });

  async function showDetails(id: number): Promise<Task | null> {
    try {
      const task = await queryClient.query({
        queryKey: ["task", id],
        queryFn: async () => {
          const response = await tasksApi.findById(id);
          if (!response.ok) {
            throw new Error(
              response.status === 404
                ? "Tarefa não encontrada"
                : "Não foi possível carregar os detalhes",
            );
          }
          return (await response.json()) as Task;
        },
      });

      setDetailsError(null);
      return task;
    } catch {
      setDetailsError("Não foi possível carregar os detalhes");
      return null;
    }
  }

  const { mutateAsync: createTask, isPending: pendingCreateTask } = useMutation(
    {
      mutationFn: async (
        data: Pick<Task, "name"> &
          Partial<Pick<Task, "description" | "deadline">>,
      ) => {
        const result = await tasksApi.createTask(data);
        if (result !== "success")
          throw new Error("Não foi possível criar a tarefa");
      },
      onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tasks"] }),
    },
  );

  const { mutateAsync: editTask, isPending: pendingEditTask } = useMutation({
    mutationFn: async ({
      task,
      taskId,
    }: {
      task: Partial<Task>;
      taskId: number;
    }) => {
      const response = await tasksApi.editTask(task, taskId);
      if (!response.ok) throw new Error("Não foi possível editar a tarefa");
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tasks"] }),
  });

  //modal vai ser o responsavel por excluir, nao confirmar a exclusao
  const { mutateAsync: deleteTask } = useMutation({
    mutationFn: (id: number) => tasksApi.deleteTask(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tasks"] }),
  });

  const { mutate: changeStatus, isPending: pendingChangeStatus } = useMutation({
    mutationFn: async (task: Task) => {
      const response = await tasksApi.editTask(
        { status: !task.status },
        task.id,
      );
      if (!response.ok) throw new Error("Não foi possível atualizar o status");
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tasks"] }),
  });

  return {
    tasks,
    isError,
    pendingTasks,
    showDetails,
    detailsError,
    createTask,
    pendingCreateTask,
    editTask,
    pendingEditTask,
    deleteTask,
    changeStatus,
    pendingChangeStatus,
  };
}
