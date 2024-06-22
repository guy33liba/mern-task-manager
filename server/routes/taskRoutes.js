import express from "express"
import jwt from "jsonwebtoken"
import Task from "../models/taskModel.js"

const router = express.Router()

// Middleware to verify JWT
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization
  if (!token) return res.status(401).json({ message: "Unauthorized" })

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Forbidden" })
    req.user = user
    next()
  })
}

router.use(verifyToken)

router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user.userId })
    res.status(200).json(tasks)
  } catch (error) {
    res.status(500).json({ message: "Internal server error" })
  }
})

router.post("/", async (req, res) => {
  const { title, description } = req.body

  try {
    const newTask = new Task({ userId: req.user.userId, title, description })
    await newTask.save()
    res.status(201).json(newTask)
  } catch (error) {
    res.status(500).json({ message: "Internal server error" })
  }
})

router.put("/:id", async (req, res) => {
  const { id } = req.params
  const { title, description, completed } = req.body

  try {
    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { title, description, completed },
      { new: true }
    )
    res.status(200).json(updatedTask)
  } catch (error) {
    res.status(500).json({ message: "Internal server error" })
  }
})

router.delete("/:id", async (req, res) => {
  const { id } = req.params

  try {
    await Task.findByIdAndDelete(id)
    res.status(200).json({ message: "Task deleted successfully" })
  } catch (error) {
    res.status(500).json({ message: "Internal server error" })
  }
})

export default router
