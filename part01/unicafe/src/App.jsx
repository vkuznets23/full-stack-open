import { useState } from 'react'
import Statistic from './components/Statistic'
import Feedback from './components/Feedback'

function App() {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)

  return (
    <>
      <Feedback
        setGood={setGood}
        setNeutral={setNeutral}
        setBad={setBad}
        setAll={setAll}
        good={good}
        bad={bad}
        neutral={neutral}
        all={all}
      />
      <Statistic good={good} neutral={neutral} bad={bad} all={all} />
    </>
  )
}

export default App
