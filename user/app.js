import express from 'express'
import { connectDB } from './config/db.js'
import 'dotenv/config'

const app = express()

await connectDB()

const PORT = process.env.PORT || 8000
app.listen(PORT, ()=> console.log(`User service is listening on port ${PORT}`))