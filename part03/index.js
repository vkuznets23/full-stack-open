const express = require('express')
const morgan = require('morgan')
const app = express()

let data = [
  {
    id: '1',
    name: 'Arto Hellas',
    number: '040-123456',
  },
  {
    id: '2',
    name: 'Ada Lovelace',
    number: '39-44-5323523',
  },
  {
    id: '3',
    name: 'Dan Abramov',
    number: '12-43-234345',
  },
  {
    id: '4',
    name: 'Mary Poppendieck',
    number: '39-23-6423122',
  },
]
// app.use(morgan('dev'))
app.use(express.json())

// Custom token for logging POST data
morgan.token('post-data', (req) => {
  return req.method === 'POST' ? JSON.stringify(req.body) : ''
})

app.use(morgan(':method :url :status :response-time ms :post-data'))

app.get('/api/persons', (req, res) => {
  res.json(data)
})

app.get('/info', (_req, res) => {
  const peopleAmount = data.length
  const currentDate = new Date().toString()
  res.send(`Phonebook has info for ${peopleAmount} people <br> ${currentDate}`)
})

app.get('/api/persons/:id', (req, res) => {
  const id = req.params.id
  const person = data.find((person) => person.id === id)
  if (person) res.json(person)
  else res.status(404).end()
})

app.delete('/api/persons/:id', (req, res) => {
  const id = req.params.id
  data = data.filter((person) => person.id !== id)
  res.status(204).end()

  // const personIndex = data.findIndex((person) => person.id === id)
  // if (personIndex !== -1) {
  //   data.splice(personIndex, 1)
  //   res.status(204).end()
  // } else {
  //   res.status(404).json({ error: 'Person not found' })
  // }
})

app.post('/api/persons', (req, res) => {
  const body = req.body

  if (!body.name || !body.number) {
    return res.status(400).json({
      error: 'name or number missing',
    })
  }
  if (data.find((person) => person.name === body.name))
    return res.status(400).json({
      error: 'name must be unique',
    })

  const newId = String(data.length + 1)
  const newPerson = {
    id: newId,
    name: body.name,
    number: body.number,
  }
  data = data.push(newPerson)
  res.json(newPerson)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
