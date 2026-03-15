import express from "express"
import cors from "cors"

import authRoutes from "./routes/authRoutes.js"
import accountRoutes from "./routes/accountRoutes.js"

const app = express()

app.use(cors())
app.use(express.json())

// routes
app.use("/api/auth", authRoutes)
app.use("/api/account", accountRoutes)

app.listen(5000, () => {
  console.log("Server running on port 5000")
})