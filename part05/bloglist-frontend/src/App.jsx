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

  const [newBlog, setNewBlog] = useState({
    title: '',
    author: '',
    url: ''
  })

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      ) 

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      setErrorMessage(null)

      blogService.getAll().then(blogs =>
        setBlogs(blogs)
      )
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
          autoComplete="current-password"
        />
      </div>
      <button type="submit">login</button>
    </form>      
  )

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    setUser(null)
    blogService.setToken(null)
  }

  const handleBlogChange = (event) => {
    const { name, value } = event.target
    setNewBlog({ ...newBlog, [name]: value })
  }
  
  const handleBlogSubmit = async (event) => {
    event.preventDefault()
    
    if (!newBlog.title || !newBlog.author || !newBlog.url) {
      setErrorMessage('All fields are required')
      setTimeout(() => setErrorMessage(null), 5000)
      return
    }
  
    try {
      const createdBlog = await blogService.create(newBlog)
      setBlogs(blogs.concat(createdBlog)) // Добавить новый блог в текущий список
      setNewBlog({ title: '', author: '', url: '' }) // Очистить форму
    } catch (error) {
      setErrorMessage('Failed to create blog')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const blogForm = () => (
    <form onSubmit={handleBlogSubmit}>
      <div>
        <input
          type="text"
          value={newBlog.title}
          name="title"
          placeholder="Blog Title"
          onChange={handleBlogChange}
        />
      </div>
      <div>
        <input
          type="text"
          value={newBlog.author}
          name="author"
          placeholder="Author"
          onChange={handleBlogChange}
        />
      </div>
      <div>
        <input
          type="text"
          value={newBlog.url}
          name="url"
          placeholder="Blog URL"
          onChange={handleBlogChange}
        />
      </div>
      <button type="submit">Add Blog</button>
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
          <button onClick={handleLogout}>Logout</button>
          <h3>Add new blog</h3>
          {blogForm()}
          <h3>Your Blogs</h3> {/* Section header for blogs */}
          {/* Display a logout button here if you want */}
          <div>
            {blogs.length === 0 ? (
              <p>No blogs available.</p>
            ) : (
              blogs.map(blog => <Blog key={blog.id || blog._id} blog={blog} />)
            )}
          </div>
        </div>
      )}
    </div>
  )  
}

export default App