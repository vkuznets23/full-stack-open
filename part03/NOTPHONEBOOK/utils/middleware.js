const logger = require('./logger')

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

module.exports = { errorHandler, unknownEndpoint }
