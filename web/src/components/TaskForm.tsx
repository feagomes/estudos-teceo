import { Controller } from "react-hook-form";
import { Alert, Button, Stack, TextField } from "@mui/material";
import useTaskForm, { type TaskPayload } from "../hooks/useTaskForm";
import useTasks from "../hooks/useTasks";
import useTaskPanel from "../hooks/useTaskPanel";

export default function TaskForm() {
  const { closeForm } = useTaskPanel();
  const { createTask, pendingCreateTask } = useTasks();
  const { control , handleSubmit, setError, formState: { errors } } = useTaskForm();

  function onSubmit(values: TaskPayload) {
    createTask(values, {
      onSuccess: closeForm,
      onError: () => setError("root", { message: "Não foi possível criar a tarefa" }),
    });
  }

  return (
    <Stack component="form" spacing={2} onSubmit={handleSubmit(onSubmit)} noValidate>
      <Controller
        name="name"
        control={control}
        render={({ field, fieldState: { error } }) => (
          <TextField
            {...field}
            label="Nome"
            placeholder="Ex: Fazer relatório"
            error={!!error}
            helperText={error?.message}
          />
        )}
      />
      <Controller
        name="description"
        control={control}
        render={({ field, fieldState: { error } }) => (
          <TextField
            {...field}
            label="Descrição"
            placeholder="Ex: Fazer relatório de vendas do mês"
            multiline
            minRows={3}
            error={!!error}
            helperText={error?.message}
          />
        )}
      />
      <Controller
        name="deadline"
        control={control}
        render={({ field, fieldState: { error } }) => (
          <TextField
            {...field}
            label="Prazo"
            type="date"
            slotProps={{ inputLabel: { shrink: true } }}
            error={!!error}
            helperText={error?.message}
          />
        )}
      />
      <Stack direction="row" spacing={1}>
        <Button variant="outlined" fullWidth onClick={closeForm}>
          Cancelar
        </Button>
        <Button type="submit" variant="contained" fullWidth loading={pendingCreateTask}>
          Criar Task
        </Button>
      </Stack>
      {errors.root && <Alert severity="error">{errors.root.message}</Alert>}
    </Stack>
  );
}
