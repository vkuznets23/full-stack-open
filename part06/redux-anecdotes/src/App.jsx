import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addAnecdote, increaseVote } from './reducers/anecdoteReducer'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'

const App = () => {
  const [anecdote, setAnecdote] = useState('')
  const anecdotes = useSelector((state) => state)
  const sortedAnecdotes = [...anecdotes].sort((a, b) => b.votes - a.votes)
  const dispatch = useDispatch()

  const vote = (id) => {
    console.log('vote', id)
    dispatch(increaseVote(id))
  }

  const handleSubmitForm = (e) => {
    e.preventDefault()
    if (anecdote.trim() !== '') {
      dispatch(addAnecdote(anecdote))
      setAnecdote('')
    }
  }

  return (
    <div>
      <AnecdoteList sortedAnecdotes={sortedAnecdotes} vote={vote} />
      <AnecdoteForm
        handleSubmitForm={handleSubmitForm}
        anecdote={anecdote}
        setAnecdote={setAnecdote}
      />
    </div>
  )
}

export default App
