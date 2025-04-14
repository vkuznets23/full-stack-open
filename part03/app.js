const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const contactRoutes = require('./routes/contacts')
const errorHandler = require('./middleware/errorHandler')
const unknownEndpoint = require('./middleware/unknownEndpoint')

const app = express()

app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

app.use('/api/persons', contactRoutes)

app.use(unknownEndpoint)
app.use(errorHandler)

module.exports = app
