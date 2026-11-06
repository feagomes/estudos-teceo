import useTaskForm from "../hooks/useTaskForm";

export default function TaskForm() {
  const {task, closeForm, pendingSaveTask, register, handleSubmit, errors, onSubmit, } = useTaskForm();

  return (
    <form className="task-form" onSubmit={handleSubmit(onSubmit)} noValidate>
      <label className="form-field">
        <span>Nome</span>
        <input {...register("name")} placeholder="Ex: Fazer relatório" />
        {errors.name && <span role="alert">{errors.name.message}</span>}
      </label>
      <label className="form-field">
        <span>Descrição</span>
        <input
          {...register("description")}
          placeholder="Ex: Escrever no overleaf"
        />
        {errors.description && (
          <span role="alert">{errors.description.message}</span>
        )}
      </label>
      <label className="form-field">
        <span>Prazo</span>
        <input type="date" {...register("deadline")} />
        {errors.deadline && <span role="alert">{errors.deadline.message}</span>}
      </label>
      <div className="form-actions">
        <button type="submit" disabled={pendingSaveTask}>
          {task ? "Salvar" : "Criar Task"}
        </button>
        {task && (
          <button type="button" className="secundario" onClick={closeForm}>
            Cancelar
          </button>
        )}
      </div>
      {errors.root && (
        <p role="alert" style={{ color: "red" }}>
          {errors.root.message}
        </p>
      )}
    </form>
  );
}
