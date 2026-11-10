import { Alert, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import useTasks from "../hooks/useTasks";
import useTaskPanel from "../hooks/useTaskPanel";

export default function DeleteTaskModal() {
  const { taskToDelete: task, closeDelete, handleDeleted } = useTaskPanel();
  const { deleteTask, pendingDeleteTask, deleteError, resetDeleteTask } = useTasks();
  if (!task) return null;

  function close() {
    resetDeleteTask();
    closeDelete();
  }
  function confirm() {
    if (!task) return;
    deleteTask(task.id, {
      onSuccess: () => {
        resetDeleteTask();
        handleDeleted(task);
      },
    });
  }

  return (
    <Dialog open onClose={close} aria-labelledby="delete-task-title">
      <DialogTitle id="delete-task-title">Excluir tarefa?</DialogTitle>
      <DialogContent>
        <DialogContentText>Deseja excluir “{task.name}”?</DialogContentText>
        {deleteError && <Alert severity="error" sx={{ mt: 2 }}>{deleteError.message}</Alert>}
      </DialogContent>
      <DialogActions>
        <Button onClick={close}>Cancelar</Button>
        <Button variant="contained" color="error" loading={pendingDeleteTask} onClick={confirm}>
          Excluir
        </Button>
      </DialogActions>
    </Dialog>
  );
}
