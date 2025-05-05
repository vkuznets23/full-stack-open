import { useState, useEffect, useRef } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LoginForm } from "./components";
import { setNotificationTimer } from "./slices/notification";
import { setErrorTimer } from "./slices/errorNotification";
import {
  fetchBlogs as initilizeBlogs,
  createBlog,
  deleteBlog,
} from "./slices/blogs";
import blogService from "./services/blogs";
import loginService from "./services/login";
import { removeUser, setUser } from "./slices/user";
import Home from "./pages/Home";
import Users from "./pages/Users";

const App = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const dispatch = useDispatch();
  const createNewBlogRef = useRef(); //container that holds referense to togglable
  const notification = useSelector((state) => state.notification.msg);
  const error = useSelector((state) => state.error.msg);
  const blogs = useSelector((state) => state.blogs.blogs) || [];
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    dispatch(initilizeBlogs());
  }, [dispatch]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);

      dispatch(setUser(user));
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      blogService.setToken(user.token);
      dispatch(setUser(user));

      setUsername("");
      setPassword("");
    } catch (exception) {
      console.log(exception);
      dispatch(setErrorTimer("Wrong credentials", 5));
    }
  };

  const logout = () => {
    window.localStorage.removeItem("loggedBlogappUser");
    dispatch(removeUser());
  };

  const handleCreateNote = async (e) => {
    e.preventDefault();

    try {
      if (!title || !author || !url) {
        dispatch(setErrorTimer("Please fill in all fields", 5));
        return;
      }

      // we hide form here after creating
      createNewBlogRef.current.toggleVisibility();

      const blog = {
        title,
        author,
        url,
      };
      await dispatch(createBlog(blog));

      dispatch(
        setNotificationTimer(`a new blog ${title} by ${author} added`, 5),
      );

      setTitle("");
      setAuthor("");
      setUrl("");
    } catch (err) {
      console.log(err);
      dispatch(setErrorTimer("Failed to create blog", 5));
    }
  };

  const handleDeleteNote = async (id) => {
    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this blog?",
      );
      if (!confirmDelete) return;
      await dispatch(deleteBlog(id));

      dispatch(setNotificationTimer("Blog deleted successfully", 5));
    } catch (err) {
      console.error("Failed to delete blog:", err);

      dispatch(setErrorTimer("Failed to delete blog", 5));
    }
  };

  if (!user) {
    return (
      <LoginForm
        handleLogin={handleLogin}
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
      />
    );
  }

  return (
    <Router>
      <nav>
        <Link to="/">blogs</Link>
        {" | "}
        <Link to="/users">users</Link>
        {" | "}
        {user.name} logged in <button onClick={logout}>logout</button>
      </nav>
      <div>
        {error && <div style={{ color: "red" }}>{error}</div>}
        {notification && <div style={{ color: "green" }}>{notification}</div>}
      </div>
      <h1>Blogs app</h1>

      <Routes>
        <Route
          path="/"
          element={
            <Home
              blogs={blogs}
              createNewBlogRef={createNewBlogRef}
              handleCreateNote={handleCreateNote}
              handleDeleteNote={handleDeleteNote}
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
        <Route path="/users" element={<Users />} />
      </Routes>
    </Router>
  );
};

export default App;
