const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/usersSchema')
const authenticateToken = require('../middleware/auth');


usersRouter.get('/', async (req, res) => {
  try {
    const users = await User.find({})
      .populate('blogs', 'url title aithor _id') // Populate the user field with specific fields
      .exec();

    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch blogs' });
  }
});

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body

  if (!username || !password) {
    return response.status(400).json({ error: 'Username and password are required' })
  }

  if (username.length < 3 || password.length < 3) {
    return response.status(400).json({ error: 'Username and password must be at least 3 characters long' })
  }

  const existingUser = await User.findOne({ username })
  if (existingUser) {
    return response.status(400).json({ error: 'Username must be unique' })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash,
  })

  const savedUser = await user.save()

  response.status(201).json(savedUser)
})

usersRouter.delete('/:id', authenticateToken, async (req, res) => {
  try {
    // Only allow deleting if the logged-in user is the same as the one making the request
    if (req.user.id.toString() !== req.params.id) {
      return res.status(403).json({ error: 'You can only delete your own account' });
    }
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(204).end(); // Successfully deleted, no content to return
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete user' });
  }
});

module.exports = usersRouter