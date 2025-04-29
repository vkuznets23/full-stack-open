import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  createAnecdote,
  initializeAnecdotes,
  voteAnecdote,
} from './features/anecdoteSlice'
import { AnecdoteForm, AnecdoteList, Filter, Notification } from './components'
import { setNotificationTimer } from './features/notificationReducer'

const App = () => {
  const [anecdote, setAnecdote] = useState('')
  const anecdotes = useSelector((state) => state.anecdotes)
  const filter = useSelector((state) => state.filter.filter)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeAnecdotes())
  }, [dispatch])

  const sortedAnecdotes = [...anecdotes].sort((a, b) => b.votes - a.votes)
  const filteredAnecdotes = sortedAnecdotes.filter((anecdote) =>
    filter && typeof filter === 'string'
      ? anecdote.content.toLowerCase().includes(filter.toLowerCase())
      : true
  )

  const handleSubmitForm = async (e) => {
    e.preventDefault()
    if (anecdote.trim() !== '') {
      dispatch(createAnecdote(anecdote))
      setAnecdote('')

      dispatch(setNotificationTimer(`New anecdote added!`, 5))
    }
  }

  const handleVoteClick = (anecdote) => {
    dispatch(voteAnecdote(anecdote))
    dispatch(setNotificationTimer(`You voted for '${anecdote.content}'`, 5))
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
