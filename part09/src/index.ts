import express from 'express'
import { calculateBmi } from './bmiCalculator'
import { calculateExercises } from './exerciseCalculator'

const app = express()
app.use(express.json())

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!')
})

app.get('/bmi', (req, res) => {
  const { height, weight } = req.query

  try {
    const heightValue: number = parseFloat(height as string)
    const weightValue: number = parseFloat(weight as string)

    if (isNaN(heightValue) || isNaN(weightValue)) {
      throw Error()
    }

    const bmi: string = calculateBmi(heightValue, weightValue)
    return res.json({
      height: heightValue,
      weight: weightValue,
      bmi: bmi,
    })
  } catch (err) {
    if (err instanceof Error)
      return res.status(404).json({
        error: 'malformatted parameters',
      })
  }

  return res.status(500).json({ error: 'Unexpected error' })
})

app.post('/exercises', (req, res) => {
  const { daily_exercises, target } = req.body

  if (!daily_exercises || !target) {
    return res.status(400).json({
      error: 'parameters missing',
    })
  }

  if (
    !Array.isArray(daily_exercises) ||
    daily_exercises.some(isNaN) ||
    isNaN(target as number)
  ) {
    return res.status(400).json({
      error: 'malformatted parameters',
    })
  }
  const result = calculateExercises(
    daily_exercises as number[],
    target as number
  )
  return res.json(result)
})

const PORT = 3003

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
