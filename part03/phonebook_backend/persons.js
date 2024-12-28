require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const errorHandler = require('./errorHandler');
const app = express();

app.use(express.json()) //json-parser

const cors = require('cors');
// Enable CORS for all routes
app.use(cors());

morgan.token('jsonData', (req, res) => JSON.stringify(req.body))
app.use(morgan(':method :url :status :response-time ms - :res[content-length] :jsonData'));

const password = process.env.MONGODB_PASSWORD;
if (!password) {
  console.log('Please provide the password as an argument: node mongo.js <password>');
  process.exit(1);
}

const dbUri = `mongodb+srv://vkuznets:${password}@phonebook.3wnu5.mongodb.net/phonebook?retryWrites=true&w=majority`;
mongoose.connect(dbUri)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Failed to connect to MongoDB:', err));

const contactSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  number: { type: String, required: true, trim: true },
});
contactSchema.index({ name: 1 });

const Contact = mongoose.model('Contact', contactSchema);

//GET all persons
app.get('/api/persons', async (req, res) => {
  try {
      const contacts = await Contact.find({}).sort({ name: 1 });
      res.json(contacts);
  } catch (error) {
      next(error);
  }
});

//GET person by id
app.get('/api/persons/:id', async (req, res, next) => {
  try {
      const contact = await Contact.findById(req.params.id);
      if (!contact) {
          return res.status(404).json({ error: 'Contact not found' });
      }
      res.json(contact);
  } catch (error) {
      next(error);
  }
});

//GET info about phonebook
app.get('/info', async (req, res, next) => {
  try {
    const count = await Contact.countDocuments({});
    res.send(`
      <h3>Phonebook has info for ${count} people</h3>
      <p>${new Date()}</p>
    `);
  } catch (error) {
    next(error);
  }
});

//UPDATE persons detail
app.put('/api/persons/:id', async (req, res, next) => {
  console.log("Updating contact with id:", req.params.id);
  console.log("Request body:", req.body);
  const { name, number } = req.body;

  if (!name || !number) {
      return res.status(400).json({ error: 'Name and number are required' });
  }

  try {
      const updatedContact = await Contact.findByIdAndUpdate(
          req.params.id,
          { name, number },
          { new: true, runValidators: true }
      );
      if (!updatedContact) {
          return res.status(404).json({ error: 'Contact not found' });
      }
      res.json(updatedContact);
  } catch (error) {
      next(error);
  }
});

//DELETE person by id
app.delete('/api/persons/:id', async (req, res, next) => {
  try {
    const deletedContact = await Contact.findByIdAndDelete(req.params.id);
    if (!deletedContact) {
      return res.status(404).json({ error: 'Contact not found' });
    }
    res.status(200).json({ message: 'Contact deleted successfully' });
  } catch (error) {
    console.error('Error deleting contact:', error);
    next(error);
  }
});

// POST to add a new person
app.post('/api/persons', async (req, res, next) => {
  const { name, number } = req.body;

  // Validate data
  if (!name || !number) {
    return res.status(400).json({
      error: 'name and number are required',
    });
  }

  try {
    // Create a new contact document using Mongoose
    const newContact = new Contact({ name, number });

    // Save the contact to the database
    const savedContact = await newContact.save();

    res.status(201).json(savedContact); // Respond with the saved contact
  } catch (error) {
    console.error('Error saving contact to MongoDB:', error.message); // Log the error
    next(error);
  }
});

app.use(errorHandler);

const PORT = process.env.PORT || 3002
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})