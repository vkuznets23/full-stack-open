require('dotenv').config()
const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

mongoose.set('strictQuery', false)
mongoose
  .connect(url)
  .then((result) => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  photoBuffer: Buffer,
})

contactSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v

    if (returnedObject.photoBuffer) {
      const buffer = Buffer.from(returnedObject.photoBuffer)
      returnedObject.photoUrl = `data:image/jpeg;base64,${buffer.toString(
        'base64'
      )}`
    }
    delete returnedObject.photoBuffer
  },
})

module.exports = mongoose.model('Contact', contactSchema)
