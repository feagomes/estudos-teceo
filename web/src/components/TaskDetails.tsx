import type { Task } from "./actions";

interface TaskDetailsProps {
  currentTask: Task;
  setCurrentTask: (task: Task | null) => void;
}
export default function TaskDetails({
  currentTask,
  setCurrentTask,
}: TaskDetailsProps) {
  return (
    <div className="detail">
      <h3>{currentTask.name}</h3>
      <p>{currentTask.description ?? "Sem descrição"}</p>
      <p>Status: {currentTask.status ? "Concluída" : "Pendente"}</p>
      <p>Prazo: {currentTask.deadline ?? "Sem prazo"}</p>
      <p>
        Criada em: {new Date(currentTask.created_at).toLocaleString("pt-BR")}
      </p>
      <button type="button" onClick={() => setCurrentTask(null)}>
        Fechar
      </button>
    </div>
  );
}
