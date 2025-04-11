import express, { Request, Response } from 'express'
import { calculateBmi } from './bmiCalculator'

const app = express()
app.use(express.json())

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!')
})

app.get('/bmi', (req: Request, res: Response) => {
  const height = Number(req.query.height)
  const weight = Number(req.query.weight)

  if (!height || !weight || isNaN(height) || isNaN(weight)) {
    res.status(400).json({ error: 'malformatted parameters' })
  }
  try {
    const bmi = calculateBmi(height, weight)
    res.json({
      height: height,
      weight: weight,
      bmi: bmi,
    })
  } catch (err) {
    if (err instanceof Error) res.status(400).json({ error: err.message })
  }
  res.status(500).json({ error: 'Unknown error' })
})

const PORT = 3003

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
