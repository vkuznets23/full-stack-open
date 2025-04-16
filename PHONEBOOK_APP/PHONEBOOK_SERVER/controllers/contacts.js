const multer = require('multer')
const Contact = require('../models/contact')

const router = require('express').Router()
const storage = multer.memoryStorage()
const upload = multer({ storage })

router.get('/', async (_req, res) => {
  try {
    const contacts = await Contact.find({})
    res.json(contacts)
  } catch (err) {
    next(err)
  }
})

router.get('/info', async (_req, res) => {
  try {
    const peopleAmount = await Contact.countDocuments({})
    const currentDate = new Date().toString()
    res.send(
      `Phonebook has info for ${peopleAmount} people <br> ${currentDate}`
    )
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const id = req.params.id
    const person = await Contact.findById(id)
    if (!person) {
      return res.status(404).json({ error: 'Contact not found' })
    }

    res.json(person)
  } catch (err) {
    next(err)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    const id = req.params.id
    await Contact.findByIdAndDelete(id)
    res.status(204).end()
  } catch (err) {
    next(err)
  }
})

router.post('/', upload.single('photo'), async (req, res, next) => {
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

module.exports = router
