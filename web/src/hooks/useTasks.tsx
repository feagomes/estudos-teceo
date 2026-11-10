import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import tasksApi, { type Task } from "../components/actions";
import type { TaskPayload } from "./useTaskForm";

export default function useTasks() {
  const queryClient = useQueryClient();
  const {data: tasks = [], isError, isPending: pendingTasks,} = useQuery({
    queryKey: ["tasks"],
    queryFn: tasksApi.getTasks,
  });

  const { mutate: showDetails, error: detailsError } = useMutation({
    mutationFn: (id: number) => tasksApi.findById(id),
  });

  const { mutate: createTask, isPending: pendingCreateTask } = useMutation({
    mutationFn: (task: TaskPayload) => tasksApi.createTask(task),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tasks"] }),
  });

  const { mutate: editTask, isPending: pendingEditTask } = useMutation({
    mutationFn: ({ task, taskId }: { task: TaskPayload; taskId: number }) =>
      tasksApi.editTask(task, taskId),
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
    deleteTask,
    pendingDeleteTask,
    deleteError,
    resetDeleteTask,
    changeStatus,
    pendingChangeStatus,
    createTask,
    pendingCreateTask,
    editTask,
    pendingEditTask,
  };
}
