import { createSlice } from '@reduxjs/toolkit'

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
