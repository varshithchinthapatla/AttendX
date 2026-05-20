import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from 'mongoose'

import authRoutes from './routes/authRoutes.js'
import timetableRoutes from './routes/timetableRoutes.js'
import attendanceRoutes from './routes/attendanceRoutes.js'
import subjectRoutes from './routes/subjectRoutes.js'
import dashboardRoutes from './routes/dashboardRoutes.js'

dotenv.config()

const app = express()

app.use(cors())

app.use(express.json())

// ROUTES
app.use('/api/auth', authRoutes)

app.use('/api/timetable', timetableRoutes)

app.use('/api/attendance', attendanceRoutes)

app.use('/api/subjects', subjectRoutes)

app.use('/api/dashboard', dashboardRoutes)

// TEST ROUTE
app.get('/', (req, res) => {
  res.send('AttendX API Running')
})

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB Connected')

    app.listen(5000, () => {
      console.log('Server Running')
    })
  })
  .catch((err) =>
    console.log(err)
  )