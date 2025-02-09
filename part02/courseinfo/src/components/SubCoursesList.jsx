import Course from './Course'

const SubCoursesList = ({ parts }) => {
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

export default SubCoursesList
