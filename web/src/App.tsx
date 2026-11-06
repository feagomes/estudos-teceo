import "./App.css";
import TaskForm from "./components/TaskForm";
import TasksList from "./components/TaskList";
import TaskDetails from "./components/TaskDetails";
import DeleteTaskModal from "./components/DeleteTaskModal";
import useTaskPanel from "./hooks/useTaskPanel";

//MUI
function App() {
  const { currentTask, editingTask, showForm, openCreate } = useTaskPanel();

  return (
    <div className="app-layout">
      <main className="tasks-panel">
        <h1>Tarefas</h1>
        <TasksList />
      </main>
      <aside className="side-panel">
        <div className="side-panel-header">
          <h2>
            {showForm
              ? editingTask
                ? "Editar tarefa" : "Criar tarefa"
              : currentTask
                ? "Detalhes"  : "Painel"}
          </h2>
          <button type="button" className="primary-btn" onClick={openCreate}>
            + Criar
          </button>
        </div>
        {showForm && <TaskForm key={editingTask?.id ?? "new"} />}
        {!showForm && currentTask && <TaskDetails />}
        {!showForm && !currentTask && (
          <p className="panel-hint">
            Use + Criar, ✏️ ou Detalhes para abrir uma tarefa aqui.
          </p>
        )}
      </aside>
      <DeleteTaskModal />
    </div>
  );
}
export default App;