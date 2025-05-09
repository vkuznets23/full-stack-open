import { useState, useEffect, useRef } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { LoginForm, Blog } from './components'
import { setNotificationTimer } from './slices/notification'
import { setErrorTimer } from './slices/errorNotification'
import { fetchBlogs as initilizeBlogs, createBlog, deleteBlog, likeBlog } from './slices/blogs'
import blogService from './services/blogs'
import loginService from './services/login'
import { removeUser, setUser } from './slices/user'
import Home from './pages/Home'
import Users from './pages/Users'
import User from './components/User'
import usersService from './services/users'
import SingleBlog from './components/SingleBlog'
import { AppBar, Toolbar, Typography, Button, Container, Alert, Box } from '@mui/material'

const App = () => {
  const [users, setUsers] = useState([])

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const dispatch = useDispatch()
  const createNewBlogRef = useRef() //container that holds referense to togglable
  const notification = useSelector((state) => state.notification.msg)
  const error = useSelector((state) => state.error.msg)
  const blogs = useSelector((state) => state.blogs.blogs) || []
  const user = useSelector((state) => state.user.user)

  useEffect(() => {
    dispatch(initilizeBlogs())
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)

      dispatch(setUser(user))
      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const resp = await usersService.getAllUsers()
        setUsers(resp)
      } catch (error) {
        console.error('Failed to fetch users:', error)
      }
    }
    fetchUsers()
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
      dispatch(setUser(user))

      setUsername('')
      setPassword('')
    } catch (exception) {
      console.log(exception)
      dispatch(setErrorTimer('Wrong credentials', 5))
    }
  }

  const logout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    dispatch(removeUser())
  }

  const handleCreateNote = async (e) => {
    e.preventDefault()

    try {
      if (!title || !author || !url) {
        dispatch(setErrorTimer('Please fill in all fields', 5))
        return
      }

      // we hide form here after creating
      createNewBlogRef.current.toggleVisibility()

      const blog = {
        title,
        author,
        url,
      }
      await dispatch(createBlog(blog))

      dispatch(setNotificationTimer(`a new blog ${title} by ${author} added`, 5))

      setTitle('')
      setAuthor('')
      setUrl('')
    } catch (err) {
      console.log(err)
      dispatch(setErrorTimer('Failed to create blog', 5))
    }
  }

  const handleLikeClick = (blog) => {
    dispatch(likeBlog(blog))
  }

  const handleDeleteNote = async (id) => {
    try {
      const confirmDelete = window.confirm('Are you sure you want to delete this blog?')
      if (!confirmDelete) return
      await dispatch(deleteBlog(id))

      dispatch(setNotificationTimer('Blog deleted successfully', 5))
    } catch (err) {
      console.error('Failed to delete blog:', err)

      dispatch(setErrorTimer('Failed to delete blog', 5))
    }
  }

  const handleCreateComment = async (blogId, commentText) => {
    if (!commentText || commentText.trim().length === 0) {
      dispatch(setErrorTimer('Add a valid comment', 5))
      return
    }
    try {
      const updatedBlog = await blogService.createComment(blogId, {
        content: commentText,
      })

      dispatch(initilizeBlogs())
      dispatch(setNotificationTimer('Comment added', 5))
    } catch (err) {
      console.error('Failed to add comment:', err)
      dispatch(setErrorTimer('Failed to add comment', 5))
    }
  }

  if (!user) {
    return (
      <LoginForm
        handleLogin={handleLogin}
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
      />
    )
  }

  return (
    <Router>
      <AppBar position="static">
        <Toolbar sx={{ gap: 2 }}>
          <Button color="inherit" component={Link} to="/">
            Blogs
          </Button>
          <Button color="inherit" component={Link} to="/users">
            Users
          </Button>
          <Typography sx={{ flexGrow: 1 }}>{user.name} logged in</Typography>
          <Button color="inherit" onClick={logout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      <Container sx={{ mt: 3 }}>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        {notification && (
          <Alert severity="success" sx={{ mb: 2 }}>
            {notification}
          </Alert>
        )}

        <Typography variant="h4" component="h1" gutterBottom>
          Blogs app
        </Typography>

        <Routes>
          <Route
            path="/"
            element={
              <Home
                blogs={blogs}
                createNewBlogRef={createNewBlogRef}
                handleCreateNote={handleCreateNote}
                handleDeleteNote={handleDeleteNote}
                handleLikeClick={handleLikeClick}
                user={user}
                title={title}
                setTitle={setTitle}
                author={author}
                setAuthor={setAuthor}
                url={url}
                setUrl={setUrl}
              />
            }
          />
          <Route
            path="/blogs/:id"
            element={
              <SingleBlog
                blogs={blogs}
                handleLikeClick={handleLikeClick}
                handleCreateComment={handleCreateComment}
              />
            }
          />
          <Route path="/users" element={<Users users={users} />} />
          <Route path="/users/:id" element={<User users={users} />} />
        </Routes>
      </Container>
    </Router>
  )
}

export default App
