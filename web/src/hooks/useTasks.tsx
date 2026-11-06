import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import tasksApi, { type Task, type TaskPayload } from "../components/actions";

export default function useTasks() {
  const queryClient = useQueryClient();
  const [detailsError, setDetailsError] = useState<string | null>(null);

  const {data: tasks = [], isError, isPending: pendingTasks,} = useQuery({
    queryKey: ["tasks"],
    queryFn: tasksApi.getTasks,
  });

  async function showDetails(id: number, onFound: (task: Task) => void) {
    try {
      const task = await queryClient.query({
        queryKey: ["task", id],
        queryFn: () => tasksApi.findById(id),
      });
      //onSuccess 
      setDetailsError(null);
      onFound(task);
    } catch (error) {
      setDetailsError(
        error instanceof Error ? error.message : "Não foi possível carregar os detalhes",);
    }
  }

  const { mutate: saveTask, isPending: pendingSaveTask } = useMutation({
    mutationFn: ({ task, taskId }: { task: TaskPayload; taskId?: number }) => tasksApi.saveTask(task, taskId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tasks"] }),
  });

  const {mutate: deleteTask, isPending: pendingDeleteTask, error: deleteError,reset: resetDeleteTask,} = useMutation({
    mutationFn: (id: number) => tasksApi.deleteTask(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tasks"] }),
  });

  const { mutate: changeStatus, isPending: pendingChangeStatus } = useMutation({
    mutationFn: (task: Task) =>
      tasksApi.editTask({ status: !task.status }, task.id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tasks"] }),
  });

  return {
    tasks,
    isError,
    pendingTasks,
    showDetails,
    detailsError,
    saveTask,
    pendingSaveTask,
    deleteTask,
    pendingDeleteTask,
    deleteError,
    resetDeleteTask,
    changeStatus,
    pendingChangeStatus,
  };
}
