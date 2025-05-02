import { useParams } from 'react-router-dom'

// eslint-disable-next-line react/prop-types
const Anecdote = ({ anecdotes }) => {
  const { id } = useParams() //its a string
  // eslint-disable-next-line react/prop-types
  const anecdote = anecdotes.find((a) => a.id === Number(id))

  if (!anecdote) return <p>Anecdote not found</p>
  return (
    <div>
      <h2>
        {anecdote.content} by {anecdote.author}
      </h2>
      <p>has {anecdote.votes} votes</p>
      <p>
        for more info see{' '}
        <a href={anecdote.info} target="_blank" rel="noopener noreferrer">
          {anecdote.info}
        </a>
      </p>
    </div>
  )
}

export default Anecdote
