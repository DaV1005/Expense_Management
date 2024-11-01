


// middleware/auth.js
const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ error: 'Unauthorized - no token' });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ error: 'Unauthorized - invalid token' });
    req.userId = decoded.userId;
    console.log(`Decoded userId: ${req.userId}`); // Debugging line
    next();
  });
};

module.exports = verifyToken;