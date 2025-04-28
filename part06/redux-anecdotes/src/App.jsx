import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addAnecdote, increaseVote } from './reducers/anecdoteReducer'
import { AnecdoteForm, AnecdoteList, Filter } from './components'

const App = () => {
  const [anecdote, setAnecdote] = useState('')
  const anecdotes = useSelector((state) => state.anecdotes)
  const filter = useSelector((state) => state.filter)
  const dispatch = useDispatch()

  const sortedAnecdotes = [...anecdotes].sort((a, b) => b.votes - a.votes)
  const filteredAnecdotes = sortedAnecdotes.filter((anecdote) =>
    anecdote.content.toLowerCase().includes(filter.toLowerCase())
  )

  const vote = (id) => {
    // console.log('vote', id)
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
      <Filter />
      <AnecdoteList sortedAnecdotes={filteredAnecdotes} vote={vote} />
      <AnecdoteForm
        handleSubmitForm={handleSubmitForm}
        anecdote={anecdote}
        setAnecdote={setAnecdote}
      />
    </div>
  )
}

export default App
