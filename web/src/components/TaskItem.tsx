import { Controller } from "react-hook-form";
import { Alert, Box, Button, Checkbox, Chip, IconButton, Paper, Stack, TextField, Typography } from "@mui/material";
import useEditTask from "../hooks/useEditTask";
import useTasks from "../hooks/useTasks";
import useTaskPanel from "../hooks/useTaskPanel";
import type { Task } from "./actions";

export default function TaskItem({ task }: { task: Task }) {
  const { openDetails, openDelete } = useTaskPanel();
  const { showDetails, detailsError, changeStatus, pendingChangeStatus } = useTasks();
  const { editing, startEdit, cancelEdit, control, errors, submit, pendingEditTask } = useEditTask(task);
  const doneSx = task.status ? { textDecoration: "line-through", opacity: 0.5 } : {};

  if (editing) {
    return (
      <Paper component="li" variant="outlined" sx={{ p: 2 }}>
        <Stack component="form" spacing={1} onSubmit={submit} noValidate>
          <Controller
            name="name"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <TextField {...field} size="small" label="Nome" error={!!error} helperText={error?.message} />
            )}
          />
          <Controller
            name="description"
            control={control}
            render={({ field }) => <TextField {...field} size="small" label="Descrição" />}
          />
          <Controller
            name="deadline"
            control={control}
            render={({ field }) => (
              <TextField {...field} size="small" type="date" label="Prazo" slotProps={{ inputLabel: { shrink: true } }} />
            )}
          />
          <Stack direction="row" spacing={1}>
            <Button type="submit" variant="contained" loading={pendingEditTask}>
              Salvar
            </Button>
            <Button variant="outlined" onClick={cancelEdit}>
              Cancelar
            </Button>
          </Stack>
          {errors.root && <Alert severity="error">{errors.root.message}</Alert>}
        </Stack>
      </Paper>
    );
  }

  return (
    <Paper component="li" variant="outlined" sx={{ display: "flex", alignItems: "center", gap: 1, px: 1, py: 1 }}>
      <Checkbox checked={task.status} disabled={pendingChangeStatus} onChange={() => changeStatus(task)} />
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography sx={{ fontWeight: 600, overflowWrap: "anywhere", ...doneSx }}>{task.name}</Typography>
        {task.description && (
          <Typography variant="body2" color="text.secondary" sx={{ overflowWrap: "anywhere", ...doneSx }}>
            {task.description}
          </Typography>
        )}
        {detailsError && (
          <Typography variant="body2" color="error" role="alert">
            {detailsError.message}
          </Typography>
        )}
      </Box>
      {task.deadline && <Chip label={task.deadline} size="small" variant="outlined" />}
      <Button size="small" onClick={() => showDetails(task.id, { onSuccess: openDetails })}>
        Detalhes
      </Button>
      <IconButton size="small" aria-label="Editar" onClick={startEdit}>
        ✏️
      </IconButton>
      <IconButton size="small" aria-label="Excluir" onClick={() => openDelete(task)}>
        🗑
      </IconButton>
    </Paper>
  );
}
