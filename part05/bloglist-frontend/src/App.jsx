import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Login from './components/login'
import Toggable from './components/toggable'
import blogService from './services/blogs'
import loginService from './services/login'


const App = () => {
  const [blogs, setBlogs] = useState([])
  //login
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')

  const [errorMessage, setErrorMessage] = useState(null)
  const [notification, setNotification] = useState(null)
  const [user, setUser] = useState(null)
  
  //new blog
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))

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

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    setUser(null)
    blogService.setToken(null)
  }

  const handleBlogChange = (event) => {
    const { name, value } = event.target
    if (name === 'title') setTitle(value);
    if (name === 'author') setAuthor(value);
    if (name === 'url') setUrl(value);
  }
  
  const handleBlogSubmit = async (event) => {
    event.preventDefault()

    if (!title || !author || !url) {
      setErrorMessage('All fields are required')
      setTimeout(() => setErrorMessage(null), 5000)
      return
    }
  
    try {
      const createdBlog = await blogService.create({ title, author, url })
      setBlogs(blogs.concat(createdBlog))
      setNotification(`blog ${title} successfuly added`)
      setTimeout(() => {
        setNotification(null)
      }, 5000)
      setTitle('');
      setAuthor('');
      setUrl('');
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
          value={title}
          name="title"
          placeholder="Blog Title"
          onChange={handleBlogChange}
        />
      </div>
      <div>
        <input
          type="text"
          value={author}
          name="author"
          placeholder="Author"
          onChange={handleBlogChange}
        />
      </div>
      <div>
        <input
          type="text"
          value={url}
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
      {notification && <div style={{ color: 'green' }}>{notification}</div>}
  
      {/* If the user is logged in, show blogs and user info */}
      {user === null ? (
        <Login
          handleLogin={handleLogin}
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
          errorMessage={errorMessage}
        />
      ) : (
        <div>
          <h2>Welcome, {user.name}!</h2> {/* Show the user's name */}
          <button onClick={handleLogout}>Logout</button>
          <h3>Add new blog</h3>
          <Toggable>
            {blogForm()}
          </Toggable>
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