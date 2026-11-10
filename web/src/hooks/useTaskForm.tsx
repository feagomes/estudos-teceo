import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const taskFormSchema = z.object({
  name: z.string().trim().min(1, "Informe o nome da tarefa"),
  description: z.string().optional(),
  deadline: z.string().optional(),
});

export type TaskFormInput = z.input<typeof taskFormSchema>;
export type TaskPayload = z.output<typeof taskFormSchema>;

export default function useTaskForm() {
  return useForm({
    resolver: zodResolver(taskFormSchema),
    defaultValues: 
      {
        name: "",
        description: "",
        deadline: "",
      },
  });
}