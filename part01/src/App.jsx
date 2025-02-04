const Header = ({ name }) => {
  return <h1>{name}</h1>
}

const Part = ({name, exercises}) => {
  return (
    <p>{name} {exercises}</p>
  )
}

const Content = ({parts}) => {
  return (
    <div>
      {parts.map((part, index) => {
        return (
          <Part {...part} key={index}/>
        )
      })}
    </div>
  )
}

const Total = ({parts}) => {
  const result = parts.reduce((acc, ex) => {
    return acc + ex.exercises
  }, 0)
  return (
    <div>
      <p>Number of exercises {result}</p>
    </div>
  )
}

const App = () => {
const course = {
  name: 'Half Stack application development',
  parts: [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]
}

return (
  <div>
    <Header name={course.name}/>
    <Content parts={course.parts}/>
    <Total parts={course.parts}/>
  </div>
)}

export default App