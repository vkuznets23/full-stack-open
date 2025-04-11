const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const multer = require('multer')
const path = require('path')
const app = express()

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/')
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`)
  },
})

const upload = multer({ storage: storage })

app.use('/uploads', express.static('uploads'))

let data = [
  {
    id: 1,
    name: 'Tracy Donnelly',
    phone: '+36-337-045-5325',
    photo: '/uploads/2.avif',
  },
  {
    id: 2,
    name: 'Ervin Nicolas Sr.',
    phone: '+30-226-892-8371',
    photo: '/uploads/1.avif',
  },
  {
    id: 3,
    name: 'Jennie Wolf',
    phone: '+99-185-999-1959',
    photo: '/uploads/3.avif',
  },
  {
    id: 4,
    name: 'Edmond Gottlieb',
    phone: '+08-969-415-8853',
    photo: '/uploads/4.avif',
  },
  {
    id: 5,
    name: 'Hugh Grant',
    phone: '+55-307-974-5730',
    photo: '',
  },
  {
    id: 6,
    name: 'Nicholas Kiehn',
    phone: '+21-302-712-2830',
    photo: '/uploads/5.avif',
  },
  {
    id: 7,
    name: 'Kevin Jones',
    phone: '+39-981-788-8946',
    photo: '/uploads/6.avif',
  },
]

app.use(cors())

// app.use(morgan('dev'))
app.use(express.json())

// Custom token for logging POST data
morgan.token('post-data', (req) => {
  return req.method === 'POST' ? JSON.stringify(req.body) : ''
})

app.use(morgan(':method :url :status :response-time ms :post-data'))

app.get('/api/persons', (_req, res) => {
  res.json(data)
})

app.get('/info', (_req, res) => {
  const peopleAmount = data.length
  const currentDate = new Date().toString()
  res.send(`Phonebook has info for ${peopleAmount} people <br> ${currentDate}`)
})

app.get('/api/persons/:id', (req, res) => {
  const id = parseInt(req.params.id, 10)
  const person = data.find((person) => person.id === id)
  if (person) res.json(person)
  else res.status(404).end()
})

app.delete('/api/persons/:id', (req, res) => {
  const id = parseInt(req.params.id, 10)
  data = data.filter((person) => person.id !== id)
  res.status(204).end()
})

app.post('/api/persons', upload.single('photo'), (req, res) => {
  const body = req.body

  if (!body.name || !body.phone) {
    return res.status(400).json({
      error: 'name or number missing',
    })
  }
  if (data.find((person) => person.name === body.name))
    return res.status(400).json({
      error: 'name must be unique',
    })

  const photoPath = req.file ? `/uploads/${req.file.filename}` : null

  const newId = data.length + 1
  const newPerson = {
    id: newId,
    name: body.name,
    phone: body.phone,
    photo: photoPath,
  }
  data.push(newPerson)
  res.json(newPerson)
})

const fs = require('fs')
const uploadsDir = './uploads'
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir)
}

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
