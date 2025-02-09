require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const connectDB = require('./config/configDB')
const blogRoutes = require('./controllers/blogRoutes');
const userRoutes = require('./controllers/userRoutes');
const loginRouter = require('./controllers/loginRoutes');

const app = express()

// Connect to MongoDB
connectDB()

// Middleware
app.use(cors())
app.use(express.json())

// Routes
app.use('/api/blogs', blogRoutes)
app.use('/api/users', userRoutes);
app.use('/api/login', loginRouter);

const PORT = 3003
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

module.exports = { app, server };