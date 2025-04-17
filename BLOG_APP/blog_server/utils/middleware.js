const logger = require('./logger')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

const getTokenFrom = (request) => {
  const auth = request.get('authorization')
  return auth && auth.startsWith('Bearer ') ? auth.replace('Bearer ', '') : null
}

const tokenExtractor = (request, response, next) => {
  const authorization = request.get('Authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    request.token = authorization.substring(7)
  } else {
    request.token = null
  }
  next()
}

const userExtractor = async (req, res, next) => {
  const token = req.token

  if (!token) {
    return res.status(401).json({ error: 'Token missing or invalid' })
  }

  try {
    const decodedToken = jwt.verify(token, process.env.SECRET)

    if (!decodedToken.id) {
      return res.status(401).json({ error: 'Token invalid' })
    }

    const user = await User.findById(decodedToken.id)
    req.user = user
    next()
  } catch (error) {
    return res.status(401).json({ error: 'Token invalid' })
  }
}

const errorHandler = (error, request, response, next) => {
  logger.error('Error:', error.name, error.message)
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }
  if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  if (
    error.name === 'MongoServerError' &&
    error.message.includes('E11000 duplicate key error')
  ) {
    return response
      .status(400)
      .json({ error: 'expected `username` to be unique' })
  }

  if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({ error: 'invalid token' })
  } else if (error.name === 'TokenExpiredError') {
    return response.status(401).json({ error: 'token expired' })
  }

  //for Multer
  if (error.code === 'LIMIT_FILE_SIZE') {
    return response.status(400).json({ error: 'File too large' })
  }
  if (error.message === 'Unexpected field') {
    return response.status(400).json({ error: 'Unexpected file field' })
  }

  return response.status(500).json({ error: 'Internal server error' })
}

const unknownEndpoint = (_request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

module.exports = {
  errorHandler,
  unknownEndpoint,
  getTokenFrom,
  tokenExtractor,
  userExtractor,
}
