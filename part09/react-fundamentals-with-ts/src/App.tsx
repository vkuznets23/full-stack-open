import Content from './components/Content'
import Header from './components/Header'
import Total from './components/Total'
import { CoursePart } from './types/CoursePart'

const App = () => {
  const courseParts: CoursePart[] = [
    {
      name: 'Fundamentals',
      exerciseCount: 10,
    },
    {
      name: 'Using props to pass data',
      exerciseCount: 7,
    },
    {
      name: 'Deeper type usage',
      exerciseCount: 14,
    },
  ]

  const totalExercises = courseParts.reduce(
    (sum, part) => sum + part.exerciseCount,
    0
  )

  return (
    <div>
      <Header header="Half Stack application development" />
      <Content courseParts={courseParts} />
      <Total totalExercises={totalExercises} />
    </div>
  )
}

export default App
