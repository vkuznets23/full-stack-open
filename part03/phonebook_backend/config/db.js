const mongoose = require('mongoose');

// Define the connectDB function
const connectDB = async () => {
  const password = process.env.MONGODB_PASSWORD;

  if (!password) {
    console.error('Please provide the MongoDB password in your .env file');
    process.exit(1);
  }

  const dbUri = `mongodb+srv://vkuznets:${password}@phonebook.3wnu5.mongodb.net/phonebook?retryWrites=true&w=majority&connectTimeoutMS=5000&socketTimeoutMS=15000&maxPoolSize=100`;

  try {
    await mongoose.connect(dbUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error.message);
    process.exit(1);
  }
};

// Export the connectDB function
module.exports = connectDB;