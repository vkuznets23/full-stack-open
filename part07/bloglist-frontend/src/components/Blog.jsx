import Togglable from "./Togglable";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { likeBlog } from "../slices/blogs";
import { Link } from "react-router-dom";

const Blog = ({ blog, handleDeleteNote, currentUser, handleLikeClick }) => {
  const dispatch = useDispatch();

  const blogFromStore = useSelector((state) =>
    state.blogs.blogs.find((b) => b.id === blog.id),
  );

  const likes = blogFromStore ? blogFromStore.likes : 0;

  // const handleLikeClick = () => {
  //   dispatch(likeBlog(blog));
  // };

  // check for current user
  const isOwner =
    currentUser &&
    (blog.user === currentUser.id || blog.user._id === currentUser.id);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  return (
    <div data-testid="blog" style={blogStyle}>
      <h3 data-testid="blog-title" style={{ margin: "2px 0" }}>
        {/* {blog.title}  */}
        <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
      </h3>
      <Togglable buttonLabelShow="view" buttonLabelHide="hide">
        <>
          <p style={{ margin: "2px 0" }}>url: {blog.url}</p>
          <div style={{ display: "flex" }}>
            <p style={{ margin: "2px 0" }}>Likes: {likes}</p>
            <button onClick={() => handleLikeClick(blog)}>like</button>
          </div>
          <p style={{ margin: "2px 0" }}>Author: {blog.author}</p>
          {isOwner && (
            <button
              style={{ color: "red" }}
              onClick={() => handleDeleteNote(blog.id)}
            >
              delete
            </button>
          )}
        </>
      </Togglable>
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    likes: PropTypes.number.isRequired,
    user: PropTypes.oneOfType([
      PropTypes.string.isRequired,
      PropTypes.shape({
        _id: PropTypes.string.isRequired,
        username: PropTypes.string.isRequired,
      }).isRequired,
    ]).isRequired,
  }).isRequired,
  currentUser: PropTypes.shape({
    id: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    name: PropTypes.string,
  }),
  handleDeleteNote: PropTypes.func.isRequired,
};

export default Blog;
