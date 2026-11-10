import { useState, type ReactNode } from "react";
import type { Task } from "../components/actions";
import { TaskPanelContext } from "../hooks/useTaskPanel";

export function TaskPanelProvider({ children }: { children: ReactNode }) {
  const [currentTask, setCurrentTask] = useState<Task | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<Task | null>(null);

  function openDetails(task: Task) {
    setCurrentTask(task);
    setShowForm(false);
  }

  function openCreate() {
    setCurrentTask(null);
    setShowForm(true);
  }

  function closeForm() {
    setShowForm(false);
  }

  function closeDetails() {
    setCurrentTask(null);
  }

  function openDelete(task: Task) {
    setTaskToDelete(task);
  }

  function closeDelete() {
    setTaskToDelete(null);
  }

  function handleDeleted(task: Task) {
    if (currentTask?.id === task.id) setCurrentTask(null);
    setTaskToDelete(null);
  }

  return (
    <TaskPanelContext
      value={{
        currentTask,
        showForm,
        taskToDelete,
        openDetails,
        closeDetails,
        openCreate,
        closeForm,
        openDelete,
        closeDelete,
        handleDeleted,
      }}
    >
      {children}
    </TaskPanelContext>
  );
}
