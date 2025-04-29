import { createSlice } from '@reduxjs/toolkit'
import anecdotesService from '../services/anecdotes'

// Thunks
export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdotesService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdotesService.createNew(content)
    dispatch(addAnecdote(newAnecdote))
  }
}

export const voteAnecdote = (anecdote) => {
  return async (dispatch) => {
    const updatedAnecdote = {
      ...anecdote,
      votes: anecdote.votes + 1,
    }
    await anecdotesService.update(updatedAnecdote)
    dispatch(increaseVote({ id: anecdote.id }))
  }
}

const initialState = []

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    increaseVote: (state, action) => {
      const anecdote = state.find(
        (anecdote) => anecdote.id === action.payload.id
      )
      if (anecdote) {
        anecdote.votes += 1
      }
    },

    addAnecdote: (state, action) => {
      state.push(action.payload)
    },
    appendAnecdote: (state, action) => {
      state.push(action.payload)
    },
    setAnecdotes(_state, action) {
      return action.payload
    },
  },
})

export const { increaseVote, addAnecdote, appendAnecdote, setAnecdotes } =
  anecdoteSlice.actions
export default anecdoteSlice.reducer
