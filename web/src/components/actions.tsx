import { z } from "zod";

const url = "http://localhost:3000";

const taskSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string().nullable(),
  status: z.boolean(),
  deadline: z.string().nullable(),
  created_at: z.string(),
});
export type Task = z.infer<typeof taskSchema>;

export const taskFormSchema = z.object({
  name: z.string().trim().min(1, "Informe o nome da tarefa"),
  description: z.string().transform((value) => value || null),
  deadline: z.string().transform((value) => value || null),
});

export type TaskFormInput = z.input<typeof taskFormSchema>;
export type TaskPayload = z.output<typeof taskFormSchema>;

const tasksApi = {
  getTasks: async () => {
    const response = await fetch(`${url}/tasks`);
    if (!response.ok) throw new Error("Não foi possível carregar as tarefas");
    return z.array(taskSchema).parse(await response.json());
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
    return taskSchema.parse(await response.json());
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

  saveTask: (task: TaskPayload, taskId?: number): Promise<void> =>
    taskId === undefined
      ? tasksApi.createTask(task)
      : tasksApi.editTask(task, taskId),
};
export default tasksApi;
