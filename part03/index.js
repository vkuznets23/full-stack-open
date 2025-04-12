const Contact = require('./mongoDBContacts')
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const fs = require('fs')
const path = require('path')
const multer = require('multer')

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, 'uploads')
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir)
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/')
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`)
  },
})

const upload = multer({ storage: storage })

const app = express()

// Serve static files from the uploads directory
app.use('/uploads', express.static('uploads'))
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

app.get('/api/persons/:id', (req, res) => {
  const id = req.params.id
  Contact.findById(id).then((person) => {
    if (person) res.json(person)
    else res.status(404).end()
  })
})

app.delete('/api/persons/:id', (req, res) => {
  const id = req.params.id
  Contact.findByIdAndDelete(id)
    .then(() => {
      res.status(204).end()
    })
    .catch((error) => next(error))
})

app.post('/api/persons', upload.single('photo'), async (req, res, next) => {
  const { name, phone } = req.body
  const photoUrl = req.file ? `/uploads/${req.file.filename}` : ''

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
      photoUrl,
    })
    const savedContact = await newContact.save()
    res.json(savedContact)
  } catch (error) {
    next(error)
  }
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
