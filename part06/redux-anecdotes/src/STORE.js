import { configureStore } from '@reduxjs/toolkit'
import anecdoteReducer from './features/anecdoteSlice'
import filterReducer from './features/filterSlice'
import notificationReducer from './features/notificationReducer'

export const store = configureStore({
  reducer: {
    anecdotes: anecdoteReducer,
    filter: filterReducer,
    notification: notificationReducer,
  },
})
