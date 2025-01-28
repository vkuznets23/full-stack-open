const jwt = require('jsonwebtoken');
//a middleware to verify the JWT token on protected routes like creating blogs.

const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Extract token from the Authorization header

  if (!token) {
    return res.status(401).json({ error: 'Token is missing' });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET); // Verify the token
    req.user = decoded; // Store the decoded user information in the request object
    next(); // Pass control to the next middleware
  } catch (error) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
};

module.exports = authenticateToken;
