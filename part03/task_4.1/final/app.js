const express = require('express')
const config = require('./utils/config')
const logger = require('./utils/loggers')
const blogRouter = require('./controllers/blogs')

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/blogs', blogRouter)

// Custom middleware
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
