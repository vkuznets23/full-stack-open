import Header from './Header'
import SubCoursesList from './SubCoursesList'
import Total from './Total'

const Courses = ({ courses }) => {
  return (
    <div>
      {courses.map((course, id) => {
        return (
          <div key={id}>
            <Header name={course.name} />
            <SubCoursesList parts={course.parts} />
            <Total parts={course.parts} />
          </div>
        )
      })}
    </div>
  )
}

export default Courses
