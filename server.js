import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import { pool } from './config/db.js';
import router from './routes/userRoutes.js';


//run the server
const app = express();
dotenv.config({ quiet: true })
const PORT = process.env.PORT || 3000
// middlewares
app.use(cors())
app.use(express.json());


// Routes
// User Routes
app.use('/api/user', router)


//Connect to the database and add the sever listening
pool.connect().then(app.listen(PORT, ()=>{
    console.log("Server listening on http://localhost:3000", 
        "DB connected Successfully")
})).catch((error)=>{console.error(error)})
