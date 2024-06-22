import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import cors from "cors"
import userRoutes from "./routes/userRoutes.js"
import taskRoutes from "./routes/taskRoutes.js"

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

app.use("/users", userRoutes)
app.use("/tasks", taskRoutes)

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err))

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
