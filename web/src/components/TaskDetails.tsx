import useTaskPanel from "../hooks/useTaskPanel";

export default function TaskDetails() {
  const { currentTask, closeDetails } = useTaskPanel();
  if (!currentTask) return null;
  return (
    <div className="detail">
      <h3>{currentTask.name}</h3>
      <p>{currentTask.description ?? "Sem descrição"}</p>
      <p>Status: {currentTask.status ? "Concluída" : "Pendente"}</p>
      <p>Prazo: {currentTask.deadline ?? "Sem prazo"}</p>
      <p>
        Criada em: {new Date(currentTask.created_at).toLocaleString("pt-BR")}
      </p>
      <button type="button" onClick={closeDetails}>
        Fechar
      </button>
    </div>
  );
}