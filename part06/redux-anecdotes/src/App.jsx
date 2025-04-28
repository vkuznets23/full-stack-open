import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addAnecdote, increaseVote } from './features/anecdoteSlice'
import { AnecdoteForm, AnecdoteList, Filter, Notification } from './components'
import {
  clearNotification,
  setNotification,
} from './features/notificationReducer'

const App = () => {
  const [anecdote, setAnecdote] = useState('')
  const anecdotes = useSelector((state) => state.anecdotes)
  const filter = useSelector((state) => state.filter.filter)

  const dispatch = useDispatch()

  const sortedAnecdotes = [...anecdotes].sort((a, b) => b.votes - a.votes)
  const filteredAnecdotes = sortedAnecdotes.filter((anecdote) =>
    filter && typeof filter === 'string'
      ? anecdote.content.toLowerCase().includes(filter.toLowerCase())
      : true
  )

  const vote = (id) => {
    dispatch(increaseVote({ id }))
  }

  const handleSubmitForm = (e) => {
    e.preventDefault()
    if (anecdote.trim() !== '') {
      dispatch(addAnecdote({ content: anecdote }))
      setAnecdote('')
    }
    dispatch(setNotification('New anecdote added!'))
    setTimeout(() => {
      dispatch(clearNotification())
    }, 5000)
  }

  const handleVoteClick = (anecdote) => {
    vote(anecdote.id)
    dispatch(setNotification(`You voted for '${anecdote.content}'`))
    setTimeout(() => {
      dispatch(clearNotification())
    }, 5000)
  }

  return (
    <div>
      <Notification />
      <Filter />
      <AnecdoteList
        sortedAnecdotes={filteredAnecdotes}
        handleVoteClick={handleVoteClick}
      />
      <AnecdoteForm
        handleSubmitForm={handleSubmitForm}
        anecdote={anecdote}
        setAnecdote={setAnecdote}
      />
    </div>
  )
}

export default App
