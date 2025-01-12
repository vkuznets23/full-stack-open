require('dotenv').config();

const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const logger = require('./utils/logger');
const { jsonParser, errorHandler } = require('./utils/middlewares');
const contactsRoutes = require('./routes/contactsRoutes');

const app = express();

// Connect to MongoDB
connectDB();

// Apply middlewares
app.use(jsonParser);
app.use(cors());
app.use(logger);

// Routes
app.use('/api/persons', contactsRoutes);

// Error Handling Middleware
app.use(errorHandler);

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});