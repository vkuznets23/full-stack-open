// eslint-disable-next-line react/prop-types
const AnecdoteList = ({ sortedAnecdotes, vote }) => {
  return (
    <div>
      <h2>Anecdotes</h2>
      {/* eslint-disable-next-line react/prop-types */}
      {sortedAnecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default AnecdoteList
