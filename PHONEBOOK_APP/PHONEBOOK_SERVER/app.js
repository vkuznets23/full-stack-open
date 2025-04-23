const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const mongoose = require('mongoose')
const config = require('./utils/config')
const logger = require('./utils/loggers')
const middleware = require('./utils/middleware')
const contactsRouter = require('./controllers/contacts')

const app = express()

// Middleware
app.use(cors())
app.use(express.json())

morgan.token('post-data', (req) =>
  req.method === 'POST' ? JSON.stringify(req.body) : ''
)

if (process.env.NODE_ENV !== 'test') {
  app.use(morgan(':method :url :status :response-time ms :post-data'))
}

// Routes
app.use('/api/persons', contactsRouter)
if (process.env.NODE_ENV === 'test') {
  const testingRouter = require('./controllers/testing')
  app.use('/api/testing', testingRouter)
}

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info('Connected to MongoDB')
  })
  .catch((error) => {
    logger.error('Error connecting to MongoDB:', error.message)
  })

// Custom middleware
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
