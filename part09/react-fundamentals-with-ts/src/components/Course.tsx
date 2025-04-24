interface CourseProps {
  name: string
  exerciseCount: number
}

const Course = ({ name, exerciseCount }: CourseProps) => {
  return (
    <p>
      {name} {exerciseCount}
    </p>
  )
}

export default Course
