const errorHandler = (error, request, response, next) => {
  console.error('Error:', error.name, error.message)
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }
  if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
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

module.exports = errorHandler
