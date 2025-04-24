import { CoursePart } from '../types/CoursePart'
import Course from './Course'

interface ContentProps {
  courseParts: CoursePart[]
}

const Content = ({ courseParts }: ContentProps) => {
  return (
    <>
      {courseParts.map(({ name, exerciseCount }) => {
        return <Course key={name} name={name} exerciseCount={exerciseCount} />
      })}
    </>
  )
}

export default Content
