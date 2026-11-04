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
    const data: Task[] = await response.json();
    return data;
  },
  findById: async (id: number) => {
    const response = await fetch(`${url}/tasks/${id}`);
    return response;
  },
  createTask: async (task: Task) => {
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
    await fetch(`${url}/tasks/${id}`, {
      method: "DELETE",
    });
    return "deleted";
  },
};
export default tasksApi;
