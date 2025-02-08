import Button from './Button'

const Feedback = ({ setBad, setGood, setNeutral, good, neutral, bad }) => {
  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={() => setGood(good + 1)} text="good" />
      <Button onClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button onClick={() => setBad(bad + 1)} text="bad" />
    </div>
  )
}

export default Feedback
