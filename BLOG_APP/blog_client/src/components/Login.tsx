import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../services/api'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      navigate('/')
    }
  }, [navigate])

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault()
    try {
      const result = await api.login(username, password)
      if (result && result.token) {
        localStorage.setItem('token', result.token)
        alert('Logged in!')
        navigate('/')
      } else setError('Login failed: ' + result)
    } catch {
      setError('Something went wrong!')
    }
  }
  return (
    <div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleLogin}>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          autoComplete="username"
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
          autoComplete="current-password"
        />
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

export default LoginForm
