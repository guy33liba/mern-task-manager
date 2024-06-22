import React, { useState, useEffect } from "react"
import axios from "axios"
import { Link } from "react-router-dom"

const TaskList = () => {
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    fetchTasks()
  }, [])
  const fetchTasks = () => {
    axios
      .get("/api/tasks")
      .then((response) => {
        setTasks(response.data)
      })
      .catch((error) => {
        console.error("Error fetching tasks:", error.response?.data || error.message)
      })
  }

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${id}`)
      fetchTasks() // Refresh tasks after deletion
    } catch (error) {
      console.error("Error deleting task:", error.response?.data || error.message)
    }
  }

  return (
    <div>
      <h2>Task List</h2>
      <Link to="/tasks/new">Add Task</Link>
      <ul>
        {tasks.map((task) => (
          <li key={task._id}>
            <div>
              <strong>{task.title}</strong>
              <p>{task.description}</p>
              <p>Completed: {task.completed ? "Yes" : "No"}</p>
            </div>
            <div>
              <Link to={`/tasks/${task._id}/edit`}>Edit</Link>
              <button onClick={() => handleDelete(task._id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default TaskList
