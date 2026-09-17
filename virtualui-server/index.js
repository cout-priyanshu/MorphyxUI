import express from "express"
import dotenv from "dotenv"
dotenv.config()
import { connectDb } from "./configs/connectDB.js"
import cookieParser from "cookie-parser"
import authRouter from "./routes/auth.route.js"
import cors from "cors"
import userRouter from "./routes/user.route.js"


const app = express()
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true}
))

app.use(express.json())
app.use(cookieParser())

app.get("/", (req,res) => {
    res.json("Hello from server")
})

app.use("/api/auth", authRouter)
app.use("/api/user", userRouter)

app.use("/api/auth", authRouter)
const PORT = process.env.PORT
app.listen(PORT, ()=>{
    console.log(`Server Started on port ${PORT}`)
    connectDb()
})