const Header = ( {course}) => <h1>{course.name}</h1> 

const Part = ( {name, exercises} ) => <p>{name} {exercises}</p>
const Content = ( {parts} ) => (
  parts.map(part => {
    return (
      //its not a <p></p> = its a component itself
      <Part name={part.name} exercises={part.exercises} key={part.name}/>
    )
  })
)

const Total = ( {parts} ) => {
  const countTotal = parts.reduce((sum, part) => sum + part.exercises, 0);
  return <p>Total number of exercises: {countTotal}</p>;
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
      <Header course={course}/>
      <Content parts={course.parts}/>
      <Total parts={course.parts}/>
    </div>
  )
}
export default App