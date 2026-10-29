import { useEffect, useState } from 'react'
import './App.css'
type Task = {id: number;nome: string;descricao: string|null; status: boolean;deadline: string|null; created_at: string}

function App() {
  const [nome, setNome] = useState('')
  const [descricao, setDescricao] = useState('')
  const [deadline, setDeadline] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [editandoId, setEditandoId] = useState<number | null>(null)
  const [detalhe, setDetalhe] = useState<Task | null>(null)

  async function salvarTask() {
  const dados = {nome, ...(descricao && {descricao}), ...(deadline && {deadline})}

  const url = editandoId
    ? `http://localhost:3000/tasks/${editandoId}`
    : 'http://localhost:3000/tasks'

  const response = await fetch(url, {
    method: editandoId ? 'PATCH' : 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dados)
  })

  if (!response.ok) {
    const corpo = await response.json()
    setError(corpo.message.join(', '))
  } else {
    cancelarEdicao()
    await showTasks()
  }
}

  const [tasks, setTasks] = useState<Task[]>([])
  async function showTasks() {
    const response = await fetch('http://localhost:3000/tasks')
    const data: Task[] = await response.json()
    setTasks(data)
  }
  useEffect(() => {
    showTasks()
  }, [])
  
  async function verDetalhes(id: number) {
  const response = await fetch(`http://localhost:3000/tasks/${id}`)

  if (!response.ok) {
    setError('Tarefa não encontrada')
    return
  }

  const data: Task = await response.json()
  setDetalhe(data)
  }
  async function trocaStatus(task: Task){
    await fetch(`http://localhost:3000/tasks/${task.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({status: !task.status})
    })
    await showTasks()
  }

  async function deleteTask(task: Task){
    await fetch(`http://localhost:3000/tasks/${task.id}`, {
      method: 'DELETE'
    })
    await showTasks()
  }

  function iniciarEdicao(task: Task) {
    setEditandoId(task.id)
    setNome(task.nome)
    setDescricao(task.descricao ?? '')
    setDeadline(task.deadline ?? '')
    setError(null)
  }

  function cancelarEdicao() {
    setEditandoId(null)
    setNome('')
    setDescricao('')
    setDeadline('')
    setError(null)
    setDetalhe(null)
  }

  return (
    <div className='centro'>
      <input 
        value = {nome}
        onChange = {(e) => setNome(e.target.value)}
        placeholder = "Nome"
        />
      <input 
        value = {descricao}
        onChange = {(e) => setDescricao(e.target.value)}
        placeholder = "Descrição"
        />
      <input 
        value = {deadline}
        onChange = {(e) => setDeadline(e.target.value)}
        placeholder = "Data Maxima"
        />
      <div className="form-actions">
        <button type="button" onClick={salvarTask}>
          {editandoId ? 'Salvar' : 'Criar Task'}
        </button>
        {editandoId && (
        <button type="button" className="secundario" onClick={cancelarEdicao}>
          Cancelar
        </button>
          )}
      </div>
      <ul>
          {tasks.map((task) =>(
          <li key={task.id} className={task.status ? 'task done' : 'task'}>
            <input
              type="checkbox"
              checked={task.status}
              onChange={() => trocaStatus(task)}
            />
            <div className="task-info">
              <strong className="link" onClick={() => verDetalhes(task.id)}>
                  {task.nome}
              </strong>
              {task.descricao && <span className="task-desc">{task.descricao}</span>}
            </div>
            {task.deadline && <span className="badge">{task.deadline}</span>}
            <button type="button" className="icon-btn" onClick={() => iniciarEdicao(task)}>
            ✏️
            </button>
            <button type="button" className="icon-btn" onClick={() => deleteTask(task)}>
            🗑
            </button>
          </li>
          ))}
      </ul>
      {detalhe && (
      <div className="detalhe">
        <h3>{detalhe.nome}</h3>
        <p>{detalhe.descricao ?? 'Sem descrição'}</p>
        <p>Status: {detalhe.status ? 'Concluída' : 'Pendente'}</p>
        <p>Prazo: {detalhe.deadline ?? 'Sem prazo'}</p>
        <p>Criada em: {new Date(detalhe.created_at).toLocaleString('pt-BR')}</p>
        <button type="button" onClick={() => setDetalhe(null)}>Fechar</button>
      </div>
      )}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  )
}

export default App