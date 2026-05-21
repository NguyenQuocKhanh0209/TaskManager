import { useState, useEffect } from 'react'

const API_URL = 'http://localhost:3000/api/tasks'

function App() {
  const [taskName, setTaskName] = useState('')
  const [tasks, setTasks] = useState([])

  // Lấy danh sách Task từ Backend
  const fetchTasks = async () => {
    try {
      const response = await fetch(API_URL)
      const data = await response.json()
      setTasks(data)
    } catch (error) {
      console.error('Lỗi khi lấy danh sách task:', error)
    }
  }

  // Chạy fetchTasks ngay khi trang vừa load xong
  useEffect(() => {
    fetchTasks()
  }, [])

  // Thêm Task mới lên Backend
  const handleAddTask = async () => {
    if (taskName.trim() === '') return

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: taskName })
      })
      const newTask = await response.json()
      setTasks([...tasks, newTask])
      setTaskName('')
    } catch (error) {
      console.error('Lỗi khi thêm task:', error)
    }
  }

  // Cập nhật trạng thái hoàn thành (Toggle Completed)
  const handleToggleComplete = async (task) => {
    try {
      const response = await fetch(`${API_URL}/${task._id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ completed: !task.completed })
      })
      const updatedTask = await response.json()

      // Cập nhật lại danh sách hiển thị
      setTasks(tasks.map(t => t._id === task._id ? updatedTask : t))
    } catch (error) {
      console.error('Lỗi khi cập nhật trạng thái:', error)
    }
  }

  // Xóa Task khỏi Database
  const handleDeleteTask = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
      })
      // Cập nhật lại danh sách hiển thị (lọc bỏ task vừa xóa)
      setTasks(tasks.filter(t => t._id !== id))
    } catch (error) {
      console.error('Lỗi khi xóa task:', error)
    }
  }

  return (
    <div style={{ padding: '30px', fontFamily: 'system-ui, -apple-system, sans-serif', maxWidth: '600px', margin: '0 auto' }}>
      <h1 style={{ color: '#333' }}>Task Manager </h1>

      {/* Form nhập Task */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '25px' }}>
        <input
          type="text"
          placeholder="Nhập nhiệm vụ mới..."
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          style={{
            flex: 1,
            padding: '10px 15px',
            borderRadius: '6px',
            border: '1px solid #ccc',
            fontSize: '16px'
          }}
        />
        <button
          onClick={handleAddTask}
          style={{
            padding: '10px 20px',
            borderRadius: '6px',
            border: 'none',
            backgroundColor: '#0070f3',
            color: 'white',
            fontSize: '16px',
            cursor: 'pointer',
            fontWeight: '600'
          }}
        >
          Thêm Task
        </button>
      </div>

      {/* Danh sách các Task */}
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {tasks.map((task) => (
          <li
            key={task._id}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '12px 15px',
              borderBottom: '1px solid #eee',
              backgroundColor: '#f9f9f9',
              borderRadius: '6px',
              marginBottom: '8px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => handleToggleComplete(task)}
                style={{ width: '18px', height: '18px', cursor: 'pointer' }}
              />
              <span style={{
                fontSize: '16px',
                textDecoration: task.completed ? 'line-through' : 'none',
                color: task.completed ? '#888' : '#333'
              }}>
                {task.name}
              </span>
            </div>
            <button
              onClick={() => handleDeleteTask(task._id)}
              style={{
                padding: '5px 10px',
                backgroundColor: '#ff4d4f',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Xóa
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
