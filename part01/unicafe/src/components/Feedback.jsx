import Button from './Button'

const Feedback = ({
  setBad,
  setGood,
  setNeutral,
  good,
  neutral,
  bad,
  setAll,
}) => {
  const handleGood = () => {
    const goodMark = good + 1
    setGood(goodMark)
    setAll(goodMark + bad + neutral)
  }

  const handleBad = () => {
    const badMark = bad + 1
    setBad(badMark)
    setAll(good + badMark + neutral)
  }

  const handleNeutral = () => {
    const neutralMark = neutral + 1
    setNeutral(neutralMark)
    setAll(good + bad + neutralMark)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={handleGood} text="good" />
      <Button onClick={handleNeutral} text="neutral" />
      <Button onClick={handleBad} text="bad" />
    </div>
  )
}

export default Feedback
