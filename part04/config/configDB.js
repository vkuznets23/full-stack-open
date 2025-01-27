const mongoose = require('mongoose');

const connectDB = async () => {
    //const password = process.env.MONGODB_PASSWORD;
    //if (!password) {
    //console.error('Please provide the MongoDB password in your .env file');
    //process.exit(1);
    //}

    const MONGODB_URI = process.env.NODE_ENV === 'test' 
        ? process.env.TEST_MONGODB_URI
        : process.env.MONGODB_URI

    //const mongoUrl = `mongodb+srv://vkuznets:${password}@phonebook.3wnu5.mongodb.net/blogs?retryWrites=true&w=majority`;

    try {
        await mongoose.connect(MONGODB_URI)
        console.log('Connected to MongoDB')
    } catch(err) {
        console.error('Failed to connect to MongoDB:', err.message);
        process.exit(1);
    }
}

module.exports = connectDB;