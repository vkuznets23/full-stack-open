import { createSlice } from "@reduxjs/toolkit";
import blogServices from "../services/blogs";

const initialState = {
  blogs: [],
};

const blogsSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {
    setBlogs: (state, action) => {
      state.blogs = action.payload;
    },
    appendBlog: (state, action) => {
      state.blogs = [...state.blogs, action.payload];
    },
    updateBlog: (state, action) => {
      const updated = action.payload;
      state.blogs = state.blogs.map((b) => (b.id !== updated.id ? b : updated));
    },
    deleteBlog: (state, action) => {
      const id = action.payload;
      state.blogs = state.blogs.filter((blog) => blog.id !== id);
    },
  },
});

//GET
export const fetchBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogServices.getAll();
    const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes);

    dispatch(setBlogs(sortedBlogs));
  };
};

//POST
export const createBlog = (blog) => {
  return async (dispatch) => {
    const newBlog = await blogServices.create(blog);
    dispatch(appendBlog(newBlog));
  };
};

//PUT
export const changeBlog = (blog) => {
  return async (dispatch) => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
    };
    const response = await blogServices.update(updatedBlog);
    dispatch(updateBlog(response));
  };
};

export const likeBlog = (blog) => {
  return async (dispatch) => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
      user: typeof blog.user === "object" ? blog.user._id : blog.user,
    };
    const returnedBlog = await blogServices.update(blog.id, updatedBlog);

    dispatch(updateBlog(returnedBlog));
  };
};

//DELETE
export const removeBlog = (id) => {
  return async (dispatch) => {
    await blogServices.remove(id);
    dispatch(deleteBlog(id));
  };
};

export const { setBlogs, appendBlog, updateBlog, deleteBlog } =
  blogsSlice.actions;
export default blogsSlice.reducer;
