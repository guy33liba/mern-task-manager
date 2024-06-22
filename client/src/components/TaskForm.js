import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const TaskForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [task, setTask] = useState({ title: '', description: '', completed: false });

  useEffect(() => {
    if (id) {
      // Fetch task details if editing
      axios.get(`http://localhost:5000/api/tasks/${id}`)
        .then(response => {
          setTask(response.data);
        })
        .catch(error => {
          console.error('Error fetching task:', error.response?.data || error.message);
        });
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask(prevTask => ({
      ...prevTask,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (id) {
        // Update existing task
        await axios.put(`/api/tasks/${id}`, task);
      } else {
        // Create new task
        await axios.post('/api/tasks', task);
      }
      navigate('/');
    } catch (error) {
      console.error('Error submitting task:', error.response?.data || error.message);
    }
  };

  return (
    <div>
      <h2>{id ? 'Edit Task' : 'Create Task'}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={task.title}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            name="description"
            value={task.description}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              name="completed"
              checked={task.completed}
              onChange={() => setTask(prevTask => ({ ...prevTask, completed: !prevTask.completed }))}
            />
            Completed
          </label>
        </div>
        <button type="submit">{id ? 'Update Task' : 'Create Task'}</button>
      </form>
    </div>
  );
};

export default TaskForm
