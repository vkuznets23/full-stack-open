type calculateBmiReturn =
  | 'Underweight'
  | 'Normal weight'
  | 'Overweight'
  | 'Obesity'

function calculateBmi(height: number, weight: number): calculateBmiReturn {
  if (height <= 0) throw new Error('Height must be greater than zero')
  if (weight <= 0) throw new Error('Weight must be greater than zero')

  const heightInMeters = height / 100
  const BMI = weight / (heightInMeters * heightInMeters)

  if (BMI < 18.5) return 'Underweight'
  else if (BMI >= 18.5 && BMI < 24.9) return 'Normal weight'
  else if (BMI >= 25 && BMI < 29.9) return 'Overweight'
  else return 'Obesity'
}

// Get command-line arguments
const args = process.argv.slice(2)

if (args.length < 2) {
  throw new Error('Error: Please provide both height and weight.')
}

const height = Number(args[0])
const weight = Number(args[1])

if (isNaN(height) || isNaN(weight)) {
  throw new Error(
    'Error: Please provide valid numbers for both height and weight.'
  )
}

try {
  console.log(calculateBmi(height, weight))
} catch (error) {
  if (error instanceof Error) console.error(error.message)
}
