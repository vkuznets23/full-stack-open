import { anecdotes } from '../data'

const PopularAnecdote = ({ count }) => {
  const maxVote = Object.entries(count).reduce(
    (max, current) => {
      return current[1] > max[1] ? current : max
    },
    [null, 0]
  )

  const popularAnecdote = maxVote[0]
  return (
    <>
      <h1>Anecdote with most votes</h1>
      {popularAnecdote === null ? (
        'no popular anecdotes'
      ) : (
        <p>{anecdotes[popularAnecdote]}</p>
      )}
    </>
  )
}

export default PopularAnecdote
