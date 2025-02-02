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

  /*useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);*/

  useEffect(() => {
    blogService.getAll().then((initialBlogs) => {
      // Map _id to id for each blog
      const formattedBlogs = initialBlogs
      .map(blog => ({
        ...blog,
        id: blog._id, // Convert _id to id
      }))
      .sort((a, b) => b.likes - a.likes);
  
      console.log("Formatted blogs:", formattedBlogs); // Check if blogs have id now
      setBlogs(formattedBlogs);
    });
  }, []);
  
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      try {
        await blogService.deleteBlog(id); // Call the deleteBlog function
        setBlogs(blogs.filter(blog => blog.id !== id)); // Remove the deleted blog from state
      } catch (error) {
        console.error('Error deleting blog:', error);
      }
    }
  };

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
      setBlogs((prevBlogs) => [...prevBlogs, createdBlog]);
      setNotification(`Blog '${blogObject.title}' successfully added`);
      setTimeout(() => setNotification(null), 5000);
    } catch (error) {
      setErrorMessage('Failed to create blog');
      setTimeout(() => setErrorMessage(null), 5000);
    }
  };  

  return (
    <div>
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
              blogs.map((blog) => <Blog key={blog.id || blog._id} blog={blog} handleDelete={handleDelete}/>)
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;