import { useState } from "react";
import "./App.css";
import type { Task } from "./components/actions";
import TaskForm from "./components/TaskForm";
import TasksList from "./components/TaskList";
import TaskDetails from "./components/TaskDetails";
import DeleteTaskModal from "./components/DeleteTaskModal";
import useTasks from "./hooks/useTasks";

function App() {
  const [currentTask, setCurrentTask] = useState<Task | null>(null);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<Task | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const { deleteTask } = useTasks();

  async function confirmDelete() {
    if (!taskToDelete) return;
    try {
      await deleteTask(taskToDelete.id);
      if (currentTask?.id === taskToDelete.id) setCurrentTask(null);
      if (editingTask?.id === taskToDelete.id) {
        setEditingTask(null);
        setShowForm(false);
      }
      setTaskToDelete(null);
      setDeleteError(null);
    } catch {
      setDeleteError("Não foi possível excluir a tarefa");
    }
  }

  return (
    <div className="app-layout">
      <main className="tasks-panel">
        <h1>Tarefas</h1>
        <TasksList
          onSelect={(task) => {
            setCurrentTask(task);
            setEditingTask(null);
            setShowForm(false);
          }}
          onEdit={(task) => {
            setEditingTask(task);
            setCurrentTask(null);
            setShowForm(true);
          }}
          onDelete={(task) => {
            setDeleteError(null);
            setTaskToDelete(task);
          }}
        />
      </main>
      <aside className="side-panel">
        <div className="side-panel-header">
          <h2>
            {showForm
              ? editingTask
                ? "Editar tarefa"
                : "Criar tarefa"
              : currentTask
                ? "Detalhes"
                : "Painel"}
          </h2>
          <button
            type="button"
            className="primary-btn"
            onClick={() => {
              setEditingTask(null);
              setCurrentTask(null);
              setShowForm(true);
            }}
          >
            + Criar
          </button>
        </div>
        {showForm && (
          <TaskForm
            key={editingTask?.id ?? "new"}
            task={editingTask}
            onSaved={() => {
              setEditingTask(null);
              setShowForm(false);
            }}
            onCancel={() => {
              setEditingTask(null);
              setShowForm(false);
            }}
          />
        )}
        {!showForm && currentTask && (
          <TaskDetails
            currentTask={currentTask}
            setCurrentTask={setCurrentTask}
          />
        )}
        {!showForm && !currentTask && (
          <p className="panel-hint">
            Use + Criar, ✏️ ou Detalhes para abrir uma tarefa aqui.
          </p>
        )}
      </aside>
      <DeleteTaskModal
        task={taskToDelete}
        error={deleteError}
        onCancel={() => setTaskToDelete(null)}
        onConfirm={confirmDelete}
      />
    </div>
  );
}
export default App;
