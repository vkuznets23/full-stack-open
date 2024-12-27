const mongoose = require('mongoose');

// Get the password from command-line arguments
const password = process.env.MONGODB_PASSWORD;

// Check if the password is provided
if (!password) {
  console.log('Please provide the password as an argument: node mongo.js <password>');
  process.exit(1);
}

// Define the MongoDB URI
const dbUri = `mongodb+srv://vkuznets:${password}@phonebook.3wnu5.mongodb.net/phonebook?retryWrites=true&w=majority`;

// Connect to MongoDB
mongoose.connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1);
  });

// Define the schema and model
const contactSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Contact = mongoose.model('Contact', contactSchema);

// Check command-line arguments to decide what to do
if (process.argv.length === 3) {
  // If only the password is provided, list all entries
  Contact.find({})
    .then((contacts) => {
      console.log('phonebook:');
      contacts.forEach((contact) => {
        console.log(`${contact.name} ${contact.number}`);
      });
      mongoose.connection.close(); // Close the connection
    })
    .catch((error) => {
      console.error('Error fetching contacts:', error.message);
      mongoose.connection.close();
    });
} else if (process.argv.length === 5) {
  // If name and number are also provided, add a new entry
  const name = process.argv[3];
  const number = process.argv[4];

  const newContact = new Contact({
    name,
    number,
  });

  newContact.save()
    .then(() => {
      console.log(`added ${name} number ${number} to phonebook`);
      mongoose.connection.close(); // Close the connection
    })
    .catch((error) => {
      console.error('Error adding contact:', error.message);
      mongoose.connection.close();
    });
} else {
  console.log('Usage:');
  console.log('  To list all contacts: node mongo.js <password>');
  console.log('  To add a contact: node mongo.js <password> <name> <number>');
  mongoose.connection.close(); // Close the connection
}