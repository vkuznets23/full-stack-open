const mongoose = require('mongoose');

const connectDB = async () => {
    const MONGODB_URI = process.env.NODE_ENV === 'test' 
        ? process.env.TEST_MONGODB_URI
        : process.env.MONGODB_URI

    try {
        await mongoose.connect(MONGODB_URI)
        console.log('Connected to MongoDB')
    } catch(err) {
        console.error('Failed to connect to MongoDB:', err.message);
        process.exit(1);
    }
}

module.exports = connectDB;