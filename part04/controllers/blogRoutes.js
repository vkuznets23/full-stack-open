const express = require('express');
const Blog = require('../models/blogSchema');
const User = require('../models/usersSchema');
const authenticateToken = require('../middleware/auth');

const router = express.Router();

// GET all blogs
router.get('/', async (req, res) => {
  try {
    const blogs = await Blog.find({})
      .populate('user', 'username name _id') // Populate the user field with specific fields
      .exec();

    res.json(blogs);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch blogs' });
  }
});

// GET a single blog by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    // Find blog by ID
    const blog = await Blog.findById(id);

    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' });
    }

    // Return the found blog
    res.status(200).json(blog);
  } catch (error) {
    res.status(400).json({ error: 'Invalid ID format' });
  }
});

// POST a new blog (requires valid token)
router.post('/', authenticateToken, async (req, res) => {
  const { title, author, url, likes } = req.body;

  // Create a new blog instance using the authenticated user ID
  const blog = new Blog({
    title,
    author,
    url,
    likes: likes || 0, // Default likes to 0 if not provided
    user: req.user.id, // Use the user ID from the token
  });

  try {
    // Save the blog to the database
    const savedBlog = await blog.save();

    // Find the user and add the blog to the user's blogs array
    const user = await User.findById(req.user.id);
    user.blogs = user.blogs.concat(savedBlog._id); // Add the new blog's ID to the user's blogs
    await user.save();

    // Respond with the created blog
    res.status(201).json(savedBlog);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create blog' });
  }
});

// DELETE a blog by ID
router.delete('/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;

  try {
    // Find and delete the blog by ID
    const blog = await Blog.findByIdAndDelete(id);

    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' });
    }

    // Respond with status 204 (No Content) for successful deletion
    res.status(204).end();
  } catch (error) {
    res.status(400).json({ error: 'Invalid ID format' });
  }
});

// PUT (update) a blog by ID
router.put('/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  const updatedBlogData = req.body;

  try {
    // Find and update the blog by ID
    const updatedBlog = await Blog.findByIdAndUpdate(id, updatedBlogData, {
      new: true,
      runValidators: true,
    });

    if (!updatedBlog) {
      return res.status(404).json({ error: 'Blog not found' });
    }

    // Respond with the updated blog
    res.status(200).json(updatedBlog);
  } catch (error) {
    res.status(400).json({ error: 'Invalid ID format or invalid data' });
  }
});

module.exports = router;
