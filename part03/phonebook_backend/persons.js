const express = require('express')
const app = express()

app.use(express.json()) //json-parser

let contacts = [
  { 
    "id": "1",
    "name": "Arto Hellas", 
    "number": "040-123456"
  },
  { 
    "id": "2",
    "name": "Ada Lovelace", 
    "number": "39-44-5323523"
  },
  { 
    "id": "3",
    "name": "Dan Abramov", 
    "number": "12-43-234345"
  },
  { 
    "id": "4",
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122"
  }
];

app.get('/api/persons', (request, resnonse) => {
  resnonse.json(contacts)
})

app.get('/api/persons/:id', (req, res) => {
  //var that extracts id from the URL
  //need to filter all contacts to find the exact id
  //if data exists
    //show the data
  //else
    //show 404 error
  const id = req.params.id
  const contact = contacts.filter(contact => contact.id===id)
  if (contact) {
    res.json(contact)
  } else {
    res.json(404).end() //It signals to the client that the server has finished sending data for the response
  }
})

app.get('/info', (req, res) => {
  const contactsAmount = contacts.length;
  const data = new Date();
  res.send(`
    <h3>Phonebook has info for ${contactsAmount} people</h3>
    <p>${data}</p>
  `);
})

app.delete('/api/persons/:id', (req, res) => {
  //create exctracted id
  // filter the contacts to skip all contacts that dont match the id
  //print the 204 code -> no content

  const id = req.params.id
  contacts = contacts.filter(contact => contact.id !== id)
  res.status(204).end()
})

const generateId = () => {
  return Math.floor(Math.random() * 10000)
}

app.post('/api/persons', (req, res) => {
  const { name, number } = req.body
  //this will mean this:
  //req.body = {
  //name: "John Doe",
  //number: "123-456-789"
  //};
  if (!name || !number) {
    return res.status(400).json ({
      error: 'name and number are required'
    })
  }

  const nameExist = contacts.find(contact => contact.name === name)
  if (nameExist) {
    return res.status(400).json({
      error: 'Name must be unique. This name already exists in the phonebook.'
    });
  }
  // if no name or number -> error msg
  // if name already exists -> error msg
  const contact = {
    name: name,
    number: number,
    id: generateId()
  }
  
  contacts = contacts.concat(contact)
  res.json(contact)
})

const PORT = 3002
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})