const url = "http://localhost:3000";

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
    const data: unknown = await response.json();
    if (!Array.isArray(data)) throw new Error("Resposta inválida da API");
    return data as Task[];
  },
  findById: async (id: number) => {
    const response = await fetch(`${url}/tasks/${id}`);
    return response;
  },
  createTask: async (task: Pick<Task, "name"> & Partial<Pick<Task, "description" | "deadline">>) => {
    const response = await fetch(`${url}/tasks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(task),
    });
    return response.ok ? "success" : "failure";
  },
  editTask: async (task: Partial<Task>, taskId: number) => {
    const response = await fetch(`${url}/tasks/${taskId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(task),
    });
    return response;
  },
  deleteTask: async (id: number) => {
    const response = await fetch(`${url}/tasks/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("Não foi possível excluir a tarefa");
    return "deleted";
  },
};
export default tasksApi;
