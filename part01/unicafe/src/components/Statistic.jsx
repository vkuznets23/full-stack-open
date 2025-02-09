import StatisticLine from '../components/StatisticLine'

const Statistic = ({ good, bad, neutral, all }) => {
  return (
    <div>
      <h1>statistic</h1>
      {all === 0 ? (
        <p>No feedback given</p>
      ) : (
        <table>
          <tbody>
            <StatisticLine text="Good" value={good} />
            <StatisticLine text="Neutral" value={neutral} />
            <StatisticLine text="Bad" value={bad} />
            <StatisticLine text="All" value={all} />
            <StatisticLine
              text="Average"
              value={all === 0 ? 0 : (good * 1 + neutral + bad * -1) / all}
            />
            <StatisticLine
              text="Positive"
              value={`${all === 0 ? 0 : (good / all) * 100}%`}
            />
          </tbody>
        </table>
      )}
    </div>
  )
}

export default Statistic
