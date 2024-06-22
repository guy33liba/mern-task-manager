import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import "./App.css"
import { AuthProvider } from "./Context"
import Login from "./components/Login"
import TaskForm from "./components/TaskForm"
import TaskList from "./components/TaskList"

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<TaskList />} />
            <Route path="/tasks/new" element={<TaskForm />} />
            <Route path="/tasks/:id/edit" element={<TaskForm />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App
