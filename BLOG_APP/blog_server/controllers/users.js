const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const User = require('../models/user')

usersRouter.get('/', async (_req, res, next) => {
  try {
    const users = await User.find({}).populate('blogs')
    res.json(users)
  } catch (error) {
    next(error)
  }
})

usersRouter.post('/', async (req, res, next) => {
  const { username, name, password } = req.body

  if (!password || password.length < 3) {
    return res
      .status(400)
      .json({ error: 'Password must be at least 3 characters long' })
  }

  const existingUser = await User.findOne({ username })
  if (existingUser) {
    return res.status(400).json({ error: 'Username must be unique' })
  }

  try {
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({ username, name, passwordHash })
    const savedUser = await user.save()

    const userForToken = {
      username: savedUser.username,
      id: savedUser._id,
    }
    const token = jwt.sign(userForToken, process.env.SECRET, {
      expiresIn: '1h',
    })

    res.status(201).json({
      token,
      username: savedUser.username,
      name: savedUser.name,
    })
  } catch (error) {
    next(error)
  }
})

module.exports = usersRouter
