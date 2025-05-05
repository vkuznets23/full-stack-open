import { useState } from 'react'
import { useParams } from 'react-router-dom'

const SingleBlog = ({ blogs, handleLikeClick, handleCreateComment }) => {
  const [commentText, setCommentText] = useState('')

  const { id } = useParams()
  const blog = blogs.find((blog) => blog.id === id)

  if (!blog) return <p>cant find blog</p>

  const handleSubmit = (e) => {
    e.preventDefault()
    handleCreateComment(blog.id, commentText)
    setCommentText('')
  }

  return (
    <div>
      <h2>{blog.title}</h2>
      <a href={blog.url} target="_blank" rel="noopener noreferrer">
        {blog.url}
      </a>
      <p>{blog.likes} likes</p>
      <button onClick={() => handleLikeClick(blog)}>like</button>
      <p>Added by {blog.author}</p>
      <h2>Comments</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder="Add a comment..."
        />
        <button type="submit">Add comment</button>
      </form>
      <ul>{blog.comments && blog.comments.map((c, i) => <li key={i}>{c}</li>)}</ul>
    </div>
  )
}

export default SingleBlog
