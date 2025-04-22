import Togglable from './Togglable'
import { useState } from 'react'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'

const Blog = ({ blog, handleDeleteNote }) => {
  const [likes, setLikes] = useState(blog.likes)

  const increaseLike = async () => {
    try {
      const updatedBlog = {
        ...blog,
        likes: likes + 1,
        user: blog.user._id || blog.user,
      }
      const returnedBlog = await blogService.update(blog.id, updatedBlog)
      setLikes(returnedBlog.likes)
    } catch (err) {
      console.error('Failed to update likes:', err)
    }
  }

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
          <div style={{ display: 'flex' }}>
            <p style={{ margin: '2px 0' }}>Likes: {likes}</p>
            <button onClick={increaseLike}>like</button>
          </div>
          <p style={{ margin: '2px 0' }}>Author: {blog.author}</p>
          <button
            style={{ color: 'red' }}
            onClick={() => handleDeleteNote(blog.id)}
          >
            delete
          </button>
        </>
      </Togglable>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    likes: PropTypes.number.isRequired,
    user: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  handleDeleteNote: PropTypes.func.isRequired,
}

export default Blog
