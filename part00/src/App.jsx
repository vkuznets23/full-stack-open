const Header = ({ course }) => {
  return <h1>{course}</h1>
}

const Part = ({name, exercises}) => {
  return (
    <p>{name} {exercises}</p>
  )
}

//Content
const Content = ({parts}) => {
  return (
    <div>
      {parts.map((part, index) => {
        console.log(part.name)
        return (
          <Part {...part} key={index}/>
        )
      })}
    </div>
  )
}

const Total = ({parts}) => {
  const result = parts.reduce((acc, ex) => {
    console.table()
    return acc + ex.exercises
  }, 0)
  return (
    <div>
      <p>Number of exercises {result}</p>
    </div>
  )
}

const App = () => {
const course = 'Half Stack application development'
const parts = [
  { name: 'Fundamentals of React', exercises: 10 },
  { name: 'Using props to pass data', exercises: 7 },
  { name: 'State of a component', exercises: 14 }
];

//Refactor the code so that it consists of three new components: Header, Content, and Total.

return (
  <div>
    <Header course={course}/>
    <Content parts={parts}/>
    <Total parts={parts}/>
  </div>
)}

export default App
