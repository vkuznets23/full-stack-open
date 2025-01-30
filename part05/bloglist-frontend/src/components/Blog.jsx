import Togglable from './Togglable';
import { useState } from 'react';
import blogService from '../services/blogs'

const Blog = ({ blog, handleDelete }) => {
  const [likes, setLikes] = useState(blog.likes);

  const handleLike = async () => {
    try {
      // Ensure the blog has an id before calling the service
      if (!blog.id) {
        console.error('Blog ID is missing');
        return;
      }
  
      const updatedBlog = await blogService.updateBlogLikes(blog); // Pass the whole blog object here
      setLikes(updatedBlog.likes); // Update UI with new likes count
    } catch (error) {
      console.error('Error updating likes:', error);
    }
  };
  

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
          <p>
            Likes: {likes} 
            <button onClick={handleLike}>Like</button>
          </p>
          <button onClick={() => handleDelete(blog.id)}>Delete</button>
        </Togglable>
      </div>
    </div>
  );
};

export default Blog;