const Statistic = ({ good, bad, neutral, all }) => {
  return (
    <div>
      <h1>statistic</h1>
      {all === 0 ? (
        <p>No feedback given</p>
      ) : (
        <>
          <p>Good: {good}</p>
          <p>Neutral: {neutral}</p>
          <p>Bad: {bad}</p>
          <p>All: {all}</p>
          <p>
            Average: {all === 0 ? 0 : (good * 1 + neutral + bad * -1) / all}
          </p>
          <p>Positive: {all === 0 ? 0 : (good / all) * 100}%</p>
        </>
      )}
    </div>
  )
}

export default Statistic
