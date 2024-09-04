const Header = props => <h1>{props.name}</h1> 

const Part1 = props => <p>{props.name} {props.exercises}</p>

const Part2 = props => <p>{props.name} {props.exercises}</p>

const Part3 = props => <p>{props.name} {props.exercises}</p>

const Total = props => {
const totalExercises = props.part1.exercises + props.part2.exercises + props.part3.exercises;
return <p>Number of exercises {totalExercises}</p>
}

const App = () => {
const course = 'Half Stack application development'
const part1 = {
  name: 'Fundamentals of React',
  exercises: 10
}
const part2 = {
  name: 'Using props to pass data',
  exercises: 7
}
const part3 = {
  name: 'State of a component',
  exercises: 14
}

	return (
		<div>
		  <Header name={course} />
      <Part1 name={part1.name} exercises={part1.exercises}/>
      <Part2 name={part2.name} exercises={part2.exercises}/>
      <Part3 name={part3.name} exercises={part3.exercises}/>
      <Total part1={part1} part2={part2} part3={part3}/>
		</div>
	)
}
  
export default App
