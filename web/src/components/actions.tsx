import type { TaskPayload } from "../hooks/useTaskForm";

const url = import.meta.env.VITE_URL;

export type Task = {
  id: number;
  name: string;
  description: string | null;
  status: boolean;
  deadline: string | null;
  created_at: string;
};


const tasksApi = {
  getTasks: async () => {
    const response = await fetch(`${url}/tasks`);
    if (!response.ok) throw new Error("Não foi possível carregar as tarefas");
    return (await response.json()) as Task[];
  },
  
  findById: async (id: number) => {
    const response = await fetch(`${url}/tasks/${id}`);
    if (!response.ok) {
      throw new Error(
        response.status === 404
          ? "Tarefa não encontrada"
          : "Não foi possível carregar os detalhes",
      );
    }
    return (await response.json()) as Task;
  },

  createTask: async (task: TaskPayload) => {
    const response = await fetch(`${url}/tasks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(task),
    });
    if (!response.ok) throw new Error("Não foi possível criar a tarefa");
  },

  editTask: async (task: Partial<Task>, taskId: number) => {
    const response = await fetch(`${url}/tasks/${taskId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(task),
    });
    if (!response.ok) throw new Error("Não foi possível editar a tarefa");
  },

  deleteTask: async (id: number) => {
    const response = await fetch(`${url}/tasks/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("Não foi possível excluir a tarefa");
  },
};
export default tasksApi;
