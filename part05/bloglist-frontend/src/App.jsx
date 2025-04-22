import { useState, useEffect, useRef } from 'react'
import { CreateNewBlog, LoginForm, Blog, Togglable } from './components'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState('')
  const [notificationMessage, setNotificationMessage] = useState('')

  const createNewBlogRef = useRef() //container that holds referense to togglable

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const user = await loginService.login({
        username,
        password,
      })

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.log(exception)
      setErrorMessage('Wrong credentials')
      setTimeout(() => setErrorMessage(null), 5000)
    }
  }

  const logout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const handleCreateNote = async (e) => {
    e.preventDefault()

    try {
      if (!title || !author || !url) {
        setErrorMessage('Please fill in all fields')
        setTimeout(() => setErrorMessage(null), 4000)
        return
      }

      // we hide form here after creating
      createNewBlogRef.current.toggleVisibility()

      const blog = {
        title,
        author,
        url,
      }
      const createdBlog = await blogService.create(blog)

      setNotificationMessage(`a new blog ${title} by ${author} added`)
      setTimeout(() => setNotificationMessage(null), 5000)
      setBlogs(blogs.concat(createdBlog))
      setTitle('')
      setAuthor('')
      setUrl('')
    } catch (err) {
      console.log(err)
      setErrorMessage('Wrong credentials')
      setTimeout(() => setErrorMessage(null), 5000)
    }
  }

  const handleDeleteNote = async (id) => {
    try {
      const confirmDelete = window.confirm(
        'Are you sure you want to delete this blog?'
      )
      if (!confirmDelete) return

      await blogService.remove(id)
      setBlogs(blogs.filter((blog) => blog.id !== id))

      setNotificationMessage('Blog deleted successfully')
      setTimeout(() => setNotificationMessage(null), 4000)
    } catch (err) {
      console.error('Failed to delete blog:', error)
      setErrorMessage('Failed to delete blog')
      setTimeout(() => setErrorMessage(null), 4000)
    }
  }

  return (
    <div>
      {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
      {notificationMessage && (
        <div style={{ color: 'green' }}>{notificationMessage}</div>
      )}
      {!user ? (
        <LoginForm
          handleLogin={handleLogin}
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
        />
      ) : (
        <>
          <div>
            <p>{user.name ? user.name : 'You are '} logged in</p>
            <button onClick={logout}>logout</button>
          </div>
          <Togglable
            buttonLabelShow="create blog"
            buttonLabelHide="cancel"
            ref={createNewBlogRef}
          >
            <CreateNewBlog
              title={title}
              setTitle={setTitle}
              author={author}
              setAuthor={setAuthor}
              url={url}
              setUrl={setUrl}
              handleCreateNote={handleCreateNote}
            />
          </Togglable>
        </>
      )}
      <h2>Blogs</h2>
      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            handleDeleteNote={handleDeleteNote}
            currentUser={user}
          />
        ))}
    </div>
  )
}

export default App
