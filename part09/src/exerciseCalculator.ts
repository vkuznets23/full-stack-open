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

function calculateExercises(
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

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2))
