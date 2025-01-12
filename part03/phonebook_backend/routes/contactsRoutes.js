const express = require('express');
const Contact = require('../models/contact');

const router = express.Router();

// GET all persons
router.get('/', async (req, res, next) => {
  const { page = 1, limit = 10 } = req.query;
  try {
    const contacts = await Contact.find({})
      .sort({ name: 1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));
    res.json(contacts);
  } catch (error) {
    next(error);
  }
});

// GET person by ID
router.get('/:id', async (req, res, next) => {
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

// GET phonebook info
router.get('/info', async (req, res, next) => {
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

// UPDATE person by ID
router.put('/:id', async (req, res, next) => {
  const { name, number } = req.body;

  if (!name || !number) {
    return res.status(400).json({ error: 'Name and number are required' });
  }

  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ error: 'Contact not found' });
    }

    contact.name = name;
    contact.number = number;
    const updatedContact = await contact.save();

    res.json(updatedContact);
  } catch (error) {
    next(error);
  }
});

// DELETE person by ID
router.delete('/:id', async (req, res, next) => {
  try {
    const deletedContact = await Contact.findByIdAndDelete(req.params.id);
    if (!deletedContact) {
      return res.status(404).json({ error: 'Contact not found' });
    }
    res.status(200).json({ message: 'Contact deleted successfully' });
  } catch (error) {
    next(error);
  }
});

// CREATE a new person
router.post('/', async (req, res, next) => {
  const { name, number } = req.body;

  if (!name || !number) {
    return res.status(400).json({
      error: 'Name and number are required',
    });
  }

  try {
    const newContact = new Contact({ name, number });
    const savedContact = await newContact.save();
    res.status(201).json(savedContact);
  } catch (error) {
    next(error);
  }
});

module.exports = router;