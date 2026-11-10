import { Alert, Stack, Typography } from "@mui/material";
import useTasks from "../hooks/useTasks";
import TaskItem from "./TaskItem";

export default function TasksList() {
  const { tasks, pendingTasks, isError } = useTasks();

  return (
    <>
      {pendingTasks && <Typography color="text.secondary">Carregando tarefas...</Typography>}
      {isError ? (
        <Alert severity="error">Não foi possível carregar as tarefas</Alert>
      ) : (
        <Stack component="ul" spacing={1} sx={{listStyle: "none",p: 0, m: 0 }}>
          {tasks.map((task) => (
            <TaskItem key={task.id} task={task} />
          ))}
        </Stack>
      )}
    </>
  );
}