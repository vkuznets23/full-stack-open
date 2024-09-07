
import { useState } from 'react'

const Header = (props) => <h1>{props.name}</h1>
const Statistics = ({ good, neutral, bad, total, average, positive }) => {
  return (
    <div>
      <h1>Statistics</h1>
      <p>Good: {good}</p>
      <p>Neutral: {neutral}</p>
      <p>Bad: {bad}</p>
      <p>All: {total}</p>
      <p>Average: {average.toFixed(2)}</p> 
      <p>Positive: {positive.toFixed(2)}</p>
    </div>
  )
}
const Button = (props) => {
  return (
    <button onClick={props.onClick}>
      {props.text}
    </button>
  )
}

const App = () => {
  const name = 'Give Feedback'
  const name2 = 'Statistic'

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  // Function to handle the click event for each feedback type
  const increaseGood = () => setGood(good + 1)
  const increaseNeutral = () => setNeutral(neutral + 1)
  const increaseBad = () => setBad(bad + 1)
  const total = good + neutral + bad
  const average = total > 0 ? (good - bad) / total : 0
  const positive = total > 0 ? (good / total) * 100 : 0
  return (
    <div>
      <Header name={name}/>
      <Button onClick={increaseGood} text='good' />
      <Button onClick={increaseNeutral} text='neutral' />
      <Button onClick={increaseBad} text='bad' />

      <Statistics 
        name={name2}
        good={good}
        neutral={neutral}
        bad={bad}
        total={total}
        average={average}
        positive={positive}
      />
    </div>
  )
}

export default App