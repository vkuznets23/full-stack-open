type Rating = 1 | 2 | 3

type returnValue = {
  periodLength: number
  trainingDays: number
  target: number
  average: number
  success: boolean
  rating: Rating
  ratingDescription: string
}

export function calculateExercises(
  dailyExerciseHours: number[],
  targetAmount: number
): returnValue {
  const days = dailyExerciseHours.length
  const trainingDays = dailyExerciseHours.filter((hours) => hours > 0).length
  const totalExHours = dailyExerciseHours.reduce((sum, hours) => sum + hours, 0)
  const avarageTime = totalExHours / days
  const targetIsReached = avarageTime >= targetAmount

  let rating: Rating
  let explanation: string

  if (avarageTime < 1) {
    rating = 1
    explanation = 'Too low activity'
  } else if (avarageTime >= 1 && avarageTime < 2) {
    rating = 2
    explanation =
      "You're making progress, but there's still room for improvement"
  } else {
    rating = 3
    explanation = 'Great job!'
  }

  return {
    periodLength: days,
    trainingDays: trainingDays,
    target: targetAmount,
    average: avarageTime,
    success: targetIsReached,
    rating: rating,
    ratingDescription: explanation,
  }
}

// console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2))
// const args2 = process.argv.slice(2)
if (require.main === module) {
  const args2 = process.argv.slice(2)

  if (args2.length < 2) {
    throw new Error(
      'Error: Please provide both daily exercise hours and target amount.'
    )
  }

  // Convert the first argument (dailyExerciseHours) into an array of numbers
  const dailyExerciseHours = args2[0].split(',').map((str) => {
    const num = Number(str.trim())
    if (isNaN(num)) {
      throw new Error(
        `Error: Invalid number in daily exercise hours: "${str.trim()}"`
      )
    }
    return num
  })

  const targetAmount = Number(args2[1])

  if (isNaN(targetAmount)) {
    throw new Error(
      'Error: Please provide a valid number for the target amount.'
    )
  }

  try {
    console.log(calculateExercises(dailyExerciseHours, targetAmount))
  } catch (err) {
    if (err instanceof Error) {
      console.error(err.message)
    }
  }
}
