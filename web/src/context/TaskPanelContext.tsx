import { useState, type ReactNode } from "react";
import type { Task } from "../components/actions";
import { TaskPanelContext } from "../hooks/useTaskPanel";

export function TaskPanelProvider({ children }: { children: ReactNode }) {
  const [currentTask, setCurrentTask] = useState<Task | null>(null);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<Task | null>(null);

  function openDetails(task: Task) {
    setCurrentTask(task);
    setEditingTask(null);
    setShowForm(false);
  }

  function openCreate() {
    setEditingTask(null);
    setCurrentTask(null);
    setShowForm(true);
  }

  function openEdit(task: Task) {
    setEditingTask(task);
    setCurrentTask(null);
    setShowForm(true);
  }

  function closeForm() {
    setEditingTask(null);
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
    if (editingTask?.id === task.id) closeForm();
    setTaskToDelete(null);
  }

  return (
    <TaskPanelContext
      value={{
        currentTask,
        editingTask,
        showForm,
        taskToDelete,
        openDetails,
        closeDetails,
        openCreate,
        openEdit,
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
