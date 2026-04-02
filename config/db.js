import {Pool} from 'pg'
import dotnev from 'dotenv'
import { Router } from 'express'


dotnev.config()


const {HOST, USER, DB, PASSWORD, DB_PORT} = process.env

export const pool = new Pool({
    host: HOST,
    user:USER,
    database:DB,
    password:PASSWORD,
    port:DB_PORT
})