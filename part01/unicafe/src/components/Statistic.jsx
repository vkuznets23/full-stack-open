const Statistic = ({ good, bad, neutral }) => {
  return (
    <div>
      <h1>statistic</h1>
      <p>Good: {good}</p>
      <p>Neutral: {neutral}</p>
      <p>Bad: {bad}</p>
    </div>
  )
}

export default Statistic
