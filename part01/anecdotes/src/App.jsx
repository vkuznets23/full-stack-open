import { useState } from 'react'
import { votes } from './data'
import Anecdotes from './components/Anecdotes'
import PopularAnecdote from './components/PopularAnecdote'

function App() {
  const [selected, setSelected] = useState(0)
  const [count, setCount] = useState(votes)

  return (
    <>
      <Anecdotes
        count={count}
        setCount={setCount}
        selected={selected}
        setSelected={setSelected}
      />
      <PopularAnecdote count={count} />
    </>
  )
}

export default App
