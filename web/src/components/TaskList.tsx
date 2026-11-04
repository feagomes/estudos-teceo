import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import tasksApi, { type Task } from "./actions";

interface TasksListProps {
  formOpen: boolean;
  onSelect: (task: Task) => void;
  onEdit: (task: Task) => void;
}
export default function TasksList({
  formOpen,
  onSelect,
  onEdit,
}: TasksListProps) {
  const [error, setError] = useState<string | null>(null);

  const {data: tasks = [], refetch, isError,} = useQuery({
    queryKey: ["tasks"],
    queryFn: tasksApi.getTasks, 
    enabled: !formOpen,
  });

  async function showDetails(id: number) {
    try{
    const response = await tasksApi.findById(id);

    if (!response.ok) {
      setError(
        response.status === 404 ? "Tarefa não encontrada" : "Não foi possível carregar os detalhes",
      );
      return;
    }
    const selectedTask: Task = await response.json();
    setError(null);
    onSelect(selectedTask);
    } 
    catch{
      setError("Não foi possível carregar os detalhes")
    }
  }

  async function changeStatus(task: Task) {
    const response = await tasksApi.editTask({ status: !task.status }, task.id);
    
  }
  async function deleteTask(task: Task) {
    await tasksApi.deleteTask(task.id);
    await refetch();
  }
  return (
    <>
      <ul>
        {tasks.map((task) => (
          <li key={task.id} className={task.status ? "task done" : "task"}>
            <input
              type="checkbox"
              checked={task.status}
              onChange={() => changeStatus(task)}
            />
            <div className="task-info">
              <strong>{task.name}</strong>
              {task.description && (
                <span className="task-desc">{task.description}</span>
              )}
            </div>
            {task.deadline && <span className="badge">{task.deadline}</span>}
            <button
              type="button"
              className="details-btn"
              onClick={() => showDetails(task.id)}
            >
              Detalhes
            </button>
            <button
              type="button"
              className="icon-btn"
              onClick={() => onEdit(task)}
            >
              ✏️
            </button>
            <button
              type="button"
              className="icon-btn"
              onClick={() => deleteTask(task)}
            >
              🗑
            </button>
          </li>
        ))}
      </ul>
       {(error || isError) && (
        <p style={{ color: "red" }}>
          {error ?? "Não foi possível carregar as tarefas"}
        </p>
      )}
    </>
  );
}
