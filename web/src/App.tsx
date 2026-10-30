import { useEffect, useState } from 'react'
import './App.css'
type Task = {id: number;name: string;description: string|null; status: boolean;deadline: string|null; created_at: string}

function App() {
  {/*TaskForms*/}
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [deadline, setDeadline] = useState('')
  {/*TaskForms*/}
  {/*?*/}
  const [error, setError] = useState<string | null>(null)
  {/*?*/}
  {/*useSidePanel*/}
  const [editingId, setEditingId] = useState<number | null>(null)
  const [detail, setDetail] = useState<Task | null>(null)
  {/*useSidePanel*/}
  
  return (
    <div className='centro'>
      {/*TaskForm*/}
      <input 
        value = {name}
        onChange = {(e) => setName(e.target.value)}
        placeholder = "name"
        />
      <input 
        value = {description}
        onChange = {(e) => setDescription(e.target.value)}
        placeholder = "Descrição"
        />
      <input 
        value = {deadline}
        onChange = {(e) => setDeadline(e.target.value)}
        placeholder = "Data Maxima"
        />
      <div className="form-actions">
        <button type="button" onClick={saveTask}>
          {editingId ? 'Salvar' : 'Criar Task'}
        </button>
        {editingId && (
        <button type="button" className="secundario" onClick={cancelEdit}>
          Cancelar
        </button>
          )}
      </div>
      {/*TaskForm*/}

      {/*TaskList*/}
      <ul>
          {tasks.map((task) =>(
          <li key={task.id} className={task.status ? 'task done' : 'task'}>
            <input
              type="checkbox"
              checked={task.status}
              onChange={() => changeStatus(task)}
            />
            <div className="task-info">
              <strong className="link" onClick={() => showDetails(task.id)}>
                  {task.name}
              </strong>
              {task.description && <span className="task-desc">{task.description}</span>}
            </div>
            {task.deadline && <span className="badge">{task.deadline}</span>}
            <button type="button" className="icon-btn" onClick={() => startEdition(task)}>
            ✏️
            </button>
            <button type="button" className="icon-btn" onClick={() => deleteTask(task)}>
            🗑
            </button>
          </li>
          ))}
      </ul>
      {/*TaskList*/}

      {/*TaskDetails*/}
      {detail && (
      <div className="detail">
        <h3>{detail.name}</h3>
        <p>{detail.description ?? 'Sem descrição'}</p>
        <p>Status: {detail.status ? 'Concluída' : 'Pendente'}</p>
        <p>Prazo: {detail.deadline ?? 'Sem prazo'}</p>
        <p>Criada em: {new Date(detail.created_at).toLocaleString('pt-BR')}</p>
        <button type="button" onClick={() => setDetail(null)}>Fechar</button>
      </div>
      )}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  )
}

export default App