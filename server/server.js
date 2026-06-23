import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser';
import { pool } from './config/db.js';
import userRouter from './routes/userRoutes.js';
import formRouter from './routes/formRoutes.js';
import morgan from "morgan"

const app = express();
dotenv.config({ quiet: true })
const PORT = process.env.PORT || 3000
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}))
app.use(express.json());
app.use(cookieParser())
app.use(morgan("dev"))

app.use('/api/user', userRouter)
app.use('/api/form', formRouter)

pool.connect().then(app.listen(PORT, () => {
  console.log("Server listening on http://localhost:3000",
    "DB connected Successfully")
})).catch((error) => { console.error(error) })
