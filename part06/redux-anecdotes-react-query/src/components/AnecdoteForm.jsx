import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createAnecdote } from '../requests'
import { useContext } from 'react'
import MyContext from '../context'

const AnecdoteForm = () => {
  const { dispatch } = useContext(MyContext)
  const queryClient = useQueryClient()

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    },
    onError: (error) => {
      dispatch({
        type: 'errorNotification',
        content: 'Error creating anecdote!',
      })
    },
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''

    if (content.length < 5) {
      dispatch({
        type: 'errorNotification',
        content: 'Content must be at least 5 characters long!',
      })
      setTimeout(() => {
        dispatch({ type: 'clearNotification' })
      }, 3000)
      return
    }
    newAnecdoteMutation.mutate({ content, vote: 0 })
    dispatch({
      type: 'addAnecdote',
      content,
    })

    setTimeout(() => {
      dispatch({ type: 'clearNotification' })
    }, 3000)
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
