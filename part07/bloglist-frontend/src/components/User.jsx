import { useParams, useNavigate } from "react-router-dom";

const User = ({ users }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const user = users.find((u) => u._id === id);

  if (!user) return <p>User not found</p>;

  return (
    <>
      <h2>{user.username}</h2>
      <button onClick={() => navigate(-1)}>back to users</button>
      <p>Blogs created: {user.blogs ? user.blogs.length : 0}</p>
      <h3>added blogs</h3>
      <ul>
        {user.blogs &&
          user.blogs.map((blog) => <li key={blog.id}>{blog.title}</li>)}
      </ul>
    </>
  );
};

export default User;
