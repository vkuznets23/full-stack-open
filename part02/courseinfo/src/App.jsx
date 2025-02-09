import { course } from './data'
import Header from './components/Header'
import CoursesList from './components/CoursesList'
import Total from './components/Total'

const App = () => {
  return (
    <div>
      <Header name={course.name} />
      <CoursesList parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default App
