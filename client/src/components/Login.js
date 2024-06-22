import React, { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { AuthContext } from "../Context"

const Login = () => {
  const { setAuth } = useContext(AuthContext)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  const baseUrl = "http://localhost:5000"
  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post(`${baseUrl}/users/login`, {
        email,
        password,
      })
      setAuth({ token: response.data.token, user: response.data.userId })
      localStorage.setItem("token", response.data.token)
      navigate("/")
    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message)
    }
  }

  return (
    <div>
      <form onSubmit={handleLogin}>
        <h1>Login</h1>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  )
}
export default Login
