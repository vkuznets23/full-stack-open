import { createContext, useReducer, useContext } from 'react'

const MyContext = createContext()

const initialState = { notification: '' }

const reducer = (state, action) => {
  switch (action.type) {
    case 'addAnecdote':
      return { notification: `anecdot ${action.content} added!` }
    case 'vote':
      return { notification: `You voted for "${action.content}" anecdote` }
    case 'clearNotification':
      return { notification: '' }
    case 'errorNotification':
      return { notification: action.content || `Error!` }
    default:
      return state
  }
}

// eslint-disable-next-line react/prop-types
export const MyContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <MyContext.Provider value={{ state, dispatch }}>
      {children}
    </MyContext.Provider>
  )
}

export default MyContext
