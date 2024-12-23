const express = require('express');
const morgan = require('morgan');
const app = express()

app.use(express.json()) //json-parser

const cors = require('cors');

// Enable CORS for all routes
app.use(cors());

morgan.token('jsonData', (req, res) => JSON.stringify(req.body))
app.use(morgan(':method :url :status :response-time ms - :res[content-length] :jsonData'));

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

//GET all persons
app.get('/api/persons', (req, res) => {
  res.json(contacts)
})

//GET person by id
app.get('/api/persons/:id', (req, res) => {
  const id = req.params.id
  const contact = contacts.find(contact => contact.id===id)
  if (!contact) {
    return res.status(404).end()
  }
  return res.json(contact)
})

//GET info about phonebook
app.get('/info', (req, res) => {
  const contactsAmount = contacts.length;
  const data = new Date();
  res.send(`
    <h3>Phonebook has info for ${contactsAmount} people</h3>
    <p>${data}</p>
  `);
})

//UPDATE persons detail
app.put('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  const { name, number } = req.body

  //validate data
  if (!name || !number) {
    return res.status(400).json ({
      error: 'name and number are required'
    });
  }

  // Check if contact exists
  const contactIndex = contacts.filter(contact => contact.id === id)
  if (contactIndex === -1) {
    return res.status(404).json({ error: 'Contact not found.' });
  }

  // Update contact details
  const updatedContact = { ...contacts[contactIndex], name, number };
  contacts[contactIndex] = updatedContact;

  res.json(updatedContact); // Send the updated contact back

})

//DELETE person by id
app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  contacts = contacts.filter(contact => contact.id !== id)
  res.status(204).end()
})

const generateId = () => {
  let id;
  do {
    id = Math.floor(Math.random() * 10000)
  } while (contacts.some(contact => contact.id === id))
  return id;
}

// POST to add a new person
app.post('/api/persons', (req, res) => {
  const { name, number } = req.body

  // Validate data
  if (!name || !number) {
    return res.status(400).json ({
      error: 'name and number are required'
    });
  }

  // Check for duplicate names
  const nameExist = contacts.find(contact => contact.name === name)
  if (nameExist) {
    return res.status(400).json({
      error: 'Name must be unique. This name already exists in the phonebook.'
    });
  }
  
  const contact = {
    name: name,
    number: number,
    id: generateId()
  }
  
  // Add contact to the array
  contacts = contacts.concat(contact)
  res.json(contact)
})

const PORT = 3002
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})