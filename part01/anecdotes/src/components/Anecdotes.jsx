import { anecdotes } from '../data'
import Button from './Button'

const Anecdotes = ({ count, setCount, selected, setSelected }) => {
  const handleRandom = () => {
    const random = Math.floor(Math.random() * anecdotes.length)
    setSelected(random)
  }

  const handleCount = (id) => {
    setCount((prev) => {
      const newVotes = { ...prev }
      newVotes[id] = newVotes[id] + 1
      return newVotes
    })
  }

  return (
    <>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {count[selected]} votes</p>
      <Button onClick={() => handleCount(selected)} text="vote" />
      <Button onClick={handleRandom} text="next anecdote" />
    </>
  )
}

export default Anecdotes
