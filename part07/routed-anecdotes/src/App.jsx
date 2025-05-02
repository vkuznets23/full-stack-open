import { useState } from 'react'
import About from './pages/About'
import AnecdoteList from './pages/Anecdotes'
import Footer from './components/footer'

import { anecdotes as anecdotesList } from './anecdotes'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import CreateNew from './pages/CreateAnecdote'

const App = () => {
  const [anecdotes, setAnecdotes] = useState(anecdotesList)
  const [notification, setNotification] = useState('')

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000)
    setAnecdotes(anecdotes.concat(anecdote))
  }

  const anecdoteById = (id) => anecdotes.find((a) => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1,
    }

    setAnecdotes(anecdotes.map((a) => (a.id === id ? voted : a)))
  }

  const padding = {
    padding: 5,
  }

  return (
    <Router>
      <h1>Software Anecdotes</h1>
      <Link style={padding} to="/">
        anecdotes
      </Link>
      <Link style={padding} to="/about">
        about
      </Link>
      <Link style={padding} to="/create">
        create new
      </Link>
      <Routes>
        <Route path="/" element={<AnecdoteList anecdotes={anecdotes} />} />
        <Route path="/about" element={<About />} />
        <Route path="/create" element={<CreateNew addNew={addNew} />} />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App
