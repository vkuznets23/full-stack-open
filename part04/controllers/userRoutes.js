const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/usersSchema')


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

module.exports = usersRouter