import { CoursePart } from '../types/CoursePart'
import Part from './Part'

interface ContentProps {
  courseParts: CoursePart[]
}

const Content = ({ courseParts }: ContentProps) => {
  return (
    <>
      {courseParts.map((part, index) => {
        return <Part key={index} part={part} />
      })}
    </>
  )
}

export default Content
