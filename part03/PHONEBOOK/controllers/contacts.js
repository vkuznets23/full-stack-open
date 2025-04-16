const multer = require('multer')
const Contact = require('../models/contact')

const router = require('express').Router()
const storage = multer.memoryStorage()
const upload = multer({ storage })

router.get('/', (_req, res) => {
  Contact.find({}).then((contacts) => {
    res.json(contacts)
  })
})

router.get('/info', async (_req, res) => {
  const peopleAmount = await Contact.countDocuments({})
  const currentDate = new Date().toString()
  res.send(`Phonebook has info for ${peopleAmount} people <br> ${currentDate}`)
})

router.get('/:id', (req, res, next) => {
  const id = req.params.id
  Contact.findById(id)
    .then((person) => {
      if (person) res.json(person)
      else res.status(404).end()
    })
    .catch((error) => next(error)) // <<<< here we send error to errorHandler
})

router.delete('/:id', (req, res, next) => {
  const id = req.params.id
  Contact.findByIdAndDelete(id)
    .then(() => {
      res.status(204).end()
    })
    .catch((error) => next(error))
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
