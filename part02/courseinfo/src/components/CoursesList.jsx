import Course from './Course'

const CoursesList = ({ parts }) => {
  return (
    <div>
      {parts.map((course) => {
        return (
          <Course
            key={course.id}
            name={course.name}
            exercises={course.exercises}
          />
        )
      })}
    </div>
  )
}

export default CoursesList
