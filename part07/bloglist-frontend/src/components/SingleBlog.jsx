import { useParams } from "react-router-dom";

const SingleBlog = ({ blogs, handleLikeClick }) => {
  const { id } = useParams();
  const blog = blogs.find((blog) => blog.id === id);

  if (!blog) return <p>cant find blog</p>;

  return (
    <div>
      <h2>{blog.title}</h2>
      <a href={blog.url} target="_blank" rel="noopener noreferrer">
        {blog.url}
      </a>
      <p>{blog.likes} likes</p>
      <button onClick={() => handleLikeClick(blog)}>like</button>
      <p>Added by {blog.author}</p>
    </div>
  );
};

export default SingleBlog;
