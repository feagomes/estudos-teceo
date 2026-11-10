import { Box, Button, Paper, Typography, Card } from "@mui/material";
import TaskForm from "./components/TaskForm";
import TasksList from "./components/TaskList";
import TaskDetails from "./components/TaskDetails";
import DeleteTaskModal from "./components/DeleteTaskModal";
import useTaskPanel from "./hooks/useTaskPanel";

//Pedir claude gerar htmls, como aprender estrutura de filtro do backend.
//Escolher tela que tem filtro(teceo->sku, produto), entender de onde vem o filtro do front, como passa pelo controller, service, blablabla
function App() {
  const { currentTask, showForm, openCreate } = useTaskPanel();

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: { xs: "1fr", md: "minmax(0, 1.6fr) minmax(320px, 1fr)" },
        gap: 3,
        maxWidth: 1200,
        mx: "auto",
        px: 2,
        py: 4,
        alignItems: "start",
      }}
    >
      <Card component="main" variant="elevation" sx={{ p: 3, minWidth: 0 }}>
        <Typography variant="h5" component="h1" sx={{ mb: 2 }}>
          Tarefas
        </Typography>
        <TasksList />
      </Card>
      <Paper
        component="aside"
        variant="outlined"
        sx={{ p: 3, minHeight: { xs: 240, md: 440 }, position: { md: "sticky" }, top: 24 }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 1.5,
            mb: 2.5,
            pb: 2,
            borderBottom: 1,
            borderColor: "divider",
          }}
        >
          <Typography variant="h6" component="h2">
            {showForm ? "Criar tarefa" : currentTask ? "Detalhes" : "Painel"}
          </Typography>
          <Button variant="contained" onClick={openCreate}>
            + Criar
          </Button>
        </Box>
        {showForm && <TaskForm />}
        {!showForm && currentTask && <TaskDetails task = {currentTask}/>}
        {!showForm && !currentTask && (
          <Typography color="text.secondary">
            Use + Criar ou Detalhes para abrir uma tarefa aqui.
          </Typography>
        )}
      </Paper>
      <DeleteTaskModal />
    </Box>
  );
}
export default App;
