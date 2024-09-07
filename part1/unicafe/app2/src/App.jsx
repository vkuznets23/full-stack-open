
import { useState } from 'react'

const Header = ({title}) => <h1>{title}</h1>

const Statisticline = ( {text, value}) => (
  <p>{text}: {value}</p>
)

const Statistics = ({ good, neutral, bad, total, average, positive }) => {
  if (total > 0) {
    return (
      <div>
        <h1>Statistics</h1>
        <Statisticline text="Good" value={good} />
        <Statisticline text="Neutral" value={neutral} />
        <Statisticline text="Bad" value={bad} />
        <Statisticline text="All" value={total} />
        <Statisticline text="Avarage" value={average.toFixed(2)} />
        <Statisticline text="Positive" value={positive.toFixed(2)} />
      </div>
    )
  }
  return (
    <div>
      <h1>Statistics</h1>
      <p>No feedback given</p>
    </div>
    )
}
const Button = ( {onClick, text} ) => (
  <button onClick={onClick}>{text}</button>
)

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const total = good + neutral + bad
  const average = total > 0 ? (good - bad) / total : 0
  const positive = total > 0 ? (good / total) * 100 : 0

  // Function to handle the click event for each feedback type
  const increaseGood = () => setGood(good + 1)
  const increaseNeutral = () => setNeutral(neutral + 1)
  const increaseBad = () => setBad(bad + 1)

  return (
    <div>
      <Header title='Give Feedback'/>
      <Button onClick={increaseGood} text='good' />
      <Button onClick={increaseNeutral} text='neutral' />
      <Button onClick={increaseBad} text='bad' />

      <Statistics 
        name='Statistic'
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