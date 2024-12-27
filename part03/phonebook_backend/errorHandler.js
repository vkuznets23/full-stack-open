
const errorHandler = (err, req, res, next) => {
    console.error(err.message)

    if (err.name === 'ValidationError') {
        // Handle specific validation errors
        return res.status(400).json({
          error: err.message,
        });
    }

    if (err.name === 'CastError') {
        return res.status(400).json({
            error: 'Invalid ID format',
          });
    }

    if (err.name === 'MongoError' && err.code === 11000) {
        return res.status(400).json({
            error: 'Duplicate entry',
          });
    }
    
    // Default error handler for other cases
    res.status(500).json({
        error: 'Something went wrong. Please try again later.',
    });
}

module.exports = errorHandler;