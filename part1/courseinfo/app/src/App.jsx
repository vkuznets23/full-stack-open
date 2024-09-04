const Header = props => <h1>{props.name}</h1> 
//one object of parts array
const Part = ( {name, exercises}) => <p> {name} {exercises} </p>

const Content = ({ parts }) => ( //it takes the parts array as props
  parts.map(part => {
    //this is a function that .map applyes to each element
    return (
      //for each part element Part element is created
      //key is a special props for rendering. it should be unique for each
      //element so part.name is used
      <Part name={part.name} exercises={part.exercises} key={part.name}/>
    )
  })
)

const Total = ( {parts} ) => {
  const countTotal = parts.reduce((sum, part) => sum + part.exercises, 0);
  return <p>Total number of exercises: {countTotal}</p>;
}

const App = () => {
  const course = 'Half Stack application development'
  const parts = [
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

  return (
    <div>
      <Header name={course} />
      <Content parts={parts} />
      <Total parts={parts}/>
    </div>
  )
}
  
export default App
