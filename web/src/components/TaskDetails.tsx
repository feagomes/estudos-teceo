import { Button, Stack, Typography } from "@mui/material";
import useTaskPanel from "../hooks/useTaskPanel";
import type { Task } from "./actions";

interface TaskDetailsProps{
  task: Task
}

export default function TaskDetails({task}: TaskDetailsProps) {
  const { closeDetails } = useTaskPanel();
  if (!task) return null;
  return (
    <Stack spacing={1.5} sx={{ alignItems: "flex-start", overflowWrap: "anywhere" }}>
      <Typography variant="h6" component="h3">{task.name}</Typography>
      <Typography>{task.description ?? "Sem descrição"}</Typography>
      <Typography>Status: {task.status ? "Concluída" : "Pendente"}</Typography>
      <Typography>Prazo: {task.deadline ?? "Sem prazo"}</Typography>
      <Typography>
        Criada em: {new Date(task.created_at).toLocaleString("pt-BR")}
      </Typography>
      <Button variant="outlined" onClick={closeDetails}>
        Fechar
      </Button>
    </Stack>
  );
}
