import Togglable from './Togglable';

const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  };

  return (
    <div style={blogStyle}>
      <div>
        <strong>{blog.title}</strong> {/* Always visible */}
        <Togglable buttonLabel="View Details">
          <p>by {blog.author}</p>
          <p>URL: {blog.url}</p>
          <p>Likes: {blog.likes || 0}</p>
        </Togglable>
      </div>
    </div>
  );
};

export default Blog;