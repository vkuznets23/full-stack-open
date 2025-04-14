const Contact = require('./models/mongoDBContacts')
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const multer = require('multer')
const unknownEndpoint = require('./middleware/unknownEndpoint')
const errorHandler = require('./middleware/errorHandler')

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })
const app = express()

app.use(cors())
app.use(express.json())

// Custom token for logging POST data
morgan.token('post-data', (req) => {
  return req.method === 'POST' ? JSON.stringify(req.body) : ''
})
app.use(morgan(':method :url :status :response-time ms :post-data'))

app.get('/api/persons', (_req, res) => {
  Contact.find({}).then((contacts) => {
    res.json(contacts)
  })
})

app.get('/info', async (_req, res) => {
  const peopleAmount = await Contact.countDocuments({})
  const currentDate = new Date().toString()
  res.send(`Phonebook has info for ${peopleAmount} people <br> ${currentDate}`)
})

app.get('/api/persons/:id', (req, res, next) => {
  const id = req.params.id
  Contact.findById(id)
    .then((person) => {
      if (person) res.json(person)
      else res.status(404).end()
    })
    .catch((error) => next(error)) // <<<< here we send error to errorHandler
})

app.delete('/api/persons/:id', (req, res, next) => {
  const id = req.params.id
  Contact.findByIdAndDelete(id)
    .then(() => {
      res.status(204).end()
    })
    .catch((error) => next(error))
})

app.post('/api/persons', upload.single('photo'), async (req, res, next) => {
  const { name, phone } = req.body
  const photoBuffer = req.file ? req.file.buffer : null

  if (!name || !phone) {
    return res.status(400).json({
      error: 'name or number missing',
    })
  }

  try {
    const existing = await Contact.findOne({ name })
    if (existing) {
      return res.status(400).json({
        error: 'name must be unique',
      })
    }
    const newContact = new Contact({
      name,
      phone,
      photoBuffer,
    })

    const savedContact = await newContact.save()
    const photoUrl = savedContact.photoBuffer
      ? `data:image/jpeg;base64,${savedContact.photoBuffer.toString('base64')}`
      : null

    res.json({
      id: savedContact._id,
      name,
      phone,
      photoUrl,
    })
  } catch (error) {
    next(error)
  }
})

app.use(unknownEndpoint)
app.use(errorHandler)

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
