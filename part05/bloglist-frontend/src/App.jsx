import { useState, useEffect } from 'react';
import Blog from './components/Blog';
import Login from './components/login';
import Togglable from './components/Togglable';
import BlogForm from './components/BlogForm';
import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const [notification, setNotification] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername('');
      setPassword('');
      setErrorMessage(null);
      blogService.getAll().then((blogs) => setBlogs(blogs));
    } catch (exception) {
      setErrorMessage('Wrong credentials');
      setTimeout(() => setErrorMessage(null), 5000);
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogAppUser');
    setUser(null);
    blogService.setToken(null);
  };

  const addBlog = async (blogObject) => {
    try {
      const createdBlog = await blogService.create(blogObject);
      setBlogs(await blogService.getAll()); // Fetch updated list
      setNotification(`Blog '${blogObject.title}' successfully added`);
      setTimeout(() => setNotification(null), 5000);
    } catch (error) {
      setErrorMessage('Failed to create blog');
      setTimeout(() => setErrorMessage(null), 5000);
    }
  };  

  return (
    <div>
      {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
      {notification && <div style={{ color: 'green' }}>{notification}</div>}

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
          <h2>Welcome, {user.name}!</h2>
          <button onClick={handleLogout}>Logout</button>

          <div>
            <h3>Add new blog</h3>
            <Togglable buttonLabel='Create New Blog'>
              <BlogForm createBlog={addBlog} />
            </Togglable>
          </div>

          <h3>Your Blogs</h3>
          <div>
            {blogs.length === 0 ? (
              <p>No blogs available.</p>
            ) : (
              blogs.map((blog) => <Blog key={blog.id || blog._id} blog={blog} />)
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;