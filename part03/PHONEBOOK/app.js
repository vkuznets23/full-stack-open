const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
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
app.use(morgan(':method :url :status :response-time ms :post-data'))

// Routes
app.use('/api/persons', contactsRouter)

// Custom middleware
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
