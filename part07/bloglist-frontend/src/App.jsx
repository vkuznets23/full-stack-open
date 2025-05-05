import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CreateNewBlog, LoginForm, Blog, Togglable } from "./components";
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

  return (
    <div>
      {error && <div style={{ color: "red" }}>{error}</div>}
      {notification && <div style={{ color: "green" }}>{notification}</div>}

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
            <p>{user.name ? user.name : "You are "} logged in</p>
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
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          handleDeleteNote={handleDeleteNote}
          currentUser={user}
        />
      ))}
    </div>
  );
};

export default App;
