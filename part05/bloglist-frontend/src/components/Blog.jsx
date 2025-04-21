import Togglable from './Togglable'

const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }
  return (
    <div style={blogStyle}>
      <h3 style={{ margin: '2px 0' }}>{blog.title} </h3>
      <Togglable buttonLabelShow="view" buttonLabelHide="hide">
        <>
          <p style={{ margin: '2px 0' }}>url: {blog.url}</p>
          <p style={{ margin: '2px 0' }}>Likes: {blog.likes}</p>
          <p style={{ margin: '2px 0' }}>Author: {blog.author}</p>
        </>
      </Togglable>
    </div>
  )
}

export default Blog
