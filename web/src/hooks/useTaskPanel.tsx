import { createContext, useContext } from "react";
import type { Task } from "../components/actions";

export type TaskPanelValue = {
  currentTask: Task | null;
  showForm: boolean;
  taskToDelete: Task | null;
  openDetails: (task: Task) => void;
  closeDetails: () => void;
  openCreate: () => void;
  closeForm: () => void;
  openDelete: (task: Task) => void;
  closeDelete: () => void;
  handleDeleted: (task: Task) => void;
};

export const TaskPanelContext = createContext<TaskPanelValue | null>(null);

export default function useTaskPanel() {
  const context = useContext(TaskPanelContext);
  if (!context)
    throw new Error("Não foi possível acessar o contexto do painel de tarefas");
  return context;
}
