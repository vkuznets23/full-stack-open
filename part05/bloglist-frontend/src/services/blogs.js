import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = (id, newObject) => {
  const request = axios.put(`${ baseUrl }/${id}`, newObject)
  return request.then(response => response.data)
}

const updateBlogLikes = async (blog) => {
  if (!blog.id || !blog.user?.id) {
    console.error("Error: Blog ID or User ID is undefined");
    return;
  }

  const config = {
    headers: { Authorization: token }, // Include token
  };

  // Make sure you're sending the full blog data to the backend
  const updatedBlog = {
    user: blog.user.id || blog.user, // Send user ID, not the object
    title: blog.title,
    author: blog.author,
    url: blog.url,
    likes: blog.likes + 1, // Increment likes
  };

  // Correctly use blog.id instead of _id
  const response = await axios.put(`${baseUrl}/${blog.id}`, updatedBlog, config); // Use blog.id
  return response.data;
};

const deleteBlog = async (id) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.delete(`${baseUrl}/${id}`, config);
  return response.data;
};

export default { getAll, update, create, setToken, updateBlogLikes, deleteBlog }