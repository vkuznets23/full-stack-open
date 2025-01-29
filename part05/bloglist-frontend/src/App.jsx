import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  //login
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username, password,
      })
      setUser(user)
      setUsername('')
      setPassword('')
      setErrorMessage(null)
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>      
  )

  return (
    <div>
      {/* Display the error message if login fails */}
      {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
  
      {/* If the user is logged in, show blogs and user info */}
      {user === null ? (
        <div>
          <h2>Login</h2> {/* Login header */}
          {loginForm()} {/* Render the login form */}
        </div>
      ) : (
        <div>
          <h2>Welcome, {user.name}!</h2> {/* Show the user's name */}
          <h3>Your Blogs</h3> {/* Section header for blogs */}
          {/* Display a logout button here if you want */}
          <div>
            {blogs.length === 0 ? (
              <p>No blogs available.</p>
            ) : (
              blogs.map(blog => <Blog key={blog.id} blog={blog} />)
            )}
          </div>
        </div>
      )}
    </div>
  )  
}

export default App