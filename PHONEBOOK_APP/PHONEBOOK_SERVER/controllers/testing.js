const router = require('express').Router()
const Contact = require('../models/contact')

router.post('/reset', async (request, response) => {
  await Contact.deleteMany({})

  response.status(204).end()
})

module.exports = router
