
  {/*useTasks*/}
  async function saveTask() {
  {/*TaskForms*/}
  const payload = {name, ...(description && {description}), ...(deadline && {deadline})}
  {/*TaskForms*/}

  {/*useTasks*/}
  const url = editingId
    ? `http://localhost:3000/tasks/${editingId}`
    : 'http://localhost:3000/tasks'
  {/*useTasks*/}

  {/*?*/}
  const response = await fetch(url, {
    method: editingId ? 'PATCH' : 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  })
  {/*?*/}

  {/*?*/}
  if (!response.ok) {
    const body = await response.json()
    setError(body.message.join(', '))
  } else {
    cancelEdit()
    await showTasks()
  }
}
  {/*?*/}

  {/*useTasks*/}
  const [tasks, setTasks] = useState<Task[]>([])
  {/*useTasks*/}

  {/*?*/}
  async function showTasks() {
    const response = await fetch('http://localhost:3000/tasks')
    const data: Task[] = await response.json()
    {/*useTasks*/}
    setTasks(data)
    {/*useTasks*/}
  }
  {/*?*/}

  {/*?*/}
  async function showDetails(id: number) {
  const response = await fetch(`http://localhost:3000/tasks/${id}`)

  if (!response.ok) {
    setError('Tarefa não encontrada')
    return
  }

  {/*useSidePanel*/}
  const data: Task = await response.json()
  setDetail(data)
  }
  {/*useSidePanel*/}

  {/*?*/}

  {/* ? */}
  async function changeStatus(task: Task){
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
    {/*useTasks*/}
    await showTasks()
    {/*useTasks*/}
  }
  {/*?*/}

  {/* useSidePanel */}
  function startEdition(task: Task) {
    setEditingId(task.id)
    setName(task.name)
    setDescription(task.description ?? '')
    setDeadline(task.deadline ?? '')
    setError(null)
  }

  function cancelEdit() {
    setEditingId(null)
    setName('')
    setDescription('')
    setDeadline('')
    setError(null)
    setDetail(null)
  }
  {/* useSidePanel */}
