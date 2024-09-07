
import { useState } from 'react'

const Header = (props) => <h1>{props.name}</h1>

const Button = (props) => {
  return (
    <button onClick={props.onClick}>
      {props.text}
    </button>
  )
}

const App = () => {
  const name1 = 'Give Feedback'
  const name2 = 'Statistic'

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  // Function to handle the click event for each feedback type
  const increaseGood = () => setGood(good + 1)
  const increaseNeutral = () => setNeutral(neutral + 1)
  const increaseBad = () => setBad(bad + 1)

  return (
    <div>
      <Header name={name1}/>
      <Button onClick={increaseGood} text='good' />
      <Button onClick={increaseNeutral} text='neutral' />
      <Button onClick={increaseBad} text='bad' />

      <Header name={name2}/>
      <p>Good: {good}</p>
      <p>Neutral: {neutral}</p>
      <p>Bad: {bad}</p>
    </div>
  )
}

export default App