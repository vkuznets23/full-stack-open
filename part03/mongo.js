const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Error: give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://vkuznets:${password}@phonebook.3wnu5.mongodb.net/?retryWrites=true&w=majority&appName=Phonebook`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const contactSchema = new mongoose.Schema({
  name: String,
  phone: String,
})

const Contact = mongoose.model('Contact', contactSchema)

if (process.argv.length === 3) {
  // show all contacts
  Contact.find({}).then((res) => {
    if (res.length === 0) console.log("There's no contacts")
    else {
      console.log('phonebook:')
      res.forEach((contact) => {
        console.log(`${contact.name} ${contact.phone}`)
      })
    }
    mongoose.connection.close()
  })
} else if (process.argv.length === 5) {
  // add contact
  const contact = new Contact({
    name: process.argv[3],
    phone: process.argv[4],
  })

  contact.save().then((result) => {
    console.log(`added ${contact.name} ${contact.phone} to phonebook`)
    mongoose.connection.close()
  })
} else {
  console.log('Error: Invalid number of arguments.')
  process.exit(1)
}
