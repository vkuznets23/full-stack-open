import express from 'express'
import cors from 'cors'
import diagnosesRouter from './src/routes/diagnosies'
import patientsRouter from './src/routes/patients'
import { errorMiddleware } from './src/middleware/errorMiddleware'

const app = express()
app.use(cors())
app.use(express.json())

const PORT = 3001

app.get('/api/ping', (_req, res) => {
  console.log('someone pinged here')
  res.send('pong')
})

app.use('/api/diagnoses', diagnosesRouter)
app.use('/api/patients', patientsRouter)

app.use(errorMiddleware)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
