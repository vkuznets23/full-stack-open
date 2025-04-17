import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../services/api'

const RegistrationForm = () => {
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

  const handleRegistration = async (event: React.FormEvent) => {
    event.preventDefault()

    if (!username || !password) {
      setError('Both fields are required')
      return
    }

    try {
      const result = await api.register(username, password)
      if (result && result.token) {
        localStorage.setItem('token', result.token)
        navigate('/')
      } else setError('Registration failed: No token received')
    } catch (err) {
      setError('Something went wrong during registration: ' + err)
    }
  }

  return (
    <div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleRegistration}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="current-password"
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            required
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  )
}

export default RegistrationForm
